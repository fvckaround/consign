"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share } from "lucide-react";

if (typeof window !== "undefined" && !window.__pwaPromptHandlerAttached) {
  window.__pwaPromptHandlerAttached = true;
  console.log("[PWA] listener attached at module load");
  window.addEventListener("beforeinstallprompt", (e) => {
    console.log("[PWA] beforeinstallprompt FIRED");
    e.preventDefault();
    window.__deferredPWAPrompt = e;
    window.dispatchEvent(new Event("pwa-install-ready"));
  });
}

export default function InstallPWA() {
  const [ready, setReady] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHelp, setShowIOSHelp] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    console.log("[PWA] component mounted");

    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("[PWA] already installed, stopping");
      setInstalled(true);
      return;
    }

    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);
    console.log("[PWA] isIOS:", ios);

    const dismissed = sessionStorage.getItem("pwa-banner-dismissed");
    console.log("[PWA] dismissed flag:", dismissed);
    if (dismissed) return;

    if (ios) {
      const t = setTimeout(() => setShowButton(true), 3000);
      return () => clearTimeout(t);
    }

    console.log("[PWA] checking window.__deferredPWAPrompt:", window.__deferredPWAPrompt);

    if (window.__deferredPWAPrompt) {
      console.log("[PWA] prompt already captured, showing button");
      setReady(true);
      setTimeout(() => setShowButton(true), 1500);
      return;
    }

    console.log("[PWA] waiting for pwa-install-ready event");
    const onReady = () => {
      console.log("[PWA] pwa-install-ready received, showing button");
      setReady(true);
      setTimeout(() => setShowButton(true), 1500);
    };
    window.addEventListener("pwa-install-ready", onReady);

    const installedHandler = () => {
      setInstalled(true);
      setShowButton(false);
    };
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("pwa-install-ready", onReady);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSHelp(true);
      return;
    }
    const prompt = window.__deferredPWAPrompt;
    if (!prompt) return;

    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      setShowButton(false);
    }
    window.__deferredPWAPrompt = null;
  };

  const dismiss = (e) => {
    e.stopPropagation();
    setShowButton(false);
    setShowIOSHelp(false);
    sessionStorage.setItem("pwa-banner-dismissed", "1");
  };

  console.log("[PWA] render — installed:", installed, "ready:", ready, "isIOS:", isIOS, "showButton:", showButton);

  if (installed) return null;
  if (!isIOS && !ready) return null;

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