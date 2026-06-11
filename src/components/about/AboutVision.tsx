"use client"

import React, { useEffect, useRef, useState } from "react";

export function AboutVision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Progress goes from 0 (sticky start) to 1 (sticky end)
      const p = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Calculate opacities and translation values based on scroll progress

  // Background 2 (Leaf/Swimmer) translateY percentage (100 is below screen, 0 is fully covering)
  let bg2TranslateY = 100;
  if (progress > 0.35) {
    bg2TranslateY = Math.max(0, 100 - ((progress - 0.35) / 0.2) * 100);
  }

  // Card 1 (Vision) Position & Opacity
  let card1Opacity = 0;
  let card1TranslateY = 120; // starts 120px down

  if (progress < 0.1) {
    const ratio = progress / 0.1;
    card1Opacity = ratio;
    card1TranslateY = 120 - ratio * 120;
  } else if (progress >= 0.1 && progress < 0.4) {
    card1Opacity = 1;
    card1TranslateY = 0;
  } else if (progress >= 0.4 && progress < 0.5) {
    const ratio = (progress - 0.4) / 0.1;
    card1Opacity = 1 - ratio;
    card1TranslateY = -ratio * 120; // slide up and out
  } else {
    card1Opacity = 0;
    card1TranslateY = -120;
  }

  // Card 2 (Purpose) Position & Opacity
  let card2Opacity = 0;
  let card2TranslateY = 120;

  if (progress >= 0.5 && progress < 0.6) {
    const ratio = (progress - 0.5) / 0.1;
    card2Opacity = ratio;
    card2TranslateY = 120 - ratio * 120;
  } else if (progress >= 0.6) {
    card2Opacity = 1;
    card2TranslateY = 0;
  }

  return (
    <div className="vision-scroll-container" ref={containerRef}>
      <div className="vision-sticky-frame">
        {/* Slide 1 Background (Yoga silhouette) */}
        <div
          className="vision-bg-slide yoga-slide"
          style={{ transform: "translateY(0)" }}
        >
          <div className="vision-bg-img yoga-img"></div>
          <div className="vision-overlay"></div>
        </div>

        {/* Slide 2 Background (Leaf texture) */}
        <div
          className="vision-bg-slide leaf-slide"
          style={{ transform: `translateY(${bg2TranslateY}%)` }}
        >
          <div className="vision-bg-img leaf-img"></div>
          <div className="vision-overlay"></div>
        </div>

        {/* Contents */}
        <div className="vision-content-wrapper">
          {/* Card 1: Our Vision */}
          <div
            className="vision-card"
            style={{
              opacity: card1Opacity,
              transform: `translate(-50%, calc(-50% + ${card1TranslateY}px))`,
              pointerEvents: card1Opacity > 0.1 ? "auto" : "none",
              display: card1Opacity > 0 ? "grid" : "none"
            }}
          >
            <div className="vision-label">Our Vision</div>
            <div className="vision-text">
              To create a world where health is defined by prevention, not just treatment.
              We envision empowering every individual with accessible healthcare, science-backed nutrition,
              and holistic wellness solutions - bridging the gap between modern medicine and nature's wisdom
              to make proactive health a daily reality for all.
            </div>
          </div>

          {/* Card 2: Our Purpose */}
          <div
            className="purpose-card"
            style={{
              opacity: card2Opacity,
              transform: `translate(-50%, calc(-50% + ${card2TranslateY}px))`,
              pointerEvents: card2Opacity > 0.1 ? "auto" : "none",
              display: card2Opacity > 0 ? "grid" : "none"
            }}
          >
            <div className="purpose-label">Our Purpose</div>
            <div className="purpose-text">
              To develop and deliver high-quality nutraceuticals, herbal wellness alternatives,
              and preventive healthcare services that support long-term well-being. Through rigorous
              scientific research, uncompromising quality, and a people-first approach - we make
              wellness simple, effective, and accessible to everyone.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
