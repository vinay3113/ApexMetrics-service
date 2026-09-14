# ApexMetrics — public SaaS launch build

ApexMetrics is now structured as a public, monetizable Next.js product.

## Included

- Public SEO-friendly landing page
- Public Free dashboard
- Pricing page with Free + configurable Pro launch pricing
- Server-side market/news provider adapter with demo fallback
- Live ETF overview proxies when the provider is configured
- Watchlists stored in browser localStorage
- News → possible-impact scenarios
- Pro-gated portfolio allocation scenarios
- Server-side Stripe Checkout subscription flow using Stripe's REST API
- Signed HTTP-only Pro session cookie
- Live subscription-status verification
- Stripe Customer Portal launch from the dashboard
- Checkout safety gate: billing refuses to start until both live market data and billing are configured
- Privacy page and financial-risk/terms page
- robots.txt-equivalent metadata, dynamic robots route, sitemap, Open Graph metadata
- Health endpoint
- Security headers
- Dockerfile
- Unit test for portfolio allocation math

## Recommended launch pricing

The starter displays **$19/month** by default for Pro. This is a launch recommendation, not a required price.

Change:

```text
PRO_PRICE_DISPLAY=$19
```

and make sure the configured Stripe Price has the exact same amount/currency before launch.

## Required environment variables

Copy `.env.example` to `.env.local`.

```text
FINNHUB_API_KEY=...
NEXT_PUBLIC_APP_URL=https://your-domain.example

STRIPE_SECRET_KEY=...
STRIPE_PRICE_PRO_MONTHLY=price_...
BILLING_SIGNING_SECRET=...

PRO_PRICE_DISPLAY=$19
```

Use a long random value for `BILLING_SIGNING_SECRET`.

Do not put `STRIPE_SECRET_KEY`, `FINNHUB_API_KEY`, or `BILLING_SIGNING_SECRET` in `NEXT_PUBLIC_*` variables.

## Local development

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Without a market-data key, the dashboard clearly runs in Demo mode.

Without the billing variables and live market data, the Pro checkout route redirects back to Pricing and refuses to charge the user.

## Validate

```bash
npm test
npm run build
```

## Deploy publicly on Vercel

1. Push this project to GitHub/GitLab/Bitbucket.
2. Import the repository in Vercel.
3. Add all required environment variables in Project Settings → Environment Variables.
4. Set `NEXT_PUBLIC_APP_URL` to the final HTTPS domain.
5. Deploy.
6. Connect your custom domain.
7. Open `/api/health` and confirm it returns `ok: true`.
8. Confirm the dashboard says the market provider is connected.
9. Run a Stripe test-mode subscription end-to-end.
10. Only then replace test Stripe keys/Price IDs with live-mode values.

The included Dockerfile can also deploy to a container host.

## How Pro billing works

1. User clicks **Upgrade to Pro**.
2. `/api/billing/checkout` creates a Stripe Checkout Session.
3. Stripe hosts payment collection.
4. Stripe redirects back to `/api/billing/activate`.
5. ApexMetrics verifies the Checkout Session with Stripe.
6. The app stores a signed HTTP-only cookie containing only the subscription ID.
7. `/api/billing/status` re-checks the subscription with Stripe before unlocking Pro.
8. **Manage Pro** creates a Stripe Customer Portal Session.

No card numbers are stored by ApexMetrics.

## Important paid-launch limitation

This starter uses a browser-bound signed subscription cookie instead of a full ApexMetrics user account. It is workable for a small paid beta, but a subscriber who changes devices or clears cookies will not automatically carry Pro access to the new browser.

Before scaling paid acquisition, add real user accounts and map Stripe customer/subscription IDs to authenticated users in a database. That also makes purchase recovery, cross-device access, support, and account deletion much cleaner.

## Market-data note

The provider adapter is wired for Finnhub-style endpoints and intentionally isolated in `lib/market-provider.ts`.

Provider APIs, prices, delay rules, exchange entitlements, attribution requirements, redistribution rights and available endpoints can change. Verify the provider's current documentation and commercial licensing before public launch.

When a provider is connected, the overview strip uses ETF proxies (`SPY`, `QQQ`, `DIA`, `IWM`) rather than pretending demo index values are live index feeds.

Historical chart shapes in the dashboard are still illustrative and are labeled as such. Connect a licensed historical-bars endpoint before marketing the charts as live historical market data.

## Financial-product launch note

ApexMetrics currently avoids guaranteed-return claims and labels future-impact analysis as scenarios.

Before adding personalized buy/sell recommendations, precise price targets, or individualized asset allocation, get qualified legal/compliance review for every jurisdiction you serve.

## Monetization funnel included

- Landing page → free dashboard
- Dashboard → Pro upsell
- Pricing page → Stripe Checkout
- Paid subscriber → Pro portfolio scenarios
- Dashboard → billing portal for subscription management

A sensible next revenue step is to add user accounts, saved portfolios, alerts, and a second paid tier only after you have evidence that people use the Free dashboard and convert to Pro.

## Production checklist

See `LAUNCH-CHECKLIST.md`.
# ApexMetrics-service
