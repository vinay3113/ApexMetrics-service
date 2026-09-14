import type { Metadata } from "next";
import { getOverview } from "@/lib/market-provider";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "ApexMetrics market overview, news context, watchlists and portfolio scenarios."
};

export default async function DashboardPage() {
  const overview = await getOverview();
  return <Dashboard initialData={overview} />;
}
