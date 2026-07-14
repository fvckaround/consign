"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  ShoppingCart,
  Truck,
  ClipboardCheck,
  Search,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Book Your Shipment",
    sub: "Enter your pickup and delivery details on our Get a Quote page. Tell us what you're shipping, where it's going, and we'll send you an instant tailored quote — no hidden fees.",
  },
  {
    icon: ShoppingCart,
    title: "We Pickup Your Goods",
    sub: "Once confirmed, our executive comes to your location, verifies the package, and hands you a tracking ID (like CDP48291736). Your shipment is now in safe hands.",
  },
  {
    icon: Truck,
    title: "In Transit",
    sub: "Your consignment moves through our global network. Every checkpoint — pickup, facility arrival, departure — is logged in real time, and you can follow it all from the Track page.",
  },
  {
    icon: ClipboardCheck,
    title: "Delivered Safely",
    sub: "Your package arrives at its destination on schedule. The receiver confirms delivery, and the full journey stays available in your tracking history.",
  },
];

const faqs = [
  {
    q: "How do I track my shipment?",
    a: "Go to the Track Order page and enter your tracking ID (it starts with CDP). You'll see the current status, location, and the full checkpoint history of your shipment.",
  },
  {
    q: "How long does delivery take?",
    a: "It depends on the route and service. Air freight is typically 2–5 business days internationally, sea freight 2–6 weeks, and local consignment delivery 1–3 days. Your quote includes an estimated delivery date.",
  },
  {
    q: "Is my package insured?",
    a: "Every shipment is handled under our safe-handling guarantee. For high-value goods, mention it in your quote request and we'll arrange additional coverage options.",
  },
  {
    q: "What items can't be shipped?",
    a: "We can't carry hazardous materials, illegal goods, perishables without prior arrangement, or restricted items under destination-country customs rules. Contact us if you're unsure about an item.",
  },
  {
    q: "How do I get a price?",
    a: "Use the Get a Quote page — fill in your route and package details and our team responds with tailored pricing, usually within a few hours.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-3xl border border-ink/5 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15.5px] font-extrabold">{q}</span>
        <ChevronDown
          size={19}
          className={`shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-brand" : "text-ink/40"
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-ink/60">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 pb-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
            How It Works
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            From your door to theirs, in{" "}
            <span className="text-brand">four steps.</span>
          </h1>
          <p className="mt-4 text-[15px] text-ink/60 sm:text-base">
            Shipping with ConsignDrop is designed to be effortless. Here&apos;s
            exactly what happens after you book.
          </p>
        </motion.div>
      </section>

      {/* Steps — vertical detailed */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex gap-5 rounded-3xl border border-ink/5 bg-white p-6 shadow-sm sm:gap-7 sm:p-8"
            >
              <div className="relative shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream sm:h-[74px] sm:w-[74px]">
                  <s.icon size={28} strokeWidth={1.8} />
                </div>
                <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[12px] font-extrabold text-white">
                  {i + 1}
                </span>
              </div>
              <div>
                <h2 className="font-heading text-[20px] font-bold sm:text-[22px]">
                  {s.title}
                </h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink/60">
                  {s.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-deep/60 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-white p-3.5 shadow-sm">
              <HelpCircle size={24} className="text-brand" />
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked <span className="text-brand">questions</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-10 space-y-4"
          >
            {faqs.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="mx-auto max-w-xl font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to send your first{" "}
            <span className="text-brand">consignment?</span>
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/get-quote"
              className="group flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand"
            >
              Get a Quote
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/track"
              className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-8 py-4 text-[15px] font-bold shadow-sm transition hover:border-brand/40"
            >
              <Search size={17} />
              Track a Shipment
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}