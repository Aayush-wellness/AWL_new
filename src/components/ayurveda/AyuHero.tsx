import React from "react";
import { AyuTag } from "@/components/ui/AyuTag";

export function AyuHero() {
  return (
    <section className="ayu-hero">
      {/* Background Gradient */}
      <div className="ayu-hero-bg" />

      {/* Hero Media Slot */}
      <div className="ayu-hero-video-slot">
        {/* Placeholder image from public folder */}
        <img src="/assets/images/beyond_future.png" alt="Ayurveda Modern Lab" />
      </div>

      {/* Cinematic dark overlay */}
      <div className="ayu-hero-overlay" />

      {/* Hero Copy Content */}
      <div className="ayu-hero-content">
        <h1 className="ayu-hero-title">
          Ayurveda,<br />
          Reinvented For The<br />
          Modern Body.
        </h1>

        <div className="ayu-hero-body-wrap">
          <span className="ayu-hero-asterisk">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path d="M2 28.8928L15.9269 22.6025L23.943 27.3203L25.5624 42.7978L15.684 42.7148L17.1415 31.9551L15.4411 30.9619L7.10111 37.5836L2 28.8928Z" fill="#c2fa7c" />
              <path d="M24.8342 26.6576L37.1419 35.8446L42 26.9887L32.1213 22.933V20.9466L42 16.8082L37.1419 8.03488L24.8342 17.2221V26.6576Z" fill="#c2fa7c" />
              <path d="M23.943 16.4775L25.5624 1L15.684 1.16549L17.1415 11.9253L15.4411 12.9185L7.02015 6.29708L2 14.9049L15.9269 21.1952L23.943 16.4775Z" fill="#c2fa7c" />
            </svg>
          </span>
          <p className="ayu-hero-body">
            For over 5,000 years, Ayurveda has offered a framework for living well - not just treating illness, but preventing it. At Aayush Wellness, we honour that heritage and elevate it: rigorously tested, precisely formulated, and made relevant for the health demands of contemporary life.
          </p>
        </div>
      </div>
    </section>
  );
}
