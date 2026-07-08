export interface ROIInputs {
  developerCount: number;
  loadedEngineeringCost: number;
  hoursSavedPerWeek: number;
  currentPrCycleDays: number;
  expectedImprovementPercent: number;
  onboardingReductionWeeks: number;
  realizationFactorPercent: number;
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
  grossProductivityValue: number;
  realizedProductivityValue: number;
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
    realizationFactorPercent,
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
  const realization = realizationFactorPercent / 100;
  const adoptedDevelopers = developerCount * adoption;

  const hourlyLoadedCost = loadedEngineeringCost / workingHoursPerYear;
  const annualHoursSaved = adoptedDevelopers * hoursSavedPerWeek * 52;
  const timeSavingsValue = annualHoursSaved * hourlyLoadedCost;

  const prsPerDevPerYear =
    currentPrCycleDays > 0 ? workingDaysPerYear / currentPrCycleDays : 0;
  const daysSavedPerPr = currentPrCycleDays * improvement;
  const annualPrDaysSaved = adoptedDevelopers * prsPerDevPerYear * daysSavedPerPr;
  const prCycleValue = annualPrDaysSaved * hoursPerWorkDay * hourlyLoadedCost;

  const onboardingHoursSaved =
    adoptedDevelopers * onboardingReductionWeeks * 40;
  const onboardingValue = onboardingHoursSaved * hourlyLoadedCost;

  const grossProductivityValue =
    timeSavingsValue + prCycleValue + onboardingValue;
  const realizedProductivityValue = grossProductivityValue * realization;

  const annualLicenseCost = adoptedDevelopers * cursorCostPerSeat;
  const totalYearOneInvestment = annualLicenseCost + implementationCost;
  const netAnnualBenefit = realizedProductivityValue - totalYearOneInvestment;

  const paybackMonths =
    realizedProductivityValue > 0
      ? (totalYearOneInvestment / realizedProductivityValue) * 12
      : Infinity;

  const roiMultiple =
    totalYearOneInvestment > 0
      ? realizedProductivityValue / totalYearOneInvestment
      : 0;

  const targetPrCycleDays = currentPrCycleDays * (1 - improvement);
  const pilotCohort = Math.round(developerCount * (pilotCohortPercent / 100));
  const pilotScale = pilotCohort / developerCount;

  const steps: CalculationStep[] = [
    {
      label: "Hourly loaded cost",
      formula: `$${loadedEngineeringCost.toLocaleString()} / ${workingHoursPerYear.toLocaleString()} hrs`,
      result: hourlyLoadedCost,
      formatted: `$${hourlyLoadedCost.toFixed(2)}/hr`,
    },
    {
      label: "Adopted developers",
      formula: `${developerCount.toLocaleString()} x ${adoptionRate}% adoption`,
      result: adoptedDevelopers,
      formatted: adoptedDevelopers.toLocaleString(undefined, { maximumFractionDigits: 0 }),
    },
    {
      label: "Annual hours saved (gross)",
      formula: `${adoptedDevelopers.toLocaleString(undefined, { maximumFractionDigits: 0 })} devs x ${hoursSavedPerWeek} hrs/wk x 52 wks`,
      result: annualHoursSaved,
      formatted: `${annualHoursSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs`,
    },
    {
      label: "Time savings value",
      formula: `${annualHoursSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs x $${hourlyLoadedCost.toFixed(2)}/hr`,
      result: timeSavingsValue,
      formatted: formatCurrency(timeSavingsValue),
    },
    {
      label: "PR cycle value",
      formula: `${annualPrDaysSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })} PR-days x ${hoursPerWorkDay} hrs x $${hourlyLoadedCost.toFixed(2)}/hr`,
      result: prCycleValue,
      formatted: formatCurrency(prCycleValue),
    },
    {
      label: "Onboarding value",
      formula: `${adoptedDevelopers.toLocaleString(undefined, { maximumFractionDigits: 0 })} devs x ${onboardingReductionWeeks} wks x 40 hrs x $${hourlyLoadedCost.toFixed(2)}/hr`,
      result: onboardingValue,
      formatted: formatCurrency(onboardingValue),
    },
    {
      label: "Gross productivity value",
      formula: "Time savings + PR cycle value + Onboarding value",
      result: grossProductivityValue,
      formatted: formatCurrency(grossProductivityValue),
    },
    {
      label: "Realized productivity value",
      formula: `${formatCurrency(grossProductivityValue)} x ${realizationFactorPercent}% realization`,
      result: realizedProductivityValue,
      formatted: formatCurrency(realizedProductivityValue),
    },
    {
      label: "Year 1 investment",
      formula: `${adoptedDevelopers.toLocaleString(undefined, { maximumFractionDigits: 0 })} seats x $${cursorCostPerSeat} + $${implementationCost.toLocaleString()} impl.`,
      result: totalYearOneInvestment,
      formatted: formatCurrency(totalYearOneInvestment),
    },
    {
      label: "Payback period",
      formula: `${formatCurrency(totalYearOneInvestment)} / (${formatCurrency(realizedProductivityValue)} / 12 mo)`,
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
      target: `>=${Math.round(pilotCohort * 0.7).toLocaleString()} developers`,
      baseline: "0 (pre-pilot)",
      rationale: `70% of ${pilotCohort.toLocaleString()}-developer pilot cohort actively using Cursor weekly`,
    },
    {
      name: "PR Cycle Time",
      target: `<=${targetPrCycleDays.toFixed(1)} days`,
      baseline: `${currentPrCycleDays} days`,
      rationale: `${expectedImprovementPercent}% reduction from current baseline`,
    },
    {
      name: "Hours Saved per Developer",
      target: `>=${(hoursSavedPerWeek * 0.7).toFixed(1)} hrs/week`,
      baseline: "0 hrs/week",
      rationale: "Validate 70% of projected time savings through dev surveys and time tracking",
    },
    {
      name: "Realization Factor",
      target: `>=${realizationFactorPercent}% of gross value`,
      baseline: "0%",
      rationale: "CFO-aligned metric: compare realized output to gross productivity potential",
    },
    {
      name: "90-Day Realized Value",
      target: formatCurrency(realizedProductivityValue * (90 / 365) * pilotScale),
      baseline: "$0",
      rationale: `Scaled realized value for ${pilotCohort.toLocaleString()}-developer pilot over 90 days`,
    },
    {
      name: "Developer Satisfaction",
      target: ">=4.0 / 5.0",
      baseline: "3.6 / 5.0 (industry avg)",
      rationale: "Post-pilot satisfaction survey across all pilot teams",
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
    grossProductivityValue,
    realizedProductivityValue,
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
