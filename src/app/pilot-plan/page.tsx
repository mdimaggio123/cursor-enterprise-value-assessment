"use client";

import { useMemo, useState } from "react";
import { Download, Calendar, Users, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import pilotData from "@/data/pilot-plan.json";
import talkTracks from "@/data/talk-tracks.json";
import { AeTalkTrack } from "@/components/sales/ae-talk-track";

export default function PilotPlanPage() {
  const { templates, phases, metrics } = pilotData;

  const [companyName, setCompanyName] = useState("Acme Financial Services");
  const [duration, setDuration] = useState("90");
  const [cohortSize, setCohortSize] = useState("100");
  const [primaryTeam, setPrimaryTeam] = useState(templates.teamTypes[0]);
  const [championName, setChampionName] = useState("Sarah Chen, VP Engineering");
  const [notes, setNotes] = useState("");

  const scaledPhases = useMemo(() => {
    const durationNum = Number(duration);
    const scale = durationNum / 90;

    return phases.map((phase) => {
      const weekMatch = phase.weekRange.match(/Weeks (\d+)-(\d+)/);
      if (!weekMatch) return phase;

      const start = Math.max(1, Math.round(Number(weekMatch[1]) * scale));
      const end = Math.max(start + 1, Math.round(Number(weekMatch[2]) * scale));

      return {
        ...phase,
        weekRange: `Weeks ${start}-${end}`,
      };
    });
  }, [duration, phases]);

  const handleExport = () => {
    const plan = {
      company: companyName,
      duration: `${duration} days`,
      cohortSize: Number(cohortSize),
      primaryTeam,
      champion: championName,
      notes,
      phases: scaledPhases,
      successMetrics: metrics,
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(plan, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cursor-pilot-plan-${companyName.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        title="Pilot Plan Generator"
        description="Configure and generate a structured enterprise pilot plan with phases, deliverables, and success criteria."
      >
        <Button onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export Plan
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pilot Configuration</CardTitle>
            <CardDescription>Customize your pilot parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Pilot Duration</Label>
              <Select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                {templates.durationOptions.map((d) => (
                  <option key={d} value={d}>
                    {d} days
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cohort">Cohort Size</Label>
              <Select
                id="cohort"
                value={cohortSize}
                onChange={(e) => setCohortSize(e.target.value)}
              >
                {templates.cohortSizes.map((size) => (
                  <option key={size} value={size}>
                    {size} developers
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team">Primary Team</Label>
              <Select
                id="team"
                value={primaryTeam}
                onChange={(e) => setPrimaryTeam(e.target.value)}
              >
                {templates.teamTypes.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="champion">Executive Champion</Label>
              <Input
                id="champion"
                value={championName}
                onChange={(e) => setChampionName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Special requirements, constraints, or context..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="space-y-2 rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{duration}-day pilot</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span>{cohortSize} developers in {primaryTeam}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-primary" />
                <span>{scaledPhases.length} phases</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          {scaledPhases.map((phase, index) => (
            <Card key={phase.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle>{phase.name}</CardTitle>
                    <CardDescription>{phase.weekRange}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Objectives
                    </p>
                    <ul className="space-y-2">
                      {phase.objectives.map((obj) => (
                        <li key={obj} className="text-sm">
                          - {obj}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Deliverables
                    </p>
                    <ul className="space-y-2">
                      {phase.deliverables.map((del) => (
                        <li key={del} className="text-sm">
                          - {del}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Success Criteria
                    </p>
                    <ul className="space-y-2">
                      {phase.successCriteria.map((crit) => (
                        <li key={crit} className="text-sm">
                          - {crit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Success Metrics</CardTitle>
              <CardDescription>
                Key metrics to track during the pilot for {companyName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{metric.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Baseline: {metric.baseline}
                      </p>
                    </div>
                    <Badge variant="success">{metric.target}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AeTalkTrack tracks={talkTracks.pilot} />
    </div>
  );
}
