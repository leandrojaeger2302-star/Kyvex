"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { InvoiceStatus } from "@/generated/prisma/enums";

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

async function syncInvoiceStatus(invoiceId: string) {
  const invoice = await prisma.invoice.findUniqueOrThrow({
    where: { id: invoiceId },
    include: { items: true, payments: true },
  });

  if (invoice.status === InvoiceStatus.CANCELLED) return;

  const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const paid = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);

  const nextStatus =
    paid >= total && total > 0
      ? InvoiceStatus.PAID
      : invoice.status === InvoiceStatus.PAID
        ? InvoiceStatus.SENT
        : invoice.status;

  if (nextStatus !== invoice.status) {
    await prisma.invoice.update({ where: { id: invoiceId }, data: { status: nextStatus } });
  }
}

export async function addPayment(invoiceId: string, formData: FormData) {
  const amount = Number(str(formData, "amount"));
  if (!amount || amount <= 0) throw new Error("Payment amount must be greater than zero");

  const paidAtStr = str(formData, "paidAt");

  await prisma.payment.create({
    data: {
      invoiceId,
      amount,
      paidAt: paidAtStr ? new Date(paidAtStr) : new Date(),
      method: str(formData, "method"),
      notes: str(formData, "notes"),
    },
  });

  await syncInvoiceStatus(invoiceId);

  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath("/invoices");
  revalidatePath("/");
}

export async function deletePayment(paymentId: string) {
  const payment = await prisma.payment.delete({ where: { id: paymentId } });

  await syncInvoiceStatus(payment.invoiceId);

  revalidatePath(`/invoices/${payment.invoiceId}`);
  revalidatePath("/invoices");
  revalidatePath("/");
}
