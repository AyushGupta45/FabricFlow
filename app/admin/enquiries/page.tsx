import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import { EnquiriesClient } from "./EnquiriesClient";

export const dynamic = "force-dynamic";

export default async function AdminEnquiries() {
  const allEnquiries = await db
    .select()
    .from(enquiries)
    .orderBy(desc(enquiries.createdAt));

  return <EnquiriesClient initialEnquiries={allEnquiries} />;
}
