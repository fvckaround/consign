import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL =
  process.env.FROM_EMAIL || "ConsignDrop <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

const wrapper = (content) => `
  <div style="background:#FAF3EB;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;">
      <div style="background:#111111;padding:24px 32px;">
        <span style="color:#ffffff;font-size:20px;font-weight:800;">Consign<span style="color:#F26A1B;">Drop</span></span>
      </div>
      <div style="padding:32px;color:#111111;font-size:14.5px;line-height:1.7;">
        ${content}
      </div>
      <div style="padding:20px 32px;border-top:1px solid #f0e8dc;color:#999;font-size:12px;">
        ConsignDrop — Send More, Worry Less.
      </div>
    </div>
  </div>
`;

export async function sendEmail({ to, subject, html }) {
  if (!resend) {
    console.log("Resend not configured — skipping email:", subject);
    return { skipped: true };
  }
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: wrapper(html),
    });
    if (error) {
      console.error("Resend error:", error);
      return { error };
    }
    return { data };
  } catch (err) {
    console.error("Email send failed:", err);
    return { error: err };
  }
}

export async function notifyAdmin({ subject, html }) {
  if (!ADMIN_EMAIL) return { skipped: true };
  return sendEmail({ to: ADMIN_EMAIL, subject, html });
}