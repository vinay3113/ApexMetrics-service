import { NextResponse } from "next/server";
import { getOverview } from "@/lib/market-provider";

export async function GET() {
  const data = await getOverview();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=15, stale-while-revalidate=60"
    }
  });
}
