"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Save, Trash2, Plus, ArrowLeft, ExternalLink } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[14.5px] font-medium shadow-sm outline-none transition placeholder:text-ink/40 focus:border-brand/50";

const shipmentTypes = ["Consignment", "Air Freight", "Sea Freight", "Warehousing", "Business Logistics", "Last-Mile Delivery"];
const statuses = ["Pending", "Picked Up", "In Transit", "Arrived at Facility", "Out for Delivery", "Delivered", "On Hold", "Cancelled"];

export default function ShipmentDetail({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [form, setForm] = useState(null);
  const [checkpoints, setCheckpoints] = useState([]);
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [cp, setCp] = useState({ status: "", location: "", note: "" });
  const [addingCp, setAddingCp] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/shipments/${id}`);
      const data = await res.json();
      if (data.success) {
        const s = data.shipment;
        setTrackingId(s.trackingId);
        setCheckpoints(s.checkpoints || []);
        setForm({
          senderName: s.senderName, senderEmail: s.senderEmail, senderPhone: s.senderPhone, origin: s.origin,
          receiverName: s.receiverName, receiverEmail: s.receiverEmail, receiverPhone: s.receiverPhone, destination: s.destination,
          packageDescription: s.packageDescription, weight: s.weight, quantity: s.quantity,
          shipmentType: s.shipmentType, status: s.status, currentLocation: s.currentLocation,
          estimatedDelivery: s.estimatedDelivery ? s.estimatedDelivery.slice(0, 10) : "",
        });
      } else {
        setError("Shipment not found.");
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (extra = {}) => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch(`/api/shipments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity) || 1,
          estimatedDelivery: form.estimatedDelivery || null,
          ...extra,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCheckpoints(data.shipment.checkpoints || []);
        setForm((f) => ({ ...f, status: data.shipment.status }));
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        setError(data.error || "Failed to save.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddCheckpoint = async () => {
    if (!cp.status) return;
    setAddingCp(true);
    await handleSave({
      addCheckpoint: cp,
      status: cp.status,
      currentLocation: cp.location || form.currentLocation,
    });
    setCp({ status: "", location: "", note: "" });
    setAddingCp(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete shipment ${trackingId}? This cannot be undone.`)) return;
    const res = await fetch(`/api/shipments/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) router.push("/admin/shipments");
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand" />
      </div>
    );
  }

  if (!form) {
    return <p className="text-[15px] font-semibold text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/shipments"
        className="mb-5 flex w-fit items-center gap-1.5 text-[13.5px] font-bold text-ink/55 transition hover:text-brand"
      >
        <ArrowLeft size={15} /> Back to Shipments
      </Link>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-brand">
            {trackingId}
          </h1>
          <a
            href={`/track?id=${trackingId}`}
            target="_blank"
            className="mt-1 flex w-fit items-center gap-1.5 text-[13.5px] font-bold text-ink/55 transition hover:text-brand"
          >
            View public tracking <ExternalLink size={13} />
          </a>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-[13.5px] font-bold text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={15} /> Delete
        </button>
      </div>

      <div className="mt-8 space-y-5">
        {/* Status quick section */}
        <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-[13px] font-extrabold uppercase tracking-wider text-ink/50">
            Status & Delivery
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <select className={inputCls} value={form.status} onChange={set("status")}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input className={inputCls} placeholder="Current location" value={form.currentLocation} onChange={set("currentLocation")} />
            <input className={inputCls} type="date" value={form.estimatedDelivery} onChange={set("estimatedDelivery")} />
          </div>
          <p className="mt-3 text-[12.5px] font-medium text-ink/45">
            Changing the status automatically adds a checkpoint and emails the sender & receiver (if emails are set).
          </p>
        </div>

        {/* Sender / receiver */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-4 text-[13px] font-extrabold uppercase tracking-wider text-ink/50">Sender</h2>
            <div className="space-y-4">
              <input className={inputCls} placeholder="Sender name *" value={form.senderName} onChange={set("senderName")} />
              <input className={inputCls} type="email" placeholder="Sender email" value={form.senderEmail} onChange={set("senderEmail")} />
              <input className={inputCls} placeholder="Sender phone" value={form.senderPhone} onChange={set("senderPhone")} />
              <input className={inputCls} placeholder="Origin *" value={form.origin} onChange={set("origin")} />
            </div>
          </div>
          <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-4 text-[13px] font-extrabold uppercase tracking-wider text-ink/50">Receiver</h2>
            <div className="space-y-4">
              <input className={inputCls} placeholder="Receiver name *" value={form.receiverName} onChange={set("receiverName")} />
              <input className={inputCls} type="email" placeholder="Receiver email" value={form.receiverEmail} onChange={set("receiverEmail")} />
              <input className={inputCls} placeholder="Receiver phone" value={form.receiverPhone} onChange={set("receiverPhone")} />
              <input className={inputCls} placeholder="Destination *" value={form.destination} onChange={set("destination")} />
            </div>
          </div>
        </div>

        {/* Package */}
        <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-[13px] font-extrabold uppercase tracking-wider text-ink/50">Package</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input className={`${inputCls} sm:col-span-3`} placeholder="Package description" value={form.packageDescription} onChange={set("packageDescription")} />
            <input className={inputCls} placeholder="Weight" value={form.weight} onChange={set("weight")} />
            <input className={inputCls} type="number" min="1" placeholder="Quantity" value={form.quantity} onChange={set("quantity")} />
            <select className={inputCls} value={form.shipmentType} onChange={set("shipmentType")}>
              {shipmentTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {error && (
          <p className="rounded-2xl bg-red-50 px-5 py-3 text-[14px] font-semibold text-red-600">{error}</p>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand disabled:opacity-60"
          >
            {saving ? (
              <><Loader2 size={17} className="animate-spin" /> Saving...</>
            ) : (
              <><Save size={17} /> Save Changes</>
            )}
          </button>
          {saved && (
            <span className="text-[14px] font-bold text-green-600">Saved ✓</span>
          )}
        </div>

        {/* Checkpoints */}
        <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-[13px] font-extrabold uppercase tracking-wider text-ink/50">
            Add Checkpoint
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <select
              className={inputCls}
              value={cp.status}
              onChange={(e) => setCp((c) => ({ ...c, status: e.target.value }))}
            >
              <option value="">Select status *</option>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input
              className={inputCls}
              placeholder="Location"
              value={cp.location}
              onChange={(e) => setCp((c) => ({ ...c, location: e.target.value }))}
            />
            <input
              className={inputCls}
              placeholder="Note (optional)"
              value={cp.note}
              onChange={(e) => setCp((c) => ({ ...c, note: e.target.value }))}
            />
          </div>
          <button
            onClick={handleAddCheckpoint}
            disabled={addingCp || !cp.status}
            className="mt-4 flex items-center gap-2 rounded-full border border-ink/10 bg-cream px-6 py-3 text-[14px] font-bold transition hover:border-brand/40 disabled:opacity-50"
          >
            {addingCp ? (
              <><Loader2 size={16} className="animate-spin" /> Adding...</>
            ) : (
              <><Plus size={16} /> Add Checkpoint</>
            )}
          </button>

          {/* Timeline */}
          <div className="mt-8 space-y-0">
            {[...checkpoints].reverse().map((c, i, arr) => (
              <div key={c._id || i} className="relative flex gap-4 pb-6 last:pb-0">
                {i < arr.length - 1 && (
                  <span className="absolute left-[7px] top-5 h-full w-0.5 bg-ink/10" />
                )}
                <span
                  className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full ${
                    i === 0 ? "bg-brand" : "bg-ink/20"
                  }`}
                />
                <div>
                  <p className="text-[14.5px] font-extrabold">{c.status}</p>
                  {(c.location || c.note) && (
                    <p className="text-[13px] font-medium text-ink/55">
                      {[c.location, c.note].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="mt-0.5 text-[12px] font-medium text-ink/40">
                    {new Date(c.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}