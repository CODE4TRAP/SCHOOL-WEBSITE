import React from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';

export default function Header() {
  return (
    <header className="m3-main-header">
      <div className="container">
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between py-3 gap-3">
          {/* Logo & School Identity */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="m3-logo-anchor">
              <img
                src="/images/logo.png"
                alt="Swami Shiwanand Academy Logo"
                className="m3-school-logo"
              />
            </Link>
            <div>
              <h1 className="m3-school-title mb-1">
                <Link to="/">
                  {schoolInfo.name}
                </Link>
              </h1>
              <div className="d-flex align-items-center gap-2 flex-wrap">
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

          {/* Quick Header M3 Action Buttons */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Link to="/admission#fee-payment" className="m3-btn m3-btn-tonal">
              <span className="material-symbols-outlined">payments</span>
              <span>Pay Fee</span>
            </Link>
            <Link to="/admission" className="m3-btn m3-btn-filled">
              <span className="material-symbols-outlined">how_to_reg</span>
              <span>Apply Online</span>
            </Link>
            <Link to="/contact" className="m3-btn m3-btn-outlined d-none d-sm-inline-flex">
              <span className="material-symbols-outlined">contact_support</span>
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
