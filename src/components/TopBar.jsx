import React from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';

export default function TopBar() {
  return (
    <div className="m3-top-bar" role="region" aria-label="Top Utility and Contact Navigation">
      <div className="topbar-container">
        {/* Left: Refined institutional meta */}
        <div className="topbar-contact-meta">
          {/* Phone Chip */}
          <a
            href={`tel:${schoolInfo.phones[0]}`}
            className="topbar-meta-chip"
            title="Call Principal & Office Helpline"
          >
            <span className="topbar-chip-icon-box call-bubble">
              <span className="material-symbols-outlined">call</span>
            </span>
            <span className="topbar-chip-text">{schoolInfo.phones[0]}</span>
          </a>

          <span className="topbar-v-divider d-none d-md-inline-block" aria-hidden="true"></span>

          {/* Email Chip */}
          <a
            href={`mailto:${schoolInfo.email}`}
            className="topbar-meta-chip d-none d-md-inline-flex"
            title="Email School Administration"
          >
            <span className="topbar-chip-icon-box mail-bubble">
              <span className="material-symbols-outlined">mail</span>
            </span>
            <span className="topbar-chip-text">{schoolInfo.email}</span>
          </a>

          <span className="topbar-v-divider d-none d-lg-inline-block" aria-hidden="true"></span>

          {/* Institutional Heritage Prestige Badge */}
          <div
            className="topbar-heritage-pill d-none d-lg-inline-flex"
            title="Recognized Institution Founded in 2009"
          >
            <span className="material-symbols-outlined topbar-prestige-star">stars</span>
            <span className="topbar-heritage-label">
              Estd. <strong className="topbar-heritage-year">{schoolInfo.estd}</strong>
            </span>
            <span className="topbar-heritage-dot" aria-hidden="true"></span>
            <span className="topbar-heritage-levels">Playgroup to Class V</span>
          </div>
        </div>

        {/* Right: Focused Action Utility Links */}
        <div className="topbar-actions">
          {/* Admissions Live CTA */}
          <Link
            to="/admission"
            className="topbar-admission-btn"
            title="Enroll for Academic Session 2026-27"
          >
            <span className="topbar-live-beacon">
              <span className="topbar-beacon-ring"></span>
              <span className="topbar-beacon-dot"></span>
            </span>
            <span>Admissions 2026–27 Open</span>
          </Link>

          {/* CBSE Disclosure Pill */}
          <Link
            to="/mandatory-disclosure"
            className="topbar-utility-pill topbar-pill-disclosure d-none d-sm-inline-flex"
            title="Mandatory CBSE Affiliation & Regulatory Disclosures"
          >
            <span className="material-symbols-outlined topbar-pill-icon">gavel</span>
            <span>CBSE Disclosure</span>
          </Link>

          {/* Admin Chip */}
          <Link
            to="/admin/login"
            className="topbar-admin-badge"
            title="Administrator Management Panel"
          >
            <span className="material-symbols-outlined topbar-admin-icon">lock</span>
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
