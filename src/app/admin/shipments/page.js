"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Loader2, Trash2 } from "lucide-react";

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

export default function AdminShipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const load = async () => {
    const res = await fetch("/api/shipments");
    const data = await res.json();
    if (data.success) setShipments(data.shipments);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id, trackingId) => {
    if (!confirm(`Delete shipment ${trackingId}? This cannot be undone.`)) return;
    const res = await fetch(`/api/shipments/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) setShipments((prev) => prev.filter((s) => s._id !== id));
  };

  const filtered = shipments.filter((s) => {
    const matchesFilter = filter === "All" || s.status === filter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      s.trackingId.toLowerCase().includes(q) ||
      s.senderName.toLowerCase().includes(q) ||
      s.receiverName.toLowerCase().includes(q) ||
      s.origin.toLowerCase().includes(q) ||
      s.destination.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const statuses = ["All", "Pending", "Picked Up", "In Transit", "Arrived at Facility", "Out for Delivery", "Delivered", "On Hold", "Cancelled"];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Shipments
          </h1>
          <p className="mt-1 text-[14.5px] text-ink/55">
            {shipments.length} total · {filtered.length} shown
          </p>
        </div>
        <Link
          href="/admin/shipments/new"
          className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-bold text-white transition hover:bg-brand"
        >
          <Plus size={17} /> New Shipment
        </Link>
      </div>

      {/* Search + filter */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2.5 rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-sm focus-within:border-brand/50">
          <Search size={17} className="shrink-0 text-ink/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tracking ID, name, route..."
            className="w-full bg-transparent text-[14.5px] font-medium outline-none placeholder:text-ink/40"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[14.5px] font-semibold shadow-sm outline-none"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 rounded-3xl border border-ink/5 bg-white p-6 shadow-sm">
        {filtered.length === 0 ? (
          <p className="text-[14.5px] text-ink/55">No shipments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-ink/8 text-[12.5px] font-extrabold uppercase tracking-wider text-ink/45">
                  <th className="pb-3 pr-4">Tracking ID</th>
                  <th className="pb-3 pr-4">Route</th>
                  <th className="pb-3 pr-4">Sender</th>
                  <th className="pb-3 pr-4">Receiver</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Created</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s._id} className="border-b border-ink/5 last:border-0">
                    <td className="py-4 pr-4">
                      <Link
                        href={`/admin/shipments/${s._id}`}
                        className="font-extrabold text-brand hover:underline"
                      >
                        {s.trackingId}
                      </Link>
                    </td>
                    <td className="py-4 pr-4 text-[14px] font-medium">
                      {s.origin} → {s.destination}
                    </td>
                    <td className="py-4 pr-4 text-[14px] font-medium">{s.senderName}</td>
                    <td className="py-4 pr-4 text-[14px] font-medium">{s.receiverName}</td>
                    <td className="py-4 pr-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-extrabold ${
                          statusColors[s.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-[13.5px] font-medium text-ink/55">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleDelete(s._id, s.trackingId)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-ink/40 transition hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete shipment"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}