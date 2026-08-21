import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/actions/clients";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: { _count: { select: { invoices: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <p className="mt-1 text-sm text-zinc-500">Everyone you do business with.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-zinc-200 bg-white">
            {clients.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-zinc-500">
                No clients yet. Add your first one.
              </p>
            ) : (
              <ul className="divide-y divide-zinc-100">
                {clients.map((client) => (
                  <li key={client.id}>
                    <Link
                      href={`/clients/${client.id}`}
                      className="flex items-center justify-between px-5 py-3 hover:bg-zinc-50"
                    >
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-zinc-500">{client.email ?? "No email"}</p>
                      </div>
                      <span className="text-sm text-zinc-500">
                        {client._count.invoices} invoice{client._count.invoices === 1 ? "" : "s"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <h2 className="font-medium">New client</h2>
          <form action={createClient} className="mt-4 flex flex-col gap-3">
            <Field name="name" label="Name" required />
            <Field name="email" label="Email" type="email" />
            <Field name="phone" label="Phone" />
            <Field name="address" label="Address" />
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-zinc-700">Notes</span>
              <textarea
                name="notes"
                rows={2}
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="mt-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              Add client
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
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
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
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
      />
    </label>
  );
}
