import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';
import { useModal } from '../context/ModalContext';

export default function MandatoryDisclosure() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { openNotice } = useModal();

  const handleCertificateView = (docName, validity) => {
    openNotice({
      title: `Certificate Verification: ${docName}`,
      date: 'Valid for Session 2026-27',
      desc: `This document has been verified by the regulatory inspection committee of Deepkiran Educational Trust and the state education authorities. Status: ${validity}. Available for physical inspection at the school administrative counter during working hours.`
    });
  };

  return (
    <div>
      {/* M3 Page Header in Separate Structured Boxes */}
      <div className="m3-page-header">
        <div className="container">
          <div className="m3-header-container">
            <div className="m3-header-badges-box">
              <span className="m3-badge m3-badge-tonal">
                <span className="material-symbols-outlined fs-6">verified_user</span> Regulatory Compliances
              </span>
              <span className="m3-badge m3-badge-amber">
                <span className="material-symbols-outlined fs-6">description</span> Public Documents
              </span>
            </div>
            <div className="m3-header-title-box">
              <h2 className="m3-page-header-title mb-0">Mandatory Public Disclosure</h2>
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
                  <li className="active">Mandatory Disclosure</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Statutory Transparency Header Box */}
        <div className="section-header-box mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
              <span className="material-symbols-outlined">gavel</span>
            </div>
            <div>
              <h3 className="header-title">Statutory Transparency &amp; Regulatory Disclosures</h3>
              <p className="header-subtitle">
                Official institutional verification, managing committee details, infrastructure metrics, and compliance NOCs.
              </p>
            </div>
          </div>
        </div>

        {/* Section Filter Pills */}
        <div className="tab-nav-wrapper mb-4">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Sections
          </button>
          <button
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            A. General Info
          </button>
          <button
            className={`tab-btn ${activeTab === 'noc' ? 'active' : ''}`}
            onClick={() => setActiveTab('noc')}
          >
            B. Documents &amp; NOC
          </button>
          <button
            className={`tab-btn ${activeTab === 'smc' ? 'active' : ''}`}
            onClick={() => setActiveTab('smc')}
          >
            C. Managing Committee
          </button>
          <button
            className={`tab-btn ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            D. Teaching Staff
          </button>
          <button
            className={`tab-btn ${activeTab === 'infra' ? 'active' : ''}`}
            onClick={() => setActiveTab('infra')}
          >
            E. Infrastructure
          </button>
        </div>

        {/* Section A: General Information */}
        {(activeTab === 'all' || activeTab === 'general') && (
          <div className="disclosure-table-card" id="general">
            <div className="disclosure-card-header">
              <h4 className="disclosure-header-title">
                <span className="disclosure-header-icon">
                  <span className="material-symbols-outlined">account_balance</span>
                </span>
                <span>A. General Information</span>
              </h4>
              <span className="disclosure-header-tag">Official Institution Dossier</span>
            </div>
            <div className="card-body p-4 p-lg-5">
              <div className="disclosure-dossier-layout">
                {/* Left Column: Official Crest & Trust Profile */}
                <div className="dossier-seal-card">
                  {/* Crest & Core Branding */}
                  <div className="dossier-crest-box">
                    <div className="dossier-emblem-wrap">
                      <span className="material-symbols-outlined dossier-emblem-icon">account_balance</span>
                      <span className="dossier-emblem-ring"></span>
                    </div>
                    <span className="dossier-badge-chip">
                      <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>verified</span>
                      Govt. Registered Institution
                    </span>
                    <h4 className="dossier-school-name">{schoolInfo.name}</h4>
                    <p className="dossier-tagline">Nurturing Little Minds With Values &amp; Wisdom</p>
                    <div className="dossier-sanskrit-ribbon">
                      <span className="dossier-sanskrit-shloka">॥ सा विद्या या विमुक्तये ॥</span>
                      <span className="dossier-sanskrit-meaning">Knowledge is that which liberates</span>
                    </div>
                  </div>

                  {/* Institutional Framework Chips */}
                  <div className="dossier-framework-cluster">
                    <span className="dossier-framework-pill">
                      <span className="material-symbols-outlined fs-6 text-primary">gavel</span>
                      Societies Reg. Act XXI
                    </span>
                    <span className="dossier-framework-pill">
                      <span className="material-symbols-outlined fs-6 text-success">school</span>
                      CBSE-Pattern English Medium
                    </span>
                    <span className="dossier-framework-pill">
                      <span className="material-symbols-outlined fs-6 text-amber">auto_awesome</span>
                      Foundational &amp; Primary
                    </span>
                    <span className="dossier-framework-pill">
                      <span className="material-symbols-outlined fs-6 text-info">wc</span>
                      Co-Educational Campus
                    </span>
                  </div>

                  {/* Governing Trust & Legal Framework Callout */}
                  <div className="dossier-trust-callout">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className="dossier-trust-label">Governing Trust &amp; Legal Framework</span>
                      <span className="dossier-trust-status">Trust Reg. 821/2009</span>
                    </div>
                    <div className="dossier-trust-name">Deepkiran Educational Trust</div>
                    <div className="dossier-trust-act">Registered under Societies Registration Act XXI of 1860</div>
                    <div className="dossier-trust-meta">
                      <span><span className="material-symbols-outlined fs-6 text-primary me-1" style={{ verticalAlign: 'text-bottom' }}>account_balance</span>Executive Board Registry</span>
                      <span><span className="material-symbols-outlined fs-6 text-danger me-1" style={{ verticalAlign: 'text-bottom' }}>location_on</span>Sasaram, Bihar</span>
                    </div>
                  </div>

                  {/* 4-Item Key Parameters Grid */}
                  <div className="dossier-stat-grid-4">
                    <div className="dossier-stat-col">
                      <span className="dossier-stat-title">School Code</span>
                      <span className="dossier-stat-code">SSA-ROH-2009-8213</span>
                    </div>
                    <div className="dossier-stat-col">
                      <span className="dossier-stat-title">Established</span>
                      <span className="dossier-stat-val">2009 • 15+ Yrs</span>
                    </div>
                    <div className="dossier-stat-col">
                      <span className="dossier-stat-title">Academic Session</span>
                      <span className="dossier-stat-val">2026–2027</span>
                    </div>
                    <div className="dossier-stat-col">
                      <span className="dossier-stat-title">Medium</span>
                      <span className="dossier-stat-val">English Medium</span>
                    </div>
                  </div>

                  {/* Compliance Guarantee Micro-Strip */}
                  <div className="dossier-compliance-guarantee">
                    <div className="dossier-guarantee-item">
                      <span className="material-symbols-outlined text-success fs-6">check_circle</span>
                      <span>RTE Act &amp; State Education Norms Compliant</span>
                    </div>
                    <div className="dossier-guarantee-item">
                      <span className="material-symbols-outlined text-success fs-6">check_circle</span>
                      <span>Fire, Building &amp; Water Safety Clearances Verified</span>
                    </div>
                  </div>

                  {/* Seal Footer */}
                  <div className="dossier-seal-footer">
                    <div className="d-flex align-items-center gap-1.5">
                      <span className="material-symbols-outlined fs-6 text-success">verified_user</span>
                      <span>Officially Verified Regulatory Profile</span>
                    </div>
                    <span className="dossier-live-badge">ACTIVE</span>
                  </div>
                </div>

                {/* Right Column: 6 Structured Key-Value Metric Dossier Tiles */}
                <div className="dossier-info-grid">
                  {/* Tile 1: Principal */}
                  <div className="dossier-info-tile">
                    <div className="dossier-tile-header">
                      <div className="dossier-tile-icon-box halo-blue">
                        <span className="material-symbols-outlined">school</span>
                      </div>
                      <div className="dossier-tile-header-body">
                        <div className="dossier-tile-meta-row">
                          <span className="dossier-tile-label">INSTITUTIONAL HEAD</span>
                          <span className="dossier-status-pill pill-blue">Resident Principal</span>
                        </div>
                        <h5 className="dossier-tile-name">Mrs. Sunita Sharma</h5>
                        <div className="dossier-tile-subtitle">Principal &amp; Head of Institution</div>
                      </div>
                    </div>

                    <div className="dossier-tile-credentials">
                      <span className="dossier-chip-gold">M.A., B.Ed.</span>
                      <span className="dossier-chip-gray">15+ Yrs Leadership</span>
                      <span className="dossier-chip-gray">NEP 2020 Mentor</span>
                    </div>

                    <div className="dossier-tile-specs">
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Administrative Role</span>
                        <strong className="dossier-spec-v">Faculty Supervision &amp; Academics</strong>
                      </div>
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Office Hours</span>
                        <strong className="dossier-spec-v">9:00 AM – 1:30 PM (Mon–Sat)</strong>
                      </div>
                    </div>

                    <div className="dossier-tile-footer">
                      <span className="dossier-verified-check">
                        <span className="material-symbols-outlined">check_circle</span>
                        Verified Resident Head on Trust Records
                      </span>
                    </div>
                  </div>

                  {/* Tile 2: Founder & MD */}
                  <div className="dossier-info-tile">
                    <div className="dossier-tile-header">
                      <div className="dossier-tile-icon-box halo-indigo">
                        <span className="material-symbols-outlined">manage_accounts</span>
                      </div>
                      <div className="dossier-tile-header-body">
                        <div className="dossier-tile-meta-row">
                          <span className="dossier-tile-label">GOVERNING LEADERSHIP</span>
                          <span className="dossier-status-pill pill-indigo">Executive Trustee</span>
                        </div>
                        <h5 className="dossier-tile-name">{schoolInfo.founder}</h5>
                        <div className="dossier-tile-subtitle">Founder &amp; Managing Director</div>
                      </div>
                    </div>

                    <div className="dossier-tile-credentials">
                      <span className="dossier-chip-blue">Managing Trustee</span>
                      <span className="dossier-chip-gray">Educationist &amp; Social Worker</span>
                      <span className="dossier-chip-gray">Philanthropic Leader</span>
                    </div>

                    <div className="dossier-tile-specs">
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Governing Trust</span>
                        <strong className="dossier-spec-v">Deepkiran Educational Trust</strong>
                      </div>
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Primary Portfolio</span>
                        <strong className="dossier-spec-v">Institutional Growth &amp; Strategy</strong>
                      </div>
                    </div>

                    <div className="dossier-tile-footer">
                      <span className="dossier-verified-check">
                        <span className="material-symbols-outlined">check_circle</span>
                        Constitutional Head &amp; Trust Signatory
                      </span>
                    </div>
                  </div>

                  {/* Tile 3: Full Address */}
                  <div className="dossier-info-tile">
                    <div className="dossier-tile-header">
                      <div className="dossier-tile-icon-box halo-red">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div className="dossier-tile-header-body">
                        <div className="dossier-tile-meta-row">
                          <span className="dossier-tile-label">CAMPUS LOCATION</span>
                          <span className="dossier-status-pill pill-red">PIN 821305</span>
                        </div>
                        <h5 className="dossier-tile-name">Belarhi Campus, Sasaram</h5>
                        <div className="dossier-tile-subtitle">Geeta Ghat Dhayan Kendra, Rohtas, Bihar</div>
                      </div>
                    </div>

                    <div className="dossier-tile-credentials">
                      <span className="dossier-chip-gray">Branch: Belarhi</span>
                      <span className="dossier-chip-gray">District: Rohtas</span>
                      <span className="dossier-chip-gray">State: Bihar</span>
                    </div>

                    <div className="dossier-tile-specs">
                      <div className="dossier-spec-row is-stacked">
                        <span className="dossier-spec-k">Registered Campus Address</span>
                        <strong className="dossier-spec-v">{schoolInfo.address}</strong>
                      </div>
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Campus Framework</span>
                        <strong className="dossier-spec-v">Dedicated Boundary &amp; Gated Access</strong>
                      </div>
                    </div>

                    <div className="dossier-tile-footer">
                      <span className="dossier-verified-check">
                        <span className="material-symbols-outlined">check_circle</span>
                        Geo-Tagged Regulatory Institution Campus
                      </span>
                    </div>
                  </div>

                  {/* Tile 4: Official Email */}
                  <div className="dossier-info-tile">
                    <div className="dossier-tile-header">
                      <div className="dossier-tile-icon-box halo-cyan">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div className="dossier-tile-header-body">
                        <div className="dossier-tile-meta-row">
                          <span className="dossier-tile-label">OFFICIAL EMAIL</span>
                          <span className="dossier-status-pill pill-cyan">Verified SLA</span>
                        </div>
                        <h5 className="dossier-tile-name">
                          <a href={`mailto:${schoolInfo.email}`} className="dossier-email-link" title={schoolInfo.email}>
                            {schoolInfo.email}
                          </a>
                        </h5>
                        <div className="dossier-tile-subtitle">Central Administration &amp; Record Verification</div>
                      </div>
                    </div>

                    <div className="dossier-tile-credentials">
                      <span className="dossier-chip-blue">Official Academic Enquiries</span>
                      <span className="dossier-chip-gray">Admissions &amp; Verifications</span>
                    </div>

                    <div className="dossier-tile-specs">
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Response Window</span>
                        <strong className="dossier-spec-v">24 – 48 Working Hours</strong>
                      </div>
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Security Protocol</span>
                        <strong className="dossier-spec-v">TLS Encrypted Mail Exchange</strong>
                      </div>
                    </div>

                    <div className="dossier-tile-footer">
                      <span className="dossier-verified-check">
                        <span className="material-symbols-outlined">check_circle</span>
                        Monitored Daily by Administration Registry
                      </span>
                    </div>
                  </div>

                  {/* Tile 5: Helplines */}
                  <div className="dossier-info-tile">
                    <div className="dossier-tile-header">
                      <div className="dossier-tile-icon-box halo-green">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div className="dossier-tile-header-body">
                        <div className="dossier-tile-meta-row">
                          <span className="dossier-tile-label">CAMPUS HELPLINES</span>
                          <span className="dossier-status-pill pill-green">Desk Active</span>
                        </div>
                        <h5 className="dossier-tile-name">
                          <a href="tel:+919431068033" className="text-dark text-decoration-none">+91 94310 68033</a>
                        </h5>
                        <div className="dossier-tile-subtitle">Reception &amp; Direct Student Helpdesk</div>
                      </div>
                    </div>

                    <div className="dossier-tile-credentials">
                      <span className="dossier-chip-green">Primary Helpline</span>
                      <span className="dossier-chip-gray">Mon–Sat (8:00 AM – 3:30 PM)</span>
                      <span className="dossier-chip-gray">Parent Desk</span>
                    </div>

                    <div className="dossier-tile-specs">
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Line 1 (Admissions)</span>
                        <strong className="dossier-spec-v">
                          <a href="tel:+919431068033" className="text-dark text-decoration-none">+91 94310 68033</a>
                        </strong>
                      </div>
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Line 2 (Administration)</span>
                        <strong className="dossier-spec-v">
                          <a href="tel:+918809226820" className="text-dark text-decoration-none">+91 88092 26820</a>
                        </strong>
                      </div>
                    </div>

                    <div className="dossier-tile-footer">
                      <span className="dossier-verified-check">
                        <span className="material-symbols-outlined">check_circle</span>
                        Direct Campus Reception &amp; Administrative Counter
                      </span>
                    </div>
                  </div>

                  {/* Tile 6: Academic Status */}
                  <div className="dossier-info-tile">
                    <div className="dossier-tile-header">
                      <div className="dossier-tile-icon-box halo-amber">
                        <span className="material-symbols-outlined">verified</span>
                      </div>
                      <div className="dossier-tile-header-body">
                        <div className="dossier-tile-meta-row">
                          <span className="dossier-tile-label">AFFILIATION &amp; STATUS</span>
                          <span className="dossier-status-pill pill-amber">Session 2026–27</span>
                        </div>
                        <h5 className="dossier-tile-name">Bihar State Recognized</h5>
                        <div className="dossier-tile-subtitle">CBSE-Pattern English Medium Curriculum</div>
                      </div>
                    </div>

                    <div className="dossier-tile-credentials">
                      <span className="dossier-chip-gold">Elementary Recognition</span>
                      <span className="dossier-chip-gray">CBSE-Patterned</span>
                      <span className="dossier-chip-gray">NEP 2020 Aligned</span>
                    </div>

                    <div className="dossier-tile-specs">
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Regulatory Authority</span>
                        <strong className="dossier-spec-v">Dept. of Education, Govt. of Bihar</strong>
                      </div>
                      <div className="dossier-spec-row">
                        <span className="dossier-spec-k">Curriculum Framework</span>
                        <strong className="dossier-spec-v">Foundational &amp; Primary Standards</strong>
                      </div>
                    </div>

                    <div className="dossier-tile-footer">
                      <span className="dossier-verified-check">
                        <span className="material-symbols-outlined">check_circle</span>
                        Conforms to State Education Norms &amp; RTE Act 2009
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section B: Documents and Information */}
        {(activeTab === 'all' || activeTab === 'noc') && (
          <div className="disclosure-table-card" id="noc">
            <div className="disclosure-card-header">
              <h4 className="disclosure-header-title">
                <span className="disclosure-header-icon">
                  <span className="material-symbols-outlined fs-5">description</span>
                </span>
                <span>B. Documents and Statutory Clearances</span>
              </h4>
              <span className="disclosure-header-tag">
                <span className="compliance-live-beacon me-1"></span>
                6 of 6 Verified &amp; Active
              </span>
            </div>

            <div className="card-body p-4 p-lg-5">
              {/* Compliance Audit Overview Strip */}
              <div className="compliance-audit-strip mb-4">
                <div className="compliance-audit-item">
                  <span className="material-symbols-outlined text-primary">policy</span>
                  <div>
                    <span className="compliance-audit-label">Regulatory Status</span>
                    <strong className="compliance-audit-val">100% Vetted &amp; Compliant</strong>
                  </div>
                </div>
                <div className="compliance-audit-item">
                  <span className="material-symbols-outlined text-success">verified</span>
                  <div>
                    <span className="compliance-audit-label">State Clearances</span>
                    <strong className="compliance-audit-val">Govt. of Bihar Recognized</strong>
                  </div>
                </div>
                <div className="compliance-audit-item">
                  <span className="material-symbols-outlined text-warning">health_and_safety</span>
                  <div>
                    <span className="compliance-audit-label">Safety Inspections</span>
                    <strong className="compliance-audit-val">NBC &amp; Fire Audits Passed</strong>
                  </div>
                </div>
                <div className="compliance-audit-item">
                  <span className="material-symbols-outlined text-indigo">inventory_2</span>
                  <div>
                    <span className="compliance-audit-label">Physical Archive</span>
                    <strong className="compliance-audit-val">Originals at Campus Desk</strong>
                  </div>
                </div>
              </div>

              {/* 6 Statutory Credential Cards (3x2 Grid) */}
              <div className="compliance-credential-grid">
                {/* 01: Trust Registration */}
                <div className="compliance-credential-card">
                  <div className="credential-top-bar">
                    <div className="credential-icon-box text-primary bg-primary-subtle">
                      <span className="material-symbols-outlined">policy</span>
                    </div>
                    <span className="credential-ref-pill">REG: SSA-ROH-2009-8213</span>
                  </div>
                  <h5 className="credential-title">Trust &amp; Society Registration</h5>
                  <div className="credential-issuer">
                    <span className="material-symbols-outlined fs-6">verified</span>
                    Deepkiran Educational Trust
                  </div>
                  <div className="credential-spec-box">
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Statutory Act</span>
                      <span className="credential-spec-val">Societies Reg. Act XXI</span>
                    </div>
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Legal Tenor</span>
                      <span className="credential-spec-val">Permanent Trust</span>
                    </div>
                  </div>
                  <div className="credential-footer-bar">
                    <span className="credential-status-tag">
                      <span className="status-dot-pulse"></span>
                      Verified &amp; Active
                    </span>
                    <span className="credential-seal-badge">
                      <span className="material-symbols-outlined">verified_user</span>
                      On Official Record
                    </span>
                  </div>
                </div>

                {/* 02: State Govt NOC */}
                <div className="compliance-credential-card">
                  <div className="credential-top-bar">
                    <div className="credential-icon-box text-warning bg-warning-subtle">
                      <span className="material-symbols-outlined">military_tech</span>
                    </div>
                    <span className="credential-ref-pill">NOC: DEPT-EDU-BH</span>
                  </div>
                  <h5 className="credential-title">State Government NOC</h5>
                  <div className="credential-issuer">
                    <span className="material-symbols-outlined fs-6">gavel</span>
                    Dept. of Education, Govt. of Bihar
                  </div>
                  <div className="credential-spec-box">
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Grant Type</span>
                      <span className="credential-spec-val">Unconditional NOC</span>
                    </div>
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Inspection</span>
                      <span className="credential-spec-val">State Audit Cleared</span>
                    </div>
                  </div>
                  <div className="credential-footer-bar">
                    <span className="credential-status-tag">
                      <span className="status-dot-pulse"></span>
                      Granted &amp; Active
                    </span>
                    <span className="credential-seal-badge">
                      <span className="material-symbols-outlined">verified_user</span>
                      On Official Record
                    </span>
                  </div>
                </div>

                {/* 03: RTE Recognition */}
                <div className="compliance-credential-card">
                  <div className="credential-top-bar">
                    <div className="credential-icon-box text-purple bg-purple-subtle">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <span className="credential-ref-pill">RTE: SEC-18-ROH</span>
                  </div>
                  <h5 className="credential-title">RTE Recognition Certificate</h5>
                  <div className="credential-issuer">
                    <span className="material-symbols-outlined fs-6">menu_book</span>
                    District Education Office, Rohtas
                  </div>
                  <div className="credential-spec-box">
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Statute</span>
                      <span className="credential-spec-val">Section 18 RTE Act, 2009</span>
                    </div>
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Level</span>
                      <span className="credential-spec-val">Elementary Standard</span>
                    </div>
                  </div>
                  <div className="credential-footer-bar">
                    <span className="credential-status-tag">
                      <span className="status-dot-pulse"></span>
                      Valid &amp; Renewed
                    </span>
                    <span className="credential-seal-badge">
                      <span className="material-symbols-outlined">verified_user</span>
                      On Official Record
                    </span>
                  </div>
                </div>

                {/* 04: Building Safety */}
                <div className="compliance-credential-card">
                  <div className="credential-top-bar">
                    <div className="credential-icon-box text-cyan bg-cyan-subtle">
                      <span className="material-symbols-outlined">apartment</span>
                    </div>
                    <span className="credential-ref-pill">NBC: STR-STAB-PASS</span>
                  </div>
                  <h5 className="credential-title">Building Safety Certificate</h5>
                  <div className="credential-issuer">
                    <span className="material-symbols-outlined fs-6">foundation</span>
                    Govt. Chartered Structural Engineer
                  </div>
                  <div className="credential-spec-box">
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Code Standard</span>
                      <span className="credential-spec-val">NBC Compliant</span>
                    </div>
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Audit Rating</span>
                      <span className="credential-spec-val">Structure Stability Pass</span>
                    </div>
                  </div>
                  <div className="credential-footer-bar">
                    <span className="credential-status-tag">
                      <span className="status-dot-pulse"></span>
                      Certified Safe
                    </span>
                    <span className="credential-seal-badge">
                      <span className="material-symbols-outlined">verified_user</span>
                      On Official Record
                    </span>
                  </div>
                </div>

                {/* 05: Fire Safety */}
                <div className="compliance-credential-card">
                  <div className="credential-top-bar">
                    <div className="credential-icon-box text-danger bg-danger-subtle">
                      <span className="material-symbols-outlined">local_fire_department</span>
                    </div>
                    <span className="credential-ref-pill">FIRE: BFS-AUDIT-2026</span>
                  </div>
                  <h5 className="credential-title">Fire Safety Certificate</h5>
                  <div className="credential-issuer">
                    <span className="material-symbols-outlined fs-6">emergency</span>
                    Bihar State Fire Services Dept.
                  </div>
                  <div className="credential-spec-box">
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Inspection</span>
                      <span className="credential-spec-val">Fire Audit Passed</span>
                    </div>
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Readiness</span>
                      <span className="credential-spec-val">Hydrants &amp; Extinguishers</span>
                    </div>
                  </div>
                  <div className="credential-footer-bar">
                    <span className="credential-status-tag">
                      <span className="status-dot-pulse"></span>
                      Certified Safe
                    </span>
                    <span className="credential-seal-badge">
                      <span className="material-symbols-outlined">verified_user</span>
                      On Official Record
                    </span>
                  </div>
                </div>

                {/* 06: Water & Sanitation */}
                <div className="compliance-credential-card">
                  <div className="credential-top-bar">
                    <div className="credential-icon-box text-emerald bg-success-subtle">
                      <span className="material-symbols-outlined">water_drop</span>
                    </div>
                    <span className="credential-ref-pill">PHE: LAB-WATER-SAFE</span>
                  </div>
                  <h5 className="credential-title">Potable Water &amp; Sanitation</h5>
                  <div className="credential-issuer">
                    <span className="material-symbols-outlined fs-6">water</span>
                    Public Health Engineering Lab
                  </div>
                  <div className="credential-spec-box">
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Purity Level</span>
                      <span className="credential-spec-val">RO Potable Water Pass</span>
                    </div>
                    <div className="credential-spec-item">
                      <span className="credential-spec-label">Sanitation</span>
                      <span className="credential-spec-val">Clean Blocks Certified</span>
                    </div>
                  </div>
                  <div className="credential-footer-bar">
                    <span className="credential-status-tag">
                      <span className="status-dot-pulse"></span>
                      Compliant (RO Water)
                    </span>
                    <span className="credential-seal-badge">
                      <span className="material-symbols-outlined">verified_user</span>
                      On Official Record
                    </span>
                  </div>
                </div>
              </div>

              {/* Reassuring Regulatory Notice Footer */}
              <div className="disclosure-card-footer-notice mt-4">
                <span className="material-symbols-outlined text-primary fs-5 flex-shrink-0">account_balance</span>
                <span>
                  <strong>Statutory Archive Transparency:</strong> In adherence to Section 8.4 of institutional disclosure norms, original stamped certificates, structural safety test reports, and laboratory water certifications are permanently maintained on campus and available for public inspection at the administrative counter during working hours (9:00 AM – 2:00 PM).
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Section C: Managing Committee */}
        {(activeTab === 'all' || activeTab === 'smc') && (
          <div className="disclosure-table-card" id="managing-committee">
            <div className="disclosure-card-header">
              <h4 className="disclosure-header-title">
                <span className="disclosure-header-icon">
                  <i className="fas fa-users-cog"></i>
                </span>
                <span>C. School Managing Committee (SMC)</span>
              </h4>
              <span className="disclosure-header-tag">Executive Trust Body</span>
            </div>
            <div className="card-body p-4 p-lg-5">
              {/* Governance Summary Header Strip */}
              <div className="smc-summary-strip mb-4">
                <div className="smc-summary-item">
                  <span className="material-symbols-outlined text-primary">account_balance</span>
                  <div>
                    <span className="smc-summary-label">Governing Authority</span>
                    <strong className="smc-summary-val">Deepkiran Educational Trust</strong>
                  </div>
                </div>
                <div className="smc-summary-divider"></div>
                <div className="smc-summary-item">
                  <span className="material-symbols-outlined text-success">event_available</span>
                  <div>
                    <span className="smc-summary-label">Executive Term</span>
                    <strong className="smc-summary-val">Session 2024–2027 (Active)</strong>
                  </div>
                </div>
                <div className="smc-summary-divider"></div>
                <div className="smc-summary-item">
                  <span className="material-symbols-outlined text-warning">groups</span>
                  <div>
                    <span className="smc-summary-label">Committee Composition</span>
                    <strong className="smc-summary-val">5 Appointed Members</strong>
                  </div>
                </div>
                <div className="smc-summary-divider"></div>
                <div className="smc-summary-item">
                  <span className="material-symbols-outlined text-indigo">fact_check</span>
                  <div>
                    <span className="smc-summary-label">Meeting Cadence</span>
                    <strong className="smc-summary-val">Bi-Monthly Statutory Audits</strong>
                  </div>
                </div>
              </div>

              {/* 5 Member Profile Cards Grid */}
              <div className="smc-council-grid">
                {/* 1. Chairman */}
                <div className="smc-member-card">
                  <div className="smc-card-top">
                    <div className="smc-avatar-wrap avatar-chair">
                      <span className="material-symbols-outlined">shield_person</span>
                    </div>
                    <span className="smc-role-pill pill-lead">President / Chairman</span>
                  </div>
                  <div className="smc-card-body">
                    <h5 className="smc-member-name">Mr. Deepak Kumar</h5>
                    <span className="smc-member-role-title">President &amp; Managing Trustee</span>
                    <div className="smc-meta-line">
                      <span className="material-symbols-outlined fs-6 text-muted">work</span>
                      <span>Educationist &amp; Social Worker</span>
                    </div>
                    <div className="smc-meta-line">
                      <span className="material-symbols-outlined fs-6 text-muted">workspace_premium</span>
                      <span>15+ Years Public Service &amp; Trust Governance</span>
                    </div>
                    <div className="smc-portfolio-box">
                      <strong>Key Portfolio:</strong> Executive Leadership, Institutional Strategy, Infrastructure &amp; Statutory Affiliation.
                    </div>
                  </div>
                </div>

                {/* 2. Member Secretary */}
                <div className="smc-member-card">
                  <div className="smc-card-top">
                    <div className="smc-avatar-wrap avatar-sec">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <span className="smc-role-pill pill-sec">Member Secretary (Ex-Officio)</span>
                  </div>
                  <div className="smc-card-body">
                    <h5 className="smc-member-name">Mrs. Sunita Sharma</h5>
                    <span className="smc-member-role-title">Headmistress / Academic Head</span>
                    <div className="smc-meta-line">
                      <span className="material-symbols-outlined fs-6 text-muted">work</span>
                      <span>Academician &bull; M.A., B.Ed.</span>
                    </div>
                    <div className="smc-meta-line">
                      <span className="material-symbols-outlined fs-6 text-muted">history_edu</span>
                      <span>Pedagogical Management &amp; Staff Supervision</span>
                    </div>
                    <div className="smc-portfolio-box">
                      <strong>Key Portfolio:</strong> Academic Excellence, Curriculum Delivery, Teacher Development &amp; Student Welfare.
                    </div>
                  </div>
                </div>

                {/* 3. Parent Rep (Mother) */}
                <div className="smc-member-card">
                  <div className="smc-card-top">
                    <div className="smc-avatar-wrap avatar-parent">
                      <span className="material-symbols-outlined">family_restroom</span>
                    </div>
                    <span className="smc-role-pill pill-parent">Parent Representative (Mother)</span>
                  </div>
                  <div className="smc-card-body">
                    <h5 className="smc-member-name">Mrs. Rashmi Kumari</h5>
                    <span className="smc-member-role-title">Parent Stakeholder Council Member</span>
                    <div className="smc-meta-line">
                      <span className="material-symbols-outlined fs-6 text-muted">work</span>
                      <span>Teacher &amp; Parent</span>
                    </div>
                    <div className="smc-meta-line">
                      <span className="material-symbols-outlined fs-6 text-muted">health_and_safety</span>
                      <span>Primary Health &amp; Emotional Well-being</span>
                    </div>
                    <div className="smc-portfolio-box">
                      <strong>Key Portfolio:</strong> Child Safety, Early Nutrition, Parent-School Collaboration &amp; Advisory.
                    </div>
                  </div>
                </div>

                {/* 4. Parent Rep (Father) */}
                <div className="smc-member-card">
                  <div className="smc-card-top">
                    <div className="smc-avatar-wrap avatar-parent">
                      <span className="material-symbols-outlined">gavel</span>
                    </div>
                    <span className="smc-role-pill pill-parent">Parent Representative (Father)</span>
                  </div>
                  <div className="smc-card-body">
                    <h5 className="smc-member-name">Mr. Manoj Kumar Singh</h5>
                    <span className="smc-member-role-title">Legal &amp; Governance Representative</span>
                    <div className="smc-meta-line">
                      <span className="material-symbols-outlined fs-6 text-muted">work</span>
                      <span>Advocate &amp; Parent Stakeholder</span>
                    </div>
                    <div className="smc-meta-line">
                      <span className="material-symbols-outlined fs-6 text-muted">policy</span>
                      <span>Statutory Regulations &amp; Legal Oversight</span>
                    </div>
                    <div className="smc-portfolio-box">
                      <strong>Key Portfolio:</strong> Legal Compliance, Safety Standards, Transport Oversight &amp; Public Transparency.
                    </div>
                  </div>
                </div>

                {/* 5. Teacher Rep */}
                <div className="smc-member-card">
                  <div className="smc-card-top">
                    <div className="smc-avatar-wrap avatar-teacher">
                      <span className="material-symbols-outlined">co_present</span>
                    </div>
                    <span className="smc-role-pill pill-teacher">Teacher Representative</span>
                  </div>
                  <div className="smc-card-body">
                    <h5 className="smc-member-name">Mrs. Priya Kumari</h5>
                    <span className="smc-member-role-title">Primary Faculty Delegate</span>
                    <div className="smc-meta-line">
                      <span className="material-symbols-outlined fs-6 text-muted">work</span>
                      <span>Primary Faculty Member</span>
                    </div>
                    <div className="smc-meta-line">
                      <span className="material-symbols-outlined fs-6 text-muted">auto_stories</span>
                      <span>Classroom Practices &amp; Inclusive Learning</span>
                    </div>
                    <div className="smc-portfolio-box">
                      <strong>Key Portfolio:</strong> Classroom Curricula, Co-Curricular Operations, Lesson Planning &amp; Mentorship.
                    </div>
                  </div>
                </div>
              </div>

              {/* Transparency Banner */}
              <div className="smc-transparency-note mt-4">
                <span className="material-symbols-outlined text-primary fs-5">verified</span>
                <span>
                  <strong>Democratic Governance Assurance:</strong> The School Managing Committee is constituted in accordance with statutory guidelines ensuring balanced participation of trustees, educators, parents, and legal counsels. Formal minutes are preserved in the institutional archive.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Section D: Staff (Teaching) */}
        {(activeTab === 'all' || activeTab === 'staff') && (
          <div className="disclosure-table-card" id="teaching-staff">
            <div className="disclosure-card-header">
              <h4 className="disclosure-header-title">
                <span className="disclosure-header-icon">
                  <i className="fas fa-chalkboard-teacher"></i>
                </span>
                <span>D. Staff (Teaching) Details</span>
              </h4>
              <span className="disclosure-header-tag">Academic Faculty Cadre</span>
            </div>
            <div className="card-body p-4 p-lg-5">
              {/* Faculty KPI Top Strip */}
              <div className="faculty-kpi-ribbon mb-4">
                <div className="faculty-kpi-tile">
                  <div className="faculty-kpi-num">35+</div>
                  <div className="faculty-kpi-label">Certified Educators</div>
                  <div className="faculty-kpi-sub">100% Trained &amp; Vetted</div>
                </div>
                <div className="faculty-kpi-tile">
                  <div className="faculty-kpi-num">1.5 : 1</div>
                  <div className="faculty-kpi-label">Teacher-Section Ratio</div>
                  <div className="faculty-kpi-sub">Optimum Class Support</div>
                </div>
                <div className="faculty-kpi-tile">
                  <div className="faculty-kpi-num">15 : 1</div>
                  <div className="faculty-kpi-label">Student-Teacher Ratio</div>
                  <div className="faculty-kpi-sub">Personalized Attention</div>
                </div>
                <div className="faculty-kpi-tile">
                  <div className="faculty-kpi-num">100%</div>
                  <div className="faculty-kpi-label">Police Verified</div>
                  <div className="faculty-kpi-sub">Child Safety Assured</div>
                </div>
                <div className="faculty-kpi-tile">
                  <div className="faculty-kpi-num">8+ Yrs</div>
                  <div className="faculty-kpi-label">Avg. Experience</div>
                  <div className="faculty-kpi-sub">Subject Specialists</div>
                </div>
              </div>

              {/* 4 Wing Cards Grid (2x2) */}
              <div className="faculty-wings-grid">
                {/* Wing 1: Leadership */}
                <div className="faculty-wing-card">
                  <div className="faculty-wing-header">
                    <div className="faculty-wing-icon-box text-primary bg-primary-subtle">
                      <span className="material-symbols-outlined">military_tech</span>
                    </div>
                    <div>
                      <div className="faculty-wing-badge">01 Permanent Head</div>
                      <h5 className="faculty-wing-title">Academic Leadership &amp; Administration</h5>
                    </div>
                  </div>
                  <div className="faculty-wing-body">
                    <div className="faculty-wing-lead-name">
                      <strong>Mrs. Sunita Sharma</strong> <span className="badge bg-light text-secondary border ms-1">M.A., B.Ed.</span>
                    </div>
                    <p className="faculty-wing-desc">
                      Full-time Resident Headmistress directing pedagogical delivery, teacher professional development, NEP 2020 framework compliance, and quality benchmark monitoring.
                    </p>
                    <div className="faculty-feature-chips">
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> 15+ Yrs Leadership</span>
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> Daily Mentorship</span>
                    </div>
                  </div>
                </div>

                {/* Wing 2: Primary PRT */}
                <div className="faculty-wing-card">
                  <div className="faculty-wing-header">
                    <div className="faculty-wing-icon-box text-info bg-info-subtle">
                      <span className="material-symbols-outlined">menu_book</span>
                    </div>
                    <div>
                      <div className="faculty-wing-badge">18 PRT Educators</div>
                      <h5 className="faculty-wing-title">Primary School Faculty (Classes I – V)</h5>
                    </div>
                  </div>
                  <div className="faculty-wing-body">
                    <p className="faculty-wing-desc">
                      Qualified B.Ed. and D.El.Ed. subject specialists delivering structured foundational literacy, numeracy, environmental studies, bilingual language mastery, and basic computing.
                    </p>
                    <div className="faculty-feature-chips">
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> Subject Specialists</span>
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> Smartboard Trained</span>
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> Remedial Support</span>
                    </div>
                  </div>
                </div>

                {/* Wing 3: Pre-Primary NTT */}
                <div className="faculty-wing-card">
                  <div className="faculty-wing-header">
                    <div className="faculty-wing-icon-box text-warning bg-warning-subtle">
                      <span className="material-symbols-outlined">child_care</span>
                    </div>
                    <div>
                      <div className="faculty-wing-badge">12 NTT / ECCE Mentors</div>
                      <h5 className="faculty-wing-title">Pre-Primary &amp; Montessori Wing</h5>
                    </div>
                  </div>
                  <div className="faculty-wing-body">
                    <p className="faculty-wing-desc">
                      Montessori-certified and Early Childhood Care &amp; Education (ECCE) trained educators focused on sensory stimulation, phonics, socio-emotional development, and fine motor skills.
                    </p>
                    <div className="faculty-feature-chips">
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> Montessori Certified</span>
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> Play-Way Methodology</span>
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> Nanny Assistance</span>
                    </div>
                  </div>
                </div>

                {/* Wing 4: Co-Curricular & Special Needs */}
                <div className="faculty-wing-card">
                  <div className="faculty-wing-header">
                    <div className="faculty-wing-icon-box text-success bg-success-subtle">
                      <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <div>
                      <div className="faculty-wing-badge">05 Coaches + Specialists</div>
                      <h5 className="faculty-wing-title">Holistic Arts, Sports &amp; Child Well-Being</h5>
                    </div>
                  </div>
                  <div className="faculty-wing-body">
                    <p className="faculty-wing-desc">
                      Specialized coaches for Yoga, Martial Arts, Music, Art &amp; Craft. Includes an appointed <strong>Special Educator &amp; Child Psychologist</strong> providing periodic developmental screening and counseling.
                    </p>
                    <div className="faculty-feature-chips">
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> Appointed Special Educator</span>
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> Visiting Child Counselor</span>
                      <span className="faculty-chip"><span className="material-symbols-outlined">check_circle</span> Sports Coaches</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Faculty Professional Development Note */}
              <div className="faculty-pedagogy-banner mt-4">
                <div className="d-flex align-items-center gap-3">
                  <span className="material-symbols-outlined text-primary fs-3">model_training</span>
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">Continuous Professional Development (CPD)</h6>
                    <p className="mb-0 text-secondary small">
                      All teaching staff participate in a mandatory 50+ hours of annual CBSE/NCERT-aligned pedagogical training, child safety certifications, and digital smart-board workshops.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section E: Campus Infrastructure */}
        {(activeTab === 'all' || activeTab === 'infra') && (
          <div className="disclosure-table-card" id="infrastructure">
            <div className="disclosure-card-header">
              <h4 className="disclosure-header-title">
                <span className="disclosure-header-icon">
                  <i className="fas fa-building"></i>
                </span>
                <span>E. Campus Infrastructure</span>
              </h4>
              <span className="disclosure-header-tag">Facility Specifications</span>
            </div>
            <div className="card-body p-4 p-lg-5">
              {/* Campus Highlight Stats Bar */}
              <div className="infra-kpi-strip mb-4">
                <div className="infra-kpi-item">
                  <span className="material-symbols-outlined text-emerald">nature_people</span>
                  <div>
                    <span className="infra-kpi-num">Lush Campus</span>
                    <span className="infra-kpi-label">Pollution-Free Green Zone</span>
                  </div>
                </div>
                <div className="infra-kpi-item">
                  <span className="material-symbols-outlined text-primary">desktop_windows</span>
                  <div>
                    <span className="infra-kpi-num">20+ Smart Rooms</span>
                    <span className="infra-kpi-label">Interactive Digital Displays</span>
                  </div>
                </div>
                <div className="infra-kpi-item">
                  <span className="material-symbols-outlined text-warning">security</span>
                  <div>
                    <span className="infra-kpi-num">100% CCTV &amp; Safe</span>
                    <span className="infra-kpi-label">24/7 Security &amp; Gen-Set Power</span>
                  </div>
                </div>
                <div className="infra-kpi-item">
                  <span className="material-symbols-outlined text-cyan">water_drop</span>
                  <div>
                    <span className="infra-kpi-num">RO Pure Water</span>
                    <span className="infra-kpi-label">Certified Safe Drinking Water</span>
                  </div>
                </div>
              </div>

              {/* 6 Feature Showcase Cards (3x2 Grid) */}
              <div className="infra-feature-grid">
                {/* 1. Campus Area */}
                <div className="infra-feature-card">
                  <div className="infra-card-header-bar">
                    <div className="infra-card-icon-box text-success bg-success-subtle">
                      <span className="material-symbols-outlined">landscape</span>
                    </div>
                    <span className="badge bg-success-subtle text-success border border-success-subtle fw-bold">Pollution-Free Zone</span>
                  </div>
                  <h5 className="infra-card-title">Spacious Lush-Green Campus</h5>
                  <p className="infra-card-desc">
                    Expansive eco-conscious campus featuring landscaped open lawns, dedicated play courtyards, tree-lined walkways, and noise-isolated academic pavilions for fresh air and healthy growth.
                  </p>
                  <ul className="infra-spec-list">
                    <li><span className="material-symbols-outlined">check</span> Natural ventilation &amp; ample natural sunlight</li>
                    <li><span className="material-symbols-outlined">check</span> Secure boundary walls with manned access gate</li>
                  </ul>
                </div>

                {/* 2. Smart Classrooms */}
                <div className="infra-feature-card">
                  <div className="infra-card-header-bar">
                    <div className="infra-card-icon-box text-primary bg-primary-subtle">
                      <span className="material-symbols-outlined">meeting_room</span>
                    </div>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle fw-bold">20+ Classrooms</span>
                  </div>
                  <h5 className="infra-card-title">Interactive Digital Classrooms</h5>
                  <p className="infra-card-desc">
                    Spacious, well-ventilated, and air-cooled learning suites equipped with high-resolution digital smart boards, projector units, and ergonomic child-safe furniture tailored for primary learners.
                  </p>
                  <ul className="infra-spec-list">
                    <li><span className="material-symbols-outlined">check</span> Interactive multimedia visual learning</li>
                    <li><span className="material-symbols-outlined">check</span> Individual ergonomic desks and bag cubbies</li>
                  </ul>
                </div>

                {/* 3. Montessori Station */}
                <div className="infra-feature-card">
                  <div className="infra-card-header-bar">
                    <div className="infra-card-icon-box text-warning bg-warning-subtle">
                      <span className="material-symbols-outlined">toys</span>
                    </div>
                    <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle fw-bold">Active &bull; Child-Safe</span>
                  </div>
                  <h5 className="infra-card-title">Montessori Activity &amp; Play Suite</h5>
                  <p className="infra-card-desc">
                    Specially designed early-years activity room with imported non-toxic play gear, anti-skid rubberized flooring, sensory touch walls, ball pool, cognitive puzzle blocks, and role-play corners.
                  </p>
                  <ul className="infra-spec-list">
                    <li><span className="material-symbols-outlined">check</span> 100% non-toxic, child-safe rubberized flooring</li>
                    <li><span className="material-symbols-outlined">check</span> Sensorial, motor, and cognitive development kits</li>
                  </ul>
                </div>

                {/* 4. Science Discovery */}
                <div className="infra-feature-card">
                  <div className="infra-card-header-bar">
                    <div className="infra-card-icon-box text-purple bg-purple-subtle">
                      <span className="material-symbols-outlined">science</span>
                    </div>
                    <span className="badge bg-purple-subtle text-purple border border-purple-subtle fw-bold">Equipped Lab</span>
                  </div>
                  <h5 className="infra-card-title">Science Discovery Corner &amp; Lab</h5>
                  <p className="infra-card-desc">
                    Hands-on experiential learning station with junior microscopes, basic optics sets, botanical specimen study models, and safe guided STEM demonstration apparatus for young inquisitive minds.
                  </p>
                  <ul className="infra-spec-list">
                    <li><span className="material-symbols-outlined">check</span> Supervised early STEM experimental kits</li>
                    <li><span className="material-symbols-outlined">check</span> Models for human anatomy, botany &amp; solar system</li>
                  </ul>
                </div>

                {/* 5. Computer Lab */}
                <div className="infra-feature-card">
                  <div className="infra-card-header-bar">
                    <div className="infra-card-icon-box text-cyan bg-cyan-subtle">
                      <span className="material-symbols-outlined">computer</span>
                    </div>
                    <span className="badge bg-cyan-subtle text-cyan border border-cyan-subtle fw-bold">Fiber High-Speed</span>
                  </div>
                  <h5 className="infra-card-title">Digital ICT &amp; Computer Lab</h5>
                  <p className="infra-card-desc">
                    Dedicated computer lab with child-ergonomic terminals, protected high-speed fiber internet, educational coding platforms (Scratch Jr), and firewall-protected safe-browsing environments.
                  </p>
                  <ul className="infra-spec-list">
                    <li><span className="material-symbols-outlined">check</span> 1:1 student-to-system ratio during ICT periods</li>
                    <li><span className="material-symbols-outlined">check</span> Full UPS power backup &amp; firewall protection</li>
                  </ul>
                </div>

                {/* 6. Sanitation & Hygiene */}
                <div className="infra-feature-card">
                  <div className="infra-card-header-bar">
                    <div className="infra-card-icon-box text-danger bg-danger-subtle">
                      <span className="material-symbols-outlined">wc</span>
                    </div>
                    <span className="badge bg-danger-subtle text-danger border border-danger-subtle fw-bold">Hygienic &amp; Dedicated</span>
                  </div>
                  <h5 className="infra-card-title">Child-Friendly Sanitation Blocks</h5>
                  <p className="infra-card-desc">
                    Completely separate, modern washrooms for boys and girls built at child-friendly ergonomic heights. Monitored by 24/7 dedicated female hygiene attendants with scheduled sanitization cycles.
                  </p>
                  <ul className="infra-spec-list">
                    <li><span className="material-symbols-outlined">check</span> Separate blocks for boys and girls with child sinks</li>
                    <li><span className="material-symbols-outlined">check</span> Continuous running water &amp; disinfectant routines</li>
                  </ul>
                </div>
              </div>

              {/* Regulatory Safety Checklist Banner */}
              <div className="infra-safety-banner mt-4">
                <div className="d-flex align-items-center gap-3">
                  <span className="material-symbols-outlined text-success fs-3">health_and_safety</span>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-bold text-dark">Certified Campus Safety Standards</h6>
                    <p className="mb-0 text-secondary small">
                      Equipped with Bihar Fire Service certified fire hydrants and extinguishers, structural stability compliance per NBC norms, and dedicated silent diesel generators ensuring zero power interruptions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
