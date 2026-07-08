import { Video } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    step: 1,
    title: "What I built",
    detail:
      "A Cursor-specific enterprise sales artifact with ROI modeling, readiness scoring, pilot design, MEDDPICC planning, and workflow transformation demos.",
  },
  {
    step: 2,
    title: "How I used Cursor to build it",
    detail:
      "Agent-assisted scaffolding, codebase context, plan-first iteration, component refinement, debugging, and deployment workflow - all as a non-engineer AE.",
  },
  {
    step: 3,
    title: "What it taught me about selling AI coding agents",
    detail:
      "Enterprise buyers need governance, measurable pilots, and executive confidence - not just developer enthusiasm.",
  },
  {
    step: 4,
    title: "How I would apply this in a Fortune 500 account",
    detail:
      "Land with a bounded pilot, align CISO early, instrument metrics with the CFO, and use MEDDPICC to drive a disciplined expansion path.",
  },
  {
    step: 5,
    title: "What I would test in a real enterprise pilot",
    detail:
      "Weekly active usage, PR cycle time, validated hours saved, security compliance, and developer satisfaction against pre-agreed baselines.",
  },
];

export function HiringWalkthrough() {
  return (
    <Card className="border-violet-200 bg-violet-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-violet-600" />
          Hiring Team Walkthrough (3-minute Loom outline)
        </CardTitle>
        <CardDescription>
          A scripted path for demonstrating product learning speed and enterprise judgment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((item) => (
          <div
            key={item.step}
            className="flex gap-4 rounded-lg border bg-card p-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
              {item.step}
            </span>
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
