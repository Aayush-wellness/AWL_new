"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }

      if (currentScrollY <= 50) {
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setNavbarVisible(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const ChevronDown = () => (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dropdown-icon"
      style={{ marginLeft: "8px", transition: "transform 0.3s ease" }}
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <nav id="navbar" className={`${navbarScrolled ? "scrolled" : ""} ${navbarVisible ? "" : "hidden"}`}>
        {/* Mobile Hamburger Button */}
        <button
          className={`nav-hamburger ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {/* Logo */}
        <Link href="/" className="nav-logo">
          <img
            src="/AWS Logo.png"
            alt="Aayush Wellness Limited"
            className="nav-logo-img"
          />
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          <li>
            <Link href="/" className={isActive("/") ? "active" : ""}>
              Home
            </Link>
          </li>
          <li className="has-dropdown">
            <Link href="/about" className={isActive("/about") || isActive("/sustainability") || isActive("/careers") ? "active" : ""}>
              Company <ChevronDown />
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/sustainability">Sustainability</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
            </ul>
          </li>
          <li className="has-dropdown">
            <Link href="/products" className={isActive("/products") || isActive("/ayurveda") || isActive("/store") ? "active" : ""}>
              Products <ChevronDown />
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link href="/products">All Products</Link>
              </li>
              <li>
                <Link href="/ayurveda">Ayurveda & Science</Link>
              </li>
              <li>
                <Link href="/store">Online Store</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/accelerator" className={isActive("/accelerator") ? "active" : ""}>
              Accelerator
            </Link>
          </li>
          <li>
            <Link href="/investors" className={isActive("/investors") ? "active" : ""}>
              Investors
            </Link>
          </li>
        </ul>

        {/* Action Button */}
        <Link href="/contact" className="nav-cta">
          Partner with us
        </Link>
      </nav>

      {/* Mobile Drawer/Sidebar Overlay Menu */}
      <div className={`mobile-sidebar ${mobileMenuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo">
            <img src="/AWS Logo.png" alt="Aayush" className="sidebar-logo-img" />
          </Link>
          <button
            className="sidebar-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
          >
            ✕
          </button>
        </div>
        <div className="sidebar-content">
          <ul className="sidebar-links">
            <li>
              <Link href="/" className={isActive("/") ? "active" : ""}>
                Home
              </Link>
            </li>

            {/* Company Section */}
            <li className="sidebar-section-title">Company</li>
            <li>
              <Link href="/about" className={isActive("/about") ? "active" : ""}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/sustainability" className={isActive("/sustainability") ? "active" : ""}>
                Sustainability
              </Link>
            </li>
            <li>
              <Link href="/careers" className={isActive("/careers") ? "active" : ""}>
                Careers
              </Link>
            </li>

            {/* Products Section */}
            <li className="sidebar-section-title">Products</li>
            <li>
              <Link href="/products" className={isActive("/products") ? "active" : ""}>
                All Products
              </Link>
            </li>
            <li>
              <Link href="/ayurveda" className={isActive("/ayurveda") ? "active" : ""}>
                Ayurveda & Science
              </Link>
            </li>
            <li>
              <Link href="/store" className={isActive("/store") ? "active" : ""}>
                Online Store
              </Link>
            </li>

            {/* Main Links */}
            <li className="sidebar-section-title">More</li>
            <li>
              <Link href="/accelerator" className={isActive("/accelerator") ? "active" : ""}>
                Accelerator
              </Link>
            </li>
            <li>
              <Link href="/investors" className={isActive("/investors") ? "active" : ""}>
                Investors
              </Link>
            </li>
          </ul>

          <div className="sidebar-footer">
            <Link href="/contact" className="sidebar-cta">
              Partner with us
            </Link>
          </div>
        </div>
      </div>
      {/* Dim overlay background when sidebar is open */}
      <div
        className={`mobile-sidebar-overlay ${mobileMenuOpen ? "show" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

