"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                <Box size={22} strokeWidth={2.2} />
              </div>
              <span className="font-heading text-xl font-bold">ConsignDrop</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Safe, reliable and cost-effective consignment shipping across the
              globe. Send more, worry less.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link href="/services" className="transition hover:text-brand">Services</Link></li>
              <li><Link href="/how-it-works" className="transition hover:text-brand">How It Works</Link></li>
              <li><Link href="/track" className="transition hover:text-brand">Track Order</Link></li>
              <li><Link href="/about" className="transition hover:text-brand">About Us</Link></li>
              <li><Link href="/get-quote" className="transition hover:text-brand">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">Legal</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link href="/terms" className="transition hover:text-brand">Terms of Service</Link></li>
              <li><Link href="/privacy" className="transition hover:text-brand">Privacy Policy</Link></li>
              <li><Link href="/contact" className="transition hover:text-brand">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-brand" />
                <a href="tel:18001234567" className="transition hover:text-brand">1800-123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-brand" />
                <a href="mailto:consigndrop@outlook.com" className="transition hover:text-brand">
                  consigndrop@outlook.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand" />
                <span>Available 24/7 — Global Support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© {year} ConsignDrop. All rights reserved.</p>
          <p>Send More, Worry Less.</p>
        </div>
      </div>
    </footer>
  );
}