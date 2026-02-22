"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PIE_COLORS = ["#e85d5d", "#f28c5e", "#f0c040", "#5bb87d", "#5a9bd5"];

interface DashboardChartsProps {
  monthlyData: { month: string; orders: number }[];
  statusData: { name: string; value: number }[];
}

export function DashboardCharts({
  monthlyData,
  statusData,
}: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="bg-white border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading font-semibold text-base text-[#2F2F2F]">
            Monthly Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e5e5"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#2F2F2F80" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#2F2F2F80" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e5e5",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  fontSize: "13px",
                }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#f08080"
                strokeWidth={2.5}
                dot={{ fill: "#f08080", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#e46d6d" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading font-semibold text-base text-[#2F2F2F]">
            Order Status Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
              >
                {statusData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e5e5",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  fontSize: "13px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px", color: "#2F2F2F" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
