import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(228000);
  const [showSitemap, setShowSitemap] = useState(false);

  useEffect(() => {
    const target = 229653;
    const interval = setInterval(() => {
      setVisitorCount((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + 35;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="site-footer">
      <div className="container pb-5 mb-2 pt-2">
        <div className="row g-4">
          {/* Col 1: School Contact & About */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/images/logo.png"
                alt="Logo"
                style={{ width: '52px', height: '52px', background: '#fff', borderRadius: '8px', padding: '2px' }}
              />
              <h4 className="footer-column-title mb-0" style={{ border: 'none', padding: 0 }}>
                Swami Shiwanand
              </h4>
            </div>
            <p className="small text-light" style={{ opacity: 0.85, lineHeight: '1.7', marginBottom: '16px' }}>
              <strong>{schoolInfo.name}</strong><br />
              Campus: {schoolInfo.address}<br />
              Managed by: {schoolInfo.trust}.
            </p>
            <p className="small text-light mb-3" style={{ lineHeight: '1.8' }}>
              <i className="fas fa-phone-alt text-warning me-2"></i> {schoolInfo.phones.join(', ')}<br />
              <i className="fas fa-envelope text-warning me-2"></i> {schoolInfo.email}<br />
              <i className="fas fa-clock text-warning me-2"></i> {schoolInfo.visitingHours}
            </p>

            <span className="small fw-bold text-light d-block mb-2">Connect With Us:</span>
            <div className="footer-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-btn" title="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href={`https://wa.me/${schoolInfo.whatsappNumber}?text=Hello%20Swami%20Shiwanand%20Academy,%20I%20want%20to%20inquire%20about%20admission`}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about">
                  <i className="fas fa-chevron-right text-warning small"></i> About Our School
                </Link>
              </li>
              <li>
                <Link to="/about#principal-message">
                  <i className="fas fa-chevron-right text-warning small"></i> Principal's Message
                </Link>
              </li>
              <li>
                <Link to="/mandatory-disclosure">
                  <i className="fas fa-chevron-right text-warning small"></i> Mandatory Public Disclosure
                </Link>
              </li>
              <li>
                <Link to="/admission">
                  <i className="fas fa-chevron-right text-warning small"></i> Online Admission 2026-27
                </Link>
              </li>
              <li>
                <Link to="/admission#fee-structure">
                  <i className="fas fa-chevron-right text-warning small"></i> Fee Structure
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <i className="fas fa-chevron-right text-warning small"></i> Contact &amp; Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Corner & Facilities */}
          <div className="col-lg-2 col-md-6">
            <h4 className="footer-column-title">Student Zone</h4>
            <ul className="footer-links">
              <li>
                <Link to="/facilities#smart-classes">
                  <i className="fas fa-chevron-right text-warning small"></i> Smart Classes
                </Link>
              </li>
              <li>
                <Link to="/facilities#play-area">
                  <i className="fas fa-chevron-right text-warning small"></i> Play &amp; Toys Zone
                </Link>
              </li>
              <li>
                <Link to="/facilities#transport">
                  <i className="fas fa-chevron-right text-warning small"></i> Transport System
                </Link>
              </li>
              <li>
                <Link to="/student-corner#uniform">
                  <i className="fas fa-chevron-right text-warning small"></i> School Uniform
                </Link>
              </li>
              <li>
                <Link to="/student-corner#timings">
                  <i className="fas fa-chevron-right text-warning small"></i> School Timing
                </Link>
              </li>
              <li>
                <Link to="/student-corner#vacations">
                  <i className="fas fa-chevron-right text-warning small"></i> Holidays 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Map Info */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-column-title">Campus Location</h4>
            <div className="bg-white p-3 rounded-3 shadow-sm mb-3">
              <div
                style={{
                  background: '#f1f5f9',
                  borderRadius: '6px',
                  height: '110px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  textAlign: 'center'
                }}
              >
                <i className="fas fa-map-marked-alt fa-2x text-primary mb-2"></i>
                <span className="small fw-bold text-dark">Swami Shiwanand Academy</span>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>Sasaram, Rohtas (Bihar)</span>
              </div>
            </div>
            <Link to="/contact" className="btn btn-warning w-100 fw-bold btn-sm py-2 text-dark">
              <i className="fas fa-directions me-1"></i> Get Directions &amp; Inquiry
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable Sitemap Button */}
      <div className="footer-sitemap-toggle-bar" style={{ background: '#041d38', padding: '14px 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: '24px' }}>
        <div className="container">
          <button
            onClick={() => setShowSitemap(!showSitemap)}
            className="text-white small"
            style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <i className={`fas fa-${showSitemap ? 'minus' : 'plus'} text-warning`}></i>
            {showSitemap ? 'Hide Quick Directory Sitemap' : 'View Full Directory Sitemap'}
          </button>
        </div>
      </div>

      {/* Sitemap Content */}
      {showSitemap && (
        <div className="footer-sitemap-content">
          <div className="container">
            <div className="row g-3">
              <div className="col-md-3">
                <h6 className="text-warning fw-bold mb-2">About Us</h6>
                <p className="mb-1">
                  <Link to="/about">About School</Link> | <Link to="/about#principal-message">Principal Message</Link> | <Link to="/about#aims">Aims &amp; Objectives</Link>
                </p>
              </div>
              <div className="col-md-3">
                <h6 className="text-warning fw-bold mb-2">Admission &amp; Academics</h6>
                <p className="mb-1">
                  <Link to="/admission">Online Admission</Link> | <Link to="/admission#form">Admission Form</Link> | <Link to="/admission#fee-structure">Fee Structure</Link>
                </p>
              </div>
              <div className="col-md-3">
                <h6 className="text-warning fw-bold mb-2">Facilities &amp; Campus</h6>
                <p className="mb-1">
                  <Link to="/facilities#smart-classes">Smart Classes</Link> | <Link to="/facilities#play-area">Play Station</Link> | <Link to="/facilities#transport">Transport</Link>
                </p>
              </div>
              <div className="col-md-3">
                <h6 className="text-warning fw-bold mb-2">Disclosures &amp; Contacts</h6>
                <p className="mb-1">
                  <Link to="/mandatory-disclosure">Mandatory Disclosure</Link> | <Link to="/gallery">Photo Gallery</Link> | <Link to="/contact">Contact Us</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copyright and Total Visitor Counter Bar */}
      <div className="footer-copyright-bar">
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <div>
            &copy; 2026 <strong>{schoolInfo.name}</strong>. All rights reserved.
          </div>
          <div className="mt-2 mt-md-0 d-flex align-items-center gap-2">
            <span>Total Visitors:</span>
            <strong className="visitor-badge">{visitorCount.toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
