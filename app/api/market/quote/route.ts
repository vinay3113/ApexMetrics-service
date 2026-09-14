import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getQuote } from "@/lib/market-provider";

const querySchema = z.string().trim().toUpperCase().regex(/^[A-Z.\-]{1,10}$/);

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("symbol") || "";
  const parsed = querySchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid symbol" }, { status: 400 });
  }

  try {
    const quote = await getQuote(parsed.data);
    return NextResponse.json(quote, {
      headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=45" }
    });
  } catch {
    return NextResponse.json({ error: "Quote unavailable" }, { status: 404 });
  }
}
