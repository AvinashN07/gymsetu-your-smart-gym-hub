import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DataTable, type Column } from "@/components/DataTable";
import { MetaTag, Panel, PanelHeader, Pill, StatCard } from "@/components/ui/panel";
import { formatINR, gym, members, type Member } from "@/data/demo";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Members — GymSetu roster" },
      {
        name: "description",
        content:
          "Full member roster with plans, renewal dates and membership status for your Hyderabad gym.",
      },
      { property: "og:title", content: "Members — GymSetu roster" },
      {
        property: "og:description",
        content: "Search members, see plan amounts in rupees and catch renewals before they lapse.",
      },
    ],
  }),
  component: MembersPage,
});

const statusTone = { active: "good", expiring: "info", expired: "bad" } as const;

const columns: Column<Member>[] = [
  {
    key: "member",
    header: "Member",
    cell: (m) => (
      <div className="min-w-0">
        <div className="truncate font-semibold">{m.name}</div>
        <div className="font-mono text-[10px] text-fog">
          {m.id} · {m.phone}
        </div>
      </div>
    ),
  },
  {
    key: "plan",
    header: "Plan",
    cell: (m) => (
      <div className="min-w-0">
        <div className="text-fog">{m.plan}</div>
        <div className="font-mono text-[10px] text-fog">{m.branch}</div>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    cell: (m) => <span className="font-mono">{formatINR(m.planAmount)}</span>,
  },
  {
    key: "expires",
    header: "Expires",
    align: "right",
    cell: (m) => <span className="font-mono text-fog">{m.expiresOn}</span>,
  },
  {
    key: "status",
    header: "Status",
    align: "right",
    cell: (m) => <Pill tone={statusTone[m.status]}>{m.status}</Pill>,
  },
];

const FILTERS = ["all", "active", "expiring", "expired"] as const;

function MembersPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  const rows = useMemo(
    () =>
      members.filter((m) => {
        const matchesFilter = filter === "all" || m.status === filter;
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          m.name.toLowerCase().includes(q) ||
          m.id.toLowerCase().includes(q) ||
          m.phone.includes(q);
        return matchesFilter && matchesQuery;
      }),
    [query, filter],
  );

  const monthlyValue = members.reduce((sum, m) => sum + m.planAmount, 0);

  return (
    <AppShell title="Members" subtitle={`${gym.name} · ${members.length} on roster`}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total members" value={String(members.length)} note="on roster" />
        <StatCard
          label="Active"
          value={String(members.filter((m) => m.status === "active").length)}
          note="paid up"
          tone="good"
        />
        <StatCard
          label="Expiring"
          value={String(members.filter((m) => m.status === "expiring").length)}
          note="next 14 days"
          tone="info"
        />
        <StatCard label="Plan value" value={formatINR(monthlyValue)} note="contracted" tone="good" />
      </div>

      <Panel className="mt-4">
        <PanelHeader title="Roster" meta={<MetaTag>₹ INR</MetaTag>} />

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, ID or phone"
            className="w-full rounded-md border border-edge bg-raise/60 px-3 py-2 text-sm outline-none placeholder:text-fog/60 focus:border-lime/60 focus:ring-1 focus:ring-lime/30"
          />
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
        </div>

        {rows.length ? (
          <DataTable columns={columns} rows={rows} />
        ) : (
          <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-fog">
            No members match that search
          </p>
        )}
      </Panel>
    </AppShell>
  );
}
