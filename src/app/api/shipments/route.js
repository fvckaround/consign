import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Shipment from "@/models/Shipment";
import { sendEmail } from "@/lib/email";

function generateTrackingId() {
  const digits = Math.floor(10000000 + Math.random() * 90000000);
  return `CDP${digits}`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const shipments = await Shipment.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, shipments });
  } catch (error) {
    console.error("Shipments GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch shipments" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { senderName, origin, receiverName, destination } = body;

    if (!senderName || !origin || !receiverName || !destination) {
      return NextResponse.json(
        { success: false, error: "Sender, receiver, origin and destination are required." },
        { status: 400 }
      );
    }

    await connectDB();

    // Ensure unique tracking ID
    let trackingId = generateTrackingId();
    while (await Shipment.exists({ trackingId })) {
      trackingId = generateTrackingId();
    }

    const shipment = await Shipment.create({
      trackingId,
      senderName,
      senderEmail: body.senderEmail || "",
      senderPhone: body.senderPhone || "",
      origin,
      receiverName,
      receiverEmail: body.receiverEmail || "",
      receiverPhone: body.receiverPhone || "",
      destination,
      packageDescription: body.packageDescription || "",
      weight: body.weight || "",
      quantity: body.quantity || 1,
      shipmentType: body.shipmentType || "Consignment",
      status: body.status || "Pending",
      currentLocation: body.currentLocation || origin,
      estimatedDelivery: body.estimatedDelivery || null,
      checkpoints: [
        {
          status: body.status || "Pending",
          location: body.currentLocation || origin,
          note: "Shipment created",
          date: new Date(),
        },
      ],
    });

    // Notify sender & receiver (if emails provided)
    const trackingHtml = (name) => `
      <h2 style="margin:0 0 12px;">Hi ${name},</h2>
      <p>A shipment has been booked with <strong>ConsignDrop</strong>.</p>
      <div style="background:#FAF3EB;border-radius:14px;padding:18px 20px;margin:18px 0;">
        <p style="margin:0 0 6px;"><strong>Tracking ID:</strong> <span style="color:#F26A1B;font-weight:800;">${trackingId}</span></p>
        <p style="margin:0 0 6px;"><strong>Route:</strong> ${origin} → ${destination}</p>
        <p style="margin:0;"><strong>Status:</strong> ${shipment.status}</p>
      </div>
      <p>Track it anytime at consigndrop.com/track</p>
    `;

    if (shipment.senderEmail) {
      await sendEmail({
        to: shipment.senderEmail,
        subject: `Shipment booked — ${trackingId}`,
        html: trackingHtml(senderName),
      });
    }
    if (shipment.receiverEmail) {
      await sendEmail({
        to: shipment.receiverEmail,
        subject: `A shipment is on its way to you — ${trackingId}`,
        html: trackingHtml(receiverName),
      });
    }

    return NextResponse.json({ success: true, shipment });
  } catch (error) {
    console.error("Shipments POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create shipment" },
      { status: 500 }
    );
  }
}