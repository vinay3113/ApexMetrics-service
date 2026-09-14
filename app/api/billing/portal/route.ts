import { NextRequest, NextResponse } from "next/server";
import { readProCookieValue, stripeRequest } from "@/lib/billing";

type Subscription = { id: string; customer: string | { id: string }; status: string };
type PortalSession = { url: string };

export async function POST(request: NextRequest) {
  const cookie = request.cookies.get("apex_pro")?.value;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

  try {
    const subscriptionId = readProCookieValue(cookie);
    if (!subscriptionId || !appUrl) {
      return NextResponse.redirect(new URL("/pricing", request.url), 303);
    }

    const subscription = await stripeRequest<Subscription>(
      `/subscriptions/${encodeURIComponent(subscriptionId)}`
    );
    const customer =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

    const body = new URLSearchParams();
    body.set("customer", customer);
    body.set("return_url", `${appUrl}/dashboard`);

    const portal = await stripeRequest<PortalSession>("/billing_portal/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });

    return NextResponse.redirect(portal.url, 303);
  } catch (error) {
    console.error("Portal error", error);
    return NextResponse.redirect(new URL("/pricing?billing_error=1", request.url), 303);
  }
}
