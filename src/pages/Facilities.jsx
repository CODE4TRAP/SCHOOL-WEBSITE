import React from 'react';
import { Link } from 'react-router-dom';
import { facilitiesList, schoolInfo } from '../data/content';

const FACILITY_ICON_MAP = {
  'smart-classes': { icon: 'smart_screen', color: '#2563eb', bg: '#eff6ff' },
  'play-area': { icon: 'smart_toy', color: '#059669', bg: '#ecfdf5' },
  'science-lab': { icon: 'science', color: '#d97706', bg: '#fffbeb' },
  'computer-lab': { icon: 'terminal', color: '#7c3aed', bg: '#f5f3ff' },
  'transport': { icon: 'directions_bus', color: '#0284c7', bg: '#f0f9ff' },
  'safety': { icon: 'videocam', color: '#dc2626', bg: '#fef2f2' },
};

export default function Facilities() {
  return (
    <div>
      {/* M3 Page Header in Separate Structured Boxes */}
      <div className="m3-page-header">
        <div className="container">
          <div className="m3-header-container">
            <div className="m3-header-badges-box">
              <span className="m3-badge m3-badge-tonal">
                <span className="material-symbols-outlined fs-6">apartment</span> Campus Life
              </span>
              <span className="m3-badge m3-badge-amber">
                <span className="material-symbols-outlined fs-6">verified</span> Modern Infrastructure
              </span>
            </div>
            <div className="m3-header-title-box">
              <h2 className="m3-page-header-title mb-0">Campus Facilities &amp; Infrastructure</h2>
            </div>
            <div className="m3-header-breadcrumb-box">
              <nav aria-label="breadcrumb">
                <ol className="m3-breadcrumb">
                  <li>
                    <Link to="/">
                      <span className="material-symbols-outlined fs-6 me-1">home</span>Home
                    </Link>
                    <span>/</span>
                  </li>
                  <li className="active">Facilities</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* World-Class Infrastructure Header Box */}
        <div className="section-header-box mb-5">
          <div className="d-flex align-items-center gap-3">
            <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
              <span className="material-symbols-outlined">apartment</span>
            </div>
            <div>
              <h3 className="header-title">World-Class Infrastructure For Early Learners</h3>
              <p className="header-subtitle">
                Meticulously designed environments to ignite curiosity, inspire creativity, and maintain the highest safety and hygiene standards.
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="row g-4 mb-5">
          {facilitiesList.map((facility, idx) => {
            const meta = FACILITY_ICON_MAP[facility.id] || { icon: 'verified', color: '#0b57d0', bg: '#eff6ff' };
            return (
              <div key={facility.id} className="col-md-6 col-lg-4" id={facility.id}>
                <div className="facility-feature-card">
                  <div className="facility-img-wrap">
                    <img
                      src={facility.img}
                      className="facility-img"
                      alt={facility.title}
                    />
                    <div
                      className="facility-floating-badge"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: meta.color,
                        border: `1px solid ${meta.color}40`,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <span className="material-symbols-outlined fs-6" style={{ fontSize: '15px' }}>{meta.icon}</span>
                      <span>Facility {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                    </div>
                  </div>
                  <div className="facility-card-body">
                    <div>
                      <h5 className="facility-title d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined" style={{ color: meta.color, fontSize: '22px' }}>{meta.icon}</span>
                        <span>{facility.title}</span>
                      </h5>
                      <p className="facility-desc">
                        {facility.desc}
                      </p>
                    </div>
                    <div className="facility-footer">
                      <span className="facility-safe-chip">
                        <span className="material-symbols-outlined fs-6" style={{ fontSize: '15px', color: '#059669' }}>shield</span>
                        Child Safe Certified
                      </span>
                      <span className="small text-muted fw-bold">Active Campus</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra Campus Highlights: Clean Water, Health, Fire Safety */}
        <div className="section-header-box mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="header-icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
              <span className="material-symbols-outlined">verified</span>
            </div>
            <div>
              <h3 className="header-title">Special Campus Highlights &amp; Care</h3>
              <p className="header-subtitle">
                Certified health amenities, pure hydration, and stringent emergency safeguards for parent peace of mind.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Distinct Elevated Cards for Campus Highlights */}
        <div className="row g-4 mb-5">
          <div className="col-md-4 col-12">
            <div className="campus-highlight-card" style={{ borderTopColor: '#0b57d0' }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined fs-3">water_drop</span>
                </div>
                <div>
                  <span className="m3-badge m3-badge-tonal">Daily Tested</span>
                  <h5 className="fw-bold text-dark mt-1 mb-0" style={{ fontSize: '1.05rem' }}>Purified RO Drinking Water</h5>
                </div>
              </div>
              <p className="small text-muted mb-0" style={{ lineHeight: '1.7', flexGrow: 1 }}>
                Multi-stage commercial RO filtration systems with chilled dispensers and regular microbiological water quality testing for student safety.
              </p>
            </div>
          </div>

          <div className="col-md-4 col-12">
            <div className="campus-highlight-card" style={{ borderTopColor: '#ef4444' }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined fs-3">medical_services</span>
                </div>
                <div>
                  <span className="m3-badge" style={{ background: '#fee2e2', color: '#b91c1c' }}>Doctor On-Call</span>
                  <h5 className="fw-bold text-dark mt-1 mb-0" style={{ fontSize: '1.05rem' }}>First-Aid &amp; Health Infirmary</h5>
                </div>
              </div>
              <p className="small text-muted mb-0" style={{ lineHeight: '1.7', flexGrow: 1 }}>
                Well-stocked first-aid dispensary with rest beds, pediatric first responders, and emergency tie-ups with Sasaram hospitals.
              </p>
            </div>
          </div>

          <div className="col-md-4 col-12">
            <div className="campus-highlight-card" style={{ borderTopColor: '#f59e0b' }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined fs-3">local_fire_department</span>
                </div>
                <div>
                  <span className="m3-badge m3-badge-amber">Safety Certified</span>
                  <h5 className="fw-bold text-dark mt-1 mb-0" style={{ fontSize: '1.05rem' }}>Fire &amp; Electrical Safety</h5>
                </div>
              </div>
              <p className="small text-muted mb-0" style={{ lineHeight: '1.7', flexGrow: 1 }}>
                Certified fire extinguishers, child-proof electric sockets, wide emergency evacuation exits, and regular drills for faculty and students.
              </p>
            </div>
          </div>
        </div>

        {/* Schedule a Visit CTA */}
        <div className="text-center p-5 rounded-3 text-white" style={{ background: 'linear-gradient(135deg, #073361, #0c58a2)', boxShadow: '0 8px 30px rgba(7, 51, 97, 0.25)' }}>
          <h3 className="fw-bold mb-2">Experience Our Cheerful Campus In Person!</h3>
          <p className="small mb-4 text-light" style={{ opacity: 0.9 }}>
            We invite parents to take a guided walk around our interactive play stations and smart classrooms.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/contact" className="btn btn-warning fw-bold px-4 py-2">
              <i className="fas fa-calendar-check me-1"></i> Book a Campus Tour
            </Link>
            <Link to="/admission" className="btn btn-outline-light fw-bold px-4 py-2">
              <i className="fas fa-paper-plane me-1"></i> Apply For Admission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
