"use client";

import React, { useState, useEffect, useCallback } from "react";

const slides = [
  {
    bg: "linear-gradient(135deg,#2a1a10 0%,#3a2218 40%,#1a1008 100%)",
    radial: "rgba(160,100,60,.5)",
    emoji: "👨‍👩‍👧‍👦",
    title: "Combating malnutrition in underserved communities",
    body: "Malnutrition remains one of India's most persistent and preventable health crises. Aayush Wellness addresses this through targeted nutritional supplement programmes and community food donation drives - delivering high-quality, science-backed nutrition to children and families in underserved regions where food security and health access remain critical challenges.",
  },
  {
    bg: "linear-gradient(135deg,#1a2a1a 0%,#2a3a28 40%,#0e1a0e 100%)",
    radial: "rgba(60,120,60,.4)",
    emoji: "🌺",
    title: "Empowering women's health across rural India",
    body: "Through dedicated women's wellness programmes, Aayush reaches mothers and young women in Tier 3 and Tier 4 cities with preventive health education, nutritional supplementation, and access to affordable healthcare solutions that address conditions commonly neglected in underserved communities.",
  },
  {
    bg: "linear-gradient(135deg,#1a1a2a 0%,#282838 40%,#0e0e1a 100%)",
    radial: "rgba(60,60,120,.4)",
    emoji: "📚",
    title: "Health literacy & preventive awareness campaigns",
    body: "Aayush Wellness drives grassroots health literacy initiatives that educate communities on preventive care, nutrition, and holistic well-being - shifting the healthcare conversation from reactive treatment to proactive lifestyle choices across every socioeconomic strata.",
  },
];

export function CommunityImpact() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="sus-community">
      <div className="sus-community-header">
        <div className="reveal">
          <span className="sus-community-tag">Community Impact</span>
        </div>
        <h2 className="sus-community-title reveal reveal-delay-1">
          Wellness That Reaches<br />Every Corner Of India
        </h2>
      </div>

      <div className="sus-slider-wrap">
        <div
          className="sus-slider"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div className="sus-slide" key={idx}>
              {/* image panel */}
              <div className="sus-slide-img">
                <div
                  style={{
                    position: "absolute", inset: 0,
                    background: slide.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute", inset: 0,
                      background: `radial-gradient(ellipse 60% 80% at 45% 55%, ${slide.radial} 0%, transparent 65%)`,
                    }}
                  />
                  <span style={{ fontSize: 100, position: "relative", zIndex: 1 }}>
                    {slide.emoji}
                  </span>
                </div>
              </div>

              {/* content panel */}
              <div className="sus-slide-content">
                <h3 className="sus-slide-title">{slide.title}</h3>
                <p className="sus-slide-body">{slide.body}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="sus-slider-btn sus-slider-prev" onClick={prev} aria-label="Previous slide">
          ←
        </button>
        <button className="sus-slider-btn sus-slider-next" onClick={next} aria-label="Next slide">
          →
        </button>
      </div>

      {/* dot indicators */}
      <div className="sus-slider-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`sus-dot${current === idx ? " active" : ""}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
