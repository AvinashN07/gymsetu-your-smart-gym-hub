import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { BarChart } from "@/components/BarChart";
import { DataTable, type Column } from "@/components/DataTable";
import { MetaTag, Panel, PanelHeader, Pill, StatCard } from "@/components/ui/panel";
import { attendance, attendanceSeries, gym, kpis, type AttendanceRecord } from "@/data/demo";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — GymSetu check-ins" },
      {
        name: "description",
        content:
          "Daily gym check-ins with morning and evening slot load, weekly footfall and members still inside.",
      },
      { property: "og:title", content: "Attendance — GymSetu check-ins" },
      {
        property: "og:description",
        content: "See who trained today and how busy each slot was at your gym.",
      },
    ],
  }),
  component: AttendancePage,
});

const columns: Column<AttendanceRecord>[] = [
  {
    key: "member",
    header: "Member",
    cell: (a) => (
      <div className="min-w-0">
        <div className="truncate font-semibold">{a.memberName}</div>
        <div className="font-mono text-[10px] text-fog">{a.memberId}</div>
      </div>
    ),
  },
  { key: "slot", header: "Slot", cell: (a) => <span className="text-fog">{a.slot}</span> },
  {
    key: "in",
    header: "Check in",
    align: "right",
    cell: (a) => <span className="font-mono">{a.checkIn}</span>,
  },
  {
    key: "out",
    header: "Check out",
    align: "right",
    cell: (a) =>
      a.checkOut ? (
        <span className="font-mono text-fog">{a.checkOut}</span>
      ) : (
        <Pill tone="good">inside</Pill>
      ),
  },
];

const SLOTS = ["all", "Morning", "Evening"] as const;

function AttendancePage() {
  const [slot, setSlot] = useState<(typeof SLOTS)[number]>("all");

  const rows = useMemo(
    () => attendance.filter((a) => slot === "all" || a.slot === slot),
    [slot],
  );

  const morning = attendance.filter((a) => a.slot === "Morning").length;
  const evening = attendance.filter((a) => a.slot === "Evening").length;
  const inside = attendance.filter((a) => !a.checkOut).length;

  return (
    <AppShell title="Attendance" subtitle={`${gym.name} · ${gym.today}`}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Today's check-ins"
          value={String(kpis.todaysAttendance)}
          note={kpis.attendanceShare}
          tone="info"
        />
        <StatCard label="Morning slot" value={String(morning)} note="5 AM – 11 AM" />
        <StatCard label="Evening slot" value={String(evening)} note="5 PM – 10 PM" />
        <StatCard label="Inside now" value={String(inside)} note="not checked out" tone="good" />
      </div>

      <Panel className="mt-4">
        <PanelHeader title="Weekly footfall" meta={<MetaTag>check-ins</MetaTag>} />
        <BarChart
          data={attendanceSeries.map((a) => ({ label: a.day, value: a.value }))}
          formatValue={(v) => String(v)}
        />
      </Panel>

      <Panel className="mt-4">
        <PanelHeader
          title="Today's log"
          meta={
            <div className="flex flex-wrap gap-2">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={
                    "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors " +
                    (slot === s
                      ? "bg-lime/10 text-lime ring-1 ring-lime/30"
                      : "bg-raise text-fog hover:text-foreground")
                  }
                >
                  {s}
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
