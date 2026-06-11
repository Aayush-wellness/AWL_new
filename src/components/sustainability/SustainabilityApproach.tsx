"use client";

import React, { useState } from "react";

const items = [
  {
    title: "Ethical ingredient sourcing",
    emoji: "🌿",
    text: "Every botanical, herb, and active ingredient in our formulations is responsibly and ethically sourced. We work directly with suppliers who share our commitment to fair practices, biodiversity preservation, and zero exploitation of natural resources.",
  },
  {
    title: "Sustainable packaging",
    emoji: "📦",
    text: "We are progressively transitioning our packaging to eco-friendly, recyclable, and low-waste materials - reducing our environmental footprint without compromising the integrity or shelf life of our products.",
  },
  {
    title: "Clean formulation standards",
    emoji: "🔬",
    text: "Our products are non-GMO, free from harmful additives, and manufactured in compliance with the highest quality benchmarks. What is good for people must also be good for the planet - our formulation philosophy reflects this without exception.",
  },
  {
    title: "Preserving traditional botanical knowledge",
    emoji: "🪴",
    text: "We actively document, protect, and utilise centuries-old Ayurvedic and herbal knowledge - ensuring it is not lost to commercialisation, but rather preserved, validated by science, and made accessible to modern generations.",
  },
];

const delays = ["", " reveal-delay-1", " reveal-delay-2", " reveal-delay-3"];

export function SustainabilityApproach() {
  const [activeIdx, setActiveIdx] = useState(0);

  const toggle = (idx: number) => {
    setActiveIdx((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id="sus-approach">
      {/* decorative hexagon shapes */}
      <div className="sus-approach-bg-shape" aria-hidden="true">
        <svg viewBox="0 0 300 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 10 L290 80 L290 220 L150 290 L10 220 L10 80 Z" stroke="#000" strokeWidth="1.5" />
          <path d="M150 160 L290 230 L290 370 L150 440 L10 370 L10 230 Z" stroke="#000" strokeWidth="1" />
          <path d="M150 310 L290 380 L290 520 L150 590 L10 520 L10 380 Z" stroke="#000" strokeWidth=".8" />
        </svg>
      </div>

      <div className="sus-approach-header">
        <div className="reveal">
          <span className="sus-approach-tag">Our Sustainability Approach</span>
        </div>
        <h2 className="sus-approach-title reveal reveal-delay-1">
          Responsible By Design.<br />Not By Obligation
        </h2>
      </div>

      <div className="sus-accordion-list">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`sus-accordion-item reveal${delays[idx]}${activeIdx === idx ? " active" : ""}`}
          >
            <div className="sus-accordion-header" onClick={() => toggle(idx)}>
              <span className="sus-accordion-title">{item.title}</span>
              <div className="sus-accordion-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 20L3 12M3 12L11 4M3 12L21 12" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>

            <div className="sus-accordion-body">
              <div className="sus-accordion-inner">
                {/* spacer - hidden on mobile */}
                <div className="sus-accordion-spacer" />
                <div className="sus-accordion-img">{item.emoji}</div>
                <p className="sus-accordion-text">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
