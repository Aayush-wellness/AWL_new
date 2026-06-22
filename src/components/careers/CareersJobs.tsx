"use client";
import React, { useState, useRef } from "react";

interface Job {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  exp: string;
}

const jobsData: Job[] = [
  {
    id: "pm",
    title: "Product Manager",
    dept: "Product & Innovation",
    location: "Mumbai, India",
    type: "Full Time",
    exp: "1 yr",
  },
  {
    id: "bdm-1",
    title: "Business Development Manager",
    dept: "Marketing & Growth",
    location: "Mumbai, India",
    type: "Full Time",
    exp: "1 yr",
  },
  {
    id: "bdm-2",
    title: "Business Development Manager",
    dept: "Marketing & Growth",
    location: "Mumbai, India",
    type: "Full Time",
    exp: "1 yr",
  },
];

export function CareersJobs() {
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    position: "",
    experience: "",
    coverNote: "",
  });
  const [fileName, setFileName] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectJob = (job: Job) => {
    setSelectedJobId(job.id);
    setFormData((prev) => ({
      ...prev,
      position: job.title,
    }));
  };

  const handleGeneralApp = () => {
    setSelectedJobId("general");
    setFormData((prev) => ({
      ...prev,
      position: "General Application",
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "File size must be under 5MB" }));
        setFileName("");
      } else {
        setFileName(file.name);
        setErrors((prev) => ({ ...prev, resume: "" }));
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email Address is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.location) newErrors.location = "Current Location is required";
    if (!formData.position) newErrors.position = "Position of Interest is required";
    if (!formData.experience) newErrors.experience = "Experience level is required";
    if (!fileName) newErrors.resume = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      // Reset state after simulate
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          location: "",
          position: "",
          experience: "",
          coverNote: "",
        });
        setFileName("");
        setSelectedJobId("");
      }, 5000);
    }
  };

  return (
    <section className="careers-jobs-section">
      <div className="careers-coming-soon-container">
        <div className="careers-coming-soon-card reveal">
          <div className="careers-glow-orb-1"></div>
          <div className="careers-glow-orb-2"></div>
          <div className="careers-badge">
            <span className="careers-badge-dot"></span>
            Careers
          </div>
          <h2 className="careers-coming-soon-title">
            Opportunities Coming Soon
          </h2>
          <p className="careers-coming-soon-desc">
            We are currently structuring our growth teams and preparing new openings.
            Stay tuned as we build the future of preventive healthcare and wellness.
          </p>
          <div className="careers-stay-tuned">
            <div className="careers-pulse-circle"></div>
            <span>Applications Opening Soon</span>
          </div>
        </div>
      </div>

      {/* 
      ==========================================================================
      PREVIOUS CODE (COMMENTED OUT AS REQUESTED)
      ==========================================================================
      <div className="careers-jobs-container">
        <div className="careers-jobs-left">
          <div className="careers-jobs-intro reveal">
            <h2 className="careers-jobs-heading">Current Openings</h2>
            <p className="careers-jobs-subheading">
              Join our mission to democratize preventive healthcare and build nutraceutical products that serve everyday lives.
            </p>
          </div>

          <div className="careers-jobs-list reveal d1">
            {jobsData.map((job) => {
              const isSelected = selectedJobId === job.id;
              return (
                <div
                  key={job.id}
                  className={`careers-job-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelectJob(job)}
                >
                  <h3 className="careers-job-title">{job.title}</h3>
                  <span className="careers-job-dept">{job.dept}</span>
                  <div className="careers-job-details">
                    <span className="careers-job-detail-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {job.location}
                    </span>
                    <span className="careers-job-detail-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                      {job.type}
                    </span>
                    <span className="careers-job-detail-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {job.exp}
                    </span>
                  </div>
                </div>
              );
            })}

            <div
              className={`careers-job-card general-app-card ${
                selectedJobId === "general" ? "selected" : ""
              }`}
              onClick={handleGeneralApp}
            >
              <h3 className="careers-job-title">Don't see the right role?</h3>
              <p className="careers-job-desc">
                We're always looking for passionate people. Submit your profile - our team will connect if there's a fit.
              </p>
            </div>
          </div>
        </div>

        <div className="careers-jobs-right reveal d1">
          <div className="careers-form-container">
            {isSubmitted ? (
              <div className="careers-form-success">
                <div className="success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="success-title">Application Submitted!</h3>
                <p className="success-desc">
                  Thank you for applying, {formData.fullName}. Our recruitment team will review your profile and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="careers-form">
                <div className="careers-form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? "error" : ""}
                    />
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Current Location <span className="required">*</span></label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={errors.location ? "error" : ""}
                    >
                      <option value="">Select your location</option>
                      <option value="Mumbai">Mumbai, India</option>
                      <option value="Delhi">Delhi, India</option>
                      <option value="Bangalore">Bangalore, India</option>
                      <option value="Pune">Pune, India</option>
                      <option value="Remote">Remote</option>
                    </select>
                    {errors.location && <span className="field-error">{errors.location}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="position">Position Interested In <span className="required">*</span></label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className={errors.position ? "error" : ""}
                    >
                      <option value="">Select the role you are interested in</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="Business Development Manager">Business Development Manager</option>
                      <option value="General Application">General Application</option>
                    </select>
                    {errors.position && <span className="field-error">{errors.position}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience">Years of Experience <span className="required">*</span></label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={errors.experience ? "error" : ""}
                    >
                      <option value="">Select your experience</option>
                      <option value="0-1 yr">0 - 1 year</option>
                      <option value="1-3 yrs">1 - 3 years</option>
                      <option value="3-5 yrs">3 - 5 years</option>
                      <option value="5+ yrs">5+ years</option>
                    </select>
                    {errors.experience && <span className="field-error">{errors.experience}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Upload Resume / CV <span className="required">*</span></label>
                    <div 
                      className={`file-upload-box ${errors.resume ? "error" : ""}`}
                      onClick={triggerFileSelect}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      <span className="file-upload-text">
                        {fileName ? fileName : "Drag & drop your file here or "}
                        {!fileName && <span className="browse-link">Choose File</span>}
                      </span>
                      <span className="file-upload-sub">PDF, DOC, DOCX (MAX. 5MB)</span>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </div>
                    {errors.resume && <span className="field-error">{errors.resume}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="coverNote">Cover Note <span className="optional">(Optional)</span></label>
                    <textarea
                      id="coverNote"
                      name="coverNote"
                      rows={4}
                      placeholder="Tell us something about yourself..."
                      value={formData.coverNote}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group full-width">
                    <button type="submit" className="careers-submit-btn">
                      Submit Application
                    </button>
                    <div className="form-secure-footer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      <span>Your information is secure and will be kept confidential.</span>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      */}
    </section>
  );
}
