"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";

export default function CTASection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-16"
      >
        {/* dotted decoration */}
        <div
          className="pointer-events-none absolute left-6 top-6 h-24 w-24 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-6 right-6 h-24 w-24 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />

        <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          Ready to ship? Get an instant quote{" "}
          <span className="text-brand">today.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/60 sm:text-base">
          Join 25,000+ happy customers who trust ConsignDrop with their goods
          every single day.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/get-quote"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand-dark sm:w-auto"
          >
            Get a Quote
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/track"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-[15px] font-bold text-white backdrop-blur transition hover:border-brand hover:text-brand sm:w-auto"
          >
            <Search size={17} />
            Track Shipment
          </Link>
        </div>
      </motion.div>
    </section>
  );
}