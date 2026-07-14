"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  FileText,
  Mail,
  Plus,
  ArrowRight,
  Loader2,
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

export default function AdminDashboard() {
  const [shipments, setShipments] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, q, m] = await Promise.all([
          fetch("/api/shipments").then((r) => r.json()),
          fetch("/api/quotes").then((r) => r.json()),
          fetch("/api/messages").then((r) => r.json()),
        ]);
        if (s.success) setShipments(s.shipments);
        if (q.success) setQuotes(q.quotes);
        if (m.success) setMessages(m.messages);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const active = shipments.filter(
    (s) => !["Delivered", "Cancelled"].includes(s.status)
  ).length;
  const delivered = shipments.filter((s) => s.status === "Delivered").length;
  const newQuotes = quotes.filter((q) => q.status === "New").length;
  const newMessages = messages.filter((m) => m.status === "New").length;

  const stats = [
    { icon: Package, label: "Total Shipments", value: shipments.length, href: "/admin/shipments" },
    { icon: Truck, label: "Active Shipments", value: active, href: "/admin/shipments" },
    { icon: CheckCircle2, label: "Delivered", value: delivered, href: "/admin/shipments" },
    { icon: FileText, label: "New Quotes", value: newQuotes, href: "/admin/quotes" },
    { icon: Mail, label: "New Messages", value: newMessages, href: "/admin/messages" },
  ];

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
            Dashboard
          </h1>
          <p className="mt-1 text-[14.5px] text-ink/55">
            Overview of everything happening on ConsignDrop.
          </p>
        </div>
        <Link
          href="/admin/shipments/new"
          className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-bold text-white transition hover:bg-brand"
        >
          <Plus size={17} /> New Shipment
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream">
              <s.icon size={21} className="text-brand" strokeWidth={2} />
            </div>
            <p className="mt-4 font-heading text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-[13px] font-semibold text-ink/55">
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent shipments */}
      <div className="mt-10 rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold">Recent Shipments</h2>
          <Link
            href="/admin/shipments"
            className="flex items-center gap-1.5 text-[13.5px] font-bold text-brand"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {shipments.length === 0 ? (
          <p className="mt-5 text-[14.5px] text-ink/55">
            No shipments yet. Create your first one.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-ink/8 text-[12.5px] font-extrabold uppercase tracking-wider text-ink/45">
                  <th className="pb-3 pr-4">Tracking ID</th>
                  <th className="pb-3 pr-4">Route</th>
                  <th className="pb-3 pr-4">Receiver</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {shipments.slice(0, 6).map((s) => (
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
                    <td className="py-4 pr-4 text-[14px] font-medium">
                      {s.receiverName}
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-extrabold ${
                          statusColors[s.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 text-[13.5px] font-medium text-ink/55">
                      {new Date(s.createdAt).toLocaleDateString()}
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