import type { Metadata } from "next";

import RevenueExitCalculator from "./RevenueExitCalculator";

export const metadata: Metadata = {
  title: "Revenue Exit Calculator | Ingenium Internal",
  description: "Internal revenue planning calculator for project and MRR growth forecasting.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: { canonical: "/internal/revenue-calculator" },
};

export default function RevenueCalculatorPage() {
  return <RevenueExitCalculator />;
}
