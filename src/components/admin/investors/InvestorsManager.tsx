"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminTable, { TableColumn } from "../AdminTable";
import AdminModal from "../AdminModal";
import AdminDeleteConfirm from "../AdminDeleteConfirm";
import { apiClient } from "@/utils/apiClient";
import { uploadFile } from "@/utils/upload";
import { useAdminToasts, AdminToasts } from "../AdminToast";

interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  _count?: {
    documents: number;
  };
}

interface Document {
  id: string;
  name: string;
  url: string;
  categoryId: string;
  createdAt: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function InvestorsManager() {
  const [activeTab, setActiveTab] = useState<"documents" | "categories">("documents");
  const [categories, setCategories] = useState<Category[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  // Loading & error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, showToast } = useAdminToasts();

  // Modal open states
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isDocumentFormOpen, setIsDocumentFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<"category" | "document">("document");

  // Edit / Delete tracking
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [deletingItem, setDeletingItem] = useState<{ id: string; name: string } | null>(null);

  // Form states - Category
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catSortOrder, setCatSortOrder] = useState<number>(0);
  const [catIsActive, setCatIsActive] = useState(true);

  // Form states - Document
  const [docName, setDocName] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [docCategoryId, setDocCategoryId] = useState("");

  // Upload states
  const [isDocUploading, setIsDocUploading] = useState(false);
  const [docUploadError, setDocUploadError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Load both categories and documents to keep data complete
      const [catsRes, docsRes] = await Promise.all([
        apiClient.get<{ items: Category[] }>("/investors/categories?limit=200"),
        apiClient.get<{ items: Document[] }>("/investors/documents?limit=1000")
      ]);

      if (catsRes.success && catsRes.data) {
        setCategories(catsRes.data.items);
      }
      if (docsRes.success && docsRes.data) {
        setDocuments(docsRes.data.items);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load investors content. Please check database server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- Category Actions ---
  const handleCreateCategoryOpen = () => {
    setEditingCategory(null);
    setCatName("");
    setCatSlug("");
    setCatSortOrder(categories.length > 0 ? Math.max(...categories.map(c => c.sortOrder)) + 10 : 0);
    setCatIsActive(true);
    setIsCategoryFormOpen(true);
  };

  const handleEditCategoryOpen = (cat: Category) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatSortOrder(cat.sortOrder);
    setCatIsActive(cat.isActive);
    setIsCategoryFormOpen(true);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: catName.trim(),
        slug: catSlug.trim() || undefined,
        sortOrder: Number(catSortOrder),
        isActive: catIsActive
      };

      if (editingCategory) {
        await apiClient.patch(`/investors/categories/${editingCategory.id}`, payload);
        showToast("Category updated successfully!", "success");
      } else {
        await apiClient.post("/investors/categories", payload);
        showToast("Category created successfully!", "success");
      }
      setIsCategoryFormOpen(false);
      await fetchData();
    } catch (err: any) {
      showToast(err.message || "Failed to save category.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Document Actions ---
  const handleCreateDocumentOpen = () => {
    setEditingDocument(null);
    setDocName("");
    setDocUrl("");
    setDocCategoryId(categories.length > 0 ? categories[0].id : "");
    setDocUploadError(null);
    setIsDocumentFormOpen(true);
  };

  const handleEditDocumentOpen = (doc: Document) => {
    setEditingDocument(doc);
    setDocName(doc.name);
    setDocUrl(doc.url);
    setDocCategoryId(doc.categoryId);
    setDocUploadError(null);
    setIsDocumentFormOpen(true);
  };

  const handleDocFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsDocUploading(true);
    setDocUploadError(null);
    try {
      const url = await uploadFile(file, "/investors/upload");
      setDocUrl(url);
    } catch (err: any) {
      setDocUploadError(err.message || "Failed to upload document.");
    } finally {
      setIsDocUploading(false);
    }
  };

  const handleDocumentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim() || !docUrl.trim() || !docCategoryId) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: docName.trim(),
        url: docUrl.trim(),
        categoryId: docCategoryId
      };

      if (editingDocument) {
        await apiClient.patch(`/investors/documents/${editingDocument.id}`, payload);
        showToast("Document updated successfully!", "success");
      } else {
        await apiClient.post("/investors/documents", payload);
        showToast("Document saved successfully!", "success");
      }
      setIsDocumentFormOpen(false);
      await fetchData();
    } catch (err: any) {
      showToast(err.message || "Failed to save document.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Delete Actions ---
  const handleDeleteOpen = (item: { id: string; name: string }, type: "category" | "document") => {
    setDeletingItem(item);
    setDeleteType(type);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;

    try {
      if (deleteType === "category") {
        await apiClient.delete(`/investors/categories/${deletingItem.id}`);
        showToast(`Category "${deletingItem.name}" deleted successfully!`, "success");
      } else {
        await apiClient.delete(`/investors/documents/${deletingItem.id}`);
        showToast(`Document "${deletingItem.name}" deleted successfully!`, "success");
      }
      setIsDeleteOpen(false);
      setDeletingItem(null);
      await fetchData();
    } catch (err: any) {
      showToast(err.message || `Failed to delete ${deleteType}.`, "error");
    }
  };

  // --- Column Definitions ---
  const categoryColumns: TableColumn<Category>[] = [
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
      header: "Sort Order",
      accessor: "sortOrder",
      render: (row) => <span className="admin-badge admin-badge-info">{row.sortOrder}</span>,
    },
    {
      header: "Documents Count",
      render: (row) => <span style={{ fontWeight: "600" }}>{row._count?.documents ?? 0} docs</span>,
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

  const documentColumns: TableColumn<Document>[] = [
    {
      header: "Document Name",
      accessor: "name",
      render: (row) => <span style={{ fontWeight: "500", color: "var(--admin-text-primary)" }}>{row.name}</span>,
    },
    {
      header: "Category Tab",
      render: (row) => (
        <span style={{ fontSize: "0.9rem", color: "var(--admin-text-secondary)" }}>
          {row.category?.name || "Uncategorized"}
        </span>
      ),
    },
    {
      header: "Document Link (URL)",
      accessor: "url",
      render: (row) => (
        <a
          href={row.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#4f7c0d", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
          View PDF
        </a>
      ),
    },
    {
      header: "Upload Date",
      render: (row) => <span>{new Date(row.createdAt).toLocaleDateString()}</span>,
    },
  ];

  if (isLoading && categories.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px", color: "var(--admin-text-secondary)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "24px", height: "24px", border: "2px solid rgba(79, 124, 13, 0.1)", borderTop: "2px solid #4f7c0d", borderRadius: "50%", animation: "admin-spin 1s linear infinite" }} />
          <span>Loading investors data...</span>
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

      {/* Neat Custom Tab Toggles */}
      <div style={{ display: "flex", borderBottom: "2px solid #eae6df", marginBottom: "24px", gap: "24px" }}>
        <button
          onClick={() => setActiveTab("documents")}
          style={{
            background: "none",
            border: "none",
            borderBottom: activeTab === "documents" ? "3px solid #4f7c0d" : "3px solid transparent",
            color: activeTab === "documents" ? "#4f7c0d" : "var(--admin-text-secondary)",
            padding: "10px 4px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Investor Documents ({documents.length})
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
          Category Tabs ({categories.length})
        </button>
      </div>

      {/* Render Active View */}
      {activeTab === "documents" ? (
        <AdminTable
          data={documents}
          columns={documentColumns}
          searchPlaceholder="Search documents by name..."
          searchKeys={["name"]}
          onCreate={handleCreateDocumentOpen}
          createButtonText="Add Document"
          onEdit={handleEditDocumentOpen}
          onDelete={(row) => handleDeleteOpen({ id: row.id, name: row.name }, "document")}
        />
      ) : (
        <AdminTable
          data={categories}
          columns={categoryColumns}
          searchPlaceholder="Search categories..."
          searchKeys={["name", "slug"]}
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
            <label className="admin-label">Category Name *</label>
            <input
              type="text"
              className="admin-input"
              required
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              placeholder="e.g. Annual Report"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">URL Slug / URL Key (Optional)</label>
            <input
              type="text"
              className="admin-input"
              value={catSlug}
              onChange={(e) => setCatSlug(e.target.value)}
              placeholder="e.g. annual-report (Auto-generated if empty)"
            />
            <span style={{ fontSize: "11px", color: "var(--admin-text-muted)", marginTop: "4px", display: "block" }}>
              Only lowercase letters, numbers, and dashes.
            </span>
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
              <span className="admin-switch-title">Active Category</span>
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

      {/* --- Document Modal --- */}
      <AdminModal
        isOpen={isDocumentFormOpen}
        onClose={() => setIsDocumentFormOpen(false)}
        title={editingDocument ? "Edit Document" : "Upload / Add Document"}
      >
        <form onSubmit={handleDocumentSubmit}>
          <div className="admin-form-group">
            <label className="admin-label">Document Name *</label>
            <input
              type="text"
              className="admin-input"
              required
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="e.g. FY 2024-25"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Document File URL (Shopify/CDN) *</label>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <input
                type="text"
                className="admin-input"
                required
                value={docUrl}
                onChange={(e) => setDocUrl(e.target.value)}
                placeholder="https://cdn.shopify.com/s/files/... or Cloudinary URL"
                style={{ flex: 1 }}
              />
              <div style={{ position: "relative" }}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
                  onChange={handleDocFileUpload}
                  style={{ display: "none" }}
                  id="investor-document-upload"
                  disabled={isDocUploading}
                />
                <label
                  htmlFor="investor-document-upload"
                  className="admin-btn admin-btn-secondary"
                  style={{ display: "inline-block", cursor: isDocUploading ? "not-allowed" : "pointer" }}
                >
                  {isDocUploading ? "Uploading..." : "Upload File"}
                </label>
              </div>
            </div>
            {docUploadError && (
              <span style={{ color: "#ef5350", fontSize: "12px", marginTop: "4px", display: "block" }}>
                {docUploadError}
              </span>
            )}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Category Tab *</label>
            <select
              className="admin-select"
              value={docCategoryId}
              onChange={(e) => setDocCategoryId(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-modal-footer" style={{ padding: "16px 0 0 0", borderTop: "1px solid var(--admin-border)", marginTop: "24px" }}>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsDocumentFormOpen(false)} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editingDocument ? "Save Changes" : "Save Document"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* --- Delete Confirmation Modal --- */}
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
