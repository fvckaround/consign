"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Send, CheckCircle2, Mail } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[14.5px] font-medium shadow-sm outline-none transition placeholder:text-ink/40 focus:border-brand/50";

const templates = [
  {
    name: "Blank",
    subject: "",
    message: "",
  },
  {
    name: "Quote Response",
    subject: "Your ConsignDrop Quote",
    message:
      "Hi [Name],\n\nThank you for your quote request with ConsignDrop.\n\nBased on the details you provided, here is your quote:\n\nRoute: [Origin] → [Destination]\nService: [Service Type]\nEstimated Price: [Price]\nEstimated Transit Time: [X days]\n\nTo proceed with this shipment, simply reply to this email and our team will arrange pickup.\n\nBest regards,\nConsignDrop Team",
  },
  {
    name: "Shipment Delay",
    subject: "Update on your shipment",
    message:
      "Hi [Name],\n\nWe wanted to let you know that your shipment [Tracking ID] is experiencing a slight delay.\n\nReason: [Reason]\nNew estimated delivery: [Date]\n\nWe apologize for any inconvenience and are working to get your package to you as quickly as possible. You can follow live updates on our tracking page.\n\nBest regards,\nConsignDrop Team",
  },
  {
    name: "Payment Instructions",
    subject: "Payment details for your shipment",
    message:
      "Hi [Name],\n\nThank you for confirming your shipment with ConsignDrop.\n\nTo complete your booking, please find the payment details below:\n\nAmount: [Amount]\n[Payment details]\n\nOnce payment is confirmed, we will schedule your pickup and send you your tracking ID.\n\nBest regards,\nConsignDrop Team",
  },
  {
    name: "General Follow-up",
    subject: "Following up — ConsignDrop",
    message:
      "Hi [Name],\n\nJust following up on your recent enquiry with ConsignDrop.\n\n[Your message]\n\nIf you have any questions, simply reply to this email — we're happy to help.\n\nBest regards,\nConsignDrop Team",
  },
];

function EmailContent() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    to: searchParams.get("to") || "",
    subject: searchParams.get("subject") || "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const applyTemplate = (t) => {
    setForm((f) => ({
      ...f,
      subject: t.subject || f.subject,
      message: t.message,
    }));
    setSent(false);
  };

  const handleSend = async () => {
    if (!form.to || !form.subject || !form.message) {
      setError("Recipient, subject and message are all required.");
      return;
    }
    setLoading(true);
    setError("");
    setSent(false);

    try {
      const res = await fetch("/api/admin-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ to: "", subject: "", message: "" });
      } else {
        setError(data.error || "Failed to send.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        Send Email
      </h1>
      <p className="mt-1 text-[14.5px] text-ink/55">
        Emails are sent from your ConsignDrop address with the branded template.
      </p>

      {/* Templates */}
      <div className="mt-6 flex flex-wrap gap-2">
        {templates.map((t) => (
          <button
            key={t.name}
            onClick={() => applyTemplate(t)}
            className="rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-bold shadow-sm transition hover:border-brand/40 hover:text-brand"
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-4">
          <input
            className={inputCls}
            type="email"
            placeholder="To (recipient email) *"
            value={form.to}
            onChange={set("to")}
          />
          <input
            className={inputCls}
            placeholder="Subject *"
            value={form.subject}
            onChange={set("subject")}
          />
          <textarea
            className={`${inputCls} min-h-[280px] resize-y`}
            placeholder="Write your message... *"
            value={form.message}
            onChange={set("message")}
          />
        </div>

        {error && (
          <p className="mt-4 rounded-2xl bg-red-50 px-5 py-3 text-[14px] font-semibold text-red-600">
            {error}
          </p>
        )}
        {sent && (
          <p className="mt-4 flex items-center gap-2 rounded-2xl bg-green-50 px-5 py-3 text-[14px] font-semibold text-green-700">
            <CheckCircle2 size={17} /> Email sent successfully.
          </p>
        )}

        <button
          onClick={handleSend}
          disabled={loading}
          className="mt-6 flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={17} className="animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send size={17} /> Send Email
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function AdminEmailPage() {
  return (
    <Suspense fallback={null}>
      <EmailContent />
    </Suspense>
  );
}