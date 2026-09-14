import Link from "next/link";

export default function Home() {
  return (
    <main className="marketing">
      <header className="marketingNav">
        <Link href="/" className="brand">
          <span className="brandMark">A</span>
          <span><strong>ApexMetrics</strong><small>Market Intelligence</small></span>
        </Link>
        <nav>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/terms">Risk disclosure</Link>
        </nav>
        <Link href="/dashboard" className="navCta">Open dashboard</Link>
      </header>

      <section className="heroMarketing">
        <div className="heroCopy">
          <span className="pill">Stocks + news context + portfolio scenarios</span>
          <h1>See the market.<br/>Understand what could move it.</h1>
          <p>
            ApexMetrics brings market data, global headlines, watchlists and scenario-based
            portfolio tools into one clean financial command center.
          </p>
          <div className="heroActions">
            <Link href="/dashboard" className="primaryCta">Use ApexMetrics free</Link>
            <Link href="/pricing" className="secondaryCta">See Pro</Link>
          </div>
          <p className="finePrint">Informational only. No guaranteed returns. Market data may be delayed depending on the configured provider.</p>
        </div>

        <div className="heroPreview">
          <div className="previewTop">
            <span>ApexMetrics</span><span className="liveChip">Market intelligence</span>
          </div>
          <div className="previewStats">
            <div><small>Market overview</small><strong>S&P 500</strong><span className="up">+0.46%</span></div>
            <div><small>Watchlist</small><strong>NVDA</strong><span className="up">+2.41%</span></div>
            <div><small>Signal</small><strong>AI infra</strong><span>Scenario</span></div>
          </div>
          <div className="previewChart">
            <svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-label="Illustrative market chart">
              <path d="M0 145 C70 130, 90 150, 150 110 S240 125, 300 90 S390 105, 450 58 S540 65, 600 28" />
            </svg>
          </div>
          <div className="previewInsight">
            <strong>Headline → possible impact</strong>
            <p>Understand affected sectors, assumptions, downside risks and what to watch next.</p>
          </div>
        </div>
      </section>

      <section className="featureBand">
        <article><span>01</span><h2>Market overview</h2><p>Track major indices and a focused stock universe without clutter.</p></article>
        <article><span>02</span><h2>News impact</h2><p>Turn headlines into conditional market scenarios instead of hype.</p></article>
        <article><span>03</span><h2>Portfolio scenarios</h2><p>Explore allocation examples by capital and risk preference with transparent assumptions.</p></article>
      </section>

      <section className="trustSection">
        <div>
          <span className="eyebrow">Built for clarity</span>
          <h2>Financial research should explain uncertainty, not hide it.</h2>
        </div>
        <div className="trustPoints">
          <p><strong>Facts vs. scenarios</strong><br/>Potential impacts are labeled as scenarios, not predictions.</p>
          <p><strong>No “guaranteed returns” language</strong><br/>ApexMetrics avoids pretending the future is precise.</p>
          <p><strong>Provider-ready</strong><br/>Market data keys stay server-side and can be replaced without rebuilding the UI.</p>
        </div>
      </section>

      <section className="pricingTeaser">
        <span className="eyebrow">Simple launch pricing</span>
        <h2>Start free. Upgrade when you want deeper tools.</h2>
        <p>Use the core dashboard for free. Pro unlocks portfolio scenarios and future advanced research features.</p>
        <Link href="/pricing" className="primaryCta">View pricing</Link>
      </section>

      <footer className="marketingFooter">
        <div><strong>ApexMetrics</strong><p>Market intelligence without the noise.</p></div>
        <div>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms & risk</Link>
        </div>
      </footer>
    </main>
  );
}
