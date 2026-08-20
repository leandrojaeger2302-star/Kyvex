"use client";

import { useState } from "react";

type Row = { key: number };

export function InvoiceItemsEditor() {
  const [rows, setRows] = useState<Row[]>([{ key: 0 }, { key: 1 }]);
  const [nextKey, setNextKey] = useState(2);

  function addRow() {
    setRows((current) => [...current, { key: nextKey }]);
    setNextKey((key) => key + 1);
  }

  function removeRow(key: number) {
    setRows((current) => (current.length > 1 ? current.filter((row) => row.key !== key) : current));
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[1fr_5rem_6rem_2rem] gap-2 text-xs font-medium text-zinc-500">
        <span>Description</span>
        <span>Qty</span>
        <span>Rate</span>
        <span />
      </div>
      {rows.map((row) => (
        <div key={row.key} className="grid grid-cols-[1fr_5rem_6rem_2rem] gap-2">
          <input
            name="description"
            placeholder="Website design"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
          <input
            name="quantity"
            type="number"
            step="any"
            min="0"
            defaultValue="1"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
          <input
            name="rate"
            type="number"
            step="any"
            min="0"
            defaultValue="0"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => removeRow(row.key)}
            className="text-sm text-zinc-400 hover:text-red-600"
            aria-label="Remove line item"
          >
            &times;
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="mt-1 w-fit text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        + Add line item
      </button>
    </div>
  );
}
