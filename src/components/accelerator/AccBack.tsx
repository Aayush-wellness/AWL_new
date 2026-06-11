import React from "react";

export function AccBack() {
  return (
    <section className="acc-back">
      {/* Header */}
      <div className="acc-back-header">
        <div className="reveal">
          <span className="acc-back-tag">Who We Back</span>
        </div>
        <div className="reveal reveal-delay-1">
          <h2 className="acc-back-title">The Founders We Are Built For</h2>
          <p className="acc-back-subtitle">
            We are not a generalist fund. We back a specific kind of founder - one building at the
            intersection of health, science, and genuine human impact, with the discipline to build
            something that lasts.
          </p>
        </div>
      </div>

      {/* Bento grid */}
      <div className="acc-bento">
        {/* Row 1 - left: white card (spans 2) */}
        <div className="acc-bento-card acc-bc-white reveal">
          <h3 className="acc-bc-title">Exceptional Teams</h3>
          <p className="acc-bc-body">
            We look for complementary skill sets, technical depth, and a relentless focus on solving
            user problems. Founders must show skin in the game and a long-term vision.
          </p>
        </div>

        {/* Row 1 - right: dark card with background video (spans 1) */}
        <div className="acc-bento-card acc-bc-dark reveal reveal-delay-1">
          <video
            src="/assets/images/accelarator/acc-back-video-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="acc-bc-bg-video"
          />
          <div className="acc-bc-content-wrap">
            <h3 className="acc-bc-title">Market Potential</h3>
            <p className="acc-bc-body">
              Large addressable markets where a 10x improvement is possible through innovation.
            </p>
          </div>
        </div>

        {/* Row 2 - left: lime card (spans 1) */}
        <div className="acc-bento-card acc-bc-lime reveal reveal-delay-1">
          <div className="acc-bc-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
              <path d="M30 13.3333L27.9167 8.75L23.3333 6.66667L27.9167 4.58333L30 0L32.0833 4.58333L36.6667 6.66667L32.0833 8.75L30 13.3333ZM30 36.6667L27.9167 32.0833L23.3333 30L27.9167 27.9167L30 23.3333L32.0833 27.9167L36.6667 30L32.0833 32.0833L30 36.6667ZM13.3333 31.6667L9.16667 22.5L0 18.3333L9.16667 14.1667L13.3333 5L17.5 14.1667L26.6667 18.3333L17.5 22.5L13.3333 31.6667ZM13.3333 23.5833L15 20L18.5833 18.3333L15 16.6667L13.3333 13.0833L11.6667 16.6667L8.08333 18.3333L11.6667 20L13.3333 23.5833Z" fill="#050505" />
            </svg>
          </div>
          <h3 className="acc-bc-title">Innovation</h3>
          <p className="acc-bc-body">
            True differentiation - whether in product formulation, delivery, or business model.
          </p>
        </div>

        {/* Row 2 - right: border card with side video (spans 2) */}
        <div className="acc-bento-card acc-bc-border reveal reveal-delay-2">
          <div className="acc-bc-text-side">
            <h3 className="acc-bc-title">Consumer Impact</h3>
            <p className="acc-bc-body">
              Evidence of positive outcomes for the end consumer and a clear path to generating
              sustainable value.
            </p>
          </div>
          <div className="acc-bc-img-container">
            <video
              src="/assets/images/accelarator/acc-back-image-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="acc-bc-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
