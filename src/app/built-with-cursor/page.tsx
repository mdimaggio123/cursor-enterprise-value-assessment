import {
  Bot,
  Bug,
  Code2,
  Layers,
  Rocket,
  Search,
  Wrench,
} from "lucide-react";
import { AeTalkTrack } from "@/components/sales/ae-talk-track";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import talkTracks from "@/data/talk-tracks.json";

const capabilities = [
  { title: "Agent for multi-file scaffolding", description: "Agent generated the Next.js app structure, pages, mock data, and component library from natural-language prompts, then edited multiple files in one pass.", icon: Bot },
  { title: "Codebase indexing and context", description: "Codebase indexing kept components consistent as new pages were added, so modules reused existing KpiCard, PageHeader, and talk-track patterns.", icon: Search },
  { title: "Plan Mode before writing code", description: "Plan Mode defined buyer-journey modules and produced an implementation plan to review before edits landed.", icon: Layers },
  { title: "Cmd-K and Tab for refinement", description: "KPI cards, layouts, and copy were refined with inline Cmd-K edits and Tab completions.", icon: Wrench },
  { title: "Debugging loop in the editor", description: "TypeScript lint errors, KPI overflow bugs, and Vercel build failures were resolved through Agent-assisted debugging in the editor.", icon: Bug },
  { title: "Terminal and deployment", description: "Git, dev server, GitHub push, and Vercel deployment ran through Cursor's integrated terminal.", icon: Rocket },
];

const learnings = [
  "Cursor is not just autocomplete. It is an agentic development environment.",
  "The enterprise sale is not only 'developers like it.' It is about measurable throughput, governance, security, adoption, and executive confidence.",
  "A strong pilot needs business metrics, technical validation, champion development, and CISO alignment.",
  "The AE needs to connect developer workflow improvements to CTO, CFO, CISO, and VP Engineering priorities.",
  "Gains are uneven. Agents help most on well-structured code with good tests, and less on large legacy monoliths, flaky suites, or unusual stacks. A credible pilot scopes for that instead of promising uniform lift.",
];

const salesMotionUses = [
  { persona: "CFO", action: "Use the ROI model with conservative defaults and a productivity capture rate to align on assumptions before scale." },
  { persona: "CTO / VP Engineering", action: "Use the workflow demo to show how Plan Mode and Agent compress context gathering, boilerplate, tests, and debug loops." },
  { persona: "CISO", action: "Use readiness scoring and MEDDPICC security blockers to align on SSO, privacy controls, model governance, and approved repos." },
  { persona: "Sales leadership", action: "Use pilot plan structure and MEDDPICC+ account planning to track metrics, economic buyer, paper process, and expansion." },
];

export default function BuiltWithCursorPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border bg-gradient-to-br from-violet-500/5 to-primary/5 p-8">
        <Badge variant="secondary" className="mb-3">Built with Cursor</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          Built with Cursor as an enterprise sales artifact
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          This connects hands-on product learning with enterprise buyer conversations.
          It is a sales artifact, not a production app: a framework for modeling how AI
          coding agents change developer workflows, pilot design, governance, and
          executive value realization.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Cursor capabilities used</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <Card key={cap.title}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">{cap.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{cap.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Enterprise sales learnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {learnings.map((item) => (
              <li key={item} className="flex gap-2 text-sm">
                <span className="text-primary">-</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How this translates to an enterprise sales motion</CardTitle>
          <CardDescription>
            Persona-specific modules for discovery, pilot design, and deal execution
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {salesMotionUses.map((item) => (
            <div key={item.persona} className="rounded-lg border p-4">
              <p className="text-sm font-semibold">{item.persona}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.action}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <AeTalkTrack tracks={talkTracks.built} title="AE Talk Track" />
    </div>
  );
}
