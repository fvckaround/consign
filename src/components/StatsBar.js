"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Truck, MapPin, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Package, value: 25000, suffix: "+", label: "Happy Customers" },
  { icon: Truck, value: 1.2, suffix: "M+", label: "Shipments Delivered", decimals: 1 },
  { icon: MapPin, value: 190, suffix: "+", label: "Countries Covered" },
  { icon: ShieldCheck, value: 99.5, suffix: "%", label: "On-time Delivery", decimals: 1 },
];

function Counter({ value, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 rounded-3xl bg-white px-6 py-10 shadow-[0_4px_40px_rgba(17,17,17,0.05)] sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center justify-center gap-4 ${
              i !== 0 ? "lg:border-l lg:border-ink/8" : ""
            }`}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-cream shadow-sm">
              <s.icon size={24} strokeWidth={2} />
            </div>
            <div className="leading-tight">
              <p className="font-heading text-2xl font-bold sm:text-[27px]">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals || 0}
                />
              </p>
              <p className="mt-0.5 text-[13.5px] font-medium text-ink/60">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}