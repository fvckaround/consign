import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Shipment from "@/models/Shipment";

export async function GET(request, { params }) {
  try {
    const { trackingId } = await params;

    if (!trackingId) {
      return NextResponse.json(
        { success: false, error: "Tracking ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const cleanId = trackingId.trim().toUpperCase().replace(/^#/, "");

    const shipment = await Shipment.findOne({ trackingId: cleanId }).lean();

    if (!shipment) {
      return NextResponse.json(
        { success: false, error: "No shipment found with this tracking ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, shipment });
  } catch (error) {
    console.error("Track API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}