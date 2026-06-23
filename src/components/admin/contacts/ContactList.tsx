"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminTable, { TableColumn } from "../AdminTable";
import AdminModal from "../AdminModal";
import AdminDeleteConfirm from "../AdminDeleteConfirm";
import { apiClient } from "@/utils/apiClient";

interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phoneNo: string | null;
  company: string | null;
  inquiryType: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface ContactListResponse {
  items: ContactInquiry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function ContactList() {
  const [data, setData] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContactInquiry | null>(null);
  const [deletingItem, setDeletingItem] = useState<ContactInquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchContactInquiries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<ContactListResponse>("/contact?limit=250");
      setData(res.data.items || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to fetch contact inquiries.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContactInquiries();
  }, [fetchContactInquiries]);

  const handleViewOpen = async (item: ContactInquiry) => {
    setSelectedItem(item);
    setIsDetailOpen(true);

    if (!item.isRead) {
      try {
        await apiClient.patch(`/contact/${item.id}/read`, {});
        // Update local state to reflect that it is read
        setData((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, isRead: true } : i))
        );
      } catch (err) {
        console.error("Failed to mark inquiry as read:", err);
      }
    }
  };

  const handleDeleteOpen = (item: ContactInquiry) => {
    setDeletingItem(item);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      await apiClient.delete(`/contact/${deletingItem.id}`);
      setData((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setIsDeleteOpen(false);
      setDeletingItem(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete submission.";
      alert(`Error: ${msg}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const columns: TableColumn<ContactInquiry>[] = [
    {
      header: "Name",
      accessor: "fullName",
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {!row.isRead && (
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#2563eb",
                display: "inline-block",
                flexShrink: 0,
              }}
              title="Unread"
            />
          )}
          <span style={{ fontWeight: "600", color: "var(--admin-text-primary)" }}>
            {row.fullName}
          </span>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Phone",
      accessor: "phoneNo",
      render: (row) => <span>{row.phoneNo || "N/A"}</span>,
    },
    {
      header: "Type",
      accessor: "inquiryType",
      render: (row) => {
        let badgeClass = "admin-badge-info";
        const val = row.inquiryType || "General Enquiry";
        if (val === "Business Partnership") badgeClass = "admin-badge-success";
        if (val === "Investor Relations") badgeClass = "admin-badge-warning";
        return <span className={`admin-badge ${badgeClass}`}>{val}</span>;
      },
    },
    {
      header: "Date Received",
      accessor: "createdAt",
      render: (row) => <span>{formatDate(row.createdAt)}</span>,
    },
  ];

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
        <div style={{ fontSize: "1.1rem", color: "var(--admin-text-muted)", fontWeight: "500" }}>
          Loading contact inquiries...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "24px", background: "rgba(211,47,47,0.08)", border: "1px solid rgba(211,47,47,0.3)", borderRadius: "12px", color: "#ef5350", maxWidth: "600px", margin: "20px auto" }}>
        <h3 style={{ margin: "0 0 8px 0" }}>Error Loading Contact Inquiries</h3>
        <p style={{ margin: "0 0 16px 0", lineHeight: "1.5" }}>{error}</p>
        <button className="admin-btn admin-btn-primary" onClick={fetchContactInquiries}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <AdminTable
        data={data}
        columns={columns}
        searchPlaceholder="Search contact inquiries by name, email, company..."
        searchKeys={["fullName", "email", "company", "inquiryType"]}
        onView={handleViewOpen}
        onDelete={handleDeleteOpen}
      />

      {/* Details View Modal */}
      <AdminModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Contact Inquiry Details"
      >
        {selectedItem && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="admin-form-row">
              <div>
                <span className="admin-label">Sender Name</span>
                <div style={{ padding: "10px", backgroundColor: "var(--admin-surface)", borderRadius: "8px", border: "1px solid var(--admin-border)" }}>
                  {selectedItem.fullName}
                </div>
              </div>
              <div>
                <span className="admin-label">Company Name</span>
                <div style={{ padding: "10px", backgroundColor: "var(--admin-surface)", borderRadius: "8px", border: "1px solid var(--admin-border)" }}>
                  {selectedItem.company || "N/A"}
                </div>
              </div>
            </div>

            <div className="admin-form-row">
              <div>
                <span className="admin-label">Email Address</span>
                <div style={{ padding: "10px", backgroundColor: "var(--admin-surface)", borderRadius: "8px", border: "1px solid var(--admin-border)", wordBreak: "break-all" }}>
                  {selectedItem.email}
                </div>
              </div>
              <div>
                <span className="admin-label">Phone Number</span>
                <div style={{ padding: "10px", backgroundColor: "var(--admin-surface)", borderRadius: "8px", border: "1px solid var(--admin-border)" }}>
                  {selectedItem.phoneNo || "N/A"}
                </div>
              </div>
            </div>

            <div className="admin-form-row">
              <div>
                <span className="admin-label">Inquiry Type</span>
                <div style={{ display: "inline-block" }}>
                  <span
                    className={`admin-badge ${
                      selectedItem.inquiryType === "Business Partnership"
                        ? "admin-badge-success"
                        : selectedItem.inquiryType === "Investor Relations"
                        ? "admin-badge-warning"
                        : "admin-badge-info"
                    }`}
                    style={{ padding: "8px 14px", fontSize: "0.85rem" }}
                  >
                    {selectedItem.inquiryType || "General Enquiry"}
                  </span>
                </div>
              </div>
              <div>
                <span className="admin-label">Date Submitted</span>
                <div style={{ padding: "10px", backgroundColor: "var(--admin-surface)", borderRadius: "8px", border: "1px solid var(--admin-border)" }}>
                  {formatDate(selectedItem.createdAt)}
                </div>
              </div>
            </div>

            <div>
              <span className="admin-label">Message Content</span>
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "var(--admin-surface)",
                  borderRadius: "8px",
                  border: "1px solid var(--admin-border)",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.6",
                  fontSize: "0.95rem",
                  color: "var(--admin-text-primary)",
                }}
              >
                {selectedItem.message}
              </div>
            </div>

            <div className="admin-modal-footer" style={{ padding: "16px 0 0 0", borderTop: "1px solid var(--admin-border)", marginTop: "12px" }}>
              <button
                className="admin-btn admin-btn-secondary"
                onClick={() => setIsDetailOpen(false)}
              >
                Close View
              </button>
              <button
                className="admin-btn admin-btn-danger"
                onClick={() => {
                  setIsDetailOpen(false);
                  handleDeleteOpen(selectedItem);
                }}
                disabled={isDeleting}
              >
                Delete Submission
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Delete Confirmation */}
      <AdminDeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingItem?.fullName || ""}
      />
    </div>
  );
}
