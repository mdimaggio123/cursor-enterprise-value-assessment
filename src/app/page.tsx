"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  ClipboardCheck,
  GitCompareArrows,
  Rocket,
  Target,
  Shield,
  TrendingUp,
} from "lucide-react";
import { AeTalkTrack } from "@/components/sales/ae-talk-track";
import { EnterpriseMotionWalkthrough } from "@/components/sales/enterprise-motion-walkthrough";
import { KpiCard, StatGrid } from "@/components/dashboard/kpi-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import talkTracks from "@/data/talk-tracks.json";
import dashboardData from "@/data/dashboard.json";
import { cn } from "@/lib/utils";

const modules = [
  {
    title: "ROI Calculator",
    description: "Conservative, CFO-defensible productivity model with realization factor",
    href: "/roi-calculator",
    icon: Calculator,
  },
  {
    title: "Readiness Assessment",
    description: "8-category enterprise readiness with tiered next steps",
    href: "/readiness",
    icon: ClipboardCheck,
  },
  {
    title: "Pilot Plan Generator",
    description: "Structured 90-day pilot with phases and success criteria",
    href: "/pilot-plan",
    icon: Rocket,
  },
  {
    title: "MEDDPICC+ Builder",
    description: "Account planning with security blockers and expansion hypothesis",
    href: "/meddpicc",
    icon: Target,
  },
  {
    title: "Workflow Demo",
    description: "Traditional vs Cursor-assisted agentic developer workflow",
    href: "/workflow-demo",
    icon: GitCompareArrows,
  },
  {
    title: "Built With Cursor",
    description: "How Cursor was used to build this enterprise sales framework",
    href: "/built-with-cursor",
    icon: Shield,
  },
];

export default function HomePage() {
  const { kpis } = dashboardData;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-xl border bg-gradient-to-br from-primary/5 via-card to-violet-500/5 p-8 shadow-card">
        <Badge variant="secondary" className="mb-4">
          Enterprise Sales Artifact
        </Badge>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          Turn Cursor adoption into a measurable enterprise rollout
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Built with Cursor to model ROI, readiness, pilot design, MEDDPICC
          execution, workflow transformation, and executive value realization
          for AI coding agents.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/built-with-cursor" className={cn(buttonVariants())}>
            Built With Cursor
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/roi-calculator" className={cn(buttonVariants({ variant: "outline" }))}>
            Open ROI Model
          </Link>
        </div>
      </section>

      {/* Why this exists */}
      <Card>
        <CardHeader>
          <CardTitle>What is this?</CardTitle>
          <CardDescription>
            A sales artifact, not a production product. It connects hands-on
            product learning with enterprise buyer conversations: ROI framing,
            governance readiness, pilot design, and multi-threaded deal execution.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-semibold">Purpose</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Translate agentic development into an enterprise buyer journey
              with executive-ready artifacts.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-semibold">Enterprise motion</p>
            <p className="mt-2 text-sm text-muted-foreground">
              ROI, governance, pilot discipline, and multi-threaded executive
              alignment in one command center.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-semibold">Stakeholder modules</p>
            <p className="mt-2 text-sm text-muted-foreground">
              CFO (ROI), CTO (workflow), CISO (readiness), sales leadership
              (MEDDPICC and pilot plan).
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-semibold">How to use it</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Mock data only. Edit assumptions live in discovery and pilot
              planning conversations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sample KPIs from dashboard */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Sample Enterprise Pilot Signals</h2>
            <p className="text-sm text-muted-foreground">
              Illustrative metrics from a mock financial services account
            </p>
          </div>
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Full Dashboard <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <StatGrid>
          {kpis.map((kpi) => (
            <KpiCard
              key={kpi.id}
              label={kpi.label}
              value={kpi.value}
              unit={kpi.unit}
              change={kpi.change}
              changeLabel={kpi.changeLabel}
              trend={kpi.trend as "up" | "down"}
            />
          ))}
        </StatGrid>
      </section>

      {/* Module grid */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Command Center Modules</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link key={mod.href} href={mod.href}>
                <Card className="h-full transition-all hover:border-primary/40 hover:shadow-elevated">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{mod.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {mod.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <AeTalkTrack tracks={talkTracks.dashboard} />

      <EnterpriseMotionWalkthrough />

      {/* Link to full dashboard */}
      <Card className="border-primary/20">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold">Executive Dashboard</p>
              <p className="text-sm text-muted-foreground">
                Full adoption trends, deal progress, risk register, and activity feed
              </p>
            </div>
          </div>
          <Link href="/dashboard" className={cn(buttonVariants())}>
            Open Dashboard
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
