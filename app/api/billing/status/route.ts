import { NextRequest, NextResponse } from "next/server";
import { readProCookieValue, subscriptionIsActive } from "@/lib/billing";

export async function GET(request: NextRequest) {
  const value = request.cookies.get("apex_pro")?.value;
  let subscriptionId: string | null = null;

  try {
    subscriptionId = readProCookieValue(value);
  } catch {
    subscriptionId = null;
  }

  if (!subscriptionId) {
    return NextResponse.json({ pro: false }, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const active = await subscriptionIsActive(subscriptionId);
    const response = NextResponse.json(
      { pro: active },
      { headers: { "Cache-Control": "no-store" } }
    );

    if (!active) {
      response.cookies.set({
        name: "apex_pro",
        value: "",
        path: "/",
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      });
    }
    return response;
  } catch (error) {
    console.error("Billing status error", error);
    return NextResponse.json(
      { pro: false, temporarilyUnavailable: true },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
