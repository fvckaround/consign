"use client";

import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  User,
  Calendar,
  CheckCircle2,
  Circle,
  Truck,
  AlertTriangle,
  Phone,
  Mail,
} from "lucide-react";

const statusColors = {
  Pending: "bg-amber-100 text-amber-700",
  "Picked Up": "bg-blue-100 text-blue-700",
  "In Transit": "bg-indigo-100 text-indigo-700",
  "Arrived at Facility": "bg-purple-100 text-purple-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  "On Hold": "bg-red-100 text-red-700",
  Cancelled: "bg-gray-200 text-gray-600",
};

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TrackingResult({ shipment }) {
  const checkpoints = [...(shipment.checkpoints || [])].reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-10 max-w-3xl"
    >
      {/* On Hold alert */}
      {shipment.status === "On Hold" && (
        <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-100">
              <AlertTriangle size={22} className="text-red-600" />
            </div>
            <div>
              <p className="text-[15.5px] font-extrabold text-red-700">
                Action required — shipment on hold
              </p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-red-800/80">
                This shipment has been placed on hold. Please contact our
                support team as soon as possible for further information
                regarding this hold and the next steps to release your
                shipment.
              </p>
              <div className="mt-3 flex flex-col gap-2 text-[13.5px] font-bold text-red-700 sm:flex-row sm:gap-5">
                <a
                  href="mailto:support@consigndrop.com"
                  className="flex items-center gap-2 transition hover:text-red-900"
                >
                  <Mail size={15} /> support@consigndrop.com
                </a>
                <a
                  href="tel:18001234567"
                  className="flex items-center gap-2 transition hover:text-red-900"
                >
                  <Phone size={15} /> 1800-123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header card */}
      <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wider text-ink/50">
              Tracking ID
            </p>
            <p className="mt-1 font-heading text-2xl font-bold tracking-tight">
              {shipment.trackingId}
            </p>
          </div>
          <span
            className={`rounded-full px-4 py-1.5 text-[13px] font-extrabold ${
              statusColors[shipment.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {shipment.status}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl bg-cream p-4">
            <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
            <div>
              <p className="text-[12.5px] font-semibold text-ink/50">Route</p>
              <p className="mt-0.5 text-[14.5px] font-bold">
                {shipment.origin} → {shipment.destination}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-cream p-4">
            <Truck size={18} className="mt-0.5 shrink-0 text-brand" />
            <div>
              <p className="text-[12.5px] font-semibold text-ink/50">
                Current Location
              </p>
              <p className="mt-0.5 text-[14.5px] font-bold">
                {shipment.currentLocation || "—"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-cream p-4">
            <User size={18} className="mt-0.5 shrink-0 text-brand" />
            <div>
              <p className="text-[12.5px] font-semibold text-ink/50">
                Receiver
              </p>
              <p className="mt-0.5 text-[14.5px] font-bold">
                {shipment.receiverName}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-cream p-4">
            <Calendar size={18} className="mt-0.5 shrink-0 text-brand" />
            <div>
              <p className="text-[12.5px] font-semibold text-ink/50">
                Estimated Delivery
              </p>
              <p className="mt-0.5 text-[14.5px] font-bold">
                {shipment.estimatedDelivery
                  ? new Date(shipment.estimatedDelivery).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )
                  : "To be confirmed"}
              </p>
            </div>
          </div>
        </div>

        {shipment.packageDescription && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-cream p-4">
            <Package size={18} className="mt-0.5 shrink-0 text-brand" />
            <div>
              <p className="text-[12.5px] font-semibold text-ink/50">
                Package
              </p>
              <p className="mt-0.5 text-[14.5px] font-bold">
                {shipment.packageDescription}
                {shipment.weight ? ` · ${shipment.weight}` : ""}
                {shipment.quantity > 1 ? ` · Qty: ${shipment.quantity}` : ""}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="mt-6 rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="font-heading text-xl font-bold">Shipment History</h3>

        {checkpoints.length === 0 ? (
          <p className="mt-4 text-[14.5px] text-ink/60">
            No updates yet. Check back soon.
          </p>
        ) : (
          <div className="mt-6 space-y-0">
            {checkpoints.map((cp, i) => (
              <div key={cp._id || i} className="relative flex gap-4 pb-8 last:pb-0">
                {i < checkpoints.length - 1 && (
                  <span className="absolute left-[11px] top-7 h-full w-0.5 bg-ink/10" />
                )}
                {i === 0 ? (
                  <CheckCircle2
                    size={24}
                    className="relative z-10 shrink-0 text-brand"
                  />
                ) : (
                  <Circle
                    size={24}
                    className="relative z-10 shrink-0 text-ink/25"
                  />
                )}
                <div className="-mt-0.5">
                  <p
                    className={`text-[15px] font-extrabold ${
                      i === 0 ? "text-ink" : "text-ink/70"
                    }`}
                  >
                    {cp.status}
                  </p>
                  {cp.location && (
                    <p className="mt-0.5 text-[13.5px] font-medium text-ink/55">
                      {cp.location}
                    </p>
                  )}
                  {cp.note && (
                    <p className="mt-0.5 text-[13.5px] text-ink/55">{cp.note}</p>
                  )}
                  <p className="mt-1 text-[12.5px] font-medium text-ink/40">
                    {formatDate(cp.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}