"use client";

import React, { useState, FormEvent } from "react";

export function AccApplication() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section className="acc-application" id="application">
      <div className="acc-app-grid">
        {/* Row 1 Left - Tag */}
        <div className="acc-app-tag-container reveal">
          <span className="acc-app-tag">Application</span>
        </div>

        {/* Row 1 Right - Title */}
        <div className="acc-app-title-container">
          <h2 className="acc-app-title reveal reveal-delay-1">
            Apply For Funding &amp;<br />Partnership
          </h2>
        </div>

        {/* Row 2 Left - Handshake image */}
        <div className="acc-app-img reveal-left">
          <img
            src="/assets/images/accelarator/acc-application.jpg"
            alt="Partnership Handshake"
            className="acc-app-img-element"
          />
        </div>

        {/* Row 2 Right - Form card */}
        <div className="acc-form-wrap reveal-right">
          <form onSubmit={handleSubmit}>
            {/* Row 1 - Founder & Company */}
            <div className="acc-form-row">
              <div className="acc-form-group">
                <label className="acc-form-label" htmlFor="founderName">Founder Name</label>
                <input id="founderName" className="acc-form-input" type="text" placeholder="John Doe" required />
              </div>
              <div className="acc-form-group">
                <label className="acc-form-label" htmlFor="companyName">Company Name</label>
                <input id="companyName" className="acc-form-input" type="text" placeholder="Eg. Zycus" required />
              </div>
            </div>

            {/* Email Address */}
            <div className="acc-form-group">
              <label className="acc-form-label" htmlFor="emailAddr">Email Address</label>
              <input id="emailAddr" className="acc-form-input" type="email" placeholder="john@company.com" required />
            </div>

            {/* Website / Portfolio */}
            <div className="acc-form-group">
              <label className="acc-form-label" htmlFor="website">Website / Portfolio</label>
              <input id="website" className="acc-form-input" type="url" placeholder="https://" />
            </div>

            {/* Vision Textarea */}
            <div className="acc-form-group">
              <label className="acc-form-label" htmlFor="vision">Brief Vision (Max 200 words)</label>
              <textarea
                id="vision"
                className="acc-form-textarea"
                placeholder="Tell us how you are transforming health..."
                maxLength={200}
                rows={5}
              />
            </div>

            {/* Pitch Deck Link */}
            <div className="acc-form-group">
              <label className="acc-form-label" htmlFor="deckLink">Pitch Deck Link (Drive/DocSend)</label>
              <input id="deckLink" className="acc-form-input" type="url" placeholder="Share your materials" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`acc-form-submit${submitted ? " acc-submitted" : ""}`}
            >
              {submitted ? "✓ Application Submitted!" : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}