import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate, invoiceTotal } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";
import { updateInvoiceStatus, deleteInvoice } from "@/lib/actions/invoices";
import { addPayment, deletePayment } from "@/lib/actions/payments";
import { InvoiceStatus } from "@/generated/prisma/enums";

export default async function InvoiceDetailPage(props: PageProps<"/invoices/[id]">) {
  const { id } = await props.params;

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      client: true,
      items: true,
      payments: { orderBy: { paidAt: "desc" } },
    },
  });

  if (!invoice) notFound();

  const total = invoiceTotal(invoice.items);
  const paid = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const balance = total - paid;
  const overdue = invoice.status === "SENT" && invoice.dueDate < new Date();

  const boundAddPayment = addPayment.bind(null, invoice.id);
  const boundDelete = deleteInvoice.bind(null, invoice.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <div>
          <Link href="/invoices" className="text-sm text-zinc-500 hover:text-zinc-900">
            &larr; Invoices
          </Link>
          <div className="mt-1 flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{invoice.number}</h1>
            <StatusBadge status={invoice.status} overdue={overdue} />
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            <Link href={`/clients/${invoice.client.id}`} className="font-medium text-zinc-700 hover:underline">
              {invoice.client.name}
            </Link>{" "}
            &middot; issued {formatDate(invoice.issueDate)} &middot; due {formatDate(invoice.dueDate)}
          </p>
        </div>

        <StatusActions invoiceId={invoice.id} status={invoice.status} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-lg border border-zinc-200 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-200 text-left text-xs font-medium text-zinc-500">
                <tr>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3 text-right">Qty</th>
                  <th className="px-5 py-3 text-right">Rate</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-3">{item.description}</td>
                    <td className="px-5 py-3 text-right">{item.quantity}</td>
                    <td className="px-5 py-3 text-right">{formatCurrency(item.rate)}</td>
                    <td className="px-5 py-3 text-right">{formatCurrency(item.quantity * item.rate)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-zinc-200 text-sm">
                <tr>
                  <td colSpan={3} className="px-5 py-2 text-right text-zinc-500">
                    Total
                  </td>
                  <td className="px-5 py-2 text-right font-medium">{formatCurrency(total)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-5 py-2 text-right text-zinc-500">
                    Paid
                  </td>
                  <td className="px-5 py-2 text-right font-medium">{formatCurrency(paid)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-5 py-2 text-right font-medium text-zinc-700">
                    Balance
                  </td>
                  <td className="px-5 py-2 text-right font-semibold">{formatCurrency(balance)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {invoice.notes && (
            <div className="rounded-lg border border-zinc-200 bg-white p-5">
              <h2 className="text-sm font-medium text-zinc-700">Notes</h2>
              <p className="mt-1 whitespace-pre-wrap text-sm text-zinc-600">{invoice.notes}</p>
            </div>
          )}

          <form action={boundDelete}>
            <button
              type="submit"
              className="w-fit rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              Delete invoice
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="font-medium">Record a payment</h2>
            <form action={boundAddPayment} className="mt-4 flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-zinc-700">
                  Amount<span className="text-red-500"> *</span>
                </span>
                <input
                  name="amount"
                  type="number"
                  step="any"
                  min="0"
                  required
                  defaultValue={balance > 0 ? balance : undefined}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-zinc-700">Date</span>
                <input
                  name="paidAt"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-zinc-700">Method</span>
                <input
                  name="method"
                  placeholder="Bank transfer, card, cash..."
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="mt-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Add payment
              </button>
            </form>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 px-5 py-3">
              <h2 className="font-medium">Payments</h2>
            </div>
            {invoice.payments.length === 0 ? (
              <p className="px-5 py-6 text-center text-sm text-zinc-500">No payments recorded.</p>
            ) : (
              <ul className="divide-y divide-zinc-100">
                {invoice.payments.map((payment) => {
                  const boundDeletePayment = deletePayment.bind(null, payment.id);
                  return (
                    <li key={payment.id} className="flex items-center justify-between px-5 py-3">
                      <div>
                        <p className="font-medium">{formatCurrency(payment.amount)}</p>
                        <p className="text-xs text-zinc-500">
                          {formatDate(payment.paidAt)}
                          {payment.method ? ` · ${payment.method}` : ""}
                        </p>
                      </div>
                      <form action={boundDeletePayment}>
                        <button
                          type="submit"
                          className="text-xs font-medium text-zinc-400 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </form>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusActions({ invoiceId, status }: { invoiceId: string; status: InvoiceStatus }) {
  const options: { status: InvoiceStatus; label: string }[] = [
    { status: InvoiceStatus.DRAFT, label: "Mark as draft" },
    { status: InvoiceStatus.SENT, label: "Mark as sent" },
    { status: InvoiceStatus.PAID, label: "Mark as paid" },
    { status: InvoiceStatus.CANCELLED, label: "Cancel" },
  ];

  return (
    <div className="flex gap-2">
      {options
        .filter((option) => option.status !== status)
        .map((option) => {
          const action = updateInvoiceStatus.bind(null, invoiceId, option.status);
          return (
            <form key={option.status} action={action}>
              <button
                type="submit"
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                {option.label}
              </button>
            </form>
          );
        })}
    </div>
  );
}
