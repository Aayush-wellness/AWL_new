"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminTable, { TableColumn } from "../AdminTable";
import AdminModal from "../AdminModal";
import AdminDeleteConfirm from "../AdminDeleteConfirm";
import { apiClient } from "@/utils/apiClient";

interface AdminJob {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  exp: string;
  status: "Active" | "Closed";
  description?: string;
}

const mapBackendToFrontend = (job: any): AdminJob => ({
  id: job.id,
  title: job.title,
  dept: job.department,
  location: job.location,
  type: job.type === "FULL_TIME" ? "Full Time" :
    job.type === "PART_TIME" ? "Part Time" :
      job.type === "CONTRACT" ? "Contract" : "Internship",
  exp: job.experience,
  status: job.status === "PUBLISHED" ? "Active" : "Closed",
  description: job.description || "",
});

const mapFrontendToBackend = (
  title: string,
  dept: string,
  location: string,
  type: string,
  exp: string,
  status: "Active" | "Closed",
  description: string
) => ({
  title,
  department: dept,
  location,
  type: type === "Full Time" ? "FULL_TIME" :
    type === "Part Time" ? "PART_TIME" :
      type === "Contract" ? "CONTRACT" : "INTERNSHIP",
  experience: exp,
  status: status === "Active" ? "PUBLISHED" : "CLOSED",
  description: description || null,
});

export default function JobList() {
  const [data, setData] = useState<AdminJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminJob | null>(null);
  const [deletingItem, setDeletingItem] = useState<AdminJob | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState("");
  const [location, setLocation] = useState("Mumbai, India");
  const [type, setType] = useState("Full Time");
  const [exp, setExp] = useState("");
  const [status, setStatus] = useState<"Active" | "Closed">("Active");
  const [description, setDescription] = useState("");

  // Application modal states
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);
  const [selectedJobForApps, setSelectedJobForApps] = useState<AdminJob | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [isAppsLoading, setIsAppsLoading] = useState(false);
  const [appsError, setAppsError] = useState<string | null>(null);

  const handleViewApplications = async (job: AdminJob) => {
    setSelectedJobForApps(job);
    setIsApplicationsOpen(true);
    setIsAppsLoading(true);
    setAppsError(null);
    try {
      const res = await apiClient.get<any>(`/applications?jobPostId=${job.id}`);
      if (res.success && res.data && Array.isArray(res.data.items)) {
        setApplications(res.data.items);
      } else {
        setApplications([]);
      }
    } catch (err: any) {
      setAppsError(err.message || "Failed to load applications.");
    } finally {
      setIsAppsLoading(false);
    }
  };

  const handleUpdateAppStatus = async (appId: string, newStatus: string) => {
    try {
      await apiClient.patch(`/applications/${appId}/status`, { status: newStatus });
      // Update local applications list status
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );
    } catch (err: any) {
      alert(err.message || "Failed to update application status.");
    }
  };

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<{ items: any[] }>("/jobs?limit=100");
      setData(res.data.items.map(mapBackendToFrontend));
    } catch (err: any) {
      setError(err.message || "Failed to load jobs.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleCreateOpen = () => {
    setEditingItem(null);
    setTitle("");
    setDept("");
    setLocation("Mumbai, India");
    setType("Full Time");
    setExp("1-3 yrs");
    setStatus("Active");
    setDescription("");
    setIsFormOpen(true);
  };

  const handleEditOpen = (item: AdminJob) => {
    setEditingItem(item);
    setTitle(item.title);
    setDept(item.dept);
    setLocation(item.location);
    setType(item.type);
    setExp(item.exp);
    setStatus(item.status);
    setDescription(item.description || "");
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !exp.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = mapFrontendToBackend(title, dept, location, type, exp, status, description);
      if (editingItem) {
        await apiClient.patch(`/jobs/${editingItem.id}`, payload);
      } else {
        await apiClient.post("/jobs", payload);
      }
      setIsFormOpen(false);
      await fetchJobs();
    } catch (err: any) {
      alert(err.message || "Failed to save job posting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteOpen = (item: AdminJob) => {
    setDeletingItem(item);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    try {
      await apiClient.delete(`/jobs/${deletingItem.id}`);
      setIsDeleteOpen(false);
      setDeletingItem(null);
      await fetchJobs();
    } catch (err: any) {
      alert(err.message || "Failed to delete job posting.");
    }
  };

  const columns: TableColumn<AdminJob>[] = [
    {
      header: "Job Title",
      accessor: "title",
      render: (row) => (
        <span style={{ fontWeight: "600", color: "var(--admin-text-primary)" }}>
          {row.title}
        </span>
      ),
    },
    {
      header: "Department",
      accessor: "dept",
    },
    {
      header: "Location",
      accessor: "location",
    },
    {
      header: "Job Type",
      accessor: "type",
      render: (row) => (
        <span className="admin-badge admin-badge-info">{row.type}</span>
      ),
    },
    {
      header: "Required Experience",
      accessor: "exp",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`admin-badge ${row.status === "Active" ? "admin-badge-success" : "admin-badge-danger"
            }`}
        >
          {row.status === "Active" ? "Active" : "Closed"}
        </span>
      ),
    },
  ];

  return (
    <div>
      {error && (
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
          ❌ {error}
          <button
            onClick={fetchJobs}
            style={{ marginLeft: "12px", textDecoration: "underline", cursor: "pointer", background: "none", border: "none", color: "inherit" }}
          >
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--admin-text-muted)" }}>
          Loading job postings...
        </div>
      ) : (
        <AdminTable
          data={data}
          columns={columns}
          searchPlaceholder="Search job openings..."
          searchKeys={["title", "dept", "location"]}
          onCreate={handleCreateOpen}
          createButtonText="Post a Job"
          onEdit={handleEditOpen}
          onDelete={handleDeleteOpen}
          onView={handleViewApplications}
        />
      )}

      {/* Form Modal */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingItem ? "Edit Job Posting" : "Create Job Posting"}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="admin-form-group">
            <label className="admin-label">Job Title *</label>
            <input
              type="text"
              className="admin-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Business Development Executive"
              required
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Department</label>
              <input
                type="text"
                className="admin-input"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                placeholder="e.g. Sales, Marketing, HR, Engineering"
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Location</label>
              <select
                className="admin-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="Mumbai, India">Mumbai, India</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid (Mumbai)">Hybrid (Mumbai)</option>
                <option value="Bengaluru, India">Bengaluru, India</option>
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Job Type</label>
              <select
                className="admin-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Required Exper`ience *</label>
              <input
                type="text"
                className="admin-input"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                placeholder="e.g. 1-3 yrs, 3-5 yrs, Freshers"
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Job Description</label>
            <textarea
              className="admin-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the role, responsibilities, and requirements..."
              rows={4}
              style={{ resize: "vertical", minHeight: "80px" }}
            />
          </div>

          <div className="admin-switch-container">
            <div className="admin-switch-label">
              <span className="admin-switch-title">Active Posting</span>
              <span className="admin-switch-subtitle">
                Make this opening visible to applicants on the careers page
              </span>
            </div>
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={status === "Active"}
                onChange={(e) =>
                  setStatus(e.target.checked ? "Active" : "Closed")
                }
              />
              <span className="admin-switch-slider" />
            </label>
          </div>

          <div className="admin-modal-footer" style={{ padding: "16px 0 0 0", borderTop: "1px solid var(--admin-border)" }}>
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
              {isSubmitting ? "Saving..." : editingItem ? "Save Changes" : "Post Job"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete confirmation */}
      <AdminDeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingItem?.title || ""}
      />

      {/* Applications Modal */}
      <AdminModal
        isOpen={isApplicationsOpen}
        onClose={() => {
          setIsApplicationsOpen(false);
          setSelectedJobForApps(null);
          setApplications([]);
        }}
        title={`Applications - ${selectedJobForApps?.title || ""}`}
        size="large"
      >
        <div style={{ minWidth: "100%", maxHeight: "70vh", overflowY: "auto" }}>
          {isAppsLoading ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--admin-text-muted)" }}>
              Loading applications...
            </div>
          ) : appsError ? (
            <div style={{ color: "#ef5350", padding: "20px 0", textAlign: "center" }}>
              ❌ {appsError}
            </div>
          ) : applications.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--admin-text-muted)" }}>
              No applications submitted yet for this position.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse", minWidth: "750px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--admin-border)" }}>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Candidate</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Contact</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Details</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Resume</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} style={{ borderBottom: "1px solid var(--admin-border)" }}>
                      <td style={{ padding: "12px 8px" }}>
                        <div style={{ fontWeight: "600", color: "var(--admin-text-primary)" }}>{app.fullName}</div>
                        <div style={{ fontSize: "11px", color: "var(--admin-text-muted)" }}>
                          Applied {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td style={{ padding: "12px 8px", fontSize: "13px" }}>
                        <div>{app.email}</div>
                        <div>{app.phone}</div>
                      </td>
                      <td style={{ padding: "12px 8px", fontSize: "13px" }}>
                        <div>📍 {app.location}</div>
                        <div>💼 {app.experience}</div>
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-btn admin-btn-secondary"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "4px 8px",
                            fontSize: "12px",
                            textDecoration: "none"
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
                          Open Resume
                        </a>
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <select
                          className="admin-select"
                          value={app.status}
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                          style={{
                            padding: "4px 8px",
                            fontSize: "12px",
                            borderRadius: "6px",
                            border: "1px solid var(--admin-border)",
                            background: app.status === "REJECTED" ? "#ffebee" :
                              app.status === "HIRED" ? "#e8f5e9" :
                                app.status === "SHORTLISTED" ? "#e3f2fd" :
                                  app.status === "UNDER_REVIEW" ? "#fff3e0" : "#eceff1",
                            color: app.status === "REJECTED" ? "#c62828" :
                              app.status === "HIRED" ? "#2e7d32" :
                                app.status === "SHORTLISTED" ? "#1565c0" :
                                  app.status === "UNDER_REVIEW" ? "#ef6c00" : "#37474f",
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="UNDER_REVIEW">Under Review</option>
                          <option value="SHORTLISTED">Shortlisted</option>
                          <option value="REJECTED">Rejected</option>
                          <option value="HIRED">Hired</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="admin-modal-footer" style={{ padding: "16px 0 0 0", borderTop: "1px solid var(--admin-border)", marginTop: "24px" }}>
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={() => {
                setIsApplicationsOpen(false);
                setSelectedJobForApps(null);
                setApplications([]);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
