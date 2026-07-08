"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calculator,
  ClipboardCheck,
  Rocket,
  Target,
  GitCompareArrows,
  Sparkles,
  Code2,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Command Center", href: "/", icon: LayoutDashboard },
  { name: "Executive Dashboard", href: "/dashboard", icon: TrendingUp },
  { name: "ROI Calculator", href: "/roi-calculator", icon: Calculator },
  { name: "Readiness Assessment", href: "/readiness", icon: ClipboardCheck },
  { name: "Pilot Plan Generator", href: "/pilot-plan", icon: Rocket },
  { name: "MEDDPICC Builder", href: "/meddpicc", icon: Target },
  { name: "Workflow Demo", href: "/workflow-demo", icon: GitCompareArrows },
  { name: "Built With Cursor", href: "/built-with-cursor", icon: Code2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Cursor Enterprise</p>
          <p className="truncate text-xs text-muted-foreground">Pilot & ROI Command Center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-medium">Enterprise sales artifact</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Mock data only. For discovery and pilot planning conversations.
          </p>
        </div>
      </div>
    </aside>
  );
}
