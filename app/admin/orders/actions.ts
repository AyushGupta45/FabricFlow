"use server";

import { db } from "@/db";
import { orders, enquiries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendOrderCreatedEmail, sendOrderStatusEmail } from "@/lib/mailer";

// Generate order ID: FF-XXXXX (5 alphanumeric chars)
function generateOrderId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion
  let id = "FF-";
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export async function createOrderAction(
  enquiryId: string,
  fabricType: string,
  meters: number,
) {
  try {
    // Fetch enquiry details
    const [enquiry] = await db
      .select()
      .from(enquiries)
      .where(eq(enquiries.id, enquiryId));

    if (!enquiry) {
      return { success: false, error: "Enquiry not found" };
    }

    // Generate unique order ID (retry if collision)
    let orderId = generateOrderId();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await db
        .select()
        .from(orders)
        .where(eq(orders.orderId, orderId));
      if (existing.length === 0) break;
      orderId = generateOrderId();
      attempts++;
    }

    await db.insert(orders).values({
      orderId,
      enquiryId,
      clientName: enquiry.name,
      clientEmail: enquiry.email,
      fabricType,
      meters,
      status: "Received",
    });

    // Send email notification
    await sendOrderCreatedEmail(
      enquiry.email,
      enquiry.name,
      orderId,
      fabricType,
      meters,
    );

    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    return { success: true, orderId };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  try {
    // Get order with email for notification
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderId, orderId));

    if (!order) {
      return { success: false };
    }

    await db.update(orders).set({ status }).where(eq(orders.orderId, orderId));

    // Send status update email
    await sendOrderStatusEmail(
      order.clientEmail,
      order.clientName,
      orderId,
      status,
    );

    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false };
  }
}

export async function deleteOrderAction(orderId: string) {
  try {
    await db.delete(orders).where(eq(orders.orderId, orderId));
    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete order:", error);
    return { success: false };
  }
}
