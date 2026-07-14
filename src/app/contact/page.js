"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-[15px] font-medium shadow-sm outline-none transition placeholder:text-ink/40 focus:border-brand/50";

const info = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["1800-123-4567"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@consigndrop.com"],
  },
  {
    icon: Clock,
    title: "Support Hours",
    lines: ["24/7 — Global Support"],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
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
            Contact Us
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            We&apos;re here to <span className="text-brand">help.</span>
          </h1>
          <p className="mt-4 text-[15px] text-ink/60 sm:text-base">
            Questions about a shipment, pricing or partnerships? Reach out —
            we respond fast.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr]">
          {/* Info cards */}
          <div className="space-y-4">
            {info.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-3xl border border-ink/5 bg-white p-6 shadow-sm"
              >
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-cream p-3.5">
                  <item.icon size={22} className="text-brand" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[15.5px] font-extrabold">{item.title}</p>
                  {item.lines.map((l) => (
                    <p key={l} className="mt-0.5 text-[14px] font-medium text-ink/60">
                      {l}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:p-10"
          >
            {success ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                  Message <span className="text-brand">sent!</span>
                </h2>
                <p className="mt-3 max-w-sm text-[15px] text-ink/60">
                  Thanks, {form.name.split(" ")[0]}. We&apos;ll get back to you at{" "}
                  <strong>{form.email}</strong> soon.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input className={inputCls} placeholder="Full name *" value={form.name} onChange={set("name")} />
                  <input className={inputCls} type="email" placeholder="Email address *" value={form.email} onChange={set("email")} />
                  <input className={inputCls} placeholder="Phone (optional)" value={form.phone} onChange={set("phone")} />
                  <input className={inputCls} placeholder="Subject (optional)" value={form.subject} onChange={set("subject")} />
                </div>
                <textarea
                  className={`${inputCls} mt-4 min-h-[150px] resize-y`}
                  placeholder="Your message *"
                  value={form.message}
                  onChange={set("message")}
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
                      <Send size={17} /> Send Message
                    </>
                  )}
                </button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}