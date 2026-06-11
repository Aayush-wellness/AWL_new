"use client";

import React, { useState, useEffect, useRef } from "react";

const stages = [
  {
    label: "Stage 1",
    dotType: "acc-dot-lime",
    title: "Application Screening",
    desc: "Initial Application Review",
    criteria: "Criteria Focus",
    tags: ["Problem Clarity", "Founding Team"],
  },
  {
    label: "Stage 2",
    dotType: "acc-dot-dark",
    title: "Business & Market Review",
    desc: "Market And Business Assessment",
    criteria: "Criteria Focus",
    tags: ["Market Opportunity", "Business Model"],
  },
  {
    label: "Stage 3",
    dotType: "acc-dot-gray",
    title: "Founder Interaction",
    desc: "Founder Discussion And Evaluation",
    criteria: "Criteria Focus",
    tags: ["Vision & Execution", "Strategic Fit"],
  },
  {
    label: "Stage 4",
    dotType: "acc-dot-lime",
    title: "Due Diligence",
    desc: "Detailed Business Review",
    criteria: "Criteria Focus",
    tags: ["Scalability", "Commercial Viability"],
  },
  {
    label: "Stage 5",
    dotType: "acc-dot-dark",
    title: "Investment Decision",
    desc: "Final Selection And Onboarding",
    criteria: "Criteria Focus",
    tags: ["Long-Term Potential", "Investment Alignment"],
  },
];

/* Decorative tab styles matching the original HTML design */
const defaultTabStyle = (idx: number) => {
  if (idx === 1 || idx === 4) return "acc-stage-tab tab-active-dark";
  if (idx === 3) return "acc-stage-tab tab-active-lime";
  return "acc-stage-tab";
};

export function AccEvaluation() {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Initial check and resize listener
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 1100);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTrackHeight = rect.height - window.innerHeight;
      if (scrollTrackHeight <= 0) return;

      // Calculate progress clamped between 0 and 1
      const p = -rect.top / scrollTrackHeight;
      const clampedP = Math.max(0, Math.min(1, p));
      setProgress(clampedP);

      // Automatically highlight active tab based on scroll progress
      let currentStage = null;
      if (clampedP >= 0.02 && clampedP < 0.21) currentStage = 0;
      else if (clampedP >= 0.21 && clampedP < 0.39) currentStage = 1;
      else if (clampedP >= 0.39 && clampedP < 0.57) currentStage = 2;
      else if (clampedP >= 0.57 && clampedP < 0.75) currentStage = 3;
      else if (clampedP >= 0.75) currentStage = 4;

      setActiveTab(currentStage);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  const handleTabClick = (idx: number) => {
    if (!containerRef.current || !isDesktop) {
      setActiveTab(activeTab === idx ? null : idx);
      return;
    }

    // Scroll container to trigger the cascade animation up to clicked tab's stage
    const targetProgress = 0.18 + idx * 0.18; // point near end of stage reveal
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTrackHeight = rect.height - window.innerHeight;

    if (scrollTrackHeight > 0) {
      const containerTopInPage = window.scrollY + rect.top;
      const targetScrollY = containerTopInPage + targetProgress * scrollTrackHeight;
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  const getTabClass = (idx: number) => {
    if (activeTab !== null) {
      if (activeTab === idx) {
        return idx === 3 ? "acc-stage-tab tab-active-lime" : "acc-stage-tab tab-active-dark";
      }
      return "acc-stage-tab";
    }
    return defaultTabStyle(idx);
  };

  return (
    <section ref={containerRef} className="acc-eval">
      <div className="acc-eval-sticky">
        <div className="acc-eval-content">
          {/* Header */}
          <div className="acc-eval-header">
            <div className="reveal">
              <span className="acc-eval-tag">Evaluation Process</span>
            </div>
            <h2 className="acc-eval-title reveal reveal-delay-1">Our Evaluation Journey</h2>
          </div>

          {/* Stage tabs - decorative by default, interactive on click */}
          <div className="acc-stage-tabs reveal">
            {stages.map((s, idx) => (
              <button
                key={s.label}
                className={getTabClass(idx)}
                onClick={() => handleTabClick(idx)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Steps - cascading waterfall layout */}
          <div className="acc-steps reveal reveal-delay-1">
            {stages.map((s, i) => {
              // Calculate scroll animations for desktop
              const start = 0.05 + i * 0.18;
              const end = 0.20 + i * 0.18;
              const lineProgress = Math.max(0, Math.min(1, (progress - start) / (end - start)));

              // Dot and content appear as the line finishes growing (last 30% of range)
              const contentProgress = Math.max(0, Math.min(1, (lineProgress - 0.7) / 0.3));

              const targetHeights = [80, 180, 280, 380, 480];

              const lineStyle = isDesktop ? { height: `${lineProgress * targetHeights[i]}px` } : {};
              const dotStyle = isDesktop ? { opacity: contentProgress, transform: `scale(${contentProgress})` } : {};
              const contentStyle = isDesktop ? {
                opacity: contentProgress,
                transform: `translateY(${(1 - contentProgress) * 20}px)`,
                transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
              } : {};

              return (
                <div className="acc-step-col" key={s.label}>
                  {/* Dashed vertical line - height grows on scroll */}
                  <div className="acc-step-line" style={lineStyle} />

                  {/* Dot at bottom of line */}
                  <div className={`acc-step-dot ${s.dotType}`} style={dotStyle} />

                  {/* Content below dot */}
                  <div className="acc-step-content" style={contentStyle}>
                    <div className="acc-step-title">{s.title}</div>
                    <div className="acc-step-desc">{s.desc}</div>
                    <div className="acc-step-criteria">{s.criteria}</div>
                    <div className="acc-step-tags">
                      {s.tags.map((t) => (
                        <span className="acc-step-tag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
