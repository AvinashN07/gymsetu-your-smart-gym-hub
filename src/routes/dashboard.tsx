import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { BarChart } from "@/components/BarChart";
import { DataTable, type Column } from "@/components/DataTable";
import { MetaTag, Panel, PanelHeader, Pill, StatCard } from "@/components/ui/panel";
import {
  attendanceSeries,
  formatCompactINR,
  formatINR,
  gym,
  kpis,
  members,
  payments,
  revenueSeries,
  type Payment,
} from "@/data/demo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — GymSetu owner console" },
      {
        name: "description",
        content:
          "Active members, monthly revenue in rupees, expiring memberships, today's attendance and pending payments for your gym.",
      },
      { property: "og:title", content: "Dashboard — GymSetu owner console" },
      {
        property: "og:description",
        content: "Your gym's members, revenue, attendance and dues on one command deck.",
      },
    ],
  }),
  component: Dashboard,
});

const paymentTone = { paid: "good", due: "info", overdue: "bad" } as const;

const columns: Column<Payment>[] = [
  {
    key: "member",
    header: "Member",
    cell: (p) => (
      <div className="min-w-0">
        <div className="truncate font-semibold">{p.memberName}</div>
        <div className="font-mono text-[10px] text-fog">
          {p.memberId} · {gym.branch.split(",")[0]}
        </div>
      </div>
    ),
  },
  { key: "plan", header: "Plan", cell: (p) => <span className="text-fog">{p.plan}</span> },
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
    cell: (p) => <Pill tone={paymentTone[p.status]}>{p.status}</Pill>,
  },
];

function Dashboard() {
  const expiring = members.filter((m) => m.status === "expiring");

  return (
    <AppShell
      title="Command deck"
      subtitle={`${gym.name} · Today · ${gym.today}`}
      action={
        <Link
          to="/members"
          className="shrink-0 rounded-md bg-lime px-4 py-2 text-sm font-bold text-lime-foreground ring-1 ring-lime/40 transition-transform hover:-translate-y-0.5"
        >
          Add member
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          label="Active members"
          value={String(kpis.activeMembers)}
          note={kpis.activeMembersDelta}
          tone="good"
        />
        <StatCard
          label="Monthly revenue"
          value={formatCompactINR(kpis.monthlyRevenue)}
          note={kpis.revenueDelta}
          tone="good"
        />
        <StatCard label="Expiring soon" value={String(kpis.expiringSoon)} note="next 14 days" />
        <StatCard
          label="Today's attendance"
          value={String(kpis.todaysAttendance)}
          note={kpis.attendanceShare}
          tone="info"
        />
        <StatCard
          label="Pending payments"
          value={formatCompactINR(kpis.pendingPayments)}
          note={`${kpis.pendingInvoices} invoices`}
          tone="bad"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-5">
        <Panel className="lg:col-span-2">
          <PanelHeader title="Revenue" meta={<MetaTag>6 months</MetaTag>} />
          <BarChart
            data={revenueSeries.map((r) => ({ label: r.month, value: r.value }))}
            formatValue={formatCompactINR}
          />
        </Panel>

        <Panel className="lg:col-span-3">
          <PanelHeader
            title="Members & payments"
            meta={
              <Link to="/payments" className="font-mono text-[10px] uppercase tracking-wider text-fog hover:text-lime">
                View all
              </Link>
            }
          />
          <DataTable columns={columns} rows={payments.slice(0, 5)} />
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <PanelHeader title="Weekly footfall" meta={<MetaTag>check-ins</MetaTag>} />
          <BarChart
            data={attendanceSeries.map((a) => ({ label: a.day, value: a.value }))}
            formatValue={(v) => String(v)}
          />
        </Panel>

        <Panel className="lg:col-span-2">
          <PanelHeader
            title="Expiring soon"
            meta={
              <Link to="/members" className="font-mono text-[10px] uppercase tracking-wider text-fog hover:text-lime">
                Roster
              </Link>
            }
          />
          <ul className="mt-3 divide-y divide-edge/60">
            {expiring.map((m) => (
              <li key={m.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{m.name}</p>
                  <p className="font-mono text-[10px] text-fog">
                    {m.plan} · {formatINR(m.planAmount)}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-cyan">{m.expiresOn}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
