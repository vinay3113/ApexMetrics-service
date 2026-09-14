import type { MarketOverview } from "@/lib/types";

export const demoOverview: MarketOverview = {
  mode: "demo",
  generatedAt: new Date().toISOString(),
  indices: [
    { symbol: "SPX", name: "S&P 500", value: 5626.02, changePercent: 0.46 },
    { symbol: "IXIC", name: "Nasdaq", value: 17683.98, changePercent: 0.82 },
    { symbol: "DJI", name: "Dow", value: 41393.78, changePercent: 0.12 },
    { symbol: "VIX", name: "VIX", value: 16.12, changePercent: -2.04 }
  ],
  quotes: [
    { symbol: "NVDA", company: "NVIDIA", price: 132.84, changePercent: 2.41, previousClose: 129.71, asOf: new Date().toISOString(), delayed: true, source: "demo" },
    { symbol: "MSFT", company: "Microsoft", price: 431.17, changePercent: 0.72, previousClose: 428.08, asOf: new Date().toISOString(), delayed: true, source: "demo" },
    { symbol: "AAPL", company: "Apple", price: 223.96, changePercent: -0.38, previousClose: 224.81, asOf: new Date().toISOString(), delayed: true, source: "demo" },
    { symbol: "AMZN", company: "Amazon", price: 186.49, changePercent: 1.16, previousClose: 184.35, asOf: new Date().toISOString(), delayed: true, source: "demo" },
    { symbol: "TSLA", company: "Tesla", price: 229.73, changePercent: -1.84, previousClose: 234.03, asOf: new Date().toISOString(), delayed: true, source: "demo" }
  ],
  news: [
    {
      id: "demo-ai-infra",
      headline: "AI infrastructure spending remains a major market theme",
      summary: "Large technology companies continue prioritizing compute, data centers, networking and model development in this example scenario.",
      source: "ApexMetrics demo",
      publishedAt: new Date().toISOString(),
      related: ["NVDA", "MSFT", "AMZN"],
      impact: "Possible upside exposure includes semiconductors, networking and data-center suppliers. Risks include valuation compression, export controls and a slower capex cycle.",
      scenario: true
    },
    {
      id: "demo-rates",
      headline: "Rate expectations continue to influence growth-stock valuations",
      summary: "Changes in expected interest rates can affect discount rates, borrowing costs and investors' willingness to pay for future earnings.",
      source: "ApexMetrics demo",
      publishedAt: new Date().toISOString(),
      related: ["SPX", "IXIC"],
      impact: "Falling expected rates can support long-duration growth assets; higher-for-longer expectations can pressure richly valued equities.",
      scenario: true
    },
    {
      id: "demo-automation",
      headline: "Automation remains a long-horizon demand theme",
      summary: "AI-enabled software and robotics may gradually alter labor-intensive workflows and enterprise capital allocation.",
      source: "ApexMetrics demo",
      publishedAt: new Date().toISOString(),
      related: ["MSFT", "AMZN", "NVDA"],
      impact: "Potential demand areas include cloud compute, cybersecurity, robotics components, power infrastructure and enterprise software.",
      scenario: true
    }
  ]
};
