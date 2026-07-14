"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Truck,
  Search,
  ShieldCheck,
  Clock,
  Package,
} from "lucide-react";

const features = [
  { icon: Truck, title: "Global Delivery", sub: "Extensive network" },
  { icon: Search, title: "Real-time Tracking", sub: "Track your shipment" },
  { icon: ShieldCheck, title: "Safe Handling", sub: "Your goods, our care" },
  { icon: Clock, title: "On-time Delivery", sub: "Always on schedule" },
];

export default function Hero() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleQuote = () => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    router.push(`/get-quote${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:pt-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-heading text-[42px] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[64px]">
            Consignment
            <br />
            Shipping, <span className="text-brand">Simplified.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
            Safe, reliable and cost-effective consignment shipping across the
            globe.
          </p>

          {/* Quote inputs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-2.5 rounded-2xl border border-ink/10 bg-white px-4 py-3.5 shadow-sm focus-within:border-brand/50">
              <MapPin size={18} className="shrink-0 text-ink/40" />
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From (City / Postal code)"
                className="w-full bg-transparent text-[15px] font-medium outline-none placeholder:text-ink/40"
              />
            </div>
            <div className="flex flex-1 items-center gap-2.5 rounded-2xl border border-ink/10 bg-white px-4 py-3.5 shadow-sm focus-within:border-brand/50">
              <MapPin size={18} className="shrink-0 text-ink/40" />
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To (City / Postal code)"
                className="w-full bg-transparent text-[15px] font-medium outline-none placeholder:text-ink/40"
              />
            </div>
            <button
              onClick={handleQuote}
              className="rounded-2xl bg-ink px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand"
            >
              Get Quote
            </button>
          </div>

          {/* Feature icons */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white shadow-sm">
                  <f.icon size={19} strokeWidth={2} />
                </div>
                <div className="leading-tight">
                  <p className="text-[13.5px] font-extrabold">{f.title}</p>
                  <p className="mt-0.5 text-[12.5px] text-ink/55">{f.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — arch image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          {/* dotted decoration */}
          <div
            className="absolute -left-4 top-2 hidden h-28 w-28 opacity-40 lg:block"
            style={{
              backgroundImage:
                "radial-gradient(circle, #11111155 1.5px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative aspect-[4/3.4] w-full overflow-hidden rounded-t-[999px] rounded-b-[36px] bg-cream-deep">
            <Image
              src="/hero-truck.jpg"
              alt="ConsignDrop delivery truck with packages"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {/* Fallback if image missing */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <Package size={120} className="text-ink/10" strokeWidth={1} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}