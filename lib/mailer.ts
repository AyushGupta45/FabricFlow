import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT
  ? parseInt(process.env.SMTP_PORT, 10)
  : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const isConfigured = !!(SMTP_HOST && SMTP_USER && SMTP_PASS);

let transporter: nodemailer.Transporter | null = null;

if (isConfigured) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

// ─── Core send function ───────────────────────────────────
export async function sendMail(to: string, subject: string, html: string) {
  if (!transporter || !isConfigured) {
    console.log(`[Mailer] SMTP not configured — skipping email to ${to}`);
    return;
  }
  try {
    await transporter.sendMail({
      from: `"FabricFlow" <${SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`[Mailer] Sent "${subject}" to ${to}`);
  } catch (err) {
    console.error(`[Mailer] Failed to send "${subject}" to ${to}:`, err);
  }
}

// ─── Email Templates ──────────────────────────────────────

const BRAND = "#f08080";
const wrapper = (content: string) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #2F2F2F;">
    <div style="text-align: center; margin-bottom: 32px;">
      <span style="font-size: 20px; font-weight: 700; color: ${BRAND};">FabricFlow</span>
    </div>
    ${content}
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 12px; color: #999;">
      FabricFlow — Premium B2B Textile Processing<br/>
      Plot 45, Phase II Industrial Area, Textile Hub, Gujarat - 395002
    </div>
  </div>
`;

export async function sendEnquiryConfirmation(
  to: string,
  name: string,
  requirement: string,
) {
  const subject = "We've received your enquiry — FabricFlow";
  const html = wrapper(`
    <h2 style="font-size: 22px; margin: 0 0 16px;">Hi ${name},</h2>
    <p style="font-size: 15px; line-height: 1.6; color: #555;">
      Thank you for reaching out to FabricFlow. We've received your enquiry and our sales team will review your requirements shortly.
    </p>
    <div style="background: #faf9f8; border-radius: 8px; padding: 16px 20px; margin: 24px 0; border: 1px solid #e5e5e5;">
      <p style="margin: 0; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Your Requirement</p>
      <p style="margin: 8px 0 0; font-size: 14px; color: #2F2F2F; line-height: 1.5;">${requirement}</p>
    </div>
    <p style="font-size: 15px; line-height: 1.6; color: #555;">
      We typically respond within <strong>24 hours</strong>. A member of our team will contact you to discuss specifications, pricing, and timelines.
    </p>
  `);
  await sendMail(to, subject, html);
}

export async function sendOrderCreatedEmail(
  to: string,
  name: string,
  orderId: string,
  fabricType: string,
  meters: number,
) {
  const subject = `Your order ${orderId} has been created — FabricFlow`;
  const html = wrapper(`
    <h2 style="font-size: 22px; margin: 0 0 16px;">Hi ${name},</h2>
    <p style="font-size: 15px; line-height: 1.6; color: #555;">
      Great news! We've created your processing order. Here are the details:
    </p>
    <div style="background: #faf9f8; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #e5e5e5;">
      <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
        <tr><td style="padding: 6px 0; color: #888;">Order ID</td><td style="padding: 6px 0; font-weight: 600; text-align: right;"><code style="background: ${BRAND}15; color: ${BRAND}; padding: 3px 8px; border-radius: 4px;">${orderId}</code></td></tr>
        <tr><td style="padding: 6px 0; color: #888;">Fabric Type</td><td style="padding: 6px 0; text-align: right;">${fabricType}</td></tr>
        <tr><td style="padding: 6px 0; color: #888;">Volume</td><td style="padding: 6px 0; text-align: right;">${meters.toLocaleString()} meters</td></tr>
        <tr><td style="padding: 6px 0; color: #888;">Status</td><td style="padding: 6px 0; text-align: right; font-weight: 600; color: #2563eb;">Received</td></tr>
      </table>
    </div>
    <p style="font-size: 15px; line-height: 1.6; color: #555;">
      You can track your order status anytime using your Order ID at our <a href="https://fabricflow.com/tracking" style="color: ${BRAND}; text-decoration: none; font-weight: 600;">tracking page</a>.
    </p>
  `);
  await sendMail(to, subject, html);
}

export async function sendOrderStatusEmail(
  to: string,
  name: string,
  orderId: string,
  newStatus: string,
) {
  const subject = `Order ${orderId} status updated: ${newStatus} — FabricFlow`;
  const html = wrapper(`
    <h2 style="font-size: 22px; margin: 0 0 16px;">Hi ${name},</h2>
    <p style="font-size: 15px; line-height: 1.6; color: #555;">
      Your order <strong>${orderId}</strong> has been updated.
    </p>
    <div style="background: #faf9f8; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #e5e5e5; text-align: center;">
      <p style="margin: 0 0 8px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Current Status</p>
      <p style="margin: 0; font-size: 24px; font-weight: 700; color: ${BRAND};">${newStatus}</p>
    </div>
    <p style="font-size: 15px; line-height: 1.6; color: #555;">
      Track the full progress of your order on our <a href="https://fabricflow.com/tracking" style="color: ${BRAND}; text-decoration: none; font-weight: 600;">tracking page</a>.
    </p>
  `);
  await sendMail(to, subject, html);
}
