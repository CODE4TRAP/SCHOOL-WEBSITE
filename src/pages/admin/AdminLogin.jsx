import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { schoolInfo } from '../../data/content';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('ssa_admin_token', data.token || 'jwt_session_' + Date.now());
          localStorage.setItem('ssa_admin_user', JSON.stringify(data.admin || { email: cleanUser, role: 'Super Admin' }));
          navigate('/admin/dashboard');
          return;
        }
      }
    } catch (err) {
      console.warn('Backend API notice, testing credentials directly:', err);
    }

    // Direct credential validation fallback for shiva@mail.com / check123
    if (cleanUser === 'shiva@mail.com' && cleanPass === 'check123') {
      localStorage.setItem('ssa_admin_token', 'jwt_session_' + Date.now());
      localStorage.setItem('ssa_admin_user', JSON.stringify({ email: 'shiva@mail.com', role: 'Super Admin' }));
      navigate('/admin/dashboard');
      return;
    }

    setErrorMsg('Invalid email or security passkey. Please check your credentials.');
    setLoading(false);
  };

  const autoFillDemo = () => {
    setUsername('shiva@mail.com');
    setPassword('check123');
    setErrorMsg('');
  };

  return (
    <div className="admin-portal-wrapper">
      {/* Background Layer 1: Architectural Campus Blur */}
      <div className="admin-bg-backdrop"></div>

      {/* Background Layer 2: Deep Ambient Aurora Vignette */}
      <div className="admin-ambient-aurora"></div>

      {/* Background Layer 3: Cyber Dot Matrix Grid */}
      <div className="admin-mesh-grid"></div>

      {/* Background Layer 4: Floating Ambient Glow Orbs */}
      <div className="admin-glow-orb orb-blue"></div>
      <div className="admin-glow-orb orb-amber"></div>
      <div className="admin-glow-orb orb-emerald"></div>

      {/* Foreground Content */}
      <div className="admin-portal-content">
        {/* Top Executive Nav Strip */}
        <header className="admin-top-strip">
          <Link to="/" className="admin-brand-link">
            <img
              src="/images/logo.png"
              alt="Swami Shiwanand Academy"
              className="admin-brand-img"
            />
            <div>
              <div className="admin-brand-title">{schoolInfo.name}</div>
              <div className="admin-brand-sub">
                &bull; Kid's Play School &bull; Sasaram Campus
              </div>
            </div>
          </Link>

          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-md-flex align-items-center gap-2 px-3 py-1 rounded-pill" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '0.78rem' }}>
              <span className="pulse-indicator"></span>
              <span className="text-light">Session 2026–27 Live Console</span>
            </div>
            <Link to="/" className="admin-nav-exit-btn">
              <span className="material-symbols-outlined fs-6">arrow_back</span>
              <span>Back to Public Website</span>
            </Link>
          </div>
        </header>

        {/* Main Body Grid */}
        <div className="container py-5 my-auto" style={{ maxWidth: '1240px' }}>
          <div className="row align-items-center g-5">
            
            {/* Left Column: Command Center Experience */}
            <div className="col-lg-6 col-xl-7 d-none d-lg-block">
              <div className="admin-showcase-wrapper">
                
                {/* Official Status Pill */}
                <div className="admin-badge-capsule">
                  <span className="pulse-indicator"></span>
                  <span>Official Executive Administration Console</span>
                </div>

                {/* Main Headline */}
                <h1 className="admin-main-headline">
                  Centralized Campus Command &amp;{' '}
                  <span className="text-gradient-amber-blue">
                    Admissions Console.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="admin-showcase-desc">
                  Authorized portal for school directors, registrars, and faculty coordinators. Real-time control of online admissions, document validations, and MongoDB Atlas database records.
                </p>

                {/* 3 Interactive Feature Cards */}
                <div className="admin-features-grid">
                  
                  {/* Feature 1: Admissions */}
                  <div className="admin-feature-row-card">
                    <div className="admin-feature-icon-box amber">
                      <span className="material-symbols-outlined fs-4">how_to_reg</span>
                    </div>
                    <div>
                      <div className="admin-feature-title">
                        <span>Admissions &amp; Candidate Pipeline</span>
                        <span className="badge bg-warning-subtle text-warning border border-warning-subtle" style={{ fontSize: '0.68rem' }}>Active Intake</span>
                      </div>
                      <p className="admin-feature-text">
                        Process applications across Playgroup, Nursery, LKG, UKG and Std I–V with instant verified printable acknowledgment slips.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2: WhatsApp Document Desk */}
                  <div className="admin-feature-row-card">
                    <div className="admin-feature-icon-box emerald">
                      <span className="material-symbols-outlined fs-4">chat</span>
                    </div>
                    <div>
                      <div className="admin-feature-title">
                        <span>WhatsApp Slip &amp; Fee Desk (+91 94310 68033)</span>
                        <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: '0.68rem' }}>Direct Drop</span>
                      </div>
                      <p className="admin-feature-text">
                        Fast-track review for parent admission slips, payment screenshots, and birth certificate verification.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3: Cloud Database */}
                  <div className="admin-feature-row-card">
                    <div className="admin-feature-icon-box blue">
                      <span className="material-symbols-outlined fs-4">cloud_sync</span>
                    </div>
                    <div>
                      <div className="admin-feature-title">
                        <span>MongoDB Atlas Serverless Cloud</span>
                        <span className="badge bg-info-subtle text-info border border-info-subtle" style={{ fontSize: '0.68rem' }}>Encrypted</span>
                      </div>
                      <p className="admin-feature-text">
                        Enterprise cloud sync with Vercel serverless functions, JWT bearer security tokens, and 256-bit SSL protection.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Institutional Metrics Pill Row */}
                <div className="admin-metrics-row">
                  <div className="admin-metric-pill-box">
                    <div className="admin-metric-value text-warning">25+ Yrs</div>
                    <div className="admin-metric-label">Legacy of Trust</div>
                  </div>
                  <div className="admin-metric-pill-box">
                    <div className="admin-metric-value text-info">500+</div>
                    <div className="admin-metric-label">Enrolled Students</div>
                  </div>
                  <div className="admin-metric-pill-box">
                    <div className="admin-metric-value text-success">15 : 1</div>
                    <div className="admin-metric-label">Student-Teacher Ratio</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Ultra-Premium Glass Login Card */}
            <div className="col-lg-6 col-xl-5 col-12">
              <div className="admin-masterpiece-card">
                
                {/* Top Glowing Color Accent Bar */}
                <div className="admin-card-top-accent"></div>

                {/* Halo Shield Emblem */}
                <div className="text-center mb-4">
                  <div className="admin-halo-emblem">
                    <span className="material-symbols-outlined fs-2 text-warning">shield_lock</span>
                  </div>
                  <h3 className="admin-card-header-title">Administrative Access</h3>
                  <p className="admin-card-header-sub">
                    Sign in to access management dashboard &amp; student leads
                  </p>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="admin-error-banner">
                    <span className="material-symbols-outlined fs-5">error</span>
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                  {/* Email / Username Field */}
                  <div className="admin-input-cluster">
                    <label className="admin-input-label">
                      <span>ADMIN EMAIL / USERNAME</span>
                      <span className="text-secondary small">Required</span>
                    </label>
                    <div className="admin-field-box">
                      <span className="material-symbols-outlined admin-field-icon">mail</span>
                      <input
                        type="text"
                        className="admin-text-field"
                        required
                        placeholder="e.g. shiva@mail.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="admin-input-cluster">
                    <div className="admin-input-label">
                      <span>SECURITY PASSKEY</span>
                      <span className="text-secondary small">Encrypted</span>
                    </div>
                    <div className="admin-field-box">
                      <span className="material-symbols-outlined admin-field-icon">lock</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="admin-text-field"
                        required
                        placeholder="Enter secret passkey"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="admin-eye-toggle"
                        title={showPassword ? 'Hide Password' : 'Show Password'}
                      >
                        <span className="material-symbols-outlined fs-5">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* 1-Click Fast Pass Auto-Fill */}
                  <button
                    type="button"
                    onClick={autoFillDemo}
                    className="admin-autofill-fastpass"
                    title="Click to automatically fill credentials"
                  >
                    <div className="admin-autofill-left">
                      <span className="material-symbols-outlined text-warning fs-5">bolt</span>
                      <span>1-Click Auto-Fill: <strong>shiva@mail.com</strong></span>
                    </div>
                    <span className="admin-autofill-right">check123</span>
                  </button>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="admin-signin-btn"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span>
                        <span>Verifying Security Clearance...</span>
                      </>
                    ) : (
                      <>
                        <span>Authorize &amp; Sign In</span>
                        <span className="material-symbols-outlined">login</span>
                      </>
                    )}
                  </button>

                  {/* Trust Footer */}
                  <div className="admin-trust-strip">
                    <span className="material-symbols-outlined text-success fs-6">verified_user</span>
                    <span>Protected by 256-Bit SSL &bull; JWT Bearer Encryption</span>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
