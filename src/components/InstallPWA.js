"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share } from "lucide-react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHelp, setShowIOSHelp] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    const dismissed = sessionStorage.getItem("pwa-banner-dismissed");
    if (dismissed) return;

    if (ios) {
      const t = setTimeout(() => setShowButton(true), 3000);
      return () => clearTimeout(t);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowButton(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const installedHandler = () => {
      setInstalled(true);
      setShowButton(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSHelp(true);
      return;
    }
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowButton(false);
    }
    setDeferredPrompt(null);
  };

  const dismiss = (e) => {
    e.stopPropagation();
    setShowButton(false);
    setShowIOSHelp(false);
    sessionStorage.setItem("pwa-banner-dismissed", "1");
  };

  if (installed) return null;
  if (!isIOS && !deferredPrompt) return null;

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-[60]"
        >
          {showIOSHelp ? (
            <div className="relative w-72 rounded-3xl bg-ink p-5 text-white shadow-[0_16px_50px_rgba(17,17,17,0.35)]">
              <button
                onClick={dismiss}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:text-white"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
              <p className="pr-5 text-[14px] font-extrabold">
                Install ConsignDrop
              </p>
              <ol className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-white/70">
                <li className="flex items-center gap-1.5">
                  Tap <Share size={14} className="text-brand" /> Share below
                </li>
                <li>Scroll and tap &quot;Add to Home Screen&quot;</li>
                <li>Tap &quot;Add&quot; — done!</li>
              </ol>
            </div>
          ) : (
            <div className="group relative flex items-center">
              <button
                onClick={handleInstall}
                className="flex items-center gap-2.5 rounded-full bg-ink px-5 py-3.5 text-[14.5px] font-bold text-white shadow-[0_10px_35px_rgba(17,17,17,0.3)] transition hover:bg-black"
              >
                <Download size={17} strokeWidth={2.2} />
                Install app
              </button>
              <button
                onClick={dismiss}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white/70 shadow-md transition hover:text-white"
                aria-label="Dismiss"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}