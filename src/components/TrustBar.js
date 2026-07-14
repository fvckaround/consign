"use client";

import { motion } from "framer-motion";
import { ShieldCheck, PhoneCall } from "lucide-react";

export default function TrustBar() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 rounded-3xl bg-cream-deep px-6 py-6 sm:flex-row sm:items-center sm:px-8"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white p-3 shadow-sm">
            <ShieldCheck size={24} strokeWidth={2} />
          </div>
          <p className="text-[15px] font-bold sm:text-base">
            Trusted by 10,000+ businesses and individuals
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white p-3 shadow-sm">
            <PhoneCall size={24} strokeWidth={2} />
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-medium text-ink/60">24/7 Support</p>
            <a
              href="tel:18001234567"
              className="text-[15.5px] font-extrabold transition hover:text-brand"
            >
              1800-123-4567
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}