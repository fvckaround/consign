import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Shipment from "@/models/Shipment";
import { sendEmail } from "@/lib/email";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();
    const shipment = await Shipment.findById(id).lean();
    if (!shipment) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, shipment });
  } catch (error) {
    console.error("Shipment GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    const shipment = await Shipment.findById(id);
    if (!shipment) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const statusChanged = body.status && body.status !== shipment.status;

    // Update editable fields
    const fields = [
      "senderName", "senderEmail", "senderPhone", "origin",
      "receiverName", "receiverEmail", "receiverPhone", "destination",
      "packageDescription", "weight", "quantity", "shipmentType",
      "status", "currentLocation", "estimatedDelivery",
    ];
    fields.forEach((f) => {
      if (body[f] !== undefined) shipment[f] = body[f];
    });

    // Add a checkpoint if requested (or auto on status change)
    if (body.addCheckpoint) {
      shipment.checkpoints.push({
        status: body.addCheckpoint.status || shipment.status,
        location: body.addCheckpoint.location || shipment.currentLocation || "",
        note: body.addCheckpoint.note || "",
        date: body.addCheckpoint.date ? new Date(body.addCheckpoint.date) : new Date(),
      });
    } else if (statusChanged) {
      shipment.checkpoints.push({
        status: body.status,
        location: shipment.currentLocation || "",
        note: "",
        date: new Date(),
      });
    }

    await shipment.save();

    // Email on status change
    if (statusChanged) {
      const html = (name) => `
        <h2 style="margin:0 0 12px;">Hi ${name},</h2>
        <p>Your shipment <strong style="color:#F26A1B;">${shipment.trackingId}</strong> has a new update:</p>
        <div style="background:#FAF3EB;border-radius:14px;padding:18px 20px;margin:18px 0;">
          <p style="margin:0 0 6px;"><strong>Status:</strong> ${shipment.status}</p>
          ${shipment.currentLocation ? `<p style="margin:0 0 6px;"><strong>Location:</strong> ${shipment.currentLocation}</p>` : ""}
          <p style="margin:0;"><strong>Route:</strong> ${shipment.origin} → ${shipment.destination}</p>
        </div>
        <p>Track it anytime at consigndrop.com/track</p>
      `;

      if (shipment.senderEmail) {
        await sendEmail({
          to: shipment.senderEmail,
          subject: `Shipment update: ${shipment.status} — ${shipment.trackingId}`,
          html: html(shipment.senderName),
        });
      }
      if (shipment.receiverEmail) {
        await sendEmail({
          to: shipment.receiverEmail,
          subject: `Shipment update: ${shipment.status} — ${shipment.trackingId}`,
          html: html(shipment.receiverName),
        });
      }
    }

    return NextResponse.json({ success: true, shipment });
  } catch (error) {
    console.error("Shipment PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();
    await Shipment.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Shipment DELETE error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}