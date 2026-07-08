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
import { HiringWalkthrough } from "@/components/sales/hiring-walkthrough";
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
  { title: "Agent for multi-file scaffolding", description: "Used Agent to generate the Next.js app structure, pages, mock data, and the shadcn-style component library from natural-language prompts, then edit multiple files in one pass.", icon: Bot },
  { title: "Codebase indexing and context", description: "Cursor's codebase indexing kept components consistent as I added pages, so new modules reused the existing KpiCard, PageHeader, and talk-track patterns.", icon: Search },
  { title: "Plan Mode before writing code", description: "Used Plan Mode to define the buyer-journey modules and get an implementation plan I could review before any edits landed.", icon: Layers },
  { title: "Cmd-K and Tab for refinement", description: "Iterated on KPI cards, layouts, and copy with inline Cmd-K edits and Tab completions instead of hand-editing every line.", icon: Wrench },
  { title: "Debugging loop in the editor", description: "Fed TypeScript lint errors, KPI overflow bugs, and Vercel build failures back to the Agent and applied the proposed diffs directly.", icon: Bug },
  { title: "Terminal and deployment", description: "Ran git and the dev server in Cursor's integrated terminal, then pushed to GitHub and deployed on Vercel.", icon: Rocket },
];

const learnings = [
  "Cursor is not just autocomplete. It is an agentic development environment.",
  "The enterprise sale is not only 'developers like it.' It is about measurable throughput, governance, security, adoption, and executive confidence.",
  "A strong pilot needs business metrics, technical validation, champion development, and CISO alignment.",
  "The AE needs to connect developer workflow improvements to CTO, CFO, CISO, and VP Engineering priorities.",
  "Gains are uneven. Agents help most on well-structured code with good tests, and less on large legacy monoliths, flaky suites, or unusual stacks. A credible pilot scopes for that instead of promising uniform lift.",
];

const interviewUses = [
  { persona: "CFO lens", action: "Walk through the ROI model with conservative defaults and a realization factor." },
  { persona: "CTO / VP Engineering lens", action: "Walk through the workflow demo and Plan Mode + Agent sequence." },
  { persona: "CISO lens", action: "Walk through governance, readiness, and security blockers in MEDDPICC." },
  { persona: "Sales leadership lens", action: "Walk through pilot plan structure and MEDDPICC+ account planning." },
];

export default function BuiltWithCursorPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border bg-gradient-to-br from-violet-500/5 to-primary/5 p-8">
        <Badge variant="secondary" className="mb-3">Built with Cursor</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          Built with Cursor, by a Strategic Enterprise AE
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          I built this as a sales artifact, not a production app. The goal was to use
          Cursor to rapidly understand how AI coding agents change developer workflows,
          enterprise pilot design, governance conversations, and executive value
          realization.
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
            What I learned
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
          <CardTitle>How I would use this in an interview</CardTitle>
          <CardDescription>Persona-specific walkthrough paths</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {interviewUses.map((item) => (
            <div key={item.persona} className="rounded-lg border p-4">
              <p className="text-sm font-semibold">{item.persona}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.action}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <AeTalkTrack tracks={talkTracks.built} title="AE Narrative" />
      <HiringWalkthrough />
    </div>
  );
}
