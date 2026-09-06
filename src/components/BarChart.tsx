export type BarDatum = { label: string; value: number };

export function BarChart({
  data,
  formatValue,
  height = "h-40",
}: {
  data: BarDatum[];
  formatValue?: (value: number) => string;
  height?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={`mt-5 flex items-end gap-2 ${height}`}>
      {data.map((d, i) => {
        const last = i === data.length - 1;
        return (
          <div key={d.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
            {formatValue ? (
              <span className={`font-mono text-[9px] ${last ? "text-lime" : "text-fog"}`}>
                {formatValue(d.value)}
              </span>
            ) : null}
            <div
              className={`w-full rounded-t transition-[height] duration-500 ${last ? "bg-lime" : "bg-raise"}`}
              style={{ height: `${Math.round((d.value / max) * 88)}%` }}
            />
            <span className={`font-mono text-[9px] ${last ? "text-lime" : "text-fog"}`}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
