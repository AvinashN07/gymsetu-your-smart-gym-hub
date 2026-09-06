import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart } from "@/components/BarChart";
import { MetaTag, Panel, PanelHeader, Pill, StatCard } from "@/components/ui/panel";
import { formatCompactINR, kpis, revenueSeries } from "@/data/demo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GymSetu — Run Your Gym Smarter" },
      {
        name: "description",
        content:
          "Gym management software for small and independent gyms in Telangana. Track members, payments and attendance in one dark, fast owner console.",
      },
      { property: "og:title", content: "GymSetu — Run Your Gym Smarter" },
      {
        property: "og:description",
        content:
          "Memberships, attendance and payments for independent gyms across Telangana, priced in rupees.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    tag: "01",
    title: "Members, locked in",
    body: "Every membership, plan and renewal date in one searchable roster — no register books.",
  },
  {
    tag: "02",
    title: "Payments in rupees",
    body: "Record UPI, cash and card collections, then see exactly who is still pending.",
  },
  {
    tag: "03",
    title: "Attendance you can trust",
    body: "Morning and evening check-ins, daily footfall and slot-wise load at a glance.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-ink text-foreground">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid size-9 shrink-0 place-items-center rounded-md bg-lime font-display text-xl leading-none text-lime-foreground">
              G
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-lg tracking-wide">GymSetu</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Telangana</div>
            </div>
          </div>
          <Link
            to="/login"
            className="shrink-0 rounded-md border border-edge px-5 py-2.5 text-sm font-semibold hover:bg-raise"
          >
            Sign in
          </Link>
        </header>

        <section className="glass relative mt-6 overflow-hidden rounded-2xl border border-edge px-6 py-8 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 rotate-12 rounded-full bg-lime/10 blur-3xl" />
          <div className="relative max-w-[26ch]">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime">
              GymSetu · Owner console
            </div>
            <h1 className="mt-3 text-balance font-display text-5xl leading-[0.9] tracking-tight sm:text-6xl">
              Run Your Gym Smarter
            </h1>
            <p className="mt-4 max-w-[40ch] text-pretty text-sm text-fog">
              Memberships, attendance and payments for independent gyms across Telangana — locked in
              tight.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard"
                className="rounded-md bg-lime px-5 py-2.5 text-sm font-bold text-lime-foreground ring-1 ring-lime/40 transition-transform hover:-translate-y-0.5"
              >
                Open dashboard
              </Link>
              <Link
                to="/login"
                className="rounded-md border border-edge px-5 py-2.5 text-sm font-semibold hover:bg-raise"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard label="Active members" value="486" note="+24 this month" tone="good" />
          <StatCard label="Monthly revenue" value="₹3.42L" note="+18.2%" tone="good" />
          <StatCard label="Expiring soon" value="37" note="next 14 days" />
          <StatCard label="Today's attendance" value="128" note="63% of base" tone="info" />
          <StatCard label="Pending payments" value="₹58.4K" note="23 invoices" tone="bad" />
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
            <PanelHeader title="Built for gym floors, not spreadsheets" meta={<MetaTag>₹ INR</MetaTag>} />
            <ul className="mt-4 divide-y divide-edge/60">
              {FEATURES.map((f) => (
                <li key={f.tag} className="flex gap-4 py-3">
                  <span className="font-mono text-[11px] text-lime">{f.tag}</span>
                  <div className="min-w-0">
                    <p className="font-semibold">{f.title}</p>
                    <p className="mt-1 text-sm text-fog">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Pill tone="good">No setup fee</Pill>
              <Pill tone="info">Works on mobile</Pill>
              <Pill>
                {formatCompactINR(1499)} per month
              </Pill>
              <span className="font-mono text-[10px] uppercase tracking-wider text-fog">
                Pending: {formatCompactINR(kpis.pendingPayments)} across {kpis.pendingInvoices} invoices
              </span>
            </div>
          </Panel>
        </div>

        <footer className="mt-8 border-t border-edge pt-5 font-mono text-[10px] uppercase tracking-wider text-fog">
          GymSetu · Hyderabad, Telangana
        </footer>
      </div>
    </div>
  );
}
