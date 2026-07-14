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
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Boxes,
    title: "Consignment Shipping",
    sub: "Door-to-door consignment delivery for goods of every size, handled with complete care.",
  },
  {
    icon: Plane,
    title: "Air Freight",
    sub: "Express international air cargo when speed matters most for your business.",
  },
  {
    icon: Ship,
    title: "Sea Freight",
    sub: "Cost-effective ocean shipping for bulk consignments and heavy cargo worldwide.",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    sub: "Secure, monitored storage facilities with flexible short and long-term options.",
  },
  {
    icon: Building2,
    title: "Business Logistics",
    sub: "Dedicated B2B shipping solutions with priority handling and volume pricing.",
  },
  {
    icon: PackageCheck,
    title: "Last-Mile Delivery",
    sub: "Fast, trackable final-leg delivery straight to your customer's doorstep.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-cream-deep/60 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Our <span className="text-brand">Services</span>
            </h2>
            <p className="mt-3 max-w-md text-[15px] text-ink/60 sm:text-base">
              Everything you need to move goods safely — from a single parcel
              to full-scale cargo.
            </p>
          </div>
          <Link
            href="/services"
            className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-bold text-white transition hover:bg-brand"
          >
            View All Services
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group rounded-3xl border border-ink/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(17,17,17,0.08)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <s.icon size={26} strokeWidth={1.8} />
              </div>
              <h3 className="text-[17px] font-extrabold">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/60">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}