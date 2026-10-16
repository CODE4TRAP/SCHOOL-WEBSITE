import React from 'react';
import { useModal } from '../context/ModalContext';

export default function PortalModal() {
  const { portalModal, closePortal } = useModal();

  if (!portalModal.isOpen) return null;

  return (
    <div className="modal-backdrop-custom" onClick={closePortal}>
      <div className="osm-modal-dialog" onClick={e => e.stopPropagation()}>
        {/* Header Hero */}
        <div className="osm-modal-header">
          {/* Close Button */}
          <button
            className="osm-modal-close-btn"
            onClick={closePortal}
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined fs-5">close</span>
          </button>

          {/* Top Pill */}
          <div>
            <span className="osm-modal-brand-badge">
              <span className="material-symbols-outlined fs-6">cloud_sync</span>
              Digital Campus ERP &bull; 2026–27
            </span>
          </div>

          {/* Logo & Title Header */}
          <div className="d-flex align-items-center gap-3 mt-1">
            <div className="osm-modal-logo-ring">
              <img
                src="/images/logo.png"
                alt="Swami Shiwanand Academy Crest"
                style={{ width: '42px', height: '42px', objectFit: 'contain' }}
              />
            </div>
            <div>
              <h4 className="fw-bold mb-1 text-white fs-5" style={{ letterSpacing: '-0.3px' }}>
                Online School Management (OSM)
              </h4>
              <p className="mb-0 text-white-75 small" style={{ fontSize: '0.82rem' }}>
                Centralized Student, Parent &amp; Faculty ERP Portal
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="osm-modal-body">
          {/* Status & Activation Tracker Card */}
          <div className="osm-status-card">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
              <div className="d-flex align-items-center gap-2">
                <span className="osm-pulse-dot"></span>
                <span className="fw-bold text-dark small">Portal Under Final Synchronization</span>
              </div>
              <span className="badge bg-warning-subtle text-dark border px-2.5 py-1 rounded-pill small fw-semibold">
                Coming Soon &bull; Session 2026–27
              </span>
            </div>
            <p className="small text-muted mb-2" style={{ lineHeight: '1.55' }}>
              The central OSM database is currently being populated with student admissions, roll numbers, and transport rosters for the upcoming academic session.
            </p>

            {/* Sync Progress Track */}
            <div className="d-flex align-items-center justify-content-between small text-muted mt-2">
              <span className="fw-medium" style={{ fontSize: '11px' }}>System Readiness: Data &amp; Server Staging</span>
              <span className="fw-bold text-success" style={{ fontSize: '11px' }}>85% Ready</span>
            </div>
            <div className="osm-progress-track">
              <div className="osm-progress-bar"></div>
            </div>

            {/* 3 Steps Mini Timeline */}
            <div className="row g-2 mt-2 pt-2 border-top text-center" style={{ fontSize: '11px' }}>
              <div className="col-4">
                <span className="text-success fw-bold d-block">&bull; Phase 1</span>
                <span className="text-muted">Cloud DB Configured</span>
              </div>
              <div className="col-4">
                <span className="text-primary fw-bold d-block">&bull; Phase 2 (Active)</span>
                <span className="text-dark fw-semibold">Student Data Sync</span>
              </div>
              <div className="col-4">
                <span className="text-secondary fw-bold d-block">&bull; Phase 3</span>
                <span className="text-muted">WhatsApp Credentials</span>
              </div>
            </div>
          </div>

          {/* Section: Features Arriving */}
          <div className="mb-2">
            <h6 className="fw-bold text-dark small mb-2 d-flex align-items-center gap-2">
              <span className="material-symbols-outlined text-primary fs-5">stars</span>
              What to Expect in OSM 2.0
            </h6>
          </div>

          <div className="osm-features-grid">
            <div className="osm-feat-card">
              <div className="osm-feat-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
                <span className="material-symbols-outlined fs-5">notifications_active</span>
              </div>
              <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.85rem' }}>Daily Attendance &amp; SMS</h6>
              <p className="text-muted mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                Instant notifications on WhatsApp for morning arrival, bus boarding, and late entries.
              </p>
            </div>

            <div className="osm-feat-card">
              <div className="osm-feat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669' }}>
                <span className="material-symbols-outlined fs-5">assessment</span>
              </div>
              <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.85rem' }}>Digital Gradebook &amp; CCE</h6>
              <p className="text-muted mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                View periodic test scores, teacher remarks, and download formal CBSE report cards.
              </p>
            </div>

            <div className="osm-feat-card">
              <div className="osm-feat-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}>
                <span className="material-symbols-outlined fs-5">receipt_long</span>
              </div>
              <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.85rem' }}>Instant Fee Portal &amp; UPI</h6>
              <p className="text-muted mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                Pay term fees online without transaction fees and download official GST fee receipts.
              </p>
            </div>

            <div className="osm-feat-card">
              <div className="osm-feat-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#7c3aed' }}>
                <span className="material-symbols-outlined fs-5">menu_book</span>
              </div>
              <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.85rem' }}>Homework &amp; Circulars</h6>
              <p className="text-muted mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                Access daily homework assignments, syllabus notes, holiday homework and notice bulletins.
              </p>
            </div>
          </div>

          {/* Credentials Info Callout */}
          <div className="p-2.5 px-3 rounded-3 mb-2.5 d-flex align-items-start gap-2.5" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <span className="material-symbols-outlined text-primary fs-5 mt-0.5">key</span>
            <div>
              <h6 className="fw-bold text-primary mb-1 small" style={{ fontSize: '0.82rem' }}>How will parents receive portal credentials?</h6>
              <p className="small text-muted mb-0" style={{ lineHeight: '1.45', fontSize: '0.78rem' }}>
                No manual signup is required. Encrypted Student IDs and Passwords will be sent directly to registered primary mobile numbers via SMS and WhatsApp before the session orientation.
              </p>
            </div>
          </div>

          {/* Administrative Helpline */}
          <div className="osm-contact-card">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2">
                <span className="material-symbols-outlined text-primary fs-5">support_agent</span>
                <div>
                  <h6 className="fw-bold text-dark mb-0 small">Need Immediate Assistance?</h6>
                  <span className="text-muted" style={{ fontSize: '11px' }}>Front Office Desk is open Mon–Sat (8:00 AM – 2:00 PM)</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <a
                  href="tel:+919431068033"
                  className="btn btn-outline-primary btn-sm px-2.5 py-1 rounded-pill d-flex align-items-center gap-1 text-decoration-none fw-semibold"
                  style={{ fontSize: '11px' }}
                >
                  <span className="material-symbols-outlined fs-6">call</span>
                  +91 94310 68033
                </a>
                <a
                  href="mailto:info@swamishivanandschool.com"
                  className="btn btn-outline-secondary btn-sm px-2.5 py-1 rounded-pill d-flex align-items-center gap-1 text-decoration-none fw-semibold"
                  style={{ fontSize: '11px' }}
                >
                  <span className="material-symbols-outlined fs-6">mail</span>
                  Email Desk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="osm-modal-footer">
          <span className="text-muted small" style={{ fontSize: '11px' }}>
            Swami Shiwanand Academy &bull; Empowering Young Minds
          </span>
          <button
            type="button"
            className="btn btn-primary btn-sm px-4 py-2 rounded-pill fw-semibold d-flex align-items-center gap-1.5 shadow-sm"
            onClick={closePortal}
          >
            <span>Understood, Close</span>
            <span className="material-symbols-outlined fs-6">check</span>
          </button>
        </div>
      </div>
    </div>
  );
}
