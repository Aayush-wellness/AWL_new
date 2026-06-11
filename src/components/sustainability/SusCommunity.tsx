"use client";

import React, { useState, useEffect, useRef } from "react";

interface Slide {
  bgGradient?: string;
  dotGradient?: string;
  emoji?: string;
  title: string;
  body: string;
  image?: string;
}

const SLIDES: Slide[] = [
  {
    image: "/community-1.jpg",
    title: "Combating malnutrition in underserved communities",
    body: "Malnutrition remains one of India's most persistent and preventable health crises. Aayush Wellness addresses this through targeted nutritional supplement programmes and community food donation drives - delivering high-quality, science-backed nutrition to children and families in underserved regions where food security and health access remain critical challenges.",
  },
  {
    bgGradient: "linear-gradient(135deg,#1a2a1a 0%,#2a3a28 40%,#0e1a0e 100%)",
    dotGradient: "radial-gradient(ellipse 60% 80% at 50% 50%,rgba(60,120,60,.4) 0%,transparent 65%)",
    emoji: "🌺",
    title: "Empowering women's health across rural India",
    body: "Through dedicated women's wellness programmes, Aayush reaches mothers and young women in Tier 3 and Tier 4 cities with preventive health education, nutritional supplementation, and access to affordable healthcare solutions that address conditions commonly neglected in underserved communities.",
  },
  {
    bgGradient: "linear-gradient(135deg,#1a1a2a 0%,#282838 40%,#0e0e1a 100%)",
    dotGradient: "radial-gradient(ellipse 60% 80% at 50% 50%,rgba(60,60,120,.4) 0%,transparent 65%)",
    emoji: "📚",
    title: "Health literacy & preventive awareness campaigns",
    body: "Aayush Wellness drives grassroots health literacy initiatives that educate communities on preventive care, nutrition, and holistic well-being - shifting the healthcare conversation from reactive treatment to proactive lifestyle choices across every socioeconomic strata.",
  },
];

export function SusCommunity() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  };

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section id="community">
      <div className="community-header">
        <div className="reveal">
          <span className="community-tag">Community Impact</span>
        </div>
        <h2 className="community-title reveal d1">
          Wellness That Reaches<br />Every Corner Of India
        </h2>
      </div>

      <div className="slider-outer">
        <div className="slider-wrap">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map((slide, idx) => (
              <div className="slide" key={idx}>
                <div className="slide-img">
                  {slide.image ? (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: slide.bgGradient,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{ position: "absolute", inset: 0, background: slide.dotGradient }} />
                      <span style={{ fontSize: "100px", position: "relative", zIndex: 1 }}>
                        {slide.emoji}
                      </span>
                    </div>
                  )}
                </div>
                <div className="slide-content">
                  <h3 className="slide-title">{slide.title}</h3>
                  <p className="slide-body">{slide.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav arrows float in the dark areas outside the carousel */}
        <button
          className="slider-btn slider-prev"
          onClick={() => goTo(current - 1)}
          aria-label="Previous slide"
        ><svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M6.7845 13.569L8.0493 12.2676L3.4662 7.6845H18V5.8845H3.4662L8.0493 1.3014L6.7845 0L0 6.7845L6.7845 13.569Z" fill="white" />
          </svg></button>
        <button
          className="slider-btn slider-next"
          onClick={() => goTo(current + 1)}
          aria-label="Next slide"
        ><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
            <path d="M16.6159 21.1847L15.3511 19.8833L19.9342 15.3002H5.40039V13.5002H19.9342L15.3511 8.91712L16.6159 7.61572L23.4004 14.4002L16.6159 21.1847Z" fill="white" />
          </svg></button>
      </div>

      {/* Dots */}
      <div className="slider-dots">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            className={`slider-dot${current === idx ? " active" : ""}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
