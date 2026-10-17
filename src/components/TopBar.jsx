import React from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';
import { useModal } from '../context/ModalContext';

export default function TopBar() {
  const { openPortal } = useModal();

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
            <span>Estd. <strong className="text-warning">{schoolInfo.estd}</strong> &bull; Playgroup to Std VI</span>
          </div>
        </div>

        {/* Center: School Office Hours */}
        <div className="topbar-center-meta d-none d-xl-flex">
          <span className="topbar-info-chip" title="School Office Hours">
            <span className="material-symbols-outlined text-warning" style={{ fontSize: '14px' }}>schedule</span>
            <span>8:00 AM – 2:00 PM</span>
          </span>
        </div>

        {/* Right: Actions with distinct hierarchy */}
        <div className="topbar-actions">
          {/* Interactive Parent Portal Button */}
          <button
            type="button"
            onClick={() => openPortal('Parent & Student Portal', '2026-27', 'Access digital report cards, fee receipts, homework and daily attendance.')}
            className="topbar-portal-btn d-none d-sm-inline-flex"
            title="Access Online School Management (OSM) Portal"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>cloud_sync</span>
            <span>Parent Portal</span>
          </button>

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
            <span>Admissions Open</span>
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
