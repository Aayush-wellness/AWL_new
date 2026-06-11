"use client";

import React, { useEffect, useRef, useState } from "react";

export function AboutStory() {
  const tlWrapRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState("0%");

  useEffect(() => {
    const handleScroll = () => {
      const tlWrap = tlWrapRef.current;
      if (!tlWrap) return;

      const rect = tlWrap.getBoundingClientRect();
      const total = tlWrap.offsetHeight;
      const visible = Math.min(window.innerHeight - rect.top, total);
      const pct = Math.max(0, Math.min(100, (visible / total) * 100));

      setFillHeight(`${pct}%`);
    };

    window.addEventListener("scroll", handleScroll);
    // Initialize height on load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="story">
      <div className="story-header">
        <div className="reveal">
          <span className="story-tag">Our Story</span>
        </div>
        <h2 className="story-title reveal d1">
          Four decades of evolution.<br />One unwavering purpose.
        </h2>
      </div>

      {/* Timeline */}
      <div className="timeline-wrap" ref={tlWrapRef}>
        <div className="timeline-line">
          <div
            className="timeline-line-fill"
            id="tlFill"
            style={{ height: fillHeight }}
          ></div>
        </div>

        {/* 1984 */}
        <div className="timeline-item">
          <div className="timeline-left reveal reveal-left"></div>
          <div className="timeline-center">
            <div className="year-badge">1984</div>
          </div>
          <div className="timeline-right reveal reveal-right">
            <h3 className="tl-title">Where it began</h3>
            <p className="tl-body">
              Aayush Wellness was founded as a trading company, exporting agricultural commodities and food products.
              These early years built the foundation of operational discipline, quality standards, and a long-term growth mindset.
            </p>
          </div>
        </div>

        {/* 1987 */}
        <div className="timeline-item">
          <div className="timeline-left reveal reveal-left">
            <h3 className="tl-title">Listed on the Bombay Stock Exchange</h3>
            <p className="tl-body">
              A defining milestone - Aayush Wellness Limited was listed on the BSE, establishing our commitment to
              transparency, accountability, and long-term value creation for shareholders.
            </p>
          </div>
          <div className="timeline-center">
            <div className="year-badge">1987</div>
          </div>
          <div className="timeline-right reveal reveal-right"></div>
        </div>

        {/* 2016 */}
        <div className="timeline-item">
          <div className="timeline-left reveal reveal-left"></div>
          <div className="timeline-center">
            <div className="year-badge">2016</div>
          </div>
          <div className="timeline-right reveal reveal-right">
            <h3 className="tl-title">A new vision takes shape</h3>
            <p className="tl-body">
              Under the leadership of Ms. Pallavi Mittal, who acquired a controlling stake, the company began a
              strategic pivot - shifting its entire focus toward preventive healthcare and holistic wellness.
              The vision was clear: make proactive health accessible to all.
            </p>
          </div>
        </div>

        {/* 2022 */}
        <div className="timeline-item">
          <div className="timeline-left reveal reveal-left">
            <h3 className="tl-title">Rebranded. Refocused.Reimagined.</h3>
            <p className="tl-body">
              The company was formally rebranded as Aayush Wellness Limited, consolidating its identity around
              three pillars - Healthcare, Nutrition, and Wellness - and setting the stage for a new era of innovation.
            </p>
          </div>
          <div className="timeline-center">
            <div className="year-badge">2022</div>
          </div>
          <div className="timeline-right reveal reveal-right"></div>
        </div>

        {/* 2023 */}
        <div className="timeline-item">
          <div className="timeline-left reveal reveal-left"></div>
          <div className="timeline-center">
            <div className="year-badge">2023</div>
          </div>
          <div className="timeline-right reveal reveal-right">
            <h3 className="tl-title">Smart preventive healthcare, launched</h3>
            <p className="tl-body">
              Aayush introduced Smart Preventive Healthcare services and personalised consultation models,
              enabling individuals to take a proactive approach to their health through technology and accessible care.
            </p>
          </div>
        </div>

        {/* 2024 */}
        <div className="timeline-item">
          <div className="timeline-left reveal reveal-left">
            <h3 className="tl-title">Nutraceuticals, herbal solutions &amp; beyond</h3>
            <p className="tl-body">
              The company launched a full range of science-backed nutraceuticals, herbal wellness products, and
              AI-assisted health assessment tools - reaching over 100,000 customers across Tier 1 to Tier 4 cities nationwide.
            </p>
          </div>
          <div className="timeline-center">
            <div className="year-badge">2024</div>
          </div>
          <div className="timeline-right reveal reveal-right"></div>
        </div>
      </div>
    </section>
  );
}
