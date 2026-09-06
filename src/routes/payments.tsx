import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { BarChart } from "@/components/BarChart";
import { DataTable, type Column } from "@/components/DataTable";
import { MetaTag, Panel, PanelHeader, Pill, StatCard } from "@/components/ui/panel";
import {
  formatCompactINR,
  formatINR,
  gym,
  payments,
  revenueSeries,
  type Payment,
} from "@/data/demo";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payments — GymSetu collections" },
      {
        name: "description",
        content:
          "Track collected, due and overdue gym fees in rupees, with UPI, cash and card payment records.",
      },
      { property: "og:title", content: "Payments — GymSetu collections" },
      {
        property: "og:description",
        content: "See what your gym collected this month and exactly who still owes.",
      },
    ],
  }),
  component: PaymentsPage,
});

const tone = { paid: "good", due: "info", overdue: "bad" } as const;

const columns: Column<Payment>[] = [
  {
    key: "invoice",
    header: "Invoice",
    cell: (p) => (
      <div className="min-w-0">
        <div className="truncate font-semibold">{p.memberName}</div>
        <div className="font-mono text-[10px] text-fog">
          {p.id} · {p.date}
        </div>
      </div>
    ),
  },
  { key: "plan", header: "Plan", cell: (p) => <span className="text-fog">{p.plan}</span> },
  { key: "method", header: "Method", cell: (p) => <span className="text-fog">{p.method}</span> },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    cell: (p) => <span className="font-mono">{formatINR(p.amount)}</span>,
  },
  {
    key: "status",
    header: "Status",
    align: "right",
    cell: (p) => <Pill tone={tone[p.status]}>{p.status}</Pill>,
  },
];

const FILTERS = ["all", "paid", "due", "overdue"] as const;

function PaymentsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  const rows = useMemo(
    () => payments.filter((p) => filter === "all" || p.status === filter),
    [filter],
  );

  const sum = (status: Payment["status"]) =>
    payments.filter((p) => p.status === status).reduce((t, p) => t + p.amount, 0);

  return (
    <AppShell title="Payments" subtitle={`${gym.name} · May 2025 collections`}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Collected" value={formatCompactINR(sum("paid"))} note="this month" tone="good" />
        <StatCard label="Due" value={formatCompactINR(sum("due"))} note="not yet overdue" tone="info" />
        <StatCard label="Overdue" value={formatCompactINR(sum("overdue"))} note="chase today" tone="bad" />
        <StatCard
          label="Invoices"
          value={String(payments.length)}
          note={`${payments.filter((p) => p.status !== "paid").length} open`}
        />
      </div>

      <Panel className="mt-4">
        <PanelHeader title="Collections" meta={<MetaTag>6 months</MetaTag>} />
        <BarChart
          data={revenueSeries.map((r) => ({ label: r.month, value: r.value }))}
          formatValue={formatCompactINR}
        />
      </Panel>

      <Panel className="mt-4">
        <PanelHeader
          title="Payment history"
          meta={
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={
                    "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors " +
                    (filter === f
                      ? "bg-lime/10 text-lime ring-1 ring-lime/30"
                      : "bg-raise text-fog hover:text-foreground")
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          }
        />
        <DataTable columns={columns} rows={rows} />
      </Panel>
    </AppShell>
  );
}
