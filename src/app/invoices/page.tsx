import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";

export default async function InvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    include: { client: true, items: true, payments: true },
    orderBy: { createdAt: "desc" },
  });
  const now = new Date();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Invoices</h1>
          <p className="mt-1 text-sm text-zinc-500">Every invoice you&apos;ve created.</p>
        </div>
        <Link
          href="/invoices/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          New invoice
        </Link>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white">
        {invoices.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-zinc-500">No invoices yet.</p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {invoices.map((invoice) => {
              const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
              const paid = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
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
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(total)}</p>
                        {paid > 0 && paid < total && (
                          <p className="text-xs text-zinc-500">{formatCurrency(paid)} paid</p>
                        )}
                      </div>
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
