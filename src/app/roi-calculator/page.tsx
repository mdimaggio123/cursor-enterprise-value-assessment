"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  Clock,
  DollarSign,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { AeTalkTrack } from "@/components/sales/ae-talk-track";
import { KpiCard, MetricValue, StatGrid } from "@/components/dashboard/kpi-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import roiData from "@/data/roi-calculator.json";
import talkTracks from "@/data/talk-tracks.json";
import { calculateROI } from "@/lib/roi-calculations";
import { formatCurrency, formatCurrencyCompact, formatNumber, formatNumberCompact } from "@/lib/utils";

function NumberInput({
  id,
  label,
  value,
  onChange,
  step,
  suffix,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          step={step ?? 1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={suffix ? "pr-16" : undefined}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default function ROICalculatorPage() {
  const { defaults, scenarios, cfoNote } = roiData;

  const [developerCount, setDeveloperCount] = useState(defaults.developerCount);
  const [loadedEngineeringCost, setLoadedEngineeringCost] = useState(
    defaults.loadedEngineeringCost
  );
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(
    defaults.hoursSavedPerWeek
  );
  const [currentPrCycleDays, setCurrentPrCycleDays] = useState(
    defaults.currentPrCycleDays
  );
  const [expectedImprovementPercent, setExpectedImprovementPercent] = useState([
    defaults.expectedImprovementPercent,
  ]);
  const [onboardingReductionWeeks, setOnboardingReductionWeeks] = useState(
    defaults.onboardingReductionWeeks
  );
  const [cursorCostPerSeat, setCursorCostPerSeat] = useState(
    defaults.cursorCostPerSeat
  );
  const [implementationCost, setImplementationCost] = useState(
    defaults.implementationCost
  );
  const [adoptionRate, setAdoptionRate] = useState([defaults.adoptionRate]);
  const [realizationFactor, setRealizationFactor] = useState([
    defaults.realizationFactorPercent,
  ]);
  const [pilotCohortPercent, setPilotCohortPercent] = useState([15]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [workingHoursPerYear, setWorkingHoursPerYear] = useState(
    defaults.workingHoursPerYear
  );
  const [hoursPerWorkDay, setHoursPerWorkDay] = useState(
    defaults.hoursPerWorkDay
  );
  const [workingDaysPerYear, setWorkingDaysPerYear] = useState(
    defaults.workingDaysPerYear
  );

  const result = useMemo(
    () =>
      calculateROI({
        developerCount,
        loadedEngineeringCost,
        hoursSavedPerWeek,
        currentPrCycleDays,
        expectedImprovementPercent: expectedImprovementPercent[0],
        onboardingReductionWeeks,
        realizationFactorPercent: realizationFactor[0],
        cursorCostPerSeat,
        implementationCost,
        adoptionRate: adoptionRate[0],
        workingHoursPerYear,
        hoursPerWorkDay,
        workingDaysPerYear,
        pilotCohortPercent: pilotCohortPercent[0],
      }),
    [
      developerCount,
      loadedEngineeringCost,
      hoursSavedPerWeek,
      currentPrCycleDays,
      expectedImprovementPercent,
      onboardingReductionWeeks,
      realizationFactor,
      cursorCostPerSeat,
      implementationCost,
      adoptionRate,
      workingHoursPerYear,
      hoursPerWorkDay,
      workingDaysPerYear,
      pilotCohortPercent,
    ]
  );

  const applyScenario = (scenarioId: string) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      setHoursSavedPerWeek(scenario.hoursSavedPerWeek);
      setExpectedImprovementPercent([scenario.expectedImprovementPercent]);
      setOnboardingReductionWeeks(scenario.onboardingReductionWeeks);
      setAdoptionRate([scenario.adoptionRate]);
      setRealizationFactor([scenario.realizationFactorPercent]);
    }
  };

  const valueBreakdown = [
    {
      label: "Weekly Time Savings",
      value: result.timeSavingsValue,
      percent:
        result.grossProductivityValue > 0
          ? (result.timeSavingsValue / result.grossProductivityValue) * 100
          : 0,
      color: "bg-primary",
    },
    {
      label: "PR Cycle Improvement",
      value: result.prCycleValue,
      percent:
        result.grossProductivityValue > 0
          ? (result.prCycleValue / result.grossProductivityValue) * 100
          : 0,
      color: "bg-violet-500",
    },
    {
      label: "Onboarding Acceleration",
      value: result.onboardingValue,
      percent:
        result.grossProductivityValue > 0
          ? (result.onboardingValue / result.grossProductivityValue) * 100
          : 0,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div>
      <PageHeader
        title="ROI Calculator"
        description="Illustrative model for pilot planning. Conservative defaults with gross vs realized productivity value. All formulas update live."
      />

      <Card className="mb-6 border-amber-200 bg-amber-50/50">
        <CardContent className="space-y-2 p-4 text-sm text-muted-foreground">
          <p>{cfoNote}</p>
          <p className="text-xs text-amber-900/80">
            ROI multiple compares annual realized value to year-one license and
            implementation cost. Treat as a planning range, not a forecast.
          </p>
        </CardContent>
      </Card>

      <div className="mb-6 flex flex-wrap gap-2">
        {scenarios.map((scenario) => (
          <Button
            key={scenario.id}
            variant="outline"
            size="sm"
            onClick={() => applyScenario(scenario.id)}
          >
            {scenario.label}
            <Badge variant="secondary" className="ml-2">
              {scenario.hoursSavedPerWeek} hrs/wk - {scenario.expectedImprovementPercent}%
            </Badge>
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Inputs */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Core Assumptions
              </CardTitle>
              <CardDescription>
                Primary inputs that drive the productivity model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <NumberInput
                id="devCount"
                label="Number of Developers"
                value={developerCount}
                onChange={setDeveloperCount}
                hint="Total engineers in scope for rollout"
              />

              <NumberInput
                id="loadedCost"
                label="Average Loaded Engineering Cost"
                value={loadedEngineeringCost}
                onChange={setLoadedEngineeringCost}
                suffix="/yr"
                hint="Fully loaded cost incl. benefits, overhead (salary - ~1.3)"
              />

              <NumberInput
                id="hoursSaved"
                label="Hours Saved per Developer per Week"
                value={hoursSavedPerWeek}
                onChange={setHoursSavedPerWeek}
                step={0.5}
                suffix="hrs/wk"
                hint="Estimated weekly time reclaimed via AI-assisted workflows"
              />

              <NumberInput
                id="prCycle"
                label="Current PR Cycle Time"
                value={currentPrCycleDays}
                onChange={setCurrentPrCycleDays}
                step={0.1}
                suffix="days"
                hint="Average time from PR open to merge"
              />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Expected Improvement</Label>
                  <span className="text-sm font-medium">
                    {expectedImprovementPercent[0]}%
                  </span>
                </div>
                <Slider
                  value={expectedImprovementPercent}
                  onValueChange={setExpectedImprovementPercent}
                  min={5}
                  max={50}
                  step={1}
                />
                <p className="text-xs text-muted-foreground">
                  Applied to PR cycle time and throughput. Target:{" "}
                  <strong>{result.targetPrCycleDays.toFixed(1)} days</strong>
                </p>
              </div>

              <NumberInput
                id="onboarding"
                label="Onboarding Time Reduction"
                value={onboardingReductionWeeks}
                onChange={setOnboardingReductionWeeks}
                step={0.5}
                suffix="weeks"
                hint="Weeks of ramp time saved per developer during adoption"
              />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Productivity Capture Rate</Label>
                  <span className="text-sm font-medium">{realizationFactor[0]}%</span>
                </div>
                <Slider
                  value={realizationFactor}
                  onValueChange={setRealizationFactor}
                  min={10}
                  max={40}
                  step={1}
                />
                <p className="text-xs text-muted-foreground">
                  Share of gross productivity that converts to realized value.
                  Pilot validates this assumption. Typical planning range: 15-30%.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment & Adoption</CardTitle>
              <CardDescription>Used for payback and ROI calculations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <NumberInput
                id="seatCost"
                label="Seat Cost (placeholder)"
                value={cursorCostPerSeat}
                onChange={setCursorCostPerSeat}
                suffix="/yr"
                hint="Illustrative assumption. Enterprise pricing is custom and negotiated."
              />

              <NumberInput
                id="implCost"
                label="Implementation Cost"
                value={implementationCost}
                onChange={setImplementationCost}
                suffix="one-time"
              />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Adoption Rate</Label>
                  <span className="text-sm font-medium">{adoptionRate[0]}%</span>
                </div>
                <Slider
                  value={adoptionRate}
                  onValueChange={setAdoptionRate}
                  min={20}
                  max={100}
                  step={5}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Pilot Cohort Size</Label>
                  <span className="text-sm font-medium">
                    {pilotCohortPercent[0]}% (
                    {Math.round(developerCount * (pilotCohortPercent[0] / 100))}{" "}
                    devs)
                  </span>
                </div>
                <Slider
                  value={pilotCohortPercent}
                  onValueChange={setPilotCohortPercent}
                  min={5}
                  max={50}
                  step={5}
                />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? "Hide" : "Show"} advanced constants
              </Button>

              {showAdvanced && (
                <div className="space-y-4 border-t pt-4">
                  <NumberInput
                    id="workingHrs"
                    label="Working Hours per Year"
                    value={workingHoursPerYear}
                    onChange={setWorkingHoursPerYear}
                    hint="Default: 2,080 (52 wks - 40 hrs)"
                  />
                  <NumberInput
                    id="workDayHrs"
                    label="Hours per Work Day"
                    value={hoursPerWorkDay}
                    onChange={setHoursPerWorkDay}
                  />
                  <NumberInput
                    id="workingDays"
                    label="Working Days per Year"
                    value={workingDaysPerYear}
                    onChange={setWorkingDaysPerYear}
                    hint="Used to derive PRs per developer per year"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6 lg:col-span-2">
          <StatGrid columns={4}>
            <KpiCard
              label="Realized Productivity Value"
              value={formatCurrencyCompact(result.realizedProductivityValue)}
              title={formatCurrency(result.realizedProductivityValue)}
              trend="up"
            />
            <KpiCard
              label="Payback Period"
              value={
                result.paybackMonths === Infinity
                  ? "N/A"
                  : `${result.paybackMonths.toFixed(1)}`
              }
              unit={result.paybackMonths === Infinity ? undefined : "mo"}
            />
            <KpiCard
              label="ROI Multiple"
              value={`${result.roiMultiple.toFixed(1)}`}
              unit="x"
              trend="up"
            />
            <KpiCard
              label="Net Annual Benefit"
              value={formatCurrencyCompact(result.netAnnualBenefit)}
              title={formatCurrency(result.netAnnualBenefit)}
              trend={result.netAnnualBenefit >= 0 ? "up" : "down"}
            />
          </StatGrid>

          {/* Value breakdown bar */}
          <Card>
            <CardHeader>
              <CardTitle>Value Composition</CardTitle>
              <CardDescription>
                How gross productivity value is derived before realization factor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex h-4 overflow-hidden rounded-full">
                {valueBreakdown.map((item) => (
                  <div
                    key={item.label}
                    className={`${item.color} transition-all`}
                    style={{ width: `${item.percent}%` }}
                    title={`${item.label}: ${formatCurrency(item.value)}`}
                  />
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {valueBreakdown.map((item) => {
                  const full = formatCurrency(item.value);
                  const compact = formatCurrencyCompact(item.value);
                  return (
                    <div key={item.label} className="min-w-0 rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <MetricValue
                        value={compact}
                        title={full !== compact ? full : undefined}
                        weight="semibold"
                        className="mt-1"
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.percent.toFixed(0)}% of total
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Transparent calculation steps */}
          <Card>
            <CardHeader>
              <CardTitle>Calculation Breakdown</CardTitle>
              <CardDescription>
                Every step shown - edit inputs above to see formulas update live
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.steps.map((step, index) => (
                  <div
                    key={step.label}
                    className="flex items-start justify-between gap-4 rounded-lg border px-4 py-3 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{step.label}</p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {step.formula}
                        </p>
                      </div>
                    </div>
                    <p className="max-w-[40%] shrink-0 text-right text-sm font-semibold tabular-nums break-words sm:max-w-none">
                      {step.formatted}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
            <div className="flex min-w-0 items-center gap-3 overflow-hidden rounded-lg border bg-card p-4 shadow-card">
              <Users className="h-8 w-8 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Adopted Developers</p>
                <p className="truncate text-lg font-semibold tabular-nums">
                  {formatNumber(Math.round(result.adoptedDevelopers))}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 items-center gap-3 rounded-lg border bg-card p-4 shadow-card">
              <Clock className="h-8 w-8 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Annual Hours Saved</p>
                <MetricValue
                  value={formatNumberCompact(Math.round(result.annualHoursSaved))}
                  title={formatNumber(Math.round(result.annualHoursSaved))}
                  weight="semibold"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex min-w-0 items-center gap-3 overflow-hidden rounded-lg border bg-card p-4 shadow-card">
              <TrendingUp className="h-8 w-8 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">PRs / Dev / Year</p>
                <p className="text-lg font-semibold tabular-nums">
                  {result.prsPerDevPerYear.toFixed(1)}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 items-center gap-3 rounded-lg border bg-card p-4 shadow-card">
              <DollarSign className="h-8 w-8 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Year 1 Investment</p>
                <MetricValue
                  value={formatCurrencyCompact(result.totalYearOneInvestment)}
                  title={formatCurrency(result.totalYearOneInvestment)}
                  weight="semibold"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Pilot success metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Suggested Pilot Success Metrics
              </CardTitle>
              <CardDescription>
                Derived from your inputs - use these targets to validate assumptions
                during a {Math.round(developerCount * (pilotCohortPercent[0] / 100))}
                -developer pilot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 pr-4 font-medium text-muted-foreground">
                        Metric
                      </th>
                      <th className="pb-3 pr-4 font-medium text-muted-foreground">
                        Baseline
                      </th>
                      <th className="pb-3 pr-4 font-medium text-muted-foreground">
                        Target
                      </th>
                      <th className="pb-3 font-medium text-muted-foreground">
                        Rationale
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.pilotMetrics.map((metric) => (
                      <tr key={metric.name} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium">{metric.name}</td>
                        <td className="py-3 pr-4 text-muted-foreground">
                          {metric.baseline}
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant="success">{metric.target}</Badge>
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {metric.rationale}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AeTalkTrack tracks={talkTracks.roi} />
    </div>
  );
}
