import React from 'react';
import { useModal } from '../context/ModalContext';

export default function PortalModal() {
  const { portalModal, closePortal } = useModal();

  if (!portalModal.isOpen) return null;

  return (
    <div className="modal-backdrop-custom" onClick={closePortal}>
      <div className="osm-hub-dialog osm-coming-soon-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Top Executive Header */}
        <div className="osm-hub-header">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
            <div className="osm-hub-system-badge">
              <span className="osm-hub-dot-amber"></span>
              <span>PRE-LAUNCH STAGING &bull; SESSION 2026–27</span>
            </div>
            <span className="osm-hub-coming-soon-pill">
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>lock_clock</span>
              COMING SOON
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
              <h4 className="osm-hub-title mb-0">Online School Management (OSM 2.0)</h4>
              <p className="osm-hub-sub mb-0">
                Official Unified Digital Portal for Parents, Students &amp; Faculty
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="osm-hub-body">
          {/* Access Restricted Notification Card */}
          <div className="osm-staging-alert-card mb-3">
            <div className="d-flex align-items-start gap-3">
              <div className="osm-staging-lock-icon">
                <span className="material-symbols-outlined fs-4">lock</span>
              </div>
              <div>
                <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                  <h6 className="fw-bold text-dark mb-0">Portal Access Restricted &bull; Pre-Launch Staging</h6>
                  <span className="badge bg-warning text-dark border px-2 py-0.5 rounded-pill small fw-bold">
                    LAUNCHING 2026–27
                  </span>
                </div>
                <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                  The Online School Management (OSM 2.0) cloud gateway is currently restricted during system rollout, bus route GPS integration, and CBSE roster synchronization. Public login is not accessible at this stage.
                </p>
              </div>
            </div>
          </div>

          {/* System Readiness & Deployment Tracker */}
          <div className="osm-staging-progress-card mb-3">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
              <div className="d-flex align-items-center gap-2">
                <span className="material-symbols-outlined text-primary fs-5">cloud_sync</span>
                <span className="fw-bold text-dark small">Cloud Staging &amp; Data Migration Progress</span>
              </div>
              <span className="osm-staging-percent-badge">85% Completed</span>
            </div>

            {/* Shimmering Striped Progress Track */}
            <div className="osm-progress-track">
              <div className="osm-progress-bar-active" style={{ width: '85%' }}></div>
            </div>

            {/* 3-Phase Rollout Roadmap */}
            <div className="osm-staging-timeline mt-3">
              <div className="osm-timeline-step is-complete">
                <div className="step-marker">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div className="step-content">
                  <strong className="step-phase">Phase 1: Core Setup</strong>
                  <span className="step-desc">Cloud Infrastructure &amp; Security Audits Passed</span>
                </div>
              </div>

              <div className="osm-timeline-step is-active">
                <div className="step-marker">
                  <span className="material-symbols-outlined spin-icon">sync</span>
                </div>
                <div className="step-content">
                  <strong className="step-phase text-primary">Phase 2: Active Staging</strong>
                  <span className="step-desc">Student Roster, Rolls &amp; Bus Fleet GPS Sync</span>
                </div>
              </div>

              <div className="osm-timeline-step is-upcoming">
                <div className="step-marker">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div className="step-content">
                  <strong className="step-phase">Phase 3: Rollout</strong>
                  <span className="step-desc">Parent SMS &amp; WhatsApp Credentials Dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Capabilities Arriving in OSM 2.0 */}
          <div className="mb-3">
            <div className="d-flex align-items-center gap-2 mb-2.5">
              <span className="material-symbols-outlined text-primary fs-5">stars</span>
              <h6 className="fw-bold text-dark mb-0 small">Core Modules Arriving in OSM 2.0</h6>
            </div>

            <div className="row g-2">
              <div className="col-12 col-md-6">
                <div className="osm-capability-card">
                  <div className="cap-icon-box text-primary">
                    <span className="material-symbols-outlined fs-5">fact_check</span>
                  </div>
                  <div>
                    <strong className="cap-title">Live Gate &amp; Bus Attendance</strong>
                    <p className="cap-desc">
                      Real-time SMS alerts for morning campus entry and supervised GPS bus route boarding.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="osm-capability-card">
                  <div className="cap-icon-box text-success">
                    <span className="material-symbols-outlined fs-5">assessment</span>
                  </div>
                  <div>
                    <strong className="cap-title">Digital CCE Report Cards</strong>
                    <p className="cap-desc">
                      Term evaluation grades, teacher remarks, and certified downloadable CBSE marksheets.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="osm-capability-card">
                  <div className="cap-icon-box text-amber">
                    <span className="material-symbols-outlined fs-5">receipt_long</span>
                  </div>
                  <div>
                    <strong className="cap-title">Instant Fee Payment Gateway</strong>
                    <p className="cap-desc">
                      Pay tuition fees safely via UPI, RuPay cards, or NetBanking with zero convenience charges and instant GST receipts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="osm-capability-card">
                  <div className="cap-icon-box text-purple">
                    <span className="material-symbols-outlined fs-5">menu_book</span>
                  </div>
                  <div>
                    <strong className="cap-title">Daily Homework &amp; Circulars</strong>
                    <p className="cap-desc">
                      Access digital classroom diaries, holiday projects, and urgent administrative announcements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Credentials Dispatch Advisory */}
          <div className="osm-credentials-advisory mb-3">
            <div className="d-flex align-items-center gap-3">
              <div className="osm-advisory-icon">
                <span className="material-symbols-outlined fs-4">mark_chat_read</span>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mb-1">
                  <strong className="text-dark small">How Will Parents Access Accounts?</strong>
                  <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill small">
                    No Manual Signup Required
                  </span>
                </div>
                <p className="text-muted small mb-0" style={{ lineHeight: '1.45' }}>
                  Enrolled students and parents will receive their encrypted Student Admission ID and secure 6-digit access PIN directly via SMS and WhatsApp on their registered mobile numbers prior to session orientation.
                </p>
              </div>
            </div>
          </div>

          {/* Administrative Helpline & Accounts Counter Strip */}
          <div className="osm-counter-helpline">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="osm-help-icon">
                  <span className="material-symbols-outlined fs-5">headset_mic</span>
                </div>
                <div>
                  <strong className="d-block text-dark small">Accounts &amp; Admission Helpdesk</strong>
                  <span className="text-muted small" style={{ fontSize: '11px' }}>
                    Admin Block Counter: Mon–Sat (09:00 AM – 01:30 PM) for cash/UPI receipts and admission inquiry.
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 flex-wrap">
                <a
                  href="tel:+919431068033"
                  className="btn btn-outline-primary btn-sm rounded-pill fw-bold d-inline-flex align-items-center gap-1.5 px-3 py-1.5"
                  style={{ fontSize: '12px' }}
                >
                  <span className="material-symbols-outlined fs-6">call</span>
                  <span>+91 94310 68033</span>
                </a>
                <a
                  href="https://wa.me/919431068033?text=Hello%20Swami%20Shiwanand%20Academy,%20I%20have%20an%20inquiry%20regarding%20school%20admissions%20and%20fees."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-sm rounded-pill fw-bold d-inline-flex align-items-center gap-1.5 px-3 py-1.5 text-white"
                  style={{ fontSize: '12px' }}
                >
                  <span className="material-symbols-outlined fs-6">chat</span>
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Institutional Footer Strip */}
        <div className="osm-hub-footer">
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined text-success" style={{ fontSize: '16px' }}>verified_user</span>
            <span className="osm-hub-footer-txt">
              Swami Shiwanand Academy Central Cloud
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="osm-close-action-btn"
              onClick={closePortal}
              title="Close overview"
            >
              <span>Understood, Close</span>
              <span className="material-symbols-outlined fs-6">check_circle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
