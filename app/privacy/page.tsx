import Link from "next/link";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main className="legal">
      <Link href="/">← Back to ApexMetrics</Link>
      <h1>Privacy</h1>
      <p><strong>Effective:</strong> launch version</p>

      <h2>What this site stores</h2>
      <p>
        The Free watchlist is stored in your browser using localStorage. If you purchase Pro,
        the site stores a signed HTTP-only cookie containing a Stripe subscription identifier
        so it can verify whether the subscription is active. The cookie does not contain your
        payment-card number.
      </p>

      <h2>Payments</h2>
      <p>
        Subscription checkout and billing management are handled by Stripe. Payment information
        is submitted to Stripe rather than stored by ApexMetrics. Stripe's own privacy terms
        apply to information you provide during checkout.
      </p>

      <h2>Market data</h2>
      <p>
        Server-side market-data providers may receive quote/news requests needed to operate the
        dashboard. ApexMetrics should only send the minimum information required for those requests.
      </p>

      <h2>Analytics</h2>
      <p>
        This starter does not enable third-party behavioral analytics by default. If analytics,
        advertising or additional cookies are added, this policy and any required consent flow
        should be updated before those tools are enabled.
      </p>

      <h2>Your choices</h2>
      <p>
        You can clear the browser watchlist by clearing local site storage. Pro subscribers can
        use the billing portal from the dashboard to manage their subscription.
      </p>
    </main>
  );
}
