export type ReadinessTier = "low" | "medium" | "high";

export interface CategoryScore {
  id: string;
  name: string;
  weight: number;
  description: string;
  score: number;
  answered: number;
  totalQuestions: number;
  tier: ReadinessTier | null;
  nextSteps: string[];
}

export function getScoreTier(
  score: number,
  thresholds: { low: number; high: number }
): ReadinessTier {
  if (score < thresholds.low) return "low";
  if (score >= thresholds.high) return "high";
  return "medium";
}

export function getTierLabel(tier: ReadinessTier): string {
  switch (tier) {
    case "low":
      return "Needs Attention";
    case "medium":
      return "Developing";
    case "high":
      return "Strong";
  }
}

export function getTierColor(tier: ReadinessTier): string {
  switch (tier) {
    case "low":
      return "destructive";
    case "medium":
      return "warning";
    case "high":
      return "success";
  }
}

export function scoreIndicatorClass(score: number): string {
  if (score >= 75) return "bg-success";
  if (score >= 50) return "bg-warning";
  return "bg-destructive";
}
