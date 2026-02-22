"use server";

import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteEnquiryAction(id: string) {
  try {
    await db.delete(enquiries).where(eq(enquiries.id, id));
    revalidatePath("/admin/enquiries");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete enquiry:", error);
    return { success: false };
  }
}
