"use client";

import Hero from "./hero";
import Features from "./features";
import InteractiveDemo from "./interactiveDemo";
import Testimonials from "./testimonials";
import HowItWorks from "./howItWorks";
import Pricing from "./pricing";
import CTA from "./cta";

export default function LandingPageClient() {
  return (
    <main className="">
      <Hero />
      <Features />
      <InteractiveDemo />
      <Testimonials />
      <HowItWorks />
      <Pricing />
      <CTA />
    </main>
  );
}
