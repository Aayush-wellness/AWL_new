"use client";
import React, { useEffect, useRef, useState } from "react";
import { AyuTag } from "@/components/ui/AyuTag";

interface PrincipleItem {
  id: number;
  title: string;
  body: string;
}

const principlesData: PrincipleItem[] = [
  {
    id: 1,
    title: "Advanced Ayurvedic formulations",
    body: "We combine timeless Ayurvedic wisdom with modern research to create formulations focused on effectiveness, safety, and better absorption - designed to work in harmony with the body.",
  },
  {
    id: 2,
    title: "Pure & potent botanical extracts",
    body: "Our extraction methods preserve the natural strength and bioactive compounds of every herb, ensuring maximum potency and efficacy.",
  },
  {
    id: 3,
    title: "Holistic wellness by design",
    body: "Our formulations support overall wellness by addressing interconnected areas like sleep, digestion, immunity, cognition, and vitality together.",
  },
  {
    id: 4,
    title: "Sustainable & ethical sourcing",
    body: "We partner with responsible suppliers who follow ethical cultivation and sustainable sourcing practices to protect both people and nature.",
  },
];

export function AyuPrinciples() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set([0, 1]));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleIndices((prev) => {
              const next = new Set(prev);
              next.add(index);
              return next;
            });
          }
        });
      },
      {
        root: container,
        threshold: 0.1,
        rootMargin: "5px 0px 5px 0px",
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="ayu-principles">
      <AyuTag label="Our Approach" theme="light" className="reveal" />
      <div className="ayu-principles-grid">
        {/* Left Side: Overlapping Images and Badge */}
        <div className="ayu-principles-left">
          <div className="ayu-principles-img-wrap">
            <div className="ayu-principles-img-top">
              <img src="/assets/images/product_beauty.png" alt="Lotus Leaf" />
            </div>

            <div className="ayu-principles-badge">
              <span>100%</span>
              VEGAN
            </div>

            <div className="ayu-principles-img-bottom">
              <img src="/assets/images/product_nutrition.png" alt="Vegan Capsules" />
            </div>
          </div>
        </div>

        {/* Right Side: Core Principles content */}
        <div className="ayu-principles-right">
          <h2 className="ayu-principles-title">
            Four Principles That Define How We Formulate.
          </h2>

          <p className="ayu-principles-desc">
            Our approach to modern Ayurveda is not about repackaging age-old recipes. It is about applying the discipline of modern science to ancient intelligence - with full transparency at every step.
          </p>

          <div className="ayu-principles-cards" ref={containerRef}>
            {principlesData.map((item, idx) => {
              const isVisible = visibleIndices.has(idx);
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  data-index={idx}
                  className={`ayu-principles-card${isVisible ? " is-visible" : ""}`}
                >
                  <div className="ayu-principles-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                      <path d="M15.2879 28.028C22.3241 28.028 28.028 22.3241 28.028 15.2879C28.028 8.25178 22.3241 2.54785 15.2879 2.54785C8.25178 2.54785 2.54785 8.25178 2.54785 15.2879C2.54785 22.3241 8.25178 28.028 15.2879 28.028Z" stroke="#E0E0E0" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.4658 15.288L14.0138 17.836L19.1099 12.74" stroke="#E0E0E0" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="ayu-principles-card-content">
                    <h3 className="ayu-principles-card-title">{item.title}</h3>
                    <p className="ayu-principles-card-body">{item.body}</p>
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
