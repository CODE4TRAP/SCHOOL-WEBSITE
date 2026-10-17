import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';

export default function StudentCorner() {
  const [uniformTab, setUniformTab] = useState('regular');
  const [periodFilter, setPeriodFilter] = useState('all');

  // Interactive Periods List
  const periodSchedule = [
    {
      id: 'assembly',
      type: 'assembly',
      time: '07:35 AM',
      duration: '15 Mins',
      title: 'Morning Assembly & Spiritual Invocations',
      desc: 'Gayatri Mantra, Saraswati Vandana, National Student Pledge, Thought for the Day & GK digest.',
      color: '#64748b',
      badgeBg: 'bg-secondary-subtle',
      badgeText: 'text-secondary'
    },
    {
      id: 'p1',
      type: 'academic',
      time: 'Period 1',
      duration: '40 Mins',
      title: 'Foundational Language & Phonics',
      desc: 'English & Hindi phonics, read-aloud storytelling, sight words & active vocabulary building.',
      color: '#2563eb',
      badgeBg: 'bg-primary-subtle',
      badgeText: 'text-primary'
    },
    {
      id: 'p2',
      type: 'academic',
      time: 'Period 2',
      duration: '40 Mins',
      title: 'Mathematics & Logical Numeracy',
      desc: 'Montessori abacus counters, number sense, shapes discovery & mental arithmetic drills.',
      color: '#0891b2',
      badgeBg: 'bg-info-subtle',
      badgeText: 'text-info-emphasis'
    },
    {
      id: 'p3',
      type: 'academic',
      time: 'Period 3',
      duration: '40 Mins',
      title: 'Environmental Studies (EVS) & Nature Corner',
      desc: 'Hands-on botanical observation, weather charts & interactive audio-visual science modules.',
      color: '#059669',
      badgeBg: 'bg-success-subtle',
      badgeText: 'text-success'
    },
    {
      id: 'recess',
      type: 'break',
      time: '10:00 AM',
      duration: '25 Mins',
      title: 'Supervised Nutrition & Recess Break',
      desc: 'Handwashing hygiene, warm supervised meal in dining/classroom & joyful peer interaction.',
      color: '#d97706',
      badgeBg: 'bg-warning-subtle',
      badgeText: 'text-warning-emphasis',
      isRecess: true
    },
    {
      id: 'p4',
      type: 'creative',
      time: 'Period 4',
      duration: '35 Mins',
      title: 'Creative Art, Origami & Clay Craft',
      desc: 'Fine motor muscle development, color mixing, free drawing & creative hands-on craft projects.',
      color: '#d97706',
      badgeBg: 'bg-warning-subtle',
      badgeText: 'text-warning-emphasis'
    },
    {
      id: 'p5',
      type: 'academic',
      time: 'Period 5',
      duration: '35 Mins',
      title: "Kid's Digital Computer Lab & Multimedia",
      desc: 'Introductory keyboard familiarization, educational logic puzzles & interactive audio-visual rhymes.',
      color: '#7c3aed',
      badgeBg: 'bg-purple-subtle',
      badgeText: 'text-purple',
      badgeCustom: { background: '#ede9fe', color: '#6d28d9' }
    },
    {
      id: 'p6',
      type: 'activity',
      time: 'Period 6',
      duration: '35 Mins',
      title: 'Physical Training (PT), Sports & Yoga',
      desc: 'Outdoor lawn games, balance beams, breathing exercises, agility drills & athletic relay games.',
      color: '#e11d48',
      badgeBg: 'bg-danger-subtle',
      badgeText: 'text-danger',
      badgeCustom: { background: '#ffe4e6', color: '#be123c' }
    },
    {
      id: 'p7',
      type: 'wrapup',
      time: 'Period 7',
      duration: '25 Mins',
      title: 'School Diary Notation, Wrap-up & Bus Queue',
      desc: 'Teacher homework sign-off, water bottle refill & escorted line dispersal to GPS buses.',
      color: '#475569',
      badgeBg: 'bg-light',
      badgeText: 'text-muted'
    }
  ];

  const filteredPeriods = periodSchedule.filter(p => {
    if (periodFilter === 'all') return true;
    if (periodFilter === 'academic') return p.type === 'academic';
    if (periodFilter === 'activity') return p.type === 'activity' || p.type === 'creative' || p.type === 'break';
    return true;
  });

  return (
    <div>
      {/* ─── M3 Page Header in Separate Structured Boxes (Identical to About, Facilities, Contact) ─── */}
      <div className="m3-page-header">
        <div className="container">
          <div className="m3-header-container">
            <div className="m3-header-badges-box">
              <span className="m3-badge m3-badge-tonal">
                <span className="material-symbols-outlined fs-6">school</span> Student Corner
              </span>
              <span className="m3-badge m3-badge-amber">
                <span className="material-symbols-outlined fs-6">verified</span> Session 2026–27
              </span>
            </div>
            <div className="m3-header-title-box">
              <h2 className="m3-page-header-title mb-0">Student Corner &amp; Campus Routine</h2>
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
                  <li className="active">Student Corner</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content Layout matching About.jsx and Facilities.jsx ─── */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Left Content Column */}
          <div className="col-lg-8">
            {/* ═══════════════════════════════════════
                SECTION 1: SCHOOL TIMING & ROUTINE
               ═══════════════════════════════════════ */}
            <section id="timings" className="mb-5 pt-2">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-3">
                    <div className="header-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div>
                      <h3 className="header-title">School Timing &amp; Routine</h3>
                      <p className="header-subtitle">
                        Official Wing-wise schedule table matching academic and seasonal guidelines.
                      </p>
                    </div>
                  </div>
                  <span className="live-bell-pulse">
                    <span className="live-bell-dot"></span>
                    <span>School Routine Active</span>
                  </span>
                </div>
              </div>

              {/* AUTHENTIC WING-WISE TIMINGS TABLE (Direct from static_backup/about.html) */}
              <div className="wing-timings-card mb-4">
                <div className="p-3 bg-light border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-warning fs-5">view_column</span>
                    <strong className="text-dark small">Official Wing-Wise Operational Hours (Session 2026–27)</strong>
                  </div>
                  <span className="badge bg-primary-subtle text-primary small px-3 py-1 rounded-pill">
                    Monday to Saturday
                  </span>
                </div>
                <div className="table-responsive">
                  <table className="wing-timings-table">
                    <thead>
                      <tr>
                        <th style={{ width: '38%' }}>Wing / Section</th>
                        <th style={{ width: '31%' }}>
                          <span className="d-flex align-items-center gap-1">
                            <span className="material-symbols-outlined fs-6 text-warning">sunny</span>
                            Summer Timings
                          </span>
                        </th>
                        <th style={{ width: '31%' }}>
                          <span className="d-flex align-items-center gap-1">
                            <span className="material-symbols-outlined fs-6 text-info">ac_unit</span>
                            Winter Timings
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="wing-badge">
                            <div className="wing-badge-icon bg-warning bg-opacity-15 text-warning">
                              <span className="material-symbols-outlined">toys</span>
                            </div>
                            <div>
                              <strong className="d-block text-dark">Playgroup &amp; Nursery</strong>
                              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Early Childhood Wing</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="timing-pill-summer">
                            <span className="material-symbols-outlined fs-6">wb_sunny</span>
                            08:30 AM &ndash; 11:30 AM
                          </span>
                        </td>
                        <td>
                          <span className="timing-pill-winter">
                            <span className="material-symbols-outlined fs-6">ac_unit</span>
                            09:00 AM &ndash; 12:00 PM
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="wing-badge">
                            <div className="wing-badge-icon bg-primary bg-opacity-10 text-primary">
                              <span className="material-symbols-outlined">child_care</span>
                            </div>
                            <div>
                              <strong className="d-block text-dark">LKG &amp; UKG (Kindergarten)</strong>
                              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Montessori &amp; Phonics Wing</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="timing-pill-summer">
                            <span className="material-symbols-outlined fs-6">wb_sunny</span>
                            08:00 AM &ndash; 12:30 PM
                          </span>
                        </td>
                        <td>
                          <span className="timing-pill-winter">
                            <span className="material-symbols-outlined fs-6">ac_unit</span>
                            08:30 AM &ndash; 01:00 PM
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="wing-badge">
                            <div className="wing-badge-icon bg-success bg-opacity-15 text-success">
                              <span className="material-symbols-outlined">school</span>
                            </div>
                            <div>
                              <strong className="d-block text-dark">Primary (Std I to V)</strong>
                              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>CBSE Pattern Primary Wing</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="timing-pill-summer">
                            <span className="material-symbols-outlined fs-6">wb_sunny</span>
                            07:45 AM &ndash; 01:30 PM
                          </span>
                        </td>
                        <td>
                          <span className="timing-pill-winter">
                            <span className="material-symbols-outlined fs-6">ac_unit</span>
                            08:15 AM &ndash; 02:00 PM
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-light border-top d-flex align-items-center justify-content-between flex-wrap gap-2 text-muted small">
                  <span>
                    <i className="fas fa-info-circle text-primary me-1"></i> Morning gate opens 20 minutes before first bell. Assembly is 15 minutes daily.
                  </span>
                  <span className="fw-semibold text-dark">
                    Dispersal through GPS-enabled supervised school vans &amp; buses.
                  </span>
                </div>
              </div>

              {/* Day Period Distribution Timeline Cards */}
              <div className="card border shadow-sm rounded-4 overflow-hidden mb-4">
                <div className="card-header bg-white py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-2 border-bottom">
                  <div>
                    <h6 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                      <span className="material-symbols-outlined text-primary">view_timeline</span>
                      Academic Period Schedule &amp; Daily Flow
                    </h6>
                    <span className="text-muted small">Balanced cognitive, linguistic, creative &amp; physical periods</span>
                  </div>
                  {/* Filter Pills */}
                  <div className="d-flex align-items-center gap-1.5">
                    <button
                      className={`period-filter-pill ${periodFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setPeriodFilter('all')}
                    >
                      All (7 Periods)
                    </button>
                    <button
                      className={`period-filter-pill ${periodFilter === 'academic' ? 'active' : ''}`}
                      onClick={() => setPeriodFilter('academic')}
                    >
                      Academics
                    </button>
                    <button
                      className={`period-filter-pill ${periodFilter === 'activity' ? 'active' : ''}`}
                      onClick={() => setPeriodFilter('activity')}
                    >
                      Activities &amp; Break
                    </button>
                  </div>
                </div>

                <div className="p-3 p-md-4 bg-light">
                  <div className="d-flex flex-column gap-3">
                    {filteredPeriods.map(item => (
                      <div
                        key={item.id}
                        className={`p-3 bg-white rounded-3 border d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 shadow-xs ${item.isRecess ? 'border-warning' : ''}`}
                        style={{
                          borderLeft: `5px solid ${item.color}`,
                          background: item.isRecess ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' : '#ffffff'
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <span
                            className={`badge px-3 py-2 rounded-pill fw-bold ${item.badgeBg} ${item.badgeText}`}
                            style={{ minWidth: '85px', textAlign: 'center', ...(item.badgeCustom || {}) }}
                          >
                            {item.time}
                          </span>
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <h6 className="mb-0 fw-bold text-dark">{item.title}</h6>
                              {item.isRecess && (
                                <span className="badge bg-warning text-dark small" style={{ fontSize: '10px' }}>
                                  RECESS
                                </span>
                              )}
                            </div>
                            <span className="text-muted small">{item.desc}</span>
                          </div>
                        </div>
                        <span className="badge bg-light text-dark border px-3 py-1 rounded-pill small fw-semibold">
                          {item.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION 2: SCHOOL UNIFORM
               ═══════════════════════════════════════ */}
            <section id="uniform" className="mb-5 pt-2">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#2563eb' }}>
                    <span className="material-symbols-outlined">checkroom</span>
                  </div>
                  <div>
                    <h3 className="header-title">School Uniform</h3>
                    <p className="header-subtitle">
                      The uniform instills a spirit of equality, neatness, and institutional pride. All students must arrive in clean, pressed attire.
                    </p>
                  </div>
                </div>
              </div>

              {/* Attire Category Switcher */}
              <div className="d-flex align-items-center gap-2 mb-4 flex-wrap">
                <button
                  className={`attire-tab-btn ${uniformTab === 'regular' ? 'active' : ''}`}
                  onClick={() => setUniformTab('regular')}
                >
                  <span className="material-symbols-outlined fs-6">dry_cleaning</span>
                  Regular Weekdays (Mon, Tue, Thu, Fri)
                </button>
                <button
                  className={`attire-tab-btn ${uniformTab === 'sports' ? 'active' : ''}`}
                  onClick={() => setUniformTab('sports')}
                >
                  <span className="material-symbols-outlined fs-6">sports_handball</span>
                  Sports &amp; House Days (Wed &amp; Sat)
                </button>
                <button
                  className={`attire-tab-btn ${uniformTab === 'winter' ? 'active' : ''}`}
                  onClick={() => setUniformTab('winter')}
                >
                  <span className="material-symbols-outlined fs-6">ac_unit</span>
                  Winter Season (Nov &ndash; Feb)
                </button>
              </div>

              {/* Uniform Detail Cards */}
              {uniformTab === 'regular' && (
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #bae6fd' }}>
                  <div className="p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="badge bg-primary px-3 py-1.5 rounded-pill fw-bold">MONDAY, TUESDAY, THURSDAY &amp; FRIDAY</span>
                      <span className="small text-primary fw-bold">Mandatory Formal Turnout</span>
                    </div>
                    <div className="row g-4">
                      <div className="col-md-6 col-12">
                        <div className="p-3 bg-white rounded-3 shadow-xs border h-100">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary fs-5">boy</span>
                            <h6 className="mb-0 fw-bold text-dark">Boys (Playgroup to Std V)</h6>
                          </div>
                          <ul className="list-unstyled small text-muted mb-0 d-flex flex-column gap-2" style={{ lineHeight: '1.45' }}>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Shirt:</strong> Sky blue half-sleeve shirt with embroidered school crest on left pocket.</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Shorts/Trousers:</strong> Royal blue customized shorts (PG to Std II) / Trousers (Std III to V).</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Belt &amp; Tie:</strong> Navy woven belt with school buckle &amp; official patterned school necktie.</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Footwear:</strong> Black leather oxford shoes (polished daily) with royal blue socks with white stripes.</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-md-6 col-12">
                        <div className="p-3 bg-white rounded-3 shadow-xs border h-100">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-danger fs-5">girl</span>
                            <h6 className="mb-0 fw-bold text-dark">Girls (Playgroup to Std V)</h6>
                          </div>
                          <ul className="list-unstyled small text-muted mb-0 d-flex flex-column gap-2" style={{ lineHeight: '1.45' }}>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Shirt:</strong> Sky blue shirt with peter-pan collar &amp; school monogram.</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Skirt/Tunic:</strong> Royal blue knife-pleated skirt/pinafore falling neatly just at knee level.</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Hair Accessories:</strong> Hair neatly tied in two plaits/ponytails with royal blue ribbons or band.</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Footwear:</strong> Black buckle shoes with royal blue socks. No heels or decorative slippers.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {uniformTab === 'sports' && (
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '1px solid #a7f3d0' }}>
                  <div className="p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="badge bg-success px-3 py-1.5 rounded-pill fw-bold">WEDNESDAY &amp; SATURDAY</span>
                      <span className="small text-success fw-bold">House Sports &amp; Yoga Attire</span>
                    </div>
                    <div className="row g-4">
                      <div className="col-md-6 col-12">
                        <div className="p-3 bg-white rounded-3 shadow-xs border h-100">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-success fs-5">fitness_center</span>
                            <h6 className="mb-0 fw-bold text-dark">House Color Sports T-Shirt</h6>
                          </div>
                          <p className="small text-muted mb-2" style={{ lineHeight: '1.45' }}>
                            Breathable cotton collared polo sports T-shirt featuring the student's allocated House crest on the left chest:
                          </p>
                          <div className="d-flex flex-wrap gap-1.5 mt-2">
                            <span className="badge bg-danger text-white">Agni (Red)</span>
                            <span className="badge bg-primary text-white">Vayu (Blue)</span>
                            <span className="badge bg-success text-white">Prithvi (Green)</span>
                            <span className="badge bg-warning text-dark">Surya (Yellow)</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-12">
                        <div className="p-3 bg-white rounded-3 shadow-xs border h-100">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-success fs-5">roller_skating</span>
                            <h6 className="mb-0 fw-bold text-dark">Track Pants &amp; White Canvas Shoes</h6>
                          </div>
                          <ul className="list-unstyled small text-muted mb-0 d-flex flex-column gap-2" style={{ lineHeight: '1.45' }}>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Bottom:</strong> All-white comfortable sports track pant with elastic drawstring.</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Shoes:</strong> Pristine clean white canvas PT shoes / sneakers.</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Socks:</strong> Plain white ankle-high sports socks.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {uniformTab === 'winter' && (
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', border: '1px solid #fecaca' }}>
                  <div className="p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="badge bg-danger px-3 py-1.5 rounded-pill fw-bold">WINTER SEASON (NOV &ndash; FEB)</span>
                      <span className="small text-danger fw-bold">Cold Wave Thermal Shield</span>
                    </div>
                    <div className="row g-4">
                      <div className="col-md-6 col-12">
                        <div className="p-3 bg-white rounded-3 shadow-xs border h-100">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-danger fs-5">ac_unit</span>
                            <h6 className="mb-0 fw-bold text-dark">Pullover &amp; School Blazer</h6>
                          </div>
                          <ul className="list-unstyled small text-muted mb-0 d-flex flex-column gap-2" style={{ lineHeight: '1.45' }}>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Pullover:</strong> Navy blue V-neck woolen sweater with yellow trim along collar &amp; cuffs.</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Blazer:</strong> Navy blue single-breasted school blazer with gold-embroidered school emblem.</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-md-6 col-12">
                        <div className="p-3 bg-white rounded-3 shadow-xs border h-100">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-danger fs-5">accessibility_new</span>
                            <h6 className="mb-0 fw-bold text-dark">Thermal Tights &amp; Head Cap</h6>
                          </div>
                          <ul className="list-unstyled small text-muted mb-0 d-flex flex-column gap-2" style={{ lineHeight: '1.45' }}>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Girls:</strong> Warm navy blue wool stockings or thermal leggings under pleated skirt.</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                              <span className="material-symbols-outlined text-success fs-6 mt-0.5">check</span>
                              <span><strong>Cap/Scarf:</strong> Navy blue wool beanie cap or monkey cap during extreme foggy cold wave days.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grooming & Turnout Guidelines */}
              <div className="card border shadow-sm rounded-4 p-4 bg-light">
                <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  Personal Grooming, Identity &amp; Hygiene Standards
                </h6>
                <div className="row g-3">
                  <div className="col-sm-6 col-12">
                    <div className="p-3 rounded-3 bg-white border h-100 shadow-xs">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary fs-5">face</span>
                        <h6 className="mb-0 fw-bold small text-dark">Hair &amp; Headgear</h6>
                      </div>
                      <p className="small text-muted mb-0" style={{ lineHeight: '1.5' }}>
                        <strong>Boys:</strong> Neat, disciplined short trim. No spikes, funky dyes or gel.<br />
                        <strong>Girls:</strong> Hair tied neatly with royal blue ribbons or simple hairband.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="p-3 rounded-3 bg-white border h-100 shadow-xs">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-success fs-5">hygiene</span>
                        <h6 className="mb-0 fw-bold small text-dark">Nails &amp; Hand Hygiene</h6>
                      </div>
                      <p className="small text-muted mb-0" style={{ lineHeight: '1.5' }}>
                        Fingernails clipped short and clean. Strictly no nail paint or mehendi during school days. Inspected weekly during Monday assembly.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="p-3 rounded-3 bg-white border h-100 shadow-xs">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-info fs-5">steps</span>
                        <h6 className="mb-0 fw-bold small text-dark">Footwear &amp; Turnout</h6>
                      </div>
                      <p className="small text-muted mb-0" style={{ lineHeight: '1.5' }}>
                        Mirror-polished black leather shoes on regular days. Pristine white canvas shoes on sports days. Navy/white socks always pulled up.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="p-3 rounded-3 bg-white border h-100 shadow-xs">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-danger fs-5">badge</span>
                        <h6 className="mb-0 fw-bold small text-dark">Identity &amp; Monogram</h6>
                      </div>
                      <p className="small text-muted mb-0" style={{ lineHeight: '1.5' }}>
                        Official RFID Student ID card with royal blue lanyard must be worn around neck every day. School crest cleanly stitched on left chest pocket.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION 3: ASSEMBLY & MORAL EDUCATION
               ═══════════════════════════════════════ */}
            <section id="moral" className="mb-5 pt-2">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#059669' }}>
                    <span className="material-symbols-outlined">volunteer_activism</span>
                  </div>
                  <div>
                    <h3 className="header-title">Assembly &amp; Moral Education</h3>
                    <p className="header-subtitle">
                      Every day begins with sacred invocations, national pride, and character-building reflections.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5-Step Morning Assembly Journey */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4" style={{ background: '#f8fafc', borderLeft: '4px solid #f59e0b' }}>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                  <h5 className="fw-bold text-dark d-flex align-items-center gap-2 mb-0">
                    <span className="material-symbols-outlined text-warning">record_voice_over</span>
                    The 5-Step Daily Assembly Sequence (15 Mins)
                  </h5>
                  <span className="badge bg-warning-subtle text-dark border px-2.5 py-1 rounded-pill small fw-semibold">
                    07:35 AM &ndash; 07:50 AM
                  </span>
                </div>

                <div className="d-flex flex-column gap-2.5">
                  <div className="assembly-step-card d-flex align-items-center gap-3">
                    <span className="assembly-step-num">1</span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between">
                        <strong className="text-dark small">Universal Invocations &amp; Meditation</strong>
                        <span className="badge bg-light text-muted border small">07:35 AM</span>
                      </div>
                      <span className="text-muted small">
                        Gayatri Mantra and Saraswati Vandana chanted collectively to awaken clarity and calm young minds.
                      </span>
                    </div>
                  </div>

                  <div className="assembly-step-card d-flex align-items-center gap-3">
                    <span className="assembly-step-num">2</span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between">
                        <strong className="text-dark small">National Student Pledge</strong>
                        <span className="badge bg-light text-muted border small">07:40 AM</span>
                      </div>
                      <span className="text-muted small">
                        "India is my country and all Indians are my brothers and sisters..." recited with right hand over heart.
                      </span>
                    </div>
                  </div>

                  <div className="assembly-step-card d-flex align-items-center gap-3">
                    <span className="assembly-step-num">3</span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between">
                        <strong className="text-dark small">Bilingual Thought for the Day</strong>
                        <span className="badge bg-light text-muted border small">07:42 AM</span>
                      </div>
                      <span className="text-muted small">
                        Delivered alternately in Hindi &amp; English by student representatives to hone public oratory skills.
                      </span>
                    </div>
                  </div>

                  <div className="assembly-step-card d-flex align-items-center gap-3">
                    <span className="assembly-step-num">4</span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between">
                        <strong className="text-dark small">Daily GK &amp; Current Affairs Brief</strong>
                        <span className="badge bg-light text-muted border small">07:44 AM</span>
                      </div>
                      <span className="text-muted small">
                        3 important educational news headlines and science facts curated for young curious learners.
                      </span>
                    </div>
                  </div>

                  <div className="assembly-step-card d-flex align-items-center gap-3">
                    <span className="assembly-step-num">5</span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between">
                        <strong className="text-dark small">National Anthem ("Jana Gana Mana")</strong>
                        <span className="badge bg-light text-muted border small">07:48 AM</span>
                      </div>
                      <span className="text-muted small">
                        Rendered with solemn attention, discipline, and patriotic pride before students march to classrooms.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Moral Education Pillars */}
              <div className="card border-0 shadow-sm rounded-4 p-4" style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6' }}>
                <h5 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary">diversity_3</span>
                  Our 4 Core Moral Pillars (Sanskar)
                </h5>
                <div className="row g-3">
                  <div className="col-md-6 col-12">
                    <div className="p-3 bg-white rounded-3 shadow-sm border h-100 d-flex align-items-start gap-3">
                      <div className="rounded-circle p-2 bg-danger-subtle text-danger d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="material-symbols-outlined fs-5">favorite</span>
                      </div>
                      <div>
                        <strong className="d-block text-dark small">Satya &amp; Nishtha (Truth &amp; Integrity)</strong>
                        <span className="text-muted" style={{ fontSize: '0.8rem', lineHeight: '1.45' }}>
                          Fostering moral courage to speak truth, act honestly, and take accountability for one's choices.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="p-3 bg-white rounded-3 shadow-sm border h-100 d-flex align-items-start gap-3">
                      <div className="rounded-circle p-2 bg-success-subtle text-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="material-symbols-outlined fs-5">handshake</span>
                      </div>
                      <div>
                        <strong className="d-block text-dark small">Aadar &amp; Vinamrata (Respect &amp; Humility)</strong>
                        <span className="text-muted" style={{ fontSize: '0.8rem', lineHeight: '1.45' }}>
                          Touching elders' feet, bowing to teachers, respecting bus staff and acknowledging every worker.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="p-3 bg-white rounded-3 shadow-sm border h-100 d-flex align-items-start gap-3">
                      <div className="rounded-circle p-2 bg-primary-subtle text-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="material-symbols-outlined fs-5">groups</span>
                      </div>
                      <div>
                        <strong className="d-block text-dark small">Sahyog &amp; Karuna (Teamwork &amp; Empathy)</strong>
                        <span className="text-muted" style={{ fontSize: '0.8rem', lineHeight: '1.45' }}>
                          Sharing tiffin, lifting up classmates with learning needs, and celebrating peers' accomplishments.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="p-3 bg-white rounded-3 shadow-sm border h-100 d-flex align-items-start gap-3">
                      <div className="rounded-circle p-2 bg-info-subtle text-info d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="material-symbols-outlined fs-5">eco</span>
                      </div>
                      <div>
                        <strong className="d-block text-dark small">Swachhata &amp; Paryavaran (Eco-Care)</strong>
                        <span className="text-muted" style={{ fontSize: '0.8rem', lineHeight: '1.45' }}>
                          Zero littering, water conservation, garden tending, and plastic-free campus stewardship.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION 4: GUIDELINES FOR STUDENTS
               ═══════════════════════════════════════ */}
            <section id="guidelines-students" className="mb-5 pt-2">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#4f46e5' }}>
                    <span className="material-symbols-outlined">menu_book</span>
                  </div>
                  <div>
                    <h3 className="header-title">Guidelines For Students</h3>
                    <p className="header-subtitle">
                      Campus discipline code, classroom etiquette, safety regulations, and mutual respect guidelines.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="guideline-item-box">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary fs-5">alarm_on</span>
                      <h6 className="fw-bold mb-0 text-dark small">Punctuality &amp; Gate Arrival</h6>
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Students must enter the campus 10 minutes prior to the prayer bell. Late arrivals will be recorded in the official school diary.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="guideline-item-box">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-success fs-5">auto_stories</span>
                      <h6 className="fw-bold mb-0 text-dark small">School Diary &amp; Stationery</h6>
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      The student diary must be carried daily. All books and notebooks must be neatly covered, labeled, and brought as per the daily timetable.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="guideline-item-box">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-danger fs-5">phonelink_erase</span>
                      <h6 className="fw-bold mb-0 text-dark small">Strict No-Gadgets Policy</h6>
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Mobile phones, smartwatches, digital games, expensive jewelry, and cash exceeding ₹50 are strictly prohibited on school premises.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="guideline-item-box">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-warning fs-5">directions_bus</span>
                      <h6 className="fw-bold mb-0 text-dark small">Transport &amp; Bus Queue Discipline</h6>
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Students must board and alight calmly under the guidance of the bus attendant. Always remain seated while the vehicle is in motion.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="guideline-item-box">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-info fs-5">cleaning_services</span>
                      <h6 className="fw-bold mb-0 text-dark small">Campus Cleanliness &amp; Zero Litter</h6>
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Use segregated dry and wet waste bins. Refrain from scribbling on classroom walls, whiteboards, or desks. Respect institutional property.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="guideline-item-box">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-secondary fs-5">forum</span>
                      <h6 className="fw-bold mb-0 text-dark small">Polite Language &amp; Respect</h6>
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Courteous behavior, polite English greetings, and respectful communication with teachers, attendants, and fellow classmates are mandatory.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Swami Shiwanand Student Pledge */}
              <div className="p-3 px-4 rounded-4 text-white d-flex align-items-center gap-3" style={{ background: 'linear-gradient(135deg, #072a4d 0%, #0c4a7e 100%)' }}>
                <span className="material-symbols-outlined text-warning" style={{ fontSize: '32px' }}>verified</span>
                <div>
                  <h6 className="fw-bold text-white mb-0.5 small">The Swami Shiwanand Student Pledge</h6>
                  <p className="small text-white-75 mb-0" style={{ fontSize: '0.78rem' }}>
                    "I pledge to be truthful in word, respectful in deed, diligent in learning, and a loving protector of my school, nature, and country."
                  </p>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION 5: ATTENDANCE & LEAVE RULES
               ═══════════════════════════════════════ */}
            <section id="attendance" className="mb-5 pt-2">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#059669' }}>
                    <span className="material-symbols-outlined">how_to_reg</span>
                  </div>
                  <div>
                    <h3 className="header-title">Attendance &amp; Leave Rules</h3>
                    <p className="header-subtitle">
                      Regulatory norms governing minimum attendance percentages, medical leaves, and absence protocols.
                    </p>
                  </div>
                </div>
              </div>

              {/* 75% Attendance Banner */}
              <div className="attendance-rule-banner mb-4 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <span className="material-symbols-outlined fs-1 text-warning">verified_user</span>
                  <div>
                    <h5 className="fw-bold mb-1 text-white">Minimum 75% Attendance Mandatory</h5>
                    <p className="small text-white-75 mb-0" style={{ maxWidth: '480px' }}>
                      Regular attendance ensures uninterrupted foundational learning. Students with attendance below 75% will not be permitted to appear in final assessments.
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill fs-6">
                    CBSE Norm &bull; 75%
                  </span>
                </div>
              </div>

              {/* 4 Attendance Regulations Cards */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 bg-white rounded-3 border h-100 shadow-xs">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary fs-5">edit_note</span>
                      <strong className="text-dark small">Leave Application in School Diary</strong>
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.45' }}>
                      Every leave of absence must be applied for in writing through the "Leave Record" section of the school diary, signed by parents or legal guardians.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 bg-white rounded-3 border h-100 shadow-xs">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-danger fs-5">medical_services</span>
                      <strong className="text-dark small">Medical Leave Certification</strong>
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.45' }}>
                      For medical absence exceeding 2 consecutive days, a medical fitness certificate from a registered practitioner must be submitted upon joining.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 bg-white rounded-3 border h-100 shadow-xs">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-warning fs-5">report_problem</span>
                      <strong className="text-dark small">Unexcused Consecutive Absence</strong>
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.45' }}>
                      Unnotified absence of more than 3 consecutive working days results in a parental inquiry. Continuous absence of 10 days invites striking off the roll.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 bg-white rounded-3 border h-100 shadow-xs">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-success fs-5">sensor_door</span>
                      <strong className="text-dark small">Early Departure &amp; Gate Pass</strong>
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.45' }}>
                      No child will be allowed to leave early unless accompanied by parents bearing an authorized Gate Pass issued by the Principal / Reception.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION 6: CCA CALENDAR 2026-27
               ═══════════════════════════════════════ */}
            <section id="cca-calendar" className="mb-5 pt-2">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(234, 88, 12, 0.15)', color: '#ea580c' }}>
                    <span className="material-symbols-outlined">event_upcoming</span>
                  </div>
                  <div>
                    <h3 className="header-title">CCA Calendar 2026–27</h3>
                    <p className="header-subtitle">
                      Month-by-month Co-Curricular Activities, Inter-House Contests, and Cultural Celebrations.
                    </p>
                  </div>
                </div>
              </div>

              {/* CCA Month Cards Grid */}
              <div className="row g-3 mb-4">
                {/* April & May */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-warning fs-5">wb_sunny</span>
                        April &ndash; May 2026
                      </span>
                      <span className="badge bg-warning-subtle text-dark small">Term I Kickoff</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Welcome Circle &amp; Rhymes:</strong> Orientation fest for Nursery &amp; Kindergarten toddlers.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Earth Day Poster Making:</strong> Inter-house creative recycled art &amp; green painting contest.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Clay Modeling &amp; Origami:</strong> Fine motor skills workshop before summer break.</span>
                    </div>
                  </div>
                </div>

                {/* July & August */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-primary fs-5">flag</span>
                        July &ndash; August 2026
                      </span>
                      <span className="badge bg-primary-subtle text-primary small">National Fests</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Independence Day Cultural Fest:</strong> Patriotic song, costume pageant &amp; tricolor march past.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Inter-House Recitation:</strong> English &amp; Hindi elocution and poem recitation competition.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Rakhi &amp; Friendship Craft:</strong> Hand-made eco-friendly thread crafts &amp; card design.</span>
                    </div>
                  </div>
                </div>

                {/* September & October */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-success fs-5">celebration</span>
                        September &ndash; October 2026
                      </span>
                      <span className="badge bg-success-subtle text-success small">Heritage &amp; Arts</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Teachers' Day Homage:</strong> Student-led cultural program honoring educators and mentors.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Hindi Diwas Debate:</strong> Foundational speech, storytelling &amp; shloka recitation.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Dussehra Diya &amp; Rangoli:</strong> Traditional folk colors, festive lamps &amp; cultural stage plays.</span>
                    </div>
                  </div>
                </div>

                {/* November & December */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-danger fs-5">sports_score</span>
                        November &ndash; December 2026
                      </span>
                      <span className="badge bg-danger-subtle text-danger small">Sports &amp; Discovery</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Children's Day Sports Carnival:</strong> Track races, sack jumps, relay fun &amp; toddler hurdles.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Science Discovery Corner Expo:</strong> Junior science models, plant germination &amp; sensory puzzles.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Handwriting &amp; Spell-Bee:</strong> Calligraphy mastery and spelling championship for Std I–V.</span>
                    </div>
                  </div>
                </div>

                {/* January & February */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-info fs-5">stars</span>
                        January &ndash; February 2027
                      </span>
                      <span className="badge bg-info-subtle text-info small">Sanskriti &amp; Math</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Republic Day Parade:</strong> Grand salute, scout drills, national songs &amp; tableaux.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Saraswati Puja Mahotsav:</strong> Sacred prayer, classical kid dance &amp; educational blessings.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Mental Math Olympiad:</strong> Speedy tables, abacus counting &amp; logical reasoning trophy.</span>
                    </div>
                  </div>
                </div>

                {/* March */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-warning fs-5">workspace_premium</span>
                        March 2027
                      </span>
                      <span className="badge bg-warning-subtle text-dark small">Grand Finale</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Annual Prize Distribution:</strong> Awarding academic rank holders, best turnout &amp; 100% attendance.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>KG Graduation Ceremony:</strong> UKG toddlers graduating into Class I with ceremonial scrolls.</span>
                    </div>
                    <div className="cca-event-item">
                      <span className="cca-event-bullet"></span>
                      <span><strong>Inter-House Champion Trophy:</strong> Overall rolling shield awarded to the winning House Guild.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 House Guilds Showcase */}
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-light mb-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                  <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-primary">shield</span>
                    The 4 House Guilds for Inter-School CCA Competitions
                  </h6>
                  <span className="badge bg-white text-muted border small">Championship 2026–27</span>
                </div>
                <div className="row g-3">
                  <div className="col-sm-6 col-12">
                    <div className="house-guild-card house-agni p-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ background: '#ef4444', width: '36px', height: '36px' }}>
                          <span className="material-symbols-outlined fs-6">local_fire_department</span>
                        </div>
                        <div>
                          <strong className="text-danger small d-block">Agni House (Red)</strong>
                          <span className="text-muted" style={{ fontSize: '11px' }}>Courage &bull; Annual Sports Champions</span>
                        </div>
                      </div>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>
                        Fosters boldness, energy, athletics, and unyielding determination in sports &amp; track competitions.
                      </p>
                    </div>
                  </div>

                  <div className="col-sm-6 col-12">
                    <div className="house-guild-card house-vayu p-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ background: '#3b82f6', width: '36px', height: '36px' }}>
                          <span className="material-symbols-outlined fs-6">air</span>
                        </div>
                        <div>
                          <strong className="text-primary small d-block">Vayu House (Blue)</strong>
                          <span className="text-muted" style={{ fontSize: '11px' }}>Wisdom &bull; Quiz &amp; Math Champions</span>
                        </div>
                      </div>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>
                        Encourages intellectual agility, logical deduction, scientific inquiry, and swift sportsmanship.
                      </p>
                    </div>
                  </div>

                  <div className="col-sm-6 col-12">
                    <div className="house-guild-card house-prithvi p-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ background: '#10b981', width: '36px', height: '36px' }}>
                          <span className="material-symbols-outlined fs-6">public</span>
                        </div>
                        <div>
                          <strong className="text-success small d-block">Prithvi House (Green)</strong>
                          <span className="text-muted" style={{ fontSize: '11px' }}>Perseverance &bull; Eco-Club Champions</span>
                        </div>
                      </div>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>
                        Symbolizes stability, nature stewardship, empathy, clean campus drives, and steady perseverance.
                      </p>
                    </div>
                  </div>

                  <div className="col-sm-6 col-12">
                    <div className="house-guild-card house-surya p-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ background: '#f59e0b', width: '36px', height: '36px' }}>
                          <span className="material-symbols-outlined fs-6">wb_sunny</span>
                        </div>
                        <div>
                          <strong className="text-warning small d-block">Surya House (Yellow)</strong>
                          <span className="text-muted" style={{ fontSize: '11px' }}>Radiance &bull; Cultural Arts Champions</span>
                        </div>
                      </div>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>
                        Celebrates warmth, optimism, theatrical drama, vocal music, creative arts, and joyful elocution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION 7: VACATIONS & HOLIDAYS
               ═══════════════════════════════════════ */}
            <section id="vacations" className="mb-5 pt-2">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                  <div>
                    <h3 className="header-title">Vacations &amp; Holidays</h3>
                    <p className="header-subtitle">
                      Official gazetted vacations and institutional breaks for Session 2026–27 (51 Days Total).
                    </p>
                  </div>
                </div>
              </div>

              <div className="vacation-showcase-container">
                <div className="vacation-calendar-banner">
                  <div className="d-flex align-items-center gap-3">
                    <div className="vacation-banner-icon">
                      <span className="material-symbols-outlined fs-4">calendar_month</span>
                    </div>
                    <div>
                      <span className="vacation-banner-tag">OFFICIAL ACADEMIC SCHEDULE &bull; SESSION 2026–27</span>
                      <h5 className="vacation-banner-title mb-0">Major Institutional Vacations</h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="vacation-total-chip">
                      <span className="material-symbols-outlined fs-6 text-success">event_note</span>
                      <span><strong>51 Days</strong> Total Scheduled Recess</span>
                    </span>
                  </div>
                </div>

                <div className="row g-3">
                  {/* Card 1: Summer Vacation */}
                  <div className="col-md-6 col-12">
                    <div className="vacation-card card-summer">
                      <div>
                        <div className="vacation-card-top">
                          <div className="d-flex align-items-center gap-3">
                            <div className="vacation-icon-halo">
                              <span className="material-symbols-outlined fs-4">wb_sunny</span>
                            </div>
                            <div>
                              <span className="vacation-season-tag">SUMMER BREAK 2026</span>
                              <h5 className="vacation-card-title mb-0">Summer Vacation</h5>
                            </div>
                          </div>
                          <span className="vacation-days-badge">27 Days</span>
                        </div>
                        <div className="vacation-date-box">
                          <div className="d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined text-warning fs-5">date_range</span>
                            <span className="vacation-date-text">25th May 2026 &ndash; 20th June 2026</span>
                          </div>
                          <span className="vacation-status-pill">Gazetted Recess</span>
                        </div>
                      </div>
                      <div className="vacation-card-footer">
                        <span className="vacation-reopen-note">
                          <span className="material-symbols-outlined fs-6 text-success">event_available</span>
                          Reopens: <strong>Mon, 22nd June 2026</strong>
                        </span>
                        <span className="vacation-scope-tag">All Classes</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Durga Puja & Dussehra */}
                  <div className="col-md-6 col-12">
                    <div className="vacation-card card-autumn">
                      <div>
                        <div className="vacation-card-top">
                          <div className="d-flex align-items-center gap-3">
                            <div className="vacation-icon-halo">
                              <span className="material-symbols-outlined fs-4">festival</span>
                            </div>
                            <div>
                              <span className="vacation-season-tag">AUTUMN FESTIVAL 2026</span>
                              <h5 className="vacation-card-title mb-0">Durga Puja &amp; Dussehra</h5>
                            </div>
                          </div>
                          <span className="vacation-days-badge">7 Days</span>
                        </div>
                        <div className="vacation-date-box">
                          <div className="d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined text-primary fs-5">date_range</span>
                            <span className="vacation-date-text">16th Oct 2026 &ndash; 22nd Oct 2026</span>
                          </div>
                          <span className="vacation-status-pill">Festival Recess</span>
                        </div>
                      </div>
                      <div className="vacation-card-footer">
                        <span className="vacation-reopen-note">
                          <span className="material-symbols-outlined fs-6 text-success">event_available</span>
                          Reopens: <strong>Fri, 23rd Oct 2026</strong>
                        </span>
                        <span className="vacation-scope-tag">All Classes</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Deepawali & Chhath Puja */}
                  <div className="col-md-6 col-12">
                    <div className="vacation-card card-diwali">
                      <div>
                        <div className="vacation-card-top">
                          <div className="d-flex align-items-center gap-3">
                            <div className="vacation-icon-halo">
                              <span className="material-symbols-outlined fs-4">celebration</span>
                            </div>
                            <div>
                              <span className="vacation-season-tag">BIHAR REGIONAL FESTIVALS</span>
                              <h5 className="vacation-card-title mb-0">Deepawali &amp; Chhath Puja</h5>
                            </div>
                          </div>
                          <span className="vacation-days-badge">8 Days</span>
                        </div>
                        <div className="vacation-date-box">
                          <div className="d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined text-warning fs-5">date_range</span>
                            <span className="vacation-date-text">08th Nov 2026 &ndash; 16th Nov 2026</span>
                          </div>
                          <span className="vacation-status-pill">Sacred Festivities</span>
                        </div>
                      </div>
                      <div className="vacation-card-footer">
                        <span className="vacation-reopen-note">
                          <span className="material-symbols-outlined fs-6 text-success">event_available</span>
                          Reopens: <strong>Tue, 17th Nov 2026</strong>
                        </span>
                        <span className="vacation-scope-tag">All Classes</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Winter Vacation */}
                  <div className="col-md-6 col-12">
                    <div className="vacation-card card-winter">
                      <div>
                        <div className="vacation-card-top">
                          <div className="d-flex align-items-center gap-3">
                            <div className="vacation-icon-halo">
                              <span className="material-symbols-outlined fs-4">ac_unit</span>
                            </div>
                            <div>
                              <span className="vacation-season-tag">WINTER RECESS 2026–27</span>
                              <h5 className="vacation-card-title mb-0">Winter Vacation</h5>
                            </div>
                          </div>
                          <span className="vacation-days-badge">9 Days</span>
                        </div>
                        <div className="vacation-date-box">
                          <div className="d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined text-info fs-5">date_range</span>
                            <span className="vacation-date-text">28th Dec 2026 &ndash; 05th Jan 2027</span>
                          </div>
                          <span className="vacation-status-pill">Cold Wave Break</span>
                        </div>
                      </div>
                      <div className="vacation-card-footer">
                        <span className="vacation-reopen-note">
                          <span className="material-symbols-outlined fs-6 text-success">event_available</span>
                          Reopens: <strong>Wed, 06th Jan 2027</strong>
                        </span>
                        <span className="vacation-scope-tag">All Classes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar Column matching About.jsx */}
          <div className="col-lg-4">
            {/* Quick Section Navigation Card (In This Section) */}
            <div className="modern-sidebar-card mb-4" id="section-nav">
              <div className="modern-sidebar-header">
                <div className="modern-sidebar-title">
                  <span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>list_alt</span>
                  In This Section
                </div>
                <span className="modern-sidebar-badge">Navigation</span>
              </div>
              <div className="p-0">
                <a href="#moral" className="modern-nav-row">
                  <span className="nav-row-left">
                    <span className="material-symbols-outlined text-success">volunteer_activism</span>
                    Assembly &amp; Moral Education
                  </span>
                  <span className="material-symbols-outlined nav-arrow text-muted">arrow_forward_ios</span>
                </a>
                <a href="#uniform" className="modern-nav-row">
                  <span className="nav-row-left">
                    <span className="material-symbols-outlined text-primary">checkroom</span>
                    School Uniform
                  </span>
                  <span className="material-symbols-outlined nav-arrow text-muted">arrow_forward_ios</span>
                </a>
                <a href="#guidelines-students" className="modern-nav-row">
                  <span className="nav-row-left">
                    <span className="material-symbols-outlined text-indigo" style={{ color: '#6366f1' }}>menu_book</span>
                    Guidelines For Students
                  </span>
                  <span className="material-symbols-outlined nav-arrow text-muted">arrow_forward_ios</span>
                </a>
                <a href="#timings" className="modern-nav-row">
                  <span className="nav-row-left">
                    <span className="material-symbols-outlined text-warning">schedule</span>
                    School Timing &amp; Routine
                  </span>
                  <span className="material-symbols-outlined nav-arrow text-muted">arrow_forward_ios</span>
                </a>
                <a href="#attendance" className="modern-nav-row">
                  <span className="nav-row-left">
                    <span className="material-symbols-outlined text-teal" style={{ color: '#0d9488' }}>how_to_reg</span>
                    Attendance &amp; Leave Rules
                  </span>
                  <span className="material-symbols-outlined nav-arrow text-muted">arrow_forward_ios</span>
                </a>
                <a href="#cca-calendar" className="modern-nav-row">
                  <span className="nav-row-left">
                    <span className="material-symbols-outlined text-orange" style={{ color: '#ea580c' }}>event_upcoming</span>
                    CCA Calendar 2026–27
                  </span>
                  <span className="material-symbols-outlined nav-arrow text-muted">arrow_forward_ios</span>
                </a>
                <a href="#vacations" className="modern-nav-row">
                  <span className="nav-row-left">
                    <span className="material-symbols-outlined text-danger">calendar_month</span>
                    Vacations &amp; Holidays
                  </span>
                  <span className="material-symbols-outlined nav-arrow text-muted">arrow_forward_ios</span>
                </a>
              </div>
            </div>

            {/* Key Statistics Card (Matching About.jsx) */}
            <div className="modern-sidebar-card mb-4" id="statistics">
              <div className="modern-sidebar-header amber-theme">
                <div className="modern-sidebar-title">
                  <span className="material-symbols-outlined" style={{ color: '#fef08a' }}>analytics</span>
                  Student Life at a Glance
                </div>
                <span className="modern-sidebar-badge">Active</span>
              </div>
              <div className="p-2">
                <div className="modern-stat-row">
                  <span className="stat-row-label">
                    <span className="material-symbols-outlined fs-6 text-primary">calendar_month</span>
                    Year Established
                  </span>
                  <span className="stat-row-value">{schoolInfo.estd}</span>
                </div>
                <div className="modern-stat-row">
                  <span className="stat-row-label">
                    <span className="material-symbols-outlined fs-6 text-success">groups</span>
                    Student Body
                  </span>
                  <span className="stat-row-value text-success">500+ Active Learners</span>
                </div>
                <div className="modern-stat-row">
                  <span className="stat-row-label">
                    <span className="material-symbols-outlined fs-6 text-warning">person_pin</span>
                    Student-Teacher Ratio
                  </span>
                  <span className="stat-row-value text-primary">15 : 1 (Personal Care)</span>
                </div>
                <div className="modern-stat-row">
                  <span className="stat-row-label">
                    <span className="material-symbols-outlined fs-6 text-info">shield</span>
                    School Houses
                  </span>
                  <span className="stat-row-value">4 Houses (Agni, Vayu, Prithvi, Surya)</span>
                </div>
                <div className="modern-stat-row">
                  <span className="stat-row-label">
                    <span className="material-symbols-outlined fs-6 text-danger">event_note</span>
                    Annual Holidays
                  </span>
                  <span className="stat-row-value">51 Gazetted Days</span>
                </div>
                <div className="modern-stat-row">
                  <span className="stat-row-label">
                    <span className="material-symbols-outlined fs-6 text-secondary">videocam</span>
                    Campus Safety
                  </span>
                  <span className="stat-row-value text-success">100% CCTV Monitored</span>
                </div>
              </div>
            </div>

            {/* Quick Admission CTA matching About.jsx */}
            <div className="card shadow-sm border-0 rounded-3 mb-4 overflow-hidden bg-light border">
              <div className="card-body p-4 text-center">
                <i className="fas fa-user-graduate fa-3x text-primary mb-3"></i>
                <h5 className="fw-bold text-dark">Admissions Open 2026-27</h5>
                <p className="small text-muted mb-4">
                  Enroll your child in Playgroup, Nursery, LKG, UKG or Classes I to V.
                </p>
                <Link to="/admission" className="btn btn-warning w-100 fw-bold py-2 mb-2">
                  <i className="fas fa-edit me-1"></i> Apply Online Now
                </Link>
                <Link to="/contact" className="btn btn-outline-primary w-100 fw-bold py-2 small">
                  <i className="fas fa-phone-alt me-1"></i> Contact Admission Desk
                </Link>
              </div>
            </div>

            {/* Student Documents Card */}
            <div className="modern-sidebar-card">
              <div className="modern-sidebar-header emerald-theme">
                <div className="modern-sidebar-title">
                  <span className="material-symbols-outlined" style={{ color: '#a7f3d0' }}>download</span>
                  Student Documents
                </div>
                <span className="modern-sidebar-badge">PDF</span>
              </div>
              <div className="p-3 d-flex flex-column gap-2">
                <a href="#timings" className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-white text-decoration-none text-dark hover-shadow">
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-warning">schedule</span>
                    <span className="small fw-semibold">Wing Timings Chart 2026–27</span>
                  </div>
                  <span className="badge bg-light text-muted">Table</span>
                </a>
                <a href="#vacations" className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-white text-decoration-none text-dark hover-shadow">
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-danger">picture_as_pdf</span>
                    <span className="small fw-semibold">Holiday Calendar (51 Days)</span>
                  </div>
                  <span className="badge bg-light text-muted">PDF</span>
                </a>
                <a href="#uniform" className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-white text-decoration-none text-dark hover-shadow">
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
                    <span className="small fw-semibold">Uniform Dress Code Chart</span>
                  </div>
                  <span className="badge bg-light text-muted">PDF</span>
                </a>
                <a href="#cca-calendar" className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-white text-decoration-none text-dark hover-shadow">
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-success">picture_as_pdf</span>
                    <span className="small fw-semibold">CCA Activity Calendar</span>
                  </div>
                  <span className="badge bg-light text-muted">PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
