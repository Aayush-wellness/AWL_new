"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS_DATA, HERBAL_MASALA_FEATURES, HERBAL_MASALA_INGREDIENTS, Product } from "./productsData";
import { apiClient } from "@/utils/apiClient";

// Gummy Bottle SVG Placeholder
const GummyPlaceholder = () => (
  <div className="prod-placeholder gummy-gradient">
    <div className="placeholder-visual">
      <svg width="60" height="76" viewBox="0 0 60 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="22" width="40" height="46" rx="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <rect x="18" y="8" width="24" height="14" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <line x1="18" y1="17" x2="42" y2="17" stroke="currentColor" strokeWidth="2" />
        {/* Floating circles inside */}
        <circle cx="24" cy="38" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="36" cy="44" r="4.5" fill="currentColor" opacity="0.8" />
        <circle cx="26" cy="52" r="3.5" fill="currentColor" opacity="0.7" />
        <circle cx="34" cy="58" r="3.5" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
    <span className="placeholder-label">Wellness Gummy Jar</span>
  </div>
);

// Supplement Capsule Bottle SVG Placeholder
const SupplementPlaceholder = () => (
  <div className="prod-placeholder supplement-gradient">
    <div className="placeholder-visual">
      <svg width="56" height="76" viewBox="0 0 56 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="20" width="32" height="48" rx="6" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <rect x="18" y="8" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <rect x="16" y="30" width="24" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        {/* Capsule icon */}
        <rect x="22" y="48" width="12" height="12" rx="6" fill="currentColor" opacity="0.8" />
      </svg>
    </div>
    <span className="placeholder-label">Supplement Capsules</span>
  </div>
);

// Herbal Masala Pouch SVG Placeholder
const MasalaPlaceholder = () => (
  <div className="prod-placeholder masala-gradient">
    <div className="placeholder-visual">
      <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14L18 8H46L52 14V68H12V14Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <line x1="12" y1="20" x2="52" y2="20" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="44" r="9" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" fill="none" />
        <path d="M28 44C30 42 32 41 34 43" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
    <span className="placeholder-label">Herbal Masala Pouch</span>
  </div>
);

// Shilajit Drops Dropper Bottle SVG Placeholder
const ShilajitPlaceholder = () => (
  <div className="prod-placeholder shilajit-gradient">
    <div className="placeholder-visual">
      <svg width="56" height="76" viewBox="0 0 56 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="24" width="28" height="44" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <rect x="20" y="8" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <line x1="28" y1="24" x2="28" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M22 8C22 5 25 3 28 3C31 3 34 5 34 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
    <span className="placeholder-label">Shilajit Dropper</span>
  </div>
);

export function ProductsPageClient() {
  const [categories, setCategories] = useState<any[]>(PRODUCTS_DATA);
  const [activeTab, setActiveTab] = useState("wellness-gummies");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [imgStyle, setImgStyle] = useState<React.CSSProperties>({
    height: "120%",
    width: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "none",
    maxHeight: "none",
    objectFit: "contain",
    zIndex: 2,
  });

  // Reset image style when active modal image changes to prevent visual layout flicker
  useEffect(() => {
    setImgStyle({
      height: "120%",
      width: "auto",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "none",
      maxHeight: "none",
      objectFit: "contain",
      zIndex: 2,
    });
  }, [activeModalImage]);

  // Fetch products from backend
  useEffect(() => {
    async function loadData() {
      try {
        const res = await apiClient.get<any[]>("/public/products");
        if (res.success && res.data && res.data.length > 0) {
          setCategories(res.data);
          const firstTab = res.data[0].slug || res.data[0].id;
          setActiveTab(firstTab);
        }
      } catch (err) {
        console.error("Failed to load live products, falling back to static:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Canvas bounds calculator to auto-compensate for transparent margins of PNG assets
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const tempWidth = 100;
      const tempHeight = Math.round((img.naturalHeight / img.naturalWidth) * tempWidth);
      if (!tempWidth || !tempHeight || isNaN(tempHeight)) return;

      canvas.width = tempWidth;
      canvas.height = tempHeight;

      ctx.drawImage(img, 0, 0, tempWidth, tempHeight);
      const imgData = ctx.getImageData(0, 0, tempWidth, tempHeight).data;

      let minX = tempWidth, minY = tempHeight, maxX = 0, maxY = 0;
      let hasAlpha = false;

      for (let y = 0; y < tempHeight; y++) {
        for (let x = 0; x < tempWidth; x++) {
          const idx = (y * tempWidth + x) * 4;
          const alpha = imgData[idx + 3];
          if (alpha > 10) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            hasAlpha = true;
          }
        }
      }

      if (hasAlpha) {
        const contentWidth = maxX - minX + 1;
        const contentHeight = maxY - minY + 1;

        const padLeftRatio = minX / tempWidth;
        const padTopRatio = minY / tempHeight;
        const widthRatio = contentWidth / tempWidth;
        const heightRatio = contentHeight / tempHeight;

        // Target content height fraction inside circle (e.g. 1.2 for overlap)
        const targetOverlap = 1.2;
        let scale = targetOverlap / heightRatio;
        if (scale > 3) scale = 3; // cap at 3x to avoid distortion on tiny elements

        const contentCenterY = padTopRatio + (heightRatio / 2);
        const contentCenterX = padLeftRatio + (widthRatio / 2);

        const offsetXPercent = (0.5 - contentCenterX) * 100;
        const offsetYPercent = (0.5 - contentCenterY) * 100;

        setImgStyle({
          height: "100%",
          width: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${offsetXPercent}%, ${offsetYPercent}%) scale(${scale})`,
          transformOrigin: "center center",
          maxWidth: "none",
          maxHeight: "none",
          objectFit: "contain",
          zIndex: 2,
        });
      }
    } catch (err) {
      console.error("Error computing image bounds:", err);
    }
  };

  // Get active tab data
  const currentTab = categories.find((tab) => (tab.slug || tab.id) === activeTab) || categories[0];

  // Modal control handlers
  const handleOpenDetails = (product: Product) => {
    if (activeTab === "herbal-masala") {
      const masalaProduct: Product = {
        ...product,
        keyBenefits: [
          "No Tobacco",
          "No Supari",
          "No Chemicals",
          "No Harmful Additives",
          "100% Ayurvedic Botanicals"
        ],
        consumerNeed: "Aayush Herbal Masala is a premium, tobacco-free and supari-free formulation - crafted with Ayurvedic botanicals to deliver an authentic, richly flavoured experience that actively supports oral health, digestion, and overall well-being. A genuinely intelligent alternative for millions choosing to make a mindful switch.",
        ingredientsList: [
          { name: "Cardamom Extract", image: "" },
          { name: "Fennel Seeds", image: "" },
          { name: "Clove Extract", image: "" },
          { name: "VLicorice Root", image: "" },
          { name: "Mint Leaves", image: "" },
          { name: "Areca Nut Substitute", image: "" }
        ],
        thumbnails: []
      };
      setSelectedProduct(masalaProduct);
      setActiveModalImage(product.image);
      document.body.classList.add("modal-open");
    } else {
      setSelectedProduct(product);
      setActiveModalImage(product.image);
      document.body.classList.add("modal-open");
    }
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    document.body.classList.remove("modal-open");
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseDetails();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      // Clean up body class just in case of unmount while modal is open
      document.body.classList.remove("modal-open");
    };
  }, []);

  // Helper to map ingredients to gorgeous matching mockup colors
  const getIngredientGradient = (name: string) => {
    const normName = name.toLowerCase();
    if (normName.includes("prebiotic")) return "linear-gradient(135deg, #f0fdf4, #bbf7d0)";
    if (normName.includes("cranberry")) return "linear-gradient(135deg, #ffe4e6, #fda4af)";
    if (normName.includes("n-acetyl") || normName.includes("nac")) return "linear-gradient(135deg, #f3f4f6, #d1d5db)";
    if (normName.includes("alpha lipoic") || normName.includes("ala")) return "linear-gradient(135deg, #fef3c7, #fde047)";
    if (normName.includes("glutamine")) return "linear-gradient(135deg, #ecfdf5, #a7f3d0)";
    if (normName.includes("carnitine")) return "linear-gradient(135deg, #e0f2fe, #bae6fd)";
    if (normName.includes("nettle")) return "linear-gradient(135deg, #f0fdf4, #bbf7d0)";
    if (normName.includes("shatavari")) return "linear-gradient(135deg, #fdf2f8, #fbcfe8)";
    if (normName.includes("quercetin")) return "linear-gradient(135deg, #fef9c3, #fef08a)";
    if (normName.includes("cone flower")) return "linear-gradient(135deg, #f5f3ff, #ddd6fe)";
    if (normName.includes("elderberry")) return "linear-gradient(135deg, #faf5ff, #e9d5ff)";
    if (normName.includes("rose hip")) return "linear-gradient(135deg, #fff1f2, #fecdd3)";
    if (normName.includes("vitamin b")) return "linear-gradient(135deg, #fff7ed, #ffedd5)";
    if (normName.includes("turmeric")) return "linear-gradient(135deg, #fef3c7, #fbbf24)";
    if (normName.includes("shilajit")) return "linear-gradient(135deg, #eedbc5, #c8a27b)";
    if (normName.includes("fulvic")) return "linear-gradient(135deg, #fef3c7, #fcd34d)";
    if (normName.includes("glutathione")) return "linear-gradient(135deg, #f5e6d3, #d7bfa6)";
    if (normName.includes("hyaluronic")) return "linear-gradient(135deg, #e0f2fe, #7dd3fc)";
    if (normName.includes("biotin")) return "linear-gradient(135deg, #fef3c7, #fcd34d)";
    if (normName.includes("vitamin c")) return "linear-gradient(135deg, #ffedd5, #fdba74)";
    if (normName.includes("sea buckthorn")) return "linear-gradient(135deg, #ffe7d5, #f97316)";
    if (normName.includes("gotu kola")) return "linear-gradient(135deg, #dcfce7, #86efac)";
    if (normName.includes("melatonin")) return "linear-gradient(135deg, #e0e7ff, #a5b4fc)";
    if (normName.includes("chamomile")) return "linear-gradient(135deg, #fefce8, #fde047)";
    if (normName.includes("theanine")) return "linear-gradient(135deg, #ecfdf5, #a7f3d0)";
    if (normName.includes("valerian")) return "linear-gradient(135deg, #f5f5f4, #d6d3d1)";
    if (normName.includes("lemon balm")) return "linear-gradient(135deg, #f0fdf4, #bbf7d0)";
    if (normName.includes("brahmi") || normName.includes("bacopa")) return "linear-gradient(135deg, #dcfce7, #a7f3d0)";
    if (normName.includes("shankhpushpi")) return "linear-gradient(135deg, #e0f2fe, #93c5fd)";
    if (normName.includes("ashwagandha") || normName.includes("withania")) return "linear-gradient(135deg, #fef3c7, #fcd34d)";
    if (normName.includes("ginkgo")) return "linear-gradient(135deg, #ffedd5, #f59e0b)";
    if (normName.includes("probiotic")) return "linear-gradient(135deg, #ecfdf5, #34d399)";
    if (normName.includes("triphala")) return "linear-gradient(135deg, #f5e6d3, #b45309)";
    if (normName.includes("ginger")) return "linear-gradient(135deg, #fef3c7, #fbbf24)";
    if (normName.includes("fennel")) return "linear-gradient(135deg, #f0fdf4, #86efac)";
    if (normName.includes("milk thistle")) return "linear-gradient(135deg, #fae8ff, #d8b4fe)";
    if (normName.includes("bhumi amla")) return "linear-gradient(135deg, #dcfce7, #4ade80)";
    if (normName.includes("kalmegh")) return "linear-gradient(135deg, #f0fdf4, #15803d)";
    if (normName.includes("kutki")) return "linear-gradient(135deg, #f5e6d3, #a28a6f)";
    if (normName.includes("vasaka")) return "linear-gradient(135deg, #dcfce7, #86efac)";
    if (normName.includes("tulsi")) return "linear-gradient(135deg, #ecfdf5, #34d399)";
    if (normName.includes("yashtimadhu")) return "linear-gradient(135deg, #fef3c7, #fbbf24)";
    if (normName.includes("pippali")) return "linear-gradient(135deg, #f5f5f4, #78716c)";
    if (normName.includes("giloy")) return "linear-gradient(135deg, #ecfdf5, #10b981)";
    if (normName.includes("amla")) return "linear-gradient(135deg, #dcfce7, #4ade80)";
    if (normName.includes("curcumin") || normName.includes("curcuma")) return "linear-gradient(135deg, #fef3c7, #f59e0b)";
    if (normName.includes("karela")) return "linear-gradient(135deg, #dcfce7, #15803d)";
    if (normName.includes("jamun")) return "linear-gradient(135deg, #f3e8ff, #c084fc)";
    if (normName.includes("gurmar")) return "linear-gradient(135deg, #f0fdf4, #86efac)";
    if (normName.includes("vijaysar")) return "linear-gradient(135deg, #f5e6d3, #b45309)";
    if (normName.includes("calcium")) return "linear-gradient(135deg, #e0f2fe, #38bdf8)";
    if (normName.includes("vitamin d3")) return "linear-gradient(135deg, #fef3c7, #fcd34d)";
    if (normName.includes("magnesium")) return "linear-gradient(135deg, #f1f5f9, #cbd5e1)";
    if (normName.includes("zinc")) return "linear-gradient(135deg, #faf5ff, #d8b4fe)";
    if (normName.includes("vitamin e")) return "linear-gradient(135deg, #ffe4e6, #fecdd3)";
    if (normName.includes("silica")) return "linear-gradient(135deg, #e0f2fe, #a5f3fc)";
    if (normName.includes("kaunch beej")) return "linear-gradient(135deg, #e0e7ff, #a5b4fc)";
    if (normName.includes("mulethi")) return "linear-gradient(135deg, #fefce8, #fde047)";
    if (normName.includes("kesar")) return "linear-gradient(135deg, #ffe7d5, #f97316)";
    if (normName.includes("cardamom")) return "linear-gradient(135deg, #dcfce7, #86efac)";
    if (normName.includes("clove")) return "linear-gradient(135deg, #fed7aa, #ea580c)";
    if (normName.includes("licorice") || normName.includes("vlicorice")) return "linear-gradient(135deg, #fef9c3, #facc15)";
    if (normName.includes("mint")) return "linear-gradient(135deg, #ecfdf5, #10b981)";
    if (normName.includes("areca") || normName.includes("substitute")) return "linear-gradient(135deg, #e0f2fe, #6366f1)";

    return "linear-gradient(135deg, #f3f4f6, #e5e7eb)";
  };

  // Render SVG outline centered in modal's left circle
  const renderModalPlaceholderIcon = () => {
    if (activeTab === "wellness-gummies") {
      return (
        <svg width="76" height="96" viewBox="0 0 60 76" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.65 }}>
          <rect x="10" y="22" width="40" height="46" rx="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <rect x="18" y="8" width="24" height="14" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <line x1="18" y1="17" x2="42" y2="17" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="38" r="3" fill="currentColor" opacity="0.6" />
          <circle cx="36" cy="44" r="4.5" fill="currentColor" opacity="0.8" />
          <circle cx="26" cy="52" r="3.5" fill="currentColor" opacity="0.7" />
          <circle cx="34" cy="58" r="3.5" fill="currentColor" opacity="0.5" />
        </svg>
      );
    } else {
      return (
        <svg width="72" height="96" viewBox="0 0 56 76" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.65 }}>
          <rect x="12" y="20" width="32" height="48" rx="6" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <rect x="18" y="8" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <rect x="16" y="30" width="24" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <rect x="22" y="48" width="12" height="12" rx="6" fill="currentColor" opacity="0.8" />
        </svg>
      );
    }
  };

  return (
    <div className="products-container">
      {/* Intro Hero Section */}
      <section className="products-hero-sec">
        <div className="products-hero-left">
          <h1 className="products-hero-title">
            A complete range built on science and nature.
          </h1>
        </div>

        {/* Animated Asterisk Icon */}
        <div className="products-hero-center">
          <div className="asterisk-wrapper animate-spin-slow">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path d="M2 28.8928L15.9269 22.6025L23.943 27.3203L25.5624 42.7978L15.684 42.7148L17.1415 31.9551L15.4411 30.9619L7.10111 37.5836L2 28.8928Z" fill="#C1FF72" />
              <path d="M24.8342 26.6576L37.1419 35.8446L42 26.9887L32.1213 22.933V20.9466L42 16.8082L37.1419 8.03488L24.8342 17.2221V26.6576Z" fill="#C1FF72" />
              <path d="M23.943 16.4775L25.5624 1L15.684 1.16549L17.1415 11.9253L15.4411 12.9185L7.02015 6.29708L2 14.9049L15.9269 21.1952L23.943 16.4775Z" fill="#C1FF72" />
            </svg>
          </div>
        </div>

        <div className="products-hero-right">
          <p className="products-hero-desc">
            Aayush Wellness offers a thoughtfully developed portfolio of nutraceuticals, herbal wellness
            formulations, and functional supplements - each grounded in Ayurvedic wisdom, validated by modern
            science, and designed to address the genuine, preventive health needs of everyday life.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="products-tabs-bar">
        <div className="tabs-nav-wrapper">
          {categories.map((tab) => (
            <button
              key={tab.slug || tab.id}
              onClick={() => setActiveTab(tab.slug || tab.id)}
              className={`tab-btn ${activeTab === (tab.slug || tab.id) ? "active" : ""}`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Content Area */}
      <section className="products-list-sec">
        {/* Section Heading */}
        <div className="products-sec-header">
          <h2 className="products-sec-title">{currentTab.sectionTitle}</h2>
          {currentTab.sectionSubtitle && (
            <p className="products-sec-subtitle">{currentTab.sectionSubtitle}</p>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className={`products-cards-grid grid-${activeTab}`}>
          {currentTab.products?.map((product: Product) => {
            const hasImage = product.image && product.image.trim() !== "";
            const hasDetails = activeTab !== "herbal-masala" && activeTab !== "shilajit-drops";
            return (
              <div
                key={product.id}
                className={`prod-card ${hasDetails ? "has-details" : "no-details"}`}
                onClick={() => hasDetails && handleOpenDetails(product)}
              >
                {/* Plus Icon Button in Top-Right */}
                {hasDetails && (
                  <button
                    className="prod-plus-btn"
                    aria-label="View product details"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card container onClick triggering twice
                      handleOpenDetails(product);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M11.25 12.75H5.5V11.25H11.25V5.5H12.75V11.25H18.5V12.75H12.75V18.5H11.25V12.75Z" fill="#050505" />
                    </svg>
                  </button>
                )}

                {/* Product Image Box */}
                <div className="prod-image-wrapper">
                  {hasImage ? (
                    <img src={product.image} alt={product.title} className="prod-actual-img" />
                  ) : (
                    <>
                      {activeTab === "wellness-gummies" && <GummyPlaceholder />}
                      {activeTab === "health-supplements" && <SupplementPlaceholder />}
                      {activeTab === "herbal-masala" && <MasalaPlaceholder />}
                      {activeTab === "shilajit-drops" && <ShilajitPlaceholder />}
                    </>
                  )}
                </div>

                {/* Product Card Details */}
                <div className="prod-info">
                  {product.subLabel && (
                    <span className="prod-sublabel">{product.subLabel}</span>
                  )}
                  <h3 className="prod-title">{product.title}</h3>
                  {product.description && (
                    <p className="prod-description">{product.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Conditionally Rendered Bottom Banners */}

      {/* 1. Why Drops black banner for Shilajit Drops Tab */}
      {activeTab === "shilajit-drops" && (
        <section className="shilajit-banner-sec">
          <div className="shilajit-banner-card">
            <h2 className="shilajit-banner-title">Why Drops?</h2>

            <div className="shilajit-features-grid">
              <div className="shilajit-feature-card">
                <div className="shilajit-feature-header">
                  <span className="shilajit-checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                      <path d="M15.2889 28.028C22.3251 28.028 28.029 22.3241 28.029 15.2879C28.029 8.25178 22.3251 2.54785 15.2889 2.54785C8.25275 2.54785 2.54883 8.25178 2.54883 15.2879C2.54883 22.3241 8.25275 28.028 15.2889 28.028Z" stroke="#66AD0C" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.4668 15.288L14.0148 17.836L19.1108 12.74" stroke="#66AD0C" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="shilajit-feature-title">Faster & More Convenient</h3>
                </div>
                <p className="shilajit-feature-desc">
                  No mixing, measuring, or preparation required. Simply add the recommended serving and go.
                </p>
              </div>

              <div className="shilajit-feature-card">
                <div className="shilajit-feature-header">
                  <span className="shilajit-checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                      <path d="M15.2889 28.028C22.3251 28.028 28.029 22.3241 28.029 15.2879C28.029 8.25178 22.3251 2.54785 15.2889 2.54785C8.25275 2.54785 2.54883 8.25178 2.54883 15.2879C2.54883 22.3241 8.25275 28.028 15.2889 28.028Z" stroke="#66AD0C" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.4668 15.288L14.0148 17.836L19.1108 12.74" stroke="#66AD0C" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="shilajit-feature-title">Easy Daily Consistency</h3>
                </div>
                <p className="shilajit-feature-desc">
                  A simple liquid format makes it easier to build a regular wellness habit compared to traditional resins or powders.
                </p>
              </div>

              <div className="shilajit-feature-card">
                <div className="shilajit-feature-header">
                  <span className="shilajit-checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                      <path d="M15.2889 28.028C22.3251 28.028 28.029 22.3241 28.029 15.2879C28.029 8.25178 22.3251 2.54785 15.2889 2.54785C8.25275 2.54785 2.54883 8.25178 2.54883 15.2879C2.54883 22.3241 8.25275 28.028 15.2889 28.028Z" stroke="#66AD0C" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.4668 15.288L14.0148 17.836L19.1108 12.74" stroke="#66AD0C" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="shilajit-feature-title">Portable & Travel-Friendly</h3>
                </div>
                <p className="shilajit-feature-desc">
                  Compact and easy to carry, allowing wellness support wherever life takes you.
                </p>
              </div>

              <div className="shilajit-feature-card">
                <div className="shilajit-feature-header">
                  <span className="shilajit-checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                      <path d="M15.2889 28.028C22.3251 28.028 28.029 22.3241 28.029 15.2879C28.029 8.25178 22.3251 2.54785 15.2889 2.54785C8.25275 2.54785 2.54883 8.25178 2.54883 15.2879C2.54883 22.3241 8.25275 28.028 15.2889 28.028Z" stroke="#66AD0C" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.4668 15.288L14.0148 17.836L19.1108 12.74" stroke="#66AD0C" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="shilajit-feature-title">Flexible Consumption</h3>
                </div>
                <p className="shilajit-feature-desc">
                  Can be taken directly or mixed with water, making it adaptable to individual preferences and routines.
                </p>
              </div>
            </div>

            <div className="shilajit-ingredients-box">
              <h4 className="shilajit-ingredients-header">CRAFTED AROUND A SINGULAR POWERFUL INGREDIENT</h4>
              <div className="shilajit-ingredients-details">
                <div className="shilajit-ingredient-row">
                  <span className="shilajit-ingredient-name">Purified Himalayan Shilajit</span>
                  <span className="shilajit-ingredient-colon"> : </span>
                  <span className="shilajit-ingredient-benefit">Traditionally used to support vitality, stamina, and overall wellness.</span>
                </div>
                <div className="shilajit-ingredient-row">
                  <span className="shilajit-ingredient-name">Fulvic Compounds</span>
                  <span className="shilajit-ingredient-colon"> : </span>
                  <span className="shilajit-ingredient-benefit">Naturally occurring compounds that contribute to Shilajit's unique composition.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Key ingredients black banner for Herbal Masala Tab */}
      {activeTab === "herbal-masala" && (
        <section className="masala-banner-sec">
          <div className="masala-banner-card">
            {/* Banner Statement */}
            <p className="masala-banner-intro">
              Every ingredient is selected for both authentic flavour and documented Ayurvedic benefit,
              creating a product that doesn't just replace harm but actively contributes to health.
            </p>

            {/* Safety Badges Checkbox List */}
            <div className="masala-features-list">
              {HERBAL_MASALA_FEATURES.map((feature, idx) => (
                <div key={idx} className="masala-feature-item">
                  <span className="checkmark-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                      <path d="M15.2889 28.028C22.3251 28.028 28.029 22.3241 28.029 15.2879C28.029 8.25178 22.3251 2.54785 15.2889 2.54785C8.25275 2.54785 2.54883 8.25178 2.54883 15.2879C2.54883 22.3241 8.25275 28.028 15.2889 28.028Z" stroke="#66AD0C" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.4668 15.288L14.0148 17.836L19.1108 12.74" stroke="#66AD0C" strokeWidth="2.54802" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}
            </div>

            {/* Key Ayurvedic Ingredients Section */}
            <div className="masala-ingredients-box">
              <h4 className="ingredients-header">KEY AYURVEDIC INGREDIENTS</h4>
              <div className="ingredients-inline-list">
                {HERBAL_MASALA_INGREDIENTS.map((ing, idx) => (
                  <span key={idx} className="ingredient-item">
                    <span className="ingredient-name">{ing.name}</span>
                    <span className="ingredient-benefit"> - {ing.benefit}</span>
                    {idx < HERBAL_MASALA_INGREDIENTS.length - 1 && (
                      <span className="ingredient-separator"> &bull; </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Explore full range banner for Wellness Gummies Tab */}
      <section className="gummies-banner-sec">
        <div className="gummies-banner-card">
          <div className="banner-left">
            <h2 className="banner-title">Explore the full product range.</h2>
            <p className="banner-desc">
              All Aayush Wellness products are available directly through our online store - with
              pan-India delivery and multiple format options to suit individual and institutional requirements.
            </p>
          </div>
          <div className="banner-right">
            <Link href="https://store.aayushwellness.com/" className="banner-cta-btn">
              Visit Our Store &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         PRODUCT DETAIL MODAL DIALOG
         ========================================================================== */}
      {selectedProduct && (
        <div className="prod-modal-overlay" onClick={handleCloseDetails}>
          <div className="prod-modal-box animate-modal-in" onClick={(e) => e.stopPropagation()}>
            {/* Round Green Close Button in Top-Right */}
            <button className="modal-close-btn" onClick={handleCloseDetails} aria-label="Close modal">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="prod-modal-content">
              {/* Left Column: Image circle, Thumbnails, Title */}
              <div className="modal-left-col">
                <div className="modal-image-circle">
                  {activeModalImage ? (
                    <img
                      src={activeModalImage}
                      alt={selectedProduct.title}
                      className="modal-actual-img"
                      style={imgStyle}
                      onLoad={handleImageLoad}
                      crossOrigin={activeModalImage.startsWith("http") ? "anonymous" : undefined}
                    />
                  ) : (
                    <div className="modal-placeholder-icon">
                      {renderModalPlaceholderIcon()}
                    </div>
                  )}
                </div>

                {/* Smaller Thumbnails side-by-side */}
                <div className="modal-thumbnails">
                  {[selectedProduct.image, ...(selectedProduct.thumbnails || [])]
                    .filter((thumb) => thumb !== undefined)
                    .map((thumb, idx) => (
                      <div
                        key={idx}
                        className={`modal-thumb ${activeModalImage === thumb ? "active" : ""}`}
                        onClick={() => {
                          if (thumb) {
                            setActiveModalImage(thumb);
                          }
                        }}
                      >
                        {thumb ? (
                          <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="modal-thumb-img" />
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.25 }}>
                            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                            <path d="M20.5 14L15.5 9L11 13.5L8 10.5L3.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    ))}
                </div>

                <h3 className="modal-left-title">{selectedProduct.title}</h3>
              </div>

              {/* Dividing Vertical Line */}
              <div className="modal-vertical-divider" />

              {/* Right Column: Benefits, Need, Ingredients Grid */}
              <div className="modal-right-col">
                {/* 1. Key Benefits */}
                {selectedProduct.keyBenefits && (
                  <div className="modal-sec-block">
                    <h4 className="modal-sec-title">Key Benefits</h4>
                    <ul className="benefit-list">
                      {selectedProduct.keyBenefits.map((benefit, idx) => (
                        <li key={idx} className="benefit-item">
                          <span className="benefit-asterisk">
                            <svg width="12" height="12" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M20 2V38M2 20H38M7.27 7.27L32.73 32.73M7.27 32.73L32.73 7.27"
                                stroke="#95D754"
                                strokeWidth="5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <span className="benefit-text">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 2. Consumer Need */}
                {selectedProduct.consumerNeed && (
                  <div className="modal-sec-block">
                    <h4 className="modal-sec-title">Consumer Need</h4>
                    <p className="modal-consumer-need-desc">
                      {selectedProduct.consumerNeed}
                    </p>
                  </div>
                )}

                {/* 3. Ingredients grid with dynamic pastel colors */}
                {selectedProduct.ingredientsList && (
                  <div className="modal-sec-block">
                    <h4 className="modal-sec-title">Ingredients</h4>
                    <div className="modal-ingredients-row">
                      {selectedProduct.ingredientsList.map((ing, idx) => (
                        <div
                          key={idx}
                          className="ingredient-thumb"
                          style={{ background: getIngredientGradient(ing.name) }}
                        >
                          {ing.image ? (
                            <img src={ing.image} alt={ing.name} className="ingredient-thumb-img" />
                          ) : (
                            <span className="ingredient-thumb-label">{ing.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
