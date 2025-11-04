"use client";
import { ChartAreaLinear } from "../_components/chart";
import { Header } from "../_components/header";
import { BarChart3, TrendingUp } from "lucide-react";

// Mock data for the charts
const mockSales = [
  { date: "2024-01-01", sales: 100 },
  { date: "2024-01-02", sales: 150 },
  { date: "2024-01-03", sales: 70 },
  { date: "2024-01-04", sales: 200 },
];

const mockRevenue = [
  { date: "2024-01-01", revenue: 250 },
  { date: "2024-01-02", revenue: 370 },
  { date: "2024-01-03", revenue: 180 },
  { date: "2024-01-04", revenue: 420 },
];

// Mock AI insights data
const aiInsights = [
  {
    title: "Sales Surge Detected",
    body: "Sales increased by 185% on 2024-01-04 compared to the previous day, possibly driven by a promotion or marketing event.",
    icon: <BarChart3 className="w-4 h-4 text-blue-600 mr-2 inline-block" />,
  },
  {
    title: "Revenue Growth",
    body: "Revenue peaked at $420 on 2024-01-04, the highest this week, signaling strong conversion rates.",
    icon: <BarChart3 className="w-4 h-4 text-green-600 mr-2 inline-block" />,
  },
  {
    title: "Customer Acquisition",
    body: "67 new customers joined on 2024-01-04, representing a 130% increase compared to 2 days prior.",
    icon: <BarChart3 className="w-4 h-4 text-amber-600 mr-2 inline-block" />,
  },
];

export default function SalesPage() {
  return (
    <div className="p-4">
      <Header
        title="Sales"
        description="Gain insights and track your store’s sales, revenue, orders, and new customer growth."
      />
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* Sales Chart Column */}
        <div className="col-span-1 flex flex-col gap-4 min-w-0">
          <ChartAreaLinear
            title="Sales Trend"
            description="Daily sales for the last 4 days"
            data={mockSales}
            xAxisKey="date"
            areaKey="sales"
            areaLabel="Sales"
            areaColor="#2563eb"
            periodText="Jan 1 - Jan 4, 2024"
            trendingText="Trending up by 185% on Jan 4"
            trendingIcon={<TrendingUp className="h-4 w-4" />}
          />
        </div>
        {/* Revenue Chart Column */}
        <div className="col-span-1 flex flex-col gap-4 min-w-0">
          <ChartAreaLinear
            title="Revenue"
            description="Revenue over the last 4 days"
            data={mockRevenue}
            xAxisKey="date"
            areaKey="revenue"
            areaLabel="Revenue"
            areaColor="#10b981"
            periodText="Jan 1 - Jan 4, 2024"
            trendingText="Peak revenue $420 on Jan 4"
            trendingIcon={<TrendingUp className="h-4 w-4" />}
          />
        </div>
        {/* AI Generated Insights Column */}
        <div className="col-span-1 flex flex-col gap-3 min-h-[250px]">
          <div className="bg-background border border-border rounded-lg shadow p-5 h-full">
            <h3 className="text-md font-bold text-primary mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> AI Generated
              Insights
            </h3>
            <ul className="flex flex-col gap-3">
              {aiInsights.map((insight, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span>{insight.icon}</span>
                  <div>
                    <div className="text-sm font-semibold">{insight.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {insight.body}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
