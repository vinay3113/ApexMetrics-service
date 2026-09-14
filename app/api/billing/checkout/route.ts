import { NextRequest, NextResponse } from "next/server";
import { stripeRequest, type StripeCheckoutSession } from "@/lib/billing";

export async function POST(request: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  const priceId = process.env.STRIPE_PRICE_PRO_MONTHLY;

  // Fail safely: never charge for the demo-only configuration.
  if (
    !process.env.FINNHUB_API_KEY ||
    !process.env.STRIPE_SECRET_KEY ||
    !process.env.BILLING_SIGNING_SECRET ||
    !priceId ||
    !appUrl
  ) {
    return NextResponse.redirect(new URL("/pricing?unavailable=1", request.url), 303);
  }

  const body = new URLSearchParams();
  body.set("mode", "subscription");
  body.set("line_items[0][price]", priceId);
  body.set("line_items[0][quantity]", "1");
  body.set("success_url", `${appUrl}/api/billing/activate?session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${appUrl}/pricing?canceled=1`);
  body.set("allow_promotion_codes", "true");
  body.set("billing_address_collection", "auto");
  body.set("subscription_data[metadata][product]", "apexmetrics-pro");

  try {
    const session = await stripeRequest<StripeCheckoutSession>("/checkout/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });

    if (!session.url) throw new Error("Checkout URL unavailable");
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Checkout error", error);
    return NextResponse.redirect(new URL("/pricing?billing_error=1", request.url), 303);
  }
}
