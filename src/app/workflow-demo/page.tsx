"use client";

import { useState } from "react";
import {
  ArrowRight,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle2,
  Play,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { AeTalkTrack } from "@/components/sales/ae-talk-track";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import workflowData from "@/data/workflow-demo.json";
import talkTracks from "@/data/talk-tracks.json";
import { cn } from "@/lib/utils";

export default function WorkflowDemoPage() {
  const { scenarios, workflows, summaryMetrics, summary } = workflowData;
  const [activeScenario, setActiveScenario] = useState(scenarios[0].id);
  const [view, setView] = useState<"before" | "after">("before");
  const [animatingStep, setAnimatingStep] = useState<number | null>(null);

  const workflow = workflows[activeScenario as keyof typeof workflows];
  const currentView = view === "before" ? workflow.before : workflow.after;
  const timeReduction = Math.round(
    ((parseFloat(workflow.before.totalTime) -
      parseFloat(workflow.after.totalTime)) /
      parseFloat(workflow.before.totalTime)) *
      100
  );

  const playAnimation = () => {
    setAnimatingStep(null);
    currentView.steps.forEach((_, index) => {
      setTimeout(() => setAnimatingStep(index), index * 600);
    });
    setTimeout(
      () => setAnimatingStep(null),
      currentView.steps.length * 600 + 500
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cursor Workflow Demo"
        description="Traditional developer workflow vs Cursor-assisted agentic workflow for enterprise feature delivery."
      />

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5 text-sm leading-relaxed text-muted-foreground">
          {summary}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-4 p-4">
            <Clock className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Avg. Time Reduction</p>
              <p className="text-2xl font-bold">{summaryMetrics.averageTimeReduction}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <Zap className="h-8 w-8 text-warning" />
            <div>
              <p className="text-xs text-muted-foreground">Context Switches Eliminated</p>
              <p className="text-2xl font-bold">{summaryMetrics.contextSwitchesEliminated}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <CheckCircle2 className="h-8 w-8 text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Satisfaction Improvement</p>
              <p className="text-2xl font-bold">+{summaryMetrics.developerSatisfactionDelta} pts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeScenario} onValueChange={setActiveScenario}>
        <TabsList>
          {scenarios.map((scenario) => (
            <TabsTrigger key={scenario.id} value={scenario.id}>
              {scenario.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {scenarios.map((scenario) => (
          <TabsContent key={scenario.id} value={scenario.id}>
            <p className="mb-4 text-sm text-muted-foreground">{scenario.description}</p>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="inline-flex rounded-lg border p-1">
                <button
                  type="button"
                  onClick={() => setView("before")}
                  className={cn(
                    "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    view === "before" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Traditional
                </button>
                <button
                  type="button"
                  onClick={() => setView("after")}
                  className={cn(
                    "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    view === "after" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  With Cursor
                </button>
              </div>

              <Button variant="outline" size="sm" onClick={playAnimation} className="gap-2">
                <Play className="h-4 w-4" />
                Animate Steps
              </Button>

              <div className="ml-auto flex items-center gap-2">
                <Badge variant={view === "before" ? "secondary" : "success"}>
                  Total: {currentView.totalTime}
                </Badge>
                <Badge variant="success">-{timeReduction}% vs traditional</Badge>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {view === "before" ? workflow.before.label : workflow.after.label}
                  </CardTitle>
                  <CardDescription>Step-by-step breakdown of the engineering task</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentView.steps.map((step, index) => (
                    <div
                      key={step.step}
                      className={cn(
                        "flex items-start gap-4 rounded-lg border p-4 transition-all duration-300",
                        animatingStep === index && "border-primary bg-primary/5 shadow-elevated",
                        animatingStep !== null && animatingStep < index && "opacity-40"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                          view === "after" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}
                      >
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{step.action}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="outline">{step.tool}</Badge>
                          <span className="text-xs text-muted-foreground">{step.duration}</span>
                        </div>
                      </div>
                      {index < currentView.steps.length - 1 && (
                        <ArrowRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Time Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="mb-1 text-sm text-muted-foreground">Traditional: {workflow.before.totalTime}</p>
                      <div className="h-3 rounded-full bg-muted">
                        <div className="h-full w-full rounded-full bg-muted-foreground/30" />
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-primary">Cursor-assisted: {workflow.after.totalTime}</p>
                      <div className="h-3 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{
                            width: `${(parseFloat(workflow.after.totalTime) / parseFloat(workflow.before.totalTime)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      {view === "before" ? "Pain Points" : "Improvements"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(view === "before" ? workflow.before.painPoints : workflow.after.improvements).map((item) => (
                        <li key={item} className="flex gap-2 text-sm">
                          {view === "before" ? (
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                          ) : (
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          )}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <AeTalkTrack tracks={talkTracks.workflow} />
    </div>
  );
}
