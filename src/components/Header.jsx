import React from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';

export default function Header() {
  return (
    <header className="m3-main-header">
      <div className="container">
        <div className="m3-header-content-row">
          {/* Logo & School Identity */}
          <div className="m3-header-identity">
            <Link to="/" className="m3-logo-anchor" title={schoolInfo.name}>
              <img
                src="/images/logo.png"
                alt="Swami Shiwanand Academy Logo"
                className="m3-school-logo"
              />
            </Link>
            <div className="m3-header-titles">
              <h1 className="m3-school-title mb-1">
                <Link to="/">
                  {schoolInfo.name}
                </Link>
              </h1>
              <div className="m3-header-meta">
                <span className="school-tagline-text">
                  {schoolInfo.tagline}
                </span>
                <span className="school-affiliation-badge">
                  <span className="material-symbols-outlined text-primary fs-6">verified</span>
                  CBSE Pattern Curriculum (Reg. SSAP/2026)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
