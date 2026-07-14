export const metadata = {
  title: "Privacy Policy — ConsignDrop",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "When you request a quote, book a shipment, or contact us, we collect the information you provide: your name, email address, phone number, pickup and delivery addresses, and details about your shipment. We also collect standard technical data such as browser type and pages visited to keep our website running smoothly.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to provide our shipping services: processing bookings, arranging pickups and deliveries, sending tracking updates and service notifications, responding to enquiries, and improving our services. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Shipment Data & Tracking",
    body: "Tracking information for your shipment (status, location checkpoints, and delivery confirmation) is stored so you and your receiver can follow the delivery. Anyone with your tracking ID can view the shipment's status, so share it only with people involved in the delivery.",
  },
  {
    title: "4. Sharing With Service Partners",
    body: "To move your goods, we may share necessary shipment details (addresses, contact information, package descriptions) with carriers, customs authorities, and delivery partners involved in fulfilling your shipment. They receive only what is required to complete the delivery.",
  },
  {
    title: "5. Email Communications",
    body: "We send transactional emails related to your shipments and enquiries — booking confirmations, status updates, and replies to your messages. These are essential to the service and are not marketing communications.",
  },
  {
    title: "6. Data Security",
    body: "We take reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, or loss. Data is transmitted over encrypted connections and stored in secured databases.",
  },
  {
    title: "7. Data Retention",
    body: "We retain shipment and contact records for as long as needed to provide our services, resolve disputes, and meet legal obligations. You may request deletion of your personal data by contacting us, subject to any records we are legally required to keep.",
  },
  {
    title: "8. Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by contacting support@consigndrop.com. We will respond to all legitimate requests promptly.",
  },
  {
    title: "9. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. The latest version will always be available on this page with its effective date.",
  },
  {
    title: "10. Contact",
    body: "For any privacy-related questions or requests, contact us at support@consigndrop.com or call 1800-123-4567.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
          Legal
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy <span className="text-brand">Policy</span>
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