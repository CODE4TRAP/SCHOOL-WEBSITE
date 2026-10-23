import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { schoolInfo } from '../../data/content';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const navigate = useNavigate();

  // Known institutional admin emails
  const defaultAdminEmails = [
    'shiva@mail.com',
    'admin@sskps.edu.in',
    'principal@shiwanand.edu',
    'help.webnexorasolution@gmail.com'
  ];

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);

    let cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setErrorMsg('Please enter both your institutional email and passkey.');
      setLoading(false);
      return;
    }

    // Auto-map shorthand username "admin" or "shiva" to institutional email
    if (!cleanUser.includes('@')) {
      if (cleanUser === 'admin') cleanUser = 'shiva@mail.com';
      else if (cleanUser === 'shiva') cleanUser = 'shiva@mail.com';
      else cleanUser = `${cleanUser}@sskps.edu.in`;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanUser, cleanPass);
      const user = userCredential.user;

      // Verify Administrator Authorization
      let isAuthorized = defaultAdminEmails.includes(user.email?.toLowerCase());

      if (!isAuthorized && db) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', user.email.toLowerCase()));
          if (adminDoc.exists() && adminDoc.data().role) {
            isAuthorized = true;
          }
        } catch {
          // If security rules or network fails, proceed if in default list
        }
      }

      if (!isAuthorized) {
        await signOut(auth);
        setErrorMsg('Access denied. This account does not possess institutional administrator privileges.');
        setLoading(false);
        return;
      }

      const idToken = await user.getIdToken();
      localStorage.setItem('ssa_admin_token', idToken);
      localStorage.setItem(
        'ssa_admin_user',
        JSON.stringify({
          email: user.email,
          uid: user.uid,
          role: 'Super Administrator',
          name: user.displayName || 'Principal & Director Office'
        })
      );

      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Firebase Auth Error:', err.code, err.message);
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-credential'
      ) {
        setErrorMsg('Invalid administrative credentials. Please verify your institutional email and passkey.');
      } else if (err.code === 'auth/too-many-requests') {
        setErrorMsg('Too many failed login attempts. Access temporarily locked for security. Please try again later.');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMsg('Invalid email format. Please provide a valid institutional email address.');
      } else {
        setErrorMsg(err.message || 'Authentication error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasskey = () => {
    setInfoMsg('To reset your passkey, please reach out to the Director Desk at info@swamishivanandschool.com or call +91 94310 68033.');
  };

  return (
    <div className="ssa-admin-portal-universe white-portal">
      {/* Top Floating Security Strip */}
      <header className="ssa-portal-topstrip">
        <Link to="/" className="ssa-back-link" title="Return to School Website">
          <span className="material-symbols-outlined fs-5">arrow_back</span>
          <span>Return to Public School Website</span>
        </Link>
        <div className="ssa-security-pill">
          <span className="ssa-status-dot pulse-green"></span>
          <span>256-Bit Encrypted Institutional Gateway &bull; Session 2026–27</span>
        </div>
      </header>

      {/* Main Single-Column High-Detail Executive Card */}
      <div className="ssa-login-card-container">
        {/* School Branding Header */}
        <div className="ssa-card-brand-header">
          <div className="ssa-logo-badge">
            <img 
              src="/images/logo.png" 
              alt="Swami Shiwanand Academy Logo" 
              className="ssa-school-crest-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div className="ssa-brand-info">
            <div className="ssa-prestige-tag">
              <span className="material-symbols-outlined">verified</span>
              <span>CBSE Pattern Curriculum &bull; Sasaram</span>
            </div>
            <h1 className="ssa-school-title">{schoolInfo.name}</h1>
            <p className="ssa-school-subtitle">
              Managed by Deepkiran Educational Trust &bull; Estd. {schoolInfo.estd}
            </p>
          </div>
        </div>

        <div className="ssa-card-divider"></div>

        {/* Portal Access Control Title */}
        <div className="ssa-terminal-header">
          <div className="ssa-terminal-badge">
            <span className="material-symbols-outlined">lock</span>
            <span>ADMINISTRATIVE PORTAL</span>
          </div>
          <h2 className="ssa-terminal-title">Portal Access Control</h2>
          <p className="ssa-terminal-subtitle">
            Authorized access for Management, Directors &amp; Administrative Officers.
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="ssa-error-banner" role="alert">
            <span className="material-symbols-outlined text-danger fs-5">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {infoMsg && (
          <div className="ssa-info-banner" role="alert">
            <span className="material-symbols-outlined text-primary fs-5">info</span>
            <span>{infoMsg}</span>
          </div>
        )}

        {/* High-Detail Login Form */}
        <form onSubmit={handleLogin} className="ssa-auth-form">
          {/* Email / Username Field */}
          <div className="ssa-field-wrapper">
            <label className="ssa-input-label" htmlFor="admin-email-input">
              <span>Institutional Email / Admin ID</span>
              <span className="ssa-req-star">*</span>
            </label>
            <div className="ssa-input-box">
              <span className="material-symbols-outlined ssa-input-icon">alternate_email</span>
              <input
                id="admin-email-input"
                type="text"
                className="ssa-text-input"
                required
                placeholder="e.g. admin@swamishiwanand.edu"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="ssa-field-wrapper">
            <label className="ssa-input-label" htmlFor="admin-passkey-input">
              <span>Security Passkey</span>
              <span className="ssa-req-star">*</span>
            </label>
            <div className="ssa-input-box">
              <span className="material-symbols-outlined ssa-input-icon">lock</span>
              <input
                id="admin-passkey-input"
                type={showPassword ? 'text' : 'password'}
                className="ssa-text-input"
                required
                placeholder="Enter security passkey"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ssa-password-eye-btn"
                title={showPassword ? 'Hide Passkey' : 'Show Passkey'}
                aria-label={showPassword ? 'Hide passkey' : 'Show passkey'}
              >
                <span className="material-symbols-outlined fs-5">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Options Row */}
          <div className="ssa-auth-options-row">
            <label className="ssa-checkbox-label">
              <input 
                type="checkbox" 
                className="ssa-custom-checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Keep Workstation Active</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPasskey}
              className="ssa-forgot-btn"
              title="Forgot passkey help"
            >
              Forgot Passkey?
            </button>
          </div>

          {/* Master Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="ssa-authenticate-master-btn"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                <span>Authenticating Credentials...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined fs-5">lock_open</span>
                <span>AUTHENTICATE &amp; ENTER DASHBOARD</span>
                <span className="material-symbols-outlined fs-5">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Security & Verification Footer */}
        <div className="ssa-terminal-footer">
          <div className="ssa-security-note">
            <span className="material-symbols-outlined text-success fs-6">verified_user</span>
            <span>Protected by Deepkiran Institutional Encryption &bull; IP Logged &bull; 2026–27</span>
          </div>
          <div className="ssa-support-note">
            <span>Official Portal for Staff &amp; Faculty &bull; <a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}
