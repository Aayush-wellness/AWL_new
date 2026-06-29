"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminTable, { TableColumn } from "../AdminTable";
import AdminModal from "../AdminModal";
import AdminDeleteConfirm from "../AdminDeleteConfirm";
import { apiClient } from "@/utils/apiClient";
import { uploadFile } from "@/utils/upload";
import { useAdminToasts, AdminToasts } from "../AdminToast";

interface PressRelease {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  content: unknown;
  imageUrl: string | null;
  pdfUrl: string | null;
  releaseDate: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  createdBy?: { id: string; name: string; email: string; role: string };
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PRListResponse {
  items: PressRelease[];
  pagination: PaginationMeta;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return isoString;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function PressReleaseList() {
  const [data, setData] = useState<PressRelease[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PressRelease | null>(null);
  const [deletingItem, setDeletingItem] = useState<PressRelease | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [contentText, setContentText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toasts, showToast } = useAdminToasts();

  // Shopify file upload states
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isPdfUploading, setIsPdfUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [pdfUploadError, setPdfUploadError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImageUploading(true);
    setImageUploadError(null);
    try {
      const url = await uploadFile(file);
      setImageUrl(url);
    } catch (err: any) {
      setImageUploadError(err.message || "Failed to upload image.");
    } finally {
      setIsImageUploading(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsPdfUploading(true);
    setPdfUploadError(null);
    try {
      const url = await uploadFile(file);
      setPdfUrl(url);
    } catch (err: any) {
      setPdfUploadError(err.message || "Failed to upload PDF.");
    } finally {
      setIsPdfUploading(false);
    }
  };

  // ── Fetch list ─────────────────────────────────────────────────────────────

  const fetchPressReleases = useCallback(async () => {
    setIsLoading(true);
    setListError(null);
    try {
      const res = await apiClient.get<PRListResponse>("/pr?limit=50");
      setData(res.data.items);
      setPagination(res.data.pagination);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load press releases.";
      setListError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPressReleases();
  }, [fetchPressReleases]);

  // ── Auto-generate slug from title ─────────────────────────────────────────

  useEffect(() => {
    if (!slugManuallyEdited) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited]);

  // ── Open form for Create ───────────────────────────────────────────────────

  const handleCreateOpen = () => {
    setEditingItem(null);
    setTitle("");
    setSubtitle("");
    setSlug("");
    setSlugManuallyEdited(false);
    setContentText("");
    setImageUrl("");
    setPdfUrl("");
    setReleaseDate(new Date().toISOString().split("T")[0]);
    setIsPublished(false);
    setFormError(null);
    setIsImageUploading(false);
    setIsPdfUploading(false);
    setImageUploadError(null);
    setPdfUploadError(null);
    setIsFormOpen(true);
  };

  // ── Open form for Edit ────────────────────────────────────────────────────

  const handleEditOpen = (item: PressRelease) => {
    setEditingItem(item);
    setTitle(item.title);
    setSubtitle(item.subtitle ?? "");
    setSlug(item.slug);
    setSlugManuallyEdited(true); // don't auto-overwrite existing slug
    // content is stored as JSON array of blocks — show as plain text for editing
    const rawContent = item.content;
    if (Array.isArray(rawContent) && rawContent.length > 0) {
      const firstBlock = rawContent[0] as { type?: string; content?: unknown };
      setContentText(typeof firstBlock.content === "string" ? firstBlock.content : JSON.stringify(rawContent, null, 2));
    } else {
      setContentText(typeof rawContent === "string" ? rawContent : "");
    }
    setImageUrl(item.imageUrl ?? "");
    setPdfUrl(item.pdfUrl ?? "");
    setReleaseDate(new Date(item.releaseDate).toISOString().split("T")[0]);
    setIsPublished(item.isPublished);
    setFormError(null);
    setIsImageUploading(false);
    setIsPdfUploading(false);
    setImageUploadError(null);
    setPdfUploadError(null);
    setIsFormOpen(true);
  };

  // ── Submit form (Create or Edit) ──────────────────────────────────────────

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !contentText.trim()) return;

    setIsSubmitting(true);
    setFormError(null);

    // Wrap content as a single block to satisfy backend validator
    const contentPayload = [{ type: "paragraph", content: contentText.trim() }];

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      slug: slug.trim(),
      content: contentPayload,
      imageUrl: imageUrl.trim() || null,
      pdfUrl: pdfUrl.trim() || null,
      releaseDate: new Date(releaseDate).toISOString(),
      isPublished,
    };

    try {
      if (editingItem) {
        await apiClient.patch(`/pr/${editingItem.id}`, payload);
        showToast("Press release updated successfully!", "success");
      } else {
        await apiClient.post("/pr", payload);
        showToast("Press release created successfully!", "success");
      }
      setIsFormOpen(false);
      await fetchPressReleases();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setFormError(message);
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDeleteOpen = (item: PressRelease) => {
    setDeletingItem(item);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      await apiClient.delete(`/pr/${deletingItem.id}`);
      showToast(`Press release "${deletingItem.title}" deleted successfully!`, "success");
      setIsDeleteOpen(false);
      setDeletingItem(null);
      await fetchPressReleases();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete.";
      setListError(message);
      showToast(message, "error");
      setIsDeleteOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Table columns ─────────────────────────────────────────────────────────

  const columns: TableColumn<PressRelease>[] = [
    {
      header: "Title",
      accessor: "title",
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600, color: "var(--admin-text-primary)" }}>{row.title}</div>
          {row.subtitle && (
            <div style={{ fontSize: "12px", color: "var(--admin-text-muted)", marginTop: "2px" }}>
              {row.subtitle}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Slug",
      accessor: "slug",
      render: (row) => (
        <span style={{ fontFamily: "monospace", fontSize: "12px", color: "var(--admin-text-muted)" }}>
          {row.slug}
        </span>
      ),
    },
    {
      header: "Release Date",
      accessor: "releaseDate",
      render: (row) => <span>{formatDate(row.releaseDate)}</span>,
    },
    {
      header: "Status",
      accessor: "isPublished",
      render: (row) => (
        <span className={`admin-badge ${row.isPublished ? "admin-badge-success" : "admin-badge-warning"}`}>
          {row.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      header: "Created By",
      accessor: "createdBy",
      render: (row) => (
        <span style={{ fontSize: "13px" }}>{row.createdBy?.name ?? "—"}</span>
      ),
    },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Error banner */}
      {listError && (
        <div
          style={{
            background: "rgba(211,47,47,0.08)",
            border: "1px solid rgba(211,47,47,0.3)",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "16px",
            color: "#ef5350",
            fontSize: "14px",
          }}
        >
          ❌ {listError}
          <button
            onClick={fetchPressReleases}
            style={{ marginLeft: "12px", textDecoration: "underline", cursor: "pointer", background: "none", border: "none", color: "inherit" }}
          >
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--admin-text-muted)" }}>
          Loading press releases...
        </div>
      ) : (
        <AdminTable
          data={data}
          columns={columns}
          searchPlaceholder="Search press releases..."
          searchKeys={["title", "slug", "subtitle"]}
          onCreate={handleCreateOpen}
          createButtonText="Add Press Release"
          onEdit={handleEditOpen}
          onDelete={handleDeleteOpen}
        />
      )}

      {pagination && (
        <div style={{ fontSize: "13px", color: "var(--admin-text-muted)", marginTop: "12px", textAlign: "right" }}>
          {pagination.total} total press release{pagination.total !== 1 ? "s" : ""}
        </div>
      )}

      {/* ── Create / Edit Modal ── */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingItem ? "Edit Press Release" : "Add Press Release"}
      >
        <form onSubmit={handleFormSubmit}>
          {/* Title */}
          <div className="admin-form-group">
            <label className="admin-label">Title *</label>
            <input
              type="text"
              className="admin-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Aayush Wellness expands product line..."
              required
            />
          </div>

          {/* Subtitle */}
          <div className="admin-form-group">
            <label className="admin-label">Subtitle</label>
            <input
              type="text"
              className="admin-input"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Optional short description"
            />
          </div>

          {/* Slug */}
          <div className="admin-form-group">
            <label className="admin-label">
              Slug *{" "}
              <span style={{ fontWeight: 400, fontSize: "12px", color: "var(--admin-text-muted)" }}>
                (auto-generated, lowercase-with-dashes)
              </span>
            </label>
            <input
              type="text"
              className="admin-input"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugManuallyEdited(true);
              }}
              placeholder="e.g. aayush-wellness-q4-earnings"
              required
            />
          </div>

          {/* Content */}
          <div className="admin-form-group">
            <label className="admin-label">Content *</label>
            <textarea
              className="admin-input"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="Write the full press release content here..."
              rows={6}
              style={{ resize: "vertical", minHeight: "120px" }}
              required
            />
          </div>

          {/* Date + Published */}
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Release Date *</label>
              <input
                type="date"
                className="admin-input"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Image URL + PDF URL */}
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Image URL</label>
              <input
                type="url"
                className="admin-input"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
              />
              <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
                <label
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    background: isImageUploading ? "#a2c579" : "#4f7c0d",
                    color: "#fff",
                    borderRadius: "4px",
                    cursor: isImageUploading ? "not-allowed" : "pointer",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {isImageUploading ? "Uploading..." : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isImageUploading}
                    style={{ display: "none" }}
                  />
                </label>
                {imageUrl && !isImageUploading && (
                  <span style={{ fontSize: "12px", color: "#2e7d32" }}>✓ File ready</span>
                )}
              </div>
              {imageUploadError && (
                <div style={{ color: "#d32f2f", fontSize: "11px", marginTop: "4px" }}>
                  Error: {imageUploadError}
                </div>
              )}
            </div>
            <div className="admin-form-group">
              <label className="admin-label">PDF URL</label>
              <input
                type="url"
                className="admin-input"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="https://..."
              />
              <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
                <label
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    background: isPdfUploading ? "#a2c579" : "#4f7c0d",
                    color: "#fff",
                    borderRadius: "4px",
                    cursor: isPdfUploading ? "not-allowed" : "pointer",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {isPdfUploading ? "Uploading..." : "Upload PDF"}
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    disabled={isPdfUploading}
                    style={{ display: "none" }}
                  />
                </label>
                {pdfUrl && !isPdfUploading && (
                  <span style={{ fontSize: "12px", color: "#2e7d32" }}>✓ File ready</span>
                )}
              </div>
              {pdfUploadError && (
                <div style={{ color: "#d32f2f", fontSize: "11px", marginTop: "4px" }}>
                  Error: {pdfUploadError}
                </div>
              )}
            </div>
          </div>

          {/* Publish toggle */}
          <div className="admin-switch-container">
            <div className="admin-switch-label">
              <span className="admin-switch-title">Publish Immediately</span>
              <span className="admin-switch-subtitle">
                Make this press release visible on the public website
              </span>
            </div>
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <span className="admin-switch-slider" />
            </label>
          </div>

          {/* Form error */}
          {formError && (
            <div
              style={{
                background: "rgba(211,47,47,0.08)",
                border: "1px solid rgba(211,47,47,0.3)",
                borderRadius: "8px",
                padding: "10px 14px",
                color: "#ef5350",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              ❌ {formError}
            </div>
          )}

          {/* Footer buttons */}
          <div
            className="admin-modal-footer"
            style={{ padding: "16px 0 0 0", borderTop: "1px solid var(--admin-border)" }}
          >
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={() => setIsFormOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={isSubmitting}
              style={isSubmitting ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
            >
              {isSubmitting
                ? editingItem ? "Saving..." : "Creating..."
                : editingItem ? "Save Changes" : "Create Release"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* ── Delete Confirm ── */}
      <AdminDeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingItem?.title ?? ""}
      />
      <AdminToasts toasts={toasts} />
    </div>
  );
}
