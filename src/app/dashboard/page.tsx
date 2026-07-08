"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Circle,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { AeTalkTrack } from "@/components/sales/ae-talk-track";
import { KpiCard, StatGrid } from "@/components/dashboard/kpi-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import talkTracks from "@/data/talk-tracks.json";
import dashboardData from "@/data/dashboard.json";
import { formatCurrency, formatNumber } from "@/lib/utils";

const statusIcon = {
  complete: CheckCircle2,
  in_progress: Clock,
  pending: Circle,
  open: AlertTriangle,
  mitigated: CheckCircle2,
  monitoring: Clock,
};

const statusColor = {
  complete: "text-success",
  in_progress: "text-primary",
  pending: "text-muted-foreground",
  open: "text-warning",
  mitigated: "text-success",
  monitoring: "text-primary",
};

export default function DashboardPage() {
  const { company, kpis, adoptionTrend, productivityByTeam, dealStages, riskItems, recentActivity } =
    dashboardData;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Dashboard"
        description={`Enterprise adoption overview for ${company.name} - track pilot progress, ROI signals, and deal momentum.`}
      >
        <Badge variant="secondary" className="gap-1">
          <Building2 className="h-3 w-3" />
          {company.industry}
        </Badge>
      </PageHeader>

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Illustrative mock data. Figures represent instrumented pilot signals and
        conservative modeled targets, not guaranteed outcomes. ROI uses the same
        gross-vs-realized logic as the ROI Calculator (22% productivity capture rate).
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pilot Adoption Trend</CardTitle>
            <CardDescription>
              Active users vs. target across the 6-month pilot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adoptionTrend}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220, 9%, 46%)" }} />
                  <YAxis tick={{ fill: "hsl(220, 9%, 46%)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(220, 13%, 91%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="activeUsers" name="Active Users" stroke="hsl(221, 83%, 53%)" fill="url(#colorUsers)" strokeWidth={2} />
                  <Area type="monotone" dataKey="target" name="Target" stroke="hsl(220, 9%, 46%)" fill="none" strokeDasharray="5 5" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>Account context</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Developers</span>
              <span className="font-medium">{formatNumber(company.developers)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Employees</span>
              <span className="font-medium">{formatNumber(company.employees)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Annual Revenue</span>
              <span className="font-medium">{formatCurrency(company.annualRevenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">IT Budget</span>
              <span className="font-medium">{formatCurrency(company.itBudget)}</span>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Cursor addressable spend estimate</p>
              <p className="mt-1 text-lg font-semibold">
                {formatCurrency(company.developers * 480)}
                <span className="text-sm font-normal text-muted-foreground">/yr</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Productivity by Team</CardTitle>
            <CardDescription>Indexed productivity (baseline = 100)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productivityByTeam} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[80, 160]} tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="team" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="before" name="Before" fill="hsl(220, 14%, 96%)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="after" name="After Cursor" fill="hsl(221, 83%, 53%)" radius={[0, 4, 4, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal Progress</CardTitle>
            <CardDescription>Enterprise adoption milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dealStages.map((stage, index) => {
              const Icon = statusIcon[stage.status as keyof typeof statusIcon] ?? Circle;
              const color = statusColor[stage.status as keyof typeof statusColor] ?? "text-muted-foreground";
              return (
                <div key={stage.stage} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <Icon className={`h-5 w-5 ${color}`} />
                    {index < dealStages.length - 1 && <div className="mt-1 h-full w-px bg-border" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">{stage.stage}</p>
                    <p className="text-xs text-muted-foreground">{stage.owner}</p>
                    <Badge variant={stage.status === "complete" ? "success" : stage.status === "in_progress" ? "default" : "secondary"} className="mt-1">
                      {stage.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Risk Register</CardTitle>
            <CardDescription>Active risks and mitigations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskItems.map((risk) => (
              <div key={risk.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{risk.title}</p>
                  <Badge variant={risk.severity === "high" ? "destructive" : risk.severity === "medium" ? "warning" : "secondary"}>
                    {risk.severity}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{risk.mitigation}</p>
                <Badge variant="outline" className="mt-2">{risk.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest pilot and deal updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3 border-b pb-4 last:border-0 last:pb-0">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm">{activity.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <AeTalkTrack tracks={talkTracks.dashboard} />
    </div>
  );
}
