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
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>cloud_sync</span>
              Centralized Cloud ERP &bull; Session 2026–27
            </span>
          </div>

          {/* Logo & Title Header */}
          <div className="d-flex align-items-center gap-3 mt-1">
            <div className="osm-modal-logo-ring">
              <img
                src="/images/logo.png"
                alt="Swami Shiwanand Academy Crest"
                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
              />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h4 className="fw-bold mb-0 text-white fs-5" style={{ letterSpacing: '-0.3px' }}>
                  Online School Management (OSM 2.0)
                </h4>
                <span className="badge bg-warning text-dark fw-bold px-2 py-0.5 rounded-pill" style={{ fontSize: '10px' }}>
                  PORTAL
                </span>
              </div>
              <p className="mb-0 text-white-75 small mt-0.5" style={{ fontSize: '0.82rem' }}>
                Unified Digital Ecosystem for Parents, Students &amp; Faculty
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
                <span className="fw-bold text-dark small">Cloud Staging &amp; Data Migration in Progress</span>
              </div>
              <span className="badge bg-warning-subtle text-dark border px-2.5 py-1 rounded-pill small fw-semibold">
                Beta Staging &bull; 85% Sync
              </span>
            </div>
            <p className="small text-muted mb-2" style={{ lineHeight: '1.55', fontSize: '0.8rem' }}>
              The central OSM database is currently being populated with verified student admissions, class rolls, and GPS transport rosters for the upcoming academic session.
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
            <div className="osm-timeline-step-box">
              <div className="osm-timeline-step-item is-completed">
                <span className="text-success fw-bold d-block" style={{ fontSize: '11px' }}>
                  <i className="fas fa-check-circle me-1"></i>Phase 1
                </span>
                <span className="text-muted" style={{ fontSize: '11px' }}>Cloud Core Active</span>
              </div>
              <div className="osm-timeline-step-item is-active">
                <span className="text-primary fw-bold d-block" style={{ fontSize: '11px' }}>
                  <i className="fas fa-sync-alt fa-spin me-1"></i>Phase 2 (Active)
                </span>
                <span className="text-dark fw-semibold" style={{ fontSize: '11px' }}>Roster Data Sync</span>
              </div>
              <div className="osm-timeline-step-item">
                <span className="text-secondary fw-bold d-block" style={{ fontSize: '11px' }}>
                  <i className="fas fa-lock me-1"></i>Phase 3
                </span>
                <span className="text-muted" style={{ fontSize: '11px' }}>Login Dispatch</span>
              </div>
            </div>
          </div>

          {/* Section: Features Arriving */}
          <div className="osm-section-heading">
            <span className="material-symbols-outlined text-primary fs-5">stars</span>
            <span>Core Capabilities Arriving in OSM 2.0</span>
          </div>

          <div className="osm-features-grid">
            <div className="osm-feat-card feat-attendance">
              <div className="osm-feat-top-bar">
                <div className="osm-feat-icon">
                  <span className="material-symbols-outlined fs-5">notifications_active</span>
                </div>
                <span className="osm-feat-tag">WhatsApp &amp; SMS</span>
              </div>
              <h6 className="osm-feat-title">Daily Attendance &amp; Alerts</h6>
              <p className="osm-feat-desc">
                Instant real-time notifications for morning gate entry, supervised bus boarding, and late arrival logs.
              </p>
            </div>

            <div className="osm-feat-card feat-gradebook">
              <div className="osm-feat-top-bar">
                <div className="osm-feat-icon">
                  <span className="material-symbols-outlined fs-5">assessment</span>
                </div>
                <span className="osm-feat-tag">CBSE CCE Cards</span>
              </div>
              <h6 className="osm-feat-title">Digital Gradebook &amp; CCE</h6>
              <p className="osm-feat-desc">
                Periodic test scores, subject teacher remarks, performance graphs, and downloadable formal report cards.
              </p>
            </div>

            <div className="osm-feat-card feat-fee">
              <div className="osm-feat-top-bar">
                <div className="osm-feat-icon">
                  <span className="material-symbols-outlined fs-5">receipt_long</span>
                </div>
                <span className="osm-feat-tag">Zero Surcharge UPI</span>
              </div>
              <h6 className="osm-feat-title">Instant Fee Portal &amp; UPI</h6>
              <p className="osm-feat-desc">
                Pay term tuition securely via UPI, NetBanking, or cards without convenience charges, with instant GST receipts.
              </p>
            </div>

            <div className="osm-feat-card feat-homework">
              <div className="osm-feat-top-bar">
                <div className="osm-feat-icon">
                  <span className="material-symbols-outlined fs-5">menu_book</span>
                </div>
                <span className="osm-feat-tag">Daily Classroom Feed</span>
              </div>
              <h6 className="osm-feat-title">Homework &amp; Circulars</h6>
              <p className="osm-feat-desc">
                Access daily homework sheets, syllabus coverage, holiday project guides, and administrative notices.
              </p>
            </div>
          </div>

          {/* Credentials Info Callout */}
          <div className="osm-credentials-callout">
            <div className="osm-cred-icon-box">
              <span className="material-symbols-outlined fs-4">verified_user</span>
            </div>
            <div className="flex-grow-1">
              <div className="osm-cred-title-row">
                <h6 className="fw-bold text-primary mb-0" style={{ fontSize: '0.84rem' }}>
                  How Will Parents Access Their Accounts?
                </h6>
                <span className="osm-cred-pill">No Signup Required</span>
              </div>
              <p className="small text-muted mb-0" style={{ lineHeight: '1.5', fontSize: '0.78rem' }}>
                Your child’s encrypted Student ID and secure login passcode will be sent directly to your registered primary mobile number via SMS and WhatsApp before the session orientation.
              </p>
            </div>
          </div>

          {/* Administrative Helpline */}
          <div className="osm-contact-card">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center text-primary" style={{ width: '34px', height: '34px', background: 'rgba(11, 87, 208, 0.1)' }}>
                  <span className="material-symbols-outlined fs-5">support_agent</span>
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-0 small">Need Immediate Portal Assistance?</h6>
                  <span className="text-muted" style={{ fontSize: '11px' }}>Front Office Helpdesk &bull; Mon–Sat (8:00 AM – 2:00 PM)</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <a
                  href="tel:+919431068033"
                  className="btn btn-outline-primary btn-sm px-3 py-1.5 rounded-pill d-flex align-items-center gap-1.5 text-decoration-none fw-semibold"
                  style={{ fontSize: '11px' }}
                >
                  <span className="material-symbols-outlined fs-6">call</span>
                  +91 94310 68033
                </a>
                <a
                  href="mailto:info@swamishivanandschool.com"
                  className="btn btn-outline-secondary btn-sm px-3 py-1.5 rounded-pill d-flex align-items-center gap-1.5 text-decoration-none fw-semibold"
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
            Swami Shiwanand Academy &bull; Empowering Young Minds &bull; Session 2026–27
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
