# Cursor Enterprise Value Assessment

A strategic enterprise sales toolkit built as a Next.js web app � designed to help Cursor AEs and enterprise buyers navigate the evaluation, pilot, and adoption journey for AI coding agents.

> **Built by a strategic enterprise AE** as a hands-on learning project. This is not an official Cursor product. It reflects one seller's attempt to deeply understand Cursor's product, buyer motion, and the enterprise adoption path for AI-assisted development.

---

## What I Built

**Cursor Enterprise Value Assessment** is a polished, mock-data-driven web application with six interactive modules that mirror the real enterprise buyer journey:

| Module | What it does |
|--------|----------------|
| **Executive Dashboard** | KPI cards, adoption trends, deal progress, risk register, and activity feed for a sample enterprise account |
| **ROI Calculator** | Transparent financial model with editable inputs (developer count, loaded cost, hours saved, PR cycle time, improvement %, onboarding reduction) � shows every formula step and suggests pilot success metrics |
| **Enterprise Readiness Assessment** | 24 scored questions across 8 categories (security, admin controls, SSO, repo governance, model governance, change management, workflow fit, executive sponsorship) with tiered next steps |
| **Pilot Plan Generator** | Configurable 30/60/90-day pilot with phased objectives, deliverables, success criteria, and JSON export |
| **MEDDPICC+ Account Plan** | 11-field account planning framework with discovery prompts and four pre-built mock accounts (bank, retailer, SaaS, media) |
| **Workflow Demo** | Before/after developer workflow comparisons across feature development, bug investigation, and refactoring |

The app uses **mock JSON data only** � no backend, no auth, no live integrations. Every account, metric, and deal detail is fabricated for demonstration and learning.

**Tech stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn-style components, Recharts, Lucide icons.

---

## Why I Built It

Enterprise software sales is not about feature lists. It is about understanding how buyers evaluate risk, justify spend, navigate procurement, and measure success. Cursor sits at an intersection that makes this especially complex:

- **Developers** want autonomy and speed
- **Engineering leaders** need measurable productivity and retention
- **CISOs** need proof that code and IP are protected
- **CFOs** need ROI that survives a board conversation

I built this app because reading decks and battlecards is not the same as *building the buyer journey yourself*. By scaffolding the full evaluation arc � from first discovery call through pilot design, security review, and expansion planning � I forced myself to answer questions like:

- What does a credible ROI model look like for a 1,200-developer bank vs. a 320-person SaaS company?
- Which readiness gaps actually block a pilot vs. which are procurement theater?
- How does MEDDPICC change when security blockers and expansion hypothesis are first-class fields?
- What would a CTO need to see in the first 10 minutes vs. what a CISO needs in week 3?

This is a **learning artifact** I can use in internal enablement, customer conversations, and as proof that I understand the product I sell.

---

## Cursor Features I Used While Building

I used Cursor itself to build this entire application. Here is what I actually relied on:

### Agent Mode
- Scaffolded the full Next.js project structure (pages, components, mock data files) from natural-language prompts
- Generated all six mock JSON datasets with industry-specific content (bank, retailer, SaaS, media account plans)
- Built the ROI calculation engine (`roi-calculations.ts`) and readiness scoring logic from requirements descriptions

### Tab Completion
- Inline suggestions for Tailwind class patterns, shadcn-style component APIs, and Recharts configuration
- TypeScript type definitions and React hook patterns across 30+ files

### Codebase Context
- Agent understood existing component conventions (Card, Badge, Progress patterns) when adding new pages
- Maintained consistent design system when extending the readiness assessment from 5 to 8 categories

### Multi-file Editing
- Refactored the ROI calculator from a simple slider model to a transparent step-by-step formula breakdown across page + lib + JSON data files in one session
- Extended MEDDPICC from 8 core fields to 11 (adding Security Blockers, Technical Validation, Expansion Hypothesis) while keeping the page functional

### What I Did Not Use (and Why That Matters for Enterprise Sales)
- No MCP integrations, no live API calls, no production deployment � this mirrors how many enterprise evaluators start: isolated proof-of-value before connecting to real systems
- Understanding when buyers want a **sandbox** vs. when they need **production SSO/SCIM** is part of the sale

---

## What I Learned About Selling AI Coding Agents to Enterprise

Building this app clarified several patterns I now treat as core to the enterprise motion:

### 1. The sale is multi-threaded by default
No single buyer owns this decision. A CTO cares about velocity. A CISO cares about data retention. A CFO cares about payback period. A VP Engineering cares about developer satisfaction and retention. This app exists because **one ROI slide is not enough** � you need artifacts tailored to each stakeholder.

### 2. Security is the gate, not the close
In every mock account (especially the bank and media company), security blockers appear *before* technical validation completes. Enterprise buyers do not ask "Is Cursor good?" first � they ask "Will our CISO approve this?" Privacy Mode, SOC 2, repo allowlists, and `.cursorignore` governance are table stakes, not differentiators.

### 3. Copilot is the incumbent, not the status quo
The most common competitive scenario is not "no AI tooling" � it is "we already have Copilot." Differentiation must be framed as **IDE replacement with codebase context and Agent mode**, not "another AI plugin." The workflow demo module exists to make this tangible.

### 4. ROI must be transparent or it is not trusted
CFOs and procurement teams do not accept black-box ROI claims. The calculator shows every formula step (hourly loaded cost ? hours saved ? PR cycle value ? onboarding value) so the buyer can challenge assumptions in real time. **Editable inputs are a trust mechanism.**

### 5. Pilot design is where deals are won or lost
Vague "let's try it" pilots fail. Structured 90-day plans with phased objectives, named success criteria, and DORA metrics baselines are what convert technical validation into procurement. The pilot plan generator encodes this discipline.

### 6. Readiness assessment prevents premature scaling
Many deals stall because the org skips governance setup (SSO, admin controls, repo policies) and hits friction at rollout. The 8-category readiness assessment surfaces gaps *before* the pilot expands � and gives the AE specific next steps per category.

### 7. Land-and-expand is industry-specific
- **Bank:** Land with Platform Engineering (non-PCI repos), expand after CISO sign-off
- **Retailer:** Land with e-commerce team under holiday deadline pressure
- **SaaS:** Full-org deal, CTO is champion and economic buyer
- **Media:** Land with CMS migration squad, Legal/IP review gates expansion

The MEDDPICC+ Expansion Hypothesis field forces the AE to articulate this path before the first pilot kickoff.

### 8. Build vs. buy is a real competitor
The SaaS mock account includes an internal platform team proposing to build a custom AI coding layer. Enterprise AEs must be ready to compare **time-to-value and opportunity cost**, not just license price.

---

## How I Would Use This in Discovery Calls

### With a CTO

**Goal:** Connect Cursor to strategic engineering priorities and establish executive sponsorship.

**Modules to use:**
1. **Executive Dashboard** � Open with the sample account story: "Here is what adoption looks like at 90 days for a similar-sized org." Walk through KPI cards (adoption rate, productivity gain, ROI multiple, time to value).
2. **Workflow Demo** � Show the before/after for feature development. CTOs respond to *time compression*, not feature lists. "This 4.5-hour task becomes 1.8 hours � that is the Agent mode difference."
3. **ROI Calculator** � Enter their numbers live (developer count, loaded cost). Let them adjust assumptions. Ask: "What improvement percentage would make this a board-level initiative for you?"

**Discovery questions to tee up:**
- "What engineering metrics do you report to the board today?"
- "Where is velocity declining fastest � greenfield features, migrations, or maintenance?"
- "Do you have an AI engineering strategy, or is it emerging team by team?"

---

### With a VP Engineering

**Goal:** Validate workflow fit, identify champions, and design a credible pilot.

**Modules to use:**
1. **Readiness Assessment** � Run through Developer Workflow Fit and Adoption & Change Management categories together. Ask the scored questions live; the tiered next steps give you a joint action plan.
2. **Pilot Plan Generator** � Configure a pilot on the call: their team name, cohort size, duration. Export the plan as a follow-up artifact. This turns discovery into a concrete next step.
3. **Workflow Demo** � Focus on the scenario closest to their pain (bug investigation for ops-heavy teams, refactoring for legacy modernization).

**Discovery questions to tee up:**
- "Which teams would feel this fastest � platform, frontend, or data engineering?"
- "Who are your internal tooling champions today?"
- "What did your last developer tool rollout look like � what worked, what did not?"

---

### With a CISO

**Goal:** Surface security blockers early, provide evidence, and scope a safe pilot.

**Modules to use:**
1. **Readiness Assessment** � Security & Privacy, Admin Controls, Repo Governance, and Model Governance categories. Do not skip questions � let them score their own org. Low scores become your mutual roadmap.
2. **MEDDPICC+ ? Security Blockers** � Load the bank mock account as a reference: "Here is how a peer financial services company structured their security review." Edit fields live with their specific concerns.
3. **Pilot Plan Generator** � Scope a pilot that explicitly excludes sensitive repos. Show that you understand their boundary conditions.

**Discovery questions to tee up:**
- "What is your policy on third-party AI processing of source code?"
- "Do you require Privacy Mode / zero retention, or is a DPA sufficient?"
- "Which repositories would be in scope vs. explicitly excluded for a pilot?"
- "What documentation do you need before InfoSec will approve a 90-day evaluation?"

---

### With a CFO

**Goal:** Justify investment with transparent ROI and compare against alternatives (contractors, status quo, build).

**Modules to use:**
1. **ROI Calculator** � This is the primary artifact. Enter their numbers, show the calculation breakdown step by step. Highlight payback period and net annual benefit. Use scenario presets (Conservative / Expected / Aggressive) to bracket the conversation.
2. **Executive Dashboard** � Show the company profile card and addressable spend. Frame as: "At your developer count, the total investment is X against Y in productivity value."
3. **MEDDPICC+ ? Metrics + Expansion Hypothesis** � Connect ROI to the land-and-expand path. CFOs want to know this is not an open-ended spend.

**Discovery questions to tee up:**
- "How do you currently measure engineering productivity � or is it a black box?"
- "What are you spending on contractors or agency dev work that this could offset?"
- "What payback period would make this a straightforward yes?"
- "Is there an existing AI tooling budget, or does this compete with headcount?"

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd cursor-enterprise-value-assessment
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
??? app/
?   ??? page.tsx                 # Executive Dashboard
?   ??? roi-calculator/          # Transparent ROI model
?   ??? readiness/               # 8-category readiness assessment
?   ??? pilot-plan/              # Configurable pilot plan generator
?   ??? meddpicc/                # MEDDPICC+ account plan builder
?   ??? workflow-demo/           # Before/after workflow comparison
??? components/
?   ??? ui/                      # shadcn-style primitives
?   ??? layout/                  # Sidebar, page headers
?   ??? dashboard/               # KPI cards, stat grids
??? data/                        # Mock JSON datasets
??? lib/
?   ??? utils.ts
?   ??? roi-calculations.ts      # Transparent ROI formulas
?   ??? readiness-calculations.ts
```

---

## Deploy Publicly (Vercel)

### 1. Push to GitHub

Create a repo at [github.com/new](https://github.com/new) named `cursor-enterprise-value-assessment`, then:

```bash
cd ~/Projects/cursor-enterprise-value-assessment
git add .
git commit -m "Initial commit — Cursor Enterprise Value Assessment"
git branch -M main
git push -u origin main
```

**Repository:** [github.com/mdimaggio123/cursor-enterprise-value-assessment](https://github.com/mdimaggio123/cursor-enterprise-value-assessment)

### 2. Import on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import `mdimaggio123/cursor-enterprise-value-assessment`
4. Click **Deploy** (defaults are fine)

Your public URL will be something like `https://cursor-enterprise-value-assessment.vercel.app`.

---

## License

MIT � use freely for demos, enablement, and learning.
