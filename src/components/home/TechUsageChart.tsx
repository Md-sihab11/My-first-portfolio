"use client";

import {
  Bar,
  BarChart,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { topTechUsage } from "@/lib/tech-usage";
import { projects } from "@/data/projects";

const chartConfig = {
  count: {
    label: "Projects",
    color: "rgb(var(--accent))",
  },
} satisfies ChartConfig;

export function TechUsageChart() {
  return (
    <Card className="h-full border-border/80 bg-surface/70">
      <CardHeader className="p-5 pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-semibold">
              Most-used technologies
            </CardTitle>
            <CardDescription>
              Derived from the stack listed on {projects.length} shipped
              projects.
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">
            Project data
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-1">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[236px] w-full"
        >
          <BarChart
            data={topTechUsage}
            layout="vertical"
            margin={{ top: 4, right: 28, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="tech-usage-bar" x1="0" y1="0" x2="1" y2="0">
                <stop
                  offset="0%"
                  stopColor="rgb(var(--accent))"
                  stopOpacity={0.45}
                />
                <stop
                  offset="100%"
                  stopColor="rgb(var(--accent))"
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>

            <XAxis type="number" dataKey="count" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={92}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgb(var(--text-secondary))", fontSize: 11 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel indicator="line" />}
            />
            <Bar
              dataKey="count"
              fill="url(#tech-usage-bar)"
              radius={[0, 5, 5, 0]}
              barSize={13}
            >
              <LabelList
                dataKey="count"
                position="right"
                fill="rgb(var(--text-secondary))"
                fontSize={10}
                fontFamily="var(--font-mono)"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
