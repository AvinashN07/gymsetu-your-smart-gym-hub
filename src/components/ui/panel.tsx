import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cn("rounded-xl border border-edge bg-surface p-4", className)}>
      {children}
    </section>
  );
}

export function PanelHeader({ title, meta }: { title: string; meta?: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <h2 className="truncate font-display text-lg tracking-wide">{title}</h2>
      {meta ? <div className="shrink-0">{meta}</div> : null}
    </div>
  );
}

export function MetaTag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-raise px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fog">
      {children}
    </span>
  );
}

export function StatCard({
  label,
  value,
  note,
  tone = "neutral",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "neutral" | "good" | "bad" | "info";
}) {
  const noteTone = {
    neutral: "text-fog",
    good: "text-lime",
    bad: "text-bad",
    info: "text-cyan",
  }[tone];

  return (
    <div className="rounded-xl border border-edge bg-surface p-4">
      <div className="font-mono text-[10px] uppercase tracking-wider text-fog">{label}</div>
      <div className="mt-2 font-display text-3xl leading-none sm:text-4xl">{value}</div>
      {note ? <div className={cn("mt-2 font-mono text-[11px]", noteTone)}>{note}</div> : null}
    </div>
  );
}

const PILL_TONES = {
  good: "bg-lime/10 text-lime",
  info: "bg-cyan/10 text-cyan",
  bad: "bg-bad/10 text-bad",
  neutral: "bg-raise text-fog",
} as const;

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof PILL_TONES;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        PILL_TONES[tone],
      )}
    >
      {children}
    </span>
  );
}
