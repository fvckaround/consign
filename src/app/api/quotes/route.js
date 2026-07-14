import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Quote from "@/models/Quote";
import { sendEmail, notifyAdmin } from "@/lib/email";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, origin, destination } = body;

    if (!name || !email || !origin || !destination) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    await connectDB();

    const quote = await Quote.create({
      name,
      email,
      phone: body.phone || "",
      origin,
      destination,
      shipmentType: body.shipmentType || "Consignment",
      weight: body.weight || "",
      quantity: body.quantity || 1,
      details: body.details || "",
    });

    // Confirmation to customer
    sendEmail({
      to: email,
      subject: "We received your quote request — ConsignDrop",
      html: `
        <h2 style="margin:0 0 12px;">Hi ${name},</h2>
        <p>Thanks for requesting a quote with <strong>ConsignDrop</strong>. Our team is reviewing your request and will get back to you shortly.</p>
        <div style="background:#FAF3EB;border-radius:14px;padding:18px 20px;margin:18px 0;">
          <p style="margin:0 0 6px;"><strong>Route:</strong> ${origin} → ${destination}</p>
          <p style="margin:0 0 6px;"><strong>Service:</strong> ${quote.shipmentType}</p>
          ${quote.weight ? `<p style="margin:0 0 6px;"><strong>Weight:</strong> ${quote.weight}</p>` : ""}
          <p style="margin:0;"><strong>Quantity:</strong> ${quote.quantity}</p>
        </div>
        <p>We usually respond within a few hours.</p>
      `,
    });

    // Notify admin
    notifyAdmin({
      subject: `New quote request from ${name}`,
      html: `
        <h2 style="margin:0 0 12px;">New Quote Request</h2>
        <p><strong>Name:</strong> ${name}<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Phone:</strong> ${body.phone || "—"}<br/>
        <strong>Route:</strong> ${origin} → ${destination}<br/>
        <strong>Service:</strong> ${quote.shipmentType}<br/>
        <strong>Weight:</strong> ${quote.weight || "—"}<br/>
        <strong>Quantity:</strong> ${quote.quantity}</p>
        ${body.details ? `<p><strong>Details:</strong><br/>${body.details}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true, quote });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const quotes = await Quote.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, quotes });
  } catch (error) {
    console.error("Quotes GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}