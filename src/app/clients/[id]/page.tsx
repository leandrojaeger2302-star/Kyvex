import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";
import { updateClient, deleteClient } from "@/lib/actions/clients";

export default async function ClientDetailPage(props: PageProps<"/clients/[id]">) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;

  const client = await prisma.client.findUnique({
    where: { id },
    include: { invoices: { include: { items: true }, orderBy: { createdAt: "desc" } } },
  });

  if (!client) notFound();

  const boundUpdate = updateClient.bind(null, client.id);
  const boundDelete = deleteClient.bind(null, client.id);
  const now = new Date();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/clients" className="text-sm text-zinc-500 hover:text-zinc-900">
            &larr; Clients
          </Link>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{client.name}</h1>
        </div>
        <Link
          href={`/invoices/new?clientId=${client.id}`}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          New invoice
        </Link>
      </div>

      {searchParams.error === "has-invoices" && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          This client can&apos;t be deleted because they have invoices. Delete their invoices first.
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 px-5 py-3">
              <h2 className="font-medium">Invoices</h2>
            </div>
            {client.invoices.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-zinc-500">No invoices yet.</p>
            ) : (
              <ul className="divide-y divide-zinc-100">
                {client.invoices.map((invoice) => {
                  const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
                  const overdue = invoice.status === "SENT" && invoice.dueDate < now;
                  return (
                    <li key={invoice.id}>
                      <Link
                        href={`/invoices/${invoice.id}`}
                        className="flex items-center justify-between px-5 py-3 hover:bg-zinc-50"
                      >
                        <div>
                          <p className="font-medium">{invoice.number}</p>
                          <p className="text-sm text-zinc-500">due {formatDate(invoice.dueDate)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{formatCurrency(total)}</span>
                          <StatusBadge status={invoice.status} overdue={overdue} />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="font-medium">Edit client</h2>
            <form action={boundUpdate} className="mt-4 flex flex-col gap-3">
              <Field name="name" label="Name" defaultValue={client.name} required />
              <Field name="email" label="Email" type="email" defaultValue={client.email ?? ""} />
              <Field name="phone" label="Phone" defaultValue={client.phone ?? ""} />
              <Field name="address" label="Address" defaultValue={client.address ?? ""} />
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-zinc-700">Notes</span>
                <textarea
                  name="notes"
                  rows={2}
                  defaultValue={client.notes ?? ""}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="mt-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Save changes
              </button>
            </form>
          </div>

          <form action={boundDelete}>
            <button
              type="submit"
              className="w-full rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              Delete client
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-zinc-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
      />
    </label>
  );
}
