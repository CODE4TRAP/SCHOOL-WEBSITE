import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { schoolInfo } from '../data/content';

export default function StudentCorner() {
  const [uniformTab, setUniformTab] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');

  // Interactive Periods List
  const periodSchedule = [
    {
      id: 'assembly',
      periodLabel: 'Assembly',
      type: 'assembly',
      timeRange: '07:35 AM – 07:50 AM',
      icon: 'record_voice_over',
      time: 'Assembly',
      duration: '15 Mins',
      title: 'Morning Assembly & Spiritual Invocations',
      desc: 'Gayatri Mantra, Saraswati Vandana, National Student Pledge, Thought for the Day & GK digest.',
      color: '#f59e0b',
      badgeBg: 'bg-warning-subtle',
      badgeText: 'text-warning-emphasis'
    },
    {
      id: 'p1',
      periodLabel: 'Period 1',
      type: 'academic',
      timeRange: '07:50 AM – 08:30 AM',
      icon: 'auto_stories',
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
      periodLabel: 'Period 2',
      type: 'academic',
      timeRange: '08:30 AM – 09:10 AM',
      icon: 'calculate',
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
      periodLabel: 'Period 3',
      type: 'academic',
      timeRange: '09:10 AM – 09:50 AM',
      icon: 'psychology',
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
      periodLabel: 'Recess Break',
      type: 'break',
      timeRange: '09:50 AM – 10:15 AM',
      icon: 'lunch_dining',
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
      periodLabel: 'Period 4',
      type: 'creative',
      timeRange: '10:15 AM – 10:50 AM',
      icon: 'palette',
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
      periodLabel: 'Period 5',
      type: 'academic',
      timeRange: '10:50 AM – 11:25 AM',
      icon: 'computer',
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
      periodLabel: 'Period 6',
      type: 'activity',
      timeRange: '11:25 AM – 12:00 PM',
      icon: 'sports_soccer',
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
      periodLabel: 'Period 7',
      type: 'wrapup',
      timeRange: '12:00 PM – 12:25 PM',
      icon: 'checklist_rtl',
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
    if (periodFilter === 'activity') return p.type === 'activity' || p.type === 'creative' || p.type === 'break' || p.type === 'assembly' || p.type === 'wrapup';
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
              <div className="section-header-box timing-header-box mb-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 w-100">
                  <div className="d-flex align-items-center gap-3">
                    <div className="header-icon-box">
                      <span className="material-symbols-outlined fs-4">schedule</span>
                    </div>
                    <div>
                      <h3 className="header-title">School Timing &amp; Routine</h3>
                      <p className="header-subtitle">
                        Official Wing-wise schedule table matching academic and seasonal guidelines.
                      </p>
                    </div>
                  </div>
                  <div className="header-status-cluster">
                    <span className="timing-season-badge">
                      <span className="material-symbols-outlined text-warning" style={{ fontSize: '15px' }}>wb_sunny</span>
                      Dual Season Timings
                    </span>
                    <span className="live-bell-pulse">
                      <span className="live-bell-dot"></span>
                      <span>School Routine Active</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* AUTHENTIC WING-WISE TIMINGS TABLE (Redesigned Executive Card) */}
              <div className="wing-timings-card mb-4">
                <div className="wing-timings-card-header">
                  <div className="d-flex align-items-center gap-3">
                    <div className="schedule-header-icon-halo halo-amber">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <h5 className="wing-timings-title">Official Wing-Wise Operational Hours</h5>
                        <span className="schedule-session-pill pill-amber">Session 2026–27</span>
                      </div>
                      <p className="wing-timings-sub">Structured Stage Timings &amp; Seasonal Schedule Shifts &bull; Nursery to Middle Wing</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="wing-timings-header-pill">
                      <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>calendar_today</span>
                      Monday &ndash; Saturday
                    </span>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="wing-timings-table">
                    <thead>
                      <tr>
                        <th style={{ width: '40%' }}>Wing &amp; Academic Stage</th>
                        <th style={{ width: '30%' }}>
                          <span className="d-flex align-items-center gap-1 text-warning-emphasis">
                            <span className="material-symbols-outlined fs-6 text-warning">sunny</span>
                            Summer Timings (Apr &ndash; Oct)
                          </span>
                        </th>
                        <th style={{ width: '30%' }}>
                          <span className="d-flex align-items-center gap-1 text-info-emphasis">
                            <span className="material-symbols-outlined fs-6 text-info">ac_unit</span>
                            Winter Timings (Nov &ndash; Mar)
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="wing-meta-block">
                            <div className="wing-meta-icon" style={{ background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' }}>
                              <span className="material-symbols-outlined">toys</span>
                            </div>
                            <div>
                              <strong className="wing-meta-name">Playgroup &amp; Nursery</strong>
                              <span className="wing-meta-sub">Early Childhood Foundation &bull; Age 2.5 &ndash; 4 Yrs</span>
                              <span className="wing-meta-chip" style={{ background: '#fef3c7', color: '#92400e' }}>
                                Foundational Wing
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="timing-pill-summer">
                            <span className="material-symbols-outlined fs-6">wb_sunny</span>
                            <span>08:30 AM &ndash; 11:30 AM</span>
                            <span className="timing-duration-tag">3 hrs</span>
                          </div>
                        </td>
                        <td>
                          <div className="timing-pill-winter">
                            <span className="material-symbols-outlined fs-6">ac_unit</span>
                            <span>09:00 AM &ndash; 12:00 PM</span>
                            <span className="timing-duration-tag">3 hrs</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="wing-meta-block">
                            <div className="wing-meta-icon" style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>
                              <span className="material-symbols-outlined">child_care</span>
                            </div>
                            <div>
                              <strong className="wing-meta-name">LKG &amp; UKG (Kindergarten)</strong>
                              <span className="wing-meta-sub">Montessori Phonics &amp; Numeracy &bull; Age 4 &ndash; 6 Yrs</span>
                              <span className="wing-meta-chip" style={{ background: '#dbeafe', color: '#1e40af' }}>
                                Kindergarten Wing
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="timing-pill-summer">
                            <span className="material-symbols-outlined fs-6">wb_sunny</span>
                            <span>08:00 AM &ndash; 12:30 PM</span>
                            <span className="timing-duration-tag">4.5 hrs</span>
                          </div>
                        </td>
                        <td>
                          <div className="timing-pill-winter">
                            <span className="material-symbols-outlined fs-6">ac_unit</span>
                            <span>08:30 AM &ndash; 01:00 PM</span>
                            <span className="timing-duration-tag">4.5 hrs</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="wing-meta-block">
                            <div className="wing-meta-icon" style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                              <span className="material-symbols-outlined">school</span>
                            </div>
                            <div>
                              <strong className="wing-meta-name">Primary &amp; Middle (Std I to VI)</strong>
                              <span className="wing-meta-sub">CBSE Pattern Core Curriculum &bull; Age 6 &ndash; 12 Yrs</span>
                              <span className="wing-meta-chip" style={{ background: '#d1fae5', color: '#065f46' }}>
                                Preparatory &amp; Middle Wing
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="timing-pill-summer">
                            <span className="material-symbols-outlined fs-6">wb_sunny</span>
                            <span>07:45 AM &ndash; 01:30 PM</span>
                            <span className="timing-duration-tag">5h 45m</span>
                          </div>
                        </td>
                        <td>
                          <div className="timing-pill-winter">
                            <span className="material-symbols-outlined fs-6">ac_unit</span>
                            <span>08:15 AM &ndash; 02:00 PM</span>
                            <span className="timing-duration-tag">5h 45m</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="wing-timings-footer">
                  <div className="wing-footer-notice">
                    <span className="material-symbols-outlined text-primary">notifications_active</span>
                    <span><strong>Morning Arrival:</strong> Main school gate opens 20 minutes before first bell. 15-minute daily moral assembly.</span>
                  </div>
                  <div className="wing-footer-notice">
                    <span className="material-symbols-outlined text-success">directions_bus</span>
                    <span><strong>Safe Dispersal:</strong> Teacher-supervised boarding with GPS-tracked school vans &amp; verified guardian turnover.</span>
                  </div>
                </div>
              </div>

              {/* Day Period Distribution Timeline Cards */}
              <div className="digital-timetable-card mb-4">
                <div className="timetable-header">
                  <div className="d-flex align-items-center gap-3">
                    <div className="timetable-icon-badge">
                      <span className="material-symbols-outlined fs-5">view_timeline</span>
                    </div>
                    <div>
                      <div className="timetable-title">Academic Period Schedule &amp; Daily Flow</div>
                      <span className="timetable-sub">Balanced cognitive, linguistic, creative &amp; physical periods</span>
                    </div>
                  </div>
                  {/* Filter Pills */}
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className={`period-filter-pill ${periodFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setPeriodFilter('all')}
                    >
                      All (7 Periods + Break)
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

                <div className="timetable-body">
                  <div className="d-flex flex-column gap-3">
                    {filteredPeriods.map(item => (
                      <div
                        key={item.id}
                        className={`period-row-card ${item.isRecess ? 'is-recess' : ''}`}
                        style={{ borderLeft: `5px solid ${item.color}` }}
                      >
                        <div className="period-time-block">
                          <span className="period-label-tag d-flex align-items-center gap-1">
                            <span className="material-symbols-outlined fs-6">{item.icon}</span>
                            {item.periodLabel}
                          </span>
                          <span className="period-clock-time">{item.timeRange}</span>
                        </div>

                        <div className="period-info-block">
                          <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                            <h6 className="mb-0 period-subject-title">{item.title}</h6>
                            {item.isRecess && (
                              <span className="recess-pill">
                                <span className="material-symbols-outlined fs-6">restaurant</span>
                                NUTRITION RECESS
                              </span>
                            )}
                          </div>
                          <p className="mb-0 period-subject-desc">{item.desc}</p>
                        </div>

                        <div className="period-duration-badge">
                          <span className="material-symbols-outlined fs-6">timer</span>
                          {item.duration}
                        </div>
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
              <div className="section-header-box uniform-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box">
                    <span className="material-symbols-outlined fs-4">checkroom</span>
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
              <div className="attire-tab-switcher mb-4">
                <button
                  type="button"
                  className={`attire-tab-btn ${uniformTab === 'all' ? 'active' : ''}`}
                  onClick={() => setUniformTab('all')}
                >
                  <span className="material-symbols-outlined fs-6">checklist</span>
                  <span className="attire-tab-label">All Wardrobe</span>
                  <span className="attire-tab-sub">Complete</span>
                </button>
                <button
                  type="button"
                  className={`attire-tab-btn ${uniformTab === 'regular' ? 'active' : ''}`}
                  onClick={() => setUniformTab('regular')}
                >
                  <span className="material-symbols-outlined fs-6">dry_cleaning</span>
                  <span className="attire-tab-label">Regular Weekdays</span>
                  <span className="attire-tab-sub">Mon &ndash; Fri</span>
                </button>
                <button
                  type="button"
                  className={`attire-tab-btn ${uniformTab === 'sports' ? 'active' : ''}`}
                  onClick={() => setUniformTab('sports')}
                >
                  <span className="material-symbols-outlined fs-6">sports_handball</span>
                  <span className="attire-tab-label">Sports &amp; House</span>
                  <span className="attire-tab-sub">Wed &amp; Sat</span>
                </button>
                <button
                  type="button"
                  className={`attire-tab-btn ${uniformTab === 'winter' ? 'active' : ''}`}
                  onClick={() => setUniformTab('winter')}
                >
                  <span className="material-symbols-outlined fs-6">ac_unit</span>
                  <span className="attire-tab-label">Winter Season</span>
                  <span className="attire-tab-sub">Nov &ndash; Feb</span>
                </button>
              </div>

              {/* Uniform Detail Cards */}
              {(uniformTab === 'all' || uniformTab === 'regular') && (
                <div className="uniform-showcase-box mb-4">
                  <div className="uniform-showcase-header">
                    <div className="d-flex align-items-center gap-2">
                      <span className="material-symbols-outlined text-warning fs-5">dry_cleaning</span>
                      <div>
                        <strong className="text-white d-block" style={{ fontSize: '0.98rem' }}>Regular Weekday Academic Attire</strong>
                        <span className="text-white-50 small">Monday, Tuesday, Thursday &amp; Friday &bull; Standard Formal Turnout</span>
                      </div>
                    </div>
                    <span className="uniform-showcase-badge">Mandatory Formal Uniform</span>
                  </div>

                  <div className="uniform-showcase-body">
                    <div className="row g-4">
                      {/* Boys Turnout */}
                      <div className="col-lg-6 col-12">
                        <div className="uniform-gender-card turnout-boys">
                          <div className="uniform-gender-header">
                            <div className="gender-avatar-halo boy">
                              <span className="material-symbols-outlined fs-4">boy</span>
                            </div>
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <h6 className="mb-0 fw-bold text-dark">Boys Turnout</h6>
                                <span className="turnout-chip chip-boys">Official Standard</span>
                              </div>
                              <span className="text-muted small">Playgroup to Std VI &bull; Formal Turnout</span>
                            </div>
                          </div>

                          <div className="uniform-item-list">
                            <div className="uniform-item-tile tile-shirt">
                              <div className="tile-icon-box box-shirt">
                                <span className="material-symbols-outlined">checkroom</span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-between gap-2 mb-0.5">
                                  <strong className="text-dark tile-title">Sky Blue Half-Sleeve</strong>
                                  <span className="uniform-tag-pill tag-shirt">Shirt</span>
                                </div>
                                <p className="tile-desc mb-0">
                                  Tailored cotton shirt with fine embroidery of official school crest on left breast pocket.
                                </p>
                              </div>
                            </div>

                            <div className="uniform-item-tile tile-bottom">
                              <div className="tile-icon-box box-bottom">
                                <span className="material-symbols-outlined">styler</span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-between gap-2 mb-0.5">
                                  <strong className="text-dark tile-title">Royal Blue Shorts / Trousers</strong>
                                  <span className="uniform-tag-pill tag-bottom">Bottoms</span>
                                </div>
                                <p className="tile-desc mb-0">
                                  Customized shorts for PG to Std II; tailored formal trousers for Std III to VI.
                                </p>
                              </div>
                            </div>

                            <div className="uniform-item-tile tile-tie">
                              <div className="tile-icon-box box-tie">
                                <span className="material-symbols-outlined">workspace_premium</span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-between gap-2 mb-0.5">
                                  <strong className="text-dark tile-title">Belt &amp; Necktie</strong>
                                  <span className="uniform-tag-pill tag-tie">Accessories</span>
                                </div>
                                <p className="tile-desc mb-0">
                                  Navy woven belt with embossed school brass buckle &amp; official striped patterned necktie.
                                </p>
                              </div>
                            </div>

                            <div className="uniform-item-tile tile-shoes">
                              <div className="tile-icon-box box-shoes">
                                <span className="material-symbols-outlined">hiking</span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-between gap-2 mb-0.5">
                                  <strong className="text-dark tile-title">Oxford Shoes &amp; Socks</strong>
                                  <span className="uniform-tag-pill tag-shoes">Footwear</span>
                                </div>
                                <p className="tile-desc mb-0">
                                  Mirror-polished black leather oxford shoes with royal blue socks and double white bands.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Girls Turnout */}
                      <div className="col-lg-6 col-12">
                        <div className="uniform-gender-card turnout-girls">
                          <div className="uniform-gender-header">
                            <div className="gender-avatar-halo girl">
                              <span className="material-symbols-outlined fs-4">girl</span>
                            </div>
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <h6 className="mb-0 fw-bold text-dark">Girls Turnout</h6>
                                <span className="turnout-chip chip-girls">Official Standard</span>
                              </div>
                              <span className="text-muted small">Playgroup to Std VI &bull; Formal Turnout</span>
                            </div>
                          </div>

                          <div className="uniform-item-list">
                            <div className="uniform-item-tile tile-shirt">
                              <div className="tile-icon-box box-shirt-girl">
                                <span className="material-symbols-outlined">checkroom</span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-between gap-2 mb-0.5">
                                  <strong className="text-dark tile-title">Sky Blue Peter-Pan Blouse</strong>
                                  <span className="uniform-tag-pill tag-shirt">Shirt</span>
                                </div>
                                <p className="tile-desc mb-0">
                                  Crisp collared shirt with embroidered school monogram and neat button placket.
                                </p>
                              </div>
                            </div>

                            <div className="uniform-item-tile tile-bottom">
                              <div className="tile-icon-box box-bottom-girl">
                                <span className="material-symbols-outlined">styler</span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-between gap-2 mb-0.5">
                                  <strong className="text-dark tile-title">Knife-Pleated Pinafore</strong>
                                  <span className="uniform-tag-pill tag-bottom">Skirt/Tunic</span>
                                </div>
                                <p className="tile-desc mb-0">
                                  Royal blue knife-pleated skirt/pinafore falling neatly at knee length with modesty lining.
                                </p>
                              </div>
                            </div>

                            <div className="uniform-item-tile tile-hair">
                              <div className="tile-icon-box box-hair">
                                <span className="material-symbols-outlined">face_3</span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-between gap-2 mb-0.5">
                                  <strong className="text-dark tile-title">Ribbons &amp; Headband</strong>
                                  <span className="uniform-tag-pill tag-hair">Hair</span>
                                </div>
                                <p className="tile-desc mb-0">
                                  Hair neatly braided into two plaits with official royal blue satin ribbons or simple blue band.
                                </p>
                              </div>
                            </div>

                            <div className="uniform-item-tile tile-shoes">
                              <div className="tile-icon-box box-shoes-girl">
                                <span className="material-symbols-outlined">hiking</span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-between gap-2 mb-0.5">
                                  <strong className="text-dark tile-title">Buckle Shoes &amp; Socks</strong>
                                  <span className="uniform-tag-pill tag-shoes">Footwear</span>
                                </div>
                                <p className="tile-desc mb-0">
                                  Classic black leather single-buckle school shoes with royal blue knee socks. No heels.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(uniformTab === 'all' || uniformTab === 'sports') && (
                <div className="uniform-showcase-box mb-4">
                  <div className="uniform-showcase-header">
                    <div className="d-flex align-items-center gap-2">
                      <span className="material-symbols-outlined text-warning fs-5">sports_handball</span>
                      <div>
                        <strong className="text-white d-block" style={{ fontSize: '0.98rem' }}>House Sports &amp; Yoga Attire</strong>
                        <span className="text-white-50 small">Wednesday &amp; Saturday &bull; Athletic PT, Drill &amp; House Competitions</span>
                      </div>
                    </div>
                    <span className="uniform-showcase-badge">House Identity Day</span>
                  </div>

                  <div className="uniform-showcase-body">
                    {/* 4 House Swatches */}
                    <div className="row g-3 mb-4">
                      <div className="col-sm-6 col-md-3">
                        <div className="sports-house-card house-card-agni p-3 rounded-3 text-center h-100">
                          <div className="sports-house-icon-ring ring-agni mb-2">
                            <span className="material-symbols-outlined fs-5">local_fire_department</span>
                          </div>
                          <h6 className="fw-bold mb-1 house-title text-danger">Agni House</h6>
                          <span className="house-polo-badge badge-agni mb-2">Red Polo T-Shirt</span>
                          <p className="house-motto text-muted small mb-0">Motto: Courage &amp; Valour</p>
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-3">
                        <div className="sports-house-card house-card-vayu p-3 rounded-3 text-center h-100">
                          <div className="sports-house-icon-ring ring-vayu mb-2">
                            <span className="material-symbols-outlined fs-5">air</span>
                          </div>
                          <h6 className="fw-bold mb-1 house-title text-primary">Vayu House</h6>
                          <span className="house-polo-badge badge-vayu mb-2">Blue Polo T-Shirt</span>
                          <p className="house-motto text-muted small mb-0">Motto: Agility &amp; Vision</p>
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-3">
                        <div className="sports-house-card house-card-prithvi p-3 rounded-3 text-center h-100">
                          <div className="sports-house-icon-ring ring-prithvi mb-2">
                            <span className="material-symbols-outlined fs-5">eco</span>
                          </div>
                          <h6 className="fw-bold mb-1 house-title text-success">Prithvi House</h6>
                          <span className="house-polo-badge badge-prithvi mb-2">Green Polo T-Shirt</span>
                          <p className="house-motto text-muted small mb-0">Motto: Harmony &amp; Growth</p>
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-3">
                        <div className="sports-house-card house-card-surya p-3 rounded-3 text-center h-100">
                          <div className="sports-house-icon-ring ring-surya mb-2">
                            <span className="material-symbols-outlined fs-5">wb_sunny</span>
                          </div>
                          <h6 className="fw-bold mb-1 house-title text-warning-emphasis">Surya House</h6>
                          <span className="house-polo-badge badge-surya mb-2">Gold Polo T-Shirt</span>
                          <p className="house-motto text-muted small mb-0">Motto: Wisdom &amp; Brilliance</p>
                        </div>
                      </div>
                    </div>

                    <div className="row g-4">
                      <div className="col-md-6 col-12">
                        <div className="uniform-gender-card">
                          <div className="uniform-gender-header">
                            <div className="gender-avatar-halo boy">
                              <span className="material-symbols-outlined fs-4">fitness_center</span>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold text-dark">Sports Tops &amp; Collared Polos</h6>
                              <span className="text-muted small">Breathable High-Performance Cotton</span>
                            </div>
                          </div>
                          <div className="uniform-item-list">
                            <div className="uniform-item-tile">
                              <span className="uniform-tag-pill tag-shirt">HOUSE CREST</span>
                              <div className="small text-dark">
                                <strong>Embroidered Emblem:</strong> Each student wears their allocated House color polo with the golden school emblem embroidered on the chest.
                              </div>
                            </div>
                            <div className="uniform-item-tile">
                              <span className="uniform-tag-pill tag-shirt">FABRIC SPEC</span>
                              <div className="small text-dark">
                                <strong>Sweat-Wicking Cotton:</strong> 100% combed breathable cotton engineered for heat dissipation during athletics &amp; yoga.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-12">
                        <div className="uniform-gender-card">
                          <div className="uniform-gender-header">
                            <div className="gender-avatar-halo girl">
                              <span className="material-symbols-outlined fs-4">directions_run</span>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold text-dark">Track Pants &amp; White Canvas</h6>
                              <span className="text-muted small">Flexibility, Safety &amp; Agility</span>
                            </div>
                          </div>
                          <div className="uniform-item-list">
                            <div className="uniform-item-tile">
                              <span className="uniform-tag-pill tag-bottom">BOTTOMS</span>
                              <div className="small text-dark">
                                <strong>White Sports Track Pants:</strong> Pristine all-white relaxed-fit track pants with elastic waist and reinforced knee seams.
                              </div>
                            </div>
                            <div className="uniform-item-tile">
                              <span className="uniform-tag-pill tag-shoes">SHOES &amp; SOCKS</span>
                              <div className="small text-dark">
                                <strong>White Canvas PT Shoes:</strong> Spotlessly clean white rubber-sole PT shoes with cushioned white athletic ankle socks.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(uniformTab === 'all' || uniformTab === 'winter') && (
                <div className="uniform-showcase-box mb-4">
                  <div className="uniform-showcase-header">
                    <div className="d-flex align-items-center gap-2">
                      <span className="material-symbols-outlined text-warning fs-5">ac_unit</span>
                      <div>
                        <strong className="text-white d-block" style={{ fontSize: '0.98rem' }}>Winter Season Thermal Uniform</strong>
                        <span className="text-white-50 small">November through February &bull; Complete Thermal Protection &amp; Elegance</span>
                      </div>
                    </div>
                    <span className="uniform-showcase-badge">Winter Shield Attire</span>
                  </div>

                  <div className="uniform-showcase-body">
                    <div className="row g-4">
                      <div className="col-md-6 col-12">
                        <div className="uniform-gender-card">
                          <div className="uniform-gender-header">
                            <div className="gender-avatar-halo boy">
                              <span className="material-symbols-outlined fs-4">dry_cleaning</span>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold text-dark">Woolen Pullover &amp; School Blazer</h6>
                              <span className="text-muted small">Standard Cold Weather Layers</span>
                            </div>
                          </div>
                          <div className="uniform-item-list">
                            <div className="uniform-item-tile">
                              <span className="uniform-tag-pill tag-warm">SWEATER</span>
                              <div className="small text-dark">
                                <strong>V-Neck Woolen Pullover:</strong> Navy blue pure wool V-neck sweater with woven school crest and contrasting gold stripe along neck and cuffs.
                              </div>
                            </div>
                            <div className="uniform-item-tile">
                              <span className="uniform-tag-pill tag-warm">BLAZER</span>
                              <div className="small text-dark">
                                <strong>Formal School Blazer:</strong> Navy blue single-breasted twill blazer with brass monogrammed school buttons and golden bullion crest.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-12">
                        <div className="uniform-gender-card">
                          <div className="uniform-gender-header">
                            <div className="gender-avatar-halo girl">
                              <span className="material-symbols-outlined fs-4">accessibility_new</span>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold text-dark">Thermal Leggings &amp; Headgear</h6>
                              <span className="text-muted small">Fog &amp; Cold Wave Defense</span>
                            </div>
                          </div>
                          <div className="uniform-item-list">
                            <div className="uniform-item-tile">
                              <span className="uniform-tag-pill tag-bottom">LEGGINGS</span>
                              <div className="small text-dark">
                                <strong>Navy Thermal Stockings:</strong> For girls, opaque thermal wool navy stockings or warm fleece-lined tights worn underneath skirt.
                              </div>
                            </div>
                            <div className="uniform-item-tile">
                              <span className="uniform-tag-pill tag-hair">CAP / SCARF</span>
                              <div className="small text-dark">
                                <strong>Woolen Beanie / Cap:</strong> Solid navy blue warm woolen beanie or monkey cap permitted during chilly morning transit.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grooming & Turnout Guidelines */}
              <div className="grooming-container-card mb-4" id="grooming">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 pb-2 border-bottom">
                  <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-0">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                    Personal Grooming, Identity &amp; Hygiene Standards
                  </h6>
                  <span className="grooming-assembly-badge">
                    <span className="assembly-pulse-dot"></span>
                    Monitored Weekly in Monday Assembly
                  </span>
                </div>

                <div className="row g-3">
                  {/* Hair & Headgear */}
                  <div className="col-sm-6 col-12">
                    <div className="grooming-item-card card-turnout">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-3">
                          <div className="grooming-icon-halo halo-blue">
                            <span className="material-symbols-outlined fs-5">face_6</span>
                          </div>
                          <div>
                            <span className="grooming-category-label text-blue">Turnout Code</span>
                            <h6 className="fw-bold text-dark mb-0">Hair &amp; Headgear</h6>
                          </div>
                        </div>
                        <span className="grooming-status-pill pill-blue">
                          Daily Norm
                        </span>
                      </div>
                      <p className="small text-muted mb-2.5" style={{ lineHeight: '1.5' }}>
                        Disciplined hair styling reflects personal pride and school decorum. Clean natural haircut for all students.
                      </p>
                      <div className="grooming-specs-list">
                        <div className="grooming-spec-item">
                          <span className="material-symbols-outlined spec-icon text-primary">face</span>
                          <span>Boys: Short crew trim with clean natural neckline</span>
                        </div>
                        <div className="grooming-spec-item">
                          <span className="material-symbols-outlined spec-icon text-primary">auto_awesome</span>
                          <span>Girls: Neat hair styling with official royal blue ribbons</span>
                        </div>
                        <div className="grooming-spec-item prohibited">
                          <span className="material-symbols-outlined spec-icon text-danger">block</span>
                          <span>No hair gels, styling wax, spikes or synthetic colors</span>
                        </div>
                      </div>
                      <div className="grooming-card-footer">
                        <span className="material-symbols-outlined text-success">verified</span>
                        <span>Monitored daily during class attendance</span>
                      </div>
                    </div>
                  </div>

                  {/* Nails & Hand Hygiene */}
                  <div className="col-sm-6 col-12">
                    <div className="grooming-item-card card-health">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-3">
                          <div className="grooming-icon-halo halo-emerald">
                            <span className="material-symbols-outlined fs-5">clean_hands</span>
                          </div>
                          <div>
                            <span className="grooming-category-label text-emerald">Health Protocol</span>
                            <h6 className="fw-bold text-dark mb-0">Nails &amp; Hand Hygiene</h6>
                          </div>
                        </div>
                        <span className="grooming-status-pill pill-emerald">
                          Hygiene
                        </span>
                      </div>
                      <p className="small text-muted mb-2.5" style={{ lineHeight: '1.5' }}>
                        Fingernails must be clipped short and cleaned. Strict prevention of infectious contact and food contamination.
                      </p>
                      <div className="grooming-specs-list">
                        <div className="grooming-spec-item">
                          <span className="material-symbols-outlined spec-icon text-success">content_cut</span>
                          <span>Fingernails clipped short, rounded &amp; naturally clean</span>
                        </div>
                        <div className="grooming-spec-item">
                          <span className="material-symbols-outlined spec-icon text-success">soap</span>
                          <span>Mandatory supervised handwash before tiffin recess</span>
                        </div>
                        <div className="grooming-spec-item prohibited">
                          <span className="material-symbols-outlined spec-icon text-danger">block</span>
                          <span>No nail enamel, chemical polish, mehendi or tattoos</span>
                        </div>
                      </div>
                      <div className="grooming-card-footer">
                        <span className="material-symbols-outlined text-success">verified</span>
                        <span>Inspected during Monday morning assembly</span>
                      </div>
                    </div>
                  </div>

                  {/* Footwear & Turnout */}
                  <div className="col-sm-6 col-12">
                    <div className="grooming-item-card card-spec">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-3">
                          <div className="grooming-icon-halo halo-amber">
                            <span className="material-symbols-outlined fs-5">directions_walk</span>
                          </div>
                          <div>
                            <span className="grooming-category-label text-amber">Uniform Spec</span>
                            <h6 className="fw-bold text-dark mb-0">Footwear &amp; Turnout</h6>
                          </div>
                        </div>
                        <span className="grooming-status-pill pill-amber">
                          Daily Turnout
                        </span>
                      </div>
                      <p className="small text-muted mb-2.5" style={{ lineHeight: '1.5' }}>
                        Clean, well-maintained shoes with matching uniform socks pulled to regulation height at all times.
                      </p>
                      <div className="grooming-specs-list">
                        <div className="grooming-spec-item">
                          <span className="material-symbols-outlined spec-icon text-warning">hiking</span>
                          <span>Mon&ndash;Fri: Polished black formal leather shoes</span>
                        </div>
                        <div className="grooming-spec-item">
                          <span className="material-symbols-outlined spec-icon text-warning">directions_run</span>
                          <span>Wed &amp; Sat: Spotless white PT canvas sneakers</span>
                        </div>
                        <div className="grooming-spec-item">
                          <span className="material-symbols-outlined spec-icon text-warning">check_circle</span>
                          <span>Official navy blue uniform socks pulled to regulation height</span>
                        </div>
                      </div>
                      <div className="grooming-card-footer">
                        <span className="material-symbols-outlined text-success">verified</span>
                        <span>Daily turnout inspection at main campus gate</span>
                      </div>
                    </div>
                  </div>

                  {/* Identity & Monogram */}
                  <div className="col-sm-6 col-12">
                    <div className="grooming-item-card card-security">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-3">
                          <div className="grooming-icon-halo halo-rose">
                            <span className="material-symbols-outlined fs-5">badge</span>
                          </div>
                          <div>
                            <span className="grooming-category-label text-rose">Safety &amp; ID</span>
                            <h6 className="fw-bold text-dark mb-0">Identity &amp; Monogram</h6>
                          </div>
                        </div>
                        <span className="grooming-status-pill pill-rose">
                          Security
                        </span>
                      </div>
                      <p className="small text-muted mb-2.5" style={{ lineHeight: '1.5' }}>
                        Institutional identification ensures safe campus entry, bus boarding, and emergency contact verification.
                      </p>
                      <div className="grooming-specs-list">
                        <div className="grooming-spec-item">
                          <span className="material-symbols-outlined spec-icon text-danger">badge</span>
                          <span>RFID smart photo ID card displayed on chest</span>
                        </div>
                        <div className="grooming-spec-item">
                          <span className="material-symbols-outlined spec-icon text-danger">military_tech</span>
                          <span>Official royal blue academy lanyard worn at all times</span>
                        </div>
                        <div className="grooming-spec-item">
                          <span className="material-symbols-outlined spec-icon text-danger">verified</span>
                          <span>Embroidered institutional crest on left pocket</span>
                        </div>
                      </div>
                      <div className="grooming-card-footer">
                        <span className="material-symbols-outlined text-success">verified</span>
                        <span>Mandatory for gate entry, library &amp; school transit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION 3: ASSEMBLY & MORAL EDUCATION
               ═══════════════════════════════════════ */}
            <section id="moral" className="mb-5 pt-2">
              <div className="section-header-box assembly-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box">
                    <span className="material-symbols-outlined fs-4">volunteer_activism</span>
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
              <div className="m3-assembly-roadmap mb-4">
                <div className="m3-assembly-header">
                  <div className="d-flex align-items-center gap-3">
                    <div className="m3-assembly-header-icon">
                      <span className="material-symbols-outlined fs-4" style={{ fontVariationSettings: "'FILL' 1" }}>wb_twilight</span>
                    </div>
                    <div>
                      <h5 className="m3-assembly-title">The 5-Step Daily Assembly Sequence</h5>
                      <p className="m3-assembly-subtitle">
                        Sacred 15-minute morning routine instilling discipline, cultural values &amp; articulate confidence.
                      </p>
                    </div>
                  </div>
                  <div className="m3-assembly-time-badge">
                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>schedule</span>
                    <span>07:35 AM &ndash; 07:50 AM &bull; 15 Mins Daily</span>
                  </div>
                </div>

                <div className="m3-assembly-timeline">
                  {/* Step 1 */}
                  <div className="m3-assembly-step step-amber">
                    <div className="step-number-col">
                      <span className="step-number-bubble">01</span>
                      <div className="step-connector-line"></div>
                    </div>
                    <div className="step-content-card">
                      <div className="step-card-header">
                        <div className="step-title-cluster">
                          <div className="step-avatar-box avatar-amber">
                            <span className="material-symbols-outlined">self_improvement</span>
                          </div>
                          <div>
                            <h6 className="step-heading">Universal Invocations &amp; Meditation</h6>
                            <span className="step-focus-tag tag-amber">Spiritual Awakening &bull; Mental Clarity</span>
                          </div>
                        </div>
                        <span className="step-time-pill">
                          <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>schedule</span>
                          07:35 AM &bull; 5 Mins
                        </span>
                      </div>
                      <p className="step-desc">
                        Sacred chanting of Gayatri Mantra and Saraswati Vandana performed in unison to center concentration, alleviate anxiety, and invoke academic blessing for the day.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="m3-assembly-step step-blue">
                    <div className="step-number-col">
                      <span className="step-number-bubble">02</span>
                      <div className="step-connector-line"></div>
                    </div>
                    <div className="step-content-card">
                      <div className="step-card-header">
                        <div className="step-title-cluster">
                          <div className="step-avatar-box avatar-blue">
                            <span className="material-symbols-outlined">front_hand</span>
                          </div>
                          <div>
                            <h6 className="step-heading">National Student Pledge</h6>
                            <span className="step-focus-tag tag-blue">Civic Fraternity &bull; Patriotism</span>
                          </div>
                        </div>
                        <span className="step-time-pill">
                          <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>schedule</span>
                          07:40 AM &bull; 2 Mins
                        </span>
                      </div>
                      <p className="step-desc">
                        Recitation of <em>"India is my country and all Indians are my brothers and sisters..."</em> with right hand held over heart, reinforcing secular brotherhood and moral dedication.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="m3-assembly-step step-emerald">
                    <div className="step-number-col">
                      <span className="step-number-bubble">03</span>
                      <div className="step-connector-line"></div>
                    </div>
                    <div className="step-content-card">
                      <div className="step-card-header">
                        <div className="step-title-cluster">
                          <div className="step-avatar-box avatar-emerald">
                            <span className="material-symbols-outlined">psychology</span>
                          </div>
                          <div>
                            <h6 className="step-heading">Bilingual Thought for the Day</h6>
                            <span className="step-focus-tag tag-emerald">Moral Character &bull; Public Speaking</span>
                          </div>
                        </div>
                        <span className="step-time-pill">
                          <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>schedule</span>
                          07:42 AM &bull; 2 Mins
                        </span>
                      </div>
                      <p className="step-desc">
                        Student leaders articulate an inspiring philosophical quote alternately in Hindi and English with practical context, honing bilingual speech fluency and ethical introspection.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="m3-assembly-step step-indigo">
                    <div className="step-number-col">
                      <span className="step-number-bubble">04</span>
                      <div className="step-connector-line"></div>
                    </div>
                    <div className="step-content-card">
                      <div className="step-card-header">
                        <div className="step-title-cluster">
                          <div className="step-avatar-box avatar-indigo">
                            <span className="material-symbols-outlined">lightbulb</span>
                          </div>
                          <div>
                            <h6 className="step-heading">Daily GK &amp; Current Affairs Brief</h6>
                            <span className="step-focus-tag tag-indigo">Curiosity &bull; National Awareness</span>
                          </div>
                        </div>
                        <span className="step-time-pill">
                          <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>schedule</span>
                          07:44 AM &bull; 4 Mins
                        </span>
                      </div>
                      <p className="step-desc">
                        Presentation of 3 vetted national/international headlines, scientific breakthroughs, and a "Word of the Day" with etymology to expand worldly curiosity.
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="m3-assembly-step step-rose">
                    <div className="step-number-col">
                      <span className="step-number-bubble">05</span>
                    </div>
                    <div className="step-content-card">
                      <div className="step-card-header">
                        <div className="step-title-cluster">
                          <div className="step-avatar-box avatar-rose">
                            <span className="material-symbols-outlined">flag</span>
                          </div>
                          <div>
                            <h6 className="step-heading">National Anthem ("Jana Gana Mana")</h6>
                            <span className="step-focus-tag tag-rose">Sovereign Reverence &bull; National Honor</span>
                          </div>
                        </div>
                        <span className="step-time-pill">
                          <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>schedule</span>
                          07:48 AM &bull; 2 Mins
                        </span>
                      </div>
                      <p className="step-desc">
                        Sung in crisp unison in strict attention posture under the fluttering Tricolor, culminating in disciplined, silent squad marching toward classrooms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Moral Education Pillars */}
              <div className="moral-pillar-box">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center gap-3">
                    <div className="moral-pillar-halo flex-shrink-0" style={{ background: 'rgba(11, 87, 208, 0.1)', color: '#0b57d0' }}>
                      <span className="material-symbols-outlined fs-5">diversity_3</span>
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark mb-0">Our 4 Core Moral Pillars (Sanskar)</h5>
                      <span className="text-muted small">Timeless virtues cultivating moral clarity, humility &amp; character</span>
                    </div>
                  </div>
                  <span className="badge bg-primary-subtle text-primary border border-primary border-opacity-25 px-2.5 py-1 rounded-pill small fw-bold">
                    Values-Led Holistic Pedagogy
                  </span>
                </div>

                <div className="row g-3">
                  {/* Satya */}
                  <div className="col-md-6 col-12">
                    <div className="moral-pillar-card pillar-satya">
                      <div className="moral-pillar-header">
                        <div className="moral-pillar-halo flex-shrink-0" style={{ background: 'rgba(225, 29, 72, 0.1)', color: '#e11d48' }}>
                          <span className="material-symbols-outlined fs-5">favorite</span>
                        </div>
                        <span className="moral-pillar-badge" style={{ background: '#ffe4e6', color: '#be123c' }}>
                          TRUTH &amp; INTEGRITY
                        </span>
                      </div>
                      <div className="p-2 px-2.5 rounded-2 mb-2" style={{ background: '#fff1f2', border: '1px solid #fecdd3' }}>
                        <span className="fw-bold d-block text-danger" style={{ fontSize: '0.82rem', letterSpacing: '0.2px' }}>॥ सत्यं वद धर्मं चर ॥</span>
                        <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Speak the truth; abide by righteousness</span>
                      </div>
                      <h6 className="fw-bold text-dark mb-1">Satya &amp; Nishtha</h6>
                      <p className="text-muted small mb-2.5" style={{ lineHeight: '1.45', fontSize: '0.78rem' }}>
                        Fostering moral courage to speak truth, act honestly, and take accountability for one's choices with sincerity.
                      </p>
                      <div className="moral-checklist">
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon text-danger">check_circle</span>
                          <div><strong>Academic Honesty:</strong> Genuine independent work with zero unfair copying.</div>
                        </div>
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon text-danger">check_circle</span>
                          <div><strong>Moral Courage:</strong> Owning up to errors openly without fear or deceit.</div>
                        </div>
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon text-danger">check_circle</span>
                          <div><strong>Steadfast Character:</strong> Upholding discipline when no one is watching.</div>
                        </div>
                      </div>
                      <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between text-muted small" style={{ fontSize: '0.72rem' }}>
                        <span className="fw-semibold text-danger">Pillar 01 &bull; Character Core</span>
                        <span>Assembly Recognition</span>
                      </div>
                    </div>
                  </div>

                  {/* Aadar */}
                  <div className="col-md-6 col-12">
                    <div className="moral-pillar-card pillar-aadar">
                      <div className="moral-pillar-header">
                        <div className="moral-pillar-halo flex-shrink-0" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                          <span className="material-symbols-outlined fs-5">handshake</span>
                        </div>
                        <span className="moral-pillar-badge" style={{ background: '#d1fae5', color: '#047857' }}>
                          RESPECT &amp; HUMILITY
                        </span>
                      </div>
                      <div className="p-2 px-2.5 rounded-2 mb-2" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
                        <span className="fw-bold d-block text-success" style={{ fontSize: '0.82rem', letterSpacing: '0.2px' }}>॥ मातृ देवो भव • पितृ देवो भव ॥</span>
                        <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Honor mothers, fathers, and teachers as divine</span>
                      </div>
                      <h6 className="fw-bold text-dark mb-1">Aadar &amp; Vinamrata</h6>
                      <p className="text-muted small mb-2.5" style={{ lineHeight: '1.45', fontSize: '0.78rem' }}>
                        Instilling deep reverence for parents, teachers, elders, and respectful courtesy toward all institutional staff.
                      </p>
                      <div className="moral-checklist">
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon text-success">check_circle</span>
                          <div><strong>Guru Vandana:</strong> Polite folded-hand Namaste and greetings to all mentors.</div>
                        </div>
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon text-success">check_circle</span>
                          <div><strong>Dignity of Labor:</strong> Warm respect for bus drivers, didis &amp; support helpers.</div>
                        </div>
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon text-success">check_circle</span>
                          <div><strong>Humble Mindset:</strong> Celebrating victories with modesty and zero arrogance.</div>
                        </div>
                      </div>
                      <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between text-muted small" style={{ fontSize: '0.72rem' }}>
                        <span className="fw-semibold text-success">Pillar 02 &bull; Cultural Heritage</span>
                        <span>Daily Conduct Code</span>
                      </div>
                    </div>
                  </div>

                  {/* Sahyog */}
                  <div className="col-md-6 col-12">
                    <div className="moral-pillar-card pillar-sahyog">
                      <div className="moral-pillar-header">
                        <div className="moral-pillar-halo flex-shrink-0" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
                          <span className="material-symbols-outlined fs-5">groups</span>
                        </div>
                        <span className="moral-pillar-badge" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                          TEAMWORK &amp; EMPATHY
                        </span>
                      </div>
                      <div className="p-2 px-2.5 rounded-2 mb-2" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                        <span className="fw-bold d-block text-primary" style={{ fontSize: '0.82rem', letterSpacing: '0.2px' }}>॥ वसुधैव कुटुम्बकम् ॥</span>
                        <span className="text-muted small" style={{ fontSize: '0.72rem' }}>The world is one interconnected family</span>
                      </div>
                      <h6 className="fw-bold text-dark mb-1">Sahyog &amp; Karuna</h6>
                      <p className="text-muted small mb-2.5" style={{ lineHeight: '1.45', fontSize: '0.78rem' }}>
                        Nurturing brotherhood, collaborative teamwork, inclusive classrooms, and compassion for the vulnerable.
                      </p>
                      <div className="moral-checklist">
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon text-primary">check_circle</span>
                          <div><strong>Lunchtime Friendship:</strong> Sharing tiffins and creating a loving classroom bond.</div>
                        </div>
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon text-primary">check_circle</span>
                          <div><strong>Peer Buddy Support:</strong> Helping classmates navigate academic or language hurdles.</div>
                        </div>
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon text-primary">check_circle</span>
                          <div><strong>Zero Bullying:</strong> Strict kindness, anti-teasing, and standing up for others.</div>
                        </div>
                      </div>
                      <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between text-muted small" style={{ fontSize: '0.72rem' }}>
                        <span className="fw-semibold text-primary">Pillar 03 &bull; Social Harmony</span>
                        <span>House Teamwork Standard</span>
                      </div>
                    </div>
                  </div>

                  {/* Swachhata */}
                  <div className="col-md-6 col-12">
                    <div className="moral-pillar-card pillar-swachhata">
                      <div className="moral-pillar-header">
                        <div className="moral-pillar-halo flex-shrink-0" style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
                          <span className="material-symbols-outlined fs-5">eco</span>
                        </div>
                        <span className="moral-pillar-badge" style={{ background: '#fef3c7', color: '#b45309' }}>
                          ECO-STEWARDSHIP
                        </span>
                      </div>
                      <div className="p-2 px-2.5 rounded-2 mb-2" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                        <span className="fw-bold d-block" style={{ fontSize: '0.82rem', color: '#b45309', letterSpacing: '0.2px' }}>॥ प्रकृति रक्षति रक्षिता ॥</span>
                        <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Nature protects those who protect her</span>
                      </div>
                      <h6 className="fw-bold text-dark mb-1">Swachhata &amp; Paryavaran</h6>
                      <p className="text-muted small mb-2.5" style={{ lineHeight: '1.45', fontSize: '0.78rem' }}>
                        Cultivating environmental stewardship, personal cleanliness, water conservation, and plastic-free green habits.
                      </p>
                      <div className="moral-checklist">
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon" style={{ color: '#d97706' }}>check_circle</span>
                          <div><strong>Clean Desk Mandate:</strong> Segregating waste and leaving desks spotless daily.</div>
                        </div>
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon" style={{ color: '#d97706' }}>check_circle</span>
                          <div><strong>Zero Plastic Culture:</strong> Stainless steel bottles &amp; cloth bags encouraged.</div>
                        </div>
                        <div className="moral-checklist-item">
                          <span className="material-symbols-outlined check-icon" style={{ color: '#d97706' }}>check_circle</span>
                          <div><strong>Green Campus Care:</strong> Watering courtyard plants and respecting biodiversity.</div>
                        </div>
                      </div>
                      <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between text-muted small" style={{ fontSize: '0.72rem' }}>
                        <span className="fw-semibold" style={{ color: '#b45309' }}>Pillar 04 &bull; Green Living</span>
                        <span>Eco-Club Badge</span>
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
                  <div className="student-guideline-card" style={{ borderLeft: '4px solid #2563eb' }}>
                    <div className="guideline-header-row">
                      <div className="guideline-icon-halo" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
                        <span className="material-symbols-outlined fs-5">alarm_on</span>
                      </div>
                      <span className="guideline-category-tag">TIMINGS &amp; DISCIPLINE</span>
                    </div>
                    <h6 className="fw-bold text-dark mb-1">Punctuality &amp; Gate Arrival</h6>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Students must enter the campus 10 minutes prior to the prayer bell. Late arrivals will be officially recorded in the school diary.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="student-guideline-card" style={{ borderLeft: '4px solid #059669' }}>
                    <div className="guideline-header-row">
                      <div className="guideline-icon-halo" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                        <span className="material-symbols-outlined fs-5">auto_stories</span>
                      </div>
                      <span className="guideline-category-tag">ACADEMIC KIT</span>
                    </div>
                    <h6 className="fw-bold text-dark mb-1">School Diary &amp; Stationery</h6>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      The student diary must be carried daily. All books and notebooks must be neatly covered, labeled, and brought strictly per timetable.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="student-guideline-card" style={{ borderLeft: '4px solid #dc2626' }}>
                    <div className="guideline-header-row">
                      <div className="guideline-icon-halo" style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' }}>
                        <span className="material-symbols-outlined fs-5">phonelink_erase</span>
                      </div>
                      <span className="guideline-category-tag" style={{ background: '#fee2e2', color: '#b91c1c' }}>DIGITAL DETOX</span>
                    </div>
                    <h6 className="fw-bold text-dark mb-1">Strict No-Gadgets Policy</h6>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Mobile phones, smartwatches, digital gaming devices, expensive gold jewelry, and pocket cash exceeding ₹50 are strictly prohibited.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="student-guideline-card" style={{ borderLeft: '4px solid #d97706' }}>
                    <div className="guideline-header-row">
                      <div className="guideline-icon-halo" style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
                        <span className="material-symbols-outlined fs-5">directions_bus</span>
                      </div>
                      <span className="guideline-category-tag">TRANSIT SAFETY</span>
                    </div>
                    <h6 className="fw-bold text-dark mb-1">Transport &amp; Bus Queue Discipline</h6>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Students must board and alight calmly under the guidance of bus attendants. Always remain seated while the vehicle is in motion.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="student-guideline-card" style={{ borderLeft: '4px solid #0891b2' }}>
                    <div className="guideline-header-row">
                      <div className="guideline-icon-halo" style={{ background: 'rgba(8, 145, 178, 0.1)', color: '#0891b2' }}>
                        <span className="material-symbols-outlined fs-5">cleaning_services</span>
                      </div>
                      <span className="guideline-category-tag">CAMPUS CARE</span>
                    </div>
                    <h6 className="fw-bold text-dark mb-1">Campus Cleanliness &amp; Zero Litter</h6>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Use segregated dry and wet waste bins. Refrain from scribbling on classroom walls, whiteboards, or desks. Respect institutional property.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="student-guideline-card" style={{ borderLeft: '4px solid #7c3aed' }}>
                    <div className="guideline-header-row">
                      <div className="guideline-icon-halo" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
                        <span className="material-symbols-outlined fs-5">forum</span>
                      </div>
                      <span className="guideline-category-tag">COURTESY &amp; VALUES</span>
                    </div>
                    <h6 className="fw-bold text-dark mb-1">Polite Language &amp; Respect</h6>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Courteous behavior, polite English greetings, and respectful communication with teachers, attendants, and fellow classmates are mandatory.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Swami Shiwanand Student Pledge */}
              <div className="student-pledge-royal-card">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="pledge-crest-badge">
                      <span className="material-symbols-outlined fs-4">verified</span>
                    </div>
                    <div>
                      <h6 className="fw-bold text-white mb-0" style={{ fontSize: '1rem', letterSpacing: '0.2px' }}>
                        The Swami Shiwanand Student Pledge
                      </h6>
                      <span className="text-white-50 small">Recited Daily during Morning Assembly</span>
                    </div>
                  </div>
                  <span className="badge bg-warning text-dark px-3 py-1.5 rounded-pill fw-bold small">
                    Sacred Oath of Honor
                  </span>
                </div>

                <div className="p-3 rounded-3 mb-3" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  <p className="pledge-quote-text mb-0">
                    &ldquo;I pledge to be truthful in word, respectful in deed, diligent in learning, and a loving protector of my school, nature, and country.&rdquo;
                  </p>
                </div>

                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <span className="pledge-tag-pill">
                    <span className="material-symbols-outlined fs-6 text-warning">shield</span>
                    Truth in Word
                  </span>
                  <span className="pledge-tag-pill">
                    <span className="material-symbols-outlined fs-6 text-warning">handshake</span>
                    Respect in Deed
                  </span>
                  <span className="pledge-tag-pill">
                    <span className="material-symbols-outlined fs-6 text-warning">school</span>
                    Diligence in Learning
                  </span>
                  <span className="pledge-tag-pill">
                    <span className="material-symbols-outlined fs-6 text-warning">eco</span>
                    Protector of Nature &amp; Nation
                  </span>
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
              <div className="attendance-rule-banner-v2 mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(245, 158, 11, 0.2)',
                    border: '1px solid rgba(245, 158, 11, 0.45)',
                    color: '#fbbf24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span className="material-symbols-outlined fs-3">verified_user</span>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-white">Minimum 75% Attendance Mandatory</h5>
                    <p className="small text-white-75 mb-0" style={{ maxWidth: '520px', lineHeight: '1.45' }}>
                      Regular classroom attendance ensures uninterrupted foundational learning. Students with attendance below 75% will not be permitted to appear in final assessments.
                    </p>
                  </div>
                </div>
                <div>
                  <span className="attendance-badge-dial">
                    <span className="material-symbols-outlined fs-5">fact_check</span>
                    CBSE NORM &bull; 75%
                  </span>
                </div>
              </div>

              {/* 4 Attendance Regulations Cards */}
              <div className="row g-4">
                {/* Policy 1: Leave in Diary */}
                <div className="col-md-6 col-12">
                  <div className="attendance-policy-card card-blue">
                    <div className="policy-header-row">
                      <div className="policy-title-cluster">
                        <div className="policy-icon-box">
                          <span className="material-symbols-outlined">edit_note</span>
                        </div>
                        <h6 className="policy-title-text">Leave Application in School Diary</h6>
                      </div>
                      <span className="attendance-policy-badge">
                        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>verified</span>
                        Mandatory
                      </span>
                    </div>
                    <p className="policy-desc-text">
                      Every leave of absence must be applied for in writing through the official <strong>"Leave Record"</strong> section of the school diary, signed by parents or legal guardians.
                    </p>
                    <div className="policy-action-chip">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>history_edu</span>
                      <span>Parent / Guardian Endorsement Required</span>
                    </div>
                  </div>
                </div>

                {/* Policy 2: Medical Leave */}
                <div className="col-md-6 col-12">
                  <div className="attendance-policy-card card-red">
                    <div className="policy-header-row">
                      <div className="policy-title-cluster">
                        <div className="policy-icon-box">
                          <span className="material-symbols-outlined">medical_services</span>
                        </div>
                        <h6 className="policy-title-text">Medical Leave Certification</h6>
                      </div>
                      <span className="attendance-policy-badge">
                        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>health_and_safety</span>
                        2+ Days Rule
                      </span>
                    </div>
                    <p className="policy-desc-text">
                      For illness exceeding 2 consecutive days, a certified <strong>Medical Fitness Certificate</strong> from a registered doctor must be submitted upon resuming classes.
                    </p>
                    <div className="policy-action-chip">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>local_hospital</span>
                      <span>Registered Practitioner Slip Required</span>
                    </div>
                  </div>
                </div>

                {/* Policy 3: Unexcused Absence */}
                <div className="col-md-6 col-12">
                  <div className="attendance-policy-card card-amber">
                    <div className="policy-header-row">
                      <div className="policy-title-cluster">
                        <div className="policy-icon-box">
                          <span className="material-symbols-outlined">warning_amber</span>
                        </div>
                        <h6 className="policy-title-text">Unexcused Consecutive Absence</h6>
                      </div>
                      <span className="attendance-policy-badge">
                        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>notification_important</span>
                        Inquiry • 3 Days
                      </span>
                    </div>
                    <p className="policy-desc-text">
                      Unnotified absence of more than 3 consecutive working days results in a parental inquiry. Continuous unexcused absence of 10 days invites striking off the roll.
                    </p>
                    <div className="policy-action-chip">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>call</span>
                      <span>Inquiry at 3 Days • Action at 10 Days</span>
                    </div>
                  </div>
                </div>

                {/* Policy 4: Early Departure */}
                <div className="col-md-6 col-12">
                  <div className="attendance-policy-card card-emerald">
                    <div className="policy-header-row">
                      <div className="policy-title-cluster">
                        <div className="policy-icon-box">
                          <span className="material-symbols-outlined">sensor_door</span>
                        </div>
                        <h6 className="policy-title-text">Early Departure &amp; Gate Pass</h6>
                      </div>
                      <span className="attendance-policy-badge">
                        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>security</span>
                        Security Pass
                      </span>
                    </div>
                    <p className="policy-desc-text">
                      No student will be allowed to exit early unless accompanied by registered parents bearing an authorized <strong>Gate Pass</strong> signed by the Principal or Reception.
                    </p>
                    <div className="policy-action-chip">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>badge</span>
                      <span>Gate Pass Mandatory for Early Campus Exit</span>
                    </div>
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
                  <div className="cca-month-card season-spring">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-warning fs-5">wb_sunny</span>
                        April &ndash; May 2026
                      </span>
                      <span className="badge bg-warning-subtle text-dark border border-warning border-opacity-25 px-2.5 py-1 rounded-pill small fw-bold">
                        Term I Kickoff
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#fef3c7', color: '#b45309' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Welcome Circle &amp; Rhymes:</strong> Orientation fest for Nursery &amp; Kindergarten toddlers.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#fef3c7', color: '#b45309' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Earth Day Poster Making:</strong> Inter-house creative recycled art &amp; green painting contest.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#fef3c7', color: '#b45309' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Clay Modeling &amp; Origami:</strong> Fine motor skills workshop before summer break.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* July & August */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card season-monsoon">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-primary fs-5">flag</span>
                        July &ndash; August 2026
                      </span>
                      <span className="badge bg-primary-subtle text-primary border border-primary border-opacity-25 px-2.5 py-1 rounded-pill small fw-bold">
                        National Fests
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Independence Day Cultural Fest:</strong> Patriotic song, costume pageant &amp; tricolor march past.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Inter-House Recitation:</strong> English &amp; Hindi elocution and poem recitation competition.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Rakhi &amp; Friendship Craft:</strong> Hand-made eco-friendly thread crafts &amp; card design.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* September & October */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card season-autumn">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-success fs-5">celebration</span>
                        September &ndash; October 2026
                      </span>
                      <span className="badge bg-success-subtle text-success border border-success border-opacity-25 px-2.5 py-1 rounded-pill small fw-bold">
                        Heritage &amp; Arts
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#d1fae5', color: '#047857' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Teachers' Day Homage:</strong> Student-led cultural program honoring educators and mentors.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#d1fae5', color: '#047857' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Hindi Diwas Debate:</strong> Foundational speech, storytelling &amp; shloka recitation.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#d1fae5', color: '#047857' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Dussehra Diya &amp; Rangoli:</strong> Traditional folk colors, festive lamps &amp; cultural stage plays.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* November & December */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card season-winter">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-danger fs-5">sports_score</span>
                        November &ndash; December 2026
                      </span>
                      <span className="badge bg-danger-subtle text-danger border border-danger border-opacity-25 px-2.5 py-1 rounded-pill small fw-bold">
                        Sports &amp; Discovery
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#ffe4e6', color: '#be123c' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Children's Day Sports Carnival:</strong> Track races, sack jumps, relay fun &amp; toddler hurdles.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#ffe4e6', color: '#be123c' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Science Discovery Corner Expo:</strong> Junior science models, plant germination &amp; sensory puzzles.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#ffe4e6', color: '#be123c' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Handwriting &amp; Spell-Bee:</strong> Calligraphy mastery and spelling championship for Std I–VI.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* January & February */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card season-sanskriti">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-purple fs-5">stars</span>
                        January &ndash; February 2027
                      </span>
                      <span className="badge bg-purple-subtle text-purple border border-purple border-opacity-25 px-2.5 py-1 rounded-pill small fw-bold" style={{ background: '#ede9fe', color: '#6d28d9' }}>
                        Sanskriti &amp; Math
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#ede9fe', color: '#6d28d9' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Republic Day Parade:</strong> Grand salute, scout drills, national songs &amp; tableaux.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#ede9fe', color: '#6d28d9' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Saraswati Puja Mahotsav:</strong> Sacred prayer, classical kid dance &amp; educational blessings.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#ede9fe', color: '#6d28d9' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Mental Math Olympiad:</strong> Speedy tables, abacus counting &amp; logical reasoning trophy.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* March */}
                <div className="col-md-6 col-12">
                  <div className="cca-month-card season-finale">
                    <div className="cca-month-header">
                      <span className="cca-month-name">
                        <span className="material-symbols-outlined text-warning fs-5">workspace_premium</span>
                        March 2027
                      </span>
                      <span className="badge bg-warning-subtle text-dark border border-warning border-opacity-25 px-2.5 py-1 rounded-pill small fw-bold">
                        Grand Finale
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#fef3c7', color: '#b45309' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Annual Prize Distribution:</strong> Awarding academic rank holders, best turnout &amp; 100% attendance.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#fef3c7', color: '#b45309' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>KG Graduation Ceremony:</strong> UKG toddlers graduating into Class I with ceremonial scrolls.</span>
                      </div>
                      <div className="cca-event-item-v2">
                        <span className="cca-event-dot-halo" style={{ background: '#fef3c7', color: '#b45309' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>play_arrow</span>
                        </span>
                        <span><strong>Inter-House Champion Trophy:</strong> Overall rolling shield awarded to the winning House Guild.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 House Guilds Showcase */}
              <div className="house-guilds-royal-showcase">
                <div className="guild-showcase-header">
                  <div className="d-flex align-items-center gap-3">
                    <div className="guild-showcase-crest">
                      <span className="material-symbols-outlined fs-3" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                    </div>
                    <div>
                      <h5 className="guild-showcase-title">The 4 House Guilds for Inter-School CCA Competitions</h5>
                      <p className="guild-showcase-subtitle">
                        Fostering leadership, fraternal camaraderie, sportsmanship &amp; cultural brilliance (चतुर्-सदन प्रणाली).
                      </p>
                    </div>
                  </div>
                  <div className="guild-badge-cluster">
                    <span className="guild-status-badge badge-gold">
                      <span className="material-symbols-outlined text-warning" style={{ fontSize: '15px' }}>emoji_events</span>
                      Annual Shield &bull; Session 2026&ndash;27
                    </span>
                    <span className="guild-status-badge">
                      <span className="material-symbols-outlined text-primary" style={{ fontSize: '15px' }}>military_tech</span>
                      4-Guild System (Est. 2009)
                    </span>
                  </div>
                </div>

                <div className="row g-3">
                  {/* Agni House */}
                  <div className="col-sm-6 col-12">
                    <div className="house-guild-card-v2 house-card-agni">
                      <div className="guild-card-top-row">
                        <div className="guild-identity-wrap">
                          <div className="guild-crest-halo">
                            <span className="material-symbols-outlined fs-5">local_fire_department</span>
                          </div>
                          <div>
                            <h6 className="guild-name-title">Agni House</h6>
                            <span className="guild-element-pill">Tejas &bull; Red Guild</span>
                          </div>
                        </div>
                        <span className="guild-sanskrit-tag" title="Sanskrit Motto">तेजस्वी नावधीतमस्तु</span>
                      </div>

                      <div className="guild-champion-strip">
                        <span className="material-symbols-outlined fs-6">military_tech</span>
                        <span>Courage &bull; Annual Sports Champions</span>
                      </div>

                      <p className="guild-desc-text">
                        Fosters boldness, boundless energy, athletic speed, physical discipline, and unyielding grit across field, track, and sports leagues.
                      </p>

                      <div className="guild-strengths-row">
                        <span className="guild-strength-chip"><i className="fas fa-bolt text-danger"></i> Sprint &amp; Relay</span>
                        <span className="guild-strength-chip"><i className="fas fa-bullseye text-danger"></i> Tug of War</span>
                        <span className="guild-strength-chip"><i className="fas fa-running text-danger"></i> Cross Country</span>
                        <span className="guild-strength-chip"><i className="fas fa-shield-alt text-danger"></i> March Past Drill</span>
                      </div>

                      <div className="guild-meta-footer">
                        <span><strong>Mascot:</strong> Phoenix</span>
                        <span><strong>Color:</strong> Crimson Red</span>
                        <span><strong>Virtue:</strong> Valour</span>
                      </div>
                    </div>
                  </div>

                  {/* Vayu House */}
                  <div className="col-sm-6 col-12">
                    <div className="house-guild-card-v2 house-card-vayu">
                      <div className="guild-card-top-row">
                        <div className="guild-identity-wrap">
                          <div className="guild-crest-halo">
                            <span className="material-symbols-outlined fs-5">air</span>
                          </div>
                          <div>
                            <h6 className="guild-name-title">Vayu House</h6>
                            <span className="guild-element-pill">Marut &bull; Blue Guild</span>
                          </div>
                        </div>
                        <span className="guild-sanskrit-tag" title="Sanskrit Motto">ज्ञानेन शोभते विद्या</span>
                      </div>

                      <div className="guild-champion-strip">
                        <span className="material-symbols-outlined fs-6">psychology</span>
                        <span>Wisdom &bull; Quiz &amp; Math Champions</span>
                      </div>

                      <p className="guild-desc-text">
                        Encourages lightning intellectual agility, analytical deduction, scientific inquiry, chess mastery, and swift collaborative sportsmanship.
                      </p>

                      <div className="guild-strengths-row">
                        <span className="guild-strength-chip"><i className="fas fa-brain text-primary"></i> Science Expo</span>
                        <span className="guild-strength-chip"><i className="fas fa-calculator text-primary"></i> Speed Math</span>
                        <span className="guild-strength-chip"><i className="fas fa-chess text-primary"></i> Chess League</span>
                        <span className="guild-strength-chip"><i className="fas fa-microphone-alt text-primary"></i> Debate &amp; MUN</span>
                      </div>

                      <div className="guild-meta-footer">
                        <span><strong>Mascot:</strong> Falcon</span>
                        <span><strong>Color:</strong> Cobalt Blue</span>
                        <span><strong>Virtue:</strong> Intellect</span>
                      </div>
                    </div>
                  </div>

                  {/* Prithvi House */}
                  <div className="col-sm-6 col-12">
                    <div className="house-guild-card-v2 house-card-prithvi">
                      <div className="guild-card-top-row">
                        <div className="guild-identity-wrap">
                          <div className="guild-crest-halo">
                            <span className="material-symbols-outlined fs-5">public</span>
                          </div>
                          <div>
                            <h6 className="guild-name-title">Prithvi House</h6>
                            <span className="guild-element-pill">Bhoomi &bull; Green Guild</span>
                          </div>
                        </div>
                        <span className="guild-sanskrit-tag" title="Sanskrit Motto">धृतिः क्षमा दमोऽस्तेयं</span>
                      </div>

                      <div className="guild-champion-strip">
                        <span className="material-symbols-outlined fs-6">eco</span>
                        <span>Perseverance &bull; Eco-Club Champions</span>
                      </div>

                      <p className="guild-desc-text">
                        Symbolizes grounded stability, environmental care, tree stewardship, campus cleanliness drives, and quiet, unwavering perseverance.
                      </p>

                      <div className="guild-strengths-row">
                        <span className="guild-strength-chip"><i className="fas fa-seedling text-success"></i> Tree Drives</span>
                        <span className="guild-strength-chip"><i className="fas fa-recycle text-success"></i> Zero Litter</span>
                        <span className="guild-strength-chip"><i className="fas fa-tint text-success"></i> Water Care</span>
                        <span className="guild-strength-chip"><i className="fas fa-hands-helping text-success"></i> Social Service</span>
                      </div>

                      <div className="guild-meta-footer">
                        <span><strong>Mascot:</strong> Elephant</span>
                        <span><strong>Color:</strong> Forest Green</span>
                        <span><strong>Virtue:</strong> Stability</span>
                      </div>
                    </div>
                  </div>

                  {/* Surya House */}
                  <div className="col-sm-6 col-12">
                    <div className="house-guild-card-v2 house-card-surya">
                      <div className="guild-card-top-row">
                        <div className="guild-identity-wrap">
                          <div className="guild-crest-halo">
                            <span className="material-symbols-outlined fs-5">wb_sunny</span>
                          </div>
                          <div>
                            <h6 className="guild-name-title">Surya House</h6>
                            <span className="guild-element-pill">Bhaskar &bull; Yellow Guild</span>
                          </div>
                        </div>
                        <span className="guild-sanskrit-tag" title="Sanskrit Motto">तमसो मा ज्योतिर्गमय</span>
                      </div>

                      <div className="guild-champion-strip">
                        <span className="material-symbols-outlined fs-6">palette</span>
                        <span>Radiance &bull; Cultural Arts Champions</span>
                      </div>

                      <p className="guild-desc-text">
                        Celebrates warmth, boundless optimism, stage drama, classical Indian vocal melodies, folk dance, fine calligraphy, and joyful elocution.
                      </p>

                      <div className="guild-strengths-row">
                        <span className="guild-strength-chip"><i className="fas fa-theater-masks text-warning"></i> Stage Drama</span>
                        <span className="guild-strength-chip"><i className="fas fa-music text-warning"></i> Choral Singing</span>
                        <span className="guild-strength-chip"><i className="fas fa-paint-brush text-warning"></i> Rangoli &amp; Art</span>
                        <span className="guild-strength-chip"><i className="fas fa-pen-nib text-warning"></i> Calligraphy</span>
                      </div>

                      <div className="guild-meta-footer">
                        <span><strong>Mascot:</strong> Sun Lion</span>
                        <span><strong>Color:</strong> Radiant Gold</span>
                        <span><strong>Virtue:</strong> Optimism</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION 7: VACATIONS & HOLIDAYS
               ═══════════════════════════════════════ */}
            <section id="vacations" className="mb-5 pt-2">
              <div className="section-header-box vacation-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box">
                    <span className="material-symbols-outlined fs-4">calendar_month</span>
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

            {/* Key Statistics Card (Student Life at a Glance) */}
            <div className="glance-metrics-widget mb-4" id="statistics">
              <div className="glance-widget-header">
                <div className="d-flex align-items-center gap-3">
                  <div className="glance-header-icon flex-shrink-0">
                    <span className="material-symbols-outlined">insights</span>
                  </div>
                  <div>
                    <h6 className="glance-widget-title mb-0">Student Life at a Glance</h6>
                    <span className="glance-widget-sub">Academic Session 2026–27</span>
                  </div>
                </div>
                <span className="glance-live-badge">
                  <span className="glance-pulse-dot"></span>
                  Active
                </span>
              </div>

              <div className="glance-widget-body">
                {/* Year Established */}
                <div className="glance-item-card">
                  <div className="glance-item-left">
                    <div className="glance-avatar-box avatar-blue flex-shrink-0">
                      <span className="material-symbols-outlined">calendar_month</span>
                    </div>
                    <div>
                      <span className="glance-item-label">Year Established</span>
                      <span className="glance-item-desc">Foundational CBSE Legacy</span>
                    </div>
                  </div>
                  <span className="glance-value-pill pill-navy">Estd. {schoolInfo.estd}</span>
                </div>

                {/* Student Body */}
                <div className="glance-item-card">
                  <div className="glance-item-left">
                    <div className="glance-avatar-box avatar-emerald flex-shrink-0">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    <div>
                      <span className="glance-item-label">Student Body</span>
                      <span className="glance-item-desc">Nursery to Middle Wing</span>
                    </div>
                  </div>
                  <span className="glance-value-pill pill-emerald">
                    <span className="mini-status-dot"></span>
                    500+ Learners
                  </span>
                </div>

                {/* Student-Teacher Ratio */}
                <div className="glance-item-card">
                  <div className="glance-item-left">
                    <div className="glance-avatar-box avatar-amber flex-shrink-0">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <div>
                      <span className="glance-item-label">Student-Teacher Ratio</span>
                      <span className="glance-item-desc">Personal Care &amp; Mentorship</span>
                    </div>
                  </div>
                  <span className="glance-value-pill pill-amber">15 : 1 Ratio</span>
                </div>

                {/* School Houses */}
                <div className="glance-item-card flex-column align-items-stretch gap-2">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <div className="glance-item-left flex-grow-1" style={{ minWidth: 0 }}>
                      <div className="glance-avatar-box avatar-purple flex-shrink-0">
                        <span className="material-symbols-outlined">shield</span>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <span className="glance-item-label">School Houses</span>
                        <span className="glance-item-desc text-truncate d-block">House Championship</span>
                      </div>
                    </div>
                    <span className="glance-value-pill pill-slate flex-shrink-0">4 Squads</span>
                  </div>
                  <div className="house-chips-cluster">
                    <span className="house-chip house-agni">
                      <span className="house-dot dot-agni"></span>Agni (Fire)
                    </span>
                    <span className="house-chip house-vayu">
                      <span className="house-dot dot-vayu"></span>Vayu (Air)
                    </span>
                    <span className="house-chip house-prithvi">
                      <span className="house-dot dot-prithvi"></span>Prithvi (Earth)
                    </span>
                    <span className="house-chip house-surya">
                      <span className="house-dot dot-surya"></span>Surya (Sun)
                    </span>
                  </div>
                </div>

                {/* Annual Holidays */}
                <div className="glance-item-card">
                  <div className="glance-item-left">
                    <div className="glance-avatar-box avatar-rose flex-shrink-0">
                      <span className="material-symbols-outlined">event_note</span>
                    </div>
                    <div>
                      <span className="glance-item-label">Annual Holidays</span>
                      <span className="glance-item-desc">Gazetted &amp; Festival Breaks</span>
                    </div>
                  </div>
                  <span className="glance-value-pill pill-rose">51 Gazetted Days</span>
                </div>

                {/* Campus Safety */}
                <div className="glance-item-card">
                  <div className="glance-item-left">
                    <div className="glance-avatar-box avatar-teal flex-shrink-0">
                      <span className="material-symbols-outlined">videocam</span>
                    </div>
                    <div>
                      <span className="glance-item-label">Campus Safety</span>
                      <span className="glance-item-desc">Continuous Supervision</span>
                    </div>
                  </div>
                  <span className="glance-value-pill pill-teal">
                    <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>verified_user</span>
                    100% CCTV
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Admission CTA matching About.jsx */}
            <div className="card shadow-sm border-0 rounded-3 mb-4 overflow-hidden bg-light border">
              <div className="card-body p-4 text-center">
                <i className="fas fa-user-graduate fa-3x text-primary mb-3"></i>
                <h5 className="fw-bold text-dark">Admissions Open 2026-27</h5>
                <p className="small text-muted mb-4">
                  Enroll your child in Playgroup, Nursery, LKG, UKG or Classes I to VI.
                </p>
                <Link to="/admission" className="btn btn-warning w-100 fw-bold py-2 mb-2">
                  <i className="fas fa-edit me-1"></i> Apply Online Now
                </Link>
                <Link to="/contact" className="btn btn-outline-primary w-100 fw-bold py-2 small">
                  <i className="fas fa-phone-alt me-1"></i> Contact Admission Desk
                </Link>
              </div>
            </div>

            {/* Campus Guidelines & Quick Links */}
            <div className="modern-sidebar-card">
              <div className="modern-sidebar-header emerald-theme">
                <div className="modern-sidebar-title">
                  <span className="material-symbols-outlined" style={{ color: '#a7f3d0' }}>menu_book</span>
                  Campus Guidelines &amp; Quick Links
                </div>
                <span className="modern-sidebar-badge">Quick Portal</span>
              </div>
              <div className="p-3 d-flex flex-column gap-2">
                <a href="#timings" className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-white text-decoration-none text-dark hover-shadow">
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-warning">schedule</span>
                    <span className="small fw-semibold">Wing Timings Chart 2026–27</span>
                  </div>
                  <span className="badge bg-primary-subtle text-primary border border-primary border-opacity-25">Schedule</span>
                </a>
                <a href="#vacations" className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-white text-decoration-none text-dark hover-shadow">
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-danger">event_available</span>
                    <span className="small fw-semibold">Holiday Calendar (51 Days)</span>
                  </div>
                  <span className="badge bg-danger-subtle text-danger border border-danger border-opacity-25">51 Days</span>
                </a>
                <a href="#uniform" className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-white text-decoration-none text-dark hover-shadow">
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-primary">checkroom</span>
                    <span className="small fw-semibold">Uniform &amp; Turnout Standards</span>
                  </div>
                  <span className="badge bg-success-subtle text-success border border-success border-opacity-25">Turnout</span>
                </a>
                <a href="#cca-calendar" className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-white text-decoration-none text-dark hover-shadow">
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-success">calendar_month</span>
                    <span className="small fw-semibold">CCA Activity Calendar</span>
                  </div>
                  <span className="badge bg-warning-subtle text-dark border border-warning border-opacity-25">Session Fest</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
