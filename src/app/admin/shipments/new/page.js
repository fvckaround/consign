"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[14.5px] font-medium shadow-sm outline-none transition placeholder:text-ink/40 focus:border-brand/50";

const shipmentTypes = ["Consignment", "Air Freight", "Sea Freight", "Warehousing", "Business Logistics", "Last-Mile Delivery"];
const statuses = ["Pending", "Picked Up", "In Transit", "Arrived at Facility", "Out for Delivery", "Delivered", "On Hold", "Cancelled"];

export default function NewShipment() {
  const router = useRouter();
  const [form, setForm] = useState({
    senderName: "", senderEmail: "", senderPhone: "", origin: "",
    receiverName: "", receiverEmail: "", receiverPhone: "", destination: "",
    packageDescription: "", weight: "", quantity: 1,
    shipmentType: "Consignment", status: "Pending",
    currentLocation: "", estimatedDelivery: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.senderName || !form.origin || !form.receiverName || !form.destination) {
      setError("Sender name, origin, receiver name and destination are required.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity) || 1,
          estimatedDelivery: form.estimatedDelivery || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/admin/shipments/${data.shipment._id}`);
      } else {
        setError(data.error || "Failed to create shipment.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  const Section = ({ title, children }) => (
    <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-4 text-[13px] font-extrabold uppercase tracking-wider text-ink/50">
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        New Shipment
      </h1>
      <p className="mt-1 text-[14.5px] text-ink/55">
        A tracking ID (CDP########) is generated automatically on save.
      </p>

      <div className="mt-8 space-y-5">
        <Section title="Sender">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input className={inputCls} placeholder="Sender name *" value={form.senderName} onChange={set("senderName")} />
            <input className={inputCls} type="email" placeholder="Sender email" value={form.senderEmail} onChange={set("senderEmail")} />
            <input className={inputCls} placeholder="Sender phone" value={form.senderPhone} onChange={set("senderPhone")} />
            <input className={inputCls} placeholder="Origin (City, Country) *" value={form.origin} onChange={set("origin")} />
          </div>
        </Section>

        <Section title="Receiver">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input className={inputCls} placeholder="Receiver name *" value={form.receiverName} onChange={set("receiverName")} />
            <input className={inputCls} type="email" placeholder="Receiver email" value={form.receiverEmail} onChange={set("receiverEmail")} />
            <input className={inputCls} placeholder="Receiver phone" value={form.receiverPhone} onChange={set("receiverPhone")} />
            <input className={inputCls} placeholder="Destination (City, Country) *" value={form.destination} onChange={set("destination")} />
          </div>
        </Section>

        <Section title="Package">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input className={`${inputCls} sm:col-span-3`} placeholder="Package description" value={form.packageDescription} onChange={set("packageDescription")} />
            <input className={inputCls} placeholder="Weight (e.g. 12kg)" value={form.weight} onChange={set("weight")} />
            <input className={inputCls} type="number" min="1" placeholder="Quantity" value={form.quantity} onChange={set("quantity")} />
            <select className={inputCls} value={form.shipmentType} onChange={set("shipmentType")}>
              {shipmentTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </Section>

        <Section title="Status & Delivery">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <select className={inputCls} value={form.status} onChange={set("status")}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input className={inputCls} placeholder="Current location" value={form.currentLocation} onChange={set("currentLocation")} />
            <input className={inputCls} type="date" value={form.estimatedDelivery} onChange={set("estimatedDelivery")} />
          </div>
        </Section>

        {error && (
          <p className="rounded-2xl bg-red-50 px-5 py-3 text-[14px] font-semibold text-red-600">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand disabled:opacity-60"
        >
          {loading ? (
            <><Loader2 size={17} className="animate-spin" /> Creating...</>
          ) : (
            <><Save size={17} /> Create Shipment</>
          )}
        </button>
      </div>
    </div>
  );
}