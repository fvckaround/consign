"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  MapPin,
  Package,
  User,
} from "lucide-react";

const shipmentTypes = [
  "Consignment",
  "Air Freight",
  "Sea Freight",
  "Warehousing",
  "Business Logistics",
  "Last-Mile Delivery",
];

const inputCls =
  "w-full rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-[15px] font-medium shadow-sm outline-none transition placeholder:text-ink/40 focus:border-brand/50";

function QuoteContent() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    origin: searchParams.get("from") || "",
    destination: searchParams.get("to") || "",
    shipmentType: "Consignment",
    weight: "",
    quantity: 1,
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.origin || !form.destination) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            Quote request <span className="text-brand">sent!</span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/60">
            Thanks, {form.name.split(" ")[0]}. Our team is reviewing your
            request and will get back to you at <strong>{form.email}</strong>{" "}
            shortly.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setForm({
                name: "",
                email: "",
                phone: "",
                origin: "",
                destination: "",
                shipmentType: "Consignment",
                weight: "",
                quantity: 1,
                details: "",
              });
            }}
            className="mt-8 rounded-full bg-ink px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand"
          >
            Request Another Quote
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
            Get a Quote
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Tell us what you&apos;re <span className="text-brand">shipping.</span>
          </h1>
          <p className="mt-4 text-[15px] text-ink/60 sm:text-base">
            Fill in the details below and we&apos;ll send you a tailored quote —
            fast.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-10 rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-10"
        >
          {/* Contact */}
          <div className="mb-2 flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wider text-ink/50">
            <User size={15} /> Your Details
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input className={inputCls} placeholder="Full name *" value={form.name} onChange={set("name")} />
            <input className={inputCls} type="email" placeholder="Email address *" value={form.email} onChange={set("email")} />
            <input className={`${inputCls} sm:col-span-2`} placeholder="Phone number (optional)" value={form.phone} onChange={set("phone")} />
          </div>

          {/* Route */}
          <div className="mb-2 mt-8 flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wider text-ink/50">
            <MapPin size={15} /> Route
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input className={inputCls} placeholder="From (City / Postal code) *" value={form.origin} onChange={set("origin")} />
            <input className={inputCls} placeholder="To (City / Postal code) *" value={form.destination} onChange={set("destination")} />
          </div>

          {/* Package */}
          <div className="mb-2 mt-8 flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wider text-ink/50">
            <Package size={15} /> Shipment
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <select
              className={inputCls}
              value={form.shipmentType}
              onChange={set("shipmentType")}
            >
              {shipmentTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input className={inputCls} placeholder="Weight (e.g. 12kg)" value={form.weight} onChange={set("weight")} />
            <input
              className={inputCls}
              type="number"
              min="1"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm((f) => ({ ...f, quantity: Number(e.target.value) || 1 }))
              }
            />
          </div>
          <textarea
            className={`${inputCls} mt-4 min-h-[120px] resize-y`}
            placeholder="Additional details (fragile items, deadlines, special handling...)"
            value={form.details}
            onChange={set("details")}
          />

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 px-5 py-3 text-[14px] font-semibold text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand disabled:opacity-60 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send size={17} /> Request Quote
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default function GetQuotePage() {
  return (
    <Suspense fallback={null}>
      <QuoteContent />
    </Suspense>
  );
}