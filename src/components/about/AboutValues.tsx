import React from "react";

export function AboutValues() {
  return (
    <section id="values">
      <div className="values-header">
        <div className="values-header-left reveal">
          <span className="values-tag">Our Core Values</span>
        </div>
        <div className="values-header-right reveal d1">
          <h2 className="values-title">The Principles Behind Everything We Do</h2>
        </div>
      </div>

      {/* Big cards: 01 + 02 */}
      <div className="values-big-grid">
        {/* 01 Science-driven */}
        <div className="value-card-big vc1 reveal">
          <div className="num-badge">01</div>
          <div className="value-card-content">
            <h3 className="vc-title">Science-driven wellness</h3>
            <p className="vc-body">
              Every product and service we offer is rooted in research, clinical validation, and rigorous testing -
              ensuring real, measurable results for our consumers.
            </p>
          </div>
        </div>

        {/* 02 Prevention before cure */}
        <div className="value-card-big vc2 reveal d1">
          <div className="num-badge">02</div>
          <div className="value-card-content">
            <h3 className="vc-title">Prevention before cure</h3>
            <p className="vc-body">
              We believe the most powerful healthcare happens before illness strikes. Our entire ecosystem is
              designed to keep individuals healthy, not just treat them when they're not.
            </p>
          </div>
        </div>
      </div>

      {/* Small cards: 03–05 */}
      <div className="values-small-grid">
        <div className="value-card-small reveal">
          <div className="vs-num">03</div>
          <h3 className="vs-title">Integrity &amp; transparency</h3>
          <p className="vs-body">
            From ingredient sourcing to product formulation, we operate with complete transparency.
            Our customers deserve to know exactly what they consume and why it works.
          </p>
        </div>

        <div className="value-card-small reveal d1">
          <div className="vs-num">04</div>
          <h3 className="vs-title">Sustainability &amp; responsibility</h3>
          <p className="vs-body">
            We are committed to ethically sourced, eco-conscious ingredients and sustainable packaging -
            because wellness for people must never come at the cost of the planet.
          </p>
        </div>

        <div className="value-card-small reveal d2">
          <div className="vs-num">05</div>
          <h3 className="vs-title">Consumer-centric approach</h3>
          <p className="vs-body">
            Every innovation begins with one question: does this genuinely serve our customer?
            We listen, iterate, and deliver solutions tailored to real human needs - not market trends.
          </p>
        </div>
      </div>
    </section>
  );
}
