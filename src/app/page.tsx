import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";

export default async function Dashboard() {
  const invoices = await prisma.invoice.findMany({
    include: { items: true, payments: true, client: true },
    orderBy: { createdAt: "desc" },
  });
  const clientCount = await prisma.client.count();

  const now = new Date();
  let outstanding = 0;
  let paidTotal = 0;

  for (const invoice of invoices) {
    const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
    const paid = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
    paidTotal += paid;
    if (invoice.status === "SENT" || invoice.status === "DRAFT") {
      outstanding += total - paid;
    }
  }

  const recentInvoices = invoices.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">Your business at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Outstanding" value={formatCurrency(outstanding)} />
        <StatCard label="Paid to date" value={formatCurrency(paidTotal)} />
        <StatCard label="Clients" value={String(clientCount)} />
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3">
          <h2 className="font-medium">Recent invoices</h2>
          <Link href="/invoices" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            View all
          </Link>
        </div>
        {recentInvoices.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-zinc-500">
            No invoices yet.{" "}
            <Link href="/invoices/new" className="font-medium text-zinc-900 underline">
              Create your first invoice
            </Link>
            .
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {recentInvoices.map((invoice) => {
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
                      <p className="text-sm text-zinc-500">
                        {invoice.client.name} &middot; due {formatDate(invoice.dueDate)}
                      </p>
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
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
