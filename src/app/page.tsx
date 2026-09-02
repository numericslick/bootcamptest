"use client";

import Nav from "@/app/_components/Nav";
import Hero from "@/app/_components/landing/Hero";
import TrustBar from "@/app/_components/landing/TrustBar";
import FeatureGrid from "@/app/_components/landing/FeatureGrid";
import IndustryTabs from "@/app/_components/landing/IndustryTabs";
import PricingTable from "@/app/_components/landing/PricingTable";
import Testimonials from "@/app/_components/landing/Testimonials";
import IntegrationsStrip from "@/app/_components/landing/IntegrationsStrip";
import FAQAccordion from "@/app/_components/landing/FAQAccordion";
import FinalCTA from "@/app/_components/landing/FinalCTA";
import Footer from "@/app/_components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <FeatureGrid />
        <IndustryTabs />
        <PricingTable />
        <Testimonials />
        <IntegrationsStrip />
        <FAQAccordion />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
