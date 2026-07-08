import { Route } from "lucide-react";
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
    title: "Define the business case",
    detail:
      "Model ROI with conservative assumptions, readiness scoring, and pilot success metrics tied to executive priorities.",
  },
  {
    step: 2,
    title: "Validate workflow impact",
    detail:
      "Compare traditional developer workflows against Cursor-assisted agentic workflows using Plan Mode, Agent, and codebase context.",
  },
  {
    step: 3,
    title: "Align governance early",
    detail:
      "Surface SSO, privacy controls, model governance, and repo policy requirements before expanding beyond approved scope.",
  },
  {
    step: 4,
    title: "Run a bounded pilot",
    detail:
      "Land with a bounded pilot, align CTO and CISO early, instrument metrics with the CFO, and use MEDDPICC to drive a disciplined expansion path.",
  },
  {
    step: 5,
    title: "Instrument and expand",
    detail:
      "Track weekly active usage, PR cycle time, validated hours saved, security compliance, and developer satisfaction against pre-agreed baselines.",
  },
];

export function EnterpriseMotionWalkthrough() {
  return (
    <Card className="border-violet-200 bg-violet-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-5 w-5 text-violet-600" />
          Enterprise rollout playbook
        </CardTitle>
        <CardDescription>
          A structured path from discovery through pilot design, governance alignment, and expansion.
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
