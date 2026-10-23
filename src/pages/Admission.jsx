import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { feeStructure, schoolInfo } from '../data/content';
import { db } from '../firebase';
import { collection, addDoc, getCountFromServer, serverTimestamp } from 'firebase/firestore';

export const GRADE_OPTIONS = [
  {
    id: 'Playgroup',
    title: 'Playgroup',
    subtitle: 'Pre-Nursery',
    age: '2 – 3 Yrs',
    tuition: '₹800/mo',
    wing: 'Pre-Primary Early Foundation',
    feeKey: 'Playgroup (Pre-Nursery)',
    formClass: 'Playgroup'
  },
  {
    id: 'Nursery',
    title: 'Nursery',
    subtitle: 'Foundation',
    age: '3 – 4 Yrs',
    tuition: '₹900/mo',
    wing: 'Pre-Primary Early Foundation',
    feeKey: 'Nursery',
    formClass: 'Nursery'
  },
  {
    id: 'LKG',
    title: 'LKG',
    subtitle: 'Jr. KG',
    age: '4 – 5 Yrs',
    tuition: '₹1,000/mo',
    wing: 'Kindergarten Early Years',
    feeKey: 'LKG (Lower Kindergarten)',
    formClass: 'LKG'
  },
  {
    id: 'UKG',
    title: 'UKG',
    subtitle: 'Sr. KG',
    age: '5 – 6 Yrs',
    tuition: '₹1,100/mo',
    wing: 'Kindergarten Early Years',
    feeKey: 'UKG (Upper Kindergarten)',
    formClass: 'UKG'
  },
  {
    id: 'Std I',
    title: 'Std I',
    subtitle: 'Grade 1',
    age: '6+ Yrs',
    tuition: '₹1,250/mo',
    wing: 'Primary Foundation Wing',
    feeKey: 'Std I (Grade 1)',
    formClass: 'Std I'
  },
  {
    id: 'Std II',
    title: 'Std II to VI',
    subtitle: 'Classes 2–6',
    age: '7 – 11+ Yrs',
    tuition: '₹1,400/mo',
    wing: 'Primary & Middle Wing',
    feeKey: 'Std II to Std VI',
    formClass: 'Std II'
  }
];

export default function Admission() {
  const [formData, setFormData] = useState({
    studentName: '',
    applyingClass: '',
    dob: '',
    ageDay: '',
    ageMonth: '',
    ageYear: '',
    gender: '',
    currentSchool: '',
    currentStandard: '',
    previousSchool: '',
    motherName: '',
    fatherName: '',
    caste: '',
    category: 'General',
    religion: 'Hindu',
    bloodGroup: '',
    bpl: 'No',
    permanentAddress: '',
    currentAddress: '',
    address: '',
    motherContact: '',
    fatherContact: '',
    mobile: '',
    whatsapp: '',
    email: '',
    transportNeeded: 'No'
  });

  const [sameAddress, setSameAddress] = useState(true);
  const [submittedReceipt, setSubmittedReceipt] = useState(null);
  const [calculatedAge, setCalculatedAge] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Quick Fee Estimator State
  const [estimatorClass, setEstimatorClass] = useState('Nursery');
  const [includeTransport, setIncludeTransport] = useState(false);
  const [quickAppliedNotice, setQuickAppliedNotice] = useState(null);

  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const birthDate = new Date(dobString);
    const targetDate = new Date('2026-04-01'); // As per official form: "Age on last April"
    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();
    if (days < 0) {
      months--;
      days += 30;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    let recommendation = '';
    if (years >= 2 && years < 3) recommendation = 'Playgroup';
    else if (years >= 3 && years < 4) recommendation = 'Nursery';
    else if (years >= 4 && years < 5) recommendation = 'LKG';
    else if (years >= 5 && years < 6) recommendation = 'UKG';
    else if (years >= 6) recommendation = 'Std I to VI';
    else recommendation = 'Under 2 years (Parent Infant Club)';

    return {
      days: Math.max(0, days),
      months: Math.max(0, months),
      years: Math.max(0, years),
      recommendation
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };

      // Address mirroring
      if (sameAddress && name === 'permanentAddress') {
        updated.currentAddress = value;
        updated.address = value;
      }
      if (name === 'currentAddress') {
        updated.address = value;
      }

      // Sync mobile with father or mother contact if mobile isn't explicitly set
      if ((name === 'fatherContact' || name === 'motherContact') && !prev.mobile) {
        updated.mobile = value;
      }

      return updated;
    });

    if (name === 'dob') {
      const ageInfo = calculateAge(value);
      setCalculatedAge(ageInfo);
      if (ageInfo) {
        setFormData(prev => ({
          ...prev,
          dob: value,
          ageDay: String(ageInfo.days),
          ageMonth: String(ageInfo.months),
          ageYear: String(ageInfo.years)
        }));
      }
    }
  };

  const handleSameAddressToggle = (e) => {
    const checked = e.target.checked;
    setSameAddress(checked);
    if (checked) {
      setFormData(prev => ({
        ...prev,
        currentAddress: prev.permanentAddress,
        address: prev.permanentAddress
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    let appNumber = `SSKPS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const submissionData = {
      ...formData,
      address: formData.currentAddress || formData.permanentAddress || formData.address || '',
      mobile: formData.mobile || formData.fatherContact || formData.motherContact || ''
    };

    try {
      // 1. Calculate sequential application number via Firestore
      try {
        const snapshot = await getCountFromServer(collection(db, 'admissions'));
        const count = snapshot.data().count;
        appNumber = `SSKPS-2026-${String(count + 1001).padStart(4, '0')}`;
      } catch {
        // fallback random number already generated
      }

      // 2. Save directly to Cloud Firestore
      await addDoc(collection(db, 'admissions'), {
        ...submissionData,
        appNumber,
        status: 'Pending',
        notes: '',
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      });

      // 3. Only on real success show confirmation
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback
      }

      setSubmittedReceipt({
        appNumber,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        ...submissionData
      });
    } catch (err) {
      console.error('Firestore save failed:', err);
      if (err.code === 'permission-denied') {
        setSubmitError('Permission Denied by Firestore: Security rules in Firebase Console must be set to allow writes. Please publish rules in Firebase Console.');
      } else {
        setSubmitError(`Failed to save application: ${err.message || 'Please check your internet connection.'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedReceipt(null);
    setCalculatedAge(null);
    setFormData({
      studentName: '',
      applyingClass: '',
      dob: '',
      ageDay: '',
      ageMonth: '',
      ageYear: '',
      gender: '',
      currentSchool: '',
      currentStandard: '',
      previousSchool: '',
      motherName: '',
      fatherName: '',
      caste: '',
      category: 'General',
      religion: 'Hindu',
      bloodGroup: '',
      bpl: 'No',
      permanentAddress: '',
      currentAddress: '',
      address: '',
      motherContact: '',
      fatherContact: '',
      mobile: '',
      whatsapp: '',
      email: '',
      transportNeeded: 'No'
    });
  };

  // Estimator calculation with exact class resolution
  const currentGrade = GRADE_OPTIONS.find(g => g.id === estimatorClass) || GRADE_OPTIONS[1];
  const selectedFee = feeStructure.find(f => {
    if (currentGrade.feeKey) return f.class === currentGrade.feeKey;
    return f.class.toLowerCase().includes(estimatorClass.toLowerCase());
  }) || feeStructure[1];

  const baseAdmissionNum = parseInt(selectedFee.admissionFee.replace(/[^0-9]/g, '')) || 2800;
  const baseTuitionNum = parseInt(selectedFee.tuitionMonthly.replace(/[^0-9]/g, '')) || 900;
  const examAnnualNum = parseInt(selectedFee.examAnnual?.replace(/[^0-9]/g, '')) || 600;
  const activityAnnualNum = parseInt(selectedFee.activityAnnual?.replace(/[^0-9]/g, '')) || 700;
  const transportCost = includeTransport ? 600 : 0;
  const firstMonthTotal = baseAdmissionNum + baseTuitionNum + transportCost;
  const monthlyRecurringTotal = baseTuitionNum + transportCost;

  const handleProceedWithAdmission = (targetClass, transportOpted) => {
    const selectedOption = GRADE_OPTIONS.find(g => g.id === targetClass);
    const formClassValue = selectedOption ? selectedOption.formClass : targetClass;
    setFormData(prev => ({
      ...prev,
      applyingClass: formClassValue,
      transportNeeded: transportOpted ? 'Yes' : 'No'
    }));
    setQuickAppliedNotice(`Applied "${selectedOption?.title || targetClass}" and ${transportOpted ? 'Transport (School Bus: Yes)' : 'Transport (Self Conveyance)'} to your registration form below.`);
    const formEl = document.getElementById('form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* M3 Page Header in Separate Structured Boxes */}
      <div className="m3-page-header">
        <div className="container">
          <div className="m3-header-container">
            {/* Badges in Separate Box */}
            <div className="m3-header-badges-box">
              <span className="m3-badge m3-badge-tonal">
                <span className="material-symbols-outlined fs-6">school</span> Session 2026–27
              </span>
              <span className="m3-badge m3-badge-amber">
                <span className="material-symbols-outlined fs-6">how_to_reg</span> Online Registration
              </span>
            </div>

            {/* Title in Separate Box */}
            <div className="m3-header-title-box">
              <h2 className="m3-page-header-title mb-0">Admissions &amp; Enrollment (2026–27)</h2>
            </div>

            {/* Breadcrumb in Separate Box */}
            <div className="m3-header-breadcrumb-box">
              <nav aria-label="breadcrumb">
                <ol className="m3-breadcrumb">
                  <li>
                    <Link to="/">
                      <span className="material-symbols-outlined fs-6 me-1">home</span>Home
                    </Link>
                    <span>/</span>
                  </li>
                  <li className="active">Admission</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Main Content Column */}
          <div className="col-lg-8">
            {/* Online Registration Portal Console */}
            <section id="form" className="portal-console-card">
              {/* Portal Console Header */}
              <div className="portal-console-header">
                <div className="portal-header-top-row">
                  <div className="portal-brand-block">
                    <div className="portal-icon-halo">
                      <span className="material-symbols-outlined fs-2">how_to_reg</span>
                    </div>
                    <div>
                      <h3 className="portal-header-title">Online Student Registration Portal</h3>
                      <p className="portal-header-subtitle">
                        Official admission enrollment application for Playgroup to Class VI &bull; Session 2026–27
                      </p>
                    </div>
                  </div>

                  <div className="portal-status-cluster">
                    <span className="portal-live-chip">
                      <span className="pulse-dot"></span>
                      Portal Active
                    </span>
                    <span className="portal-session-chip">
                      <span className="material-symbols-outlined fs-6">calendar_today</span>
                      2026–27
                    </span>
                  </div>
                </div>
              </div>

              {/* Portal Steps Stepper */}
              <div className="portal-steps-nav">
                <div className="portal-step-pill active">
                  <span className="step-circle">1</span>
                  <span>Student Details</span>
                </div>
                <div className="portal-step-pill active">
                  <span className="step-circle">2</span>
                  <span>Parent &amp; Contact</span>
                </div>
                <div className="portal-step-pill active">
                  <span className="step-circle">3</span>
                  <span>Address &amp; Submit</span>
                </div>
              </div>

              <div className="card-body p-4 p-md-5">
                {submittedReceipt ? (
                  <div className="text-center">
                    <div style={{ width: '68px', height: '68px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '2rem', boxShadow: '0 4px 16px rgba(22, 163, 74, 0.25)' }}>
                      <span className="material-symbols-outlined fs-2">verified</span>
                    </div>
                    <h3 className="fw-bold text-success mb-2">Registration Saved in Central Database!</h3>
                    <p className="text-muted small mb-4" style={{ maxWidth: '680px', margin: '0 auto 20px auto', lineHeight: '1.7' }}>
                      Thank you for applying to <strong>{schoolInfo.name}</strong>. Your registration is permanently stored in our central admissions database under Application Number: <strong className="text-primary">{submittedReceipt.appNumber}</strong>. School Administration has direct access to your details for verification and seat allotment.
                    </p>

                    {/* Application Details Summary Box */}
                    <div className="card border-0 shadow-sm p-4 text-start my-4" style={{ background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 pb-3 border-bottom">
                        <div>
                          <span className="text-muted small text-uppercase fw-bold">Permanent Application Number</span>
                          <h4 className="fw-bold text-primary mb-0">{submittedReceipt.appNumber}</h4>
                        </div>
                        <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 fw-bold">
                          ✓ Saved in Central Database
                        </span>
                      </div>
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <span className="text-muted small">Candidate Name:</span>
                          <div className="fw-bold text-dark">{submittedReceipt.studentName}</div>
                        </div>
                        <div className="col-12 col-md-6">
                          <span className="text-muted small">Class Applying For:</span>
                          <div className="fw-bold text-dark">{submittedReceipt.applyingClass}</div>
                        </div>
                        <div className="col-12 col-md-6">
                          <span className="text-muted small">Father's Name:</span>
                          <div className="fw-bold text-dark">{submittedReceipt.fatherName}</div>
                        </div>
                        <div className="col-12 col-md-6">
                          <span className="text-muted small">Registered Contact:</span>
                          <div className="fw-bold text-dark">{submittedReceipt.mobile}</div>
                        </div>
                      </div>
                    </div>

                    {/* Fast-Track WhatsApp Desk (Direct database record lookup) */}
                    <div className="whatsapp-drop-card text-start my-4">
                      <div className="d-flex align-items-start gap-3 flex-wrap flex-md-nowrap">
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#22c55e', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(34, 197, 94, 0.35)' }}>
                          <i className="fab fa-whatsapp fa-2x"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <h5 className="fw-bold text-dark mb-1" style={{ color: '#14532d' }}>Instant Confirmation via WhatsApp Desk</h5>
                            <span className="badge bg-success text-white px-2 py-1 small">Official Admissions Desk</span>
                          </div>
                          <p className="small text-muted mb-3" style={{ lineHeight: '1.65' }}>
                            Your application is directly recorded in our database. You can instantly notify our school admissions desk (<strong className="text-dark">+91 94310 68033</strong>) with your <strong>Application Number ({submittedReceipt.appNumber})</strong> for rapid seat confirmation and interaction scheduling.
                          </p>
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <a
                              href={`https://wa.me/919431068033?text=${encodeURIComponent(`Hello Swami Shiwanand Academy,\n\nI have registered my ward for Admission 2026-27.\n\n• Application No: ${submittedReceipt.appNumber}\n• Candidate Name: ${submittedReceipt.studentName}\n• Class Applying For: ${submittedReceipt.applyingClass}\n• Father's Name: ${submittedReceipt.fatherName}\n• Contact: ${submittedReceipt.mobile}\n\nMy details are saved in your database. Please confirm receipt and schedule our interaction.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-success fw-bold d-inline-flex align-items-center gap-2 px-4 py-2"
                              style={{ background: '#16a34a', borderColor: '#16a34a' }}
                            >
                              <i className="fab fa-whatsapp fs-5"></i>
                              <span>Notify Admissions Desk on WhatsApp</span>
                            </a>
                            <a
                              href="tel:+919431068033"
                              className="btn btn-outline-success fw-bold d-inline-flex align-items-center gap-2 px-3 py-2"
                            >
                              <span className="material-symbols-outlined fs-6">call</span>
                              <span>+91 94310 68033</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
                      <button
                        onClick={resetForm}
                        className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
                      >
                        <span className="material-symbols-outlined fs-6">add_circle</span> Submit Another Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-muted small mb-4">
                      Please fill in the candidate and parent details accurately. After submission, your application is saved directly into our central admissions database, and our admission office will contact you for interaction scheduling.
                    </p>

                    {quickAppliedNotice && (
                      <div className="alert alert-success d-flex align-items-center justify-content-between py-2 px-3 mb-4 rounded-3 border-success-subtle shadow-sm">
                        <div className="d-flex align-items-center gap-2">
                          <span className="material-symbols-outlined text-success">check_circle</span>
                          <span className="small fw-semibold text-dark">{quickAppliedNotice}</span>
                        </div>
                        <button
                          type="button"
                          className="btn-close btn-sm"
                          aria-label="Close"
                          onClick={() => setQuickAppliedNotice(null)}
                        ></button>
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      {/* Cluster 1: Student / Candidate Information */}
                      <div className="portal-field-cluster">
                        <div className="portal-cluster-heading">
                          <span className="material-symbols-outlined">badge</span>
                          <span>1. Candidate / Student Information</span>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Name of the Student <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              name="studentName"
                              className="form-control"
                              required
                              placeholder="Full name of student as per Aadhaar / Birth Cert"
                              value={formData.studentName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Class Applied For <span className="text-danger">*</span></label>
                            <select
                              name="applyingClass"
                              className="form-select"
                              required
                              value={formData.applyingClass}
                              onChange={handleChange}
                            >
                              <option value="">Select Class</option>
                              <option value="Playgroup">Playgroup (Age 2+ yrs)</option>
                              <option value="Nursery">Nursery (Age 3+ yrs)</option>
                              <option value="LKG">LKG - Lower Kindergarten (Age 4+ yrs)</option>
                              <option value="UKG">UKG - Upper Kindergarten (Age 5+ yrs)</option>
                              <option value="Std I">Std I (Grade 1)</option>
                              <option value="Std II">Std II (Grade 2)</option>
                              <option value="Std III">Std III (Grade 3)</option>
                              <option value="Std IV">Std IV (Grade 4)</option>
                              <option value="Std V">Std V (Grade 5)</option>
                              <option value="Std VI">Std VI (Grade 6)</option>
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                            <input
                              type="date"
                              name="dob"
                              className="form-control"
                              required
                              value={formData.dob}
                              onChange={handleChange}
                            />
                            {calculatedAge && (
                              <div className="small text-success mt-1 fw-semibold">
                                <i className="fas fa-info-circle me-1"></i> Age as on 01-Apr-2026: {calculatedAge.years} yrs, {calculatedAge.months} mos, {calculatedAge.days} days &bull; Recommended: <strong>{calculatedAge.recommendation}</strong>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Age (as of 1st April 2026)</label>
                            <div className="d-flex gap-2">
                              <div className="input-group input-group-sm">
                                <span className="input-group-text">Day</span>
                                <input
                                  type="text"
                                  name="ageDay"
                                  className="form-control"
                                  placeholder="DD"
                                  value={formData.ageDay}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="input-group input-group-sm">
                                <span className="input-group-text">Month</span>
                                <input
                                  type="text"
                                  name="ageMonth"
                                  className="form-control"
                                  placeholder="MM"
                                  value={formData.ageMonth}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="input-group input-group-sm">
                                <span className="input-group-text">Year</span>
                                <input
                                  type="text"
                                  name="ageYear"
                                  className="form-control"
                                  placeholder="YY"
                                  value={formData.ageYear}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <label className="form-label">Gender <span className="text-danger">*</span></label>
                            <select
                              name="gender"
                              className="form-select"
                              required
                              value={formData.gender}
                              onChange={handleChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Boy (Male)</option>
                              <option value="Female">Girl (Female)</option>
                            </select>
                          </div>

                          <div className="col-md-4">
                            <label className="form-label">Current / Previous School</label>
                            <input
                              type="text"
                              name="currentSchool"
                              className="form-control"
                              placeholder="Name of school previously attended"
                              value={formData.currentSchool}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
                            <label className="form-label">Current Standard</label>
                            <input
                              type="text"
                              name="currentStandard"
                              className="form-control"
                              placeholder="e.g. Nursery / LKG / Class 1"
                              value={formData.currentStandard}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Cluster 2: Parent / Guardian Information */}
                      <div className="portal-field-cluster">
                        <div className="portal-cluster-heading">
                          <span className="material-symbols-outlined">family_restroom</span>
                          <span>2. Parent &amp; Guardian Information</span>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Mother's Name <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              name="motherName"
                              className="form-control"
                              required
                              placeholder="Full name of mother"
                              value={formData.motherName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Father's Name <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              name="fatherName"
                              className="form-control"
                              required
                              placeholder="Full name of father"
                              value={formData.fatherName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Contact No. (1) Mother</label>
                            <input
                              type="tel"
                              name="motherContact"
                              className="form-control"
                              placeholder="Mother's mobile number"
                              value={formData.motherContact}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Contact No. (2) Father / Primary Mobile <span className="text-danger">*</span></label>
                            <input
                              type="tel"
                              name="fatherContact"
                              className="form-control"
                              required
                              placeholder="10-digit primary mobile number"
                              value={formData.fatherContact || formData.mobile}
                              onChange={(e) => {
                                handleChange(e);
                                setFormData(p => ({ ...p, mobile: e.target.value }));
                              }}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">WhatsApp Number</label>
                            <input
                              type="tel"
                              name="whatsapp"
                              className="form-control"
                              placeholder="WhatsApp number for updates"
                              value={formData.whatsapp}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">E-mail Address</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="e.g. parent@email.com"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Cluster 3: Social & Demographic Information */}
                      <div className="portal-field-cluster">
                        <div className="portal-cluster-heading">
                          <span className="material-symbols-outlined">diversity_3</span>
                          <span>3. Category, Religion &amp; Demographics</span>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label className="form-label">Caste</label>
                            <input
                              type="text"
                              name="caste"
                              className="form-control"
                              placeholder="e.g. General, Kurmi, etc."
                              value={formData.caste}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
                            <label className="form-label">Category</label>
                            <select
                              name="category"
                              className="form-select"
                              value={formData.category}
                              onChange={handleChange}
                            >
                              <option value="General">General</option>
                              <option value="OBC">OBC</option>
                              <option value="SC">SC</option>
                              <option value="ST">ST</option>
                              <option value="EWS">EWS</option>
                            </select>
                          </div>

                          <div className="col-md-4">
                            <label className="form-label">Religion</label>
                            <select
                              name="religion"
                              className="form-select"
                              value={formData.religion}
                              onChange={handleChange}
                            >
                              <option value="Hindu">Hindu</option>
                              <option value="Muslim">Muslim</option>
                              <option value="Christian">Christian</option>
                              <option value="Sikh">Sikh</option>
                              <option value="Jain">Jain</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Blood Group</label>
                            <select
                              name="bloodGroup"
                              className="form-select"
                              value={formData.bloodGroup}
                              onChange={handleChange}
                            >
                              <option value="">Select Blood Group</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Do You Belong to BPL [Yes/No]?</label>
                            <select
                              name="bpl"
                              className="form-select"
                              value={formData.bpl}
                              onChange={handleChange}
                            >
                              <option value="No">No</option>
                              <option value="Yes">Yes (Below Poverty Line)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Cluster 4: Residential Address & Transport */}
                      <div className="portal-field-cluster">
                        <div className="portal-cluster-heading">
                          <span className="material-symbols-outlined">home_pin</span>
                          <span>4. Residence &amp; Transport Preferences</span>
                        </div>
                        <div className="row g-3">
                          <div className="col-12">
                            <label className="form-label">Permanent Address <span className="text-danger">*</span></label>
                            <textarea
                              name="permanentAddress"
                              className="form-control"
                              rows="2"
                              required
                              placeholder="Full permanent village / town address with district & PIN"
                              value={formData.permanentAddress}
                              onChange={handleChange}
                            ></textarea>
                          </div>

                          <div className="col-12">
                            <div className="form-check my-1">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="sameAddressCheck"
                                checked={sameAddress}
                                onChange={handleSameAddressToggle}
                              />
                              <label className="form-check-label small fw-semibold text-dark" htmlFor="sameAddressCheck">
                                Current address is same as permanent address
                              </label>
                            </div>
                          </div>

                          {!sameAddress && (
                            <div className="col-12">
                              <label className="form-label">Current Address</label>
                              <textarea
                                name="currentAddress"
                                className="form-control"
                                rows="2"
                                placeholder="Current residence address in Sasaram / nearby area"
                                value={formData.currentAddress}
                                onChange={handleChange}
                              ></textarea>
                            </div>
                          )}

                          <div className="col-md-12">
                            <label className="form-label">School Transport Facility Required?</label>
                            <select
                              name="transportNeeded"
                              className="form-select"
                              value={formData.transportNeeded}
                              onChange={handleChange}
                            >
                              <option value="No">No (Self Conveyance / Pickup &amp; Drop)</option>
                              <option value="Yes - School Bus/Van">Yes - School Bus / Van Service</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Submission Hub */}
                      <div className="admission-submit-hub">
                        {/* Declaration Notice matching physical form */}
                        <div className="submission-declaration-box">
                          <span className="material-symbols-outlined decl-icon">verified_user</span>
                          <div className="submission-declaration-text">
                            <strong className="text-dark">Official Applicant Declaration:</strong> I hereby declare that all student, parent, and demographic information mentioned above are correct and authentic. The application will be stored directly into the school admissions database.
                          </div>
                        </div>

                        {submitError && (
                          <div className="alert alert-danger d-flex align-items-center gap-2 mb-3 shadow-sm py-3 px-4 rounded-3 border-danger-subtle">
                            <span className="material-symbols-outlined text-danger fs-4">error</span>
                            <div className="small fw-semibold">{submitError}</div>
                          </div>
                        )}

                        {/* Master Submit Button */}
                        <button
                          type="submit"
                          className="admission-master-submit-btn"
                          disabled={isSubmitting}
                          style={{ opacity: isSubmitting ? 0.8 : 1, cursor: isSubmitting ? 'wait' : 'pointer' }}
                        >
                          <div className="btn-left-content">
                            <div className="btn-icon-bubble">
                              <span className="material-symbols-outlined fs-4">{isSubmitting ? 'hourglass_top' : 'send'}</span>
                            </div>
                            <div>
                              <div className="btn-title-main">
                                {isSubmitting ? 'Saving to Database...' : 'Submit Registration (Direct Database Save)'}
                              </div>
                              <div className="btn-title-sub">Instant central database registration &bull; Admin direct review</div>
                            </div>
                          </div>

                          <div className="btn-session-badge">
                            <span className="material-symbols-outlined fs-6" style={{ fontSize: '15px' }}>school</span>
                            <span>Session 2026–27</span>
                          </div>
                        </button>

                        {/* 3 Guarantees Row (No PDF download required) */}
                        <div className="submission-guarantees-grid">
                          <div className="submission-guarantee-chip">
                            <div className="guarantee-chip-icon green">
                              <span className="material-symbols-outlined fs-5">lock</span>
                            </div>
                            <div>
                              <div className="guarantee-chip-title">256-Bit SSL Encrypted</div>
                              <div className="guarantee-chip-sub">Direct secure database save</div>
                            </div>
                          </div>

                          <div className="submission-guarantee-chip">
                            <div className="guarantee-chip-icon blue">
                              <span className="material-symbols-outlined fs-5">database</span>
                            </div>
                            <div>
                              <div className="guarantee-chip-title">Central Database Entry</div>
                              <div className="guarantee-chip-sub">Admin checks details instantly</div>
                            </div>
                          </div>

                          <div className="submission-guarantee-chip">
                            <div className="guarantee-chip-icon amber">
                              <span className="material-symbols-outlined fs-5">verified</span>
                            </div>
                            <div>
                              <div className="guarantee-chip-title">Deepkiran Trust Direct</div>
                              <div className="guarantee-chip-sub">Verified institutional registry</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </section>

            {/* Interactive Fee Estimator Widget */}
            <div className="section-header-box mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: '#0b57d0' }}>
                  <span className="material-symbols-outlined">calculate</span>
                </div>
                <div>
                  <h3 className="header-title">Quick Fee Estimator (Session 2026–27)</h3>
                  <p className="header-subtitle">
                    Select your child's grade and optional transport to calculate instant monthly and admission fee breakdown.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Fee Estimator Console Card */}
            <div className="estimator-console-card">
              <div className="estimator-console-header">
                <div className="d-flex align-items-center gap-3">
                  <div className="estimator-header-icon-box">
                    <span className="material-symbols-outlined">calculate</span>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="estimator-header-sub">
                        FINANCIAL CALCULATOR • SESSION 2026–27
                      </span>
                      <span className="estimator-pill-cbse">CBSE Scale</span>
                    </div>
                    <h4 className="estimator-header-title">
                      Admission &amp; Monthly Fee Estimator
                    </h4>
                  </div>
                </div>
                <div className="estimator-header-badges">
                  <span className="estimator-header-guarantee-badge">
                    <span className="material-symbols-outlined text-success fs-6">verified_user</span>
                    100% Transparent Fee Scale &bull; Zero Hidden Costs
                  </span>
                </div>
              </div>

              <div className="estimator-console-body">
                <div className="estimator-grid">
                  {/* Left Controls */}
                  <div className="estimator-left-pane">
                    {/* Grade Selection Header */}
                    <div className="estimator-pane-header">
                      <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
                        <label className="estimator-control-label mb-0">
                          <span className="material-symbols-outlined fs-5 text-primary">school</span>
                          1. Select Target Grade / Class:
                        </label>
                        <span className="estimator-active-badge">
                          Active: {currentGrade.title}
                        </span>
                      </div>
                      <p className="estimator-control-desc">
                        Tap any grade below to calculate instant one-time admission &amp; monthly tuition fees:
                      </p>
                    </div>

                    {/* Grade Cards Interactive Grid */}
                    <div className="estimator-grade-grid">
                      {GRADE_OPTIONS.map((grade) => {
                        const isSelected = estimatorClass === grade.id;
                        return (
                          <div
                            key={grade.id}
                            className={`estimator-grade-card ${isSelected ? 'active' : ''}`}
                            onClick={() => setEstimatorClass(grade.id)}
                            role="button"
                            tabIndex="0"
                            onKeyDown={(e) => {
                              if (e.key === ' ' || e.key === 'Enter') {
                                e.preventDefault();
                                setEstimatorClass(grade.id);
                              }
                            }}
                            title={`Select ${grade.title} (${grade.age})`}
                          >
                            <div className="estimator-grade-card-top">
                              <div className="estimator-grade-title-group">
                                <span className="estimator-grade-title">{grade.title}</span>
                                <span className="estimator-grade-subtitle">{grade.subtitle}</span>
                              </div>
                              <div className={`estimator-grade-check ${isSelected ? 'checked' : ''}`}>
                                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>check</span>
                              </div>
                            </div>

                            <div className="estimator-grade-card-bottom">
                              <span className="estimator-grade-age-pill">{grade.age}</span>
                              <span className="estimator-grade-fee-pill">{grade.tuition}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Selected Wing Info Strip */}
                    <div className="estimator-wing-strip">
                      <div className="d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined text-primary fs-5">school</span>
                        <div>
                          <span className="estimator-wing-title">Curriculum Wing:</span>
                          <strong className="text-dark ms-1">{currentGrade.wing}</strong>
                          <span className="text-muted small ms-1">&bull; {currentGrade.age}</span>
                        </div>
                      </div>
                      <span className="estimator-wing-tag">Official CBSE Matrix</span>
                    </div>

                    {/* Optional Transportation Facility */}
                    <div className="estimator-transport-section">
                      <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
                        <label className="estimator-control-label mb-0">
                          <span className="material-symbols-outlined fs-5 text-success">directions_bus</span>
                          2. Optional Transportation Facility:
                        </label>
                        <span className="estimator-transport-status-badge">
                          {includeTransport ? 'Bus Facility Opted' : 'Self Conveyance'}
                        </span>
                      </div>

                      <div
                        className={`estimator-transport-card ${includeTransport ? 'active' : ''}`}
                        onClick={() => setIncludeTransport(!includeTransport)}
                        role="button"
                        tabIndex="0"
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            setIncludeTransport(!includeTransport);
                          }
                        }}
                        title="Click to toggle school bus / van transport service"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div className={`estimator-transport-icon ${includeTransport ? 'active' : ''}`}>
                            <span className="material-symbols-outlined">directions_bus</span>
                          </div>
                          <div>
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                              <span className="estimator-transport-title">School Van / Bus Service</span>
                              <span className={`estimator-bus-pill ${includeTransport ? 'active' : ''}`}>
                                {includeTransport ? 'Opted (+₹600)' : '+₹600 / month'}
                              </span>
                            </div>
                            <div className="estimator-transport-sub">
                              Doorstep pickup routes &bull; GPS live tracking &bull; Certified female attendant
                            </div>
                          </div>
                        </div>

                        <div className="estimator-switch-container">
                          <div className={`estimator-switch-track ${includeTransport ? 'checked' : ''}`}>
                            <div className="estimator-switch-thumb">
                              {includeTransport && (
                                <span className="material-symbols-outlined estimator-switch-check">check</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trust Highlights Strip */}
                    <div className="estimator-trust-bar">
                      <span className="estimator-trust-item">
                        <span className="material-symbols-outlined text-success" style={{ fontSize: '15px' }}>verified</span>
                        Zero Hidden Fees
                      </span>
                      <span className="estimator-trust-item">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '15px' }}>receipt_long</span>
                        Official GST Receipt
                      </span>
                      <span className="estimator-trust-item">
                        <span className="material-symbols-outlined text-warning" style={{ fontSize: '15px' }}>credit_card</span>
                        Online &amp; Cash Desk
                      </span>
                    </div>
                  </div>

                  {/* Right Summary Panel / Digital Receipt */}
                  <div className="estimator-summary-panel">
                    <div className="estimator-summary-top">
                      {/* Receipt Header Badge */}
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="estimator-receipt-badge">
                          <span className="material-symbols-outlined fs-6">receipt_long</span>
                          Fee Receipt Estimate
                        </span>
                        <span className="estimator-instant-chip">
                          <span className="estimator-dot"></span> Live Calculation
                        </span>
                      </div>

                      {/* Dual Stat Hero Display: 1st Month Total & Recurring Monthly */}
                      <div className="estimator-dual-totals">
                        <div className="estimator-stat-box primary">
                          <span className="estimator-stat-label">1st Month (At Admission)</span>
                          <div className="estimator-stat-val">
                            <span className="estimator-currency">₹</span>
                            <span className="estimator-amount">{firstMonthTotal.toLocaleString('en-IN')}</span>
                          </div>
                          <span className="estimator-stat-hint">
                            Admission + 1st mo tuition{includeTransport ? ' + bus' : ''}
                          </span>
                        </div>

                        <div className="estimator-stat-box secondary">
                          <span className="estimator-stat-label">From 2nd Month Onwards</span>
                          <div className="estimator-stat-val">
                            <span className="estimator-currency">₹</span>
                            <span className="estimator-amount">{monthlyRecurringTotal.toLocaleString('en-IN')}</span>
                            <span className="estimator-stat-unit">/ mo</span>
                          </div>
                          <span className="estimator-stat-hint">
                            {includeTransport ? `Tuition ₹${baseTuitionNum} + Bus ₹600` : 'Monthly Tuition Only'}
                          </span>
                        </div>
                      </div>

                      {/* Itemized Line-Item Invoice Box */}
                      <div className="estimator-breakdown-card">
                        <div className="estimator-breakdown-card-header">
                          <span>Fee Component</span>
                          <span>Amount (INR)</span>
                        </div>

                        <div className="estimator-breakdown-list">
                          <div className="estimator-breakdown-row">
                            <div className="d-flex align-items-center gap-2">
                              <span className="estimator-row-icon icon-blue">
                                <span className="material-symbols-outlined">how_to_reg</span>
                              </span>
                              <div>
                                <span className="estimator-row-name">One-Time Admission Fee</span>
                                <span className="estimator-row-note">Payable once at registration</span>
                              </div>
                            </div>
                            <div className="text-end">
                              <span className="estimator-breakdown-val">₹ {baseAdmissionNum.toLocaleString('en-IN')}</span>
                              <span className="estimator-tag-one-time">One-Time</span>
                            </div>
                          </div>

                          <div className="estimator-breakdown-row">
                            <div className="d-flex align-items-center gap-2">
                              <span className="estimator-row-icon icon-emerald">
                                <span className="material-symbols-outlined">menu_book</span>
                              </span>
                              <div>
                                <span className="estimator-row-name">1st Month Tuition ({currentGrade.title})</span>
                                <span className="estimator-row-note">Monthly academic charge</span>
                              </div>
                            </div>
                            <div className="text-end">
                              <span className="estimator-breakdown-val">₹ {baseTuitionNum.toLocaleString('en-IN')}</span>
                              <span className="estimator-tag-monthly">Monthly</span>
                            </div>
                          </div>

                          <div className={`estimator-breakdown-row ${includeTransport ? 'highlight-transport' : ''}`}>
                            <div className="d-flex align-items-center gap-2">
                              <span className="estimator-row-icon icon-amber">
                                <span className="material-symbols-outlined">directions_bus</span>
                              </span>
                              <div>
                                <span className="estimator-row-name">School Transport (Van/Bus)</span>
                                <span className="estimator-row-note">{includeTransport ? 'Doorstep pickup opted' : 'Self conveyance selected'}</span>
                              </div>
                            </div>
                            <div className="text-end">
                              <span className="estimator-breakdown-val">
                                {includeTransport ? '₹ 600' : '₹ 0'}
                              </span>
                              <span className={`estimator-tag-status ${includeTransport ? 'opted' : 'none'}`}>
                                {includeTransport ? 'Opted' : 'Not Opted'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Transparent Annual Notes */}
                      <div className="estimator-annual-preview">
                        <span className="material-symbols-outlined text-muted" style={{ fontSize: '13px' }}>info</span>
                        <span>
                          Annual Exam: <strong>₹ {examAnnualNum}</strong> &bull; Activity: <strong>₹ {activityAnnualNum}</strong> (Payable term-wise)
                        </span>
                      </div>
                    </div>

                    {/* Primary Action Button */}
                    <button
                      type="button"
                      className="estimator-cta-btn"
                      onClick={() => handleProceedWithAdmission(estimatorClass, includeTransport)}
                    >
                      <span className="material-symbols-outlined fs-5">how_to_reg</span>
                      <span>Proceed with {currentGrade.title} Admission &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Elevated Fee Schedule Section */}
            <section id="fee-structure" className="mb-5">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <h3 className="header-title">Complete Fee Schedule (Session 2026–27)</h3>
                    <p className="header-subtitle">
                      Transparent and affordable fee schedule designed to ensure quality education without prohibitive overheads.
                    </p>
                  </div>
                </div>
              </div>

              <div className="fee-matrix-card">
                <div className="table-responsive">
                  <table className="fee-matrix-table mb-0">
                    <thead>
                      <tr>
                        <th>
                          <div className="d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined fs-6 text-primary">school</span>
                            <span>Class / Grade</span>
                          </div>
                        </th>
                        <th className="text-center">
                          <div className="d-flex flex-column align-items-center gap-1">
                            <span>Admission Fee</span>
                            <span className="badge-matrix-sub">One-Time (Entry)</span>
                          </div>
                        </th>
                        <th className="text-center">
                          <div className="d-flex flex-column align-items-center gap-1">
                            <span>Monthly Tuition</span>
                            <span className="badge-matrix-emerald">Per Month</span>
                          </div>
                        </th>
                        <th className="text-center">
                          <div className="d-flex flex-column align-items-center gap-1">
                            <span>Annual Exam</span>
                            <span className="badge-matrix-neutral">Annual</span>
                          </div>
                        </th>
                        <th className="text-center">
                          <div className="d-flex flex-column align-items-center gap-1">
                            <span>Activity &amp; Sports</span>
                            <span className="badge-matrix-neutral">Annual</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeStructure.map((row, idx) => {
                        const wingClass = idx < 2 ? 'wing-preprimary' : idx < 4 ? 'wing-kg' : idx === 4 ? 'wing-primary' : 'wing-middle';
                        const wingLabel = idx < 2 ? 'Pre-Primary' : idx < 4 ? 'Kindergarten' : idx === 4 ? 'Primary' : 'Primary & Middle';
                        return (
                          <tr key={idx} className={row.class.toLowerCase().includes(estimatorClass.toLowerCase()) ? 'row-highlighted' : ''}>
                            <td>
                              <div className="fee-matrix-class-cell">
                                <span className="fee-matrix-class-name">{row.class}</span>
                                <span className={`fee-matrix-wing-tag ${wingClass}`}>
                                  {wingLabel}
                                </span>
                              </div>
                            </td>
                            <td className="text-center">
                              <strong className="fee-admission-val">{row.admissionFee}</strong>
                            </td>
                            <td className="text-center">
                              <span className="fee-tuition-highlight">
                                {row.tuitionMonthly}
                                <small>/ mo</small>
                              </span>
                            </td>
                            <td className="text-center fee-matrix-fee-val">{row.examAnnual}</td>
                            <td className="text-center fee-matrix-fee-val">{row.activityAnnual}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="fee-matrix-footer">
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-success fs-5">verified</span>
                    <span className="small text-muted">
                      <strong>Zero Donation / Capitation Fee Guarantee:</strong> All fees are strictly regulated as per CBSE &amp; Bihar Education Department standards. Term-wise installments available.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Elevated Age Criteria Section */}
            <section id="guidelines" className="mb-5">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div>
                    <h3 className="header-title">Age Eligibility Criteria (As on 31st March 2026)</h3>
                    <p className="header-subtitle">
                      Official age criteria and recommended class placement benchmarks for early childhood education.
                    </p>
                  </div>
                </div>
              </div>

              <div className="age-matrix-card">
                <div className="table-responsive">
                  <table className="age-matrix-table mb-0">
                    <thead>
                      <tr>
                        <th>
                          <div className="d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined fs-6 text-primary">child_care</span>
                            <span>Target Class / Grade</span>
                          </div>
                        </th>
                        <th className="text-center">
                          <div className="d-flex flex-column align-items-center gap-1">
                            <span>Minimum Age</span>
                            <span className="badge-matrix-sub">As on 31-Mar-2026</span>
                          </div>
                        </th>
                        <th className="text-center">
                          <div className="d-flex flex-column align-items-center gap-1">
                            <span>Recommended Range</span>
                            <span className="badge-matrix-neutral">Age Bracket</span>
                          </div>
                        </th>
                        <th className="text-center">
                          <div className="d-flex flex-column align-items-center gap-1">
                            <span>Curriculum Stage</span>
                            <span className="badge-matrix-emerald">NEP 2020</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span className="age-bullet bullet-blue"></span>
                            <strong className="text-dark">Playgroup (Pre-Nursery)</strong>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="age-badge-min">
                            <span className="material-symbols-outlined fs-6 text-success">check</span>
                            2 Years Completed
                          </span>
                        </td>
                        <td className="text-center"><span className="age-badge-range">2 to 3 Years</span></td>
                        <td className="text-center"><span className="age-stage-pill">Early Foundation</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span className="age-bullet bullet-blue"></span>
                            <strong className="text-dark">Nursery</strong>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="age-badge-min">
                            <span className="material-symbols-outlined fs-6 text-success">check</span>
                            3 Years Completed
                          </span>
                        </td>
                        <td className="text-center"><span className="age-badge-range">3 to 4 Years</span></td>
                        <td className="text-center"><span className="age-stage-pill">Early Foundation</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span className="age-bullet bullet-emerald"></span>
                            <strong className="text-dark">LKG (Lower Kindergarten)</strong>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="age-badge-min">
                            <span className="material-symbols-outlined fs-6 text-success">check</span>
                            4 Years Completed
                          </span>
                        </td>
                        <td className="text-center"><span className="age-badge-range">4 to 5 Years</span></td>
                        <td className="text-center"><span className="age-stage-pill stage-kg">Kindergarten</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span className="age-bullet bullet-emerald"></span>
                            <strong className="text-dark">UKG (Upper Kindergarten)</strong>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="age-badge-min">
                            <span className="material-symbols-outlined fs-6 text-success">check</span>
                            5 Years Completed
                          </span>
                        </td>
                        <td className="text-center"><span className="age-badge-range">5 to 6 Years</span></td>
                        <td className="text-center"><span className="age-stage-pill stage-kg">Kindergarten</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span className="age-bullet bullet-purple"></span>
                            <strong className="text-dark">Std I (Grade 1)</strong>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="age-badge-min">
                            <span className="material-symbols-outlined fs-6 text-success">check</span>
                            6 Years Completed
                          </span>
                        </td>
                        <td className="text-center"><span className="age-badge-range">6 to 7 Years</span></td>
                        <td className="text-center"><span className="age-stage-pill stage-primary">Primary Wing</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span className="age-bullet bullet-purple"></span>
                            <strong className="text-dark">Std II to Std VI (Primary &amp; Middle)</strong>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="age-badge-min">
                            <span className="material-symbols-outlined fs-6 text-success">check</span>
                            7+ Years Completed
                          </span>
                        </td>
                        <td className="text-center"><span className="age-badge-range">7 to 11+ Years</span></td>
                        <td className="text-center"><span className="age-stage-pill stage-middle">Primary &amp; Middle</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="age-matrix-footer">
                  <span className="material-symbols-outlined text-primary fs-5">info</span>
                  <span className="small text-muted">
                    <strong>NEP 2020 Compliance:</strong> Age threshold is calculated strictly as on <strong>31st March 2026</strong>. Age relaxation up to 30 days may be granted by the Academic Council for borderline candidates based on readiness evaluation.
                  </span>
                </div>
              </div>
            </section>

            {/* Online Fee Payment Guide */}
            <section id="fee-payment" className="fee-payment-section">
              {/* Title in Separate Box */}
              <div className="fee-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="fee-header-icon">
                    <span className="material-symbols-outlined fs-2">payments</span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="m3-badge m3-badge-amber">Authorized Remittance</span>
                      <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: '0.72rem' }}>
                        Session 2026–27 Verified
                      </span>
                    </div>
                    <h3 className="fee-header-title">Online Fee Payment Instructions</h3>
                    <p className="fee-header-desc mb-0">
                      Safe, direct, and zero-fee school fee transfer through official bank and UPI channels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Instruction in a Separate Box */}
              <div className="fee-notice-box mb-4">
                <div className="d-flex align-items-start gap-3">
                  <span className="material-symbols-outlined text-primary fs-3 mt-1">info</span>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold text-primary mb-1">Payment Instructions &amp; Receipt Verification</h6>
                    <p className="small text-muted mb-3" style={{ lineHeight: '1.7' }}>
                      Parents can remit school fees via direct NEFT/RTGS bank transfer or any UPI QR application (Google Pay, PhonePe, Paytm, BHIM). After initiating payment, please send the transaction screenshot along with student name and class to our verified WhatsApp to receive an instant digital receipt.
                    </p>
                    
                    {/* Dedicated WhatsApp Action Card */}
                    <div className="whatsapp-action-box">
                      <div className="d-flex align-items-center gap-3">
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#25d366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                          <i className="fab fa-whatsapp"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark" style={{ fontSize: '0.92rem' }}>Official Accounts WhatsApp Desk</div>
                          <div className="small text-muted">WhatsApp transaction receipt for instant fee verification</div>
                        </div>
                      </div>
                      <a
                        href="https://wa.me/919431068033?text=Hello%20Swami%20Shiwanand%20Academy,%20I%20have%20transferred%20the%20fees.%20Here%20is%20the%20payment%20confirmation."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-action-btn"
                      >
                        <i className="fab fa-whatsapp fs-6"></i>
                        <span>Send Screenshot to +91 94310 68033</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Every Main Detail in Separate Boxes */}
              <div className="section-header-box mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
                    <span className="material-symbols-outlined">account_balance</span>
                  </div>
                  <div>
                    <h3 className="header-title">Authorized School Bank &amp; UPI Accounts</h3>
                    <p className="header-subtitle">
                      Official verified institutional accounts for fee remittance and bank transfers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-4">
                {/* Box 1: Account Beneficiary */}
                <div className="col-md-6 col-12">
                  <div className="fee-detail-card">
                    <div className="fee-card-top">
                      <span className="material-symbols-outlined text-primary">domain</span>
                      <span className="fee-card-label">Account Beneficiary</span>
                    </div>
                    <div className="fee-card-value">{schoolInfo.name}</div>
                    <div className="fee-card-hint">Official Institute Current Account</div>
                  </div>
                </div>

                {/* Box 2: Bank & Branch */}
                <div className="col-md-6 col-12">
                  <div className="fee-detail-card">
                    <div className="fee-card-top">
                      <span className="material-symbols-outlined text-info">account_balance</span>
                      <span className="fee-card-label">Bank &amp; Branch</span>
                    </div>
                    <div className="fee-card-value">State Bank of India (SBI) / PNB</div>
                    <div className="fee-card-hint">Sasaram Main Branch &bull; IFSC: SBIN0000178</div>
                  </div>
                </div>

                {/* Box 3: Account Number & Type */}
                <div className="col-md-6 col-12">
                  <div className="fee-detail-card">
                    <div className="fee-card-top">
                      <span className="material-symbols-outlined text-warning">tag</span>
                      <span className="fee-card-label">Account Number &amp; Type</span>
                    </div>
                    <div className="fee-card-value">Current A/C: 38402910482</div>
                    <div className="fee-card-hint">Eligible for IMPS / NEFT / RTGS Transfers</div>
                  </div>
                </div>

                {/* Box 4: UPI ID & QR Code */}
                <div className="col-md-6 col-12">
                  <div className="fee-detail-card highlight">
                    <div className="fee-card-top">
                      <span className="material-symbols-outlined text-success">qr_code_2</span>
                      <span className="fee-card-label">Official UPI ID</span>
                    </div>
                    <div className="fee-card-value font-monospace text-success">9431068033@upi</div>
                    <div className="fee-card-hint">Accepted on Google Pay &bull; PhonePe &bull; Paytm &bull; BHIM</div>
                  </div>
                </div>
              </div>

              {/* 3 Step Remittance Process Flow Stepper */}
              <div className="remittance-steps-grid">
                {/* Step 1 */}
                <div className="remittance-step-card step-1">
                  <div>
                    <div className="remittance-step-header">
                      <div className="remittance-icon-box icon-blue">
                        <span className="material-symbols-outlined fs-4">payments</span>
                      </div>
                      <span className="remittance-step-badge badge-blue">Step 01 of 03</span>
                    </div>
                    <h6 className="remittance-step-title">1. Transfer Remittance</h6>
                    <p className="remittance-step-text">
                      Transfer tuition or admission charges via Bank NEFT, RTGS or UPI scan to the authorized Deepkiran Trust account.
                    </p>
                  </div>
                  <div className="remittance-step-footer">
                    <span className="remittance-step-tag tag-blue">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>qr_code_scanner</span>
                      UPI &amp; Net Banking
                    </span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="remittance-step-card step-2">
                  <div>
                    <div className="remittance-step-header">
                      <div className="remittance-icon-box icon-amber">
                        <span className="material-symbols-outlined fs-4">receipt_long</span>
                      </div>
                      <span className="remittance-step-badge badge-amber">Step 02 of 03</span>
                    </div>
                    <h6 className="remittance-step-title">2. Capture Payment Receipt</h6>
                    <p className="remittance-step-text">
                      Take a clear screenshot showing the 12-digit UTR reference or bank transaction confirmation number.
                    </p>
                  </div>
                  <div className="remittance-step-footer">
                    <span className="remittance-step-tag tag-amber">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>pin</span>
                      12-Digit UTR Proof
                    </span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="remittance-step-card step-3">
                  <div>
                    <div className="remittance-step-header">
                      <div className="remittance-icon-box icon-green">
                        <span className="material-symbols-outlined fs-4">mark_chat_read</span>
                      </div>
                      <span className="remittance-step-badge badge-green">Step 03 of 03</span>
                    </div>
                    <h6 className="remittance-step-title">3. Receive Verified Receipt</h6>
                    <p className="remittance-step-text">
                      WhatsApp the transaction screenshot to <strong>+91 94310 68033</strong> to receive an official digital stamp fee receipt.
                    </p>
                  </div>
                  <div className="remittance-step-footer">
                    <span className="remittance-step-tag tag-green">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                      Instant Stamp Confirmation
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar Column */}
          <div className="col-lg-4">
            {/* School Admission Guide Card */}
            <div className="modern-sidebar-card mb-4" id="prospectus">
              <div className="modern-sidebar-header emerald-theme">
                <div className="modern-sidebar-title">
                  <span className="material-symbols-outlined" style={{ color: '#a7f3d0' }}>menu_book</span>
                  Admission Guide
                </div>
                <span className="modern-sidebar-badge">Session 2026–27</span>
              </div>
              <div className="p-4 text-center">
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(5, 150, 105, 0.12)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <span className="material-symbols-outlined fs-2">verified_user</span>
                </div>
                <h6 className="fw-bold text-dark mb-1">Official Information Guide</h6>
                <p className="small text-muted mb-4" style={{ lineHeight: '1.6' }}>
                  Explore curriculum frameworks, facilities, faculty, and transparent fee scales directly on our portal.
                </p>
                <a
                  href="#documents-required"
                  className="btn btn-primary w-100 fw-bold py-2 d-flex align-items-center justify-content-center gap-2 text-decoration-none"
                >
                  <span className="material-symbols-outlined fs-6">task_alt</span>
                  View Verification Checklist
                </a>
              </div>
            </div>

            {/* Checklist of Required Documents */}
            <div className="doc-checklist-card mb-4" id="documents-required">
              <div className="doc-checklist-header">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="doc-checklist-category">VERIFICATION CHECKLIST</span>
                  <span className="doc-count-badge">
                    <span className="material-symbols-outlined fs-6 text-primary">task_alt</span>
                    6 Key Items
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="doc-checklist-icon-box">
                    <span className="material-symbols-outlined">folder_shared</span>
                  </div>
                  <div>
                    <h5 className="doc-checklist-title mb-0">Documents Required</h5>
                    <span className="doc-checklist-sub">For physical verification during campus interaction</span>
                  </div>
                </div>
              </div>

              <div className="doc-checklist-body">
                <div className="doc-guidance-pill">
                  <span className="material-symbols-outlined text-success fs-6" style={{ marginTop: '1px' }}>info</span>
                  <span>Keep 1 self-attested photocopy set along with original certificates for verification.</span>
                </div>

                <div className="doc-items-stack">
                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">01</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">Municipal Birth Certificate</span>
                          <span className="doc-tag doc-tag-required">Mandatory</span>
                        </div>
                        <div className="doc-item-sub">Issued by Municipal Corp / Nagar Nigam / Gram Panchayat</div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">02</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">Student Photographs</span>
                          <span className="doc-tag">4 Copies</span>
                        </div>
                        <div className="doc-item-sub">Recent color passport-size photos with light background</div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">03</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">Parents' Photographs</span>
                          <span className="doc-tag">2 Copies</span>
                        </div>
                        <div className="doc-item-sub">2 passport-size photographs of mother &amp; father each</div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">04</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">Aadhaar Card (ID Proof)</span>
                          <span className="doc-tag doc-tag-required">Mandatory</span>
                        </div>
                        <div className="doc-item-sub">Photocopies of child and both parents' Aadhaar cards</div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">05</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">Immunization Record</span>
                          <span className="doc-tag">Health Record</span>
                        </div>
                        <div className="doc-item-sub">Pediatric vaccination record card (Playgroup to UKG)</div>
                      </div>
                    </div>
                  </div>

                  <div className="doc-item">
                    <div className="doc-item-left">
                      <div className="doc-item-num">06</div>
                      <div className="doc-item-content">
                        <div className="doc-item-title-row">
                          <span className="doc-item-title">TC &amp; Report Card</span>
                          <span className="doc-tag doc-tag-applicable">Std I &amp; Above</span>
                        </div>
                        <div className="doc-item-sub">Countersigned Transfer Certificate + last school marksheet</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="doc-footer-note">
                  <span className="material-symbols-outlined fs-6 text-primary">verified</span>
                  <span>Assistance available at school office for form attestation</span>
                </div>
              </div>
            </div>

            {/* Admission Helpdesk Info */}
            <div className="admission-helpdesk-card">
              <div className="helpdesk-header">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="helpdesk-category">ADMISSION COUNSELING</span>
                  <span className="helpdesk-status-pill">
                    <span className="helpdesk-status-dot"></span> Open Today
                  </span>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="helpdesk-halo">
                    <span className="material-symbols-outlined fs-3">support_agent</span>
                  </div>
                  <div>
                    <h5 className="helpdesk-title mb-0">Admission Helpdesk</h5>
                    <div className="helpdesk-hours">Mon – Sat: 08:00 AM – 02:00 PM</div>
                  </div>
                </div>

                <p className="helpdesk-desc mt-3 mb-0">
                  Have questions about seat availability, syllabus, or fee structure? Speak directly with our counseling desk.
                </p>
              </div>

              <div className="helpdesk-body">
                <div className="helpdesk-helplines-stack">
                  <a href="tel:+919431068033" className="helpdesk-contact-action">
                    <div className="d-flex align-items-center gap-2">
                      <div className="helpdesk-call-icon">
                        <span className="material-symbols-outlined fs-6">phone_in_talk</span>
                      </div>
                      <div>
                        <span className="helpdesk-action-tag">COUNSELING DESK &bull; DIRECT</span>
                        <div className="helpdesk-action-val">+91 94310 68033</div>
                      </div>
                    </div>
                    <span className="helpdesk-action-btn">
                      <span>CALL</span>
                      <span className="material-symbols-outlined fs-6">arrow_forward</span>
                    </span>
                  </a>

                  <a href="tel:+918809226820" className="helpdesk-contact-action">
                    <div className="d-flex align-items-center gap-2">
                      <div className="helpdesk-call-icon">
                        <span className="material-symbols-outlined fs-6">call</span>
                      </div>
                      <div>
                        <span className="helpdesk-action-tag">ADMIN &bull; PRINCIPAL OFFICE</span>
                        <div className="helpdesk-action-val">+91 88092 26820</div>
                      </div>
                    </div>
                    <span className="helpdesk-action-btn">
                      <span>CALL</span>
                      <span className="material-symbols-outlined fs-6">arrow_forward</span>
                    </span>
                  </a>

                  <a
                    href="https://wa.me/919431068033?text=Hello%20Swami%20Shiwanand%20Academy,%20I%20have%20an%20admission%20inquiry%20for%20Session%202026-27."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="helpdesk-whatsapp-action"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div className="helpdesk-whatsapp-icon">
                        <i className="fab fa-whatsapp"></i>
                      </div>
                      <div>
                        <span className="helpdesk-action-tag" style={{ color: '#166534' }}>WHATSAPP DESK</span>
                        <div className="helpdesk-action-val" style={{ color: '#14532d' }}>Chat on WhatsApp</div>
                      </div>
                    </div>
                    <span className="helpdesk-whatsapp-btn">
                      <span>CHAT</span>
                      <span className="material-symbols-outlined fs-6">chat</span>
                    </span>
                  </a>
                </div>

                <Link to="/contact" className="helpdesk-inquiry-btn">
                  <span className="material-symbols-outlined fs-6">mail</span>
                  <span>Send Detailed Admission Inquiry &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
