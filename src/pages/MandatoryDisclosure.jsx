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
                  <i className="fas fa-info-circle"></i>
                </span>
                <span>A. General Information</span>
              </h4>
              <span className="disclosure-header-tag">Institution Overview</span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="custom-table mb-0">
                  <tbody>
                    <tr>
                      <td className="disclosure-label-cell">Name of the School</td>
                      <td className="fw-semibold text-dark">{schoolInfo.name}</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Affiliation / Registration Status</td>
                      <td>Recognized &amp; Registered under Government Norms / Deepkiran Educational Trust</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">School Code / Registration No</td>
                      <td><span className="badge bg-light text-primary border fw-bold px-3 py-1">SSA-ROH-2009-8213</span></td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Complete Address with PIN Code</td>
                      <td>{schoolInfo.address}</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Principal / Headmistress Name &amp; Qualification</td>
                      <td>Mrs. Sunita Sharma (M.A., B.Ed.)</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Founder &amp; Managing Director</td>
                      <td>{schoolInfo.founder}</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">School Email Address</td>
                      <td><a href={`mailto:${schoolInfo.email}`} className="text-primary text-decoration-none fw-semibold">{schoolInfo.email}</a></td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Contact Telephone / Mobile Numbers</td>
                      <td><span className="fw-semibold text-dark">{schoolInfo.phones.join(', ')}</span></td>
                    </tr>
                  </tbody>
                </table>
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
                  <i className="fas fa-file-alt"></i>
                </span>
                <span>B. Documents and Information</span>
              </h4>
              <span className="disclosure-header-tag">Statutory Clearances</span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="custom-table mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: '80px', textAlign: 'center' }}>S.No.</th>
                      <th>Document / Information Description</th>
                      <th style={{ width: '220px', textAlign: 'center' }}>Upload Status / Verification</th>
                      <th style={{ width: '130px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-sno-badge">01</span>
                      </td>
                      <td>
                        <div className="doc-name-cell">
                          <span className="doc-name-icon">
                            <i className="fas fa-file-contract"></i>
                          </span>
                          <span>Copies of Trust / Society Registration Document</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-status-badge verified">
                          <i className="fas fa-check-circle"></i>
                          <span>Verified &amp; Active</span>
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => handleCertificateView('Trust Registration', 'Active & Valid')}
                          className="doc-verify-btn"
                          title="View Trust Registration verification"
                        >
                          <i className="fas fa-shield-alt"></i>
                          <span>Verify</span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-sno-badge">02</span>
                      </td>
                      <td>
                        <div className="doc-name-cell">
                          <span className="doc-name-icon">
                            <i className="fas fa-certificate"></i>
                          </span>
                          <span>No Objection Certificate (NOC) Issued by State Govt</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-status-badge verified">
                          <i className="fas fa-check-circle"></i>
                          <span>Granted</span>
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => handleCertificateView('State Govt NOC', 'Granted & Unconditional')}
                          className="doc-verify-btn"
                          title="View State Govt NOC verification"
                        >
                          <i className="fas fa-shield-alt"></i>
                          <span>Verify</span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-sno-badge">03</span>
                      </td>
                      <td>
                        <div className="doc-name-cell">
                          <span className="doc-name-icon">
                            <i className="fas fa-award"></i>
                          </span>
                          <span>Recognition Certificate under RTE Act, 2009</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-status-badge verified">
                          <i className="fas fa-check-circle"></i>
                          <span>Valid &amp; Renewed</span>
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => handleCertificateView('RTE Recognition', 'Valid & Renewed')}
                          className="doc-verify-btn"
                          title="View RTE Recognition verification"
                        >
                          <i className="fas fa-shield-alt"></i>
                          <span>Verify</span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-sno-badge">04</span>
                      </td>
                      <td>
                        <div className="doc-name-cell">
                          <span className="doc-name-icon">
                            <i className="fas fa-hotel"></i>
                          </span>
                          <span>Building Safety Certificate from Competent Authority</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-status-badge verified">
                          <i className="fas fa-check-circle"></i>
                          <span>Certified Safe</span>
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => handleCertificateView('Building Safety', 'Structural Engineer Certified')}
                          className="doc-verify-btn"
                          title="View Building Safety verification"
                        >
                          <i className="fas fa-shield-alt"></i>
                          <span>Verify</span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-sno-badge">05</span>
                      </td>
                      <td>
                        <div className="doc-name-cell">
                          <span className="doc-name-icon">
                            <i className="fas fa-fire-extinguisher"></i>
                          </span>
                          <span>Fire Safety Certificate issued by Fire Service Dept</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-status-badge verified">
                          <i className="fas fa-check-circle"></i>
                          <span>Certified Safe</span>
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => handleCertificateView('Fire Safety', 'Fire Department Certified')}
                          className="doc-verify-btn"
                          title="View Fire Safety verification"
                        >
                          <i className="fas fa-shield-alt"></i>
                          <span>Verify</span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-sno-badge">06</span>
                      </td>
                      <td>
                        <div className="doc-name-cell">
                          <span className="doc-name-icon">
                            <i className="fas fa-tint"></i>
                          </span>
                          <span>Safe Drinking Water &amp; Sanitary Conditions Certificate</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="doc-status-badge verified">
                          <i className="fas fa-check-circle"></i>
                          <span>Compliant (RO Water)</span>
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => handleCertificateView('Drinking Water & Sanitation', 'Laboratory Certified Potable')}
                          className="doc-verify-btn"
                          title="View Drinking Water & Sanitation verification"
                        >
                          <i className="fas fa-shield-alt"></i>
                          <span>Verify</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="custom-table mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>Designation</th>
                      <th style={{ width: '35%' }}>Name</th>
                      <th>Occupation / Background</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold text-dark">President / Chairman</td>
                      <td className="fw-semibold text-primary">Mr. Deepak Kumar</td>
                      <td>Educationist &amp; Social Worker</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-dark">Member Secretary (Ex-Officio)</td>
                      <td className="fw-semibold">Mrs. Sunita Sharma</td>
                      <td>Headmistress / Academician</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-dark">Parent Representative (Mother)</td>
                      <td>Mrs. Rashmi Kumari</td>
                      <td>Teacher &amp; Parent</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-dark">Parent Representative (Father)</td>
                      <td>Mr. Manoj Kumar Singh</td>
                      <td>Advocate &amp; Parent</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-dark">Teacher Representative</td>
                      <td>Mrs. Priya Kumari</td>
                      <td>Primary Faculty Member</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Section D: Staff (Teaching) */}
        {(activeTab === 'all' || activeTab === 'staff') && (
          <div className="disclosure-table-card">
            <div className="disclosure-card-header">
              <h4 className="disclosure-header-title">
                <span className="disclosure-header-icon">
                  <i className="fas fa-chalkboard-teacher"></i>
                </span>
                <span>D. Staff (Teaching) Details</span>
              </h4>
              <span className="disclosure-header-tag">Academic Faculty</span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="custom-table mb-0">
                  <tbody>
                    <tr>
                      <td className="disclosure-label-cell">Principal / Headmistress</td>
                      <td className="fw-bold text-dark">1</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Total Number of Teachers</td>
                      <td><span className="badge bg-primary text-white px-3 py-1 fw-bold">35+ Certified Educators</span></td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">PRT / Primary Teachers</td>
                      <td>18</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">NTT / Pre-Primary / Montessori Mentors</td>
                      <td>12</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Activity, Art, Music &amp; Physical Training</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Teachers Section Ratio</td>
                      <td><span className="badge bg-light text-primary border fw-bold px-3 py-1">1.5 : 1 (Personalized care)</span></td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Special Educator &amp; Child Psychologist</td>
                      <td>Appointed (Visiting Consultation)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Section E: Campus Infrastructure */}
        {(activeTab === 'all' || activeTab === 'infra') && (
          <div className="disclosure-table-card">
            <div className="disclosure-card-header">
              <h4 className="disclosure-header-title">
                <span className="disclosure-header-icon">
                  <i className="fas fa-building"></i>
                </span>
                <span>E. Campus Infrastructure</span>
              </h4>
              <span className="disclosure-header-tag">Facility Specifications</span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="custom-table mb-0">
                  <tbody>
                    <tr>
                      <td className="disclosure-label-cell">Total Campus Area (in Acres / Sq Mtrs)</td>
                      <td>Spacious Lush-Green Campus aloof from pollution</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Total Number of Classrooms</td>
                      <td><span className="badge bg-light text-primary border fw-bold px-3 py-1">20+ Classrooms</span> (Air-conditioned, digital smart boards)</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Montessori Play Station &amp; Activity Room</td>
                      <td>Available (Non-toxic indoor play equipment)</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Science Discovery Corner &amp; Lab</td>
                      <td>Equipped with early STEM experiment sets</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Computer &amp; Digital Lab</td>
                      <td>Available with high-speed internet &amp; child ergonomic seating</td>
                    </tr>
                    <tr>
                      <td className="disclosure-label-cell">Toilets (Separate for Boys &amp; Girls)</td>
                      <td>Clean, child-height sanitized washrooms with female attendants</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
