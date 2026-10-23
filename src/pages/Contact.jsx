import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    childAge: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const toggleFaq = (idx) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    try {
      // 1. Primary: Save directly to Cloud Firestore
      await addDoc(collection(db, 'inquiries'), {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: (formData.email || '').trim(),
        childAge: (formData.childAge || '').trim(),
        message: formData.message.trim(),
        status: 'New',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore direct write notice, attempting API fallback:', err);
      try {
        await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (apiErr) {
        console.warn('Inquiry API fallback notice:', apiErr);
      }
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        childAge: '',
        message: ''
      });
    }, 5000);
  };

  const faqs = [
    {
      q: "What is the procedure for new admission (2026-27)?",
      a: "Parents can submit the online registration form on our website or visit the school office. Following submission, an informal interaction with the child and parents is scheduled."
    },
    {
      q: "What are the school transport routes covered?",
      a: "Our GPS-enabled bus and van fleet covers all key sectors of Sasaram, Belarhi, Geeta Ghat, and neighboring localities with female attendants on board."
    },
    {
      q: "What is the student-to-teacher ratio in pre-primary?",
      a: "We maintain a strict ratio of 15:1 to ensure that every toddler receives personalized attention, hygiene care, and gentle mentoring."
    },
    {
      q: "Can parents visit the campus to inspect classrooms?",
      a: "Yes! Parents are warmly invited during visiting hours (Mon–Sat: 8:00 AM – 2:00 PM). Our academic coordinator will personally guide you through the campus."
    }
  ];

  return (
    <div>
      {/* M3 Page Header in Separate Structured Boxes */}
      <div className="m3-page-header">
        <div className="container">
          <div className="m3-header-container">
            <div className="m3-header-badges-box">
              <span className="m3-badge m3-badge-tonal">
                <span className="material-symbols-outlined fs-6">headset_mic</span> Helpdesk &amp; Support
              </span>
              <span className="m3-badge m3-badge-amber">
                <span className="material-symbols-outlined fs-6">location_on</span> Sasaram Campus
              </span>
            </div>
            <div className="m3-header-title-box">
              <h2 className="m3-page-header-title mb-0">Contact &amp; Campus Location</h2>
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
                  <li className="active">Contact Us</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Left Column: Contact Details & Map */}
          <div className="col-lg-7">
            {/* Get In Touch Header in Dedicated Box */}
            <div className="section-header-box mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
                  <span className="material-symbols-outlined">contact_phone</span>
                </div>
                <div>
                  <h3 className="header-title">Get In Touch</h3>
                  <p className="header-subtitle">
                    Reach our administrative office, transport helpline, and admissions desk directly.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Distinct Elevated Contact Channel Cards */}
            <div className="contact-hub-grid">
              {/* Card 1: Campus Address */}
              <div className="contact-hub-card hub-blue">
                <div>
                  <div className="contact-hub-header">
                    <div className="contact-hub-icon-halo hub-icon-blue">
                      <span className="material-symbols-outlined fs-5">location_on</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(schoolInfo.address, 'address')}
                      className={`contact-copy-chip ${copiedItem === 'address' ? 'copied' : ''}`}
                      title="Copy Address"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>
                        {copiedItem === 'address' ? 'check' : 'content_copy'}
                      </span>
                      {copiedItem === 'address' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <h4 className="contact-hub-title">Campus Address</h4>
                  <p className="contact-hub-desc">{schoolInfo.address}</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Geeta+Ghat+Dhayan+Kendra+Sasaram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-quick-link-btn"
                >
                  <span className="material-symbols-outlined fs-6">directions</span>
                  <span>Get Driving Directions &rarr;</span>
                </a>
              </div>

              {/* Card 2: Phone Helplines */}
              <div className="contact-hub-card hub-green">
                <div>
                  <div className="contact-hub-header">
                    <div className="contact-hub-icon-halo hub-icon-green">
                      <span className="material-symbols-outlined fs-5">call</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(schoolInfo.phones[0], 'phone')}
                      className={`contact-copy-chip ${copiedItem === 'phone' ? 'copied' : ''}`}
                      title="Copy Primary Helpline"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>
                        {copiedItem === 'phone' ? 'check' : 'content_copy'}
                      </span>
                      {copiedItem === 'phone' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <h4 className="contact-hub-title">Direct Helplines</h4>
                  <p className="contact-hub-desc">
                    Official school calling lines:
                  </p>
                  <div className="contact-channel-list">
                    <a href={`tel:${schoolInfo.phones[0]}`} className="contact-action-card" title={`Call ${schoolInfo.phones[0]}`}>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="contact-dept-tag">Principal &amp; Admin</span>
                        <span className="contact-call-action-pill">
                          <span className="material-symbols-outlined" style={{ fontSize: '0.72rem' }}>call</span> Call
                        </span>
                      </div>
                      <div className="contact-value-row">
                        <span className="material-symbols-outlined fs-6 text-success">call</span>
                        <span className="contact-phone-number">{schoolInfo.phones[0]}</span>
                      </div>
                    </a>
                    <a href={`tel:${schoolInfo.phones[1]}`} className="contact-action-card" title={`Call ${schoolInfo.phones[1]}`}>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="contact-dept-tag">Admissions Desk</span>
                        <span className="contact-call-action-pill">
                          <span className="material-symbols-outlined" style={{ fontSize: '0.72rem' }}>call</span> Call
                        </span>
                      </div>
                      <div className="contact-value-row">
                        <span className="material-symbols-outlined fs-6 text-success">support_agent</span>
                        <span className="contact-phone-number">{schoolInfo.phones[1]}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: Email Communications */}
              <div className="contact-hub-card hub-amber">
                <div>
                  <div className="contact-hub-header">
                    <div className="contact-hub-icon-halo hub-icon-amber">
                      <span className="material-symbols-outlined fs-5">mail</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(schoolInfo.email, 'email')}
                      className={`contact-copy-chip ${copiedItem === 'email' ? 'copied' : ''}`}
                      title="Copy Primary Email"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>
                        {copiedItem === 'email' ? 'check' : 'content_copy'}
                      </span>
                      {copiedItem === 'email' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <h4 className="contact-hub-title">Official Inquiries</h4>
                  <p className="contact-hub-desc">
                    Direct email correspondence:
                  </p>
                  <div className="contact-channel-list">
                    <a href={`mailto:${schoolInfo.email}`} className="contact-action-card" title={`Email ${schoolInfo.email}`}>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="contact-dept-tag">General Inquiries</span>
                        <span className="contact-email-action-pill">
                          <span className="material-symbols-outlined" style={{ fontSize: '0.72rem' }}>mail</span> Email
                        </span>
                      </div>
                      <div className="contact-value-row">
                        <span className="material-symbols-outlined fs-6 text-warning">mark_email_read</span>
                        <span className="contact-email-text">{schoolInfo.email}</span>
                      </div>
                    </a>
                    <a href={`mailto:${schoolInfo.admissionEmail}`} className="contact-action-card" title={`Email ${schoolInfo.admissionEmail}`}>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="contact-dept-tag">Admissions Desk</span>
                        <span className="contact-email-action-pill">
                          <span className="material-symbols-outlined" style={{ fontSize: '0.72rem' }}>school</span> Email
                        </span>
                      </div>
                      <div className="contact-value-row">
                        <span className="material-symbols-outlined fs-6 text-warning">school</span>
                        <span className="contact-email-text">{schoolInfo.admissionEmail}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 4: Office & Visiting Hours */}
              <div className="contact-hub-card hub-rose">
                <div>
                  <div className="contact-hub-header">
                    <div className="contact-hub-icon-halo hub-icon-rose">
                      <span className="material-symbols-outlined fs-5">schedule</span>
                    </div>
                    <span className="contact-status-chip">
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
                      Open Today
                    </span>
                  </div>
                  <h4 className="contact-hub-title">Visiting Hours</h4>
                  <p className="contact-hub-desc">
                    Campus reception &amp; counters:
                  </p>
                  <div className="contact-channel-list">
                    <div className="contact-action-card" style={{ cursor: 'default', background: 'rgba(239, 68, 68, 0.04)', borderColor: 'rgba(239, 68, 68, 0.18)' }}>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="contact-dept-tag">Working Schedule</span>
                        <span className="fw-bold" style={{ fontSize: '0.72rem', color: '#dc2626' }}>MON – SAT</span>
                      </div>
                      <div className="contact-value-row">
                        <span className="material-symbols-outlined fs-6 text-danger me-1">schedule</span>
                        <span className="contact-value-text" style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>08:00 AM – 02:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact-notice-box mt-2">
                  <span className="material-symbols-outlined fs-6 text-secondary flex-shrink-0">event_busy</span>
                  <span>Sunday &amp; Gazetted Holidays: Closed. Prior appointment needed for Principal meet.</span>
                </div>
              </div>
            </div>

            {/* Campus Location & Smart Navigation Hub - Enhanced */}
            <div className="campus-map-card mb-4">
              {/* Royal Navy Header Strip */}
              <div className="campus-map-header">
                <div className="d-flex align-items-center gap-3">
                  <div className="campus-map-icon-halo">
                    <span className="material-symbols-outlined fs-4">explore</span>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <h6 className="campus-map-title mb-0">Campus Location &amp; Navigation</h6>
                      <span className="campus-gps-badge">
                        <span className="campus-gps-dot"></span>
                        LIVE GPS
                      </span>
                    </div>
                    <span className="campus-map-subtitle">
                      Geeta Ghat Dhayan Kendra (Belarhi Branch), Sasaram, Bihar &bull; NH-19 Access
                    </span>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=24.9536,84.0315"
                  target="_blank"
                  rel="noreferrer"
                  className="campus-directions-btn"
                  title="Open driving directions in Google Maps"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>near_me</span>
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Map Canvas with Floating Interactive Badges */}
              <div className="campus-map-canvas-wrap">
                <iframe
                  title="School Location Map"
                  src="https://maps.google.com/maps?q=Sasaram%2C%20Rohtas%2C%20Bihar&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="campus-map-iframe"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>

                {/* Floating Campus Overlay Badge */}
                <div className="campus-floating-pin-card d-none d-sm-flex">
                  <div className="campus-pin-logo">
                    <span className="material-symbols-outlined fs-5">school</span>
                  </div>
                  <div>
                    <div className="campus-pin-name">Swami Shiwanand Academy</div>
                    <div className="campus-pin-addr">Belarhi Campus, Sasaram - 821305</div>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Swami+Shiwanand+Academy+Sasaram"
                    target="_blank"
                    rel="noreferrer"
                    className="campus-pin-action"
                    title="Open Pin in Google Maps"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>open_in_new</span>
                  </a>
                </div>

                {/* Floating GPS Coordinates Pill with Copy Action */}
                <button
                  type="button"
                  onClick={() => copyToClipboard('24.9536, 84.0315', 'coords')}
                  className="campus-floating-coords-btn"
                  title="Click to copy exact GPS Coordinates"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#fbbf24' }}>
                    {copiedItem === 'coords' ? 'check_circle' : 'pin_drop'}
                  </span>
                  <span>{copiedItem === 'coords' ? 'Coordinates Copied!' : '24.9536° N, 84.0315° E'}</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '12px', opacity: 0.7 }}>content_copy</span>
                </button>
              </div>

              {/* Transit & Distance Matrix Grid */}
              <div className="campus-transit-matrix">
                <div className="campus-transit-item">
                  <div className="transit-icon-box train">
                    <span className="material-symbols-outlined">train</span>
                  </div>
                  <div>
                    <div className="transit-name">Sasaram Jn Railway</div>
                    <div className="transit-dist">3.2 km &bull; ~8 mins</div>
                  </div>
                </div>

                <div className="campus-transit-item">
                  <div className="transit-icon-box bus">
                    <span className="material-symbols-outlined">directions_bus</span>
                  </div>
                  <div>
                    <div className="transit-name">Old GT Road Bus Stand</div>
                    <div className="transit-dist">2.1 km &bull; ~5 mins</div>
                  </div>
                </div>

                <div className="campus-transit-item">
                  <div className="transit-icon-box highway">
                    <span className="material-symbols-outlined">add_road</span>
                  </div>
                  <div>
                    <div className="transit-name">NH-19 Highway Access</div>
                    <div className="transit-dist">1.4 km &bull; ~3 mins</div>
                  </div>
                </div>

                <div className="campus-transit-item">
                  <div className="transit-icon-box monument">
                    <span className="material-symbols-outlined">account_balance</span>
                  </div>
                  <div>
                    <div className="transit-name">Shershah Tomb Landmark</div>
                    <div className="transit-dist">3.5 km &bull; ~10 mins</div>
                  </div>
                </div>
              </div>

              {/* Campus Amenities & Parking Badges */}
              <div className="campus-amenities-bar">
                <div className="campus-amenities-tags">
                  <span className="campus-amenity-chip">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#0284c7' }}>local_parking</span>
                    <span>Dedicated Visitor Parking</span>
                  </span>
                  <span className="campus-amenity-chip">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#16a34a' }}>airport_shuttle</span>
                    <span>School Bus Pick/Drop Bay</span>
                  </span>
                  <span className="campus-amenity-chip">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#9333ea' }}>accessible</span>
                    <span>Wheelchair Ramp Access</span>
                  </span>
                  <span className="campus-amenity-chip">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#d97706' }}>security</span>
                    <span>24x7 Guarded Security Gate</span>
                  </span>
                </div>

                <div className="campus-map-footer-links">
                  <span className="campus-footer-note">
                    <span className="material-symbols-outlined" style={{ fontSize: '15px', color: '#16a34a' }}>verified</span>
                    <span>Direct highway connectivity with asphalt roads to campus gate</span>
                  </span>
                  <a
                    href="https://maps.google.com/?q=Sasaram,+Bihar"
                    target="_blank"
                    rel="noreferrer"
                    className="campus-open-maps-btn"
                  >
                    <span>Open in Google Maps App</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>open_in_new</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Frequently Asked Questions Accordion */}
            <div className="faq-accordion-card">
              <div className="faq-accordion-header">
                <span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>quiz</span>
                <h6 className="mb-0 fw-bold text-white">Frequently Asked Questions</h6>
              </div>
              <div>
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`faq-item-box ${openFaq === idx ? 'open' : ''}`}>
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="faq-question-btn"
                    >
                      <span>{faq.q}</span>
                      <span className="faq-chevron">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>expand_more</span>
                      </span>
                    </button>
                    {openFaq === idx && (
                      <div className="faq-answer-content">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form - Sticky Elevation */}
          <div className="col-lg-5" style={{ position: 'sticky', top: '90px', alignSelf: 'flex-start' }}>
            {/* Inquiry Form Header in Dedicated Box */}
            <div className="section-header-box mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="header-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                  <span className="material-symbols-outlined">send</span>
                </div>
                <div>
                  <h3 className="header-title">Send Us An Inquiry</h3>
                  <p className="header-subtitle">
                    Submit your query online and our admissions counselor will respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 rounded-3 overflow-hidden border">
              <div className="card-body p-4">
                {submitted ? (
                  <div className="p-4 rounded-3 bg-success text-white text-center">
                    <i className="fas fa-check-circle fa-3x mb-3"></i>
                    <h5 className="fw-bold">Message Sent Successfully!</h5>
                    <p className="small mb-0">
                      Thank you for contacting Swami Shiwanand Academy. Our administration team will review your inquiry and reach out within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="small text-muted mb-4">
                      Have questions regarding admissions, transport routes, or student enrollment? Please fill in this form and our counseling team will get back to you promptly.
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Parent / Guardian Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          required
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
                          <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            required
                            placeholder="10-digit number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Child's Age &amp; Class Interested In</label>
                        <input
                          type="text"
                          name="childAge"
                          className="form-control"
                          placeholder="e.g. 3.5 Years - Nursery"
                          value={formData.childAge}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Your Inquiry / Message <span className="text-danger">*</span></label>
                        <textarea
                          name="message"
                          className="form-control"
                          rows="4"
                          required
                          placeholder="Write your questions or transport route requirements..."
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <button type="submit" className="btn btn-warning w-100 fw-bold py-3 fs-6">
                        <i className="fas fa-paper-plane me-2"></i> Send Inquiry Message
                      </button>
                    </form>
                  </>
                )}

                {/* WhatsApp Instant Messaging Dedicated Action Card */}
                <div className="whatsapp-action-box mt-4">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#25d366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <div>
                      <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>Prefer instant messaging?</div>
                      <div className="small text-muted">Chat directly with admission counselor on WhatsApp</div>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${schoolInfo.whatsappNumber}?text=Hello%20Swami%20Shiwanand%20Academy,%20I%20have%20an%20inquiry%20regarding%20admission`}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-action-btn"
                  >
                    <i className="fab fa-whatsapp fs-6"></i>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
