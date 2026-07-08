export interface ROIInputs {
  developerCount: number;
  loadedEngineeringCost: number;
  hoursSavedPerWeek: number;
  currentPrCycleDays: number;
  expectedImprovementPercent: number;
  onboardingReductionWeeks: number;
  cursorCostPerSeat: number;
  implementationCost: number;
  adoptionRate: number;
  workingHoursPerYear: number;
  hoursPerWorkDay: number;
  workingDaysPerYear: number;
  pilotCohortPercent: number;
}

export interface CalculationStep {
  label: string;
  formula: string;
  result: number;
  formatted: string;
}

export interface ROICalculationResult {
  hourlyLoadedCost: number;
  adoptedDevelopers: number;
  annualHoursSaved: number;
  timeSavingsValue: number;
  prsPerDevPerYear: number;
  daysSavedPerPr: number;
  annualPrDaysSaved: number;
  prCycleValue: number;
  onboardingHoursSaved: number;
  onboardingValue: number;
  annualProductivityValue: number;
  annualLicenseCost: number;
  totalYearOneInvestment: number;
  netAnnualBenefit: number;
  paybackMonths: number;
  roiMultiple: number;
  targetPrCycleDays: number;
  steps: CalculationStep[];
  pilotMetrics: PilotMetric[];
}

export interface PilotMetric {
  name: string;
  target: string;
  baseline: string;
  rationale: string;
}

export function calculateROI(inputs: ROIInputs): ROICalculationResult {
  const {
    developerCount,
    loadedEngineeringCost,
    hoursSavedPerWeek,
    currentPrCycleDays,
    expectedImprovementPercent,
    onboardingReductionWeeks,
    cursorCostPerSeat,
    implementationCost,
    adoptionRate,
    workingHoursPerYear,
    hoursPerWorkDay,
    workingDaysPerYear,
    pilotCohortPercent,
  } = inputs;

  const adoption = adoptionRate / 100;
  const improvement = expectedImprovementPercent / 100;
  const adoptedDevelopers = developerCount * adoption;

  // Step 1: Hourly loaded cost
  const hourlyLoadedCost = loadedEngineeringCost / workingHoursPerYear;

  // Step 2: Time savings from hours saved per developer per week
  const annualHoursSaved = adoptedDevelopers * hoursSavedPerWeek * 52;
  const timeSavingsValue = annualHoursSaved * hourlyLoadedCost;

  // Step 3: PR cycle time improvement value
  const prsPerDevPerYear =
    currentPrCycleDays > 0 ? workingDaysPerYear / currentPrCycleDays : 0;
  const daysSavedPerPr = currentPrCycleDays * improvement;
  const annualPrDaysSaved = adoptedDevelopers * prsPerDevPerYear * daysSavedPerPr;
  const prCycleValue = annualPrDaysSaved * hoursPerWorkDay * hourlyLoadedCost;

  // Step 4: Onboarding time reduction (one-time ramp acceleration, amortized in year 1)
  const onboardingHoursSaved =
    adoptedDevelopers * onboardingReductionWeeks * 40;
  const onboardingValue = onboardingHoursSaved * hourlyLoadedCost;

  // Total annual productivity value
  const annualProductivityValue =
    timeSavingsValue + prCycleValue + onboardingValue;

  // Investment
  const annualLicenseCost = adoptedDevelopers * cursorCostPerSeat;
  const totalYearOneInvestment = annualLicenseCost + implementationCost;
  const netAnnualBenefit = annualProductivityValue - totalYearOneInvestment;

  const paybackMonths =
    annualProductivityValue > 0
      ? (totalYearOneInvestment / annualProductivityValue) * 12
      : Infinity;

  const roiMultiple =
    totalYearOneInvestment > 0
      ? annualProductivityValue / totalYearOneInvestment
      : 0;

  const targetPrCycleDays = currentPrCycleDays * (1 - improvement);

  const pilotCohort = Math.round(developerCount * (pilotCohortPercent / 100));
  const pilotScale = pilotCohort / developerCount;

  const steps: CalculationStep[] = [
    {
      label: "Hourly loaded cost",
      formula: `$${loadedEngineeringCost.toLocaleString()} � ${workingHoursPerYear.toLocaleString()} hrs`,
      result: hourlyLoadedCost,
      formatted: `$${hourlyLoadedCost.toFixed(2)}/hr`,
    },
    {
      label: "Adopted developers",
      formula: `${developerCount.toLocaleString()} � ${adoptionRate}% adoption`,
      result: adoptedDevelopers,
      formatted: adoptedDevelopers.toLocaleString(undefined, { maximumFractionDigits: 0 }),
    },
    {
      label: "Annual hours saved",
      formula: `${adoptedDevelopers.toLocaleString(undefined, { maximumFractionDigits: 0 })} devs � ${hoursSavedPerWeek} hrs/wk � 52 wks`,
      result: annualHoursSaved,
      formatted: `${annualHoursSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs`,
    },
    {
      label: "Time savings value",
      formula: `${annualHoursSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs � $${hourlyLoadedCost.toFixed(2)}/hr`,
      result: timeSavingsValue,
      formatted: formatCurrency(timeSavingsValue),
    },
    {
      label: "PRs per developer per year",
      formula: `${workingDaysPerYear} working days � ${currentPrCycleDays} day cycle`,
      result: prsPerDevPerYear,
      formatted: `${prsPerDevPerYear.toFixed(1)} PRs/dev/yr`,
    },
    {
      label: "Days saved per PR",
      formula: `${currentPrCycleDays} days � ${expectedImprovementPercent}% improvement`,
      result: daysSavedPerPr,
      formatted: `${daysSavedPerPr.toFixed(2)} days`,
    },
    {
      label: "PR cycle value",
      formula: `${annualPrDaysSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })} PR-days � ${hoursPerWorkDay} hrs � $${hourlyLoadedCost.toFixed(2)}/hr`,
      result: prCycleValue,
      formatted: formatCurrency(prCycleValue),
    },
    {
      label: "Onboarding value",
      formula: `${adoptedDevelopers.toLocaleString(undefined, { maximumFractionDigits: 0 })} devs � ${onboardingReductionWeeks} wks � 40 hrs � $${hourlyLoadedCost.toFixed(2)}/hr`,
      result: onboardingValue,
      formatted: formatCurrency(onboardingValue),
    },
    {
      label: "Annual productivity value",
      formula: "Time savings + PR cycle value + Onboarding value",
      result: annualProductivityValue,
      formatted: formatCurrency(annualProductivityValue),
    },
    {
      label: "Year 1 investment",
      formula: `${adoptedDevelopers.toLocaleString(undefined, { maximumFractionDigits: 0 })} seats � $${cursorCostPerSeat} + $${implementationCost.toLocaleString()} impl.`,
      result: totalYearOneInvestment,
      formatted: formatCurrency(totalYearOneInvestment),
    },
    {
      label: "Payback period",
      formula: `$${totalYearOneInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })} � ($${annualProductivityValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} � 12 mo)`,
      result: paybackMonths,
      formatted:
        paybackMonths === Infinity
          ? "N/A"
          : `${paybackMonths.toFixed(1)} months`,
    },
  ];

  const pilotMetrics: PilotMetric[] = [
    {
      name: "Weekly Active Usage",
      target: `?${Math.round(pilotCohort * 0.75).toLocaleString()} developers`,
      baseline: "0 (pre-pilot)",
      rationale: `75% of ${pilotCohort.toLocaleString()}-developer pilot cohort actively using Cursor weekly`,
    },
    {
      name: "PR Cycle Time",
      target: `?${targetPrCycleDays.toFixed(1)} days`,
      baseline: `${currentPrCycleDays} days`,
      rationale: `${expectedImprovementPercent}% reduction from current baseline`,
    },
    {
      name: "Hours Saved per Developer",
      target: `?${(hoursSavedPerWeek * 0.8).toFixed(1)} hrs/week`,
      baseline: "0 hrs/week",
      rationale: "Validate 80% of projected time savings through dev surveys + time tracking",
    },
    {
      name: "Onboarding Ramp Time",
      target: `${onboardingReductionWeeks} weeks faster`,
      baseline: "Current ramp period",
      rationale: "Measure time-to-first-PR for new pilot cohort members",
    },
    {
      name: "90-Day Productivity Value",
      target: formatCurrency(annualProductivityValue * (90 / 365) * pilotScale),
      baseline: "$0",
      rationale: `Scaled projection for ${pilotCohort.toLocaleString()}-developer pilot over 90 days`,
    },
    {
      name: "Developer Satisfaction",
      target: "?4.2 / 5.0",
      baseline: "3.6 / 5.0 (industry avg)",
      rationale: "Post-pilot NPS/satisfaction survey across all pilot teams",
    },
  ];

  return {
    hourlyLoadedCost,
    adoptedDevelopers,
    annualHoursSaved,
    timeSavingsValue,
    prsPerDevPerYear,
    daysSavedPerPr,
    annualPrDaysSaved,
    prCycleValue,
    onboardingHoursSaved,
    onboardingValue,
    annualProductivityValue,
    annualLicenseCost,
    totalYearOneInvestment,
    netAnnualBenefit,
    paybackMonths,
    roiMultiple,
    targetPrCycleDays,
    steps,
    pilotMetrics,
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
