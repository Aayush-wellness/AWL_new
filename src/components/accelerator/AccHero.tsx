import React from "react";
import { AnimatedCounter } from "../ui/AnimatedCounter";

export function AccHero() {
  return (
    <section className="acc-hero">
      {/* Background gradient */}
      <div className="acc-hero-bg" />

      {/* ── VIDEO / IMAGE SLOT ──────────────────────────────────────────────
          Drop your <video> or <Image> here. The decorative overlay is shown
          when this slot is empty.
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="acc-hero-media">
        {/* <video autoPlay muted loop playsInline>
          <source src="/assets/video/accelerator-hero.mp4" type="video/mp4" />
        </video>
        <div className="acc-hero-media-overlay" /> */}
      </div>

      {/* Decorative colour gradients (visible when no media above) */}
      <div className="acc-hero-deco" />

      {/* Main copy */}
      <div className="acc-hero-main">
        <h1 className="acc-hero-title">
          Empowering The Brands<br />That Will Define<br />Tomorrow&apos;s Wellness.
        </h1>

        <div className="acc-hero-body-wrap">
          <span className="acc-hero-asterisk">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path d="M2 28.8928L15.9269 22.6025L23.943 27.3203L25.5624 42.7978L15.684 42.7148L17.1415 31.9551L15.4411 30.9619L7.10111 37.5836L2 28.8928Z" fill="#95D754" />
              <path d="M24.8342 26.6576L37.1419 35.8446L42 26.9887L32.1213 22.933V20.9466L42 16.8082L37.1419 8.03488L24.8342 17.2221V26.6576Z" fill="#95D754" />
              <path d="M23.943 16.4775L25.5624 1L15.684 1.16549L17.1415 11.9253L15.4411 12.9185L7.02015 6.29708L2 14.9049L15.9269 21.1952L23.943 16.4775Z" fill="#95D754" />
            </svg>
          </span>
          <p className="acc-hero-body">
            Aayush Wellness Accelerator is backed by a dedicated ₹5 Crore Venture &amp; Growth Capital
            initiative focused on healthcare, wellness, preventive care, and technology. Through strategic
            investment, industry expertise, and growth partnerships, we help founders build scalable
            businesses with lasting impact.
          </p>
        </div>
      </div>

      {/* Stats card */}
      <div className="acc-hero-stats">
        <div className="acc-stat-col">
          <div className="acc-stat-value"><AnimatedCounter target={5} suffix="cr" />
          </div>
          <div className="acc-stat-label">
            Venture Capital<br />Fund
          </div>
        </div>
        <div className="acc-stat-col">
          <div className="acc-stat-label">
            <strong>Health &amp;<br />Wellness</strong>Sector Focus
          </div>
        </div>
        <div className="acc-stat-col">
          <div className="acc-stat-label">
            <strong>Beyond<br />Funding</strong>Strategic Support
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="acc-scroll-hint">
        <div className="acc-scroll-line" />
      </div>
    </section>
  );
}
