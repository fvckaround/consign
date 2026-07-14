import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { to, subject, message } = body;

    if (!to || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Recipient, subject and message are required." },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      to,
      subject,
      html: `<div style="white-space:pre-wrap;">${message}</div>`,
    });

    if (result.skipped) {
      return NextResponse.json(
        { success: false, error: "Resend is not configured yet. Add RESEND_API_KEY to your environment." },
        { status: 500 }
      );
    }

    if (result.error) {
      return NextResponse.json(
        { success: false, error: "Failed to send email. Check your Resend configuration." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin email error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}