"use client";

import React, { useState, useMemo } from "react";
import { SectionTag } from "@/components/ui/SectionTag";
import "./investors.css";
import { INVESTOR_CATEGORIES, type DocItem } from "./data/investorDocuments";

export function InvestorsPageClient() {
  const [activeCategory, setActiveCategory] = useState(INVESTOR_CATEGORIES[0].id);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(INVESTOR_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategory = useMemo(
    () => INVESTOR_CATEGORIES.find((cat) => cat.id === activeCategory) || INVESTOR_CATEGORIES[0],
    [activeCategory]
  );

  const filterDocs = (docs: DocItem[]) => {
    if (!searchQuery.trim()) return docs;
    const q = searchQuery.toLowerCase();
    return docs.filter((doc) => doc.name.toLowerCase().includes(q));
  };

  const desktopDocs = useMemo(
    () => filterDocs(currentCategory.documents),
    [currentCategory, searchQuery]
  );

  const PDFIcon = () => (
    <svg
      className="doc-link-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );

  const ExternalIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginLeft: 4, opacity: 0.6 }}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );

  return (
    <div className="investors-page-container">
      {/* Hero Section */}
      <section className="investors-hero">
        <div className="investors-hero-bg" style={{ backgroundImage: "url('/assets/images/investors/investors_bg.jpg')" }} />
        <div className="investors-hero-overlay" />
        <div className="investors-hero-content">
          <h1 className="investors-hero-title">Investor Relations</h1>
          <p className="investors-hero-desc">
            All financial disclosures, governance documents, regulatory filings, and shareholder information for Aayush Wellness Limited - organised for transparency and ease of access.
          </p>
        </div>
      </section>

      <div className="investors-page-wrapper">

        {/* ================= DESKTOP VIEW ================= */}
        <aside className="investors-sidebar">
          {INVESTOR_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                className={`sidebar-item ${isActive ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
                title={cat.name}
              >
                {cat.name}
              </button>
            );
          })}
        </aside>

        {/* Right Main Screen Panel */}
        <section className="investors-content">
          <div className="investors-header-block">
            <h1 className="investors-category-title">{currentCategory.name}</h1>
            <span className="investors-doc-count">{currentCategory.documents.length} document{currentCategory.documents.length !== 1 ? "s" : ""}</span>
          </div>

          {/* Investor Grievance Info Cards */}
          {currentCategory.id === "investor-grievance" && (
            <div className="grievance-cards-grid" style={{ marginBottom: "40px" }}>
              <div className="grievance-card">
                <h3 className="grievance-card-header">Grievance Redressal Officer</h3>
                <div className="grievance-card-content">
                  <div className="grievance-field"><span className="field-label">NAME</span><span className="field-value">Ms. Sneha Khemka</span></div>
                  <div className="grievance-field"><span className="field-label">DESIGNATION</span><span className="field-value">Company Secretary &amp; Compliance Officer</span></div>
                  <div className="grievance-field"><span className="field-label">CONTACT NO.</span><span className="field-value">+91 84486 93031</span></div>
                  <div className="grievance-field"><span className="field-label">E-MAIL</span><span className="field-value"><a href="mailto:cs@aayushwellness.com">cs@aayushwellness.com</a></span></div>
                  <div className="grievance-field"><span className="field-label">WEBSITE</span><span className="field-value"><a href="http://www.aayushwellness.com/" target="_blank" rel="noopener noreferrer">http://www.aayushwellness.com/</a></span></div>
                </div>
              </div>
              <div className="grievance-card">
                <h3 className="grievance-card-header">Registrar &amp; Share Transfer Agent</h3>
                <div className="grievance-card-content">
                  <div className="grievance-field"><span className="field-label">RTA NAME</span><span className="field-value">Beetal Financial &amp; Computer Services (P) Ltd</span></div>
                  <div className="grievance-field"><span className="field-label">ADDRESS</span><span className="field-value">Beetal House, 3rd Floor, 99 Madangir, Behind Local Shopping Centre, Near Dada Harsukh Dass Mandir, New Delhi - 110062.</span></div>
                  <div className="grievance-field"><span className="field-label">CONTACT NO.</span><span className="field-value">011-29961281</span></div>
                  <div className="grievance-field"><span className="field-label">E-MAIL</span><span className="field-value"><a href="mailto:beetalrta@gmail.com">beetalrta@gmail.com</a></span></div>
                  <div className="grievance-field"><span className="field-label">WEBSITE</span><span className="field-value"><a href="http://www.beetalfinancial.com/" target="_blank" rel="noopener noreferrer">http://www.beetalfinancial.com/</a></span></div>
                </div>
              </div>
            </div>
          )}

          {/* Search Box */}
          <div className="investors-search-box">
            <svg className="investors-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="investors-search-input"
              placeholder={`Search ${currentCategory.name} documents...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Documents Table */}
          <div className="document-table-wrapper">
            {desktopDocs.length > 0 ? (
              <table className="document-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {desktopDocs.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <a
                          className="doc-link"
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PDFIcon />
                          {doc.name}
                          <ExternalIcon />
                        </a>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <a
                          className="doc-action-btn"
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-documents">
                No documents found matching &quot;{searchQuery}&quot; in this category.
              </div>
            )}
          </div>
        </section>

        {/* ================= MOBILE VIEW (ACCORDIONS) ================= */}
        <section className="investors-mobile-accordions">
          <div className="mobile-header-block">
            <SectionTag num="01" label="Investors Ecosystem" theme="dark" />
            <h1 className="about-title" style={{ fontSize: "28px", marginTop: "16px", marginBottom: "8px" }}>
              BSE-Listed Governance
            </h1>
            <p className="investors-category-desc" style={{ fontSize: "14px", marginBottom: "20px" }}>
              Access regulatory filings, reports, compliance disclosures, and company policies.
            </p>

            {/* Global mobile search */}
            <div className="investors-search-box">
              <svg className="investors-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="investors-search-input"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="accordion-list">
            {INVESTOR_CATEGORIES.map((cat) => {
              const isExpanded = expandedMobileCategory === cat.id;
              const mobileDocs = filterDocs(cat.documents);

              return (
                <div key={cat.id} className="accordion-item">
                  <button
                    className={`accordion-header ${isExpanded ? "expanded" : ""}`}
                    onClick={() => setExpandedMobileCategory(isExpanded ? null : cat.id)}
                  >
                    <span>{cat.name}</span>
                    <svg className="accordion-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="accordion-content">
                      {cat.id === "investor-grievance" && (
                        <div className="grievance-cards-grid" style={{ marginBottom: "24px" }}>
                          <div className="grievance-card">
                            <h3 className="grievance-card-header">Grievance Redressal Officer</h3>
                            <div className="grievance-card-content">
                              <div className="grievance-field"><span className="field-label">NAME</span><span className="field-value">Ms. Sneha Khemka</span></div>
                              <div className="grievance-field"><span className="field-label">DESIGNATION</span><span className="field-value">Company Secretary &amp; Compliance Officer</span></div>
                              <div className="grievance-field"><span className="field-label">CONTACT NO.</span><span className="field-value">+91 84486 93031</span></div>
                              <div className="grievance-field"><span className="field-label">E-MAIL</span><span className="field-value"><a href="mailto:cs@aayushwellness.com">cs@aayushwellness.com</a></span></div>
                              <div className="grievance-field"><span className="field-label">WEBSITE</span><span className="field-value"><a href="http://www.aayushwellness.com/" target="_blank" rel="noopener noreferrer">http://www.aayushwellness.com/</a></span></div>
                            </div>
                          </div>
                          <div className="grievance-card">
                            <h3 className="grievance-card-header">Registrar &amp; Share Transfer Agent</h3>
                            <div className="grievance-card-content">
                              <div className="grievance-field"><span className="field-label">RTA NAME</span><span className="field-value">Beetal Financial &amp; Computer Services (P) Ltd</span></div>
                              <div className="grievance-field"><span className="field-label">ADDRESS</span><span className="field-value">Beetal House, 3rd Floor, 99 Madangir, Behind Local Shopping Centre, Near Dada Harsukh Dass Mandir, New Delhi - 110062.</span></div>
                              <div className="grievance-field"><span className="field-label">CONTACT NO.</span><span className="field-value">011-29961281</span></div>
                              <div className="grievance-field"><span className="field-label">E-MAIL</span><span className="field-value"><a href="mailto:beetalrta@gmail.com">beetalrta@gmail.com</a></span></div>
                              <div className="grievance-field"><span className="field-label">WEBSITE</span><span className="field-value"><a href="http://www.beetalfinancial.com/" target="_blank" rel="noopener noreferrer">http://www.beetalfinancial.com/</a></span></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Document List inside Mobile Accordion */}
                      <div className="document-table-wrapper" style={{ marginTop: "12px" }}>
                        {mobileDocs.length > 0 ? (
                          <table className="document-table">
                            <thead>
                              <tr>
                                <th>Document Name</th>
                                <th style={{ textAlign: "right" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mobileDocs.map((doc) => (
                                <tr key={doc.id}>
                                  <td>
                                    <a
                                      className="doc-link"
                                      href={doc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ fontSize: "13px" }}
                                    >
                                      <PDFIcon />
                                      {doc.name}
                                    </a>
                                  </td>
                                  <td style={{ textAlign: "right" }}>
                                    <a
                                      className="doc-action-btn"
                                      href={doc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ padding: "6px 10px", fontSize: "11px" }}
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className="no-documents" style={{ fontSize: "13px", padding: "20px 10px" }}>
                            No documents found.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Investor Grievance Section */}
      <section className="investors-grievance">
        <div className="grievance-banner">
          <div className="grievance-banner-bg" style={{ backgroundImage: "url('/assets/images/investors/investors_1.jpg')" }} />
          <div className="grievance-banner-overlay" />
          <h2 className="grievance-banner-title">Investor Grievance</h2>
        </div>

        <div className="grievance-cards-grid">
          <div className="grievance-card">
            <h3 className="grievance-card-header">Grievance Redressal Officer</h3>
            <div className="grievance-card-content">
              <div className="grievance-field"><span className="field-label">NAME</span><span className="field-value">Ms. Sneha Khemka</span></div>
              <div className="grievance-field"><span className="field-label">DESIGNATION</span><span className="field-value">Company Secretary &amp; Compliance Officer</span></div>
              <div className="grievance-field"><span className="field-label">CONTACT NO.</span><span className="field-value">+91 84486 93031</span></div>
              <div className="grievance-field"><span className="field-label">E-MAIL</span><span className="field-value"><a href="mailto:cs@aayushwellness.com">cs@aayushwellness.com</a></span></div>
              <div className="grievance-field"><span className="field-label">WEBSITE</span><span className="field-value"><a href="http://www.aayushwellness.com/" target="_blank" rel="noopener noreferrer">http://www.aayushwellness.com/</a></span></div>
            </div>
          </div>

          <div className="grievance-card">
            <h3 className="grievance-card-header">Registrar &amp; Share Transfer Agent</h3>
            <div className="grievance-card-content">
              <div className="grievance-field"><span className="field-label">RTA NAME</span><span className="field-value">Beetal Financial &amp; Computer Services (P) Ltd</span></div>
              <div className="grievance-field"><span className="field-label">ADDRESS</span><span className="field-value">Beetal House, 3rd Floor, 99 Madangir, Behind Local Shopping Centre, Near Dada Harsukh Dass Mandir, New Delhi - 110062.</span></div>
              <div className="grievance-field"><span className="field-label">CONTACT NO.</span><span className="field-value">011-29961281</span></div>
              <div className="grievance-field"><span className="field-label">E-MAIL</span><span className="field-value"><a href="mailto:beetalrta@gmail.com">beetalrta@gmail.com</a></span></div>
              <div className="grievance-field"><span className="field-label">WEBSITE</span><span className="field-value"><a href="http://www.beetalfinancial.com/" target="_blank" rel="noopener noreferrer">http://www.beetalfinancial.com/</a></span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
