import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export function getValueFontClass(value: string | number): string {
  const len = String(value).length;
  if (len <= 6) return "text-2xl sm:text-3xl";
  if (len <= 9) return "text-xl sm:text-2xl";
  if (len <= 12) return "text-lg sm:text-xl";
  return "text-base sm:text-lg";
}

interface MetricValueProps {
  value: string | number;
  unit?: string;
  title?: string;
  className?: string;
  weight?: "bold" | "semibold";
}

export function MetricValue({
  value,
  unit = "",
  title,
  className,
  weight = "bold",
}: MetricValueProps) {
  const valueStr = String(value);

  return (
    <p
      title={title}
      className={cn(
        "mt-2 tabular-nums leading-none tracking-tight whitespace-nowrap",
        weight === "bold" ? "font-bold" : "font-semibold",
        getValueFontClass(valueStr),
        className
      )}
    >
      {value}
      {unit && (
        <span className="ml-0.5 text-sm font-normal text-muted-foreground">
          {unit}
        </span>
      )}
    </p>
  );
}

interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  title?: string;
  change?: number;
  changeLabel?: string;
  trend?: "up" | "down";
  className?: string;
}

export function KpiCard({
  label,
  value,
  unit = "",
  title,
  change,
  changeLabel,
  trend = "up",
  className,
}: KpiCardProps) {
  const isPositive = trend === "up";

  return (
    <div
      className={cn(
        "min-w-0 rounded-lg border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated sm:p-6",
        className
      )}
    >
      <p className="text-sm font-medium leading-snug text-muted-foreground">
        {label}
      </p>
      <MetricValue value={value} unit={unit} title={title} />
      {change !== undefined && (
        <div className="mt-2 flex items-center gap-1 text-sm">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 shrink-0 text-success" />
          ) : (
            <TrendingDown className="h-4 w-4 shrink-0 text-destructive" />
          )}
          <span className={isPositive ? "text-success" : "text-destructive"}>
            {change > 0 ? "+" : ""}
            {change}
            {typeof change === "number" && changeLabel?.includes("%") ? "%" : ""}
          </span>
          {changeLabel && (
            <span className="text-muted-foreground">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}

interface StatGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function StatGrid({ children, columns = 4 }: StatGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 [&>*]:min-w-0",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 xl:grid-cols-4"
      )}
    >
      {children}
    </div>
  );
}
