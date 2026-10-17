import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { facultyMembers, schoolInfo } from '../data/content';

export default function About() {
  const [activeScheduleTab, setActiveScheduleTab] = useState('timings'); // 'timings' | 'uniform' | 'tuckshop' | 'all'
  const [seasonMode, setSeasonMode] = useState('both'); // 'both' | 'summer' | 'winter'
  const [uniformFilter, setUniformFilter] = useState('all'); // 'all' | 'regular' | 'sports' | 'winter'

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#uniform') {
      setActiveScheduleTab('uniform');
    } else if (hash === '#routine') {
      setActiveScheduleTab('timings');
    }
  }, []);
  return (
    <div>
      {/* M3 Page Header in Separate Structured Boxes */}
      <div className="m3-page-header">
        <div className="container">
          <div className="m3-header-container">
            <div className="m3-header-badges-box">
              <span className="m3-badge m3-badge-tonal">
                <span className="material-symbols-outlined fs-6">school</span> About SSA
              </span>
              <span className="m3-badge m3-badge-amber">
                <span className="material-symbols-outlined fs-6">history_edu</span> Estd. 1999
              </span>
            </div>
            <div className="m3-header-title-box">
              <h2 className="m3-page-header-title mb-0">About Swami Shiwanand Academy</h2>
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
                  <li className="active">About Us</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Left Content Column */}
          <div className="col-lg-8">
            {/* Section 1: Genesis & Vision */}
            <section id="about" className="mb-5">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <h3 className="header-title">Genesis &amp; Vision</h3>
                    <p className="header-subtitle">
                      Foundational roots, educational philosophy, and commitment to holistic child development.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-muted" style={{ lineHeight: '1.8', textAlign: 'justify' }}>
                <strong>{schoolInfo.name}</strong> was founded with an inspired vision to provide cheerful, value-based foundation education to young learners. Set amidst a lush green, secure campus aloof from urban hustle, our school offers cheerful activity zones, colorful digital smart classrooms, a discovery science corner, and communicative interactive programs.
              </p>
              <p className="text-muted" style={{ lineHeight: '1.8', textAlign: 'justify' }}>
                We believe that early childhood is the foundation of human personality. Our child-centric curriculum combines the best of Montessori play methods and modern experiential learning, ensuring that children develop not only intellectual curiosity but also emotional balance, empathy, and social cooperation.
              </p>
            </section>

            {/* Section 2: Principal's Message */}
            <section id="principal-message" className="mb-5">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                    <span className="material-symbols-outlined">account_circle</span>
                  </div>
                  <div>
                    <h3 className="header-title">Principal's Message</h3>
                    <p className="header-subtitle">
                      Inspiring thoughts and warm greetings from the desk of our school principal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="principal-showcase-card mb-4">
                <div className="principal-showcase-grid">
                  <div className="principal-profile-box">
                    <div className="principal-avatar-wrap">
                      <img
                        src="/images/principal.jpg"
                        alt="Principal - Swami Shiwanand Academy"
                        className="principal-avatar-img"
                      />
                      <span className="principal-avatar-badge" title="Verified Leadership">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified</span>
                      </span>
                    </div>

                    <div className="principal-nameplate-box">
                      <span className="principal-badge-chip">
                        <span className="material-symbols-outlined fs-6" style={{ fontSize: '14px' }}>workspace_premium</span>
                        Leadership Desk
                      </span>
                      <h4 className="principal-title-text">From Principal's Desk</h4>
                      <div className="principal-divider"></div>
                      <div className="principal-school-name">Swami Shiwanand Academy</div>
                      <div className="principal-school-sub">&amp; Kid's Play School</div>
                      <div className="principal-location-tag">
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#f59e0b' }}>location_on</span>
                        Sasaram, Bihar
                      </div>
                    </div>
                  </div>

                  <div className="principal-quote-box">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-3 text-warning">
                        <span className="material-symbols-outlined fs-1" style={{ color: '#f59e0b' }}>format_quote</span>
                        <span className="fw-bold text-dark small text-uppercase" style={{ letterSpacing: '0.6px' }}>
                          Inspiring Educational Philosophy
                        </span>
                      </div>
                      <blockquote className="fst-italic text-dark mb-3 fs-6" style={{ lineHeight: '1.8', borderLeft: 'none', paddingLeft: 0 }}>
                        "Childhood is not a race to see how quickly a child can read, write, and count. It is a small window of time to learn and develop at the pace which is right for each child."
                      </blockquote>
                      <p className="text-muted mb-3" style={{ lineHeight: '1.75', fontSize: '0.93rem' }}>
                        At Swami Shiwanand Academy, every child is valued as an individual with unique talents and sparks of creativity. Our teachers provide warm care, inspiring each youngster to explore the world with joy and confidence. We partner closely with parents to build a strong foundation of curiosity, empathy, and moral values.
                      </p>
                    </div>

                    <div className="pt-3 border-top d-flex align-items-center justify-content-between flex-wrap gap-2">
                      <span className="small text-muted d-flex align-items-center gap-1">
                        <span className="material-symbols-outlined fs-6 text-primary">school</span>
                        Academic Session 2026–27
                      </span>
                      <span className="m3-badge m3-badge-tonal">
                        Personalized Mentorship &amp; Care
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Aims & Objectives */}
            <section id="aims" className="mb-5">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                    <span className="material-symbols-outlined">target</span>
                  </div>
                  <div>
                    <h3 className="header-title">Aims &amp; Objectives</h3>
                    <p className="header-subtitle">
                      Four core foundational pillars nurturing intellectual agility, moral sanskar, physical vitality, and emotional wellness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                {/* Pillar 1: Cognitive Excellence */}
                <div className="col-lg-6 col-12">
                  <div className="aims-pillar-card pillar-blue">
                    <div className="aims-pillar-header">
                      <div className="aims-pillar-meta">
                        <span className="aims-pillar-tag">PILLAR 01 &bull; INTELLECTUAL FOUNDATION</span>
                        <span className="aims-pillar-index">01 / 04</span>
                      </div>
                      <div className="aims-pillar-title-wrap">
                        <div className="aims-pillar-halo">
                          <span className="material-symbols-outlined fs-3">psychology</span>
                        </div>
                        <div>
                          <h4 className="aims-pillar-title">Cognitive Excellence</h4>
                          <span className="small text-muted">Analytical Thinking &bull; Early Literacy</span>
                        </div>
                      </div>
                    </div>
                    <div className="aims-pillar-body">
                      <p className="aims-pillar-desc">
                        Developing agile analytical thinking, number fluency, and articulate expression through hands-on phonics, interactive storytelling, and activity-led Montessori numeracy kits.
                      </p>
                      <div className="aims-pillar-chips">
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-primary">auto_stories</span> Phonics &amp; Rhymes
                        </span>
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-primary">calculate</span> Number Fluency
                        </span>
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-primary">quiz</span> Curiosity Labs
                        </span>
                      </div>
                      <div className="aims-pillar-footer">
                        <span className="aims-pillar-badge">
                          <span className="material-symbols-outlined fs-6">verified</span> Montessori Integrated
                        </span>
                        <span>Pre-Primary &amp; Primary</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pillar 2: Moral & Spiritual Values */}
                <div className="col-lg-6 col-12">
                  <div className="aims-pillar-card pillar-amber">
                    <div className="aims-pillar-header">
                      <div className="aims-pillar-meta">
                        <span className="aims-pillar-tag">PILLAR 02 &bull; ETHICAL SANSKAR &amp; CULTURE</span>
                        <span className="aims-pillar-index">02 / 04</span>
                      </div>
                      <div className="aims-pillar-title-wrap">
                        <div className="aims-pillar-halo">
                          <span className="material-symbols-outlined fs-3">self_improvement</span>
                        </div>
                        <div>
                          <h4 className="aims-pillar-title">Moral &amp; Spiritual Values</h4>
                          <span className="small text-muted">Virtues &bull; Cultural Heritage</span>
                        </div>
                      </div>
                    </div>
                    <div className="aims-pillar-body">
                      <p className="aims-pillar-desc">
                        Inculcating deep truthfulness, empathy, humility, respect for elders, and patriotic Indian virtues through daily morning assemblies, value circles, and inspirational character stories.
                      </p>
                      <div className="aims-pillar-chips">
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-warning">favorite</span> Compassion &amp; Empathy
                        </span>
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-warning">wb_sunny</span> Morning Prayer Assembly
                        </span>
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-warning">handshake</span> Civic Respect
                        </span>
                      </div>
                      <div className="aims-pillar-footer">
                        <span className="aims-pillar-badge">
                          <span className="material-symbols-outlined fs-6">verified</span> Value-First Pedagogy
                        </span>
                        <span>Daily Assemblies</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pillar 3: Motor Skills & Kinesthetic Play */}
                <div className="col-lg-6 col-12">
                  <div className="aims-pillar-card pillar-emerald">
                    <div className="aims-pillar-header">
                      <div className="aims-pillar-meta">
                        <span className="aims-pillar-tag">PILLAR 03 &bull; PHYSICAL &amp; AGILITY PLAY</span>
                        <span className="aims-pillar-index">03 / 04</span>
                      </div>
                      <div className="aims-pillar-title-wrap">
                        <div className="aims-pillar-halo">
                          <span className="material-symbols-outlined fs-3">sports_gymnastics</span>
                        </div>
                        <div>
                          <h4 className="aims-pillar-title">Motor Skills &amp; Play</h4>
                          <span className="small text-muted">Kinesthetic Agility &bull; Fine Motor</span>
                        </div>
                      </div>
                    </div>
                    <div className="aims-pillar-body">
                      <p className="aims-pillar-desc">
                        Enhancing fine and gross motor agility, balance, and spatial reflexes through clay sculpture, paper craft, sensory textures, guided obstacle circuits, and playground sports.
                      </p>
                      <div className="aims-pillar-chips">
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-success">palette</span> Clay Modeling &amp; Art
                        </span>
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-success">directions_run</span> Obstacle Navigation
                        </span>
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-success">sports_baseball</span> Sensory Agility
                        </span>
                      </div>
                      <div className="aims-pillar-footer">
                        <span className="aims-pillar-badge">
                          <span className="material-symbols-outlined fs-6">verified</span> Active Play Arenas
                        </span>
                        <span>Weekly Sports Period</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pillar 4: Holistic Well-Being */}
                <div className="col-lg-6 col-12">
                  <div className="aims-pillar-card pillar-cyan">
                    <div className="aims-pillar-header">
                      <div className="aims-pillar-meta">
                        <span className="aims-pillar-tag">PILLAR 04 &bull; HEALTH &amp; MINDFULNESS</span>
                        <span className="aims-pillar-index">04 / 04</span>
                      </div>
                      <div className="aims-pillar-title-wrap">
                        <div className="aims-pillar-halo">
                          <span className="material-symbols-outlined fs-3">spa</span>
                        </div>
                        <div>
                          <h4 className="aims-pillar-title">Holistic Well-Being</h4>
                          <span className="small text-muted">Hygiene &bull; Emotional Balance</span>
                        </div>
                      </div>
                    </div>
                    <div className="aims-pillar-body">
                      <p className="aims-pillar-desc">
                        Nurturing lifelong sanitary discipline, balanced nutrition routines, periodic pediatric wellness checks, and calming mindfulness sessions for emotional resilience and joyful growth.
                      </p>
                      <div className="aims-pillar-chips">
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-info">clean_hands</span> Personal Hygiene
                        </span>
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-info">medical_services</span> Health Checkups
                        </span>
                        <span className="aims-pillar-chip">
                          <span className="material-symbols-outlined fs-6 text-info">self_improvement</span> Mindful Meditation
                        </span>
                      </div>
                      <div className="aims-pillar-footer">
                        <span className="aims-pillar-badge">
                          <span className="material-symbols-outlined fs-6">verified</span> Pediatric Monitored
                        </span>
                        <span>Continuous Wellness</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Faculty Overview */}
            <section id="faculty" className="mb-5">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
                    <span className="material-symbols-outlined">co_present</span>
                  </div>
                  <div>
                    <h3 className="header-title">Faculty &amp; Mentors</h3>
                    <p className="header-subtitle">
                      Certified Montessori and NTT educators delivering affectionate guidance and modern pedagogy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                {facultyMembers.map((member) => (
                  <div key={member.id} className="col-md-6 col-12">
                    <div className="faculty-showcase-card">
                      <div>
                        <div className="faculty-card-top">
                          <div className="faculty-avatar-wrap">
                            <img
                              src={member.img}
                              alt={member.name}
                              className="faculty-avatar-img"
                            />
                            <span className="faculty-verified-dot" title="Verified Educator">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>check</span>
                            </span>
                          </div>
                          <div className="faculty-info-wrap">
                            <h5 className="faculty-name">{member.name}</h5>
                            <div>
                              <span className="faculty-role-chip">
                                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>verified_user</span>
                                {member.role}
                              </span>
                            </div>
                            <div className="faculty-qual-meta">
                              <span className="material-symbols-outlined fs-6 text-warning">school</span>
                              <span>{member.qualification}</span>
                            </div>
                          </div>
                        </div>

                        {member.quote && (
                          <div className="faculty-quote-text">
                            "{member.quote}"
                          </div>
                        )}
                      </div>

                      <div className="faculty-card-footer">
                        <span className="faculty-specialty-badge">
                          <span className="material-symbols-outlined text-primary" style={{ fontSize: '13px' }}>workspace_premium</span>
                          {member.badge}
                        </span>
                        <span className="text-muted small d-flex align-items-center gap-1" style={{ fontSize: '0.74rem' }}>
                          <span className="material-symbols-outlined text-success" style={{ fontSize: '13px' }}>stars</span>
                          Permanent Faculty
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar Column (Sticky Alignment with Overview Sections) */}
          <div className="col-lg-4">
            <div className="about-sidebar-sticky">
              {/* Quick Stat Card: Executive KPI Grid */}
              <div className="stats-kpi-card mb-4" id="statistics">
                <div className="stats-kpi-header">
                  <div className="stats-kpi-title">
                    <span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>analytics</span>
                    <span>Key Statistics</span>
                  </div>
                  <span className="stats-kpi-badge">
                    <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>verified</span>
                    Verified 2026–27
                  </span>
                </div>

                <div className="stats-kpi-grid">
                  {/* KPI 1: Established */}
                  <div className="kpi-tile">
                    <div className="kpi-tile-top">
                      <div className="kpi-avatar avatar-blue">
                        <span className="material-symbols-outlined">calendar_month</span>
                      </div>
                      <span className="kpi-pill">Founded</span>
                    </div>
                    <div className="kpi-number">{schoolInfo.estd}</div>
                    <div className="kpi-label">Established</div>
                    <div className="kpi-caption">17+ Yrs Academic Legacy</div>
                  </div>

                  {/* KPI 2: Student Body */}
                  <div className="kpi-tile">
                    <div className="kpi-tile-top">
                      <div className="kpi-avatar avatar-emerald">
                        <span className="material-symbols-outlined">groups</span>
                      </div>
                      <span className="kpi-pill">Active</span>
                    </div>
                    <div className="kpi-number text-success">500+</div>
                    <div className="kpi-label">Happy Students</div>
                    <div className="kpi-caption">Playgroup to Std VI</div>
                  </div>

                  {/* KPI 3: Student-Teacher Ratio */}
                  <div className="kpi-tile">
                    <div className="kpi-tile-top">
                      <div className="kpi-avatar avatar-amber">
                        <span className="material-symbols-outlined">person_pin</span>
                      </div>
                      <span className="kpi-pill">1-on-1 Care</span>
                    </div>
                    <div className="kpi-number" style={{ color: '#b45309' }}>15 : 1</div>
                    <div className="kpi-label">Student-Teacher</div>
                    <div className="kpi-caption">Personalized Attention</div>
                  </div>

                  {/* KPI 4: Smart Classrooms */}
                  <div className="kpi-tile">
                    <div className="kpi-tile-top">
                      <div className="kpi-avatar avatar-purple">
                        <span className="material-symbols-outlined">devices</span>
                      </div>
                      <span className="kpi-pill">Digital</span>
                    </div>
                    <div className="kpi-number" style={{ color: '#7c3aed' }}>20+</div>
                    <div className="kpi-label">Smart Rooms</div>
                    <div className="kpi-caption">Interactive Displays</div>
                  </div>

                  {/* KPI 5: Transport Fleet */}
                  <div className="kpi-tile">
                    <div className="kpi-tile-top">
                      <div className="kpi-avatar avatar-cyan">
                        <span className="material-symbols-outlined">directions_bus</span>
                      </div>
                      <span className="kpi-pill">Fleet</span>
                    </div>
                    <div className="kpi-number" style={{ color: '#0d9488' }}>10+</div>
                    <div className="kpi-label">GPS Buses</div>
                    <div className="kpi-caption">Real-Time Transit</div>
                  </div>

                  {/* KPI 6: Safety & Security */}
                  <div className="kpi-tile">
                    <div className="kpi-tile-top">
                      <div className="kpi-avatar avatar-rose">
                        <span className="material-symbols-outlined">verified_user</span>
                      </div>
                      <span className="kpi-pill">Guarded</span>
                    </div>
                    <div className="kpi-number" style={{ color: '#e11d48' }}>100%</div>
                    <div className="kpi-label">CCTV Security</div>
                    <div className="kpi-caption">Safe &amp; Eco Campus</div>
                  </div>
                </div>

                <div className="stats-kpi-footer">
                  <span className="text-muted">
                    <strong>Deepkiran Trust</strong> &bull; Reg. 2009
                  </span>
                  <Link to="/mandatory-disclosure" className="stats-kpi-footer-link">
                    <span>Disclosures</span>
                    <span className="material-symbols-outlined fs-6">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Executive Admission Spotlight Showcase */}
              <div className="admission-spotlight-card mb-4" id="sidebar-admission">
                {/* Royal Navy Header */}
                <div className="admission-spotlight-header">
                  <div className="admission-spotlight-top-meta">
                    <span className="admission-spotlight-live-badge">
                      <span className="admission-spotlight-live-dot"></span>
                      Live Admissions
                    </span>
                    <span className="admission-spotlight-session-tag">
                      Session 2026–27
                    </span>
                  </div>

                  <div className="admission-spotlight-title-row">
                    <div className="admission-spotlight-icon-halo">
                      <span className="material-symbols-outlined fs-4">school</span>
                    </div>
                    <div>
                      <h5 className="admission-spotlight-title">Admissions Open</h5>
                      <p className="admission-spotlight-sub">Playgroup to Class VI &bull; Early Batch</p>
                    </div>
                  </div>
                </div>

                {/* Urgency Alert Strip */}
                <div className="admission-spotlight-alert">
                  <span className="material-symbols-outlined text-warning" style={{ fontSize: '16px' }}>local_fire_department</span>
                  <span>Limited Seats Remaining (15:1 Student Ratio)</span>
                </div>

                {/* Card Body */}
                <div className="admission-spotlight-body">
                  {/* 4 Feature Badges Grid */}
                  <div className="admission-spotlight-features">
                    <div className="admission-spotlight-feat-chip">
                      <span className="material-symbols-outlined text-primary">auto_stories</span>
                      <span>CBSE Pattern</span>
                    </div>
                    <div className="admission-spotlight-feat-chip">
                      <span className="material-symbols-outlined text-success">child_care</span>
                      <span>Montessori Play</span>
                    </div>
                    <div className="admission-spotlight-feat-chip">
                      <span className="material-symbols-outlined text-amber">directions_bus</span>
                      <span>GPS Bus Transit</span>
                    </div>
                    <div className="admission-spotlight-feat-chip">
                      <span className="material-symbols-outlined text-purple">shield</span>
                      <span>Guarded Campus</span>
                    </div>
                  </div>

                  {/* Grades Offered Horizontal Strip */}
                  <div className="admission-spotlight-grades">
                    <span className="admission-spotlight-grade-badge">Playgroup</span>
                    <span className="admission-spotlight-grade-badge">Nursery</span>
                    <span className="admission-spotlight-grade-badge">LKG &amp; UKG</span>
                    <span className="admission-spotlight-grade-badge">Std I – VI</span>
                  </div>

                  {/* Primary Gold CTA */}
                  <Link
                    to="/admission"
                    className="admission-spotlight-primary-btn"
                    title="Apply for Academic Session 2026-27"
                  >
                    <span className="material-symbols-outlined fs-5">edit_document</span>
                    <span>Apply Online for 2026–27</span>
                    <span className="material-symbols-outlined fs-6 ms-auto">arrow_forward</span>
                  </Link>

                  {/* Secondary Actions Row */}
                  <div className="admission-spotlight-actions-row">
                    <Link
                      to="/contact"
                      className="admission-spotlight-secondary-btn"
                      title="Send an inquiry to our counselors"
                    >
                      <span className="material-symbols-outlined fs-6 text-primary">support_agent</span>
                      <span>Counselor Desk</span>
                    </Link>

                    <a
                      href="tel:+919431068033"
                      className="admission-spotlight-secondary-btn"
                      title="Call School Helpline"
                    >
                      <span className="material-symbols-outlined fs-6 text-success">call</span>
                      <span>Direct Call</span>
                    </a>
                  </div>
                </div>

                {/* Card Footer Strip */}
                <div className="admission-spotlight-footer">
                  <span className="verified-chip">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                    <span>Direct Desk Counter Access</span>
                  </span>
                  <span>Mon–Sat (8am–2pm)</span>
                </div>
              </div>

              {/* Society / Trust Info */}
              <div className="modern-sidebar-card" id="society">
                <div className="modern-sidebar-header amber-theme">
                  <div className="modern-sidebar-title">
                    <span className="material-symbols-outlined" style={{ color: '#fef08a' }}>account_balance</span>
                    Governing Society
                  </div>
                  <span className="modern-sidebar-badge">Trust</span>
                </div>
                <div className="p-3">
                  <p className="small text-muted mb-3" style={{ lineHeight: '1.7' }}>
                    <strong className="text-dark">{schoolInfo.name}</strong> is operated and managed by <strong className="text-dark">{schoolInfo.trust}</strong> under the visionary guidance of founder director <strong className="text-dark">{schoolInfo.founder}</strong>.
                  </p>
                  <div className="p-2 rounded-3 bg-light border text-muted small d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-warning fs-6">verified_user</span>
                    <span>Non-commercialized educational excellence serving Sasaram &amp; Rohtas region.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 5: CAMPUS ROUTINE & ATTIRE HANDBOOK (FULL-WIDTH 12-COLUMN HUB)
          ========================================================================= */}
      <section id="timings" className="campus-handbook-section py-5">
        <div className="container">
          <div className="section-header-box mb-4">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="header-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h3 className="header-title">Daily Campus Routine &amp; Attire Handbook</h3>
                  <p className="header-subtitle">
                    Official dual-season school timings, sacred morning assembly, and prescribed student dress code.
                  </p>
                </div>
              </div>

                  {/* Hub Mode Switcher Pills */}
                  <div className="schedule-hub-tab-bar">
                    <button
                      type="button"
                      className={`schedule-hub-tab-btn ${activeScheduleTab === 'timings' ? 'active' : ''}`}
                      onClick={() => setActiveScheduleTab('timings')}
                    >
                      <span className="material-symbols-outlined fs-6">alarm</span>
                      <span>Wing Timings</span>
                    </button>
                    <button
                      type="button"
                      className={`schedule-hub-tab-btn ${activeScheduleTab === 'uniform' ? 'active' : ''}`}
                      onClick={() => setActiveScheduleTab('uniform')}
                    >
                      <span className="material-symbols-outlined fs-6">checkroom</span>
                      <span>Dress Code</span>
                    </button>
                    <button
                      type="button"
                      className={`schedule-hub-tab-btn ${activeScheduleTab === 'tuckshop' ? 'active' : ''}`}
                      onClick={() => setActiveScheduleTab('tuckshop')}
                    >
                      <span className="material-symbols-outlined fs-6">storefront</span>
                      <span>Tuck Shop &amp; Turnout</span>
                    </button>
                    <button
                      type="button"
                      className={`schedule-hub-tab-btn tab-btn-all ${activeScheduleTab === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveScheduleTab('all')}
                      title="Display all operational guidelines together"
                    >
                      <span className="material-symbols-outlined fs-6">view_agenda</span>
                      <span>View All</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* TAB 1: Wing-Wise School Timings */}
              {(activeScheduleTab === 'timings' || activeScheduleTab === 'all') && (
                <div className="schedule-panel-card mb-4" id="routine">
                  <div className="schedule-panel-header header-timings">
                    <div className="d-flex align-items-center gap-3">
                      <div className="schedule-header-icon-halo">
                        <span className="material-symbols-outlined fs-4">schedule</span>
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <h5 className="schedule-panel-main-title mb-0">Wing-Wise School Timings</h5>
                          <span className="schedule-session-pill">Session 2026–27</span>
                        </div>
                        <p className="schedule-panel-main-sub mb-0">
                          Dual-Season Operational Bell Schedule &bull; Kindergarten to Class VI
                        </p>
                      </div>
                    </div>

                    {/* Season Filter Pills */}
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="season-filter-label d-none d-sm-inline">Display:</span>
                      <div className="season-filter-strip">
                        <button
                          type="button"
                          className={`season-filter-btn ${seasonMode === 'both' ? 'active' : ''}`}
                          onClick={() => setSeasonMode('both')}
                        >
                          Dual Season
                        </button>
                        <button
                          type="button"
                          className={`season-filter-btn ${seasonMode === 'summer' ? 'active' : ''}`}
                          onClick={() => setSeasonMode('summer')}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>wb_sunny</span>
                          Summer
                        </button>
                        <button
                          type="button"
                          className={`season-filter-btn ${seasonMode === 'winter' ? 'active' : ''}`}
                          onClick={() => setSeasonMode('winter')}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>ac_unit</span>
                          Winter
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="schedule-panel-body">
                    <div className="row g-4 align-items-stretch">
                      {/* Wing 1: Playgroup & Nursery */}
                      <div className="col-lg-4 col-md-6 col-12 d-flex">
                        <div className="wing-feature-card wing-amber-card w-100">
                          <div className="wing-card-top">
                            <div className="wing-title-group">
                              <div className="wing-avatar-box wing-avatar-amber">
                                <span className="material-symbols-outlined">toys</span>
                              </div>
                              <div>
                                <h6 className="wing-card-title">Playgroup &amp; Nursery</h6>
                                <span className="wing-card-sub">Early Childhood &bull; Ages 2.5–4</span>
                              </div>
                            </div>
                            <span className="timing-wing-day-badge badge-amber">Mon – Fri</span>
                          </div>

                          <div className="wing-clocks-cluster">
                            {(seasonMode === 'both' || seasonMode === 'summer') && (
                              <div className="wing-clock-box clock-summer">
                                <div className="clock-label">
                                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>wb_sunny</span>
                                  <span>Summer</span>
                                </div>
                                <div className="clock-time">08:30 AM – 11:30 AM</div>
                              </div>
                            )}
                            {(seasonMode === 'both' || seasonMode === 'winter') && (
                              <div className="wing-clock-box clock-winter">
                                <div className="clock-label">
                                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>ac_unit</span>
                                  <span>Winter</span>
                                </div>
                                <div className="clock-time">09:00 AM – 12:00 PM</div>
                              </div>
                            )}
                          </div>

                          <div className="wing-routine-list">
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-warning">login</span>
                              <div><strong>08:15 AM:</strong> Gentle arrival circle, mood greeting &amp; rhymes.</div>
                            </div>
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-warning">psychology</span>
                              <div><strong>09:15 AM:</strong> Montessori sensory play &amp; motor skills.</div>
                            </div>
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-warning">nutrition</span>
                              <div><strong>10:00 AM:</strong> Fruit snack recess &amp; supervised hydration.</div>
                            </div>
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-warning">family_restroom</span>
                              <div><strong>11:30 AM:</strong> Story circle wrap-up &amp; secure handover.</div>
                            </div>
                          </div>

                          <div className="wing-metrics-strip">
                            <span className="wing-metric-pill pill-amber">
                              <span className="material-symbols-outlined">groups</span>
                              <span>Ratio 1:12</span>
                            </span>
                            <span className="wing-metric-pill pill-amber">
                              <span className="material-symbols-outlined">ac_unit</span>
                              <span>AC Suites</span>
                            </span>
                            <span className="wing-metric-pill pill-amber">
                              <span className="material-symbols-outlined">backpack</span>
                              <span>No Heavy Bags</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Wing 2: LKG & UKG */}
                      <div className="col-lg-4 col-md-6 col-12 d-flex">
                        <div className="wing-feature-card wing-emerald-card w-100">
                          <div className="wing-card-top">
                            <div className="wing-title-group">
                              <div className="wing-avatar-box wing-avatar-emerald">
                                <span className="material-symbols-outlined">child_care</span>
                              </div>
                              <div>
                                <h6 className="wing-card-title">LKG &amp; UKG</h6>
                                <span className="wing-card-sub">Montessori &amp; Phonics &bull; Ages 4–6</span>
                              </div>
                            </div>
                            <span className="timing-wing-day-badge badge-emerald">Mon – Fri</span>
                          </div>

                          <div className="wing-clocks-cluster">
                            {(seasonMode === 'both' || seasonMode === 'summer') && (
                              <div className="wing-clock-box clock-summer">
                                <div className="clock-label">
                                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>wb_sunny</span>
                                  <span>Summer</span>
                                </div>
                                <div className="clock-time">08:00 AM – 12:30 PM</div>
                              </div>
                            )}
                            {(seasonMode === 'both' || seasonMode === 'winter') && (
                              <div className="wing-clock-box clock-winter">
                                <div className="clock-label">
                                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>ac_unit</span>
                                  <span>Winter</span>
                                </div>
                                <div className="clock-time">08:30 AM – 01:00 PM</div>
                              </div>
                            )}
                          </div>

                          <div className="wing-routine-list">
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-success">auto_stories</span>
                              <div><strong>07:55 AM:</strong> Assembly invocation, prayer &amp; phonics drills.</div>
                            </div>
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-success">edit_note</span>
                              <div><strong>08:30 AM:</strong> Alphabet tracing, number skills &amp; EVS.</div>
                            </div>
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-success">local_cafe</span>
                              <div><strong>10:30 AM:</strong> Nutritious tiffin recess &amp; puzzle games.</div>
                            </div>
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-success">directions_bus</span>
                              <div><strong>12:30 PM:</strong> Creative storytelling &amp; bus dispersal.</div>
                            </div>
                          </div>

                          <div className="wing-metrics-strip">
                            <span className="wing-metric-pill pill-emerald">
                              <span className="material-symbols-outlined">groups</span>
                              <span>Ratio 1:15</span>
                            </span>
                            <span className="wing-metric-pill pill-emerald">
                              <span className="material-symbols-outlined">record_voice_over</span>
                              <span>Phonics Lab</span>
                            </span>
                            <span className="wing-metric-pill pill-emerald">
                              <span className="material-symbols-outlined">palette</span>
                              <span>Activity Sat</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Wing 3: Primary & Middle */}
                      <div className="col-lg-4 col-md-12 col-12 d-flex">
                        <div className="wing-feature-card wing-indigo-card w-100">
                          <div className="wing-card-top">
                            <div className="wing-title-group">
                              <div className="wing-avatar-box wing-avatar-indigo">
                                <span className="material-symbols-outlined">school</span>
                              </div>
                              <div>
                                <h6 className="wing-card-title">Primary &amp; Middle</h6>
                                <span className="wing-card-sub">Std I to VI &bull; CBSE Foundation</span>
                              </div>
                            </div>
                            <span className="timing-wing-day-badge badge-indigo">Mon – Sat</span>
                          </div>

                          <div className="wing-clocks-cluster">
                            {(seasonMode === 'both' || seasonMode === 'summer') && (
                              <div className="wing-clock-box clock-summer">
                                <div className="clock-label">
                                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>wb_sunny</span>
                                  <span>Summer</span>
                                </div>
                                <div className="clock-time">07:45 AM – 01:30 PM</div>
                              </div>
                            )}
                            {(seasonMode === 'both' || seasonMode === 'winter') && (
                              <div className="wing-clock-box clock-winter">
                                <div className="clock-label">
                                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>ac_unit</span>
                                  <span>Winter</span>
                                </div>
                                <div className="clock-time">08:15 AM – 02:00 PM</div>
                              </div>
                            )}
                          </div>

                          <div className="wing-routine-list">
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-primary">alarm_on</span>
                              <div><strong>07:45 AM:</strong> Sacred morning assembly &amp; moral thought.</div>
                            </div>
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-primary">calculate</span>
                              <div><strong>08:15 AM:</strong> Core subject periods: Maths, Science, Lang.</div>
                            </div>
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-primary">restaurant</span>
                              <div><strong>10:45 AM:</strong> Campus lunch break, sports playtime &amp; refreshments.</div>
                            </div>
                            <div className="wing-routine-item">
                              <span className="material-symbols-outlined text-primary">terminal</span>
                              <div><strong>01:30 PM:</strong> Computer science &amp; fleet dispersal.</div>
                            </div>
                          </div>

                          <div className="wing-metrics-strip">
                            <span className="wing-metric-pill pill-indigo">
                              <span className="material-symbols-outlined">schedule</span>
                              <span>8 Periods Daily</span>
                            </span>
                            <span className="wing-metric-pill pill-indigo">
                              <span className="material-symbols-outlined">science</span>
                              <span>STEM Labs</span>
                            </span>
                            <span className="wing-metric-pill pill-indigo">
                              <span className="material-symbols-outlined">pin_drop</span>
                              <span>GPS Buses</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sacred Assembly Feature Banner */}
                    <div className="schedule-assembly-banner mt-4">
                      <div className="row g-4 align-items-center">
                        <div className="col-lg-7 col-12">
                          <div className="d-flex align-items-start gap-3">
                            <div className="assembly-bell-halo">
                              <span className="material-symbols-outlined assembly-bell-icon" style={{ fontSize: '26px' }}>notifications_active</span>
                            </div>
                            <div>
                              <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                                <h5 className="assembly-banner-title mb-0">Sacred 15-Minute Morning Assembly Routine</h5>
                                <span className="assembly-banner-badge">
                                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>schedule</span>
                                  07:35 AM – 07:50 AM
                                </span>
                              </div>
                              <p className="assembly-banner-desc mb-3">
                                Mandatory daily attendance for prayer, physical alignment &amp; moral sanskar. Campus gates close strictly 10 minutes prior to the opening bell (07:40 AM) for synchronized opening invocation.
                              </p>
                              <div className="d-flex align-items-center gap-3 flex-wrap">
                                <Link to="/student-corner" className="assembly-action-btn">
                                  <span>View Full Bell Timetable</span>
                                  <span className="material-symbols-outlined fs-6">arrow_forward</span>
                                </Link>
                                <span className="text-muted small fw-semibold d-flex align-items-center gap-1">
                                  <span className="material-symbols-outlined text-danger" style={{ fontSize: '16px' }}>door_front</span>
                                  Gate Closes Strictly at 07:40 AM
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-5 col-12">
                          <div className="assembly-pillars-card-grid">
                            <div className="assembly-pillar-card">
                              <span className="material-symbols-outlined text-warning fs-5">auto_awesome</span>
                              <div>
                                <strong>Saraswati Vandana &amp; Shanti Path</strong>
                                <span className="d-block text-muted">Daily Vedic invocation &amp; spiritual focus</span>
                              </div>
                            </div>
                            <div className="assembly-pillar-card">
                              <span className="material-symbols-outlined text-primary fs-5">lightbulb</span>
                              <div>
                                <strong>Moral Thought &amp; Sanskrit Shloka</strong>
                                <span className="d-block text-muted">Character building &amp; ethical value reflection</span>
                              </div>
                            </div>
                            <div className="assembly-pillar-card">
                              <span className="material-symbols-outlined text-success fs-5">flag</span>
                              <div>
                                <strong>National Anthem &amp; Student Pledge</strong>
                                <span className="d-block text-muted">Patriotic unity &amp; civic discipline</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: School Uniform Handbook */}
              {(activeScheduleTab === 'uniform' || activeScheduleTab === 'all') && (
                <div className="schedule-panel-card mb-4" id="uniform">
                  <div className="schedule-panel-header header-uniform">
                    <div className="d-flex align-items-center gap-3">
                      <div className="m3-schedule-header-icon" style={{ background: '#2563eb', color: '#fff' }}>
                        <span className="material-symbols-outlined">checkroom</span>
                      </div>
                      <div>
                        <h5 className="m-0 fw-bold" style={{ color: '#1e3a8a' }}>School Uniform &amp; Dress Code Handbook</h5>
                        <p className="m-0 small fw-semibold" style={{ color: '#1d4ed8' }}>Standardized Student Attire &bull; Official Academic &amp; Activity Wear</p>
                      </div>
                    </div>

                    <span className="m3-schedule-chip chip-blue">
                      <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>verified_user</span>
                      Mandatory Dress Code
                    </span>
                  </div>

                  <div className="schedule-panel-body">
                    <div className="row g-4">
                      {/* Day 1: Regular Academic Days */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="uniform-day-card card-regular">
                          <div className="uniform-card-header">
                            <span className="uniform-day-badge badge-regular">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>calendar_today</span>
                              Mon, Tue, Thu, Fri
                            </span>
                            <span className="uniform-category-label">
                              <span className="material-symbols-outlined text-primary" style={{ fontSize: '15px' }}>apparel</span>
                              Regular Attire
                            </span>
                          </div>

                          <div className="uniform-palette-strip">
                            <div className="uniform-swatch-item">
                              <span className="uniform-color-dot" style={{ background: '#7dd3fc' }}></span>
                              <span>Sky Blue</span>
                            </div>
                            <div className="uniform-swatch-item">
                              <span className="uniform-color-dot" style={{ background: '#1e40af' }}></span>
                              <span>Royal Blue</span>
                            </div>
                            <div className="uniform-swatch-item">
                              <span className="uniform-color-dot" style={{ background: '#0f172a' }}></span>
                              <span>Black Polish</span>
                            </div>
                            <div className="uniform-swatch-item">
                              <span className="uniform-color-dot" style={{ background: '#1e293b' }}></span>
                              <span>Navy Socks</span>
                            </div>
                          </div>

                          <div className="uniform-details-list">
                            <div className="uniform-detail-row">
                              <span className="material-symbols-outlined uniform-bullet-icon bullet-regular">styler</span>
                              <div><strong>Daily Attire:</strong> Sky blue shirt with embroidered school crest, royal blue shorts / pleated skirt.</div>
                            </div>
                            <div className="uniform-detail-row">
                              <span className="material-symbols-outlined uniform-bullet-icon bullet-regular">workspace_premium</span>
                              <div><strong>Accessories:</strong> Official striped tie, woven crest belt, polished black shoes &amp; navy socks.</div>
                            </div>
                            <div className="uniform-detail-row">
                              <span className="material-symbols-outlined uniform-bullet-icon bullet-regular">texture</span>
                              <div><strong>Fabric Spec:</strong> 65% combed cotton / 35% poly wrinkle-free blend, press-ironed daily.</div>
                            </div>
                          </div>

                          <div className="uniform-chips-strip mt-auto pt-2">
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#2563eb' }}>check</span>
                              Sky Blue Shirt
                            </span>
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#2563eb' }}>check</span>
                              Royal Blue Bottoms
                            </span>
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#2563eb' }}>check</span>
                              Tie &amp; Crest Belt
                            </span>
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#2563eb' }}>check</span>
                              Black Oxford Shoes
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Day 2: Sports Days */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="uniform-day-card card-sports">
                          <div className="uniform-card-header">
                            <span className="uniform-day-badge badge-sports">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>sports_soccer</span>
                              Wed &amp; Sat
                            </span>
                            <span className="uniform-category-label">
                              <span className="material-symbols-outlined text-success" style={{ fontSize: '15px' }}>fitness_center</span>
                              House Uniform
                            </span>
                          </div>

                          {/* 4 House Color Cards */}
                          <div className="uniform-house-grid">
                            <div className="uniform-house-card house-card-agni">
                              <span className="uniform-color-dot" style={{ background: '#ef4444' }}></span>
                              <div className="uniform-house-info">
                                <span className="uniform-house-name">Agni House</span>
                                <span className="uniform-house-tag">Red Crew</span>
                              </div>
                            </div>
                            <div className="uniform-house-card house-card-vayu">
                              <span className="uniform-color-dot" style={{ background: '#f59e0b' }}></span>
                              <div className="uniform-house-info">
                                <span className="uniform-house-name">Vayu House</span>
                                <span className="uniform-house-tag">Amber Crew</span>
                              </div>
                            </div>
                            <div className="uniform-house-card house-card-jal">
                              <span className="uniform-color-dot" style={{ background: '#2563eb' }}></span>
                              <div className="uniform-house-info">
                                <span className="uniform-house-name">Jal House</span>
                                <span className="uniform-house-tag">Blue Crew</span>
                              </div>
                            </div>
                            <div className="uniform-house-card house-card-prithvi">
                              <span className="uniform-color-dot" style={{ background: '#10b981' }}></span>
                              <div className="uniform-house-info">
                                <span className="uniform-house-name">Prithvi House</span>
                                <span className="uniform-house-tag">Green Crew</span>
                              </div>
                            </div>
                          </div>

                          <div className="uniform-details-list">
                            <div className="uniform-detail-row">
                              <span className="material-symbols-outlined uniform-bullet-icon bullet-sports">sports</span>
                              <div><strong>Upper &amp; Lower:</strong> Official school sports house dry-fit t-shirt with clean white track pants.</div>
                            </div>
                            <div className="uniform-detail-row">
                              <span className="material-symbols-outlined uniform-bullet-icon bullet-sports">hiking</span>
                              <div><strong>Footwear:</strong> Clean white canvas sneakers &amp; white cotton sports socks.</div>
                            </div>
                            <div className="uniform-detail-row">
                              <span className="material-symbols-outlined uniform-bullet-icon bullet-sports">sprint</span>
                              <div><strong>Athletic Build:</strong> 4-way stretch moisture-wicking dry-fit mesh with non-marking sole shoes.</div>
                            </div>
                          </div>

                          <div className="uniform-chips-strip mt-auto pt-2">
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#059669' }}>check</span>
                              House Dry-Fit Tee
                            </span>
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#059669' }}>check</span>
                              White Track Pants
                            </span>
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#059669' }}>check</span>
                              Clean White Sneakers
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Day 3: Winter Attire */}
                      <div className="col-lg-4 col-md-12 col-12">
                        <div className="uniform-day-card card-winter">
                          <div className="uniform-card-header">
                            <span className="uniform-day-badge badge-winter">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>ac_unit</span>
                              Nov – Feb
                            </span>
                            <span className="uniform-category-label">
                              <span className="material-symbols-outlined text-danger" style={{ fontSize: '15px' }}>severe_cold</span>
                              Winter Attire
                            </span>
                          </div>

                          <div className="uniform-palette-strip">
                            <div className="uniform-swatch-item">
                              <span className="uniform-color-dot" style={{ background: '#1e3a8a' }}></span>
                              <span>Navy Knit</span>
                            </div>
                            <div className="uniform-swatch-item">
                              <span className="uniform-color-dot" style={{ background: '#0f172a' }}></span>
                              <span>Blazer Suiting</span>
                            </div>
                            <div className="uniform-swatch-item">
                              <span className="uniform-color-dot" style={{ background: '#cbd5e1' }}></span>
                              <span>Brass Emblem</span>
                            </div>
                          </div>

                          <div className="uniform-details-list">
                            <div className="uniform-detail-row">
                              <span className="material-symbols-outlined uniform-bullet-icon bullet-winter">dry_cleaning</span>
                              <div><strong>Outerwear:</strong> Navy blue V-neck pullover or tailored school blazer with embossed metal crest badge.</div>
                            </div>
                            <div className="uniform-detail-row">
                              <span className="material-symbols-outlined uniform-bullet-icon bullet-winter">ac_unit</span>
                              <div><strong>Thermal Layer:</strong> Warm navy blue tights or winter slacks for comfort and cold protection.</div>
                            </div>
                            <div className="uniform-detail-row">
                              <span className="material-symbols-outlined uniform-bullet-icon bullet-winter">weather_snowy</span>
                              <div><strong>Frost Gear:</strong> Navy woolen beanie cap &amp; knitted school muffler permitted on cold wave days (&lt;14°C).</div>
                            </div>
                          </div>

                          <div className="uniform-chips-strip mt-auto pt-2">
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#e11d48' }}>check</span>
                              Navy V-Neck Pullover
                            </span>
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#e11d48' }}>check</span>
                              Crest Blazer
                            </span>
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#e11d48' }}>check</span>
                              Thermal Slacks
                            </span>
                            <span className="uniform-spec-chip">
                              <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#e11d48' }}>check</span>
                              Navy Wool Beanie
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Campus Tuck Shop & Turnout Protocol */}
              {(activeScheduleTab === 'tuckshop' || activeScheduleTab === 'all') && (
                <div className="schedule-panel-card mb-4" id="tuckshop">
                  <div className="schedule-panel-header header-guidance">
                    <div className="d-flex align-items-center gap-3">
                      <div className="m3-schedule-header-icon" style={{ background: '#0b57d0', color: '#fff' }}>
                        <span className="material-symbols-outlined">storefront</span>
                      </div>
                      <div>
                        <h5 className="m-0 fw-bold" style={{ color: '#0c4a6e' }}>Campus Tuck Shop &amp; Daily Turnout Standards</h5>
                        <p className="m-0 small fw-semibold" style={{ color: '#0369a1' }}>Authorized Uniform Counter, Smart RFID Badging &amp; Inspection Protocols</p>
                      </div>
                    </div>
                    <span className="m3-schedule-chip chip-blue">
                      <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>verified</span>
                      On-Campus Official
                    </span>
                  </div>

                  <div className="schedule-panel-body">
                    <div className="row g-4 align-items-stretch">
                      {/* Left: Store Info */}
                      <div className="col-lg-6 col-12">
                        <div className="tuckshop-info-box h-100 d-flex flex-column">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center gap-2">
                              <span className="material-symbols-outlined text-primary fs-5">shopping_bag</span>
                              <h6 className="fw-bold text-dark m-0">Authorized School Attire Counter</h6>
                            </div>
                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 small fw-bold">Official Store</span>
                          </div>

                          <p className="small text-muted mb-3" style={{ lineHeight: '1.65' }}>
                            Swami Shiwanand Academy maintains an official on-campus uniform tuck shop to ensure verified color dyes, durable double-stitched fabric, and authentic embroidered logos.
                          </p>

                          {/* 4 Quick Spec Boxes */}
                          <div className="tuckshop-specs-grid mb-3">
                            <div className="tuckshop-spec-item">
                              <span className="material-symbols-outlined text-primary">location_on</span>
                              <div>
                                <span className="spec-title">Counter Location</span>
                                <span className="spec-desc">Admin Block, Ground Floor (Counter 2)</span>
                              </div>
                            </div>
                            <div className="tuckshop-spec-item">
                              <span className="material-symbols-outlined text-primary">schedule</span>
                              <div>
                                <span className="spec-title">Store Timings</span>
                                <span className="spec-desc">Mon – Sat: 09:00 AM – 01:30 PM</span>
                              </div>
                            </div>
                            <div className="tuckshop-spec-item">
                              <span className="material-symbols-outlined text-primary">sync</span>
                              <div>
                                <span className="spec-title">Size Exchange</span>
                                <span className="spec-desc">Guaranteed within 7 days with tags</span>
                              </div>
                            </div>
                            <div className="tuckshop-spec-item">
                              <span className="material-symbols-outlined text-primary">credit_card</span>
                              <div>
                                <span className="spec-title">Payment Modes</span>
                                <span className="spec-desc">UPI, QR Code, Cards &amp; Cash Accepted</span>
                              </div>
                            </div>
                          </div>

                          {/* Official Uniform Kits Available (Fills the blank space with high-value content!) */}
                          <div className="tuckshop-kits-showcase mb-3">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="small fw-bold text-secondary text-uppercase" style={{ letterSpacing: '0.4px', fontSize: '0.72rem' }}>
                                Official Uniform Bundles &amp; Sizing:
                              </span>
                              <span className="badge bg-light text-secondary border small">Sizes 22 to 38</span>
                            </div>

                            <div className="tuckshop-kit-list">
                              <div className="tuckshop-kit-row">
                                <div className="d-flex align-items-center gap-2">
                                  <span className="tuckshop-kit-icon badge-amber">
                                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>toys</span>
                                  </span>
                                  <div>
                                    <strong className="d-block text-dark" style={{ fontSize: '0.8rem' }}>Pre-Primary Kit (Nursery &amp; KG)</strong>
                                    <span className="text-muted" style={{ fontSize: '0.72rem' }}>Sky blue polo/tunic, anti-skid socks, activity apron</span>
                                  </div>
                                </div>
                                <span className="kit-tag-badge">Full Set</span>
                              </div>

                              <div className="tuckshop-kit-row">
                                <div className="d-flex align-items-center gap-2">
                                  <span className="tuckshop-kit-icon badge-blue">
                                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>school</span>
                                  </span>
                                  <div>
                                    <strong className="d-block text-dark" style={{ fontSize: '0.8rem' }}>Primary Academic Kit (Std I–VI)</strong>
                                    <span className="text-muted" style={{ fontSize: '0.72rem' }}>Crested shirt, royal blue bottoms, official tie &amp; belt</span>
                                  </div>
                                </div>
                                <span className="kit-tag-badge">Full Set</span>
                              </div>

                              <div className="tuckshop-kit-row">
                                <div className="d-flex align-items-center gap-2">
                                  <span className="tuckshop-kit-icon badge-green">
                                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>fitness_center</span>
                                  </span>
                                  <div>
                                    <strong className="d-block text-dark" style={{ fontSize: '0.8rem' }}>Sports House Kit (All Wings)</strong>
                                    <span className="text-muted" style={{ fontSize: '0.72rem' }}>House dry-fit tee, white track pants, sports socks</span>
                                  </div>
                                </div>
                                <span className="kit-tag-badge">Wed/Sat</span>
                              </div>

                              <div className="tuckshop-kit-row">
                                <div className="d-flex align-items-center gap-2">
                                  <span className="tuckshop-kit-icon badge-rose">
                                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>dry_cleaning</span>
                                  </span>
                                  <div>
                                    <strong className="d-block text-dark" style={{ fontSize: '0.8rem' }}>Winter Woolen Kit (Nov–Feb)</strong>
                                    <span className="text-muted" style={{ fontSize: '0.72rem' }}>Tailored blazer, V-neck pull-over, thermal warmers</span>
                                  </div>
                                </div>
                                <span className="kit-tag-badge">Seasonal</span>
                              </div>
                            </div>
                          </div>

                          {/* Quality Assurance Strip */}
                          <div className="tuckshop-guarantee-ribbon mb-3">
                            <div className="guarantee-item">
                              <span className="material-symbols-outlined text-success">verified</span>
                              <span>100% Color-Fast</span>
                            </div>
                            <div className="guarantee-divider"></div>
                            <div className="guarantee-item">
                              <span className="material-symbols-outlined text-primary">straighten</span>
                              <span>Custom Tailoring</span>
                            </div>
                            <div className="guarantee-divider"></div>
                            <div className="guarantee-item">
                              <span className="material-symbols-outlined text-warning">published_with_changes</span>
                              <span>7-Day Free Swap</span>
                            </div>
                          </div>

                          {/* Bottom Helpline & Actions */}
                          <div className="mt-auto pt-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div className="d-flex align-items-center gap-2 text-muted small">
                              <span className="material-symbols-outlined text-primary fs-6">call</span>
                              <span>Counter Desk: <strong>+91 94310 68033</strong></span>
                            </div>
                            <Link to="/contact" className="btn btn-primary btn-sm rounded-pill fw-bold d-inline-flex align-items-center gap-1.5 px-3 py-1.5 shadow-sm">
                              <span className="material-symbols-outlined fs-6">help</span>
                              <span>Check Kit Availability</span>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Right: Turnout Inspection & RFID */}
                      <div className="col-lg-6 col-12">
                        <div className="turnout-protocol-box h-100 d-flex flex-column">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center gap-2">
                              <span className="material-symbols-outlined text-success fs-5">fact_check</span>
                              <h6 className="fw-bold text-dark m-0">Morning Turnout &amp; RFID Badge Protocols</h6>
                            </div>
                            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2.5 py-1 small fw-bold">Mandatory</span>
                          </div>

                          {/* RFID Mockup Card */}
                          <div className="rfid-highlight-pill mb-3">
                            <div className="rfid-chip-icon-box">
                              <span className="material-symbols-outlined text-primary fs-3">badge</span>
                              <span className="rfid-wifi-pulse material-symbols-outlined">sensors</span>
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mb-1">
                                <strong className="text-dark" style={{ fontSize: '0.86rem' }}>Mandatory Smart RFID Student ID Card</strong>
                                <span className="badge bg-primary text-white" style={{ fontSize: '0.65rem' }}>Encrypted RFID</span>
                              </div>
                              <p className="small text-muted mb-2" style={{ lineHeight: '1.45', fontSize: '0.76rem' }}>
                                All students must wear the official RFID card on the royal blue monogrammed lanyard every day for biometric gate entry, automated SMS parent alerts, and library borrowing.
                              </p>
                              <div className="d-flex align-items-center gap-2 flex-wrap">
                                <span className="rfid-sub-spec">
                                  <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#2563eb' }}>sms</span>
                                  Instant Entry/Exit SMS
                                </span>
                                <span className="rfid-sub-spec">
                                  <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#2563eb' }}>lock</span>
                                  Anti-Tamper Chip
                                </span>
                                <span className="rfid-sub-spec">
                                  <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#2563eb' }}>local_library</span>
                                  Digital Library Pass
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Turnout Inspection Checklist */}
                          <div className="mb-3">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <label className="small fw-bold text-secondary text-uppercase m-0" style={{ letterSpacing: '0.4px', fontSize: '0.72rem' }}>
                                Weekly Assembly Turnout Inspection (4 Pillars):
                              </label>
                              <span className="small text-muted" style={{ fontSize: '0.72rem' }}>Conducted Mon &amp; Thu</span>
                            </div>

                            <div className="turnout-checklist-cards">
                              <div className="turnout-check-card">
                                <span className="material-symbols-outlined check-icon">check_circle</span>
                                <div>
                                  <strong className="d-block text-dark small">Immaculate Ironed Uniform</strong>
                                  <span className="text-muted" style={{ fontSize: '0.73rem' }}>Clean, pressed shirts with visible embroidered crest; no torn hems.</span>
                                </div>
                              </div>
                              <div className="turnout-check-card">
                                <span className="material-symbols-outlined check-icon">check_circle</span>
                                <div>
                                  <strong className="d-block text-dark small">Footwear &amp; Socks</strong>
                                  <span className="text-muted" style={{ fontSize: '0.73rem' }}>Mirror-polished black shoes / pristine white sneakers; correct socks.</span>
                                </div>
                              </div>
                              <div className="turnout-check-card">
                                <span className="material-symbols-outlined check-icon">check_circle</span>
                                <div>
                                  <strong className="d-block text-dark small">Personal Grooming</strong>
                                  <span className="text-muted" style={{ fontSize: '0.73rem' }}>Trimmed nails, neat crew cut (boys), double plaits with blue ribbons (girls).</span>
                                </div>
                              </div>
                              <div className="turnout-check-card">
                                <span className="material-symbols-outlined check-icon">check_circle</span>
                                <div>
                                  <strong className="d-block text-dark small">Complete Accessories</strong>
                                  <span className="text-muted" style={{ fontSize: '0.73rem' }}>Official school necktie, woven crest brass buckle belt, and ID card worn.</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Turnout Corrective Advisory Notice */}
                          <div className="turnout-advisory-note mt-auto pt-2">
                            <div className="d-flex align-items-center gap-2 p-2 rounded-3" style={{ background: '#fefce8', border: '1px solid #fef08a' }}>
                              <span className="material-symbols-outlined text-warning fs-5">info</span>
                              <div className="small text-dark" style={{ fontSize: '0.74rem', lineHeight: '1.4' }}>
                                <strong>Parent Partnership:</strong> First turnout default receives a gentle advisory note in the school diary. Repeated defaults require parental guidance to cultivate lifelong self-discipline.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

        {/* =========================================================================
            SECTION 6: VACATIONS & HOLIDAYS (FULL-WIDTH 12-COLUMN SECTION)
            ========================================================================= */}
        <section id="vacations" className="py-5 bg-white border-top">
          <div className="container">
            <div className="section-header-box mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="header-icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                  <span className="material-symbols-outlined">event_available</span>
                </div>
                  <div>
                    <h3 className="header-title">Upcoming Holidays &amp; Vacations</h3>
                    <p className="header-subtitle">
                      Annual academic session calendar and institutional holiday schedules.
                    </p>
                  </div>
                </div>
              </div>

              <div className="vacation-showcase-container">
                {/* Calendar Header Strip */}
                <div className="vacation-calendar-banner">
                  <div className="d-flex align-items-center gap-3">
                    <div className="vacation-banner-icon">
                      <span className="material-symbols-outlined fs-4">calendar_month</span>
                    </div>
                    <div>
                      <span className="vacation-banner-tag">OFFICIAL ACADEMIC SCHEDULE &bull; SESSION 2026–27</span>
                      <h5 className="vacation-banner-title mb-0">Major Institutional Vacations &amp; Recesses</h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="vacation-total-chip">
                      <span className="material-symbols-outlined fs-6 text-success">event_note</span>
                      <span><strong>51 Days</strong> Total Scheduled Recess</span>
                    </span>
                  </div>
                </div>

                {/* 4 Seasonal Vacation Cards */}
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
                              <h5 className="vacation-card-title mb-0">Durga Puja &amp; Dussehra Break</h5>
                            </div>
                          </div>
                          <span className="vacation-days-badge">7 Days</span>
                        </div>

                        <div className="vacation-date-box">
                          <div className="d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined text-danger fs-5">date_range</span>
                            <span className="vacation-date-text">16th Oct 2026 &ndash; 22nd Oct 2026</span>
                          </div>
                          <span className="vacation-status-pill">Vijayadashami</span>
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

                  {/* Card 3: Diwali & Chhath Puja */}
                  <div className="col-md-6 col-12">
                    <div className="vacation-card card-diwali">
                      <div>
                        <div className="vacation-card-top">
                          <div className="d-flex align-items-center gap-3">
                            <div className="vacation-icon-halo">
                              <span className="material-symbols-outlined fs-4">auto_awesome</span>
                            </div>
                            <div>
                              <span className="vacation-season-tag">FESTIVAL OF LIGHTS 2026</span>
                              <h5 className="vacation-card-title mb-0">Diwali &amp; Chhath Puja Holidays</h5>
                            </div>
                          </div>
                          <span className="vacation-days-badge">9 Days</span>
                        </div>

                        <div className="vacation-date-box">
                          <div className="d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined text-warning fs-5">date_range</span>
                            <span className="vacation-date-text">08th Nov 2026 &ndash; 16th Nov 2026</span>
                          </div>
                          <span className="vacation-status-pill">Chhath Mahaparv</span>
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

                  {/* Card 4: Winter Break */}
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
                              <h5 className="vacation-card-title mb-0">Winter Break &amp; New Year</h5>
                            </div>
                          </div>
                          <span className="vacation-days-badge">8 Days</span>
                        </div>

                        <div className="vacation-date-box">
                          <div className="d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined text-primary fs-5">date_range</span>
                            <span className="vacation-date-text">26th Dec 2026 &ndash; 02nd Jan 2027</span>
                          </div>
                          <span className="vacation-status-pill">New Year 2027</span>
                        </div>
                      </div>

                      <div className="vacation-card-footer">
                        <span className="vacation-reopen-note">
                          <span className="material-symbols-outlined fs-6 text-success">event_available</span>
                          Reopens: <strong>Mon, 04th Jan 2027</strong>
                        </span>
                        <span className="vacation-scope-tag">All Classes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calendar Notice */}
                <div className="vacation-calendar-note mt-3">
                  <span className="material-symbols-outlined text-primary fs-6" style={{ marginTop: '1px' }}>info</span>
                  <span>
                    Exact holiday commencement dates are subject to local district administration orders &amp; lunar calendar sightings. Official notifications will be broadcast via the school portal prior to each recess.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
