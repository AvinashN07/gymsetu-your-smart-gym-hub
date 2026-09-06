import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { gym } from "@/data/demo";

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/members", label: "Members" },
  { to: "/payments", label: "Payments" },
  { to: "/attendance", label: "Attendance" },
  { to: "/settings", label: "Settings" },
] as const;

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-fog transition-colors hover:bg-raise hover:text-foreground data-[status=active]:bg-lime/10 data-[status=active]:font-semibold data-[status=active]:text-lime data-[status=active]:ring-1 data-[status=active]:ring-lime/30"
        >
          <span className="size-1.5 shrink-0 rounded-full bg-fog/40 group-data-[status=active]:bg-lime" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2 px-2">
      <div className="grid size-9 shrink-0 place-items-center rounded-md bg-lime font-display text-xl leading-none text-lime-foreground">
        G
      </div>
      <div className="min-w-0 leading-tight">
        <div className="truncate font-display text-lg tracking-wide">GymSetu</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Hyderabad</div>
      </div>
    </Link>
  );
}

function OwnerCard() {
  return (
    <div className="rounded-lg border border-edge bg-raise/60 p-3">
      <div className="flex min-w-0 items-center gap-2">
        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-cyan/20 font-display text-sm text-cyan">
          {gym.ownerInitials}
        </div>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-sm font-semibold">{gym.owner}</div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-fog">Owner</div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink text-foreground">
      <div className="mx-auto flex max-w-[1440px]">
        <aside className="glass sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-edge px-4 py-6 lg:flex">
          <Brand />
          <div className="mt-8">
            <NavItems />
          </div>
          <div className="mt-auto">
            <OwnerCard />
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle navigation"
                className="grid size-9 shrink-0 place-items-center rounded-md border border-edge bg-surface text-fog lg:hidden"
              >
                <span className="font-mono text-sm">≡</span>
              </button>
              <div className="min-w-0">
                <h1 className="truncate font-display text-2xl tracking-wide sm:text-3xl">{title}</h1>
                {subtitle ? (
                  <p className="font-mono text-[11px] uppercase tracking-wider text-fog">{subtitle}</p>
                ) : null}
              </div>
            </div>
            {action}
          </div>

          {open ? (
            <div className="mt-4 rounded-xl border border-edge bg-surface p-3 lg:hidden">
              <NavItems onNavigate={() => setOpen(false)} />
            </div>
          ) : null}

          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
