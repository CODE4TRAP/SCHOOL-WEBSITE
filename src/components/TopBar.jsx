import React from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';

export default function TopBar() {
  return (
    <div className="m3-top-bar" role="region" aria-label="Top Utility and Contact Navigation">
      <div className="topbar-container">
        {/* Left: Clean, unboxed institutional contact & heritage details */}
        <div className="topbar-contact-meta">
          {/* Phone Link */}
          <a
            href={`tel:${schoolInfo.phones[0]}`}
            className="topbar-contact-link"
            title="School Helpline Phone"
          >
            <span className="topbar-meta-icon phone-icon">
              <span className="material-symbols-outlined">call</span>
            </span>
            <span className="topbar-contact-text">{schoolInfo.phones[0]}</span>
          </a>

          <span className="topbar-v-sep d-none d-md-inline-block" aria-hidden="true"></span>

          {/* Email Link */}
          <a
            href={`mailto:${schoolInfo.email}`}
            className="topbar-contact-link d-none d-md-inline-flex"
            title="School Administration Email"
          >
            <span className="topbar-meta-icon mail-icon">
              <span className="material-symbols-outlined">mail</span>
            </span>
            <span className="topbar-contact-text">{schoolInfo.email}</span>
          </a>

          <span className="topbar-v-sep d-none d-lg-inline-block" aria-hidden="true"></span>

          {/* Institutional Heritage Prestige Badge */}
          <div
            className="topbar-prestige-tag d-none d-lg-inline-flex"
            title="Recognized Institution Founded in 2009"
          >
            <span className="material-symbols-outlined prestige-icon">verified</span>
            <span>Estd. <strong>{schoolInfo.estd}</strong> &bull; Playgroup to Std VI</span>
          </div>
        </div>

        {/* Right: Actions with distinct hierarchy */}
        <div className="topbar-actions">
          {/* Admissions Live CTA */}
          <Link
            to="/admission"
            className="topbar-admission-btn"
            title="Apply for Academic Session 2026-27"
          >
            <span className="topbar-live-beacon" aria-hidden="true">
              <span className="topbar-beacon-ring"></span>
              <span className="topbar-beacon-dot"></span>
            </span>
            <span className="admission-btn-label">Admissions 2026–27</span>
            <span className="material-symbols-outlined admission-btn-arrow">arrow_forward</span>
          </Link>

          {/* Discreet Staff & Admin Portal Link */}
          <Link
            to="/admin/login"
            className="topbar-admin-badge"
            title="Staff & Management Login"
          >
            <span className="material-symbols-outlined admin-icon">lock</span>
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
