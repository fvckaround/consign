import { WifiOff } from "lucide-react";

export const metadata = {
  title: "You're offline — ConsignDrop",
};

export default function OfflinePage() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-cream-deep">
          <WifiOff size={44} className="text-brand" strokeWidth={1.8} />
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          You&apos;re <span className="text-brand">offline.</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink/60">
          It looks like you&apos;ve lost your connection. Check your internet
          and try again — your shipments will be right where you left them.
        </p>
      </div>
    </section>
  );
}