import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MetaTag, Panel, PanelHeader, Pill } from "@/components/ui/panel";
import { formatINR, gym } from "@/data/demo";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — GymSetu" },
      {
        name: "description",
        content: "Gym profile, membership plan pricing in rupees and timings for your GymSetu account.",
      },
      { property: "og:title", content: "Settings — GymSetu" },
      {
        property: "og:description",
        content: "Manage your gym profile, plans and operating hours.",
      },
    ],
  }),
  component: SettingsPage,
});

const PLANS = [
  { name: "Monthly", price: 2500 },
  { name: "Quarterly", price: 6500 },
  { name: "6-month", price: 12000 },
  { name: "Annual", price: 36000 },
];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-wider text-fog">{label}</span>
      <input
        defaultValue={value}
        className="rounded-md border border-edge bg-raise/60 px-3 py-2 text-sm outline-none focus:border-lime/60 focus:ring-1 focus:ring-lime/30"
      />
    </label>
  );
}

function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Gym profile · plans · timings">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <PanelHeader title="Gym profile" meta={<MetaTag>Telangana</MetaTag>} />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Gym name" value={gym.name} />
            <Field label="Owner" value={gym.owner} />
            <Field label="Branch" value={gym.branch} />
            <Field label="Phone" value="+91 98490 00121" />
            <Field label="Morning slot" value="05:00 – 11:00" />
            <Field label="Evening slot" value="17:00 – 22:00" />
          </div>
          <button className="mt-5 rounded-md bg-lime px-5 py-2.5 text-sm font-bold text-lime-foreground ring-1 ring-lime/40 transition-transform hover:-translate-y-0.5">
            Save changes
          </button>
        </Panel>

        <Panel className="lg:col-span-2">
          <PanelHeader title="Plan pricing" meta={<MetaTag>₹ INR</MetaTag>} />
          <ul className="mt-3 divide-y divide-edge/60">
            {PLANS.map((p) => (
              <li key={p.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5">
                <span className="truncate text-sm font-semibold">{p.name}</span>
                <span className="font-mono text-sm">{formatINR(p.price)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Pill tone="good">GST invoicing on</Pill>
            <Pill tone="info">UPI collections</Pill>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-fog">
            Saving is disabled in this preview
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}
