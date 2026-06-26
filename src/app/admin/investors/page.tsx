"use client";

import React from "react";
import InvestorsManager from "../../../components/admin/investors/InvestorsManager";

export default function AdminInvestorsPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Investor Relations Content</h1>
          <p className="admin-page-subtitle">
            Manage category tabs and upload/organize compliance documents, annual reports, BM outcomes, and other financial disclosures.
          </p>
        </div>
      </div>

      <InvestorsManager />
    </div>
  );
}
