import Link from "next/link";
import PricingBanner from "@/components/PricingBanner";

export const metadata = {
  title: "Pricing | ApexMetrics",
  description: "ApexMetrics Free and Pro plans."
};

export default function Pricing() {
  const proPrice = process.env.PRO_PRICE_DISPLAY || "$19";
  return (
    <main className="pricingPage">
      <header className="simpleHeader">
        <Link href="/" className="brand">
          <span className="brandMark">A</span>
          <span><strong>ApexMetrics</strong><small>Market Intelligence</small></span>
        </Link>
        <Link href="/dashboard">Dashboard</Link>
      </header>

      <PricingBanner />

      <section className="pricingIntro">
        <span className="eyebrow">Pricing</span>
        <h1>Useful for free. More depth with Pro.</h1>
        <p>Launch pricing for the ApexMetrics beta. Cancel your subscription through the payment provider.</p>
      </section>

      <section className="pricingCards">
        <article className="priceCard">
          <span className="planName">Free</span>
          <div className="price">$0 <small>/ month</small></div>
          <p>For following the market and testing the workflow.</p>
          <ul>
            <li>Market overview</li>
            <li>Tracked stock universe</li>
            <li>Browser watchlist</li>
            <li>News context and scenario notes</li>
          </ul>
          <Link href="/dashboard" className="secondaryCta fullButton">Start free</Link>
        </article>

        <article className="priceCard featuredPrice">
          <span className="planName">Pro</span>
          <div className="price">{proPrice} <small>/ month</small></div>
          <p>For users who want deeper scenario tools as ApexMetrics develops.</p>
          <ul>
            <li>Everything in Free</li>
            <li>Portfolio allocation scenarios</li>
            <li>Pro status linked to your subscription</li>
            <li>Future advanced intelligence features as released</li>
          </ul>
          <form action="/api/billing/checkout" method="post">
            <button className="primaryCta fullButton" type="submit">Upgrade to Pro</button>
          </form>
          <p className="priceFine">Checkout only activates after live market data and billing are configured.</p>
        </article>
      </section>

      <section className="pricingFaq">
        <h2>Before you subscribe</h2>
        <p><strong>Is this financial advice?</strong> No. ApexMetrics provides informational tools and educational scenarios, not personalized investment advice.</p>
        <p><strong>Are returns guaranteed?</strong> No. Markets are uncertain and losses are possible.</p>
        <p><strong>Why can checkout be unavailable?</strong> The site intentionally refuses to charge customers until live market data and Stripe billing are configured by the operator.</p>
      </section>
    </main>
  );
}
