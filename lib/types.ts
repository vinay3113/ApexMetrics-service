export type Quote = {
  symbol: string;
  company: string;
  price: number;
  changePercent: number;
  previousClose: number;
  asOf: string;
  delayed: boolean;
  source: "live-provider" | "demo";
};

export type MarketIndex = {
  symbol: string;
  name: string;
  value: number;
  changePercent: number;
};

export type NewsItem = {
  id: string;
  headline: string;
  summary: string;
  source: string;
  url?: string;
  publishedAt: string;
  related: string[];
  impact: string;
  scenario: boolean;
};

export type MarketOverview = {
  indices: MarketIndex[];
  quotes: Quote[];
  news: NewsItem[];
  generatedAt: string;
  mode: "provider" | "demo";
};
