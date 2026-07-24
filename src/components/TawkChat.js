"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TAWK_PROPERTY_ID = "6a63002ad0a4321d44bde51c";
const TAWK_WIDGET_ID = "1ju9bh9me";

export default function TawkChat() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't load chat on admin pages
    if (pathname.startsWith("/admin")) return;
    if (window.Tawk_API) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.body.appendChild(s);
  }, [pathname]);

  return null;
}