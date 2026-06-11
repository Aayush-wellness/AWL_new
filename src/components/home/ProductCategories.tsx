"use client";

import React, { useState, useRef, useCallback } from "react";
import { SectionTag } from "@/components/ui/SectionTag";

const PRODUCTS = [
  {
    id: 1,
    name: "Nutraceuticals & Daily Wellness",
    image: "/Pill.jpg",
    description:
      "Science-backed supplements and gummies designed to support immunity, sleep, brain health, gut wellness, and everyday vitality through a blend of Ayurveda and modern nutrition.",
    tags: ["Immunity", "Sleep", "Brain Health", "Gut Wellness"],
    link: "#",
  },
  {
    id: 2,
    name: "Preventive Healthcare Solutions",
    image: "/products_1.jpg",
    description:
      "Preventive wellness formulations focused on supporting long-term health, lifestyle balance, metabolic wellness, and daily nutritional care.",
    tags: ["Daily Wellness", "Metabolic Support", "Liver Care", "Lifestyle Health"],
    link: "#",
  },
  {
    id: 3,
    name: "Beauty & Skin Wellness",
    image: "/products_2.jpg",
    description:
      "Beauty-focused wellness solutions formulated to support healthier skin, hair, and nails from within using clinically studied ingredients and essential nutrients.",
    tags: ["Skin Wellness", "Hair & Nails", "Beauty Gummies"],
    link: "#",
  },
  {
    id: 4,
    name: "Herbal Wellness Alternatives",
    image: "/products_3.jpg",
    description:
      "Herbal wellness alternatives crafted to encourage healthier lifestyle choices through tobacco-free, Ayurveda-inspired formulations.",
    tags: ["Herbal Masala", "Tobacco-Free", "Ayurvedic Blend"],
    link: "#",
  },
  {
    id: 5,
    name: "Smart Diagnostics & Health Access",
    image: "/Diagnostic.jpg",
    description:
      "Expanding healthcare accessibility through smart diagnostic initiatives, rapid health assessments, and technology-enabled preventive care experiences.",
    tags: ["Diagnostics", "Preventive Care", "Labs"],
    link: "#",
  },
];

const TOTAL = PRODUCTS.length;

export function ProductCategories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(TOTAL - 1);
  const productsGridRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<any>(null);

  // Dynamically compute the maximum scroll index (e.g. index 2 on desktop when 3 cards are visible)
  const updateMaxIndex = useCallback(() => {
    const grid = productsGridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.children) as HTMLElement[];
    const maxScrollLeft = grid.scrollWidth - grid.clientWidth;

    // Find the first index where scrolling to it aligns with the end of the carousel
    const index = cards.findIndex(
      (card) => card.offsetLeft >= maxScrollLeft - 10
    );
    setMaxIndex(index !== -1 ? index : TOTAL - 1);
  }, []);

  React.useEffect(() => {
    updateMaxIndex();
    // Use a small delay to ensure rendering and flex styles have settled
    const timer = setTimeout(updateMaxIndex, 100);
    window.addEventListener("resize", updateMaxIndex);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateMaxIndex);
    };
  }, [updateMaxIndex]);

  // Cap activeIndex if it exceeds the calculated maxIndex on resize
  React.useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
    }
  }, [maxIndex, activeIndex]);

  // Progress fill: maps current index to a percentage across the bar
  const progressPercent = maxIndex > 0 ? (activeIndex / maxIndex) * 100 : 0;

  const scrollToIndex = useCallback((index: number) => {
    const grid = productsGridRef.current;
    if (!grid) return;
    const cards = grid.children;
    if (!cards[index]) return;
    const card = cards[index] as HTMLElement;

    isScrollingRef.current = true;
    grid.scrollTo({ left: card.offsetLeft, behavior: "smooth" });

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  }, []);

  const nextProduct = () => {
    const next = Math.min(activeIndex + 1, maxIndex);
    setActiveIndex(next);
    scrollToIndex(next);
  };

  const prevProduct = () => {
    const prev = Math.max(activeIndex - 1, 0);
    setActiveIndex(prev);
    scrollToIndex(prev);
  };

  // Sync active index when user manually scrolls
  const handleScroll = () => {
    if (isScrollingRef.current) return;
    const grid = productsGridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.children) as HTMLElement[];
    const scrollCenter = grid.scrollLeft + grid.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(cardCenter - scrollCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    // Cap the active index to maxIndex (the last scroll position)
    setActiveIndex(Math.min(closest, maxIndex));
  };

  return (
    <section id="products">
      <div className="products-header reveal">
        <div className="products-header-left">
          <SectionTag num="02" label="Product Category" theme="dark" />
        </div>
        <div className="products-header-right">
          <h2 className="products-title">Integrated Wellness Portfolio</h2>
          <p className="products-desc">
            We do not offer a single product or a single service. Aayush Wellness is a complete
            preventive health platform - integrating nutraceuticals, herbal wellness, and accessible
            healthcare under one trusted brand.
          </p>
        </div>
      </div>

      <div
        className="products-grid"
        ref={productsGridRef}
        onScroll={handleScroll}
      >
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card reveal">
            <div className="product-img">
              <div className="product-img-inner">
                <img src={product.image} alt={product.name} />
              </div>
              <a href={product.link} className="product-card-link">↗</a>
            </div>
            <div className="product-body">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <div className="product-tags">
                {product.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="products-nav reveal">
        <button
          className="nav-arrow"
          onClick={prevProduct}
          disabled={activeIndex === 0}
          aria-label="Previous product"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none" style={{ transform: "rotate(180deg)" }}>
            <path d="M3.6001 14.4H25.2001M16.8001 22.8L25.2001 14.4L16.8001 6" stroke="currentColor" strokeWidth="1.728" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="nav-progress">
          <div
            className="nav-progress-fill"
            style={{ width: `${Math.max(8, progressPercent)}%` }}
          />
        </div>
        <button
          className="nav-arrow"
          onClick={nextProduct}
          disabled={activeIndex >= maxIndex}
          aria-label="Next product"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
            <path d="M3.6001 14.4H25.2001M16.8001 22.8L25.2001 14.4L16.8001 6" stroke="currentColor" strokeWidth="1.728" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
