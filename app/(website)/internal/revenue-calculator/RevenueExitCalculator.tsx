"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Calculator,
  ChartNoAxesCombined,
  Gauge,
  LineChart,
  Target,
  TrendingUp,
} from "lucide-react";

import ScrollReveal from "../../components/ScrollReveal";

const MONTHLY_EXPENSES = 1000;
const PROFIT_SPLIT = 0.5;
const YOUR_PAYE_TAKE_HOME = 3700;
const CLAYTON_PAYE_TAKE_HOME = 2000;
const YOUR_EMPLOYED_BUSINESS_TAX_RATE = 0.52;
const CLAYTON_EMPLOYED_BUSINESS_TAX_RATE = 0.5;
const AFTER_QUIT_TAX_RATE = 0.27;
const VAT_RATE = 0.23;
const FORECAST_MONTHS = 12;

const sectionLabelClassName = "font-(--font-mono) text-xs uppercase tracking-[0.28em] text-emerald-400";
const panelClassName = "rounded-3xl border border-slate-800 bg-slate-900/65 backdrop-blur-sm";
const inputClassName =
  "w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30";

type CalculatorInputs = {
  revenueTarget: string;
  averageProjectCost: string;
  averageProjectsPerMonth: string;
  averageMrrAfterEachProject: string;
  monthlyProjectGrowthRate: string;
  monthlyMrrGrowthRate: string;
};

type ParsedInputs = {
  revenueTarget: number;
  averageProjectCost: number;
  averageProjectsPerMonth: number;
  averageMrrAfterEachProject: number;
  monthlyProjectGrowthRate: number;
  monthlyMrrGrowthRate: number;
};

type ForecastPoint = {
  month: string;
  monthNumber: number;
  totalRevenue: number;
  projectRevenue: number;
  cumulativeMrr: number;
  newMrrThisMonth: number;
  projectsThisMonth: number;
  target: number;
};

const defaultInputs: CalculatorInputs = {
  revenueTarget: "21000",
  averageProjectCost: "4500",
  averageProjectsPerMonth: "3",
  averageMrrAfterEachProject: "750",
  monthlyProjectGrowthRate: "8",
  monthlyMrrGrowthRate: "5",
};

const assumptionRows = [
  { label: "Monthly expenses", value: "EUR 1,000" },
  { label: "Profit split", value: "50 / 50" },
  { label: "Your PAYE take-home", value: "EUR 3,700" },
  { label: "Clayton PAYE take-home", value: "EUR 2,000" },
  { label: "Your employed tax", value: "52%" },
  { label: "Clayton employed tax", value: "50%" },
  { label: "After quitting tax", value: "27% each" },
  { label: "VAT rate", value: "23%" },
];

function parsePositiveNumber(value: string) {
  const normalized = value.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(normalized);

  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
    return 0;
  }

  return Math.max(0, parsed);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatCurrencyCompact(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("en-IE", {
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatPercent(value: number) {
  return `${formatNumber(value, 1)}%`;
}

function buildForecast(inputs: ParsedInputs) {
  let cumulativeMrr = 0;

  return Array.from({ length: FORECAST_MONTHS }, (_, index) => {
    const projectMultiplier = Math.pow(1 + inputs.monthlyProjectGrowthRate / 100, index);
    const mrrMultiplier = Math.pow(1 + inputs.monthlyMrrGrowthRate / 100, index);
    const projectsThisMonth = inputs.averageProjectsPerMonth * projectMultiplier;
    const projectRevenue = inputs.averageProjectCost * projectsThisMonth;
    const newMrrThisMonth = inputs.averageMrrAfterEachProject * mrrMultiplier * projectsThisMonth;

    cumulativeMrr += newMrrThisMonth;

    return {
      month: `Month ${index + 1}`,
      monthNumber: index + 1,
      totalRevenue: projectRevenue + cumulativeMrr,
      projectRevenue,
      cumulativeMrr,
      newMrrThisMonth,
      projectsThisMonth,
      target: inputs.revenueTarget,
    };
  });
}

function useChartWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const nextWidth = entries[0]?.contentRect.width ?? 0;
      setWidth(nextWidth);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}

function TooltipMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
      <p className="font-(--font-mono) text-[10px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  accent = "emerald",
  icon: Icon,
}: {
  label: string;
  value: string;
  detail?: string;
  accent?: "emerald" | "cyan" | "slate";
  icon: React.ComponentType<{ className?: string }>;
}) {
  const accentClasses =
    accent === "cyan"
      ? "text-cyan-300 border-cyan-500/20 bg-cyan-500/8"
      : accent === "slate"
        ? "text-slate-200 border-slate-700 bg-slate-800/40"
        : "text-emerald-300 border-emerald-500/20 bg-emerald-500/8";

  return (
    <div className="metric-card rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-(--font-mono) text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${accentClasses}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="metric-display mt-4 text-3xl font-semibold tracking-tight text-white">{value}</p>
      {detail ? <p className="mt-2 text-sm leading-relaxed text-slate-400">{detail}</p> : null}
    </div>
  );
}

function ForecastChart({ data }: { data: ForecastPoint[] }) {
  const { ref, width } = useChartWidth();
  const [activeIndex, setActiveIndex] = useState(0);
  const height = 360;
  const padding = { top: 24, right: 20, bottom: 40, left: 56 };
  const chartWidth = Math.max(width, 320);
  const innerWidth = Math.max(chartWidth - padding.left - padding.right, 1);
  const innerHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(
    ...data.flatMap((item) => [item.totalRevenue, item.projectRevenue, item.cumulativeMrr, item.target]),
    1,
  );
  const ticks = 5;

  function x(index: number) {
    if (data.length <= 1) {
      return padding.left + innerWidth / 2;
    }

    return padding.left + (index / (data.length - 1)) * innerWidth;
  }

  function y(value: number) {
    return padding.top + innerHeight - (Math.max(0, value) / maxValue) * innerHeight;
  }

  function buildLinePath(getValue: (point: ForecastPoint) => number) {
    return data
      .map((point, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(getValue(point))}`)
      .join(" ");
  }

  const totalRevenuePath = buildLinePath((point) => point.totalRevenue);
  const projectRevenuePath = buildLinePath((point) => point.projectRevenue);
  const cumulativeMrrPath = buildLinePath((point) => point.cumulativeMrr);
  const targetPath = buildLinePath((point) => point.target);
  const activePoint = data[Math.min(activeIndex, data.length - 1)] ?? data[0];

  function handlePointerMove(clientX: number) {
    const container = ref.current;
    if (!container || data.length === 0) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const relativeX = clientX - rect.left - padding.left;
    const progress = Math.min(Math.max(relativeX / innerWidth, 0), 1);
    const nextIndex = Math.round(progress * (data.length - 1));
    setActiveIndex(nextIndex);
  }

  return (
    <div ref={ref} className="space-y-4">
      <div
        className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:p-4"
        onMouseMove={(event) => handlePointerMove(event.clientX)}
        onMouseLeave={() => setActiveIndex(0)}
        onTouchMove={(event) => handlePointerMove(event.touches[0]?.clientX ?? 0)}
      >
        <svg viewBox={`0 0 ${chartWidth} ${height}`} className="h-auto w-full">
          {Array.from({ length: ticks }, (_, index) => {
            const tickValue = (maxValue / (ticks - 1)) * index;
            const tickY = y(tickValue);

            return (
              <g key={tickValue}>
                <line
                  x1={padding.left}
                  x2={chartWidth - padding.right}
                  y1={tickY}
                  y2={tickY}
                  stroke="rgba(51, 65, 85, 0.7)"
                  strokeDasharray="4 8"
                />
                <text
                  x={padding.left - 10}
                  y={tickY + 4}
                  fill="rgba(148, 163, 184, 0.85)"
                  fontSize="11"
                  textAnchor="end"
                >
                  {formatCurrencyCompact(tickValue)}
                </text>
              </g>
            );
          })}

          {data.map((point, index) => (
            <text
              key={point.month}
              x={x(index)}
              y={height - 12}
              fill="rgba(100, 116, 139, 1)"
              fontSize="11"
              textAnchor="middle"
            >
              M{point.monthNumber}
            </text>
          ))}

          <path d={targetPath} fill="none" stroke="rgba(34, 211, 238, 0.95)" strokeWidth="2" strokeDasharray="7 7" />
          <path d={projectRevenuePath} fill="none" stroke="rgba(148, 163, 184, 0.92)" strokeWidth="3" />
          <path d={cumulativeMrrPath} fill="none" stroke="rgba(16, 185, 129, 0.92)" strokeWidth="3" />
          <path d={totalRevenuePath} fill="none" stroke="rgba(255, 255, 255, 0.96)" strokeWidth="3.5" />

          {activePoint ? (
            <g>
              <line
                x1={x(activePoint.monthNumber - 1)}
                x2={x(activePoint.monthNumber - 1)}
                y1={padding.top}
                y2={height - padding.bottom}
                stroke="rgba(148, 163, 184, 0.45)"
                strokeDasharray="4 6"
              />
              {[
                { value: activePoint.totalRevenue, color: "rgba(255,255,255,1)" },
                { value: activePoint.projectRevenue, color: "rgba(148,163,184,1)" },
                { value: activePoint.cumulativeMrr, color: "rgba(16,185,129,1)" },
                { value: activePoint.target, color: "rgba(34,211,238,1)" },
              ].map((series) => (
                <circle
                  key={`${series.color}-${series.value}`}
                  cx={x(activePoint.monthNumber - 1)}
                  cy={y(series.value)}
                  r="4.5"
                  fill={series.color}
                />
              ))}
            </g>
          ) : null}
        </svg>
      </div>

      {activePoint ? (
        <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <p className="font-(--font-mono) text-[11px] uppercase tracking-[0.24em] text-cyan-400">
              {activePoint.month}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {formatNumber(activePoint.projectsThisMonth, 2)} projects generating{" "}
              {formatCurrency(activePoint.newMrrThisMonth)} in new MRR this month.
            </p>
          </div>
          <TooltipMetric label="Total project monthly revenue" value={formatCurrency(activePoint.totalRevenue)} />
          <TooltipMetric label="Total project revenue per month" value={formatCurrency(activePoint.projectRevenue)} />
          <TooltipMetric label="Total cumulative MRR per month" value={formatCurrency(activePoint.cumulativeMrr)} />
          <TooltipMetric label="Revenue target line" value={formatCurrency(activePoint.target)} />
        </div>
      ) : null}
    </div>
  );
}

export default function RevenueExitCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);

  const parsedInputs = useMemo<ParsedInputs>(
    () => ({
      revenueTarget: parsePositiveNumber(inputs.revenueTarget),
      averageProjectCost: parsePositiveNumber(inputs.averageProjectCost),
      averageProjectsPerMonth: parsePositiveNumber(inputs.averageProjectsPerMonth),
      averageMrrAfterEachProject: parsePositiveNumber(inputs.averageMrrAfterEachProject),
      monthlyProjectGrowthRate: parsePositiveNumber(inputs.monthlyProjectGrowthRate),
      monthlyMrrGrowthRate: parsePositiveNumber(inputs.monthlyMrrGrowthRate),
    }),
    [inputs],
  );

  const calculations = useMemo(() => {
    const profit = Math.max(0, parsedInputs.revenueTarget - MONTHLY_EXPENSES);
    const eachGross = profit * PROFIT_SPLIT;
    const yourBusinessNetBefore = eachGross * (1 - YOUR_EMPLOYED_BUSINESS_TAX_RATE);
    const claytonBusinessNetBefore = eachGross * (1 - CLAYTON_EMPLOYED_BUSINESS_TAX_RATE);
    const yourTotalBefore = YOUR_PAYE_TAKE_HOME + yourBusinessNetBefore;
    const claytonTotalBefore = CLAYTON_PAYE_TAKE_HOME + claytonBusinessNetBefore;
    const eachNetAfterQuit = eachGross * (1 - AFTER_QUIT_TAX_RATE);

    const monthlyProjectRevenue =
      parsedInputs.averageProjectCost * parsedInputs.averageProjectsPerMonth;
    const monthlyNewMrrAdded =
      parsedInputs.averageMrrAfterEachProject * parsedInputs.averageProjectsPerMonth;
    const totalProjectMonthlyRevenue = monthlyProjectRevenue + monthlyNewMrrAdded;

    const effectiveRevenuePerProjectThisMonth =
      parsedInputs.averageProjectCost + parsedInputs.averageMrrAfterEachProject;
    const requiredProjectsPerMonth =
      effectiveRevenuePerProjectThisMonth > 0
        ? parsedInputs.revenueTarget / effectiveRevenuePerProjectThisMonth
        : 0;
    const requiredProjectsPerWeek = requiredProjectsPerMonth / 4.33;
    const revenueGapVsCurrentModel =
      parsedInputs.revenueTarget - totalProjectMonthlyRevenue;

    const forecast = buildForecast(parsedInputs);
    const hitPoint = forecast.find((point) => point.totalRevenue >= parsedInputs.revenueTarget);
    const monthTargetHit = hitPoint ? `Month ${hitPoint.monthNumber}` : "Not within 12 months";
    const monthsToTarget = hitPoint ? hitPoint.monthNumber : null;
    const monthOne = forecast[0] ?? null;
    const monthTwelve = forecast[forecast.length - 1] ?? null;
    const accelerationImpact = monthOne && monthTwelve
      ? monthTwelve.totalRevenue - monthOne.totalRevenue
      : 0;
    const vatAmount = parsedInputs.averageProjectCost * VAT_RATE;

    return {
      profit,
      eachGross,
      yourTotalBefore,
      claytonTotalBefore,
      eachNetAfterQuit,
      monthlyProjectRevenue,
      monthlyNewMrrAdded,
      totalProjectMonthlyRevenue,
      effectiveRevenuePerProjectThisMonth,
      requiredProjectsPerMonth,
      requiredProjectsPerWeek,
      revenueGapVsCurrentModel,
      forecast,
      monthTargetHit,
      monthsToTarget,
      monthOne,
      monthTwelve,
      accelerationImpact,
      vatAmount,
    };
  }, [parsedInputs]);

  function updateInput(key: keyof CalculatorInputs, value: string) {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <div className="space-y-10 md:space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/80 px-6 py-10 sm:px-8 md:px-10">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="relative grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
          <div>
            <p className={sectionLabelClassName}>Internal Planning Tool</p>
            <h1 className="mt-5 max-w-4xl font-(--font-display) text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Model the revenue point where project work and MRR make the exit math obvious.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
              This hidden calculator turns your project economics, MRR contribution, and growth
              assumptions into a clean founder planning view with live take-home math and a
              12-month forecast.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-slate-800 bg-slate-900/75 px-4 py-2 font-(--font-mono) text-[11px] uppercase tracking-[0.22em] text-slate-400">
                Route hidden from nav and footer
              </span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 font-(--font-mono) text-[11px] uppercase tracking-[0.22em] text-emerald-300">
                Live monthly scenario modeling
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/8 p-6 shadow-lg shadow-emerald-500/5">
            <p className="font-(--font-mono) text-[11px] uppercase tracking-[0.26em] text-emerald-300">
              Live Summary
            </p>
            <div className="mt-5 space-y-6">
              <div>
                <p className="text-sm text-emerald-100/80">
                  At {formatCurrency(parsedInputs.revenueTarget)}/month revenue:
                </p>
              </div>
              <div>
                <p className="font-(--font-mono) text-[11px] uppercase tracking-[0.24em] text-slate-300">
                  Before quitting
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/55 p-4">
                    <p className="text-sm text-slate-400">You</p>
                    <p className="metric-display mt-2 text-3xl font-semibold text-white">
                      {formatCurrency(calculations.yourTotalBefore)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/55 p-4">
                    <p className="text-sm text-slate-400">Clayton</p>
                    <p className="metric-display mt-2 text-3xl font-semibold text-white">
                      {formatCurrency(calculations.claytonTotalBefore)}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-(--font-mono) text-[11px] uppercase tracking-[0.24em] text-cyan-300">
                  After quitting
                </p>
                <div className="mt-3 rounded-2xl border border-cyan-500/20 bg-slate-950/55 p-4">
                  <p className="text-sm text-slate-400">Both</p>
                  <p className="metric-display mt-2 text-3xl font-semibold text-white">
                    ~{formatCurrency(calculations.eachNetAfterQuit)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <ScrollReveal className={`${panelClassName} p-6 sm:p-7`} blur>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className={sectionLabelClassName}>Input Model</p>
              <h2 className="mt-3 font-(--font-display) text-2xl font-semibold text-white">
                Compact assumptions, live revenue logic
              </h2>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
              <p className="font-(--font-mono) text-[10px] uppercase tracking-[0.24em] text-slate-500">
                Informational VAT
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Plus VAT:{" "}
                <span className="font-semibold text-white">{formatCurrency(calculations.vatAmount)}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">Monthly revenue target</span>
                <input
                  className={inputClassName}
                  inputMode="decimal"
                  value={inputs.revenueTarget}
                  onChange={(event) => updateInput("revenueTarget", event.target.value)}
                  placeholder="21000"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">Average project cost</span>
                <div className="grid gap-3 sm:grid-cols-[1fr,auto]">
                  <input
                    className={inputClassName}
                    inputMode="decimal"
                    value={inputs.averageProjectCost}
                    onChange={(event) => updateInput("averageProjectCost", event.target.value)}
                    placeholder="4500"
                  />
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                    Plus VAT
                    <span className="ml-2 font-semibold text-white">
                      {formatCurrency(calculations.vatAmount)}
                    </span>
                  </div>
                </div>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">Average projects per month</span>
                <input
                  className={inputClassName}
                  inputMode="decimal"
                  value={inputs.averageProjectsPerMonth}
                  onChange={(event) => updateInput("averageProjectsPerMonth", event.target.value)}
                  placeholder="3"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">Average MRR generated after each project</span>
                <input
                  className={inputClassName}
                  inputMode="decimal"
                  value={inputs.averageMrrAfterEachProject}
                  onChange={(event) => updateInput("averageMrrAfterEachProject", event.target.value)}
                  placeholder="750"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">Monthly project growth rate</span>
                <input
                  className={inputClassName}
                  inputMode="decimal"
                  value={inputs.monthlyProjectGrowthRate}
                  onChange={(event) => updateInput("monthlyProjectGrowthRate", event.target.value)}
                  placeholder="8"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">Monthly MRR growth rate</span>
                <input
                  className={inputClassName}
                  inputMode="decimal"
                  value={inputs.monthlyMrrGrowthRate}
                  onChange={(event) => updateInput("monthlyMrrGrowthRate", event.target.value)}
                  placeholder="5"
                />
              </label>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className={`${panelClassName} p-6 sm:p-7`} delayMs={70} blur>
          <p className={sectionLabelClassName}>Static Assumptions</p>
          <h2 className="mt-3 font-(--font-display) text-2xl font-semibold text-white">
            Built-in constants for the current planning model
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {assumptionRows.map((assumption) => (
              <div key={assumption.label} className="rounded-2xl border border-slate-800 bg-slate-950/55 p-4">
                <p className="font-(--font-mono) text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  {assumption.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white">{assumption.value}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Monthly profit"
          value={formatCurrency(calculations.profit)}
          detail={`Target less ${formatCurrency(MONTHLY_EXPENSES)} in monthly expenses.`}
          icon={Calculator}
        />
        <MetricCard
          label="Each gross share"
          value={formatCurrency(calculations.eachGross)}
          detail="50 / 50 split after expenses."
          icon={BriefcaseBusiness}
        />
        <MetricCard
          label="After-quit net each"
          value={formatCurrency(calculations.eachNetAfterQuit)}
          detail="Each share after 27% tax."
          icon={ArrowUpRight}
          accent="cyan"
        />
        <MetricCard
          label="Revenue per project incl. first month MRR"
          value={formatCurrency(calculations.effectiveRevenuePerProjectThisMonth)}
          detail="Project fee plus first month of MRR contribution."
          icon={Gauge}
          accent="slate"
        />
        <MetricCard
          label="Acceleration impact"
          value={formatCurrency(calculations.accelerationImpact)}
          detail="Month 12 total revenue minus Month 1 total revenue."
          icon={TrendingUp}
          accent="cyan"
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Projects needed per month"
          value={formatNumber(calculations.requiredProjectsPerMonth, 2)}
          detail="At current blended project + first-month MRR economics."
          icon={Target}
        />
        <MetricCard
          label="Projects needed per week"
          value={formatNumber(calculations.requiredProjectsPerWeek, 2)}
          detail="Monthly requirement divided across 4.33 weeks."
          icon={ChartNoAxesCombined}
          accent="slate"
        />
        <MetricCard
          label="Gap vs current input model"
          value={formatCurrency(calculations.revenueGapVsCurrentModel)}
          detail={
            calculations.revenueGapVsCurrentModel > 0
              ? "Additional monthly revenue needed to hit target."
              : "Current input model is already at or above target."
          }
          icon={LineChart}
          accent={calculations.revenueGapVsCurrentModel > 0 ? "cyan" : "emerald"}
        />
        <MetricCard
          label="Month target reached"
          value={calculations.monthTargetHit}
          detail={
            calculations.monthsToTarget
              ? `${calculations.monthsToTarget} months to target with current growth assumptions.`
              : "Target is not reached within the 12-month forecast."
          }
          icon={Target}
          accent="cyan"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ScrollReveal className={`${panelClassName} p-6`} blur>
          <p className={sectionLabelClassName}>Revenue Composition</p>
          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/55 p-5">
              <p className="font-(--font-mono) text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Total project monthly revenue
              </p>
              <p className="metric-display mt-3 text-3xl font-semibold text-white">
                {formatCurrency(calculations.totalProjectMonthlyRevenue)}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Project revenue plus newly added MRR in the current month.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/55 p-5">
              <p className="font-(--font-mono) text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Total project revenue per month
              </p>
              <p className="metric-display mt-3 text-3xl font-semibold text-white">
                {formatCurrency(calculations.monthlyProjectRevenue)}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Fee revenue generated from average projects per month.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/55 p-5">
              <p className="font-(--font-mono) text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Total cumulative MRR per month
              </p>
              <p className="metric-display mt-3 text-3xl font-semibold text-white">
                {formatCurrency(calculations.monthlyNewMrrAdded)}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Current-month new MRR contribution before the forecast compounds it.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className={`${panelClassName} p-6 lg:col-span-2`} delayMs={80} blur>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={sectionLabelClassName}>Forecast Overview</p>
              <h2 className="mt-3 font-(--font-display) text-2xl font-semibold text-white">
                12-month revenue forecast
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-400">
              Total project monthly revenue tracks project revenue plus cumulative MRR. The target
              line stays fixed so you can see exactly when the model crosses it.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <MetricCard
              label="Month 1 total revenue"
              value={formatCurrency(calculations.monthOne?.totalRevenue ?? 0)}
              icon={LineChart}
              accent="slate"
            />
            <MetricCard
              label="Month 12 total revenue"
              value={formatCurrency(calculations.monthTwelve?.totalRevenue ?? 0)}
              icon={TrendingUp}
            />
            <MetricCard
              label="Revenue target reached"
              value={calculations.monthsToTarget ? "Yes" : "No"}
              detail={calculations.monthTargetHit}
              icon={Target}
              accent={calculations.monthsToTarget ? "emerald" : "cyan"}
            />
            <MetricCard
              label="Months to target"
              value={calculations.monthsToTarget ? String(calculations.monthsToTarget) : "12+"}
              detail={calculations.monthsToTarget ? "First forecast month at or above target." : "No hit inside forecast window."}
              icon={Gauge}
              accent="cyan"
            />
            <MetricCard
              label="Acceleration impact"
              value={formatCurrency(calculations.accelerationImpact)}
              detail={
                calculations.monthOne && calculations.monthOne.totalRevenue > 0
                  ? `${formatPercent((calculations.accelerationImpact / calculations.monthOne.totalRevenue) * 100)} lift from Month 1 to Month 12.`
                  : "No Month 1 revenue to compare against."
              }
              icon={ArrowUpRight}
              accent="cyan"
            />
          </div>

          <div className="mt-6">
            <ForecastChart data={calculations.forecast} />
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
