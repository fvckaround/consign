import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";
import { sendEmail, notifyAdmin } from "@/lib/email";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    await connectDB();

    const msg = await Message.create({
      name,
      email,
      phone: body.phone || "",
      subject: body.subject || "",
      message,
    });

    sendEmail({
      to: email,
      subject: "We received your message — ConsignDrop",
      html: `
        <h2 style="margin:0 0 12px;">Hi ${name},</h2>
        <p>Thanks for contacting <strong>ConsignDrop</strong>. We've received your message and our support team will reply as soon as possible.</p>
        <div style="background:#FAF3EB;border-radius:14px;padding:18px 20px;margin:18px 0;">
          ${msg.subject ? `<p style="margin:0 0 6px;"><strong>Subject:</strong> ${msg.subject}</p>` : ""}
          <p style="margin:0;white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    notifyAdmin({
      subject: `New contact message from ${name}`,
      html: `
        <h2 style="margin:0 0 12px;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Phone:</strong> ${body.phone || "—"}<br/>
        ${msg.subject ? `<strong>Subject:</strong> ${msg.subject}<br/>` : ""}</p>
        <p style="white-space:pre-wrap;">${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}