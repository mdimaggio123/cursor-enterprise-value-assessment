"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Shield,
  Settings,
  KeyRound,
  GitBranch,
  Brain,
  Users,
  Code2,
  Crown,
  ArrowRight,
  ListChecks,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import readinessData from "@/data/readiness-assessment.json";
import {
  getScoreTier,
  getTierColor,
  getTierLabel,
  scoreIndicatorClass,
} from "@/lib/readiness-calculations";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ElementType> = {
  "security-privacy": Shield,
  "admin-controls": Settings,
  "sso-provisioning": KeyRound,
  "repo-governance": GitBranch,
  "model-governance": Brain,
  "adoption-change": Users,
  "workflow-fit": Code2,
  "executive-sponsorship": Crown,
};

type Answers = Record<string, number>;

export default function ReadinessPage() {
  const { categories, readinessLevels, scoreThresholds } = readinessData;
  const [answers, setAnswers] = useState<Answers>({});
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const totalQuestions = categories.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / totalQuestions) * 100;
  const isComplete = answeredCount === totalQuestions;

  const categoryScores = useMemo(() => {
    return categories.map((cat) => {
      const catAnswers = cat.questions
        .map((q) => answers[q.id])
        .filter((a) => a !== undefined);
      const maxScore = cat.questions.length * 3;
      const rawScore = catAnswers.reduce((sum, a) => sum + a, 0);
      const normalized = maxScore > 0 ? (rawScore / maxScore) * 100 : 0;
      const tier =
        catAnswers.length === cat.questions.length
          ? getScoreTier(normalized, scoreThresholds)
          : null;
      const nextSteps = tier ? cat.nextSteps[tier] : [];

      return {
        ...cat,
        score: normalized,
        answered: catAnswers.length,
        totalQuestions: cat.questions.length,
        tier,
        nextSteps,
      };
    });
  }, [answers, categories, scoreThresholds]);

  const overallScore = useMemo(() => {
    let totalWeighted = 0;
    let totalWeight = 0;

    categoryScores.forEach((cat) => {
      if (cat.answered === cat.totalQuestions) {
        totalWeighted += cat.score * cat.weight;
        totalWeight += cat.weight;
      }
    });

    return totalWeight > 0 ? totalWeighted / totalWeight : 0;
  }, [categoryScores]);

  const readinessLevel = isComplete
    ? readinessLevels.find(
        (level) =>
          overallScore >= level.minScore && overallScore <= level.maxScore
      )
    : null;

  const weakestCategories = useMemo(() => {
    return [...categoryScores]
      .filter((c) => c.tier !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);
  }, [categoryScores]);

  const currentCategory = categories.find((c) => c.id === activeCategory)!;
  const currentCategoryScore = categoryScores.find(
    (c) => c.id === activeCategory
  );

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const resetAssessment = () => {
    setAnswers({});
    setActiveCategory(categories[0].id);
  };

  return (
    <div>
      <PageHeader
        title="Enterprise Readiness Assessment"
        description="Evaluate preparedness across 8 enterprise dimensions � security, admin controls, SSO, repo governance, model governance, change management, workflow fit, and executive sponsorship."
      >
        <Button variant="outline" size="sm" onClick={resetAssessment}>
          Reset Assessment
        </Button>
      </PageHeader>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Progress: {answeredCount} of {totalQuestions} questions across{" "}
            {categories.length} categories
          </span>
          <span className="font-medium">{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Overall score banner when complete */}
      {isComplete && readinessLevel && (
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Overall Readiness Score
                </p>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-5xl font-bold">
                    {Math.round(overallScore)}
                  </span>
                  <span className="text-lg text-muted-foreground">/ 100</span>
                  <Badge
                    variant={
                      readinessLevel.color as
                        | "success"
                        | "warning"
                        | "destructive"
                    }
                    className="text-sm"
                  >
                    {readinessLevel.level}
                  </Badge>
                </div>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                  {readinessLevel.recommendation}
                </p>
              </div>

              <div className="min-w-[280px] rounded-lg border bg-card p-4">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <ListChecks className="h-4 w-4 text-primary" />
                  Recommended Next Steps
                </p>
                <ol className="space-y-2">
                  {readinessLevel.nextSteps.map((step, i) => (
                    <li key={step} className="flex gap-2 text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Category sidebar */}
        <div className="space-y-3 lg:col-span-1">
          {categoryScores.map((cat) => {
            const Icon = categoryIcons[cat.id] ?? Circle;
            const isActive = activeCategory === cat.id;
            const isCategoryComplete = cat.answered === cat.totalQuestions;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "w-full rounded-lg border p-4 text-left transition-all hover:shadow-elevated",
                  isActive && "border-primary bg-primary/5 shadow-elevated"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cat.answered}/{cat.totalQuestions} answered
                      {cat.tier && (
                        <>
                          {" � "}
                          <span
                            className={cn(
                              cat.tier === "high" && "text-success",
                              cat.tier === "medium" && "text-warning",
                              cat.tier === "low" && "text-destructive"
                            )}
                          >
                            {Math.round(cat.score)}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  {isCategoryComplete ? (
                    cat.tier ? (
                      <Badge
                        variant={
                          getTierColor(cat.tier) as
                            | "success"
                            | "warning"
                            | "destructive"
                        }
                        className="shrink-0 text-xs"
                      >
                        {getTierLabel(cat.tier)}
                      </Badge>
                    ) : (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    )
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                </div>
                {cat.answered > 0 && (
                  <Progress
                    value={cat.score}
                    className="mt-3 h-1.5"
                    indicatorClassName={scoreIndicatorClass(cat.score)}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Questions + category next steps */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>{currentCategory.name}</CardTitle>
                  <CardDescription>
                    {currentCategory.description}
                  </CardDescription>
                </div>
                {currentCategoryScore?.tier && (
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {Math.round(currentCategoryScore.score)}
                    </p>
                    <Badge
                      variant={
                        getTierColor(currentCategoryScore.tier) as
                          | "success"
                          | "warning"
                          | "destructive"
                      }
                    >
                      {getTierLabel(currentCategoryScore.tier)}
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {currentCategory.questions.map((question) => (
                <div key={question.id} className="space-y-3">
                  <p className="text-sm font-medium">{question.text}</p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {question.options.map((option) => {
                      const isSelected = answers[question.id] === option.score;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() =>
                            handleAnswer(question.id, option.score)
                          }
                          className={cn(
                            "rounded-lg border p-3 text-left text-sm transition-all hover:border-primary/50",
                            isSelected
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "hover:bg-muted/50"
                          )}
                        >
                          <span className="mb-1 block text-xs font-medium text-muted-foreground">
                            Score: {option.score}/3
                          </span>
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex justify-between border-t pt-4">
                <Button
                  variant="outline"
                  disabled={
                    categories.findIndex((c) => c.id === activeCategory) === 0
                  }
                  onClick={() => {
                    const idx = categories.findIndex(
                      (c) => c.id === activeCategory
                    );
                    if (idx > 0) setActiveCategory(categories[idx - 1].id);
                  }}
                >
                  Previous
                </Button>
                <Button
                  disabled={
                    categories.findIndex((c) => c.id === activeCategory) ===
                    categories.length - 1
                  }
                  onClick={() => {
                    const idx = categories.findIndex(
                      (c) => c.id === activeCategory
                    );
                    if (idx < categories.length - 1)
                      setActiveCategory(categories[idx + 1].id);
                  }}
                >
                  Next Category
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Category-specific next steps */}
          {currentCategoryScore?.tier &&
            currentCategoryScore.nextSteps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    Next Steps for {currentCategory.name}
                  </CardTitle>
                  <CardDescription>
                    Based on your{" "}
                    {getTierLabel(currentCategoryScore.tier).toLowerCase()}{" "}
                    score ({Math.round(currentCategoryScore.score)}/100)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {currentCategoryScore.nextSteps.map((step, i) => (
                      <li
                        key={step}
                        className="flex gap-3 rounded-lg border p-3 text-sm"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
        </div>
      </div>

      {/* Score overview grid when partially or fully complete */}
      {answeredCount > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Category Score Overview</CardTitle>
            <CardDescription>
              Weighted scores across all assessment dimensions
              {weakestCategories.length > 0 && !isComplete && (
                <> � focus on categories marked &ldquo;Needs Attention&rdquo;</>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categoryScores.map((cat) => {
                const Icon = categoryIcons[cat.id] ?? Circle;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "rounded-lg border p-4 text-left transition-all hover:shadow-elevated",
                      activeCategory === cat.id && "border-primary bg-primary/5"
                    )}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <Icon className="h-4 w-4 text-primary" />
                      {cat.tier && (
                        <Badge
                          variant={
                            getTierColor(cat.tier) as
                              | "success"
                              | "warning"
                              | "destructive"
                          }
                          className="text-xs"
                        >
                          {Math.round(cat.score)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium">{cat.name}</p>
                    <Progress
                      value={cat.answered > 0 ? cat.score : 0}
                      className="mt-2 h-1.5"
                      indicatorClassName={scoreIndicatorClass(cat.score)}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {cat.answered}/{cat.totalQuestions} questions
                      {cat.tier && ` � ${getTierLabel(cat.tier)}`}
                    </p>
                  </button>
                );
              })}
            </div>

            {isComplete && weakestCategories.length > 0 && (
              <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
                <p className="text-sm font-semibold">
                  Priority Areas to Address
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your lowest-scoring categories � tackle these before scaling
                  beyond pilot
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {weakestCategories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.name}
                      <Badge variant="destructive" className="ml-2">
                        {Math.round(cat.score)}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
