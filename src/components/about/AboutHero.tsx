import React from "react";

export function AboutHero() {
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-photo"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Defining wellness through science &amp; nature</h1>
        <div className="hero-body-wrap">
          <span className="hero-asterisk">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path d="M2 28.8928L15.9269 22.6025L23.943 27.3203L25.5624 42.7978L15.684 42.7148L17.1415 31.9551L15.4411 30.9619L7.10111 37.5836L2 28.8928Z" fill="#95D754" />
              <path d="M24.8342 26.6576L37.1419 35.8446L42 26.9887L32.1213 22.933V20.9466L42 16.8082L37.1419 8.03488L24.8342 17.2221V26.6576Z" fill="#95D754" />
              <path d="M23.943 16.4775L25.5624 1L15.684 1.16549L17.1415 11.9253L15.4411 12.9185L7.02015 6.29708L2 14.9049L15.9269 21.1952L23.943 16.4775Z" fill="#95D754" />
            </svg>
          </span>
          <p className="hero-body">
            Aayush Wellness Limited is a publicly listed preventive healthcare and wellness company - bridging ancient Ayurvedic wisdom with modern science to make proactive health a daily reality for every individual.
          </p>
        </div>
      </div>
      <div className="scroll-hint">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
