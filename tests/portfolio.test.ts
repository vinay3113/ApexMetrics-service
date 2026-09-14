import { describe, expect, it } from "vitest";
import { buildAllocation } from "../lib/portfolio";

describe("portfolio allocation", () => {
  it("allocates exactly 100 percent", () => {
    const items = buildAllocation(10000, "balanced");
    expect(items.reduce((sum, item) => sum + item.percent, 0)).toBe(100);
    expect(items.reduce((sum, item) => sum + item.amount, 0)).toBe(10000);
  });

  it("rejects negative capital", () => {
    expect(() => buildAllocation(-1, "growth")).toThrow();
  });
});
