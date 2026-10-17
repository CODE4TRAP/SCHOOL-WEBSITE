import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';

export default function PortalModal() {
  const { portalModal, closePortal } = useModal();

  // Active Main Tab: 'student' | 'fee' | 'staff'
  const [activeTab, setActiveTab] = useState('student');

  // Student Login States
  const [authMethod, setAuthMethod] = useState('id'); // 'id' | 'otp'
  const [studentId, setStudentId] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);

  // Quick Fee States
  const [feeAdmNo, setFeeAdmNo] = useState('');
  const [feeDob, setFeeDob] = useState('');
  const [feeLoading, setFeeLoading] = useState(false);
  const [feeRecord, setFeeRecord] = useState(null);
  const [feeSuccess, setFeeSuccess] = useState(false);

  // Staff Login States
  const [staffId, setStaffId] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [staffDept, setStaffDept] = useState('primary');
  const [staffLoading, setStaffLoading] = useState(false);
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);

  if (!portalModal.isOpen) return null;

  // Handle Demo Fill for Student
  const handleDemoStudent = () => {
    setAuthMethod('id');
    setStudentId('SSA-2026-042');
    setPin('943106');
    setLoginError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsStudentLoggedIn(true);
    }, 400);
  };

  // Handle Student Login Submit
  const handleStudentLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (authMethod === 'id' && (!studentId.trim() || !pin.trim())) {
      setLoginError('Please enter both your Student Admission ID and 6-digit PIN.');
      return;
    }
    if (authMethod === 'otp') {
      if (!phone.trim()) {
        setLoginError('Please enter your 10-digit registered mobile number.');
        return;
      }
      if (!otpSent) {
        setOtpSent(true);
        return;
      }
      if (!otp.trim()) {
        setLoginError('Please enter the 4-digit OTP sent to your mobile.');
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsStudentLoggedIn(true);
    }, 600);
  };

  // Handle Quick Fee Search
  const handleFeeSearch = (e) => {
    e.preventDefault();
    if (!feeAdmNo.trim()) return;
    setFeeLoading(true);
    setTimeout(() => {
      setFeeLoading(false);
      setFeeRecord({
        studentName: 'Aarav Kumar',
        parentName: 'Rameshwar Kumar',
        className: 'Class III - Section A',
        admNo: feeAdmNo.toUpperCase(),
        rollNo: '14',
        term: 'Quarter 2 (Jul - Sep 2026)',
        dueDate: '15 Nov 2026',
        tuitionFee: 1800,
        computerLab: 350,
        activityFee: 250,
        total: 2400,
        status: 'Unpaid'
      });
      setFeeSuccess(false);
    }, 500);
  };

  const handleDemoFeeFill = () => {
    setFeeAdmNo('SSA-2026-042');
    setFeeDob('2018-05-14');
    setFeeLoading(true);
    setTimeout(() => {
      setFeeLoading(false);
      setFeeRecord({
        studentName: 'Aarav Kumar',
        parentName: 'Rameshwar Kumar',
        className: 'Class III - Section A',
        admNo: 'SSA-2026-042',
        rollNo: '14',
        term: 'Quarter 2 (Jul - Sep 2026)',
        dueDate: '15 Nov 2026',
        tuitionFee: 1800,
        computerLab: 350,
        activityFee: 250,
        total: 2400,
        status: 'Unpaid'
      });
      setFeeSuccess(false);
    }, 350);
  };

  const handleSimulatePayment = () => {
    setFeeSuccess(true);
  };

  // Handle Staff Login
  const handleStaffLogin = (e) => {
    e.preventDefault();
    if (!staffId.trim() || !staffPassword.trim()) return;
    setStaffLoading(true);
    setTimeout(() => {
      setStaffLoading(false);
      setIsStaffLoggedIn(true);
    }, 500);
  };

  const handleDemoStaff = () => {
    setStaffId('FAC-2026-09');
    setStaffPassword('AdminPass2026');
    setStaffDept('primary');
    setStaffLoading(true);
    setTimeout(() => {
      setStaffLoading(false);
      setIsStaffLoggedIn(true);
    }, 400);
  };

  return (
    <div className="modal-backdrop-custom" onClick={closePortal}>
      <div className="osm-hub-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Top Executive Header */}
        <div className="osm-hub-header">
          <button
            className="osm-hub-close-btn"
            onClick={closePortal}
            aria-label="Close portal modal"
          >
            <span className="material-symbols-outlined fs-5">close</span>
          </button>

          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
            <div className="osm-hub-system-badge">
              <span className="osm-hub-dot"></span>
              <span>OSM Cloud Portal &bull; Session 2026–27</span>
            </div>
            <span className="osm-hub-ssl-badge">
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>lock</span>
              256-Bit Encrypted
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="osm-hub-crest-ring">
              <img
                src="/images/logo.png"
                alt="Swami Shiwanand Academy Crest"
                style={{ width: '42px', height: '42px', objectFit: 'contain' }}
              />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h4 className="osm-hub-title mb-0">Online School Management (OSM 2.0)</h4>
                <span className="osm-hub-live-pill">LIVE SECURE</span>
              </div>
              <p className="osm-hub-sub mb-0">
                Official Unified Digital Portal for Parents, Students &amp; Faculty
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation Segmented Bar */}
        <div className="osm-hub-tabs-bar">
          <button
            type="button"
            className={`osm-hub-tab-btn ${activeTab === 'student' ? 'active' : ''}`}
            onClick={() => { setActiveTab('student'); setLoginError(''); }}
          >
            <span className="material-symbols-outlined fs-5">family_restroom</span>
            <span>Parent &amp; Student</span>
          </button>

          <button
            type="button"
            className={`osm-hub-tab-btn ${activeTab === 'fee' ? 'active' : ''}`}
            onClick={() => { setActiveTab('fee'); }}
          >
            <span className="material-symbols-outlined fs-5">payments</span>
            <span>Fee Payment</span>
            <span className="osm-hub-tab-chip" style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }}>COMING SOON</span>
          </button>

          <button
            type="button"
            className={`osm-hub-tab-btn ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => { setActiveTab('staff'); }}
          >
            <span className="material-symbols-outlined fs-5">badge</span>
            <span>Faculty Desk</span>
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="osm-hub-body">
          {/* ========================================================================= */}
          {/* TAB 1: PARENT & STUDENT PORTAL                                           */}
          {/* ========================================================================= */}
          {activeTab === 'student' && (
            <div>
              {!isStudentLoggedIn ? (
                <div>
                  {/* Auth Method Toggle Pill */}
                  <div className="osm-auth-toggle-wrap mb-3">
                    <button
                      type="button"
                      className={`osm-auth-toggle-btn ${authMethod === 'id' ? 'active' : ''}`}
                      onClick={() => { setAuthMethod('id'); setLoginError(''); }}
                    >
                      <span className="material-symbols-outlined fs-6">badge</span>
                      <span>Admission / Student ID</span>
                    </button>
                    <button
                      type="button"
                      className={`osm-auth-toggle-btn ${authMethod === 'otp' ? 'active' : ''}`}
                      onClick={() => { setAuthMethod('otp'); setLoginError(''); }}
                    >
                      <span className="material-symbols-outlined fs-6">smartphone</span>
                      <span>Mobile OTP</span>
                    </button>
                  </div>

                  {loginError && (
                    <div className="osm-hub-error-alert mb-3">
                      <span className="material-symbols-outlined fs-5 text-danger">error</span>
                      <span>{loginError}</span>
                    </div>
                  )}

                  {/* Login Form */}
                  <form onSubmit={handleStudentLogin}>
                    {authMethod === 'id' ? (
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <label className="osm-hub-label">
                            Student ID or Admission No. <span className="text-danger">*</span>
                          </label>
                          <div className="osm-hub-input-wrap">
                            <span className="material-symbols-outlined osm-hub-input-icon">person</span>
                            <input
                              type="text"
                              value={studentId}
                              onChange={(e) => setStudentId(e.target.value)}
                              placeholder="e.g. SSA-2026-042"
                              className="osm-hub-input"
                              autoFocus
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="d-flex align-items-center justify-content-between">
                            <label className="osm-hub-label">
                              Access Passcode / PIN <span className="text-danger">*</span>
                            </label>
                            <span className="osm-hub-hint">Default: Reg. Mobile (Last 6)</span>
                          </div>
                          <div className="osm-hub-input-wrap">
                            <span className="material-symbols-outlined osm-hub-input-icon">lock</span>
                            <input
                              type={showPin ? 'text' : 'password'}
                              value={pin}
                              onChange={(e) => setPin(e.target.value)}
                              placeholder="Enter 6-digit PIN"
                              className="osm-hub-input"
                            />
                            <button
                              type="button"
                              className="osm-hub-eye-btn"
                              onClick={() => setShowPin(!showPin)}
                              title={showPin ? 'Hide PIN' : 'Show PIN'}
                            >
                              <span className="material-symbols-outlined fs-6">
                                {showPin ? 'visibility_off' : 'visibility'}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row g-3">
                        <div className="col-12 col-md-7">
                          <label className="osm-hub-label">
                            Registered Mobile Number <span className="text-danger">*</span>
                          </label>
                          <div className="osm-hub-input-wrap">
                            <span className="osm-hub-prefix">+91</span>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Enter 10-digit mobile"
                              maxLength={10}
                              className="osm-hub-input ps-2"
                              autoFocus
                            />
                            {!otpSent ? (
                              <button
                                type="button"
                                className="osm-hub-otp-request-btn"
                                onClick={() => {
                                  if (!phone.trim() || phone.length < 10) {
                                    setLoginError('Please enter a valid 10-digit mobile number.');
                                    return;
                                  }
                                  setLoginError('');
                                  setOtpSent(true);
                                  setOtp('4289'); // Demo OTP prefilled for instant testing
                                }}
                              >
                                Send OTP
                              </button>
                            ) : (
                              <span className="osm-hub-otp-sent-tag">OTP Sent!</span>
                            )}
                          </div>
                        </div>

                        <div className="col-12 col-md-5">
                          <label className="osm-hub-label">
                            4-Digit OTP <span className="text-danger">*</span>
                          </label>
                          <div className="osm-hub-input-wrap">
                            <span className="material-symbols-outlined osm-hub-input-icon">sms</span>
                            <input
                              type="text"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder="4-digit code"
                              maxLength={4}
                              className="osm-hub-input"
                              disabled={!otpSent}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Aux row: Remember me & Help link */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3 mb-3">
                      <label className="osm-hub-checkbox-label">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="form-check-input"
                        />
                        <span>Keep me logged in on this device</span>
                      </label>

                      <a
                        href="tel:+919431068033"
                        className="osm-hub-forgot-link"
                        title="Contact school administration for credentials"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>help</span>
                        <span>Forgot PIN / First Time User?</span>
                      </a>
                    </div>

                    {/* Submit Button & One-Click Demo Button */}
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <button
                        type="submit"
                        className="osm-hub-primary-btn flex-grow-1"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span>Verifying Credentials...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined fs-5">login</span>
                            <span>Sign In to Student Portal</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleDemoStudent}
                        className="osm-hub-demo-btn"
                        title="Instant preview without typing"
                      >
                        <span className="material-symbols-outlined fs-6" style={{ color: '#d97706' }}>bolt</span>
                        <span>One-Click Demo</span>
                      </button>
                    </div>
                  </form>

                  {/* 4 Feature Badges Strip (Clean, Horizontal & Compact) */}
                  <div className="osm-hub-capabilities-bar mt-3 pt-3">
                    <div className="osm-hub-cap-item">
                      <span className="material-symbols-outlined cap-icon text-primary">fact_check</span>
                      <div>
                        <strong>Live Attendance</strong>
                        <small>Morning Gate &amp; Bus GPS</small>
                      </div>
                    </div>
                    <div className="osm-hub-cap-item">
                      <span className="material-symbols-outlined cap-icon text-success">assessment</span>
                      <div>
                        <strong>Report Cards</strong>
                        <small>CBSE CCE &amp; Gradebooks</small>
                      </div>
                    </div>
                    <div className="osm-hub-cap-item">
                      <span className="material-symbols-outlined cap-icon text-amber">receipt_long</span>
                      <div>
                        <strong>Instant Fee Receipts</strong>
                        <small>GST Invoices &amp; Ledger</small>
                      </div>
                    </div>
                    <div className="osm-hub-cap-item">
                      <span className="material-symbols-outlined cap-icon text-purple">menu_book</span>
                      <div>
                        <strong>Daily Homework</strong>
                        <small>Classroom Circulars</small>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ========================================================================= */
                /* LOGGED IN STUDENT DASHBOARD PREVIEW                                       */
                /* ========================================================================= */
                <div className="osm-hub-student-dashboard">
                  {/* Student Identity Card */}
                  <div className="osm-dashboard-profile-card">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="osm-student-avatar">
                          <span>AK</span>
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <h5 className="osm-student-name mb-0">Aarav Kumar</h5>
                            <span className="osm-verified-badge">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>verified</span>
                              Enrolled
                            </span>
                          </div>
                          <div className="osm-student-meta">
                            <span>Class III - Sec A</span>
                            <span className="dot">&bull;</span>
                            <span>Roll #14</span>
                            <span className="dot">&bull;</span>
                            <span>Adm ID: SSA-2026-042</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsStudentLoggedIn(false)}
                        className="osm-logout-btn"
                        title="Sign out of student account"
                      >
                        <span className="material-symbols-outlined fs-6">logout</span>
                        <span>Log Out</span>
                      </button>
                    </div>

                    {/* 4 Quick Metrics Grid */}
                    <div className="osm-dash-metrics-grid mt-3">
                      <div className="osm-metric-card">
                        <span className="metric-label">Attendance Rate</span>
                        <div className="d-flex align-items-baseline gap-1 mt-1">
                          <span className="metric-val text-success">96.8%</span>
                          <span className="metric-sub text-muted">/ 114 Days</span>
                        </div>
                        <span className="metric-tag tag-success">
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>check</span>
                          Present Today (07:52 AM)
                        </span>
                      </div>

                      <div className="osm-metric-card">
                        <span className="metric-label">Term II Fee Status</span>
                        <div className="d-flex align-items-baseline gap-1 mt-1">
                          <span className="metric-val text-primary">₹2,400</span>
                          <span className="metric-sub text-muted">Due 15 Nov</span>
                        </div>
                        <span className="metric-tag tag-warning">
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>schedule</span>
                          Pending Payment
                        </span>
                      </div>

                      <div className="osm-metric-card">
                        <span className="metric-label">Academic Grade</span>
                        <div className="d-flex align-items-baseline gap-1 mt-1">
                          <span className="metric-val text-purple">A+</span>
                          <span className="metric-sub text-muted">(92.4% Avg)</span>
                        </div>
                        <span className="metric-tag tag-purple">
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>star</span>
                          Rank 2 in Class
                        </span>
                      </div>

                      <div className="osm-metric-card">
                        <span className="metric-label">Assigned Transport</span>
                        <div className="d-flex align-items-baseline gap-1 mt-1">
                          <span className="metric-val text-dark">Bus #04</span>
                          <span className="metric-sub text-muted">Belarhi Gate</span>
                        </div>
                        <span className="metric-tag tag-info">
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>directions_bus</span>
                          GPS Beacon Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Portals Grid */}
                  <div className="osm-dash-actions-grid mt-3">
                    <button
                      type="button"
                      className="osm-dash-action-btn"
                      onClick={() => alert('Opening Digital Report Card: Aarav Kumar (Term 1 - Grade A+, 92.4%).')}
                    >
                      <span className="material-symbols-outlined action-icon text-primary">download_for_offline</span>
                      <div>
                        <strong>Term 1 Gradebook &amp; CCE</strong>
                        <small>Download Certified CBSE Marksheet (PDF)</small>
                      </div>
                      <span className="material-symbols-outlined ms-auto text-muted fs-6">arrow_forward</span>
                    </button>

                    <button
                      type="button"
                      className="osm-dash-action-btn"
                      onClick={() => { setActiveTab('fee'); handleDemoFeeFill(); }}
                    >
                      <span className="material-symbols-outlined action-icon text-success">qr_code_scanner</span>
                      <div>
                        <strong>Pay Outstanding Fee (₹2,400)</strong>
                        <small>Zero Surcharge UPI / GPay / NetBanking</small>
                      </div>
                      <span className="material-symbols-outlined ms-auto text-muted fs-6">arrow_forward</span>
                    </button>

                    <button
                      type="button"
                      className="osm-dash-action-btn"
                      onClick={() => alert('Today\'s Homework (3 Items):\n1. Mathematics: Ch-4 Fractions Ex 4.2\n2. English: Rhymes & Story Reading\n3. Environmental Science: Draw Leaf diagram.')}
                    >
                      <span className="material-symbols-outlined action-icon text-purple">assignment</span>
                      <div>
                        <strong>Today’s Homework (3 Tasks)</strong>
                        <small>Maths, English, Environmental Studies</small>
                      </div>
                      <span className="material-symbols-outlined ms-auto text-muted fs-6">arrow_forward</span>
                    </button>

                    <button
                      type="button"
                      className="osm-dash-action-btn"
                      onClick={() => alert('Official Notice: Parents-Teacher Meeting (PTM) scheduled for Saturday, 9:00 AM to 1:00 PM.')}
                    >
                      <span className="material-symbols-outlined action-icon text-amber">campaign</span>
                      <div>
                        <strong>School Notices &amp; Circulars</strong>
                        <small>2 New Announcements from Principal</small>
                      </div>
                      <span className="material-symbols-outlined ms-auto text-muted fs-6">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: ONLINE FEE PAYMENT GATEWAY (COMING SOON)                          */}
          {/* ========================================================================= */}
          {activeTab === 'fee' && (
            <div className="osm-fee-coming-soon-container py-2">
              {/* Top Status Card */}
              <div className="p-3 rounded-3 mb-4" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', border: '1.5px solid #fde68a' }}>
                <div className="d-flex align-items-center gap-3">
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)' }}>
                    <span className="material-symbols-outlined fs-3">hourglass_top</span>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                      <h5 className="fw-bold text-dark mb-0">Online Fee Payment Gateway</h5>
                      <span className="badge rounded-pill px-2.5 py-1 small fw-bold" style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }}>
                        COMING SOON &bull; SESSION 2026–27
                      </span>
                    </div>
                    <p className="text-muted small mb-0">
                      Direct 256-bit automated bank payment gateway &amp; digital fee ledger integration is currently under compliance testing.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Pillars of Information */}
              <div className="row g-3 mb-4">
                <div className="col-md-4 col-12">
                  <div className="p-3 rounded-3 h-100 bg-light border" style={{ borderColor: '#e2e8f0' }}>
                    <div className="d-flex align-items-center gap-2 mb-2 text-primary">
                      <span className="material-symbols-outlined fs-5">storefront</span>
                      <strong className="small">Offline Counter Active</strong>
                    </div>
                    <p className="small text-muted mb-0" style={{ lineHeight: '1.45' }}>
                      Parents can pay tuition and term fees via Cash, UPI QR code, or Cheque directly at the School Accounts Counter (Admin Block).
                    </p>
                  </div>
                </div>

                <div className="col-md-4 col-12">
                  <div className="p-3 rounded-3 h-100 bg-light border" style={{ borderColor: '#e2e8f0' }}>
                    <div className="d-flex align-items-center gap-2 mb-2 text-success">
                      <span className="material-symbols-outlined fs-5">schedule</span>
                      <strong className="small">Counter Timings</strong>
                    </div>
                    <p className="small text-muted mb-0" style={{ lineHeight: '1.45' }}>
                      Monday to Saturday: <strong>09:00 AM – 01:30 PM</strong>. Official printed GST stamped receipts are provided immediately.
                    </p>
                  </div>
                </div>

                <div className="col-md-4 col-12">
                  <div className="p-3 rounded-3 h-100 bg-light border" style={{ borderColor: '#e2e8f0' }}>
                    <div className="d-flex align-items-center gap-2 mb-2 text-warning">
                      <span className="material-symbols-outlined fs-5">sms</span>
                      <strong className="small">SMS Alert on Launch</strong>
                    </div>
                    <p className="small text-muted mb-0" style={{ lineHeight: '1.45' }}>
                      Registered parent mobile numbers will receive an official notification once the instant online payment gateway goes live.
                    </p>
                  </div>
                </div>
              </div>

              {/* Counter Helpline & Action Strip */}
              <div className="p-3 rounded-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="material-symbols-outlined fs-4">headset_mic</span>
                    </div>
                    <div>
                      <strong className="d-block text-dark small">Accounts &amp; Fee Inquiry Counter</strong>
                      <span className="text-muted small">For fee dues check, ledger receipt verification, and bank transfer support.</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <a
                      href="tel:+919431068033"
                      className="btn btn-outline-primary btn-sm rounded-pill fw-bold d-inline-flex align-items-center gap-1.5 px-3 py-1.5"
                    >
                      <span className="material-symbols-outlined fs-6">call</span>
                      <span>+91 94310 68033</span>
                    </a>
                    <a
                      href="https://wa.me/919431068033?text=Hello%20Swami%20Shiwanand%20Academy,%20I%20have%20an%20inquiry%20regarding%20school%20fees."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success btn-sm rounded-pill fw-bold d-inline-flex align-items-center gap-1.5 px-3 py-1.5 text-white"
                    >
                      <span className="material-symbols-outlined fs-6">chat</span>
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: FACULTY & STAFF DESK                                               */}
          {/* ========================================================================= */}
          {activeTab === 'staff' && (
            <div>
              {!isStaffLoggedIn ? (
                <div>
                  <form onSubmit={handleStaffLogin}>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label className="osm-hub-label">
                          Faculty / Employee ID <span className="text-danger">*</span>
                        </label>
                        <div className="osm-hub-input-wrap">
                          <span className="material-symbols-outlined osm-hub-input-icon">badge</span>
                          <input
                            type="text"
                            value={staffId}
                            onChange={(e) => setStaffId(e.target.value)}
                            placeholder="e.g. FAC-2026-09"
                            className="osm-hub-input text-uppercase"
                            autoFocus
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="osm-hub-label">
                          Administrative Password <span className="text-danger">*</span>
                        </label>
                        <div className="osm-hub-input-wrap">
                          <span className="material-symbols-outlined osm-hub-input-icon">key</span>
                          <input
                            type="password"
                            value={staffPassword}
                            onChange={(e) => setStaffPassword(e.target.value)}
                            placeholder="Enter password"
                            className="osm-hub-input"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="osm-hub-label">Department / Wing</label>
                        <select
                          value={staffDept}
                          onChange={(e) => setStaffDept(e.target.value)}
                          className="form-select osm-hub-select"
                        >
                          <option value="primary">Primary &amp; Pre-Primary Wing (Playgroup to Std VI)</option>
                          <option value="academic">Academic Coordination &amp; Examination Cell</option>
                          <option value="accounts">Accounts, Billing &amp; Fee Desk</option>
                          <option value="transport">Transport &amp; Bus Fleet Management</option>
                        </select>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2 flex-wrap mt-3">
                      <button
                        type="submit"
                        className="osm-hub-primary-btn flex-grow-1"
                        disabled={staffLoading}
                      >
                        {staffLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span>Verifying Faculty Credentials...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined fs-5">lock_open</span>
                            <span>Sign In to Faculty ERP</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleDemoStaff}
                        className="osm-hub-demo-btn"
                        title="Simulate teacher sign-in"
                      >
                        <span className="material-symbols-outlined fs-6" style={{ color: '#d97706' }}>bolt</span>
                        <span>Demo Teacher</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Faculty Dashboard Preview */
                <div className="osm-hub-faculty-dashboard">
                  <div className="osm-dashboard-profile-card">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                      <div className="d-flex align-items-center gap-3">
                        <div className="osm-staff-avatar">
                          <span>SS</span>
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <h5 className="osm-student-name mb-0">Sunita Sharma</h5>
                            <span className="badge bg-success-subtle text-success border rounded-pill small">
                              Active Faculty
                            </span>
                          </div>
                          <span className="text-muted small">
                            Senior Primary Educator &bull; Emp ID: {staffId || 'FAC-2026-09'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsStaffLoggedIn(false)}
                        className="osm-logout-btn"
                      >
                        <span className="material-symbols-outlined fs-6">logout</span>
                        <span>Log Out</span>
                      </button>
                    </div>

                    {/* Teacher Quick Tools */}
                    <div className="row g-2 mt-3">
                      <div className="col-6 col-md-3">
                        <button
                          type="button"
                          className="osm-staff-tool-card w-100"
                          onClick={() => alert('Daily Attendance Sheet: Class III-A (38 Present / 2 Absent).')}
                        >
                          <span className="material-symbols-outlined text-primary fs-4">checklist</span>
                          <span>Mark Attendance</span>
                        </button>
                      </div>
                      <div className="col-6 col-md-3">
                        <button
                          type="button"
                          className="osm-staff-tool-card w-100"
                          onClick={() => alert('Gradebook Entry: Term 2 Unit Tests open for marks upload.')}
                        >
                          <span className="material-symbols-outlined text-success fs-4">edit_note</span>
                          <span>Enter Test Marks</span>
                        </button>
                      </div>
                      <div className="col-6 col-md-3">
                        <button
                          type="button"
                          className="osm-staff-tool-card w-100"
                          onClick={() => alert('Classroom Diary: 3 homework assignments posted for today.')}
                        >
                          <span className="material-symbols-outlined text-purple fs-4">post_add</span>
                          <span>Post Homework</span>
                        </button>
                      </div>
                      <div className="col-6 col-md-3">
                        <button
                          type="button"
                          className="osm-staff-tool-card w-100"
                          onClick={() => alert('Parent Broadcast: Instant SMS & WhatsApp notification broadcast tool.')}
                        >
                          <span className="material-symbols-outlined text-amber fs-4">send</span>
                          <span>Send Notice</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Institutional Footer Strip */}
        <div className="osm-hub-footer">
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined text-success" style={{ fontSize: '15px' }}>shield</span>
            <span className="osm-hub-footer-txt">
              Swami Shiwanand Academy Central Cloud &bull; ISO 9001:2015 Protocol
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <a
              href="tel:+919431068033"
              className="osm-hub-footer-link"
              title="Direct IT & Desk Support"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>support_agent</span>
              <span>Helpdesk: +91 94310 68033</span>
            </a>
            <button
              type="button"
              className="btn btn-secondary btn-sm rounded-pill px-3 py-1 fw-semibold"
              onClick={closePortal}
              style={{ fontSize: '12px' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
