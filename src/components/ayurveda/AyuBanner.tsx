import React from "react";

export function AyuBanner() {
  return (
    <section className="ayu-banner-section">
      <div className="ayu-banner-card">
        {/* Decorative background circle */}
        <div className="ayu-banner-deco" />
        
        <h2 className="ayu-banner-title">
          Nature&apos;s best. Refined by science.
        </h2>
        <p className="ayu-banner-desc">
          Ayurveda was never primitive - it was ahead of its time. Our role is not to modernise it out of recognition, but to give it the rigour and precision it deserves, so that its profound wisdom can serve the largest number of people possible - safely, effectively, and with complete transparency.
        </p>
      </div>
    </section>
  );
}
