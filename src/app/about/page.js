"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Zap,
  Globe2,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Reliability First",
    sub: "99.5% on-time delivery isn't a slogan — it's the standard we hold every route, every driver, and every facility to.",
  },
  {
    icon: HeartHandshake,
    title: "Care in Every Hand-off",
    sub: "Your consignment passes through many hands. We train every one of them to treat your goods like their own.",
  },
  {
    icon: Zap,
    title: "Speed Without Shortcuts",
    sub: "Fast delivery never comes at the cost of safe handling. We optimize routes, not corners.",
  },
  {
    icon: Globe2,
    title: "Truly Global",
    sub: "With coverage across 190+ countries, distance is never a reason your goods can't get where they need to be.",
  },
];

const stats = [
  { value: "25,000+", label: "Happy Customers" },
  { value: "1.2M+", label: "Shipments Delivered" },
  { value: "190+", label: "Countries Covered" },
  { value: "99.5%", label: "On-time Delivery" },
];

export default function AboutPage() {
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
            About Us
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Send more, <span className="text-brand">worry less.</span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/60 sm:text-base">
            ConsignDrop was built on a simple frustration: shipping goods
            shouldn&apos;t feel like a gamble. We set out to make consignment
            shipping safe, transparent, and genuinely affordable — for a single
            parcel or a thousand.
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-ink/5 bg-white p-8 shadow-sm sm:p-10"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
              <Target size={26} className="text-brand" strokeWidth={1.8} />
            </div>
            <h2 className="font-heading text-2xl font-bold">Our Mission</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
              To make world-class consignment shipping accessible to everyone —
              individuals and businesses alike — with transparent pricing,
              real-time visibility, and handling standards that never waver.
              Every package matters, whether it&apos;s a family heirloom or a
              container of inventory.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-3xl border border-ink/5 bg-white p-8 shadow-sm sm:p-10"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
              <Eye size={26} className="text-brand" strokeWidth={1.8} />
            </div>
            <h2 className="font-heading text-2xl font-bold">Our Vision</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
              A world where sending goods across the globe feels as simple and
              certain as sending a message. We&apos;re building the logistics
              network — and the technology behind it — to make that real, one
              delivered consignment at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats band */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 rounded-[36px] bg-ink px-6 py-12 text-center text-white lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-heading text-3xl font-bold text-brand sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-[13.5px] font-medium text-white/60">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Values */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              What we <span className="text-brand">stand for</span>
            </h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="rounded-3xl border border-ink/5 bg-white p-7 shadow-sm"
              >
                <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-cream p-3.5">
                  <v.icon size={23} className="text-brand" strokeWidth={1.8} />
                </div>
                <h3 className="text-[16px] font-extrabold">{v.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">
                  {v.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 pt-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="mx-auto max-w-xl font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s move something{" "}
            <span className="text-brand">together.</span>
          </h2>
          <Link
            href="/get-quote"
            className="group mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-ink px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand"
          >
            Get a Quote
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}