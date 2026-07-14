import mongoose from "mongoose";

const CheckpointSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    location: { type: String, default: "" },
    note: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ShipmentSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    // Sender
    senderName: { type: String, required: true },
    senderEmail: { type: String, default: "" },
    senderPhone: { type: String, default: "" },
    origin: { type: String, required: true },

    // Receiver
    receiverName: { type: String, required: true },
    receiverEmail: { type: String, default: "" },
    receiverPhone: { type: String, default: "" },
    destination: { type: String, required: true },

    // Package
    packageDescription: { type: String, default: "" },
    weight: { type: String, default: "" },
    quantity: { type: Number, default: 1 },
    shipmentType: {
      type: String,
      enum: [
        "Consignment",
        "Air Freight",
        "Sea Freight",
        "Warehousing",
        "Business Logistics",
        "Last-Mile Delivery",
      ],
      default: "Consignment",
    },

    // Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Picked Up",
        "In Transit",
        "Arrived at Facility",
        "Out for Delivery",
        "Delivered",
        "On Hold",
        "Cancelled",
      ],
      default: "Pending",
    },
    currentLocation: { type: String, default: "" },
    estimatedDelivery: { type: Date, default: null },

    checkpoints: { type: [CheckpointSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Shipment ||
  mongoose.model("Shipment", ShipmentSchema);