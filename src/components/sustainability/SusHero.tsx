"use client"
import React from "react";

export function SusHero() {
  return (
    <section id="sus-hero">
      <div className="sus-hero-bg" />

      {/* ── Video / image slot ──────────────────────────────────────────────
          Replace the <div className="sus-hero-video-slot empty"> with:

          <div className="sus-hero-video-slot">
            <video autoPlay muted loop playsInline>
              <source src="/assets/videos/sustainability-hero.mp4" type="video/mp4" />
            </video>
          </div>

          once the hero video asset is ready.
      ────────────────────────────────────────────────────────────────────── */}
      <div className="sus-hero-video-slot empty" />

      <div className="sus-hero-overlay" />

      <div className="sus-hero-content">
        <h1 className="sus-hero-title">
          Healing People.<br />Healing The Planet.
        </h1>
        <div className="sus-hero-body-wrap">
          <span className="sus-hero-asterisk">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path d="M2 28.8928L15.9269 22.6025L23.943 27.3203L25.5624 42.7978L15.684 42.7148L17.1415 31.9551L15.4411 30.9619L7.10111 37.5836L2 28.8928Z" fill="#95D754" />
              <path d="M24.8342 26.6576L37.1419 35.8446L42 26.9887L32.1213 22.933V20.9466L42 16.8082L37.1419 8.03488L24.8342 17.2221V26.6576Z" fill="#95D754" />
              <path d="M23.943 16.4775L25.5624 1L15.684 1.16549L17.1415 11.9253L15.4411 12.9185L7.02015 6.29708L2 14.9049L15.9269 21.1952L23.943 16.4775Z" fill="#95D754" />
            </svg>
          </span>
          <p className="sus-hero-body">
            At Aayush Wellness, impact is not a department - it is embedded in every product we formulate,
            every partnership we build, and every community we serve. Our commitment extends well beyond
            wellness supplements; it encompasses the health of our society and the sustainability of our natural world.
          </p>
        </div>
      </div>

      <div className="sus-scroll-hint">
        <div className="sus-scroll-line" />
      </div>
    </section>
  );
}
