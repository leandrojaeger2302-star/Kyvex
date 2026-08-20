import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createInvoice } from "@/lib/actions/invoices";
import { InvoiceItemsEditor } from "@/components/InvoiceItemsEditor";

export default async function NewInvoicePage(props: PageProps<"/invoices/new">) {
  const searchParams = await props.searchParams;
  const clients = await prisma.client.findMany({ orderBy: { name: "asc" } });

  if (clients.length === 0) {
    redirect("/clients");
  }

  const preselectedClientId = typeof searchParams.clientId === "string" ? searchParams.clientId : undefined;

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const inThirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/invoices" className="text-sm text-zinc-500 hover:text-zinc-900">
          &larr; Invoices
        </Link>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">New invoice</h1>
      </div>

      <form action={createInvoice} className="flex flex-col gap-6 rounded-lg border border-zinc-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-zinc-700">
              Client<span className="text-red-500"> *</span>
            </span>
            <select
              name="clientId"
              required
              defaultValue={preselectedClientId}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            >
              <option value="" disabled>
                Select a client
              </option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-zinc-700">Invoice number</span>
            <input
              name="number"
              placeholder="Auto-generated"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-zinc-700">Issue date</span>
            <input
              name="issueDate"
              type="date"
              defaultValue={today}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-zinc-700">
              Due date<span className="text-red-500"> *</span>
            </span>
            <input
              name="dueDate"
              type="date"
              required
              defaultValue={inThirtyDays}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            />
          </label>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-medium text-zinc-700">Line items</h2>
          <InvoiceItemsEditor />
        </div>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-zinc-700">Notes</span>
          <textarea
            name="notes"
            rows={2}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
        </label>

        <div>
          <button
            type="submit"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Create invoice
          </button>
        </div>
      </form>
    </div>
  );
}
