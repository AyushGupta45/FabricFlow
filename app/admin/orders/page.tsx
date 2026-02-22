import { db } from "@/db";
import { orders, enquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import { OrdersClient } from "./OrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrders() {
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  const allEnquiries = await db
    .select()
    .from(enquiries)
    .orderBy(desc(enquiries.createdAt));

  return <OrdersClient initialOrders={allOrders} enquiries={allEnquiries} />;
}
