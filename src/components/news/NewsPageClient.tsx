"use client";

import React, { useState, useMemo, useEffect } from "react";
import { NEWS_DATA, NewsItem } from "./newsData";

// Dynamically renders high-fidelity publisher brand logos matching the screenshot design
function PublisherLogo({ source }: { source: string }) {
  const normSource = source.toLowerCase();

  if (normSource.includes("z business") || normSource.includes("zee business")) {
    return (
      <div className="pub-logo-wrap z-business">
        <span className="z-char">Z</span>
        <span className="biz-char">BUSINESS</span>
      </div>
    );
  }

  if (normSource.includes("et now")) {
    return (
      <div className="pub-logo-wrap et-now">
        <span className="et-badge">ET</span>
        <span className="now-txt">NOW</span>
      </div>
    );
  }

  if (normSource.includes("cnbc")) {
    return (
      <div className="pub-logo-wrap cnbc">
        <span>CNBC</span>
      </div>
    );
  }

  if (normSource.includes("mint")) {
    return (
      <div className="pub-logo-wrap mint">
        <span>mint</span>
      </div>
    );
  }

  return <div className="pub-logo-wrap generic-pub">{source}</div>;
}

export function NewsPageClient() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc"); // "desc" = newest first, "asc" = oldest first

  useEffect(() => {
    async function loadPressReleases() {
      setIsLoading(true);
      setError(null);
      try {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${BASE_URL}/public/press-releases`);
        if (!res.ok) {
          throw new Error("Failed to load press releases");
        }
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setArticles(json.data);
        } else {
          setArticles([]);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load press releases.");
      } finally {
        setIsLoading(false);
      }
    }
    loadPressReleases();
  }, []);

  // Helper to map and retrieve publisher source
  const getSource = (item: any) => {
    const subtitleLower = (item.subtitle || "").toLowerCase();
    const titleLower = item.title.toLowerCase();

    if (subtitleLower.includes("z business") || subtitleLower.includes("zee business") || titleLower.includes("z business") || titleLower.includes("zee business")) {
      return "Z Business";
    }
    if (subtitleLower.includes("et now") || titleLower.includes("et now")) {
      return "ET NOW";
    }
    if (subtitleLower.includes("cnbc") || titleLower.includes("cnbc")) {
      return "CNBC";
    }
    if (subtitleLower.includes("mint") || titleLower.includes("mint")) {
      return "mint";
    }
    return item.subtitle || "Media Release";
  };

  // Helper to format ISO Date to clean UI display
  const formatDate = (isoString: string): string => {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Safe extraction of paragraph description from content blocks
  const getArticleDescription = (content: any): string => {
    if (!content) return "";

    if (Array.isArray(content)) {
      if (content.length > 0) {
        const first = content[0];
        if (typeof first === "object" && first !== null) {
          return first.content || "";
        }
        return String(first);
      }
      return "";
    }

    if (typeof content === "string") {
      try {
        const parsed = JSON.parse(content);
        return getArticleDescription(parsed);
      } catch (e) {
        return content;
      }
    }

    if (typeof content === "object") {
      return content.content || "";
    }

    return String(content);
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchText(searchQuery);
  };

  // Handle reset search
  const handleResetSearch = () => {
    setSearchQuery("");
    setSearchText("");
  };

  // Toggle sort order
  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  // Filter and sort articles dynamically
  const processedArticles = useMemo(() => {
    // 1. Filter
    const searchLower = searchText.trim().toLowerCase();
    const filtered = articles.filter((item) => {
      const source = getSource(item);
      const category = "Press Release";
      return (
        searchLower === "" ||
        item.title.toLowerCase().includes(searchLower) ||
        source.toLowerCase().includes(searchLower) ||
        category.toLowerCase().includes(searchLower)
      );
    });

    // 2. Sort by date
    return [...filtered].sort((a, b) => {
      const timeA = new Date(a.releaseDate).getTime();
      const timeB = new Date(b.releaseDate).getTime();
      return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
    });
  }, [articles, searchText, sortOrder]);

  return (
    <div className="news-container">
      {/* 1. HERO HEADER SECTION */}
      <section className="news-hero-sec">
        <div className="news-hero-overlay" />
        <div className="news-hero-content">
          <h1 className="news-hero-title">Press & Media Center</h1>
          <p className="news-hero-desc">
            Stay updated with company announcements, media coverage, business milestones,
            product launches & industry developments
          </p>
        </div>
      </section>

      {/* 2. MAIN NEWS SECTION */}
      <section className="news-content-sec">
        <div className="news-content-header">
          <h2 className="news-section-title">In the News</h2>
        </div>

        {isLoading ? (
          <div className="news-coming-soon-container" style={{ minHeight: "300px" }}>
            <div className="news-coming-soon-card" style={{ padding: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h3 className="news-coming-soon-title">Loading announcements...</h3>
            </div>
          </div>
        ) : error ? (
          <div className="news-coming-soon-container" style={{ minHeight: "300px" }}>
            <div className="news-coming-soon-card" style={{ padding: "40px" }}>
              <h3 className="news-coming-soon-title" style={{ color: "#ef5350" }}>Error Loading Announcements</h3>
              <p className="news-coming-soon-desc">{error}</p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="news-coming-soon-container">
            <div className="news-coming-soon-card">
              <div className="news-glow-orb-1"></div>
              <div className="news-glow-orb-2"></div>
              <div className="news-badge">
                <span className="news-badge-dot"></span>
                Media Center
              </div>
              <h2 className="news-coming-soon-title">
                Updates Coming Soon
              </h2>
              <p className="news-coming-soon-desc">
                We are currently preparing our official announcements, business milestones,
                press releases, and product launches. Stay tuned for the latest news from Aayush Wellness.
              </p>
              <div className="news-stay-tuned">
                <div className="news-pulse-circle"></div>
                <span>Press Releases Launching Soon</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="news-controls-bar">
              <form onSubmit={handleSearchSubmit} className="news-search-form">
                <input
                  type="text"
                  placeholder="Search articles, publications or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="news-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleResetSearch}
                    className="news-search-clear"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
                <button type="submit" className="news-search-submit">
                  Search
                </button>
              </form>

              <button
                onClick={handleToggleSort}
                className="news-sort-btn"
                aria-label={`Sort by date, current: ${sortOrder === "desc" ? "Newest First" : "Oldest First"}`}
              >
                <svg
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
                  <line x1="21" y1="10" x2="7" y2="10" />
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="21" y1="14" x2="11" y2="14" />
                  <line x1="21" y1="18" x2="15" y2="18" />
                </svg>
                <span>Sort By</span>
                <span className="news-sort-indicator">
                  ({sortOrder === "desc" ? "Newest" : "Oldest"})
                </span>
              </button>
            </div>

            {processedArticles.length > 0 ? (
              <div className="news-articles-grid">
                {processedArticles.map((article) => {
                  const source = getSource(article);
                  const link = article.pdfUrl || article.imageUrl || "#";
                  const description = getArticleDescription(article.content);
                  return (
                    <article key={article.id || article.slug} className="news-card-item">
                      <div className="news-card-logo-box">
                        <PublisherLogo source={source} />
                      </div>

                      <div className="news-card-divider" />

                      <div className="news-card-meta">
                        <span className="news-card-date">{formatDate(article.releaseDate)}</span>
                        <span className="news-card-bullet">•</span>
                        <span className="news-card-cat">Press Release</span>
                      </div>

                      <h3 className="news-card-title">{article.title}</h3>
                      {description && (
                        <p className="news-card-desc">{description}</p>
                      )}

                      <div className="news-card-footer">
                        <a
                          href={link}
                          className="news-card-readmore"
                          target={link !== "#" ? "_blank" : undefined}
                          rel={link !== "#" ? "noopener noreferrer" : undefined}
                        >
                          Read more
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="news-empty-state">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.35, marginBottom: "16px" }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <h3>No Articles Found</h3>
                <p>We couldn't find any articles matching "{searchText}". Try checking your spelling or adjusting your filters.</p>
                <button onClick={handleResetSearch} className="news-empty-reset-btn">
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
