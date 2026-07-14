"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Boxes,
  Plane,
  Ship,
  Warehouse,
  Building2,
  PackageCheck,
  ShieldCheck,
  Clock,
  Search,
  Headphones,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Boxes,
    title: "Consignment Shipping",
    sub: "Our core service. Door-to-door consignment delivery for goods of every size — from single parcels to bulk consignments — handled with complete care from pickup to drop-off.",
    points: ["Door-to-door pickup & delivery", "Flexible parcel sizes", "Full tracking included"],
  },
  {
    icon: Plane,
    title: "Air Freight",
    sub: "Express international air cargo when speed matters most. Priority handling through major air routes worldwide with customs support.",
    points: ["Fastest international option", "Customs clearance support", "Priority handling"],
  },
  {
    icon: Ship,
    title: "Sea Freight",
    sub: "Cost-effective ocean shipping for bulk consignments and heavy cargo. Full container (FCL) and shared container (LCL) options available.",
    points: ["FCL & LCL options", "Best rates for heavy cargo", "Global port network"],
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    sub: "Secure, monitored storage facilities with flexible short and long-term options. Perfect for businesses managing inventory across regions.",
    points: ["24/7 monitored facilities", "Short & long-term storage", "Inventory management"],
  },
  {
    icon: Building2,
    title: "Business Logistics",
    sub: "Dedicated B2B shipping solutions with priority handling, volume pricing, and a dedicated account manager for your business.",
    points: ["Volume-based pricing", "Dedicated account manager", "Priority scheduling"],
  },
  {
    icon: PackageCheck,
    title: "Last-Mile Delivery",
    sub: "Fast, trackable final-leg delivery straight to your customer's doorstep — with real-time updates they can follow themselves.",
    points: ["Doorstep delivery", "Real-time customer tracking", "Proof of delivery"],
  },
];

const perks = [
  { icon: ShieldCheck, title: "Safe Handling", sub: "Every package treated like our own." },
  { icon: Search, title: "Live Tracking", sub: "Follow your shipment at every step." },
  { icon: Clock, title: "On-time Delivery", sub: "99.5% delivered on schedule." },
  { icon: Headphones, title: "24/7 Support", sub: "Real humans, around the clock." },
];

export default function ServicesPage() {
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
            Our Services
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Shipping solutions for{" "}
            <span className="text-brand">every need.</span>
          </h1>
          <p className="mt-4 text-[15px] text-ink/60 sm:text-base">
            From a single consignment to full-scale business logistics — we
            move your goods safely, anywhere in the world.
          </p>
        </motion.div>
      </section>

      {/* Services list */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group rounded-3xl border border-ink/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(17,17,17,0.08)] sm:p-8"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <s.icon size={26} strokeWidth={1.8} />
              </div>
              <h2 className="font-heading text-[21px] font-bold">{s.title}</h2>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink/60">
                {s.sub}
              </p>
              <ul className="mt-4 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[13.5px] font-semibold">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Perks strip */}
      <section className="bg-cream-deep/60 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white p-3.5 shadow-sm">
                <p.icon size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[15px] font-extrabold">{p.title}</p>
                <p className="mt-0.5 text-[13.5px] text-ink/60">{p.sub}</p>
              </div>
            </motion.div>
          ))}
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
            Not sure which service fits? Let&apos;s{" "}
            <span className="text-brand">talk.</span>
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
              href="/contact"
              className="rounded-full border border-ink/10 bg-white px-8 py-4 text-[15px] font-bold shadow-sm transition hover:border-brand/40"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}