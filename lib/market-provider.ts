import { env } from "@/lib/env";
import { demoOverview } from "@/lib/demo-data";
import type { MarketOverview, Quote, NewsItem } from "@/lib/types";

const WATCH = [
  ["NVDA", "NVIDIA"],
  ["MSFT", "Microsoft"],
  ["AAPL", "Apple"],
  ["AMZN", "Amazon"],
  ["TSLA", "Tesla"]
] as const;

type FinnhubQuote = { c?: number; d?: number; dp?: number; pc?: number; t?: number };
type FinnhubNews = {
  category?: string;
  datetime?: number;
  headline?: string;
  id?: number;
  image?: string;
  related?: string;
  source?: string;
  summary?: string;
  url?: string;
};

async function providerFetch<T>(path: string, revalidate: number): Promise<T> {
  const token = env.FINNHUB_API_KEY;
  if (!token) throw new Error("Provider key missing");

  const url = new URL(`https://finnhub.io/api/v1/${path}`);
  url.searchParams.set("token", token);

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate }
  });

  if (!res.ok) throw new Error(`Market provider returned ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getQuote(symbol: string, company = symbol): Promise<Quote> {
  if (!env.FINNHUB_API_KEY) {
    const demo = demoOverview.quotes.find(q => q.symbol === symbol);
    if (!demo) throw new Error("Symbol unavailable in demo mode");
    return demo;
  }

  const raw = await providerFetch<FinnhubQuote>(`quote?symbol=${encodeURIComponent(symbol)}`, 15);
  if (!raw.c || raw.c <= 0) throw new Error("Provider returned no quote");

  return {
    symbol,
    company,
    price: raw.c,
    changePercent: raw.dp ?? 0,
    previousClose: raw.pc ?? 0,
    asOf: new Date((raw.t ?? Math.floor(Date.now() / 1000)) * 1000).toISOString(),
    delayed: false,
    source: "live-provider"
  };
}

export async function getGeneralNews(): Promise<NewsItem[]> {
  if (!env.FINNHUB_API_KEY) return demoOverview.news;

  const items = await providerFetch<FinnhubNews[]>("news?category=general", 120);
  return items.slice(0, 8).map((n, index) => ({
    id: String(n.id ?? `news-${index}`),
    headline: n.headline || "Market headline",
    summary: n.summary || "Open the source for details.",
    source: n.source || "Market source",
    url: n.url,
    publishedAt: new Date((n.datetime ?? Math.floor(Date.now() / 1000)) * 1000).toISOString(),
    related: n.related ? n.related.split(",").filter(Boolean).slice(0, 5) : [],
    impact: "ApexMetrics does not infer a guaranteed price reaction. Review the affected sector, revenue exposure, valuation and time horizon before drawing conclusions.",
    scenario: true
  }));
}

export async function getOverview(): Promise<MarketOverview> {
  if (!env.FINNHUB_API_KEY) {
    return { ...demoOverview, generatedAt: new Date().toISOString() };
  }

  try {
    const quotes = await Promise.all(WATCH.map(([symbol, company]) => getQuote(symbol, company)));
    const news = await getGeneralNews();
    const overviewAssets = await Promise.all([
      getQuote("SPY", "S&P 500 ETF"),
      getQuote("QQQ", "Nasdaq-100 ETF"),
      getQuote("DIA", "Dow ETF"),
      getQuote("IWM", "Russell 2000 ETF")
    ]);

    return {
      mode: "provider",
      generatedAt: new Date().toISOString(),
      indices: overviewAssets.map((asset) => ({
        symbol: asset.symbol,
        name: asset.company,
        value: asset.price,
        changePercent: asset.changePercent
      })),
      quotes,
      news,
    };
  } catch (error) {
    console.error("Market provider failed; using demo fallback", error);
    return { ...demoOverview, generatedAt: new Date().toISOString() };
  }
}
