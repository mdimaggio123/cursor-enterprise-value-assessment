"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Copy,
  Check,
  Building2,
  DollarSign,
  Users,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import meddpiccData from "@/data/meddpicc.json";
import { cn, formatCurrency } from "@/lib/utils";

type SectionContent = Record<string, string>;

interface MockAccount {
  id: string;
  name: string;
  industry: string;
  dealStage: string;
  seatCount: number;
  acvPotential: number;
  aeNotes: string;
  content: SectionContent;
}

export default function MeddpiccPage() {
  const { framework, description, sections, mockAccounts } = meddpiccData;
  const accounts = mockAccounts as MockAccount[];

  const [selectedAccountId, setSelectedAccountId] = useState<string>("bank");
  const [accountName, setAccountName] = useState(accounts[0].name);
  const [dealStage, setDealStage] = useState(accounts[0].dealStage);
  const [industry, setIndustry] = useState(accounts[0].industry);
  const [seatCount, setSeatCount] = useState(accounts[0].seatCount);
  const [acvPotential, setAcvPotential] = useState(accounts[0].acvPotential);
  const [aeNotes, setAeNotes] = useState(accounts[0].aeNotes);
  const [activeTab, setActiveTab] = useState(sections[0].id);
  const [content, setContent] = useState<SectionContent>(() => {
    const initial: SectionContent = {};
    sections.forEach((s) => {
      initial[s.id] = accounts[0].content[s.id] ?? "";
    });
    return initial;
  });
  const [copied, setCopied] = useState(false);

  const loadAccount = (accountId: string) => {
    const account = accounts.find((a) => a.id === accountId);
    if (!account) return;

    setSelectedAccountId(accountId);
    setAccountName(account.name);
    setDealStage(account.dealStage);
    setIndustry(account.industry);
    setSeatCount(account.seatCount);
    setAcvPotential(account.acvPotential);
    setAeNotes(account.aeNotes);

    const newContent: SectionContent = {};
    sections.forEach((s) => {
      newContent[s.id] = account.content[s.id] ?? "";
    });
    setContent(newContent);
  };

  const updateContent = (sectionId: string, value: string) => {
    setContent((prev) => ({ ...prev, [sectionId]: value }));
  };

  const completedSections = useMemo(
    () => sections.filter((s) => (content[s.id]?.trim().length ?? 0) > 50).length,
    [content, sections]
  );

  const coreSections = sections.filter((s) => s.group === "core");
  const extensionSections = sections.filter((s) => s.group === "extension");

  const handleExport = () => {
    const plan = {
      framework,
      account: accountName,
      industry,
      dealStage,
      seatCount,
      acvPotential,
      aeNotes,
      sections: sections.map((s) => ({
        id: s.id,
        title: s.title,
        content: content[s.id],
      })),
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(plan, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meddpicc-${accountName.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = async () => {
    const header = `# MEDDPICC+ Account Plan: ${accountName}\nIndustry: ${industry} | Stage: ${dealStage} | Seats: ${seatCount} | ACV: ${formatCurrency(acvPotential)}\n\nAE Notes: ${aeNotes}\n`;
    const body = sections
      .map(
        (s) =>
          `## ${s.letter} � ${s.title}\n${s.subtitle}\n\n${content[s.id]}`
      )
      .join("\n\n---\n\n");

    await navigator.clipboard.writeText(`${header}\n---\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stageColor = (stage: string) => {
    if (stage.includes("Negotiation") || stage.includes("Validation"))
      return "success";
    if (stage.includes("Discovery") || stage.includes("Qualification"))
      return "warning";
    return "secondary";
  };

  return (
    <div>
      <PageHeader
        title="MEDDPICC+ Account Plan"
        description={`Strategic enterprise account planning for Cursor AEs � ${description}.`}
      >
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyAll}
            className="gap-2"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy All"}
          </Button>
          <Button size="sm" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>

      {/* Mock account selector */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Load Mock Account</CardTitle>
          <CardDescription>
            Pre-built account plans for common enterprise verticals � select to
            populate all fields
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {accounts.map((account) => (
              <button
                key={account.id}
                type="button"
                onClick={() => loadAccount(account.id)}
                className={cn(
                  "rounded-lg border p-4 text-left transition-all hover:shadow-elevated",
                  selectedAccountId === account.id &&
                    "border-primary bg-primary/5 ring-2 ring-primary/20"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <Building2 className="h-5 w-5 shrink-0 text-primary" />
                  <Badge variant={stageColor(account.dealStage) as "success" | "warning" | "secondary"}>
                    {account.dealStage}
                  </Badge>
                </div>
                <p className="mt-2 text-sm font-semibold">{account.name}</p>
                <p className="text-xs text-muted-foreground">
                  {account.industry}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {account.seatCount.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {formatCurrency(account.acvPotential)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account metadata */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="account">Account Name</Label>
          <Input
            id="account"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stage">Deal Stage</Label>
          <Input
            id="stage"
            value={dealStage}
            onChange={(e) => setDealStage(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seats">Seat Count / ACV</Label>
          <div className="flex gap-2">
            <Input
              id="seats"
              type="number"
              value={seatCount}
              onChange={(e) => setSeatCount(Number(e.target.value))}
              className="w-24"
            />
            <Input
              type="number"
              value={acvPotential}
              onChange={(e) => setAcvPotential(Number(e.target.value))}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <Label htmlFor="aeNotes">AE Notes</Label>
        <Textarea
          id="aeNotes"
          value={aeNotes}
          onChange={(e) => setAeNotes(e.target.value)}
          className="min-h-[60px] text-sm"
          placeholder="Strategic notes, next actions, relationship context..."
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {completedSections}/{sections.length} sections populated
        </p>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span className="rounded bg-muted px-2 py-1">MEDDPICC Core (8)</span>
          <span className="rounded bg-primary/10 px-2 py-1 text-primary">
            Strategic Extensions (3)
          </span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-2 flex h-auto flex-wrap gap-1">
          {coreSections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <span className="font-bold">{section.letter}</span>
              <span className="hidden sm:inline">{section.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsList className="flex h-auto flex-wrap gap-1">
          {extensionSections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="gap-1.5 data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              <span className="font-bold">{section.letter}</span>
              <span className="hidden sm:inline">{section.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white",
                        section.group === "core"
                          ? "gradient-brand"
                          : "bg-violet-600"
                      )}
                    >
                      {section.letter}
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Discovery Prompts
                  </p>
                  <ul className="space-y-3">
                    {section.prompts.map((prompt) => (
                      <li
                        key={prompt}
                        className="rounded-lg border bg-muted/30 p-3 text-sm"
                      >
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Account Notes</CardTitle>
                  <CardDescription>
                    Document findings for {accountName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="min-h-[360px] font-mono text-sm leading-relaxed"
                    value={content[section.id]}
                    onChange={(e) =>
                      updateContent(section.id, e.target.value)
                    }
                    placeholder={`Enter your ${section.title.toLowerCase()} notes...`}
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="secondary">
                      {content[section.id]?.length ?? 0} characters
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const account = accounts.find(
                          (a) => a.id === selectedAccountId
                        );
                        if (account?.content[section.id]) {
                          updateContent(section.id, account.content[section.id]);
                        }
                      }}
                    >
                      Reset to mock data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Plan overview grid */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Plan Overview � {accountName}</CardTitle>
          <CardDescription>
            {industry} � {dealStage} � {seatCount.toLocaleString()} seats �{" "}
            {formatCurrency(acvPotential)} ACV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sections.map((section) => {
              const filled = (content[section.id]?.trim().length ?? 0) > 50;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveTab(section.id)}
                  className={cn(
                    "rounded-lg border p-4 text-left transition-all hover:border-primary/50 hover:shadow-elevated",
                    activeTab === section.id && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-white",
                          section.group === "core"
                            ? "bg-primary"
                            : "bg-violet-600"
                        )}
                      >
                        {section.letter}
                      </span>
                      <span className="text-sm font-medium">
                        {section.title}
                      </span>
                    </div>
                    {filled && (
                      <Check className="h-4 w-4 shrink-0 text-success" />
                    )}
                  </div>
                  <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">
                    {content[section.id]}
                  </p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
