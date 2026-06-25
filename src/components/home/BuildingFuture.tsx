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

  const handleTabClick = (id: string) => {
    setActiveId(id);
  };

  return (
    <section id="beyond">
      {/* LEFT COLUMN */}
      <div className="beyond-left reveal">
        <SectionTag num="03" label="Beyond Products" theme="light" variant="beyond" />
        <div className="beyond-img">
          {BEYOND_ITEMS.map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.title}
              className={activeId === item.id ? "active" : ""}
            />
          ))}
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
                <span className="beyond-item-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <path d="M16.9706 24.0415L24.0416 16.9705L16.9706 9.89941M24.0416 16.9705H9.89949" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                <div className="beyond-item-open-row">
                  <span className="beyond-item-title">{item.title}</span>
                  <div className="beyond-item-body">
                    <p className="beyond-item-desc">{item.description}</p>
                    <a href={item.link} className="beyond-item-read">
                      Read More <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M16.9706 24.0415L24.0416 16.9705L16.9706 9.89941M24.0416 16.9705H9.89949" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
