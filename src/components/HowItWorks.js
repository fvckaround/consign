"use client";

import { motion } from "framer-motion";
import { FileText, ShoppingCart, Truck, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Book Your Shipment",
    sub: "Enter pickup & delivery details and get an instant quote.",
  },
  {
    icon: ShoppingCart,
    title: "We Pickup Your Goods",
    sub: "Our executive picks up your shipment from your location.",
  },
  {
    icon: Truck,
    title: "In Transit",
    sub: "Your shipment is on its way to the destination.",
  },
  {
    icon: ClipboardCheck,
    title: "Delivered Safely",
    sub: "We ensure secure and timely delivery.",
  },
];

export default function HowItWorks() {
  return (
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
            How It Works
          </h2>
          <p className="mt-3 text-[15px] text-ink/60 sm:text-base">
            Shipping your goods is easy with ConsignDrop.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative px-6 text-center"
            >
              {/* connector arrow */}
              {i < steps.length - 1 && (
                <div
                  className="absolute right-[-14%] top-8 hidden h-px w-[42%] lg:block"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, #11111140 0 6px, transparent 6px 12px)",
                  }}
                />
              )}

              <div className="relative mx-auto mb-5 w-fit">
                <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border border-ink/10 bg-white shadow-sm">
                  <s.icon size={30} strokeWidth={1.8} />
                </div>
                <span className="absolute -right-1.5 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[12px] font-extrabold text-white">
                  {i + 1}
                </span>
              </div>

              <h3 className="text-[16px] font-extrabold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[230px] text-[13.5px] leading-relaxed text-ink/60">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}