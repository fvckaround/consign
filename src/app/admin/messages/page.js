"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Mail, Phone } from "lucide-react";

const statusColors = {
  New: "bg-amber-100 text-amber-700",
  Read: "bg-blue-100 text-blue-700",
  Replied: "bg-green-100 text-green-700",
};

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((d) => d.success && setMessages(d.messages))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, status } : m)));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) setMessages((prev) => prev.filter((m) => m._id !== id));
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
      <h1 className="font-heading text-3xl font-bold tracking-tight">Messages</h1>
      <p className="mt-1 text-[14.5px] text-ink/55">
        {messages.length} message{messages.length !== 1 && "s"}
      </p>

      {messages.length === 0 ? (
        <p className="mt-8 text-[14.5px] text-ink/55">No messages yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {messages.map((m) => (
            <div key={m._id} className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[16px] font-extrabold">{m.name}</p>
                  <div className="mt-1.5 space-y-1 text-[13.5px] font-medium text-ink/60">
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-brand" />
                      <a href={`mailto:${m.email}`} className="hover:text-brand">{m.email}</a>
                    </p>
                    {m.phone && (
                      <p className="flex items-center gap-2">
                        <Phone size={14} className="text-brand" /> {m.phone}
                      </p>
                    )}
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-extrabold ${statusColors[m.status]}`}>
                  {m.status}
                </span>
              </div>

              <div className="mt-4 rounded-2xl bg-cream p-4 text-[13.5px] font-medium">
                {m.subject && <p className="mb-1.5 font-extrabold">{m.subject}</p>}
                <p className="whitespace-pre-wrap text-ink/70">{m.message}</p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <select
                  value={m.status}
                  onChange={(e) => updateStatus(m._id, e.target.value)}
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-[13.5px] font-bold shadow-sm outline-none"
                >
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                </select>
                <div className="flex items-center gap-2">
                  <a
                    href={`/admin/email?to=${encodeURIComponent(m.email)}&subject=${encodeURIComponent(`Re: ${m.subject || "Your message to ConsignDrop"}`)}`}
                    className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-brand"
                  >
                    Reply
                  </a>
                  <button
                    onClick={() => handleDelete(m._id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-ink/40 transition hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-[12px] font-medium text-ink/40">
                {new Date(m.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}