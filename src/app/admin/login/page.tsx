"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, getStoredAuth } from "@/utils/useAuth";
import { ApiError } from "@/utils/apiClient";
import "./login.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    const { token } = getStoredAuth();
    if (token) {
      window.location.href = "/admin";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login(email.trim(), password);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Unable to connect to the server. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* Ambient background blobs */}
      <div className="login-blob login-blob-1" aria-hidden="true" />
      <div className="login-blob login-blob-2" aria-hidden="true" />

      <div className="login-card">
        {/* Brand mark */}
        <div className="login-brand">
          <div className="login-brand-icon">
            <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
              <path d="M2 28.8928L15.9269 22.6025L23.943 27.3203L25.5624 42.7978L15.684 42.7148L17.1415 31.9551L15.4411 30.9619L7.10111 37.5836L2 28.8928Z" fill="#4f7c0d" />
              <path d="M24.8342 26.6576L37.1419 35.8446L42 26.9887L32.1213 22.933V20.9466L42 16.8082L37.1419 8.03488L24.8342 17.2221V26.6576Z" fill="#4f7c0d" />
              <path d="M23.943 16.4775L25.5624 1L15.684 1.16549L17.1415 11.9253L15.4411 12.9185L7.02015 6.29708L2 14.9049L15.9269 21.1952L23.943 16.4775Z" fill="#4f7c0d" />
            </svg>
          </div>
          <span className="login-brand-name">AWL<span>CMS</span></span>
        </div>

        {/* Heading */}
        <div className="login-heading">
          <h1 className="login-title">Admin Sign In</h1>
          <p className="login-subtitle">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="login-error" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Email field */}
          <div className="login-field">
            <label htmlFor="admin-email" className="login-label">
              Email Address
            </label>
            <div className="login-input-wrapper">
              <svg className="login-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                placeholder="admin@aayushwellness.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                className="login-input"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="login-field">
            <label htmlFor="admin-password" className="login-label">
              Password
            </label>
            <div className="login-input-wrapper">
              <svg className="login-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                className="login-input"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="login-show-password"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            id="admin-login-btn"
            type="submit"
            className={`login-submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="login-spinner" />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer note */}
        <p className="login-footer-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Restricted access — Aayush Wellness Limited
        </p>
      </div>
    </div>
  );
}
