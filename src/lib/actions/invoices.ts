"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { InvoiceStatus } from "@/generated/prisma/enums";

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

async function nextInvoiceNumber() {
  const count = await prisma.invoice.count();
  return `INV-${String(count + 1).padStart(4, "0")}`;
}

export async function createInvoice(formData: FormData) {
  const clientId = str(formData, "clientId");
  if (!clientId) throw new Error("Client is required");

  const dueDateStr = str(formData, "dueDate");
  if (!dueDateStr) throw new Error("Due date is required");

  const descriptions = formData.getAll("description") as string[];
  const quantities = formData.getAll("quantity") as string[];
  const rates = formData.getAll("rate") as string[];

  const items = descriptions
    .map((description, i) => ({
      description: description.trim(),
      quantity: Number(quantities[i]) || 0,
      rate: Number(rates[i]) || 0,
    }))
    .filter((item) => item.description !== "" && item.quantity > 0);

  if (items.length === 0) throw new Error("At least one line item is required");

  const number = str(formData, "number") ?? (await nextInvoiceNumber());
  const issueDateStr = str(formData, "issueDate");

  const invoice = await prisma.invoice.create({
    data: {
      number,
      clientId,
      issueDate: issueDateStr ? new Date(issueDateStr) : new Date(),
      dueDate: new Date(dueDateStr),
      notes: str(formData, "notes"),
      status: InvoiceStatus.DRAFT,
      items: { create: items },
    },
  });

  revalidatePath("/invoices");
  revalidatePath(`/clients/${clientId}`);
  revalidatePath("/");
  redirect(`/invoices/${invoice.id}`);
}

export async function updateInvoiceStatus(invoiceId: string, status: InvoiceStatus) {
  const invoice = await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status },
  });

  revalidatePath("/invoices");
  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath(`/clients/${invoice.clientId}`);
  revalidatePath("/");
}

export async function deleteInvoice(invoiceId: string) {
  const invoice = await prisma.invoice.delete({ where: { id: invoiceId } });

  revalidatePath("/invoices");
  revalidatePath(`/clients/${invoice.clientId}`);
  revalidatePath("/");
  redirect(`/clients/${invoice.clientId}`);
}
