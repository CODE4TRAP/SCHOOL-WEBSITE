import React from 'react';

/**
 * OfficialAdmissionSlip Component
 * Faithfully reproduces the official physical "Re-Admission Form / Admission Slip"
 * of Swami Shiwanand Academy & Kids Play School.
 */
export default function OfficialAdmissionSlip({ data = {}, formTitle = "Re-Admission Form" }) {
  if (!data) return null;

  const appNo = data.appNumber || data.appNo || 'SSKPS-2026-PENDING';
  const filingDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : data.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Format DOB if needed
  const formattedDob = data.dob || '—';

  return (
    <div className="official-physical-slip" id="officialAdmissionSlip">
      {/* ─── HEADER ─── */}
      <div className="ops-header">
        <div className="ops-header-logo-left">
          <img src="/images/logo.png" alt="School Logo" className="ops-logo-img" />
        </div>

        <div className="ops-header-center">
          <h1 className="ops-school-title">SWAMI SHIWANAND ACADEMY</h1>
          <h2 className="ops-school-subtitle">&amp; KIDS PLAY SCHOOL</h2>
          <div className="ops-school-affiliation">
            <span>Affiliated &amp; Registered &bull; Sasaram, Rohtas (Bihar)</span>
          </div>
        </div>

        <div className="ops-header-logo-right">
          <div className="ops-emblem-badge">
            <span className="material-symbols-outlined ops-emblem-icon">school</span>
            <span className="ops-emblem-text">ESTD 2009</span>
          </div>
        </div>
      </div>

      {/* ─── FORM BANNER ─── */}
      <div className="ops-banner-box">
        <span className="ops-banner-title">{formTitle}</span>
      </div>

      {/* ─── DATE & NO ROW ─── */}
      <div className="ops-meta-row">
        <div className="ops-meta-item">
          <span className="ops-meta-label">Date :</span>
          <span className="ops-meta-value">{filingDate}</span>
        </div>
        <div className="ops-meta-item text-end">
          <span className="ops-meta-label">No. :</span>
          <span className="ops-meta-value ops-app-no">{appNo}</span>
        </div>
      </div>

      {/* ─── FORM FIELDS (Ruled Underline Design matching physical paper) ─── */}
      <div className="ops-fields-body">
        {/* Field 1: Name of the Students */}
        <div className="ops-field-row">
          <span className="ops-label">Name Of the Students :</span>
          <span className="ops-value full-line ops-highlight-name">{data.studentName || ''}</span>
        </div>

        {/* Field 2: Class applied for */}
        <div className="ops-field-row">
          <span className="ops-label">Class applied for :</span>
          <span className="ops-value full-line">{data.applyingClass || ''}</span>
        </div>

        {/* Field 3: Date of Birth & Age */}
        <div className="ops-field-row ops-multi-col">
          <div className="ops-sub-col" style={{ flex: '1.2' }}>
            <span className="ops-label">Date of Birth :</span>
            <span className="ops-value">{formattedDob}</span>
          </div>
          <div className="ops-sub-col" style={{ flex: '1.8' }}>
            <span className="ops-label">Age (on last April 2026) :</span>
            <span className="ops-age-slot">
              Day: <strong className="ops-sub-val">{data.ageDay || '—'}</strong>
            </span>
            <span className="ops-age-slot">
              Month: <strong className="ops-sub-val">{data.ageMonth || '—'}</strong>
            </span>
            <span className="ops-age-slot">
              Year: <strong className="ops-sub-val">{data.ageYear || '—'}</strong>
            </span>
          </div>
        </div>

        {/* Field 4: Current School & Current Standard */}
        <div className="ops-field-row ops-multi-col">
          <div className="ops-sub-col" style={{ flex: '1.8' }}>
            <span className="ops-label">Current School :</span>
            <span className="ops-value">{data.currentSchool || data.previousSchool || '—'}</span>
          </div>
          <div className="ops-sub-col" style={{ flex: '1.2' }}>
            <span className="ops-label">Current Standard :</span>
            <span className="ops-value">{data.currentStandard || '—'}</span>
          </div>
        </div>

        {/* Field 5: Mother's Name */}
        <div className="ops-field-row">
          <span className="ops-label">Mother's Name :</span>
          <span className="ops-value full-line">{data.motherName || ''}</span>
        </div>

        {/* Field 6: Father's Name */}
        <div className="ops-field-row">
          <span className="ops-label">Father's Name :</span>
          <span className="ops-value full-line">{data.fatherName || ''}</span>
        </div>

        {/* Field 7: Caste, Category, Religion */}
        <div className="ops-field-row ops-multi-col">
          <div className="ops-sub-col" style={{ flex: '1' }}>
            <span className="ops-label">Caste :-</span>
            <span className="ops-value">{data.caste || '—'}</span>
          </div>
          <div className="ops-sub-col" style={{ flex: '1' }}>
            <span className="ops-label">Category :-</span>
            <span className="ops-value">{data.category || '—'}</span>
          </div>
          <div className="ops-sub-col" style={{ flex: '1' }}>
            <span className="ops-label">Religion :-</span>
            <span className="ops-value">{data.religion || '—'}</span>
          </div>
        </div>

        {/* Field 8: Blood Group & BPL */}
        <div className="ops-field-row ops-multi-col">
          <div className="ops-sub-col" style={{ flex: '1' }}>
            <span className="ops-label">Blood Group :-</span>
            <span className="ops-value">{data.bloodGroup || '—'}</span>
          </div>
          <div className="ops-sub-col" style={{ flex: '1.5' }}>
            <span className="ops-label">Do You Belong to BPL [Yes/No] :-</span>
            <span className="ops-value">{data.bpl || 'No'}</span>
          </div>
        </div>

        {/* Field 9: Permanent Address */}
        <div className="ops-field-row">
          <span className="ops-label">Permanent Address :</span>
          <span className="ops-value full-line">{data.permanentAddress || data.address || ''}</span>
        </div>

        {/* Field 10: Current Address */}
        <div className="ops-field-row">
          <span className="ops-label">Current Address :</span>
          <span className="ops-value full-line">{data.currentAddress || data.address || ''}</span>
        </div>

        {/* Field 11: Contact No. (1) Mother, (2) Father */}
        <div className="ops-field-row ops-multi-col">
          <div className="ops-sub-col" style={{ flex: '1' }}>
            <span className="ops-label">Contact No. (1) Mother :-</span>
            <span className="ops-value">{data.motherContact || data.mobile || '—'}</span>
          </div>
          <div className="ops-sub-col" style={{ flex: '1' }}>
            <span className="ops-label">(2) Father :-</span>
            <span className="ops-value">{data.fatherContact || data.mobile || '—'}</span>
          </div>
        </div>

        {/* Field 12: Whatsapp No & Email Address */}
        <div className="ops-field-row ops-multi-col">
          <div className="ops-sub-col" style={{ flex: '1' }}>
            <span className="ops-label">Whatsapp No :-</span>
            <span className="ops-value">{data.whatsapp || data.mobile || '—'}</span>
          </div>
          <div className="ops-sub-col" style={{ flex: '1' }}>
            <span className="ops-label">E-mail Address :-</span>
            <span className="ops-value">{data.email || '—'}</span>
          </div>
        </div>
      </div>

      {/* ─── 3 PHOTO BOXES (Student, Father, Mother) ─── */}
      <div className="ops-photos-grid">
        <div className="ops-photo-box">
          <div className="ops-photo-inner">
            <span className="ops-pb-line">Paste</span>
            <span className="ops-pb-line">Passport</span>
            <span className="ops-pb-line">Size</span>
            <span className="ops-pb-line">Photo</span>
            <span className="ops-pb-sub">(Student)</span>
          </div>
        </div>

        <div className="ops-photo-box">
          <div className="ops-photo-inner">
            <span className="ops-pb-line">Paste</span>
            <span className="ops-pb-line">Passport</span>
            <span className="ops-pb-line">Size</span>
            <span className="ops-pb-line">Photo</span>
            <span className="ops-pb-sub">(Father)</span>
          </div>
        </div>

        <div className="ops-photo-box">
          <div className="ops-photo-inner">
            <span className="ops-pb-line">Paste</span>
            <span className="ops-pb-line">Passport</span>
            <span className="ops-pb-line">Size</span>
            <span className="ops-pb-line">Photo</span>
            <span className="ops-pb-sub">(Mother)</span>
          </div>
        </div>
      </div>

      {/* ─── DECLARATION ─── */}
      <div className="ops-declaration-row">
        <span>Declaration :- I hereby declare that above mentioned all information are correct.</span>
      </div>

      {/* ─── SIGNATURES & BOTTOM ROW ─── */}
      <div className="ops-signatures-row">
        <div className="ops-sig-col-left">
          <span>Date : <strong className="ops-date-fill">{filingDate}</strong></span>
        </div>

        <div className="ops-sig-col-right">
          <div className="ops-sig-line"></div>
          <span className="ops-sig-label">Signature of Parent / Guardian</span>
        </div>
      </div>

      {/* ─── OFFICIAL OFFICE WATERMARK / DESK VERIFICATION (Optional Sub-strip) ─── */}
      <div className="ops-office-verification-strip">
        <div className="ops-ov-left">
          <span className="ops-ov-badge">OFFICIAL ADMISSION DESK &bull; DATABASE RECORD</span>
          <span className="ops-ov-meta">
            Transport Opted: <strong>{data.transportNeeded || 'No'}</strong> &bull; Status: <strong>{data.status || 'Pending'}</strong>
          </span>
        </div>
        <div className="ops-ov-right">
          <span>Registrar / Principal Signature</span>
        </div>
      </div>
    </div>
  );
}
