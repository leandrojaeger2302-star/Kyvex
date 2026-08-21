# Kyvex

A simple app for running a one-person business: manage clients, send invoices, and track payments.

## Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript, Tailwind CSS)
- [Prisma](https://www.prisma.io/) with SQLite for local data storage

## Getting started

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Features

- **Clients** — keep contact info and notes for everyone you work with.
- **Invoices** — create invoices with line items, due dates, and notes.
- **Payments** — record payments against an invoice; invoices are automatically
  marked paid once the balance is settled.
- **Dashboard** — see outstanding balance, total paid, and recent invoices at a glance.
