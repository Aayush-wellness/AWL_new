"use client";

import React, { useState } from "react";
import { SectionTag } from "@/components/ui/SectionTag";

const BEYOND_ITEMS = [
  {
    id: "Accelerator",
    title: "Accelerator",
    description:
      "Supporting emerging wellness brands with capital, infrastructure, and strategic guidance to scale effectively across India.",
    image: "/Frame_1025.png",
    link: "/accelerator",
  },
  {
    id: "Investor Ecosystem",
    title: "Investor Ecosystem",
    description:
      "Enabling long-term growth through strategic investment opportunities and transparent engagement.",
    image: "/Frame_1026.png",
    link: "/investors",
  },
  {
    id: "Impact & Sustainability",
    title: "Impact & Sustainability",
    description:
      "Focused on responsible sourcing, conscious production, and creating long-term health and environmental impact.",
    image: "/Inside_AW.png",
    link: "/sustainability",
  },
  {
    id: "Research & Innovation",
    title: "Research & Innovation",
    description:
      "Combining ancient Ayurvedic knowledge with cutting-edge nutritional science to develop next-generation wellness formulations.",
    image: "/Frame_1022.png",
    link: "#",
  },
];

export function BuildingFuture() {
  const [activeId, setActiveId] = useState("Accelerator");
  const [imgOpacity, setImgOpacity] = useState(1);

  const handleTabClick = (id: string) => {
    if (id === activeId) return;
    setImgOpacity(0);
    setTimeout(() => {
      setActiveId(id);
      setImgOpacity(1);
    }, 280);
  };

  const activeItem = BEYOND_ITEMS.find((item) => item.id === activeId)!;

  return (
    <section id="beyond">
      {/* LEFT COLUMN */}
      <div className="beyond-left reveal">
        <SectionTag num="03" label="Beyond Products" theme="light" variant="beyond" />
        <div className="beyond-img">
          <img
            src={activeItem.image}
            alt={activeItem.title}
            style={{ opacity: imgOpacity, transition: "opacity 0.28s ease" }}
          />
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="beyond-right">
        <h2 className="beyond-title reveal">
          Building The Future Of Wellness
        </h2>

        <div className="beyond-items reveal">
          {BEYOND_ITEMS.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div
                key={item.id}
                className={`beyond-item ${isOpen ? "accordion-open" : ""}`}
                onClick={() => handleTabClick(item.id)}
              >
                {isOpen ? (
                  /* Open state: 2-col - title left, body right */
                  <div className="beyond-item-open-row">
                    <span className="beyond-item-title">{item.title}</span>
                    <div className="beyond-item-body">
                      <p className="beyond-item-desc">{item.description}</p>
                      <a href={item.link} className="beyond-item-read">
                        Read More →
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Closed state: title full-width with arrow */
                  <div className="beyond-item-header">
                    <span className="beyond-item-title">{item.title}</span>
                    <span className="beyond-item-arrow">→</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
