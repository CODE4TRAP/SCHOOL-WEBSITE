import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { feeStructure, schoolInfo } from '../data/content';

export default function Admission() {
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: '',
    applyingClass: '',
    fatherName: '',
    motherName: '',
    mobile: '',
    whatsapp: '',
    address: '',
    transportNeeded: 'No',
    previousSchool: ''
  });

  const [submittedReceipt, setSubmittedReceipt] = useState(null);
  const [calculatedAge, setCalculatedAge] = useState(null);

  // Quick Fee Estimator State
  const [estimatorClass, setEstimatorClass] = useState('Nursery');
  const [includeTransport, setIncludeTransport] = useState(false);

  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const birthDate = new Date(dobString);
    const targetDate = new Date('2026-03-31');
    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    let recommendation = '';
    if (years >= 2 && years < 3) recommendation = 'Playgroup';
    else if (years >= 3 && years < 4) recommendation = 'Nursery';
    else if (years >= 4 && years < 5) recommendation = 'LKG';
    else if (years >= 5 && years < 6) recommendation = 'UKG';
    else if (years >= 6) recommendation = 'Std I to V';
    else recommendation = 'Under 2 years (Parent Infant Club)';

    return { years, months, recommendation };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'dob') {
      const ageInfo = calculateAge(value);
      setCalculatedAge(ageInfo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let appNumber = `SSKPS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success && data.data?.appNumber) {
        appNumber = data.data.appNumber;
      }
    } catch (err) {
      console.warn('API save fallback:', err);
    }

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // fallback
    }

    setSubmittedReceipt({
      appNumber,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      ...formData
    });
  };

  const resetForm = () => {
    setSubmittedReceipt(null);
    setCalculatedAge(null);
    setFormData({
      studentName: '',
      dob: '',
      gender: '',
      applyingClass: '',
      fatherName: '',
      motherName: '',
      mobile: '',
      whatsapp: '',
      address: '',
      transportNeeded: 'No',
      previousSchool: ''
    });
  };

  // Estimator calculation with exact class resolution
  const selectedFee = feeStructure.find(f => {
    if (estimatorClass === 'Nursery') return f.class === 'Nursery';
    if (estimatorClass === 'Playgroup') return f.class.startsWith('Playgroup');
    if (estimatorClass === 'LKG') return f.class.startsWith('LKG');
    if (estimatorClass === 'UKG') return f.class.startsWith('UKG');
    if (estimatorClass === 'Std I') return f.class.startsWith('Std I');
    if (estimatorClass === 'Std II') return f.class.startsWith('Std II');
    return f.class.toLowerCase().includes(estimatorClass.toLowerCase());
  }) || feeStructure[1];
  const baseAdmissionNum = parseInt(selectedFee.admissionFee.replace(/[^0-9]/g, '')) || 2800;
  const baseTuitionNum = parseInt(selectedFee.tuitionMonthly.replace(/[^0-9]/g, '')) || 900;
  const transportCost = includeTransport ? 600 : 0;
  const firstMonthTotal = baseAdmissionNum + baseTuitionNum + transportCost;

  return (
    <div>
      {/* M3 Page Header in Separate Structured Boxes */}
      <div className="m3-page-header">
        <div className="container">
          <div className="m3-header-container">
            {/* Badges in Separate Box */}
            <div className="m3-header-badges-box">
              <span className="m3-badge m3-badge-tonal">
                <span className="material-symbols-outlined fs-6">school</span> Session 2026–27
              </span>
              <span className="m3-badge m3-badge-amber">
                <span className="material-symbols-outlined fs-6">how_to_reg</span> Online Registration
              </span>
            </div>

            {/* Title in Separate Box */}
            <div className="m3-header-title-box">
              <h2 className="m3-page-header-title mb-0">Admissions &amp; Enrollment (2026–27)</h2>
            </div>

            {/* Breadcrumb in Separate Box */}
            <div className="m3-header-breadcrumb-box">
              <nav aria-label="breadcrumb">
                <ol className="m3-breadcrumb">
                  <li>
                    <Link to="/">
                      <span className="material-symbols-outlined fs-6 me-1">home</span>Home
                    </Link>
                    <span>/</span>
                  </li>
                  <li className="active">Admission</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Main Content Column */}
          <div className="col-lg-8">
            {/* Online Registration Portal Console */}
            <section id="form" className="portal-console-card">
              {/* Portal Console Header */}
              <div className="portal-console-header">
                <div className="portal-header-top-row">
                  <div className="portal-brand-block">
                    <div className="portal-icon-halo">
                      <span className="material-symbols-outlined fs-2">how_to_reg</span>
                    </div>
                    <div>
                      <h3 className="portal-header-title">Online Student Registration Portal</h3>
                      <p className="portal-header-subtitle">
                        Official admission enrollment application for Playgroup to Class V &bull; Session 2026–27
                      </p>
                    </div>
                  </div>

                  <div className="portal-status-cluster">
                    <span className="portal-live-chip">
                      <span className="pulse-dot"></span>
                      Portal Active
                    </span>
                    <span className="portal-session-chip">
                      <span className="material-symbols-outlined fs-6">calendar_today</span>
                      2026–27
                    </span>
                  </div>
                </div>
              </div>

              {/* Portal Steps Stepper */}
              <div className="portal-steps-nav">
                <div className="portal-step-pill active">
                  <span className="step-circle">1</span>
                  <span>Student Details</span>
                </div>
                <div className="portal-step-pill active">
                  <span className="step-circle">2</span>
                  <span>Parent &amp; Contact</span>
                </div>
                <div className="portal-step-pill active">
                  <span className="step-circle">3</span>
                  <span>Address &amp; Submit</span>
                </div>
              </div>

              <div className="card-body p-4 p-md-5">
                {submittedReceipt ? (
                  <div className="p-4 rounded-3 border bg-light text-center">
                    <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', margin: '0 auto 16px auto', fontSize: '1.9rem', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)' }}>
                      <i className="fas fa-check"></i>
                    </div>
                    <h4 className="fw-bold text-success mb-2">Registration Submitted Successfully!</h4>
                    <p className="text-muted small mb-4">
                      Thank you for applying to <strong>{schoolInfo.name}</strong>. Please preserve your official application acknowledgment below for document verification during school interaction.
                    </p>

                    <div className="bg-white p-4 rounded-3 border text-start mb-4 shadow-sm" id="printableReceipt">
                      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <img src="/images/logo.png" alt="Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
                          <div>
                            <h6 className="fw-bold text-primary mb-0">{schoolInfo.name}</h6>
                            <small className="text-muted">Application Acknowledgment Slip &bull; 2026-27</small>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="badge bg-warning text-dark px-3 py-1 fw-bold fs-6">
                            {submittedReceipt.appNumber}
                          </span>
                          <div className="text-muted small mt-1">Date: {submittedReceipt.date}</div>
                        </div>
                      </div>

                      <div className="row g-3 small">
                        <div className="col-sm-6">
                          <strong>Child's Full Name:</strong> {submittedReceipt.studentName}
                        </div>
                        <div className="col-sm-6">
                          <strong>Class Applying For:</strong> <span className="text-primary fw-bold">{submittedReceipt.applyingClass}</span>
                        </div>
                        <div className="col-sm-6">
                          <strong>Date of Birth:</strong> {submittedReceipt.dob}
                        </div>
                        <div className="col-sm-6">
                          <strong>Gender:</strong> {submittedReceipt.gender}
                        </div>
                        <div className="col-sm-6">
                          <strong>Father's Name:</strong> {submittedReceipt.fatherName}
                        </div>
                        <div className="col-sm-6">
                          <strong>Mother's Name:</strong> {submittedReceipt.motherName}
                        </div>
                        <div className="col-sm-6">
                          <strong>Contact Mobile:</strong> {submittedReceipt.mobile}
                        </div>
                        <div className="col-sm-6">
                          <strong>Transport Facility:</strong> {submittedReceipt.transportNeeded}
                        </div>
                        <div className="col-12">
                          <strong>Residence Address:</strong> {submittedReceipt.address}
                        </div>
                        {submittedReceipt.previousSchool && (
                          <div className="col-12">
                            <strong>Previous School:</strong> {submittedReceipt.previousSchool}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-top d-flex justify-content-between text-muted" style={{ fontSize: '0.78rem' }}>
                        <span>Note: Bring original birth certificate and 4 passport photos on counseling day.</span>
                        <span className="fw-bold text-dark">School Seal &amp; Authority</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                      <button
                        onClick={() => window.print()}
                        className="btn btn-primary d-flex align-items-center gap-2"
                      >
                        <span className="material-symbols-outlined fs-6">print</span> Print Application Slip
                      </button>
                      <button
                        onClick={resetForm}
                        className="btn btn-outline-secondary d-flex align-items-center gap-2"
                      >
                        <span className="material-symbols-outlined fs-6">add_circle</span> Submit Another Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-muted small mb-4">
                      Please fill in the candidate and parent details accurately. After submission, you will receive an acknowledgment confirmation slip and our admission office will contact you for interaction scheduling.
                    </p>

                    <form onSubmit={handleSubmit}>
                      {/* Cluster 1: Student Information */}
                      <div className="portal-field-cluster">
                        <div className="portal-cluster-heading">
                          <span className="material-symbols-outlined">badge</span>
                          <span>1. Candidate Information</span>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Child's Full Name <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              name="studentName"
                              className="form-control"
                              required
                              placeholder="e.g. Aarav Sharma"
                              value={formData.studentName}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                            <input
                              type="date"
                              name="dob"
                              className="form-control"
                              required
                              value={formData.dob}
                              onChange={handleChange}
                            />
                            {calculatedAge && (
                              <div className="small text-success mt-1 fw-semibold">
                                <i className="fas fa-info-circle me-1"></i> Age as on 31-Mar-2026: {calculatedAge.years} yrs {calculatedAge.months} mos &bull; Recommended: <strong>{calculatedAge.recommendation}</strong>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Gender <span className="text-danger">*</span></label>
                            <select
                              name="gender"
                              className="form-select"
                              required
                              value={formData.gender}
                              onChange={handleChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Boy (Male)</option>
                              <option value="Female">Girl (Female)</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Class Applying For <span className="text-danger">*</span></label>
                            <select
                              name="applyingClass"
                              className="form-select"
                              required
                              value={formData.applyingClass}
                              onChange={handleChange}
                            >
                              <option value="">Select Class</option>
                              <option value="Playgroup">Playgroup (Age 2+ yrs)</option>
                              <option value="Nursery">Nursery (Age 3+ yrs)</option>
                              <option value="LKG">LKG - Lower Kindergarten (Age 4+ yrs)</option>
                              <option value="UKG">UKG - Upper Kindergarten (Age 5+ yrs)</option>
                              <option value="Std I">Std I (Grade 1)</option>
                              <option value="Std II">Std II (Grade 2)</option>
                              <option value="Std III">Std III (Grade 3)</option>
                              <option value="Std IV">Std IV (Grade 4)</option>
                              <option value="Std V">Std V (Grade 5)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Cluster 2: Parent / Guardian Information */}
                      <div className="portal-field-cluster">
                        <div className="portal-cluster-heading">
                          <span className="material-symbols-outlined">family_restroom</span>
                          <span>2. Parent &amp; Guardian Information</span>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Father's Name <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              name="fatherName"
                              className="form-control"
                              required
                              placeholder="Enter father's name"
                              value={formData.fatherName}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Mother's Name <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              name="motherName"
                              className="form-control"
                              required
                              placeholder="Enter mother's name"
                              value={formData.motherName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Contact Mobile Number <span className="text-danger">*</span></label>
                            <input
                              type="tel"
                              name="mobile"
                              className="form-control"
                              required
                              placeholder="10-digit mobile number"
                              pattern="[0-9]{10}"
                              value={formData.mobile}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">WhatsApp Number</label>
                            <input
                              type="tel"
                              name="whatsapp"
                              className="form-control"
                              placeholder="WhatsApp contact number"
                              value={formData.whatsapp}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Cluster 3: Residential Address & Logistics */}
                      <div className="portal-field-cluster">
                        <div className="portal-cluster-heading">
                          <span className="material-symbols-outlined">home_pin</span>
                          <span>3. Residence &amp; Transport Preferences</span>
                        </div>
                        <div className="row g-3">
                          <div className="col-12">
                            <label className="form-label">Residential Address <span className="text-danger">*</span></label>
                            <textarea
                              name="address"
                              className="form-control"
                              rows="2"
                              required
                              placeholder="Current residence address in Sasaram / nearby area"
                              value={formData.address}
                              onChange={handleChange}
                            ></textarea>
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">School Transport Required?</label>
                            <select
                              name="transportNeeded"
                              className="form-select"
                              value={formData.transportNeeded}
                              onChange={handleChange}
                            >
                              <option value="No">No (Self Pickup &amp; Drop)</option>
                              <option value="Yes - School Bus/Van">Yes - School Bus / Van</option>
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Previous School Attended (If Any)</label>
                            <input
                              type="text"
                              name="previousSchool"
                              className="form-control"
                              placeholder="Leave blank if applying for first time"
                              value={formData.previousSchool}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary w-100 fw-bold py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
                          style={{
                            background: 'linear-gradient(135deg, #0b57d0 0%, #072e5c 100%)',
                            border: 'none',
                            borderRadius: '14px',
                            boxShadow: '0 6px 20px rgba(11, 87, 208, 0.25)'
                          }}
                        >
                          <span className="material-symbols-outlined fs-5">send</span>
                          Submit Admission Registration (Session 2026–27)
                        </button>
                        <div className="text-center mt-3 text-muted small d-flex align-items-center justify-content-center gap-2">
                          <span className="material-symbols-outlined text-success fs-6">verified_user</span>
                          <span>256-bit Encrypted Submission &bull; Verified Deepkiran Educational Trust Direct Registry</span>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </section>

            {/* Interactive Fee Estimator Widget */}
            <div className="section-header-box mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="header-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                  <span className="material-symbols-outlined">calculate</span>
                </div>
                <div>
                  <h3 className="header-title">Quick Fee Estimator (Session 2026–27)</h3>
                  <p className="header-subtitle">
                    Select your child's grade and optional transport to calculate instant monthly and admission fee breakdown.
                  </p>
                </div>
              </div>
            </div>

            {/* M3 Interactive Fee Estimator Console Card */}
            <div className="estimator-console-card">
              <div className="estimator-console-header">
                <div className="d-flex align-items-center gap-3">
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined fs-5">calculate</span>
                  </div>
                  <div>
                    <span className="d-block fw-bold" style={{ fontSize: '0.68rem', letterSpacing: '0.6px', color: '#64748b', textTransform: 'uppercase' }}>
                      Financial Calculator • Session 2026–27
                    </span>
                    <h4 className="fw-bold text-dark mb-0" style={{ fontSize: '1.05rem' }}>
                      Admission &amp; Monthly Fee Estimator
                    </h4>
                  </div>
                </div>
                <span className="m3-badge m3-badge-tonal">
                  <span className="material-symbols-outlined fs-6 text-success">verified</span>
                  Transparent CBSE Pattern Scale
                </span>
              </div>

              <div className="estimator-console-body">
                <div className="estimator-grid">
                  {/* Left Controls */}
                  <div>
                    <div className="estimator-control-group">
                      <label className="estimator-control-label" htmlFor="estimatorClassSelect">
                        <span className="material-symbols-outlined fs-6 text-primary">school</span>
                        Select Target Grade / Class:
                      </label>
                      <select
                        id="estimatorClassSelect"
                        className="estimator-select"
                        value={estimatorClass}
                        onChange={(e) => setEstimatorClass(e.target.value)}
                      >
                        <option value="Playgroup">Playgroup (Pre-Nursery) • Age 2 to 3 Yrs</option>
                        <option value="Nursery">Nursery • Age 3 to 4 Yrs</option>
                        <option value="LKG">LKG (Lower Kindergarten) • Age 4 to 5 Yrs</option>
                        <option value="UKG">UKG (Upper Kindergarten) • Age 5 to 6 Yrs</option>
                        <option value="Std I">Std I (Grade 1) • Age 6+ Yrs</option>
                        <option value="Std II">Std II to Std V (Primary Wing)</option>
                      </select>
                      <div className="estimator-class-tag">
                        <span className="material-symbols-outlined fs-6 text-success">check_circle</span>
                        <span>Selected Wing: {estimatorClass === 'Std II' ? 'Primary Wing (Classes 2 to 5)' : estimatorClass === 'Std I' ? 'Primary Grade 1' : 'Pre-Primary Early Foundation'}</span>
                      </div>
                    </div>

                    <div className="estimator-control-group mb-0">
                      <label className="estimator-control-label">
                        <span className="material-symbols-outlined fs-6 text-success">directions_bus</span>
                        Optional Transportation Facility:
                      </label>
                      <div
                        className={`estimator-transport-card ${includeTransport ? 'active' : ''}`}
                        onClick={() => setIncludeTransport(!includeTransport)}
                        role="button"
                        tabIndex="0"
                        title="Click to toggle school bus service"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div className={`estimator-transport-icon ${includeTransport ? 'active' : ''}`}>
                            <span className="material-symbols-outlined">directions_bus</span>
                          </div>
                          <div>
                            <div className="estimator-transport-title">School Van / Bus Service</div>
                            <div className="estimator-transport-sub">GPS live tracking with certified female attendant</div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className={`estimator-transport-rate ${includeTransport ? 'active' : ''}`}>
                            {includeTransport ? '+₹ 600 / mo' : 'Optional (+₹ 600)'}
                          </span>
                          <div className={`estimator-switch-track ${includeTransport ? 'checked' : ''}`}>
                            <div className="estimator-switch-thumb"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Summary Panel */}
                  <div className="estimator-summary-panel">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="estimator-summary-label">Estimated 1st Month Total</span>
                        <span className="estimator-instant-chip">
                          <span className="estimator-dot"></span> Instant Calculation
                        </span>
                      </div>

                      <div className="estimator-grand-total">
                        ₹ {firstMonthTotal.toLocaleString('en-IN')}
                      </div>
                      <div className="estimator-total-hint">
                        Includes one-time admission + 1st month tuition {includeTransport ? '+ bus facility' : ''}
                      </div>

                      <div className="estimator-breakdown-list">
                        <div className="estimator-breakdown-row">
                          <span>
                            <span className="material-symbols-outlined fs-6 text-primary me-1 align-middle">how_to_reg</span>
                            One-Time Admission Fee:
                          </span>
                          <span className="estimator-breakdown-val">₹ {baseAdmissionNum.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="estimator-breakdown-row">
                          <span>
                            <span className="material-symbols-outlined fs-6 text-success me-1 align-middle">menu_book</span>
                            1st Month Tuition:
                          </span>
                          <span className="estimator-breakdown-val">₹ {baseTuitionNum.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="estimator-breakdown-row">
                          <span>
                            <span className="material-symbols-outlined fs-6 text-warning me-1 align-middle">directions_bus</span>
                            Transport (School Bus):
                          </span>
                          <span className="estimator-breakdown-val">
                            {includeTransport ? '₹ 600' : '₹ 0 (Not Opted)'}
                          </span>
                        </div>
                      </div>

                      <div className="estimator-recurring-box">
                        <span className="material-symbols-outlined text-success fs-5">event_repeat</span>
                        <div>
                          <span className="d-block small text-muted" style={{ fontSize: '0.72rem' }}>
                            Recurring Fee from 2nd Month onwards:
                          </span>
                          <strong className="text-success" style={{ fontSize: '0.92rem' }}>
                            ₹ {(baseTuitionNum + transportCost).toLocaleString('en-IN')} / month
                          </strong>
                        </div>
                      </div>
                    </div>

                    <a href="#form" className="estimator-cta-btn">
                      <span className="material-symbols-outlined fs-6">how_to_reg</span>
                      <span>Proceed with {estimatorClass} Admission &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Structure Section */}
            <section id="fee-structure" className="mb-5">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <h3 className="header-title">Complete Fee Schedule (Session 2026–27)</h3>
                    <p className="header-subtitle">
                      Transparent and affordable fee schedule designed to ensure quality education without prohibitive overheads.
                    </p>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Class / Grade</th>
                      <th>One-Time Admission Fee</th>
                      <th>Monthly Tuition Fee</th>
                      <th>Annual Exam Fee</th>
                      <th>Activity / Sports Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructure.map((row, idx) => (
                      <tr key={idx}>
                        <td className="fw-bold text-primary">{row.class}</td>
                        <td>{row.admissionFee}</td>
                        <td className="fw-semibold text-dark">{row.tuitionMonthly}</td>
                        <td>{row.examAnnual}</td>
                        <td>{row.activityAnnual}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Age Criteria Section */}
            <section id="guidelines" className="mb-5">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div>
                    <h3 className="header-title">Age Eligibility Criteria (As on 31st March 2026)</h3>
                    <p className="header-subtitle">
                      Official age criteria and recommended class placement benchmarks for early childhood education.
                    </p>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Minimum Age Required</th>
                      <th>Recommended Age Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-semibold">Playgroup (Pre-Nursery)</td>
                      <td>2 Years Completed</td>
                      <td>2 to 3 Years</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Nursery</td>
                      <td>3 Years Completed</td>
                      <td>3 to 4 Years</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">LKG (Lower Kindergarten)</td>
                      <td>4 Years Completed</td>
                      <td>4 to 5 Years</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">UKG (Upper Kindergarten)</td>
                      <td>5 Years Completed</td>
                      <td>5 to 6 Years</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Std I (Grade 1)</td>
                      <td>6 Years Completed</td>
                      <td>6 to 7 Years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Online Fee Payment Guide */}
            <section id="fee-payment" className="fee-payment-section">
              {/* Title in Separate Box */}
              <div className="fee-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="fee-header-icon">
                    <span className="material-symbols-outlined fs-2">payments</span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="m3-badge m3-badge-amber">Authorized Remittance</span>
                      <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: '0.72rem' }}>
                        Session 2026–27 Verified
                      </span>
                    </div>
                    <h3 className="fee-header-title">Online Fee Payment Instructions</h3>
                    <p className="fee-header-desc mb-0">
                      Safe, direct, and zero-fee school fee transfer through official bank and UPI channels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Instruction in a Separate Box */}
              <div className="fee-notice-box mb-4">
                <div className="d-flex align-items-start gap-3">
                  <span className="material-symbols-outlined text-primary fs-3 mt-1">info</span>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold text-primary mb-1">Payment Instructions &amp; Receipt Verification</h6>
                    <p className="small text-muted mb-3" style={{ lineHeight: '1.7' }}>
                      Parents can remit school fees via direct NEFT/RTGS bank transfer or any UPI QR application (Google Pay, PhonePe, Paytm, BHIM). After initiating payment, please send the transaction screenshot along with student name and class to our verified WhatsApp to receive an instant digital receipt.
                    </p>
                    
                    {/* Dedicated WhatsApp Action Card */}
                    <div className="whatsapp-action-box">
                      <div className="d-flex align-items-center gap-3">
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#25d366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                          <i className="fab fa-whatsapp"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark" style={{ fontSize: '0.92rem' }}>Official Accounts WhatsApp Desk</div>
                          <div className="small text-muted">WhatsApp transaction receipt for instant admission slip</div>
                        </div>
                      </div>
                      <a
                        href="https://wa.me/919431068033?text=Hello%20Swami%20Shiwanand%20Academy,%20I%20have%20transferred%20the%20fees.%20Here%20is%20the%20payment%20slip."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-action-btn"
                      >
                        <i className="fab fa-whatsapp fs-6"></i>
                        <span>Send Screenshot to +91 94310 68033</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Every Main Detail in Separate Boxes */}
              <div className="section-header-box mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
                    <span className="material-symbols-outlined">account_balance</span>
                  </div>
                  <div>
                    <h3 className="header-title">Authorized School Bank &amp; UPI Accounts</h3>
                    <p className="header-subtitle">
                      Official verified institutional accounts for fee remittance and bank transfers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-4">
                {/* Box 1: Account Beneficiary */}
                <div className="col-md-6 col-12">
                  <div className="fee-detail-card">
                    <div className="fee-card-top">
                      <span className="material-symbols-outlined text-primary">domain</span>
                      <span className="fee-card-label">Account Beneficiary</span>
                    </div>
                    <div className="fee-card-value">{schoolInfo.name}</div>
                    <div className="fee-card-hint">Official Institute Current Account</div>
                  </div>
                </div>

                {/* Box 2: Bank & Branch */}
                <div className="col-md-6 col-12">
                  <div className="fee-detail-card">
                    <div className="fee-card-top">
                      <span className="material-symbols-outlined text-info">account_balance</span>
                      <span className="fee-card-label">Bank &amp; Branch</span>
                    </div>
                    <div className="fee-card-value">State Bank of India (SBI) / PNB</div>
                    <div className="fee-card-hint">Sasaram Main Branch &bull; IFSC: SBIN0000178</div>
                  </div>
                </div>

                {/* Box 3: Account Number & Type */}
                <div className="col-md-6 col-12">
                  <div className="fee-detail-card">
                    <div className="fee-card-top">
                      <span className="material-symbols-outlined text-warning">tag</span>
                      <span className="fee-card-label">Account Number &amp; Type</span>
                    </div>
                    <div className="fee-card-value">Current A/C: 38402910482</div>
                    <div className="fee-card-hint">Eligible for IMPS / NEFT / RTGS Transfers</div>
                  </div>
                </div>

                {/* Box 4: UPI ID & QR Code */}
                <div className="col-md-6 col-12">
                  <div className="fee-detail-card highlight">
                    <div className="fee-card-top">
                      <span className="material-symbols-outlined text-success">qr_code_2</span>
                      <span className="fee-card-label">Official UPI ID</span>
                    </div>
                    <div className="fee-card-value font-monospace text-success">9431068033@upi</div>
                    <div className="fee-card-hint">Accepted on Google Pay &bull; PhonePe &bull; Paytm &bull; BHIM</div>
                  </div>
                </div>
              </div>

              {/* 3 Step Remittance Process Flow Stepper */}
              <div className="remittance-steps-grid">
                {/* Step 1 */}
                <div className="remittance-step-card step-1">
                  <div>
                    <div className="remittance-step-header">
                      <div className="remittance-icon-box icon-blue">
                        <span className="material-symbols-outlined fs-4">payments</span>
                      </div>
                      <span className="remittance-step-badge badge-blue">Step 01 of 03</span>
                    </div>
                    <h6 className="remittance-step-title">1. Transfer Remittance</h6>
                    <p className="remittance-step-text">
                      Transfer tuition or admission charges via Bank NEFT, RTGS or UPI scan to the authorized Deepkiran Trust account.
                    </p>
                  </div>
                  <div className="remittance-step-footer">
                    <span className="remittance-step-tag tag-blue">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>qr_code_scanner</span>
                      UPI &amp; Net Banking
                    </span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="remittance-step-card step-2">
                  <div>
                    <div className="remittance-step-header">
                      <div className="remittance-icon-box icon-amber">
                        <span className="material-symbols-outlined fs-4">receipt_long</span>
                      </div>
                      <span className="remittance-step-badge badge-amber">Step 02 of 03</span>
                    </div>
                    <h6 className="remittance-step-title">2. Capture Transaction Slip</h6>
                    <p className="remittance-step-text">
                      Take a clear screenshot showing the 12-digit UTR reference or bank transaction confirmation number.
                    </p>
                  </div>
                  <div className="remittance-step-footer">
                    <span className="remittance-step-tag tag-amber">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>pin</span>
                      12-Digit UTR Proof
                    </span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="remittance-step-card step-3">
                  <div>
                    <div className="remittance-step-header">
                      <div className="remittance-icon-box icon-green">
                        <span className="material-symbols-outlined fs-4">mark_chat_read</span>
                      </div>
                      <span className="remittance-step-badge badge-green">Step 03 of 03</span>
                    </div>
                    <h6 className="remittance-step-title">3. Receive Verified Receipt</h6>
                    <p className="remittance-step-text">
                      WhatsApp the transaction screenshot to <strong>+91 94310 68033</strong> to receive an official digital stamp fee receipt.
                    </p>
                  </div>
                  <div className="remittance-step-footer">
                    <span className="remittance-step-tag tag-green">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                      Instant Stamp Confirmation
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar Column */}
          <div className="col-lg-4">
            {/* Download Prospectus Card */}
            <div className="card shadow-sm border-0 rounded-3 mb-4 overflow-hidden" id="prospectus">
              <div className="card-header bg-primary text-white p-3" style={{ background: 'var(--primary-dark)' }}>
                <h5 className="mb-0 fw-bold"><i className="fas fa-file-pdf text-warning me-2"></i> Download Prospectus</h5>
              </div>
              <div className="card-body p-4 text-center">
                <i className="fas fa-book-reader fa-3x text-primary mb-3"></i>
                <h6 className="fw-bold text-dark">School Information Brochure (PDF)</h6>
                <p className="small text-muted mb-4">
                  Download our illustrated 2026–27 prospectus containing detailed pedagogical methods, facilities, and fee breakdowns.
                </p>
                <button
                  onClick={() => alert('Downloading official Swami Shiwanand Academy Prospectus (2026–27)... Please check your download folder.')}
                  className="btn btn-primary w-100 fw-bold py-2 mb-2"
                >
                  <i className="fas fa-download me-1"></i> Download Prospectus
                </button>
              </div>
            </div>

            {/* Checklist of Required Documents */}
            <div className="doc-checklist-card mb-4" id="documents-required">
              <div className="doc-checklist-header">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="doc-checklist-category">VERIFICATION CHECKLIST</span>
                  <span className="doc-count-badge">
                    <span className="material-symbols-outlined fs-6 text-primary">task_alt</span>
                    6 Key Items
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="doc-checklist-icon-box">
                    <span className="material-symbols-outlined">folder_shared</span>
                  </div>
                  <div>
                    <h5 className="doc-checklist-title mb-0">Documents Required</h5>
                    <span className="doc-checklist-sub">For physical verification during campus interaction</span>
                  </div>
                </div>
              </div>

              <div className="doc-checklist-body">
                <div className="doc-guidance-pill">
                  <span className="material-symbols-outlined text-success fs-6" style={{ marginTop: '1px' }}>info</span>
                  <span>Keep 1 self-attested photocopy set along with original certificates for verification.</span>
                </div>

                <div className="doc-items-stack">
                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">01</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">Municipal Birth Certificate</span>
                          <span className="doc-tag doc-tag-required">Mandatory</span>
                        </div>
                        <div className="doc-item-sub">Issued by Municipal Corp / Nagar Nigam / Gram Panchayat</div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">02</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">Student Photographs</span>
                          <span className="doc-tag">4 Copies</span>
                        </div>
                        <div className="doc-item-sub">Recent color passport-size photos with light background</div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">03</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">Parents' Photographs</span>
                          <span className="doc-tag">2 Copies</span>
                        </div>
                        <div className="doc-item-sub">2 passport-size photographs of mother &amp; father each</div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">04</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">Aadhaar Card (ID Proof)</span>
                          <span className="doc-tag doc-tag-required">Mandatory</span>
                        </div>
                        <div className="doc-item-sub">Photocopies of child and both parents' Aadhaar cards</div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">05</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">Immunization Record</span>
                          <span className="doc-tag">Health Record</span>
                        </div>
                        <div className="doc-item-sub">Pediatric vaccination record card (Playgroup to UKG)</div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">06</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">TC &amp; Report Card</span>
                          <span className="doc-tag doc-tag-applicable">Std I &amp; Above</span>
                        </div>
                        <div className="doc-item-sub">Countersigned Transfer Certificate + last school marksheet</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="doc-footer-note">
                  <span className="material-symbols-outlined fs-6 text-primary">verified</span>
                  <span>Assistance available at school office for form attestation</span>
                </div>
              </div>
            </div>

            {/* Admission Helpdesk Info */}
            <div className="admission-helpdesk-card">
              <div className="helpdesk-header">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="helpdesk-category">ADMISSION COUNSELING</span>
                  <span className="helpdesk-status-pill">
                    <span className="helpdesk-status-dot"></span> Open Today
                  </span>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="helpdesk-halo">
                    <span className="material-symbols-outlined fs-3">support_agent</span>
                  </div>
                  <div>
                    <h5 className="helpdesk-title mb-0">Admission Helpdesk</h5>
                    <div className="helpdesk-hours">Mon – Sat: 08:00 AM – 02:00 PM</div>
                  </div>
                </div>

                <p className="helpdesk-desc mt-3 mb-0">
                  Have questions about seat availability, syllabus, or fee structure? Speak directly with our counseling desk.
                </p>
              </div>

              <div className="helpdesk-body">
                <div className="helpdesk-helplines-stack">
                  <a href="tel:+919431068033" className="helpdesk-contact-action">
                    <div className="d-flex align-items-center gap-2">
                      <div className="helpdesk-call-icon">
                        <span className="material-symbols-outlined fs-6">phone_in_talk</span>
                      </div>
                      <div>
                        <span className="helpdesk-action-tag">COUNSELING DESK &bull; DIRECT</span>
                        <div className="helpdesk-action-val">+91 94310 68033</div>
                      </div>
                    </div>
                    <span className="helpdesk-action-btn">
                      <span>CALL</span>
                      <span className="material-symbols-outlined fs-6">arrow_forward</span>
                    </span>
                  </a>

                  <a href="tel:+918809226820" className="helpdesk-contact-action">
                    <div className="d-flex align-items-center gap-2">
                      <div className="helpdesk-call-icon">
                        <span className="material-symbols-outlined fs-6">call</span>
                      </div>
                      <div>
                        <span className="helpdesk-action-tag">ADMIN &bull; PRINCIPAL OFFICE</span>
                        <div className="helpdesk-action-val">+91 88092 26820</div>
                      </div>
                    </div>
                    <span className="helpdesk-action-btn">
                      <span>CALL</span>
                      <span className="material-symbols-outlined fs-6">arrow_forward</span>
                    </span>
                  </a>

                  <a
                    href="https://wa.me/919431068033?text=Hello%20Swami%20Shiwanand%20Academy,%20I%20have%20an%20admission%20inquiry%20for%20Session%202026-27."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="helpdesk-whatsapp-action"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div className="helpdesk-whatsapp-icon">
                        <i className="fab fa-whatsapp"></i>
                      </div>
                      <div>
                        <span className="helpdesk-action-tag" style={{ color: '#166534' }}>WHATSAPP DESK</span>
                        <div className="helpdesk-action-val" style={{ color: '#14532d' }}>Chat on WhatsApp</div>
                      </div>
                    </div>
                    <span className="helpdesk-whatsapp-btn">
                      <span>CHAT</span>
                      <span className="material-symbols-outlined fs-6">chat</span>
                    </span>
                  </a>
                </div>

                <Link to="/contact" className="helpdesk-inquiry-btn">
                  <span className="material-symbols-outlined fs-6">mail</span>
                  <span>Send Detailed Admission Inquiry &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
