"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminTable, { TableColumn } from "../AdminTable";
import AdminModal from "../AdminModal";
import AdminDeleteConfirm from "../AdminDeleteConfirm";
import { apiClient } from "@/utils/apiClient";
import { uploadFile } from "@/utils/upload";
import { useAdminToasts, AdminToasts } from "../AdminToast";

interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  sectionTitle: string;
  sectionSubtitle: string | null;
  isActive: boolean;
  sortOrder: number;
  _count?: {
    products: number;
  };
}

interface Ingredient {
  name: string;
  image: string;
}

interface Product {
  id: string;
  title: string;
  subLabel: string | null;
  description: string | null;
  categoryId: string;
  image: string | null;
  thumbnails: string[];
  keyBenefits: string[];
  consumerNeed: string | null;
  ingredientsList: Ingredient[] | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function ProductList() {
  const [activeTab, setActiveTab] = useState<"products" | "categories">("products");
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Loading & error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, showToast } = useAdminToasts();

  // Modal open states
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<"category" | "product">("product");

  // Edit / Delete tracking
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingItem, setDeletingItem] = useState<{ id: string; name: string } | null>(null);

  // Form states - ProductCategory
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catSectionTitle, setCatSectionTitle] = useState("");
  const [catSectionSubtitle, setCatSectionSubtitle] = useState("");
  const [catSortOrder, setCatSortOrder] = useState<number>(0);
  const [catIsActive, setCatIsActive] = useState(true);

  // Form states - Product
  const [prodTitle, setProdTitle] = useState("");
  const [prodSubLabel, setProdSubLabel] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodCategoryId, setProdCategoryId] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodConsumerNeed, setProdConsumerNeed] = useState("");
  const [prodSortOrder, setProdSortOrder] = useState<number>(0);
  const [prodIsActive, setProdIsActive] = useState(true);
  const [benefitInput, setBenefitInput] = useState("");
  const [keyBenefits, setKeyBenefits] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  // Image Upload states
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  const [prodThumbnails, setProdThumbnails] = useState<string[]>([]);
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);
  const [thumbnailUploadError, setThumbnailUploadError] = useState<string | null>(null);

  // Fetch all products and categories
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [catsRes, prodsRes] = await Promise.all([
        apiClient.get<{ items: ProductCategory[] }>("/products/categories?limit=100"),
        apiClient.get<{ items: Product[] }>("/products?limit=500")
      ]);

      if (catsRes.success && catsRes.data) {
        setCategories(catsRes.data.items);
      }
      if (prodsRes.success && prodsRes.data) {
        setProducts(prodsRes.data.items);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load products. Please check database server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle image upload to Cloudinary via backend Multer router
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImageUploading(true);
    setImageUploadError(null);
    try {
      const url = await uploadFile(file, "/products/upload");
      setProdImage(url);
    } catch (err: any) {
      setImageUploadError(err.message || "Failed to upload product image.");
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsThumbnailUploading(true);
    setThumbnailUploadError(null);
    try {
      const url = await uploadFile(file, "/products/upload");
      setProdThumbnails((prev) => [...prev, url]);
    } catch (err: any) {
      setThumbnailUploadError(err.message || "Failed to upload thumbnail.");
    } finally {
      setIsThumbnailUploading(false);
    }
  };

  const removeThumbnail = (idx: number) => {
    setProdThumbnails((prev) => prev.filter((_, i) => i !== idx));
  };

  // --- Category Actions ---
  const handleCreateCategoryOpen = () => {
    setEditingCategory(null);
    setCatName("");
    setCatSlug("");
    setCatSectionTitle("");
    setCatSectionSubtitle("");
    setCatSortOrder(categories.length > 0 ? Math.max(...categories.map((c) => c.sortOrder)) + 10 : 0);
    setCatIsActive(true);
    setIsCategoryFormOpen(true);
  };

  const handleEditCategoryOpen = (cat: ProductCategory) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatSectionTitle(cat.sectionTitle);
    setCatSectionSubtitle(cat.sectionSubtitle || "");
    setCatSortOrder(cat.sortOrder);
    setCatIsActive(cat.isActive);
    setIsCategoryFormOpen(true);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim() || !catSectionTitle.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: catName.trim(),
        slug: catSlug.trim() || undefined,
        sectionTitle: catSectionTitle.trim(),
        sectionSubtitle: catSectionSubtitle.trim() || null,
        sortOrder: Number(catSortOrder),
        isActive: catIsActive,
      };

      if (editingCategory) {
        await apiClient.patch(`/products/categories/${editingCategory.id}`, payload);
        showToast("Category updated successfully!", "success");
      } else {
        await apiClient.post("/products/categories", payload);
        showToast("Category created successfully!", "success");
      }
      setIsCategoryFormOpen(false);
      await fetchData();
    } catch (err: any) {
      showToast(err.message || "Failed to save product category.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Product Actions ---
  const handleCreateProductOpen = () => {
    setEditingProduct(null);
    setProdTitle("");
    setProdSubLabel("");
    setProdDescription("");
    setProdCategoryId(categories.length > 0 ? categories[0].id : "");
    setProdImage("");
    setProdConsumerNeed("");
    setProdSortOrder(products.length > 0 ? Math.max(...products.map((p) => p.sortOrder)) + 10 : 0);
    setProdIsActive(true);
    setKeyBenefits([]);
    setIngredients([]);
    setProdThumbnails([]);
    setBenefitInput("");
    setIngredientInput("");
    setImageUploadError(null);
    setThumbnailUploadError(null);
    setIsProductFormOpen(true);
  };

  const handleEditProductOpen = (prod: Product) => {
    setEditingProduct(prod);
    setProdTitle(prod.title);
    setProdSubLabel(prod.subLabel || "");
    setProdDescription(prod.description || "");
    setProdCategoryId(prod.categoryId);
    setProdImage(prod.image || "");
    setProdConsumerNeed(prod.consumerNeed || "");
    setProdSortOrder(prod.sortOrder);
    setProdIsActive(prod.isActive);
    setKeyBenefits(prod.keyBenefits || []);
    setIngredients((prod.ingredientsList || []).map((i) => i.name));
    setProdThumbnails(prod.thumbnails || []);
    setBenefitInput("");
    setIngredientInput("");
    setImageUploadError(null);
    setThumbnailUploadError(null);
    setIsProductFormOpen(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle.trim() || !prodCategoryId) return;

    setIsSubmitting(true);
    try {
      const formattedIngredients = ingredients.map((name) => ({ name, image: "" }));
      const payload = {
        title: prodTitle.trim(),
        subLabel: prodSubLabel.trim() || null,
        description: prodDescription.trim() || null,
        categoryId: prodCategoryId,
        image: prodImage.trim() || null,
        thumbnails: prodThumbnails,
        keyBenefits,
        consumerNeed: prodConsumerNeed.trim() || null,
        ingredientsList: formattedIngredients,
        sortOrder: Number(prodSortOrder),
        isActive: prodIsActive,
      };

      if (editingProduct) {
        await apiClient.patch(`/products/${editingProduct.id}`, payload);
        showToast("Product updated successfully!", "success");
      } else {
        await apiClient.post("/products", payload);
        showToast("Product created successfully!", "success");
      }
      setIsProductFormOpen(false);
      await fetchData();
    } catch (err: any) {
      showToast(err.message || "Failed to save product.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Delete Actions ---
  const handleDeleteOpen = (item: { id: string; name: string }, type: "category" | "product") => {
    setDeletingItem(item);
    setDeleteType(type);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;

    try {
      if (deleteType === "category") {
        await apiClient.delete(`/products/categories/${deletingItem.id}`);
        showToast(`Category "${deletingItem.name}" deleted successfully!`, "success");
      } else {
        await apiClient.delete(`/products/${deletingItem.id}`);
        showToast(`Product "${deletingItem.name}" deleted successfully!`, "success");
      }
      setIsDeleteOpen(false);
      setDeletingItem(null);
      await fetchData();
    } catch (err: any) {
      showToast(err.message || `Failed to delete ${deleteType}.`, "error");
    }
  };

  // Tag inputs helper actions
  const addBenefit = () => {
    if (benefitInput.trim() && !keyBenefits.includes(benefitInput.trim())) {
      setKeyBenefits([...keyBenefits, benefitInput.trim()]);
      setBenefitInput("");
    }
  };

  const removeBenefit = (idx: number) => {
    setKeyBenefits(keyBenefits.filter((_, i) => i !== idx));
  };

  const addIngredient = () => {
    if (ingredientInput.trim() && !ingredients.includes(ingredientInput.trim())) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const removeIngredient = (idx: number) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const getProductImageSrc = (imgSrc: string | null) => {
    if (!imgSrc) return "https://placehold.co/100x100/101010/d4ff9e?text=AWL";
    return imgSrc;
  };

  // --- Columns Definitions ---
  const categoryColumns: TableColumn<ProductCategory>[] = [
    {
      header: "Category Name",
      accessor: "name",
      render: (row) => <strong style={{ color: "var(--admin-text-primary)" }}>{row.name}</strong>,
    },
    {
      header: "Slug / Identifier",
      accessor: "slug",
      render: (row) => <code style={{ fontSize: "0.85rem", background: "#eae6df", padding: "2px 6px", borderRadius: "4px" }}>{row.slug}</code>,
    },
    {
      header: "Section Heading Title",
      accessor: "sectionTitle",
      render: (row) => <span style={{ fontSize: "0.9rem", color: "var(--admin-text-secondary)" }}>{row.sectionTitle}</span>,
    },
    {
      header: "Sort Order",
      accessor: "sortOrder",
      render: (row) => <span className="admin-badge admin-badge-info">{row.sortOrder}</span>,
    },
    {
      header: "Products Count",
      render: (row) => <span style={{ fontWeight: "600" }}>{row._count?.products ?? 0} prods</span>,
    },
    {
      header: "Status",
      accessor: "isActive",
      render: (row) => (
        <span className={`admin-badge ${row.isActive ? "admin-badge-success" : "admin-badge-danger"}`}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const productColumns: TableColumn<Product>[] = [
    {
      header: "Product Info",
      accessor: "title",
      render: (row) => (
        <div className="admin-table-product-cell">
          <img
            src={getProductImageSrc(row.image)}
            alt={row.title}
            className="admin-table-thumb"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/100x100/101010/d4ff9e?text=AWL";
            }}
          />
          <div className="admin-table-product-info">
            <span className="admin-table-product-name">{row.title}</span>
            {row.subLabel && <span className="admin-table-product-sub">{row.subLabel}</span>}
          </div>
        </div>
      ),
    },
    {
      header: "Category Tab",
      render: (row) => (
        <span className="admin-badge admin-badge-success">
          {row.category?.name || "Uncategorized"}
        </span>
      ),
    },
    {
      header: "Sort Order",
      accessor: "sortOrder",
      render: (row) => <span className="admin-badge admin-badge-info">{row.sortOrder}</span>,
    },
    {
      header: "Benefits Count",
      render: (row) => <span>{(row.keyBenefits || []).length} benefits</span>,
    },
    {
      header: "Ingredients Count",
      render: (row) => <span>{(row.ingredientsList || []).length} ingredients</span>,
    },
    {
      header: "Status",
      accessor: "isActive",
      render: (row) => (
        <span className={`admin-badge ${row.isActive ? "admin-badge-success" : "admin-badge-danger"}`}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  if (isLoading && categories.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px", color: "var(--admin-text-secondary)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "24px", height: "24px", border: "2px solid rgba(79, 124, 13, 0.1)", borderTop: "2px solid #4f7c0d", borderRadius: "50%", animation: "admin-spin 1s linear infinite" }} />
          <span>Loading products data...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div style={{ background: "rgba(211,47,47,0.08)", border: "1px solid rgba(211,47,47,0.3)", borderRadius: "8px", padding: "12px 16px", marginBottom: "16px", color: "#ef5350", fontSize: "14px" }}>
          ❌ {error}
          <button onClick={fetchData} style={{ marginLeft: "12px", textDecoration: "underline", cursor: "pointer", background: "none", border: "none", color: "inherit" }}>
            Retry
          </button>
        </div>
      )}

      {/* Tab Toggles */}
      <div style={{ display: "flex", borderBottom: "2px solid #eae6df", marginBottom: "24px", gap: "24px" }}>
        <button
          onClick={() => setActiveTab("products")}
          style={{
            background: "none",
            border: "none",
            borderBottom: activeTab === "products" ? "3px solid #4f7c0d" : "3px solid transparent",
            color: activeTab === "products" ? "#4f7c0d" : "var(--admin-text-secondary)",
            padding: "10px 4px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Active Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          style={{
            background: "none",
            border: "none",
            borderBottom: activeTab === "categories" ? "3px solid #4f7c0d" : "3px solid transparent",
            color: activeTab === "categories" ? "#4f7c0d" : "var(--admin-text-secondary)",
            padding: "10px 4px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Product Categories ({categories.length})
        </button>
      </div>

      {/* Render Active View */}
      {activeTab === "products" ? (
        <AdminTable
          data={products}
          columns={productColumns}
          searchPlaceholder="Search products by title, sub-label..."
          searchKeys={["title", "subLabel"]}
          onCreate={handleCreateProductOpen}
          createButtonText="Add Product"
          onEdit={handleEditProductOpen}
          onDelete={(row) => handleDeleteOpen({ id: row.id, name: row.title }, "product")}
        />
      ) : (
        <AdminTable
          data={categories}
          columns={categoryColumns}
          searchPlaceholder="Search categories by name, slug..."
          searchKeys={["name", "slug", "sectionTitle"]}
          onCreate={handleCreateCategoryOpen}
          createButtonText="Add Category Tab"
          onEdit={handleEditCategoryOpen}
          onDelete={(row) => handleDeleteOpen({ id: row.id, name: row.name }, "category")}
        />
      )}

      {/* --- Category Modal --- */}
      <AdminModal
        isOpen={isCategoryFormOpen}
        onClose={() => setIsCategoryFormOpen(false)}
        title={editingCategory ? "Edit Category Tab" : "Create Category Tab"}
      >
        <form onSubmit={handleCategorySubmit}>
          <div className="admin-form-group">
            <label className="admin-label">Category Tab Name *</label>
            <input
              type="text"
              className="admin-input"
              required
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              placeholder="e.g. Wellness Gummies"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">URL Slug / URL Key (Optional)</label>
            <input
              type="text"
              className="admin-input"
              value={catSlug}
              onChange={(e) => setCatSlug(e.target.value)}
              placeholder="e.g. wellness-gummies"
            />
            <span style={{ fontSize: "11px", color: "var(--admin-text-muted)", marginTop: "4px", display: "block" }}>
              Only lowercase letters, numbers, and dashes. Auto-generated if empty.
            </span>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Section Heading Title *</label>
            <input
              type="text"
              className="admin-input"
              required
              value={catSectionTitle}
              onChange={(e) => setCatSectionTitle(e.target.value)}
              placeholder="e.g. Premium botanicals. Delicious format."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Section Subtitle / Description (Optional)</label>
            <textarea
              className="admin-textarea"
              value={catSectionSubtitle}
              onChange={(e) => setCatSectionSubtitle(e.target.value)}
              placeholder="Add supplementary context rendered below heading..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Display Order (Sort Order)</label>
            <input
              type="number"
              className="admin-input"
              value={catSortOrder}
              onChange={(e) => setCatSortOrder(Number(e.target.value))}
            />
          </div>

          <div className="admin-switch-container">
            <div className="admin-switch-label">
              <span className="admin-switch-title">Active Category Tab</span>
              <span className="admin-switch-subtitle">
                Make this category tab visible to visitors on the website
              </span>
            </div>
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={catIsActive}
                onChange={(e) => setCatIsActive(e.target.checked)}
              />
              <span className="admin-switch-slider" />
            </label>
          </div>

          <div className="admin-modal-footer" style={{ padding: "16px 0 0 0", borderTop: "1px solid var(--admin-border)", marginTop: "24px" }}>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsCategoryFormOpen(false)} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editingCategory ? "Save Changes" : "Save Category"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* --- Product Modal --- */}
      <AdminModal
        isOpen={isProductFormOpen}
        onClose={() => setIsProductFormOpen(false)}
        title={editingProduct ? "Edit Product" : "Add Product"}
        size="large"
      >
        <form onSubmit={handleProductSubmit}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Product Title *</label>
              <input
                type="text"
                className="admin-input"
                required
                value={prodTitle}
                onChange={(e) => setProdTitle(e.target.value)}
                placeholder="e.g. Dreamy Sleep Gummies"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Sub Label (Target / Area)</label>
              <input
                type="text"
                className="admin-input"
                value={prodSubLabel}
                onChange={(e) => setProdSubLabel(e.target.value)}
                placeholder="e.g. SLEEP & RECOVERY"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Category Tab *</label>
              <select
                className="admin-select"
                required
                value={prodCategoryId}
                onChange={(e) => setProdCategoryId(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Display Order (Sort Order)</label>
              <input
                type="number"
                className="admin-input"
                value={prodSortOrder}
                onChange={(e) => setProdSortOrder(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Product Image</label>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <input
                type="text"
                className="admin-input"
                value={prodImage}
                onChange={(e) => setProdImage(e.target.value)}
                placeholder="Image URL (e.g. /assets/images/... or Cloudinary URL)"
                style={{ flex: 1 }}
              />
              <div style={{ position: "relative" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="product-image-upload"
                  disabled={isImageUploading}
                />
                <label
                  htmlFor="product-image-upload"
                  className="admin-btn admin-btn-secondary"
                  style={{ display: "inline-block", cursor: isImageUploading ? "not-allowed" : "pointer" }}
                >
                  {isImageUploading ? "Uploading..." : "Upload File"}
                </label>
              </div>
            </div>
            {imageUploadError && (
              <span style={{ color: "#ef5350", fontSize: "12px", marginTop: "4px", display: "block" }}>
                {imageUploadError}
              </span>
            )}
            {prodImage && (
              <div style={{ marginTop: "12px" }}>
                <img
                  src={prodImage}
                  alt="Preview"
                  style={{ maxHeight: "80px", borderRadius: "6px", border: "1px solid var(--admin-border)", padding: "4px" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="admin-form-group" style={{ marginTop: "20px" }}>
            <label className="admin-label">Product Thumbnail Images (Multiple)</label>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <span style={{ fontSize: "14px", color: "var(--admin-text-secondary)" }}>
                Upload multiple thumbnails one by one:
              </span>
              <div style={{ position: "relative" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  style={{ display: "none" }}
                  id="product-thumbnail-upload"
                  disabled={isThumbnailUploading}
                />
                <label
                  htmlFor="product-thumbnail-upload"
                  className="admin-btn admin-btn-secondary"
                  style={{ display: "inline-block", cursor: isThumbnailUploading ? "not-allowed" : "pointer" }}
                >
                  {isThumbnailUploading ? "Uploading..." : "Upload Thumbnail"}
                </label>
              </div>
            </div>
            {thumbnailUploadError && (
              <span style={{ color: "#ef5350", fontSize: "12px", marginTop: "4px", display: "block" }}>
                {thumbnailUploadError}
              </span>
            )}
            {prodThumbnails.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "16px" }}>
                {prodThumbnails.map((thumbUrl, idx) => (
                  <div key={idx} style={{ position: "relative", width: "80px", height: "80px", borderRadius: "6px", border: "1px solid var(--admin-border)", padding: "4px", background: "var(--admin-bg)" }}>
                    <img
                      src={thumbUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                    />
                    <button
                      type="button"
                      onClick={() => removeThumbnail(idx)}
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        background: "#ef5350",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "18px",
                        height: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
                      }}
                      title="Remove thumbnail"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea
              className="admin-textarea"
              value={prodDescription}
              onChange={(e) => setProdDescription(e.target.value)}
              placeholder="Provide a detailed product description..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Consumer Need (Why this product?)</label>
            <textarea
              className="admin-textarea"
              value={prodConsumerNeed}
              onChange={(e) => setProdConsumerNeed(e.target.value)}
              placeholder="Describe what consumer need this product fulfills..."
            />
          </div>

          {/* Key Benefits Tag Input */}
          <div className="admin-form-group">
            <label className="admin-label">Key Benefits</label>
            <div className="admin-tag-input-wrapper" style={{ flexWrap: "wrap" }}>
              {keyBenefits.map((benefit, idx) => (
                <span className="admin-tag" key={idx}>
                  {benefit}
                  <button
                    type="button"
                    className="admin-tag-remove"
                    onClick={() => removeBenefit(idx)}
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                type="text"
                className="admin-tag-input"
                placeholder="Type benefit and press Enter or Click + Add"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addBenefit();
                  }
                }}
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                style={{ padding: "4px 12px", fontSize: "0.8rem", height: "auto" }}
                onClick={addBenefit}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Ingredients Tag Input */}
          <div className="admin-form-group">
            <label className="admin-label">Key Ingredients</label>
            <div className="admin-tag-input-wrapper" style={{ flexWrap: "wrap" }}>
              {ingredients.map((ing, idx) => (
                <span className="admin-tag" key={idx}>
                  {ing}
                  <button
                    type="button"
                    className="admin-tag-remove"
                    onClick={() => removeIngredient(idx)}
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                type="text"
                className="admin-tag-input"
                placeholder="Type ingredient and press Enter or Click + Add"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addIngredient();
                  }
                }}
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                style={{ padding: "4px 12px", fontSize: "0.8rem", height: "auto" }}
                onClick={addIngredient}
              >
                + Add
              </button>
            </div>
          </div>

          <div className="admin-switch-container" style={{ marginTop: "16px" }}>
            <div className="admin-switch-label">
              <span className="admin-switch-title">Active Product</span>
              <span className="admin-switch-subtitle">
                Make this product visible to visitors on the website
              </span>
            </div>
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={prodIsActive}
                onChange={(e) => setProdIsActive(e.target.checked)}
              />
              <span className="admin-switch-slider" />
            </label>
          </div>

          <div className="admin-modal-footer" style={{ padding: "16px 0 0 0", borderTop: "1px solid var(--admin-border)", marginTop: "24px" }}>
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={() => setIsProductFormOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editingProduct ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete confirmation */}
      <AdminDeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingItem(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={deletingItem?.name || ""}
      />
      <AdminToasts toasts={toasts} />
    </div>
  );
}
