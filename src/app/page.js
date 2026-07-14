import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import StatsBar from "@/components/StatsBar";
import HowItWorks from "@/components/HowItWorks";
import ServicesGrid from "@/components/ServicesGrid";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StatsBar />
      <HowItWorks />
      <ServicesGrid />
      <CTASection />
    </>
  );
}