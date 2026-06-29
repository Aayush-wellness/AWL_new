"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { apiClient } from "@/utils/apiClient";

interface Stats {
  pressReleases: number;
  products: number;
  contactResponses: number;
  jobPostings: number;
  investorDocuments: number;
}

interface Activity {
  id: string;
  type: string;
  action: string;
  text: string;
  meta: string | null;
  createdAt: string;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  if (diffMs < 0) return "Just now";
  
  const diffMins = Math.floor(diffMs / (60 * 1000));
  const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  
  return date.toLocaleDateString();
}

function getActivityIcon(type: string): string {
  switch (type.toLowerCase()) {
    case "press":
      return "📰";
    case "contact":
      return "📩";
    case "product":
      return "🛍️";
    case "job":
      return "💼";
    case "investor":
      return "📄";
    default:
      return "⚡";
  }
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    pressReleases: 0,
    products: 0,
    contactResponses: 0,
    jobPostings: 0,
    investorDocuments: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await apiClient.get<{ stats: Stats; activities: Activity[] }>("/activity/dashboard");
        if (res.success && res.data) {
          setStats(res.data.stats);
          setActivities(res.data.activities);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard statistics.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const statsList = [
    {
      label: "Press Releases",
      value: stats.pressReleases,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
      ),
      href: "/admin/press-releases",
    },
    {
      label: "Total Products",
      value: stats.products,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.27 6.96 8.73 5 8.73-5"/><path d="M12 22.08V12"/></svg>
      ),
      href: "/admin/products",
    },
    {
      label: "Contact Responses",
      value: stats.contactResponses,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      ),
      href: "/admin/contacts",
    },
    {
      label: "Job Postings",
      value: stats.jobPostings,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
      ),
      href: "/admin/jobs",
    },
    {
      label: "Investor Documents",
      value: stats.investorDocuments,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
      ),
      href: "/admin/investors",
    },
  ];

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px", color: "var(--admin-text-secondary)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "24px", height: "24px", border: "2px solid rgba(79, 124, 13, 0.1)", borderTop: "2px solid #4f7c0d", borderRadius: "50%", animation: "admin-spin 1s linear infinite" }} />
          <span>Loading dashboard analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard Overview</h1>
          <p className="admin-page-subtitle">
            Welcome back, Admin. Here is what is happening with your website content today.
          </p>
        </div>
      </div>

      {error && (
        <div style={{ background: "rgba(211,47,47,0.08)", border: "1px solid rgba(211,47,47,0.3)", borderRadius: "8px", padding: "12px 16px", marginBottom: "24px", color: "#ef5350", fontSize: "14px" }}>
          ❌ {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {statsList.map((stat, idx) => (
          <Link
            key={idx}
            href={stat.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="admin-stat-card">
              <div className="admin-stat-icon-wrapper">{stat.icon}</div>
              <div className="admin-stat-info">
                <span className="admin-stat-label">{stat.label}</span>
                <span className="admin-stat-value">{stat.value}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="admin-dashboard-row">
        {/* Recent Activity Card */}
        <div className="admin-section-card" style={{ flex: 2 }}>
          <h2 className="admin-section-title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--admin-lime)" }}
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Recent System Activity
          </h2>
          <div className="admin-activity-list">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="admin-activity-item">
                  <div className="admin-activity-left">
                    <div className="admin-activity-icon">{getActivityIcon(activity.type)}</div>
                    <div>
                      <div className="admin-activity-text">{activity.text}</div>
                      <div className="admin-activity-time">{formatRelativeTime(activity.createdAt)}</div>
                    </div>
                  </div>
                  {activity.meta && <div className="admin-activity-meta">{activity.meta}</div>}
                </div>
              ))
            ) : (
              <div style={{ color: "var(--admin-text-muted)", fontSize: "14px", padding: "16px 0", textAlign: "center" }}>
                No recent activity logs found.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="admin-section-card" style={{ flex: 1 }}>
          <h2 className="admin-section-title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--admin-lime)" }}
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" x2="12" y1="9" y2="13" />
              <line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
            Quick Actions
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            <Link href="/admin/press-releases" style={{ textDecoration: "none" }}>
              <button
                className="admin-btn admin-btn-secondary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                <span>➕ Add Press Release</span>
              </button>
            </Link>
            <Link href="/admin/products" style={{ textDecoration: "none" }}>
              <button
                className="admin-btn admin-btn-secondary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                <span>➕ Add New Product</span>
              </button>
            </Link>
            <Link href="/admin/jobs" style={{ textDecoration: "none" }}>
              <button
                className="admin-btn admin-btn-secondary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                <span>➕ Post a New Job</span>
              </button>
            </Link>
            <Link href="/admin/contacts" style={{ textDecoration: "none" }}>
              <button
                className="admin-btn admin-btn-secondary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                <span>📨 View Contact Responses</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
