import Nav from "@/app/_components/Nav"
import Hero from "@/app/_components/Hero"
import TrustBar from "@/app/_components/TrustBar"
import FeatureGrid from "@/app/_components/FeatureGrid"
import IndustryTabs from "@/app/_components/IndustryTabs"
import PricingTable from "@/app/_components/PricingTable"
import Testimonials from "@/app/_components/Testimonials"
import IntegrationsStrip from "@/app/_components/IntegrationsStrip"
import FAQAccordion from "@/app/_components/FAQAccordion"
import FinalCTA from "@/app/_components/FinalCTA"
import Footer from "@/app/_components/Footer"

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
  )
}
