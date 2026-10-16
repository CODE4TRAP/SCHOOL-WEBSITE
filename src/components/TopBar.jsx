import React from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';

export default function TopBar() {
  return (
    <div className="m3-top-bar" role="region" aria-label="Top Utility and Contact Navigation">
      <div className="topbar-container">
        {/* Left: Clean, unboxed institutional contact details */}
        <div className="topbar-contact-meta">
          {/* Phone Link */}
          <a
            href={`tel:${schoolInfo.phones[0]}`}
            className="topbar-contact-link"
            title="Helpline Phone"
          >
            <span className="topbar-icon-bubble phone-bubble">
              <span className="material-symbols-outlined">call</span>
            </span>
            <span className="topbar-contact-text">{schoolInfo.phones[0]}</span>
          </a>

          <span className="topbar-dot-sep d-none d-md-inline" aria-hidden="true">&bull;</span>

          {/* Email Link */}
          <a
            href={`mailto:${schoolInfo.email}`}
            className="topbar-contact-link d-none d-md-inline-flex"
            title="Email Administration"
          >
            <span className="topbar-icon-bubble mail-bubble">
              <span className="material-symbols-outlined">mail</span>
            </span>
            <span className="topbar-contact-text">{schoolInfo.email}</span>
          </a>

          <span className="topbar-dot-sep d-none d-lg-inline" aria-hidden="true">&bull;</span>

          {/* Institutional Heritage Prestige Badge */}
          <div
            className="topbar-prestige-tag d-none d-lg-inline-flex"
            title="Recognized Institution Founded in 2009"
          >
            <span className="material-symbols-outlined text-warning" style={{ fontSize: '15px' }}>verified</span>
            <span>Estd. <strong className="text-warning">{schoolInfo.estd}</strong> &bull; Playgroup to Class V</span>
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
            <span className="topbar-live-beacon">
              <span className="topbar-beacon-ring"></span>
              <span className="topbar-beacon-dot"></span>
            </span>
            <span>Admissions 2026–27 Open</span>
            <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>arrow_forward</span>
          </Link>

          {/* Discreet Staff & Admin Portal Link */}
          <Link
            to="/admin/login"
            className="topbar-admin-badge"
            title="Staff & Management Login"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>lock</span>
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
