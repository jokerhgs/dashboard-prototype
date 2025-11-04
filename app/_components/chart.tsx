"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A linear area chart";

type ChartAreaLinearProps = {
  title?: string;
  description?: string;
  data: Array<Record<string, string | number>>;
  xAxisKey: string;
  areaKey: string;
  areaLabel?: string;
  areaColor?: string;
  periodText?: string;
  trendingText?: string;
  trendingIcon?: React.ReactNode;
  chartConfig?: ChartConfig;
  fillColor?: string;
  strokeColor?: string;
  fillOpacity?: number;
  loading?: boolean;
};

export function ChartAreaLinear({
  title = "Area Chart - Linear",
  description: cardDescription = "Showing total visitors for the last 6 months",
  data,
  xAxisKey,
  areaKey,
  areaLabel = "Value",
  areaColor = "var(--chart-1)",
  periodText = "January - June 2025",
  trendingText = "Trending up by 5.2% this month",
  trendingIcon = <TrendingUp className="h-4 w-4" />,
  chartConfig,
  fillColor,
  strokeColor,
  fillOpacity = 0.4,
  loading = false,
}: ChartAreaLinearProps) {
  const defaultConfig = {
    [areaKey]: {
      label: areaLabel,
      color: areaColor,
    },
  } satisfies ChartConfig;

  // Use areaColor for fill and stroke if not explicitly provided
  const finalFillColor = fillColor || areaColor;
  const finalStrokeColor = strokeColor || areaColor;

  return (
    <Card className="border-[1.5px] border-sidebar rounded-md">
      <CardHeader>
        <CardTitle>
          {loading ? <Skeleton className="h-6 w-32 mb-2" /> : title}
        </CardTitle>
        <CardDescription>
          {loading ? <Skeleton className="h-4 w-48" /> : cardDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-44 w-full rounded-md" />
        ) : (
          <ChartContainer config={chartConfig || defaultConfig}>
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: string) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Area
                dataKey={areaKey}
                type="linear"
                fill={finalFillColor}
                fillOpacity={fillOpacity}
                stroke={finalStrokeColor}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {loading ? (
                <Skeleton className="h-5 w-36" />
              ) : (
                <>
                  {trendingText} {trendingIcon}
                </>
              )}
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {loading ? <Skeleton className="h-4 w-28" /> : periodText}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
