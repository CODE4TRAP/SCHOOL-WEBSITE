import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';

export default function PortalModal() {
  const { portalModal, closePortal } = useModal();
  const [role, setRole] = useState('student');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  if (!portalModal.isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setStatusMsg({ type: 'error', text: 'Please enter both User ID and Password.' });
      return;
    }
    setStatusMsg({ type: 'success', text: `Welcome! Logged in as ${userId} (${role.toUpperCase()}). Loading dashboard...` });
    setTimeout(() => {
      setStatusMsg(null);
      closePortal();
    }, 2000);
  };

  return (
    <div className="modal-backdrop-custom" onClick={closePortal}>
      <div className="modal-content-custom modal-content-lg portal-modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header-custom" style={{ background: 'linear-gradient(135deg, #072a4d 0%, #0c58a2 100%)', color: '#ffffff' }}>
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined text-warning fs-5">lock</span>
            <h5 className="mb-0 fw-bold text-white fs-6">{portalModal.title}</h5>
          </div>
          <button className="modal-close-btn text-white" onClick={closePortal} aria-label="Close modal">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body-custom p-4">
          <div className="text-center mb-4">
            <div className="portal-logo-ring mx-auto mb-2">
              <img src="/images/logo.png" alt="Logo" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
            </div>
            <h5 className="fw-bold text-primary mb-1">Online School Management (OSM)</h5>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <span className="m3-badge m3-badge-tonal" style={{ fontSize: '0.72rem' }}>
                <span className="material-symbols-outlined fs-6">verified</span> Session: {portalModal.session}
              </span>
              <span className="m3-badge m3-badge-amber" style={{ fontSize: '0.72rem' }}>
                Cloud Live
              </span>
            </div>
          </div>

          <div className="portal-info-box mb-4">
            <span className="material-symbols-outlined text-primary fs-5 mt-0.5">info</span>
            <span className="small text-muted">
              Enter your registered Student or Staff credentials to view real-time attendance, digital report cards, fee receipts, and circulars.
            </span>
          </div>

          {statusMsg && (
            <div className={`p-3 rounded-3 mb-3 small d-flex align-items-center gap-2 ${statusMsg.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
              <span className="material-symbols-outlined fs-5">
                {statusMsg.type === 'success' ? 'check_circle' : 'error'}
              </span>
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Segmented Role Selector */}
            <div className="portal-role-switch mb-3">
              <button
                type="button"
                className={`portal-role-btn ${role === 'student' ? 'active' : ''}`}
                onClick={() => setRole('student')}
              >
                <span className="material-symbols-outlined fs-6">school</span>
                <span>Student / Parent</span>
              </button>
              <button
                type="button"
                className={`portal-role-btn ${role === 'staff' ? 'active' : ''}`}
                onClick={() => setRole('staff')}
              >
                <span className="material-symbols-outlined fs-6">badge</span>
                <span>Staff / Teacher</span>
              </button>
            </div>

            {/* Registration / ID Input */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-dark">
                {role === 'student' ? 'Student Registration / Roll No' : 'Employee ID'}
              </label>
              <div className="portal-input-box">
                <span className="material-symbols-outlined text-muted">person</span>
                <input
                  type="text"
                  className="portal-input"
                  placeholder={role === 'student' ? 'e.g. SSKPS-2026-1042' : 'e.g. EMP-084'}
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="form-label small fw-semibold text-dark">Password</label>
              <div className="portal-input-box">
                <span className="material-symbols-outlined text-muted">lock</span>
                <input
                  type="password"
                  className="portal-input"
                  placeholder="Enter your secret portal password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="portal-submit-btn w-100">
              <span className="material-symbols-outlined fs-5">login</span>
              <span>Sign In to OSM Portal</span>
            </button>
          </form>
        </div>

        <div className="modal-footer-custom justify-content-between p-3 bg-light">
          <span className="small text-muted">
            <span className="material-symbols-outlined fs-6 align-middle me-1">help</span>
            Need help? Contact school desk
          </span>
          <button type="button" className="btn btn-outline-secondary btn-sm px-3" onClick={closePortal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
