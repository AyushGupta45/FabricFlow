import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.orderId, orderId.toUpperCase()));

    if (result.length === 0) {
      return NextResponse.json(
        {
          error: "Order not found. Please try a valid order ID (e.g., ORD001).",
        },
        { status: 404 },
      );
    }

    const order = result[0];

    return NextResponse.json({ orderId: order.orderId, status: order.status });
  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
