import Link from "next/link";

export const metadata = { title: "Terms & Risk Disclosure" };

export default function TermsPage() {
  return (
    <main className="legal">
      <Link href="/">← Back to ApexMetrics</Link>
      <h1>Terms & Risk Disclosure</h1>
      <p><strong>Effective:</strong> launch version</p>

      <h2>Informational product</h2>
      <p>
        ApexMetrics is an informational market-research product. It does not guarantee investment
        performance, financial freedom, profit, or any particular market outcome. Portfolio tools
        show educational scenarios and are not individualized financial, legal or tax advice.
      </p>

      <h2>Market risk</h2>
      <p>
        Securities and other investments can lose value, including substantial or total loss of
        capital. Historical results do not guarantee future results. Forecasts, scenarios and
        news-impact notes are uncertain by definition.
      </p>

      <h2>Data limitations</h2>
      <p>
        Quotes, news, company data and charts can be delayed, incomplete, unavailable or incorrect.
        Do not rely on ApexMetrics as the sole source for time-sensitive trading decisions.
      </p>

      <h2>Subscriptions</h2>
      <p>
        Pro is a recurring subscription at the price displayed at checkout. The billing provider
        manages payment collection and subscription management. You can open the billing portal
        from the dashboard to manage or cancel an active subscription.
      </p>

      <h2>Beta product</h2>
      <p>
        Features may evolve as ApexMetrics develops. Material changes to paid features or billing
        terms should be communicated to subscribers before they take effect.
      </p>

      <h2>Regulatory review</h2>
      <p>
        Before operating ApexMetrics as a personalized investment-advice service, the operator
        should obtain qualified legal and compliance review for every jurisdiction served.
      </p>
    </main>
  );
}
