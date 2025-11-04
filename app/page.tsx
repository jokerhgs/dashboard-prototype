"use client";
import { useState, useEffect } from "react";
import { Header } from "./_components/header";
import { Card } from "@/app/_components/card";
import { DollarSign, Package, TrendingUp, Tag, Percent } from "lucide-react";
import { ChartAreaLinear } from "./_components/chart";
import { fetchDashboardData } from "./api/mock";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<{
    revenueChart: { month: string; sales: number }[];
    orderVolume: { month: string; orders: number }[];
  }>({
    revenueChart: [],
    orderVolume: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        // Optionally handle errors here
        setDashboardData({
          revenueChart: [],
          orderVolume: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <Header
        title="Dashboard"
        description="An overview of your store’s performance, orders, and sales data."
      />
      <div className="grid grid-cols-5 gap-2">
        <Card
          title="Revenue"
          icon={<DollarSign className="text-primary" />}
          value="$15,200"
          loading={isLoading}
        />
        <Card
          title="Total Orders"
          icon={<Package className="text-primary" />}
          value="389"
          loading={isLoading}
        />
        <Card
          title="Customer Growth"
          icon={<TrendingUp className="text-primary" />}
          value="7.8%"
          loading={isLoading}
        />
        <Card
          title="Inventory Value"
          icon={<Tag className="text-primary" />}
          value="$32,410"
          loading={isLoading}
        />
        <Card
          title="Profit Margin"
          icon={<Percent className="text-primary" />}
          value="23.4%"
          loading={isLoading}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="w-full">
          <ChartAreaLinear
            title="Revenue Chart"
            description="Sales over the last 6 months"
            data={dashboardData.revenueChart}
            xAxisKey="month"
            areaKey="sales"
            areaLabel="Sales"
            areaColor="#2563eb"
            periodText="January - June 2024"
            trendingText="Trending up by 5.2% this month"
            trendingIcon={<TrendingUp className="h-4 w-4" />}
            loading={isLoading}
          />
        </div>
        <div>
          <ChartAreaLinear
            title="Order Volume"
            description="Orders placed over the last 6 months"
            data={dashboardData.orderVolume}
            xAxisKey="month"
            areaKey="orders"
            areaLabel="Orders"
            areaColor="#34d399"
            periodText="January - June 2024"
            trendingText="Trending up by 8.1% this month"
            trendingIcon={<TrendingUp className="h-4 w-4" />}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
