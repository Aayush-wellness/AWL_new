"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface AccordionItem {
  title: string;
  text: string;
  emoji: string;
  imgSrc?: string;
  imgAlt?: string;
}

const ITEMS: AccordionItem[] = [
  {
    title: "Ethical ingredient sourcing",
    text: "Every botanical, herb, and active ingredient in our formulations is responsibly and ethically sourced. We work directly with suppliers who share our commitment to fair practices, biodiversity preservation, and zero exploitation of natural resources.",
    emoji: "🌿",
    imgSrc: "/assets/images/sustainability/ingredient-sourcing.jpg",
    imgAlt: "Hands picking fresh herbs",
  },
  {
    title: "Sustainable packaging",
    text: "We are progressively transitioning our packaging to eco-friendly, recyclable, and low-waste materials - reducing our environmental footprint without compromising the integrity or shelf life of our products.",
    emoji: "📦",
    imgSrc: "/assets/images/sustainability/packaging.jpg",
    imgAlt: "Eco-friendly packaging on conveyor",
  },
  {
    title: "Clean formulation standards",
    text: "Our products are non-GMO, free from harmful additives, and manufactured in compliance with the highest quality benchmarks. What is good for people must also be good for the planet - our formulation philosophy reflects this without exception.",
    emoji: "🔬",
    imgSrc: "/assets/images/sustainability/formulation.jpg",
    imgAlt: "Scientist in clean laboratory",
  },
  {
    title: "Preserving traditional botanical knowledge",
    text: "We actively document, protect, and utilise centuries-old Ayurvedic and herbal knowledge - ensuring it is not lost to commercialisation, but rather preserved, validated by science, and made accessible to modern generations.",
    emoji: "🪴",
    imgSrc: "/assets/images/sustainability/botanical.jpg",
    imgAlt: "Ancient Ayurvedic herbs in sunlight",
  },
];

export function SusApproach() {
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (idx: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveIdx(idx);
    }, 120); // 120ms debounce to prevent boundary flickering
  };

  const handleMouseLeaveList = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveIdx(-1);
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="approach">
      {/* Background decoration */}
      <div className="approach-bg-shape" aria-hidden="true">
        <img src="/Geometric Element.png" alt="" />
      </div>

      <div className="approach-header">
        <div className="reveal">
          <span className="approach-tag">Our Sustainability Approach</span>
        </div>
        <h2 className="approach-title reveal d1">
          Responsible By Design.<br />Not By Obligation
        </h2>
      </div>

      <div className="accordion-list" onMouseLeave={handleMouseLeaveList}>
        {ITEMS.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={idx}
              className={`accordion-item${isActive ? " is-open" : ""}`}
              onMouseEnter={() => handleMouseEnter(idx)}
            >
              <div className="accordion-content">
                {/* Title - always visible on the left */}
                <div className="accordion-title-col">
                  <span
                    className="accordion-title"
                    style={
                      isActive
                        ? {
                          textDecoration: "underline",
                          textDecorationColor: "var(--lime)",
                          textDecorationThickness: "3px",
                          textUnderlineOffset: "6px",
                        }
                        : {}
                    }
                  >
                    {item.title}
                  </span>
                </div>

                {/* Right side: image + text pushed to far right, arrow shown when collapsed */}
                <div className="accordion-right">
                  {/* Image - animates from 0×0 to full size on hover */}
                  <div className="accordion-media">
                    {item.imgSrc ? (
                      <Image
                        src={item.imgSrc}
                        alt={item.imgAlt ?? item.title}
                        width={300}
                        height={220}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) parent.textContent = item.emoji;
                        }}
                      />
                    ) : (
                      item.emoji
                    )}
                  </div>

                  {/* Description - fades in on hover */}
                  <p className="accordion-desc">{item.text}</p>

                  {/* Arrow - visible only when collapsed */}
                  <div className="accordion-arrow" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 32 24" fill="none">
                      <path d="M11.7786 23.5573L13.9745 21.2979L6.01771 13.3411H31.25V10.2161H6.01771L13.9745 2.25938L11.7786 0L0 11.7786L11.7786 23.5573Z" fill="#E0E0E0" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
