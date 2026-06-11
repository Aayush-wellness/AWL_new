"use client";

import React from "react";

export function SustainabilityHero() {
  return (
    <section id="sus-hero">
      {/* ── background ── */}
      <div className="sus-hero-bg">
        {/*
          DROP YOUR HERO MEDIA HERE
          Option A – video:
            <video autoPlay muted loop playsInline className="sus-hero-video">
              <source src="/assets/video/sustainability-hero.mp4" type="video/mp4" />
            </video>
          Option B – image:
            <img src="/assets/images/sustainability-hero.jpg" className="sus-hero-img" alt="" />
        */}
      </div>

      <div className="sus-hero-overlay" />

      {/* ── content ── */}
      <div className="sus-hero-content">
        <h1 className="sus-hero-title">
          Healing People.<br />Healing The Planet.
        </h1>
        <p className="sus-hero-body">
          <span className="sus-hero-asterisk">✦</span>
          At Aayush Wellness, impact is not a department - it is embedded in every product we
          formulate, every partnership we build, and every community we serve. Our commitment
          extends well beyond wellness supplements; it encompasses the health of our society
          and the sustainability of our natural world.
        </p>
      </div>

      {/* ── scroll indicator ── */}
      <div className="sus-scroll-hint">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
