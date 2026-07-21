"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share } from "lucide-react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHelp, setShowIOSHelp] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Already running as installed app? Show nothing.
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    // Detect iOS (no beforeinstallprompt there)
    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !window.MSStream;
    setIsIOS(ios);

    // User dismissed the banner before? Respect it for this session.
    const dismissed = sessionStorage.getItem("pwa-banner-dismissed");

    if (ios) {
      if (!dismissed) {
        const t = setTimeout(() => setShowBanner(true), 4000);
        return () => clearTimeout(t);
      }
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 4000);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    const installedHandler = () => {
      setInstalled(true);
      setShowBanner(false);
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
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    setShowBanner(false);
    setShowIOSHelp(false);
    sessionStorage.setItem("pwa-banner-dismissed", "1");
  };

  if (installed) return null;
  // Nothing to offer: not iOS and no captured prompt
  if (!isIOS && !deferredPrompt) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md"
        >
          <div className="rounded-3xl border border-ink/10 bg-ink p-5 text-white shadow-[0_16px_50px_rgba(17,17,17,0.35)]">
            <button
              onClick={dismiss}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:text-white"
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>

            {showIOSHelp ? (
              <div className="pr-6">
                <p className="text-[15px] font-extrabold">
                  Install ConsignDrop on iPhone
                </p>
                <ol className="mt-2 space-y-1.5 text-[13.5px] leading-relaxed text-white/70">
                  <li className="flex items-center gap-2">
                    1. Tap the <Share size={15} className="inline text-brand" /> Share
                    button below
                  </li>
                  <li>2. Scroll and tap &quot;Add to Home Screen&quot;</li>
                  <li>3. Tap &quot;Add&quot; — done!</li>
                </ol>
              </div>
            ) : (
              <div className="flex items-center gap-4 pr-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand">
                  <Download size={22} strokeWidth={2.2} />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-extrabold">
                    Install the ConsignDrop app
                  </p>
                  <p className="mt-0.5 text-[13px] text-white/60">
                    Track shipments faster — right from your home screen.
                  </p>
                </div>
                <button
                  onClick={handleInstall}
                  className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-[13.5px] font-bold transition hover:bg-brand-dark"
                >
                  Install
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}