import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },

    origin: { type: String, required: true },
    destination: { type: String, required: true },
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
    weight: { type: String, default: "" },
    quantity: { type: Number, default: 1 },
    details: { type: String, default: "" },

    status: {
      type: String,
      enum: ["New", "Responded", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);