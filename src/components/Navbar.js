"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Phone, Menu, X, ChevronDown } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Track Order", href: "/track" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Hide public navbar on admin routes
  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_2px_20px_rgba(17,17,17,0.06)]"
          : "bg-cream"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
            <Box size={22} strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <span className="block font-heading text-xl font-bold tracking-tight">
              ConsignDrop
            </span>
            <span className="block text-[11px] font-medium text-ink/60">
              Send More, Worry Less.
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-[15px] font-semibold transition-colors hover:text-brand ${
                  pathname === l.href ? "text-brand" : "text-ink"
                }`}
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:18001234567"
            className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-[15px] font-bold shadow-sm transition hover:border-brand/40"
          >
            <Phone size={16} className="text-brand" />
            1800-123-4567
          </a>
          <Link
            href="/get-quote"
            className="rounded-full bg-ink px-6 py-2.5 text-[15px] font-bold text-white transition hover:bg-brand"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-ink/5 bg-cream lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-xl px-4 py-3 text-[15px] font-semibold transition ${
                      pathname === l.href
                        ? "bg-brand/10 text-brand"
                        : "text-ink hover:bg-white"
                    }`}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="tel:18001234567"
                  className="mb-2 flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-[15px] font-bold"
                >
                  <Phone size={16} className="text-brand" />
                  1800-123-4567
                </a>
                <Link
                  href="/get-quote"
                  className="block rounded-full bg-ink px-5 py-3 text-center text-[15px] font-bold text-white"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}