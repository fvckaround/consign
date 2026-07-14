"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Mail, Phone } from "lucide-react";

const statusColors = {
  New: "bg-amber-100 text-amber-700",
  Responded: "bg-blue-100 text-blue-700",
  Closed: "bg-gray-200 text-gray-600",
};

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/quotes")
      .then((r) => r.json())
      .then((d) => d.success && setQuotes(d.quotes))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      setQuotes((prev) => prev.map((q) => (q._id === id ? { ...q, status } : q)));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this quote request?")) return;
    const res = await fetch(`/api/quotes/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) setQuotes((prev) => prev.filter((q) => q._id !== id));
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold tracking-tight">Quotes</h1>
      <p className="mt-1 text-[14.5px] text-ink/55">
        {quotes.length} quote request{quotes.length !== 1 && "s"}
      </p>

      {quotes.length === 0 ? (
        <p className="mt-8 text-[14.5px] text-ink/55">No quote requests yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {quotes.map((q) => (
            <div key={q._id} className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[16px] font-extrabold">{q.name}</p>
                  <div className="mt-1.5 space-y-1 text-[13.5px] font-medium text-ink/60">
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-brand" />
                      <a href={`mailto:${q.email}`} className="hover:text-brand">{q.email}</a>
                    </p>
                    {q.phone && (
                      <p className="flex items-center gap-2">
                        <Phone size={14} className="text-brand" /> {q.phone}
                      </p>
                    )}
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-extrabold ${statusColors[q.status]}`}>
                  {q.status}
                </span>
              </div>

              <div className="mt-4 rounded-2xl bg-cream p-4 text-[13.5px] font-medium">
                <p><strong>Route:</strong> {q.origin} → {q.destination}</p>
                <p className="mt-1"><strong>Service:</strong> {q.shipmentType}</p>
                <p className="mt-1">
                  <strong>Weight:</strong> {q.weight || "—"} · <strong>Qty:</strong> {q.quantity}
                </p>
                {q.details && (
                  <p className="mt-2 whitespace-pre-wrap text-ink/70">{q.details}</p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <select
                  value={q.status}
                  onChange={(e) => updateStatus(q._id, e.target.value)}
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-[13.5px] font-bold shadow-sm outline-none"
                >
                  <option value="New">New</option>
                  <option value="Responded">Responded</option>
                  <option value="Closed">Closed</option>
                </select>
                <div className="flex items-center gap-2">
                  <a
                    href={`/admin/email?to=${encodeURIComponent(q.email)}&subject=${encodeURIComponent(`Your ConsignDrop Quote — ${q.origin} to ${q.destination}`)}`}
                    className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-brand"
                  >
                    Reply
                  </a>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-ink/40 transition hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete quote"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-[12px] font-medium text-ink/40">
                {new Date(q.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}