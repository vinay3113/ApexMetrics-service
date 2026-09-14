import { NextRequest, NextResponse } from "next/server";
import { createProCookieValue, stripeRequest, type StripeCheckoutSession } from "@/lib/billing";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.redirect(new URL("/pricing?billing_error=1", request.url));
  }

  try {
    const session = await stripeRequest<StripeCheckoutSession>(
      `/checkout/sessions/${encodeURIComponent(sessionId)}`
    );

    if (session.status !== "complete" || !session.subscription) {
      return NextResponse.redirect(new URL("/pricing?incomplete=1", request.url));
    }

    const response = NextResponse.redirect(new URL("/dashboard?upgraded=1", request.url));
    response.cookies.set({
      name: "apex_pro",
      value: createProCookieValue(session.subscription),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Activation error", error);
    return NextResponse.redirect(new URL("/pricing?billing_error=1", request.url));
  }
}
