import { z } from "zod";

export const riskSchema = z.enum(["conservative", "balanced", "growth"]);
export type Risk = z.infer<typeof riskSchema>;

export const allocationMap: Record<Risk, { label: string; percent: number }[]> = {
  conservative: [
    { label: "Cash / short-term", percent: 25 },
    { label: "Broad equity ETFs", percent: 35 },
    { label: "Bonds", percent: 30 },
    { label: "Thematic growth", percent: 10 }
  ],
  balanced: [
    { label: "Broad equity ETFs", percent: 50 },
    { label: "Bonds", percent: 20 },
    { label: "Cash / short-term", percent: 10 },
    { label: "Thematic growth", percent: 20 }
  ],
  growth: [
    { label: "Broad equity ETFs", percent: 55 },
    { label: "Thematic growth", percent: 30 },
    { label: "International equity", percent: 10 },
    { label: "Cash / short-term", percent: 5 }
  ]
};

export function buildAllocation(capital: number, risk: Risk) {
  if (!Number.isFinite(capital) || capital < 0) throw new Error("Capital must be a positive number");
  return allocationMap[risk].map(item => ({
    ...item,
    amount: Math.round((capital * item.percent) / 100 * 100) / 100
  }));
}
