"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { MarketOverview, Quote } from "@/lib/types";
import PortfolioHelper from "@/components/PortfolioHelper";

type View = "overview" | "markets" | "news" | "portfolio";

const demoSeries: Record<string, number[]> = {
  NVDA: [96, 99, 98, 102, 105, 104, 109, 111, 115, 113, 119, 121, 125, 123, 129, 132],
  MSFT: [405, 408, 410, 409, 414, 416, 418, 420, 419, 422, 425, 423, 427, 429, 430, 431],
  AAPL: [218, 220, 221, 223, 222, 224, 226, 225, 224, 226, 225, 224, 225, 224, 223, 224],
  AMZN: [173, 175, 174, 177, 178, 180, 179, 182, 184, 183, 185, 187, 186, 188, 187, 186],
  TSLA: [245, 242, 238, 241, 236, 232, 235, 231, 228, 234, 232, 230, 229, 227, 231, 230]
};

function money(v: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
}
function signed(v: number) {
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}
function pathFrom(values: number[]) {
  const w = 900, h = 260, pad = 16;
  const min = Math.min(...values), max = Math.max(...values), span = Math.max(max - min, 1);
  const pts = values.map((v, i) => {
    const x = pad + i * (w - pad * 2) / (values.length - 1);
    const y = pad + (max - v) * (h - pad * 2) / span;
    return [x, y];
  });
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  return { line, area: `${line} L${pts.at(-1)![0]},244 L${pts[0][0]},244 Z` };
}

export default function Dashboard({ initialData }: { initialData: MarketOverview }) {
  const [data, setData] = useState(initialData);
  const [view, setView] = useState<View>("overview");
  const [selected, setSelected] = useState<Quote>(initialData.quotes[0]);
  const [query, setQuery] = useState("");
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [billingLoaded, setBillingLoaded] = useState(false);

  useEffect(() => {
    try {
      setWatchlist(JSON.parse(localStorage.getItem("apex-watchlist") || '["NVDA","MSFT","AAPL"]'));
    } catch {
      setWatchlist(["NVDA", "MSFT", "AAPL"]);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/billing/status", { cache: "no-store" })
      .then(async (res) => {
        const body = await res.json().catch(() => ({ pro: false }));
        if (active) setIsPro(Boolean(body.pro));
      })
      .catch(() => {
        if (active) setIsPro(false);
      })
      .finally(() => {
        if (active) setBillingLoaded(true);
      });
    return () => { active = false; };
  }, []);

  const saveWatchlist = (next: string[]) => {
    setWatchlist(next);
    localStorage.setItem("apex-watchlist", JSON.stringify(next));
  };

  const refresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/market/overview", { cache: "no-store" });
      if (res.ok) {
        const next = await res.json() as MarketOverview;
        setData(next);
        const match = next.quotes.find(q => q.symbol === selected.symbol);
        if (match) setSelected(match);
      }
    } finally {
      setRefreshing(false);
    }
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return data.quotes.filter(s => s.symbol.toLowerCase().includes(q) || s.company.toLowerCase().includes(q));
  }, [query, data.quotes]);

  const chart = pathFrom(demoSeries[selected.symbol] || [
    selected.previousClose, selected.price * .995, selected.price * 1.002, selected.price
  ]);

  const viewTitle: Record<View, string> = {
    overview: "Market Overview",
    markets: "Markets",
    news: "News Impact",
    portfolio: "Portfolio Helper"
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="ApexMetrics home">
          <span className="brandMark">A</span>
          <span><strong>ApexMetrics</strong><small>Market Intelligence</small></span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {(["overview", "markets", "news", "portfolio"] as View[]).map(item => (
            <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>
              {item === "overview" ? "Overview" : item === "news" ? "News Impact" : item === "portfolio" ? `Portfolio Helper${isPro ? " · Pro" : " · 🔒"}` : "Markets"}
            </button>
          ))}
        </nav>

        <div className="statusCard">
          <span className={`statusDot ${data.mode === "provider" ? "live" : ""}`} />
          <div>
            <strong>{data.mode === "provider" ? "Provider connected" : "Demo data mode"}</strong>
            <p>{data.mode === "provider" ? "Quotes are loaded server-side." : "Add FINNHUB_API_KEY to enable provider quotes."}</p>
          </div>
        </div>

        <div className="sideFooter">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <a href="/terms">Risk disclosure</a>
          <a href="/privacy">Privacy</a>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">Financial command center</span>
            <h1>{viewTitle[view]}</h1>
          </div>
          <div className="topActions">
            <div className="search">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search ticker or company" aria-label="Search stocks" />
              {results.length > 0 && (
                <div className="searchMenu">
                  {results.map(s => (
                    <button key={s.symbol} onClick={() => { setSelected(s); setView("overview"); setQuery(""); }}>
                      <span><strong>{s.symbol}</strong> · {s.company}</span>
                      <span className={s.changePercent >= 0 ? "up" : "down"}>{signed(s.changePercent)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {billingLoaded && (
              isPro ? (
                <form action="/api/billing/portal" method="post">
                  <button className="refreshButton" type="submit">Manage Pro</button>
                </form>
              ) : (
                <Link href="/pricing" className="upgradeButton">Upgrade</Link>
              )
            )}
            <button className="refreshButton" onClick={refresh} disabled={refreshing}>
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </header>

        {view === "overview" && (
          <>
            <section className="marketStrip" aria-label="Major indices">
              {data.indices.map(i => (
                <article key={i.symbol}>
                  <small>{i.name}</small>
                  <strong>{i.value.toLocaleString()}</strong>
                  <span className={i.changePercent >= 0 ? "up" : "down"}>{signed(i.changePercent)}</span>
                </article>
              ))}
            </section>

            <section className="heroGrid">
              <article className="card chartCard">
                <div className="cardHead">
                  <div>
                    <span className="eyebrow">Featured stock</span>
                    <h2>{selected.company}</h2>
                    <p>{selected.symbol} · {selected.source === "demo" ? "Demo quote" : selected.delayed ? "Delayed quote" : "Provider quote"}</p>
                  </div>
                  <div className="priceBlock">
                    <strong>{money(selected.price)}</strong>
                    <span className={selected.changePercent >= 0 ? "up" : "down"}>{signed(selected.changePercent)}</span>
                  </div>
                </div>
                <svg className="chart" viewBox="0 0 900 260" preserveAspectRatio="none" role="img" aria-label={`${selected.symbol} illustrative price chart`}>
                  <line x1="0" x2="900" y1="65" y2="65" className="gridLine" />
                  <line x1="0" x2="900" y1="130" y2="130" className="gridLine" />
                  <line x1="0" x2="900" y1="195" y2="195" className="gridLine" />
                  <path d={chart.area} className="chartArea" />
                  <path d={chart.line} className="chartLine" />
                </svg>
                <p className="microcopy">Chart shape is illustrative in this starter. Connect a licensed historical-bars endpoint before launch.</p>
              </article>

              <article className="card signalCard">
                <span className="eyebrow">Decision support</span>
                <h2>What matters now</h2>
                <div className="signal">
                  <span className="signalIcon positive" /><div><strong>Momentum</strong><p>Compare current price action with a defined historical baseline before treating momentum as meaningful.</p></div>
                </div>
                <div className="signal">
                  <span className="signalIcon warning" /><div><strong>Volatility</strong><p>Earnings, rates, policy and sector positioning can widen short-term price ranges.</p></div>
                </div>
                <div className="signal">
                  <span className="signalIcon neutral" /><div><strong>Scenario, not certainty</strong><p>ApexMetrics should separate observed facts from estimates and future scenarios.</p></div>
                </div>
              </article>
            </section>

            <section className="lowerGrid">
              <article className="card">
                <div className="cardHead"><div><span className="eyebrow">Watchlist</span><h2>Your market radar</h2></div></div>
                <div className="watchlist">
                  {data.quotes.filter(q => watchlist.includes(q.symbol)).map(q => (
                    <button key={q.symbol} className="watchRow" onClick={() => setSelected(q)}>
                      <span><strong>{q.symbol}</strong><small>{q.company}</small></span>
                      <span>{money(q.price)}</span>
                      <span className={q.changePercent >= 0 ? "up" : "down"}>{signed(q.changePercent)}</span>
                    </button>
                  ))}
                  {watchlist.length === 0 && <p className="muted">Add stocks from Markets.</p>}
                </div>
              </article>

              <article className="card">
                <div className="cardHead"><div><span className="eyebrow">Global context</span><h2>News → possible impact</h2></div></div>
                <div className="newsList">
                  {data.news.slice(0, 3).map(n => (
                    <article key={n.id}>
                      <small>{n.source} · {new Date(n.publishedAt).toLocaleDateString()}</small>
                      <h3>{n.headline}</h3>
                      <p className="impact">{n.impact}</p>
                    </article>
                  ))}
                </div>
              </article>
            </section>
          </>
        )}

        {view === "markets" && (
          <section className="card">
            <div className="cardHead">
              <div><span className="eyebrow">Stock universe</span><h2>Tracked companies</h2></div>
            </div>
            <div className="tableWrap">
              <table>
                <thead><tr><th>Company</th><th>Ticker</th><th>Price</th><th>Day</th><th>Watchlist</th></tr></thead>
                <tbody>
                  {data.quotes.map(q => {
                    const added = watchlist.includes(q.symbol);
                    return (
                      <tr key={q.symbol}>
                        <td><strong>{q.company}</strong></td>
                        <td>{q.symbol}</td>
                        <td>{money(q.price)}</td>
                        <td className={q.changePercent >= 0 ? "up" : "down"}>{signed(q.changePercent)}</td>
                        <td><button className="linkButton" onClick={() => saveWatchlist(added ? watchlist.filter(x => x !== q.symbol) : [...watchlist, q.symbol])}>{added ? "Remove" : "Add"}</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {view === "news" && (
          <section>
            <div className="sectionIntro">
              <span className="eyebrow">Event intelligence</span>
              <h2>Understand the link between headlines and markets</h2>
              <p>Impact notes are scenarios, not predictions of a guaranteed price move.</p>
            </div>
            <div className="newsGrid">
              {data.news.map(n => (
                <article className="card newsCard" key={n.id}>
                  <span className="eyebrow">{n.source}</span>
                  <h3>{n.headline}</h3>
                  <p>{n.summary}</p>
                  <div className="impactBox"><strong>Possible market impact</strong><p>{n.impact}</p></div>
                  {n.url && <a className="sourceLink" href={n.url} target="_blank" rel="noreferrer">Open source ↗</a>}
                </article>
              ))}
            </div>
          </section>
        )}

        {view === "portfolio" && (
          !billingLoaded ? (
            <section className="card"><p className="muted">Checking Pro access…</p></section>
          ) : isPro ? (
            <PortfolioHelper />
          ) : (
            <section className="proGate">
              <div className="proGateIcon">A+</div>
              <span className="eyebrow">ApexMetrics Pro</span>
              <h2>Portfolio scenarios are a Pro tool.</h2>
              <p>
                Explore example allocations by capital and risk preference with transparent
                percentages and no promises of guaranteed returns.
              </p>
              <Link href="/pricing" className="primaryCta">See Pro pricing</Link>
              <small>Market overview, watchlists and news context remain free.</small>
            </section>
          )
        )}
      </main>
    </div>
  );
}
