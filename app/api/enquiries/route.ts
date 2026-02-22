import { NextResponse } from "next/server";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { sendEnquiryConfirmation } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { name, email, company, phone, requirement, meterQuantity } = data;

    if (!name || !email || !requirement || !meterQuantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await db.insert(enquiries).values({
      name,
      email,
      company: company || null,
      phone: phone || null,
      requirement,
      meters: parseInt(meterQuantity, 10),
    });

    // Send confirmation email (non-blocking)
    sendEnquiryConfirmation(email, name, requirement).catch(() => {});

    return NextResponse.json(
      { success: true, message: "Enquiry stored successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Enquiry Storage Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
