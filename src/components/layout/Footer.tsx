import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        {/* Brand */}
        <div>
          <p className="footer-tagline">
            Innovating preventive healthcare &amp; wellness - bridging ancient Ayurvedic wisdom with modern science since 1984.
          </p>
          <div className="footer-contact">
            <a href="tel:+918655980810" className="fc-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.9493 21C17.8659 21 15.8076 20.5458 13.7743 19.6375C11.7409 18.7292 9.89093 17.4417 8.22427 15.775C6.5576 14.1083 5.2701 12.2583 4.36177 10.225C3.45343 8.19167 2.99927 6.13333 2.99927 4.05C2.99927 3.75 3.09927 3.5 3.29927 3.3C3.49927 3.1 3.74927 3 4.04927 3H8.09927C8.3326 3 8.54093 3.07917 8.72427 3.2375C8.9076 3.39583 9.01593 3.58333 9.04927 3.8L9.69927 7.3C9.7326 7.56667 9.72427 7.79167 9.67427 7.975C9.62427 8.15833 9.5326 8.31667 9.39927 8.45L6.97427 10.9C7.3076 11.5167 7.70343 12.1125 8.16177 12.6875C8.6201 13.2625 9.12427 13.8167 9.67427 14.35C10.1909 14.8667 10.7326 15.3458 11.2993 15.7875C11.8659 16.2292 12.4659 16.6333 13.0993 17L15.4493 14.65C15.5993 14.5 15.7951 14.3875 16.0368 14.3125C16.2784 14.2375 16.5159 14.2167 16.7493 14.25L20.1993 14.95C20.4326 15.0167 20.6243 15.1375 20.7743 15.3125C20.9243 15.4875 20.9993 15.6833 20.9993 15.9V19.95C20.9993 20.25 20.8993 20.5 20.6993 20.7C20.4993 20.9 20.2493 21 19.9493 21ZM6.02427 9L7.67427 7.35L7.24927 5H5.02427C5.1076 5.68333 5.22427 6.35833 5.37427 7.025C5.52427 7.69167 5.74093 8.35 6.02427 9ZM14.9743 17.95C15.6243 18.2333 16.2868 18.4583 16.9618 18.625C17.6368 18.7917 18.3159 18.9 18.9993 18.95V16.75L16.6493 16.275L14.9743 17.95Z" fill="#E0E0E0" />
              </svg>
              <span>+91 8655980810</span>
            </a>
            <a href="mailto:sales@aayushwellness.com" className="fc-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21.9993 4H1.99927V20H21.9993V4ZM19.9993 8L11.9993 13L3.99927 8V6L11.9993 11L19.9993 6V8Z" fill="white" />
              </svg>
              <span>sales@aayushwellness.com</span>
            </a>
            <span className="fc-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.9993 1.5C9.81203 1.50258 7.71511 2.3726 6.1685 3.91922C4.62188 5.46584 3.75186 7.56276 3.74928 9.75C3.74666 11.5374 4.33051 13.2763 5.41128 14.7C5.41128 14.7 5.63628 14.9963 5.67303 15.039L11.9993 22.5L18.3285 15.0353C18.3615 14.9955 18.5873 14.7 18.5873 14.7L18.588 14.6978C19.6683 13.2747 20.2518 11.5366 20.2493 9.75C20.2467 7.56276 19.3767 5.46584 17.8301 3.91922C16.2834 2.3726 14.1865 1.50258 11.9993 1.5ZM11.9993 12.75C11.4059 12.75 10.8259 12.5741 10.3326 12.2444C9.83922 11.9148 9.4547 11.4462 9.22764 10.8981C9.00057 10.3499 8.94116 9.74667 9.05692 9.16473C9.17268 8.58279 9.4584 8.04824 9.87796 7.62868C10.2975 7.20912 10.8321 6.9234 11.414 6.80764C11.9959 6.69189 12.5991 6.7513 13.1473 6.97836C13.6955 7.20542 14.164 7.58994 14.4937 8.08329C14.8233 8.57664 14.9993 9.15666 14.9993 9.75C14.9983 10.5453 14.6819 11.3078 14.1195 11.8702C13.5571 12.4326 12.7946 12.749 11.9993 12.75Z" fill="white" />
              </svg>
              <span>
                B402, Takshashila, Samant Estate,
                <br />
                Goregaon East, Mumbai - 400063
              </span>
            </span>
          </div>
        </div>

        {/* Company */}
        <div>
          <p className="footer-col-head">Company</p>
          <ul className="footer-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/ayurveda">Ayurveda Reinvented</Link></li>
            <li><Link href="/sustainability">Sustainability &amp; Impact</Link></li>
            <li><Link href="/reach">Our Reach</Link></li>
            <li><Link href="/accelerator">Accelerator</Link></li>
            <li><Link href="/investors">Investor Relations</Link></li>
            <li><Link href="/news">In The News</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <p className="footer-col-head">Products</p>
          <ul className="footer-links">
            <li><Link href="/products">Wellness Gummies</Link></li>
            <li><Link href="/products">Health Supplements</Link></li>
            <li><Link href="/products">Herbal Masala</Link></li>
          </ul>
          <Link href="/store" className="footer-store-btn">Visit Our Store →</Link>
        </div>
      </div>

      <div className="footer-wordmark">Aayush Wellness</div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2025 Aayush Wellness Limited. All rights reserved.</p>
        <div className="footer-legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
