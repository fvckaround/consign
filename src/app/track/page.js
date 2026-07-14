"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Loader2, PackageX } from "lucide-react";
import TrackingResult from "@/components/TrackingResult";

function TrackContent() {
  const searchParams = useSearchParams();
  const [trackingId, setTrackingId] = useState(
    searchParams.get("id") || ""
  );
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (id) => {
    const value = (id || trackingId).trim();
    if (!value) {
      setError("Please enter a tracking ID.");
      return;
    }

    setLoading(true);
    setError("");
    setShipment(null);

    try {
      const res = await fetch(`/api/track/${encodeURIComponent(value)}`);
      const data = await res.json();

      if (data.success) {
        setShipment(data.shipment);
      } else {
        setError(data.error || "No shipment found with this tracking ID.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
            Track Order
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Where is my <span className="text-brand">shipment?</span>
          </h1>
          <p className="mt-4 text-[15px] text-ink/60 sm:text-base">
            Enter your tracking ID below (e.g. CDP48291736) to see real-time
            status and full shipment history.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-2.5 rounded-2xl border border-ink/10 bg-white px-4 py-3.5 shadow-sm focus-within:border-brand/50">
              <Search size={18} className="shrink-0 text-ink/40" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                placeholder="Enter tracking ID"
                className="w-full bg-transparent text-[15px] font-semibold uppercase outline-none placeholder:normal-case placeholder:text-ink/40"
              />
            </div>
            <button
              onClick={() => handleTrack()}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-2xl bg-ink px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Tracking...
                </>
              ) : (
                "Track"
              )}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-2xl bg-red-50 px-5 py-3.5 text-[14px] font-semibold text-red-600"
            >
              <PackageX size={17} className="shrink-0" />
              {error}
            </motion.div>
          )}
        </motion.div>

        {shipment && <TrackingResult shipment={shipment} />}
      </div>
    </section>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackContent />
    </Suspense>
  );
}