export default function manifest() {
  return {
    name: "ConsignDrop — Consignment Shipping, Simplified.",
    short_name: "ConsignDrop",
    description:
      "Safe, reliable and cost-effective consignment shipping across the globe. Real-time tracking, safe handling, on-time delivery.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF3EB",
    theme_color: "#111111",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}