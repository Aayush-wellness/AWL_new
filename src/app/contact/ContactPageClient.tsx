"use client";

import React, { useState } from "react";
import "./contact.css";

interface Toast {
  id: number;
  message: string;
  visible: boolean;
}

const contactOptions = [
  "Products & Orders",
  "Business Partnership",
  "Investor Relations",
  "General Enquiry",
];

export function ContactPageClient() {
  const [selectedOption, setSelectedOption] = useState("Products & Orders");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Date.now();
    const newToast: Toast = {
      id,
      message: "Your message has been sent successfully! We will get back to you shortly.",
      visible: false,
    };

    setToasts((prev) => [...prev, newToast]);

    // Animate Toast In
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: true } : t))
      );
    }, 100);

    // Animate Toast Out
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 400);
    }, 4000);

    // Reset Form Fields
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  return (
    <>
      <div className="contact-page-wrapper">
        {/* Contact Page Header */}
        <div className="contact-header reveal">
          <div className="contact-header-left">
            <h1>Let&apos;s start a conversation.</h1>
          </div>
          <div className="contact-header-right">
            <p>
              Whether you are a customer, a business partner, a healthcare
              professional, or an investor - the right team is ready to respond.
              Tell us who you are and how we can help.
            </p>
          </div>
        </div>

        {/* Contact Details Card & Form */}
        <div className="contact-card reveal reveal-delay-1">
          {/* Left Side: Direct Channels */}
          <div className="contact-card-left">
            <span className="contact-card-left-subtitle">Direct Channels</span>
            <h2 className="contact-card-left-title">Reach us directly.</h2>

            <div className="contact-info-list">
              {/* Call Channel */}
              <div className="contact-info-item">
                <div className="contact-info-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-info-text">
                  <span className="contact-info-label">Call Us</span>
                  <span className="contact-info-value">+91 8655980810</span>
                </div>
              </div>

              {/* General Enquiries Channel */}
              <div className="contact-info-item">
                <div className="contact-info-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-info-text">
                  <span className="contact-info-label">General Enquiries</span>
                  <span className="contact-info-value">
                    sales@aayushwellness.com
                  </span>
                </div>
              </div>

              {/* Registered Office Channel */}
              <div className="contact-info-item">
                <div className="contact-info-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-info-text">
                  <span className="contact-info-label">Registered Office</span>
                  <span className="contact-info-value">
                    B402, Takshashila, Samant Estate, Goregaon East,
                    Mumbai - 400063
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping Circle Vectors */}
            <div className="contact-card-circles">
              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "100%" }}
              >
                <circle
                  cx="80"
                  cy="120"
                  r="60"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
                <circle
                  cx="130"
                  cy="120"
                  r="60"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
              </svg>
            </div>
          </div>

          {/* Right Side: Message Form */}
          <div className="contact-card-right">
            <span className="contact-card-right-subtitle">Send us a message</span>
            <h2 className="contact-card-right-title">How can we help you?</h2>
            <p className="contact-card-right-desc">
              Fill in your details and we will route your message to the right
              team. We typically respond within one business day.
            </p>

            <form onSubmit={handleFormSubmit}>
              {/* Option Selector Pills */}
              <div className="contact-option-label">I am reaching out about</div>
              <div className="contact-pills">
                {contactOptions.map((opt) => {
                  const isActive = selectedOption === opt;
                  return (
                    <div
                      key={opt}
                      className={`contact-pill ${isActive ? "active" : ""}`}
                      onClick={() => setSelectedOption(opt)}
                    >
                      {isActive ? (
                        <span className="contact-pill-check">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      ) : (
                        <span className="contact-pill-circle" />
                      )}
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Grid Form Fields */}
              <div className="contact-grid-inputs">
                {/* Name */}
                <div className="contact-input-box">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="contact-input-box">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="contact-input-box">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Company Name */}
                <div className="contact-input-box">
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    required
                  />
                </div>

                {/* Message */}
                <div className="contact-input-box full-width">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message..."
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="contact-card-submit-btn">
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Alert toast notifications */}
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`contact-success-toast ${toast.visible ? "show" : ""}`}
        >
          <span>✔️</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </>
  );
}
