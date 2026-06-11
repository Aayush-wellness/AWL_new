"use client";

import React, { useState } from "react";
import { AyuTag } from "@/components/ui/AyuTag";

const stepsData = [
  {
    num: "STEP 01",
    title: "Botanical selection",
    desc: "Herbs are identified from classical Ayurvedic texts and validated against modern clinical literature for efficacy and safety profiles.",
    btnImg: "/assets/images/ayurveda/ayu-pro-1.png",
    detailImg: "/assets/images/ayurveda/ayu-pro-1.png",
  },
  {
    num: "STEP 02",
    title: "Precision extraction",
    desc: "Advanced extraction techniques are utilized to extract full-spectrum bioactives, ensuring maximum bioavailability and structural integrity of compounds.",
    btnImg: "/assets/images/ayurveda/ayu-pro-2.jpg",
    detailImg: "/assets/images/ayurveda/ayu-pro-2.jpg",
  },
  {
    num: "STEP 03",
    title: "Scientific formulation",
    desc: "Ingredients are blended in precise ratios under clean room environments to ensure synergy, standardized dosage, and optimal consumer efficacy.",
    btnImg: "/assets/images/ayurveda/ayu-pro-3.jpg",
    detailImg: "/assets/images/ayurveda/ayu-pro-3.jpg",
  },
  {
    num: "STEP 04",
    title: "Quality verification",
    desc: "Rigorous laboratory testing validates purity, shelf-life stability, heavy metal clearance, and microbiological safety across all batches.",
    btnImg: "/assets/images/ayurveda/ayu-pro-4.jpg",
    detailImg: "/assets/images/ayurveda/ayu-pro-4.jpg",
  },
];

export function AyuProcess() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStep = stepsData[activeIdx];

  return (
    <section className="ayu-process">
      <div className="ayu-process-layout-grid">
        {/* Left Part: Tag and Nav Button List */}
        <div className="ayu-process-left-part">
          <div className="ayu-process-tag-wrap reveal">
            <AyuTag label="From Root To Result" theme="dark" />
          </div>

          <div className="ayu-process-nav reveal d1">
            {stepsData.map((s, idx) => (
              <button
                key={s.num}
                className={`ayu-process-nav-btn ${idx === activeIdx ? "active" : ""}`}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="ayu-process-btn-img">
                  <img src={s.btnImg} alt={s.title} />
                </div>
                <div className="ayu-process-btn-txt">
                  <span className="ayu-process-btn-step">{s.num}</span>
                  <span className="ayu-process-btn-title">{s.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Part: Title and Active Step Detail Display Card */}
        <div className="ayu-process-right-part">
          <div className="ayu-process-title-wrap reveal">
            <h2 className="ayu-process-title">
              How Ancient Wisdom Becomes A Product You Can Trust.
            </h2>
          </div>

          <div className="ayu-process-detail reveal d1">
            <div className="ayu-process-detail-img">
              <img src={activeStep.detailImg} alt={activeStep.title} />
            </div>
            <div className="ayu-process-detail-txt">
              <span className="ayu-process-detail-step">{activeStep.num}</span>
              <h3 className="ayu-process-detail-title">{activeStep.title}</h3>
              <p className="ayu-process-detail-desc">{activeStep.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
