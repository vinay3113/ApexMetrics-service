# ApexMetrics public launch checklist

## 1. Product readiness

- [ ] Replace demo data with properly licensed live/delayed market data.
- [ ] Connect licensed historical bars if historical charts will be marketed as real.
- [ ] Verify all quote/news timestamps and delay labels.
- [ ] Test mobile layout, desktop layout, empty states, provider failures and billing failures.
- [ ] Confirm every paid feature advertised on Pricing is actually accessible to Pro subscribers.

## 2. Revenue readiness

- [ ] Create Stripe product: ApexMetrics Pro.
- [ ] Create the monthly recurring Stripe Price.
- [ ] Set the displayed price and Stripe Price to the same amount/currency.
- [ ] Complete a Stripe test-mode purchase.
- [ ] Confirm Pro unlocks after successful checkout.
- [ ] Confirm canceled/inactive subscriptions stop unlocking Pro.
- [ ] Confirm the Customer Portal opens from **Manage Pro**.
- [ ] Review Stripe tax settings for the markets you intend to sell into.
- [ ] Decide and publish a clear refund policy before spending on paid acquisition.

## 3. Security

- [ ] Use long random production secrets.
- [ ] HTTPS only.
- [ ] Never expose provider or Stripe secret keys to the browser.
- [ ] Add an edge/API rate limiter before meaningful traffic.
- [ ] Add error monitoring and uptime monitoring.
- [ ] Review dependencies for known vulnerabilities before each production release.
- [ ] Configure backups once a user database is added.

## 4. Legal / compliance

- [ ] Confirm market-data redistribution and attribution rights.
- [ ] Have Privacy and Terms reviewed for your actual company/jurisdiction.
- [ ] Determine whether personalized investment functionality would trigger registration/licensing obligations.
- [ ] Keep scenario language conditional and never promise guaranteed returns.
- [ ] Add a real support/contact method before charging customers.

## 5. SEO / growth

- [ ] Set final `NEXT_PUBLIC_APP_URL`.
- [ ] Connect the custom domain.
- [ ] Verify `/robots.txt` and `/sitemap.xml`.
- [ ] Add a real social-share image.
- [ ] Register the site with Google Search Console/Bing Webmaster Tools.
- [ ] Publish useful market-education/research pages only when you can keep them accurate.
- [ ] Add privacy-respecting analytics before running campaigns.
- [ ] Track landing → dashboard → pricing → checkout conversion.

## 6. Before scaling beyond beta

- [ ] Add real user authentication.
- [ ] Store subscription entitlement against authenticated user IDs.
- [ ] Support cross-device paid access and purchase recovery.
- [ ] Persist watchlists/portfolios server-side.
- [ ] Add alerts/notifications only with explicit consent.
- [ ] Introduce a support workflow for billing and account issues.
