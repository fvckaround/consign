"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Box,
  LayoutDashboard,
  Package,
  FileText,
  Mail,
  LogOut,
  Menu,
  X,
  Plus,
  Send,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Shipments", href: "/admin/shipments", icon: Package },
  { name: "New Shipment", href: "/admin/shipments/new", icon: Plus },
  { name: "Quotes", href: "/admin/quotes", icon: FileText },
  { name: "Messages", href: "/admin/messages", icon: Mail },
  { name: "Send Email", href: "/admin/email", icon: Send },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const nav = (
    <nav className="flex h-full flex-col">
      <Link href="/admin" className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
          <Box size={22} strokeWidth={2.2} />
        </div>
        <div className="leading-tight">
          <span className="block font-heading text-lg font-bold text-white">
            ConsignDrop
          </span>
          <span className="block text-[11px] font-medium text-white/50">
            Admin Panel
          </span>
        </div>
      </Link>

      <ul className="flex-1 space-y-1 px-3 py-4">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[14.5px] font-bold transition ${
                isActive(l.href)
                  ? "bg-brand text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <l.icon size={19} strokeWidth={2} />
              {l.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/admin-login" })}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[14.5px] font-bold text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut size={19} strokeWidth={2} />
          Sign Out
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-ink px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
            <Box size={19} strokeWidth={2.2} />
          </div>
          <span className="font-heading text-[17px] font-bold text-white">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white"
          aria-label="Toggle admin menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-ink">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
            {nav}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-ink lg:block">
        {nav}
      </aside>
    </>
  );
}