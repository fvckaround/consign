"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Box, Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <section className="flex min-h-[85vh] items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-ink/5 bg-white p-8 shadow-[0_8px_50px_rgba(17,17,17,0.07)] sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white">
              <Box size={26} strokeWidth={2.2} />
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">
              Admin <span className="text-brand">Login</span>
            </h1>
            <p className="mt-2 text-[14px] text-ink/55">
              Sign in to manage ConsignDrop.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2.5 rounded-2xl border border-ink/10 bg-cream/50 px-4 py-3.5 focus-within:border-brand/50">
              <Mail size={18} className="shrink-0 text-ink/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin email"
                className="w-full bg-transparent text-[15px] font-medium outline-none placeholder:text-ink/40"
              />
            </div>

            <div className="flex items-center gap-2.5 rounded-2xl border border-ink/10 bg-cream/50 px-4 py-3.5 focus-within:border-brand/50">
              <Lock size={18} className="shrink-0 text-ink/40" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Password"
                className="w-full bg-transparent text-[15px] font-medium outline-none placeholder:text-ink/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 text-ink/40 transition hover:text-ink"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="rounded-2xl bg-red-50 px-5 py-3 text-[13.5px] font-semibold text-red-600">
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-[13px] font-medium text-ink/40">
          Authorized personnel only.
        </p>
      </motion.div>
    </section>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginContent />
    </Suspense>
  );
}