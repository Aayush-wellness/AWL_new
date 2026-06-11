"use client";

import React from "react";
import { SectionTag } from "@/components/ui/SectionTag";

// ─── Data types (ready for API replacement) ───────────────────────────────────
interface PressItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  link: string;
  hasImage?: boolean; // cards 1 & 3 show the animated dot visual
}

// ─── Static data (replace fetch logic here when API is ready) ─────────────────
const STATIC_PRESS_ITEMS: PressItem[] = [
  {
    id: "1",
    category: "Press Releases",
    title: "Aayush Wellness launches \"Liver Detox Tablets\" to capture growing demand in Preventive Wellness and Lifestyle Disease Management.",
    excerpt: "Launch aligns with rising fatty liver prevalence and a rapidly expanding nutraceutical market, reinforcing the Company's strategy to build condition-led preventive healthcare categories.",
    date: "03-04-2026",
    link: "#",
    hasImage: true,
  },
  {
    id: "2",
    category: "Press Releases",
    title: "Aayush Wellness Enters India's ₹366 Billion Metabolic Health Market with Launch of Aayush Dia Shield Tablets",
    excerpt: "Targets over 230 million Indians affected by diabetes and pre-diabetes with a preventive, science-backed wellness solution",
    date: "03-04-2026",
    link: "#",
    hasImage: false,
  },
  {
    id: "3",
    category: "Press Releases",
    title: "Strategic Collaboration With Healthrashi Nextgen India Limited To Deliver Integrated Healthcare Solutions",
    excerpt: "Strengthen Its Presence in India's USD 370 Billion Preventive Healthcare Market",
    date: "03-04-2026",
    link: "#",
    hasImage: false,
  },
  {
    id: "4",
    category: "Press Releases",
    title: "Aayush Wellness Strengthens Its Presence in the $18 Billion Nutraceutical Market with Launch of Immunity Booster Tablets.",
    excerpt: "Enhancing shareholder value through category expansion into India's fastest-growing wellness segment",
    date: "03-04-2026",
    link: "#",
    hasImage: true,
  },
];

// ─── Animated dot visual used in image cards ──────────────────────────────────
function DotVisual() {
  return <div className="press-dot-visual" />;
}

// ─── Single press card ────────────────────────────────────────────────────────
function PressCard({ item, position }: { item: PressItem; position: number }) {
  // Card 1: col-1, spans 2 rows - image on top, text on bottom
  if (position === 0) {
    return (
      <div className="press-card press-card-featured">
        <div className="press-img-container">
          <img src="/Background.png" alt="Press release" className="press-card-img" />
          <div className="press-notch-bottom"></div>
        </div>
        <div className="press-card-body">
          <p className="press-category">{item.category}</p>
          <h3 className="press-card-title">{item.title}</h3>
          <div className="press-excerpt-wrap">
            <p className="press-excerpt">{item.excerpt}</p>
            <span className="press-date">{item.date}</span>
          </div>
        </div>
        <a href={item.link} className="press-ext-link" aria-label="Read more">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6.19229 23.9163C5.60293 23.9163 5.10409 23.7122 4.69575 23.3038C4.28742 22.8955 4.08325 22.3967 4.08325 21.8073V6.19205C4.08325 5.60269 4.28742 5.10384 4.69575 4.69551C5.10409 4.28717 5.60293 4.08301 6.19229 4.08301H13.551V5.83301H6.19229C6.10246 5.83301 6.02021 5.87044 5.94554 5.9453C5.87068 6.01997 5.83325 6.10222 5.83325 6.19205V21.8073C5.83325 21.8971 5.87068 21.9794 5.94554 22.0541C6.02021 22.1289 6.10246 22.1663 6.19229 22.1663H21.8075C21.8974 22.1663 21.9796 22.1289 22.0543 22.0541C22.1292 21.9794 22.1666 21.8971 22.1666 21.8073V14.4486H23.9166V21.8073C23.9166 22.3967 23.7124 22.8955 23.3041 23.3038C22.8958 23.7122 22.3969 23.9163 21.8075 23.9163H6.19229ZM11.339 17.8899L10.1097 16.6606L20.9372 5.83301H16.3333V4.08301H23.9166V11.6663H22.1666V7.06238L11.339 17.8899Z" fill="currentColor" />
          </svg>
        </a>
      </div>
    );
  }

  // Card 4 (position 3): horizontal card spanning cols 2-3 in row 2 - image left, text right
  if (position === 3) {
    return (
      <div className="press-card press-card-horizontal">
        <div className="press-img-container">
          <img src="/pr-2.jpg" alt="Press release" className="press-card-img" />
          <div className="press-notch-right"></div>
        </div>
        <div className="press-card-horizontal-body">
          <div className="press-card-body">
            <p className="press-category">{item.category}</p>
            <h3 className="press-card-title">{item.title}</h3>
            <div className="press-excerpt-wrap">
              <p className="press-excerpt">{item.excerpt}</p>
              <span className="press-date">{item.date}</span>
            </div>
          </div>
          <a href={item.link} className="press-ext-link" aria-label="Read more">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6.19229 23.9163C5.60293 23.9163 5.10409 23.7122 4.69575 23.3038C4.28742 22.8955 4.08325 22.3967 4.08325 21.8073V6.19205C4.08325 5.60269 4.28742 5.10384 4.69575 4.69551C5.10409 4.28717 5.60293 4.08301 6.19229 4.08301H13.551V5.83301H6.19229C6.10246 5.83301 6.02021 5.87044 5.94554 5.9453C5.87068 6.01997 5.83325 6.10222 5.83325 6.19205V21.8073C5.83325 21.8971 5.87068 21.9794 5.94554 22.0541C6.02021 22.1289 6.10246 22.1663 6.19229 22.1663H21.8075C21.8974 22.1663 21.9796 22.1289 22.0543 22.0541C22.1292 21.9794 22.1666 21.8971 22.1666 21.8073V14.4486H23.9166V21.8073C23.9166 22.3967 23.7124 22.8955 23.3041 23.3038C22.8958 23.7122 22.3969 23.9163 21.8075 23.9163H6.19229ZM11.339 17.8899L10.1097 16.6606L20.9372 5.83301H16.3333V4.08301H23.9166V11.6663H22.1666V7.06238L11.339 17.8899Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  // Cards 2, 3 - text only (position 1 & 2)
  return (
    <div className="press-card press-card-text">
      <div className="press-card-body">
        <p className="press-category">{item.category}</p>
        <h3 className="press-card-title">{item.title}</h3>
        <div className="press-excerpt-wrap">
          <p className="press-excerpt">{item.excerpt}</p>
          <span className="press-date">{item.date}</span>
        </div>
      </div>
      <a href={item.link} className="press-ext-link" aria-label="Read more">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6.19229 23.9163C5.60293 23.9163 5.10409 23.7122 4.69575 23.3038C4.28742 22.8955 4.08325 22.3967 4.08325 21.8073V6.19205C4.08325 5.60269 4.28742 5.10384 4.69575 4.69551C5.10409 4.28717 5.60293 4.08301 6.19229 4.08301H13.551V5.83301H6.19229C6.10246 5.83301 6.02021 5.87044 5.94554 5.9453C5.87068 6.01997 5.83325 6.10222 5.83325 6.19205V21.8073C5.83325 21.8971 5.87068 21.9794 5.94554 22.0541C6.02021 22.1289 6.10246 22.1663 6.19229 22.1663H21.8075C21.8974 22.1663 21.9796 22.1289 22.0543 22.0541C22.1292 21.9794 22.1666 21.8971 22.1666 21.8073V14.4486H23.9166V21.8073C23.9166 22.3967 23.7124 22.8955 23.3041 23.3038C22.8958 23.7122 22.3969 23.9163 21.8075 23.9163H6.19229ZM11.339 17.8899L10.1097 16.6606L20.9372 5.83301H16.3333V4.08301H23.9166V11.6663H22.1666V7.06238L11.339 17.8899Z" fill="currentColor" />
        </svg>
      </a>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function PressReleases() {
  // TODO: Replace with API fetch:
  // const [items, setItems] = React.useState<PressItem[]>([]);
  // React.useEffect(() => { fetch('/api/press').then(r => r.json()).then(setItems); }, []);
  const items = STATIC_PRESS_ITEMS;

  // Grid positions:
  // [0] col-1 rows 1-2 - tall featured card (dot image top + text bottom)
  // [1] col-2 row-1 - text card
  // [2] col-3 row-1 - text card
  // [3] cols 2-3 row-2 - horizontal card (dot image left | text right)

  return (
    <section id="news">
      {/* Header */}
      <div className="news-header reveal">
        <div className="news-header-left">
          <SectionTag num="06" label="In The News" theme="dark" />
        </div>
        <div className="news-header-right">
          <h2 className="news-title">As Covered By Leading Publications</h2>
          <a href="/news" className="view-all-btn">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 34 34" fill="none">
              <path d="M16.9706 24.0415L24.0416 16.9705L16.9706 9.89941M24.0416 16.9705H9.89949" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* 3-col 2-row grid */}
      <div className="news-grid">
        {/* Col 1, rows 1-2: tall featured card */}
        <PressCard item={items[0]} position={0} />

        {/* Col 2, row 1: text card */}
        <PressCard item={items[1]} position={1} />

        {/* Col 3, row 1: text card */}
        <PressCard item={items[2]} position={2} />

        {/* Cols 2-3, row 2: single horizontal card (image left | text right) */}
        <PressCard item={items[3]} position={3} />
      </div>
    </section>
  );
}
