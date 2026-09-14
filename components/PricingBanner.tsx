"use client";

import { useSearchParams } from "next/navigation";

export default function PricingBanner() {
  const params = useSearchParams();

  if (params.get("unavailable")) {
    return (
      <div className="pricingBanner warningBanner">
        Pro checkout is not live yet. The operator must connect licensed market data and Stripe first.
      </div>
    );
  }

  if (params.get("billing_error")) {
    return (
      <div className="pricingBanner errorBanner">
        Billing could not be started. No subscription was created from this attempt.
      </div>
    );
  }

  if (params.get("canceled")) {
    return (
      <div className="pricingBanner">
        Checkout was canceled. You can keep using the Free plan.
      </div>
    );
  }

  if (params.get("incomplete")) {
    return (
      <div className="pricingBanner warningBanner">
        Checkout was not completed, so Pro was not activated.
      </div>
    );
  }

  return null;
}
