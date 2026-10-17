import React from 'react';
import { Link } from 'react-router-dom';
import { facultyMembers, schoolInfo } from '../data/content';

export default function About() {
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

            {/* Section 5: School Routine, Timing & Uniform */}
            <section id="timings" className="mb-5">
              <div className="section-header-box mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <h3 className="header-title">School Routine &amp; Dress Code</h3>
                    <p className="header-subtitle">
                      Daily bell timings, prayer assemblies, and comprehensive seasonal uniform guidelines.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6" id="routine">
                  <div className="m3-feature-box">
                    <div className="m3-feature-box-header m3-header-gold">
                      <span className="material-symbols-outlined text-warning fs-4">schedule</span>
                      <h5>Wing-Wise School Timings</h5>
                    </div>
                    <div className="m3-feature-box-body p-0">
                      <div className="table-responsive">
                        <table className="table table-sm table-striped mb-0" style={{ fontSize: '0.84rem' }}>
                          <thead className="table-light">
                            <tr>
                              <th className="ps-3 py-2">Wing / Section</th>
                              <th className="py-2 text-warning-emphasis">Summer</th>
                              <th className="py-2 pe-3 text-info-emphasis">Winter</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="ps-3 py-2 fw-semibold">Playgroup &amp; Nursery</td>
                              <td className="py-2">08:30 AM – 11:30 AM</td>
                              <td className="py-2 pe-3">09:00 AM – 12:00 PM</td>
                            </tr>
                            <tr>
                              <td className="ps-3 py-2 fw-semibold">LKG &amp; UKG (Kindergarten)</td>
                              <td className="py-2">08:00 AM – 12:30 PM</td>
                              <td className="py-2 pe-3">08:30 AM – 01:00 PM</td>
                            </tr>
                            <tr>
                              <td className="ps-3 py-2 fw-semibold">Primary &amp; Middle (Std I to VI)</td>
                              <td className="py-2">07:45 AM – 01:30 PM</td>
                              <td className="py-2 pe-3">08:15 AM – 02:00 PM</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center small text-muted">
                        <span><i className="fas fa-bell text-warning me-1"></i> Assembly: 15 mins daily</span>
                        <Link to="/student-corner#timings" className="text-primary fw-semibold text-decoration-none">
                          View Details &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6" id="uniform">
                  <div className="m3-feature-box">
                    <div className="m3-feature-box-header">
                      <span className="material-symbols-outlined text-primary fs-4">checkroom</span>
                      <h5>School Uniform Dress Code</h5>
                    </div>
                    <div className="m3-feature-box-body">
                      <div className="uniform-card-item">
                        <span className="uniform-day-tag">Mon, Tue, Thu, Fri</span>
                        <p className="uniform-desc">
                          Royal blue shorts / skirt, sky blue shirt with school logo, school tie &amp; woven belt, black shoes.
                        </p>
                      </div>
                      <div className="uniform-card-item">
                        <span className="uniform-day-tag" style={{ background: '#ecfdf5', color: '#047857' }}>Wednesday &amp; Saturday (Sports)</span>
                        <p className="uniform-desc">
                          White track pant, school sports house t-shirt, white socks and clean white canvas sneakers.
                        </p>
                      </div>
                      <div className="uniform-card-item">
                        <span className="uniform-day-tag" style={{ background: '#fef2f2', color: '#b91c1c' }}>Winter Season</span>
                        <p className="uniform-desc">
                          Navy blue V-neck pullover or school blazer with embossed crest badge, warm navy blue tights/slacks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Vacations & Holidays */}
            <section id="vacations">
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
            </section>
          </div>

          {/* Right Sidebar Column */}
          <div className="col-lg-4">
            {/* Quick Stat Card */}
            <div className="modern-sidebar-card mb-4" id="statistics">
              <div className="modern-sidebar-header">
                <div className="modern-sidebar-title">
                  <span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>analytics</span>
                  Key Statistics
                </div>
                <span className="modern-sidebar-badge">Verified</span>
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
                    <span className="material-symbols-outlined fs-6 text-info">yard</span>
                    Campus Area
                  </span>
                  <span className="stat-row-value">Eco-Friendly &amp; Safe</span>
                </div>
                <div className="modern-stat-row">
                  <span className="stat-row-label">
                    <span className="material-symbols-outlined fs-6 text-danger">devices</span>
                    Smart Classrooms
                  </span>
                  <span className="stat-row-value">20+ Digital Rooms</span>
                </div>
                <div className="modern-stat-row">
                  <span className="stat-row-label">
                    <span className="material-symbols-outlined fs-6 text-secondary">directions_bus</span>
                    Transport Fleet
                  </span>
                  <span className="stat-row-value">10+ GPS Buses</span>
                </div>
              </div>
            </div>

            {/* Quick Admission CTA */}
            <div className="card shadow-sm border-0 rounded-3 mb-4 overflow-hidden bg-light border">
              <div className="card-body p-4 text-center">
                <i className="fas fa-user-graduate fa-3x text-primary mb-3"></i>
                <h5 className="fw-bold text-dark">Admissions Open 2026-27</h5>
                <p className="small text-muted mb-4">
                  Enroll your toddler in Playgroup, Nursery, LKG, UKG or Primary classes for a bright future.
                </p>
                <Link to="/admission" className="btn btn-warning w-100 fw-bold py-2 mb-2">
                  <i className="fas fa-edit me-1"></i> Apply Online Now
                </Link>
                <Link to="/contact" className="btn btn-outline-primary w-100 fw-bold py-2 small">
                  <i className="fas fa-phone-alt me-1"></i> Contact Admission Desk
                </Link>
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
  );
}
