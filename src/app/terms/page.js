export const metadata = {
  title: "Terms of Service — ConsignDrop",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using ConsignDrop's website and shipping services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.",
  },
  {
    title: "2. Our Services",
    body: "ConsignDrop provides consignment shipping, air freight, sea freight, warehousing, business logistics, and last-mile delivery services. Service availability, transit times, and pricing vary by route and are confirmed at the time of booking through a quote.",
  },
  {
    title: "3. Quotes & Bookings",
    body: "Quotes provided through our website are estimates based on the information you supply. Final pricing is confirmed before pickup. A booking is only confirmed once our team has communicated acceptance and a tracking ID has been issued.",
  },
  {
    title: "4. Prohibited Items",
    body: "You may not ship hazardous materials, illegal goods, weapons, perishable items without prior arrangement, or any item restricted by the customs regulations of the origin or destination country. ConsignDrop reserves the right to refuse, hold, or return any shipment containing prohibited items, with any associated costs borne by the sender.",
  },
  {
    title: "5. Packaging Responsibility",
    body: "The sender is responsible for adequately packaging goods for transport. ConsignDrop is not liable for damage resulting from insufficient or unsuitable packaging.",
  },
  {
    title: "6. Tracking & Delivery",
    body: "Each shipment is assigned a unique tracking ID. Estimated delivery dates are provided in good faith but are not guaranteed, as transit can be affected by customs, weather, and other factors outside our control. We will always keep your tracking updated with the latest known status.",
  },
  {
    title: "7. Liability",
    body: "ConsignDrop's liability for loss or damage is limited to the declared value of the shipment or the maximum permitted by applicable law, whichever is lower. Claims must be reported within 7 days of delivery or expected delivery. High-value goods should be declared at booking so additional coverage can be arranged.",
  },
  {
    title: "8. Payments",
    body: "Payment terms are communicated with your quote. Shipments may be held until payment is confirmed. All fees are non-refundable once a shipment is in transit, except where required by law.",
  },
  {
    title: "9. Changes to These Terms",
    body: "We may update these Terms of Service from time to time. Continued use of our services after changes are published constitutes acceptance of the revised terms.",
  },
  {
    title: "10. Contact",
    body: "Questions about these terms? Contact us at support@consigndrop.com or call 1800-123-4567.",
  },
];

export default function TermsPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
          Legal
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Terms of <span className="text-brand">Service</span>
        </h1>
        <p className="mt-3 text-[14px] font-medium text-ink/50">
          Last updated: July 2026
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-heading text-xl font-bold">{s.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}