import React from "react";
import { SectionTag } from "@/components/ui/SectionTag";
import { AnimatedCounter } from "../ui/AnimatedCounter";

export function WhyChooseUs() {
  return (
    <section id="why">
      {/* Header: section tag left, big title right */}
      <div className="why-header">
        <div className="why-header-left">
          <SectionTag num="05" label="Why Aayush Wellness" theme="dark" className="reveal" />
        </div>
        <h2 className="why-title reveal">What Sets Us Apart In A Crowded Market</h2>
      </div>

      <div className="why-grid">

        {/* Card 1 - Lime, spans 2 rows, no bg image */}
        <div className="why-card why-card-lime reveal">
          <div className="why-card-inner">
            <h3 className="why-card-title">Ayurveda + Modern Nutrition</h3>
            <p className="why-card-body">Combining traditional Ayurvedic principles with modern nutritional research to create wellness solutions designed for contemporary lifestyles.</p>
          </div>
        </div>

        {/* Card 2 - BSE building background image */}
        <div
          className="why-card why-card-bg reveal reveal-delay-1"
          style={{ backgroundImage: "url('/BSE-GettyImages-2158726341-copy.webp')" }}
        >
          <div className="why-card-overlay" />
          <div className="why-card-inner why-card-inner-dark">
            <h3 className="why-card-title">BSE-Listed Credibility</h3>
            <p className="why-card-body">Publicly listed on the Bombay Stock Exchange (Code: 539528), reflecting our commitment to transparency, governance, and long-term trust.</p>
          </div>
        </div>

        {/* Card 3 - White, 40+ stat */}
        <div className="why-card why-card-white reveal reveal-delay-2">
          <div className="why-card-inner">
            <div className="why-card-stat"><AnimatedCounter target={40} suffix="+" /></div>
            <div className="why-card-stat-label">Years of Trust</div>
            <p className="why-card-body">Established in 1984, Aayush Wellness has spent decades building trusted wellness solutions for evolving Indian lifestyles.</p>
          </div>
        </div>

        {/* Card 4 - White, Diversified */}
        <div className="why-card why-card-white reveal reveal-delay-3">
          <div className="why-card-inner">
            <h3 className="why-card-title">Diversified Wellness Portfolio</h3>
            <p className="why-card-body">A growing portfolio spanning nutraceuticals, beauty wellness, herbal alternatives, and preventive lifestyle wellness solutions.</p>
          </div>
        </div>

        {/* Card 5 - Growing card with video background */}
        <div className="why-card why-card-teal reveal reveal-delay-4">
          {/* Background video */}
          <video
            className="why-card-video-bg"
            src="/growth.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Dark overlay */}
          <div className="why-card-overlay" />
          <div className="why-card-inner">

            <h3 className="why-card-title why-card-title-white">Growing</h3>
            <p className="why-card-body why-card-body-sub">Market Presence</p>
            <p className="why-card-body why-card-body-white">Expanding across digital commerce, and strategic distribution channels to make preventive wellness more accessible across India.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
