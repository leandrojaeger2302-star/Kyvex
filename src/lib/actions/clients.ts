"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

export async function createClient(formData: FormData) {
  const name = str(formData, "name");
  if (!name) throw new Error("Client name is required");

  const client = await prisma.client.create({
    data: {
      name,
      email: str(formData, "email"),
      phone: str(formData, "phone"),
      address: str(formData, "address"),
      notes: str(formData, "notes"),
    },
  });

  revalidatePath("/clients");
  revalidatePath("/");
  redirect(`/clients/${client.id}`);
}

export async function updateClient(clientId: string, formData: FormData) {
  const name = str(formData, "name");
  if (!name) throw new Error("Client name is required");

  await prisma.client.update({
    where: { id: clientId },
    data: {
      name,
      email: str(formData, "email"),
      phone: str(formData, "phone"),
      address: str(formData, "address"),
      notes: str(formData, "notes"),
    },
  });

  revalidatePath("/clients");
  revalidatePath(`/clients/${clientId}`);
  revalidatePath("/");
  redirect(`/clients/${clientId}`);
}

export async function deleteClient(clientId: string) {
  const invoiceCount = await prisma.invoice.count({ where: { clientId } });
  if (invoiceCount > 0) {
    redirect(`/clients/${clientId}?error=has-invoices`);
  }

  await prisma.client.delete({ where: { id: clientId } });

  revalidatePath("/clients");
  revalidatePath("/");
  redirect("/clients");
}
