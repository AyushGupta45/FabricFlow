import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, MessagesSquare } from "lucide-react";
import { db } from "@/db";
import { orders, enquiries } from "@/db/schema";
import { DashboardCharts } from "@/components/admin/DashboardCharts";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [allOrders, allEnquiries] = await Promise.all([
    db.select().from(orders),
    db.select().from(enquiries),
  ]);
  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter(
    (o) => o.status !== "Completed" && o.status !== "Dispatched",
  ).length;
  const totalEnquiries = allEnquiries.length;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      description: "Lifetime processing volume",
      icon: <Package className="w-5 h-5 text-[#f08080]" />,
    },
    {
      title: "In Progress",
      value: pendingOrders.toString(),
      description: "Awaiting completion",
      icon: <Clock className="w-5 h-5 text-[#f08080]" />,
    },
    {
      title: "Enquiries",
      value: totalEnquiries.toString(),
      description: "Total inbound leads",
      icon: <MessagesSquare className="w-5 h-5 text-[#f08080]" />,
    },
  ];

  // Aggregate monthly order data from actual orders
  const monthlyMap = new Map<string, number>();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  allOrders.forEach((o) => {
    const date = new Date(o.createdAt);
    const key = `${monthNames[date.getMonth()]} ${date.getFullYear().toString().slice(2)}`;
    monthlyMap.set(key, (monthlyMap.get(key) || 0) + 1);
  });
  const monthlyData = Array.from(monthlyMap.entries())
    .slice(-6)
    .map(([month, count]) => ({ month, orders: count }));

  // If no monthly data, provide current month
  if (monthlyData.length === 0) {
    const now = new Date();
    monthlyData.push({
      month: `${monthNames[now.getMonth()]} ${now.getFullYear().toString().slice(2)}`,
      orders: totalOrders,
    });
  }

  // Aggregate status distribution from actual orders
  const statusMap = new Map<string, number>();
  allOrders.forEach((o) => {
    statusMap.set(o.status, (statusMap.get(o.status) || 0) + 1);
  });
  const statusData = Array.from(statusMap.entries()).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading font-bold text-2xl text-[#2F2F2F]">
          Dashboard
        </h1>
        <p className="font-sans text-sm text-[#2F2F2F]/50 mt-1">
          Overview of your textile processing operations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-white border-neutral-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-heading font-medium text-sm text-[#2F2F2F]/60">
                {stat.title}
              </CardTitle>
              <div className="w-8 h-8 rounded-lg bg-[#f8ad9d]/20 flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold text-[#2F2F2F]">
                {stat.value}
              </div>
              <p className="text-xs text-[#2F2F2F]/40 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <DashboardCharts monthlyData={monthlyData} statusData={statusData} />
    </div>
  );
}
