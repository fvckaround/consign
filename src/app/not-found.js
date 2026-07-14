import Link from "next/link";
import { PackageX, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-cream-deep">
          <PackageX size={44} className="text-brand" strokeWidth={1.8} />
        </div>

        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
          Error 404
        </p>

        <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          This package got <span className="text-brand">lost.</span>
        </h1>

        <p className="mb-10 text-base leading-relaxed text-ink/60 sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Don&apos;t worry — your shipments are safe with us.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand sm:w-auto"
          >
            <Home size={17} />
            Back to Home
          </Link>
          <Link
            href="/track"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-7 py-3.5 text-[15px] font-bold shadow-sm transition hover:border-brand/40 sm:w-auto"
          >
            <Search size={17} />
            Track a Shipment
          </Link>
        </div>
      </div>
    </section>
  );
}