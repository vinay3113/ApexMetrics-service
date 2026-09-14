import { createHmac, timingSafeEqual } from "node:crypto";

const STRIPE_API = "https://api.stripe.com/v1";

function stripeKey() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return key;
}

export async function stripeRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${stripeKey()}`);

  const response = await fetch(`${STRIPE_API}${path}`, {
    ...init,
    headers,
    cache: "no-store"
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || "Stripe request failed";
    throw new Error(message);
  }
  return data as T;
}

export type StripeCheckoutSession = {
  id: string;
  url: string | null;
  status: string | null;
  payment_status: string;
  subscription: string | null;
  customer: string | null;
};

export type StripeSubscription = {
  id: string;
  status: string;
  current_period_end?: number;
};

function signingSecret() {
  const secret = process.env.BILLING_SIGNING_SECRET;
  if (!secret) throw new Error("BILLING_SIGNING_SECRET is not configured");
  return secret;
}

function signature(value: string) {
  return createHmac("sha256", signingSecret()).update(value).digest("hex");
}

export function createProCookieValue(subscriptionId: string) {
  return `${subscriptionId}.${signature(subscriptionId)}`;
}

export function readProCookieValue(cookieValue?: string | null) {
  if (!cookieValue) return null;
  const [subscriptionId, givenSig] = cookieValue.split(".");
  if (!subscriptionId || !givenSig) return null;

  const expected = Buffer.from(signature(subscriptionId), "hex");
  const given = Buffer.from(givenSig, "hex");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

  return subscriptionId;
}

export async function subscriptionIsActive(subscriptionId: string) {
  const subscription = await stripeRequest<StripeSubscription>(
    `/subscriptions/${encodeURIComponent(subscriptionId)}`
  );
  return ["active", "trialing"].includes(subscription.status);
}
