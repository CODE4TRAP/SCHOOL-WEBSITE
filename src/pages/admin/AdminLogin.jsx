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

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      // Save auth session
      localStorage.setItem('ssa_admin_token', data.token);
      localStorage.setItem('ssa_admin_user', JSON.stringify(data.admin));

      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to authenticate. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const autoFillDemo = () => {
    setUsername('shiva@mail.com');
    setPassword('check123');
    setErrorMsg('');
  };

  return (
    <div className="instagram-admin-login-wrapper">
      <div className="container py-5 min-vh-100 d-flex align-items-center justify-content-center" style={{ maxWidth: '1280px' }}>
        <div className="row w-100 align-items-center justify-content-center g-5">
          
          {/* Left Column: Instagram-style Visual Showcase & Floating Cards */}
          <div className="col-lg-6 col-xl-7 d-none d-lg-block">
            <div className="admin-showcase-container">
              {/* Institution Monogram */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <img
                  src="/images/logo.png"
                  alt="Swami Shiwanand Academy Logo"
                  className="admin-brand-logo"
                />
                <div>
                  <span className="badge bg-warning text-dark fw-bold px-3 py-1 mb-1">
                    CBSE Pattern • Estd. 1999
                  </span>
                  <h4 className="text-white fw-bold mb-0">{schoolInfo.name}</h4>
                </div>
              </div>

              {/* Bold Headline (like Instagram's headline) */}
              <h1 className="admin-showcase-title mb-3">
                Inspiring Little Minds,{' '}
                <span className="gradient-highlight-text">
                  Nurturing Joyful Futures.
                </span>
              </h1>
              <p className="admin-showcase-subtitle mb-4">
                Welcome to the administrative console. Oversee student admissions, review inquiries, publish school circulars, and synchronize live records with MongoDB Atlas.
              </p>

              {/* Floating Cards Mockup (Inspired by Instagram's dynamic stack) */}
              <div className="instagram-cards-stack">
                {/* Main Showcase Card */}
                <div className="stack-card stack-card-center">
                  <div className="stack-card-img-wrap">
                    <img
                      src="/images/front_banner.jpg"
                      alt="Swami Shiwanand Academy Campus"
                      className="stack-card-img"
                    />
                    <div className="stack-card-chip-top">
                      <span>★</span> 25+ Yrs Educational Legacy
                    </div>
                    {/* Reaction Floating Emojis */}
                    <div className="reaction-bubble bubble-heart">❤️</div>
                    <div className="reaction-bubble bubble-star">⭐</div>
                    <div className="reaction-bubble bubble-trophy">🏆</div>
                  </div>
                  <div className="stack-card-caption">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Sasaram Campus Wings</strong>
                        <p className="text-muted small mb-0">Playgroup, Nursery, LKG, UKG &amp; Std I–V</p>
                      </div>
                      <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1">
                        Active Session 2026–27
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 1 (Top Left) */}
                <div className="floating-stat-card stat-card-left">
                  <div className="pulse-indicator"></div>
                  <div>
                    <div className="fw-bold text-white small">Admissions Open</div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>1,000+ Happy Students</div>
                  </div>
                </div>

                {/* Floating Badge 2 (Bottom Right) */}
                <div className="floating-stat-card stat-card-right">
                  <span className="material-symbols-outlined text-warning fs-5">cloud_done</span>
                  <div>
                    <div className="fw-bold text-white small">MongoDB Cloud Sync</div>
                    <div className="text-success" style={{ fontSize: '0.72rem' }}>● Real-time sync online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Modern Admin Sign-In Card */}
          <div className="col-lg-6 col-xl-5 col-12">
            <div className="admin-login-glass-card">
              
              {/* Header */}
              <div className="text-center mb-4">
                <div className="admin-icon-halo mx-auto mb-3">
                  <span className="material-symbols-outlined text-warning fs-2">admin_panel_settings</span>
                </div>
                <h3 className="fw-bold text-white mb-1">Administrative Sign In</h3>
                <p className="text-light-subtle small mb-0">
                  Authorized personnel, directors &amp; staff portal
                </p>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="admin-login-error mb-4">
                  <span className="material-symbols-outlined fs-5">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin}>
                {/* Username Input */}
                <div className="mb-3">
                  <label className="form-label text-light small fw-semibold">
                    Admin Email / Username
                  </label>
                  <div className="admin-input-group">
                    <span className="material-symbols-outlined input-icon">person</span>
                    <input
                      type="text"
                      className="admin-form-input"
                      required
                      placeholder="e.g. shiva@mail.com"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label text-light small fw-semibold mb-0">
                      Security Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-warning small text-decoration-none bg-transparent border-0 p-0"
                      style={{ fontSize: '0.78rem' }}
                    >
                      {showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                  </div>
                  <div className="admin-input-group">
                    <span className="material-symbols-outlined input-icon">lock</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="admin-form-input"
                      required
                      placeholder="Enter secret passkey"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Quick Auto-Fill Demo Pill */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <button
                    type="button"
                    onClick={autoFillDemo}
                    className="demo-autofill-btn"
                    title="Click to quickly fill admin credentials"
                  >
                    <span className="material-symbols-outlined fs-6">bolt</span>
                    <span>1-Click Auto-Fill: <strong>shiva@mail.com / check123</strong></span>
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="admin-submit-btn mb-4"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Authenticating Management Access...
                    </>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>

                {/* Divider / Return Link */}
                <div className="text-center pt-2 border-top border-secondary border-opacity-25">
                  <Link to="/" className="admin-back-link">
                    <span className="material-symbols-outlined fs-6">arrow_back</span>
                    <span>Back to School Public Website</span>
                  </Link>
                </div>
              </form>

              {/* Security Footer Badge */}
              <div className="admin-security-pill mt-4">
                <span className="material-symbols-outlined text-success fs-6">verified_user</span>
                <span>Protected by 256-Bit SSL &amp; JWT Security Architecture</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
