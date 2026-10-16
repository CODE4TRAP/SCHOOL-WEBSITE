import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewsTicker from '../components/NewsTicker';
import NoticeBoard from '../components/NoticeBoard';
import { useModal } from '../context/ModalContext';
import {
  quickLinks,
  insideSchoolTabs,
  facultyMembers,
  galleryPhotos,
  schoolInfo
} from '../data/content';

export default function Home() {
  const { openMessage, openLightbox, openPortal } = useModal();
  const [activeTab, setActiveTab] = useState('events');

  const handleReadMoreAbout = () => {
    openMessage(
      'About Our School',
      'Swami Shiwanand Academy & Kid\'s Play School',
      `<p>Swami Shiwanand Academy &amp; Kid's Play School is committed to creating a nurturing and joyful environment where children blossom naturally. Rooted in traditional values and blended with 21st-century modern teaching methods, our curriculum stimulates creative thinking, motor skills, sensory discovery, and emotional resilience.</p>
       <p>Our infrastructure includes air-conditioned audio-visual classrooms, a child-friendly indoor play station, safety-compliant swings, purified drinking water, and round-the-clock CCTV surveillance to ensure utmost safety.</p>`
    );
  };

  const handleReadMorePrincipal = () => {
    openMessage(
      "Principal's Message",
      'From the Desk of the Principal',
      `<p>Dear Parents &amp; Guardians,<br><br>Childhood is the most precious phase of life where curiosity, imagination, and foundational habits take shape. At Swami Shiwanand Academy &amp; Kid's Play School, we believe that education is not merely rote memorization, but the joyful awakening of a child's inner potential.</p>
       <p>Our dedicated team of trained educators treats every child with affectionate care, encouraging them to ask questions, explore nature, express their artistic talents, and cultivate respect for elders and society. We welcome you to be a part of our warm school family.</p>`
    );
  };

  return (
    <div>
      {/* Breaking News Ticker */}
      <NewsTicker />

      {/* Main Front Banner & M3 Hero Showcase */}
      <section className="m3-hero-section py-4">
        <div className="container">
          <div className="m3-hero-card p-4 p-md-5 mb-4">
            <div className="row align-items-center g-4">
              <div className="col-lg-6 col-12">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="m3-badge m3-badge-tonal">
                    <span className="material-symbols-outlined fs-6">auto_awesome</span>
                    Admissions Open 2026–27
                  </span>
                  <span className="m3-badge m3-badge-amber">
                    <span className="material-symbols-outlined fs-6">verified</span>
                    Playgroup to Class V
                  </span>
                </div>
                <h1 className="m3-hero-heading mb-3">
                  Nurturing Little Minds With <span className="text-primary">Values &amp; Wisdom</span>
                </h1>
                <p className="m3-hero-desc mb-4">
                  Welcome to Swami Shiwanand Academy &amp; Kid's Play School — where joyful play-based exploration meets holistic cognitive development in a caring, technology-enabled environment in Sasaram.
                </p>
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <Link to="/admission" className="m3-btn m3-btn-filled">
                    <span className="material-symbols-outlined">how_to_reg</span>
                    <span>Apply for Admission</span>
                  </Link>
                  <Link to="/admission#fee-structure" className="m3-btn m3-btn-tonal">
                    <span className="material-symbols-outlined">calculate</span>
                    <span>Fee Calculator</span>
                  </Link>
                  <Link to="/facilities" className="m3-btn m3-btn-outlined">
                    <span className="material-symbols-outlined">apartment</span>
                    <span>Campus Tour</span>
                  </Link>
                </div>
              </div>

              {/* Hero Banner Showcase Frame */}
              <div className="col-lg-6 col-12">
                <div className="m3-banner-frame">
                  <img
                    src="/images/front_banner.jpg"
                    alt="Swami Shiwanand Academy Campus Banner"
                    className="m3-banner-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── High-Priority Quick Services & Action Deck ─── */}
      <section className="home-quick-actions-section pb-4">
        <div className="container">
          <div className="row g-3">
            {/* Card 1: Apply Online */}
            <div className="col-lg-3 col-sm-6 col-12">
              <Link to="/admission" className="home-quick-card home-card-blue">
                <div>
                  <div className="home-quick-icon-wrap">
                    <span className="material-symbols-outlined">how_to_reg</span>
                  </div>
                  <div className="home-quick-content">
                    <span className="home-quick-badge">ADMISSION 2026–27</span>
                    <h5 className="home-quick-title">Apply Online</h5>
                    <p className="home-quick-desc">
                      Admissions open for Playgroup to Class V. Instant online registration.
                    </p>
                  </div>
                </div>
                <div className="home-quick-footer">
                  <span>Register Student</span>
                  <span className="material-symbols-outlined fs-6">arrow_forward</span>
                </div>
              </Link>
            </div>

            {/* Card 2: Pay Fee */}
            <div className="col-lg-3 col-sm-6 col-12">
              <Link to="/admission#fee-payment" className="home-quick-card home-card-emerald">
                <div>
                  <div className="home-quick-icon-wrap">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div className="home-quick-content">
                    <span className="home-quick-badge">SAFE &amp; INSTANT</span>
                    <h5 className="home-quick-title">Pay School Fee</h5>
                    <p className="home-quick-desc">
                      Pay tuition &amp; term fees securely online via UPI, Debit Card or NetBanking.
                    </p>
                  </div>
                </div>
                <div className="home-quick-footer">
                  <span>Fee Payment Portal</span>
                  <span className="material-symbols-outlined fs-6">arrow_forward</span>
                </div>
              </Link>
            </div>

            {/* Card 3: Contact & Campus Visit */}
            <div className="col-lg-3 col-sm-6 col-12">
              <Link to="/contact" className="home-quick-card home-card-amber">
                <div>
                  <div className="home-quick-icon-wrap">
                    <span className="material-symbols-outlined">contact_support</span>
                  </div>
                  <div className="home-quick-content">
                    <span className="home-quick-badge">CAMPUS DESK</span>
                    <h5 className="home-quick-title">Contact &amp; Visit</h5>
                    <p className="home-quick-desc">
                      Schedule a campus visit, talk to counselors, or view GPS directions.
                    </p>
                  </div>
                </div>
                <div className="home-quick-footer">
                  <span>Get in Touch</span>
                  <span className="material-symbols-outlined fs-6">arrow_forward</span>
                </div>
              </Link>
            </div>

            {/* Card 4: Student Corner */}
            <div className="col-lg-3 col-sm-6 col-12">
              <Link to="/student-corner" className="home-quick-card home-card-violet">
                <div>
                  <div className="home-quick-icon-wrap">
                    <span className="material-symbols-outlined">sentiment_satisfied</span>
                  </div>
                  <div className="home-quick-content">
                    <span className="home-quick-badge">STUDENT LIFE</span>
                    <h5 className="home-quick-title">Student Corner</h5>
                    <p className="home-quick-desc">
                      Daily bell timings, seasonal dress code, prayer assembly &amp; holiday lists.
                    </p>
                  </div>
                </div>
                <div className="home-quick-footer">
                  <span>Explore Corner</span>
                  <span className="material-symbols-outlined fs-6">arrow_forward</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Board & Quick Admission Overview */}
      <section className="main-content-section" id="noticeBoardSection">
        <div className="container">
          <div className="row g-4">
            {/* Left Column: Notice Board */}
            <div className="col-lg-8 col-md-12">
              <NoticeBoard />
            </div>

            {/* Right Column: Quick Admission Card */}
            <div className="col-lg-4 col-md-12">
              <div
                className="m3-card h-100 p-0"
                style={{
                  background: 'var(--md-surface)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  className="p-3 d-flex align-items-center justify-content-between"
                  style={{ background: 'var(--md-primary-container)', borderBottom: '1px solid var(--md-outline-variant)' }}
                >
                  <h4 className="mb-0 fw-bold fs-5 text-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined">school</span> Admissions 2026–27
                  </h4>
                  <span className="m3-badge m3-badge-amber">Open</span>
                </div>
                <div className="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <span
                      className="m3-badge mb-2 px-3 py-1 fw-bold"
                      style={{ background: '#ffdad6', color: '#ba1a1a', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                    >
                      <span className="material-symbols-outlined fs-6">priority_high</span> Limited Seats Available
                    </span>
                    <h5 className="fw-bold text-primary mb-2">Give Your Child The Best Foundation!</h5>
                    <p className="text-muted small mb-3">
                      Swami Shiwanand Academy provides a joyful, caring, and vibrant learning atmosphere designed for early childhood cognitive and social growth.
                    </p>

                    <div className="p-3 mb-3 border rounded-3" style={{ background: 'var(--md-surface-container-low)' }}>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="fw-bold small text-dark d-flex align-items-center gap-1">
                          <span className="material-symbols-outlined fs-6 text-success">check_circle</span> Playgroup &amp; Nursery
                        </span>
                        <span className="m3-badge m3-badge-tonal">
                          2+ to 3+ yrs
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="fw-bold small text-dark d-flex align-items-center gap-1">
                          <span className="material-symbols-outlined fs-6 text-success">check_circle</span> LKG &amp; UKG
                        </span>
                        <span className="m3-badge m3-badge-tonal">
                          4+ to 5+ yrs
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="fw-bold small text-dark d-flex align-items-center gap-1">
                          <span className="material-symbols-outlined fs-6 text-success">check_circle</span> Primary Std I to V
                        </span>
                        <span className="m3-badge m3-badge-tonal">
                          6+ to 10+ yrs
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column gap-2 mt-3">
                    <Link
                      to="/admission"
                      className="m3-btn m3-btn-filled w-100"
                    >
                      <span className="material-symbols-outlined">send</span> Apply For Admission Online
                    </Link>
                    <Link
                      to="/admission#fee-structure"
                      className="m3-btn m3-btn-outlined w-100"
                    >
                      <span className="material-symbols-outlined">payments</span> View Fee Structure (2026-27)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Icons Row Panel */}
      <section id="notificationPanel" className="py-4">
        <div className="container">
          <div className="section-header-box mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="header-icon-box" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}>
                <span className="material-symbols-outlined">explore</span>
              </div>
              <div>
                <h3 className="header-title">Quick Portals &amp; Services</h3>
                <p className="header-subtitle">
                  Direct access to curriculum, rules, bus routes, gallery, and parent inquiry desk.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-3 justify-content-center">
            {quickLinks.map((item) => (
              <div key={item.id} className="col-lg col-md-4 col-6">
                <Link to={item.link} className="text-decoration-none d-block h-100">
                  <div className="quick-icon-card">
                    <div className="quick-icon-wrap">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="quick-icon-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="quick-icon-fallback" style={{ display: 'none' }}>
                        <span className="material-symbols-outlined fs-2 text-primary">stars</span>
                      </div>
                    </div>
                    <h4 className="quick-icon-title">{item.title}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Messages Section: About, Principal, Management */}
      <section id="messages">
        <div className="container">
          <div className="section-header-box mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <div>
                <h3 className="header-title">School Leadership &amp; Philosophy</h3>
                <p className="header-subtitle">
                  Foundational vision, inspiring messages from our leadership, and the latest institutional announcements.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Card 1: About Our School */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="leadership-showcase-card card-blue">
                <div>
                  <div className="leadership-card-header">
                    <div className="leadership-header-left">
                      <div className="leadership-icon-halo halo-blue">
                        <span className="material-symbols-outlined fs-5">school</span>
                      </div>
                      <div>
                        <span className="leadership-category-tag">Foundation &amp; Vision</span>
                        <h3 className="leadership-card-title">About Our School</h3>
                      </div>
                    </div>
                    <span className="leadership-header-badge">ESTD. 2009</span>
                  </div>

                  <div className="leadership-img-frame">
                    <img
                      src="/images/about_school.jpg"
                      alt="Swami Shiwanand Academy Campus"
                    />
                    <span className="leadership-img-pill">
                      <span className="material-symbols-outlined fs-6 text-success">park</span>
                      <span>Smart Green Campus</span>
                    </span>
                  </div>

                  <div className="leadership-card-body pb-0">
                    <p className="leadership-body-text">
                      Swami Shiwanand Academy &amp; Kid's Play School was founded with an inspired vision to provide cheerful, value-based foundation education to young learners. Set amidst a lush green, secure campus aloof from urban hustle, our school offers cheerful activity zones, colorful digital smart classrooms, a discovery science lab, and interactive programs.
                    </p>
                    <div className="leadership-tags-row">
                      <span className="leadership-tag-chip">Smart Classrooms</span>
                      <span className="leadership-tag-chip">Activity Labs</span>
                      <span className="leadership-tag-chip">CCTV Secured</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 pt-0">
                  <button onClick={handleReadMoreAbout} className="leadership-read-btn">
                    <span>Read Full Vision</span>
                    <span className="material-symbols-outlined fs-6">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Principal's Message */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="leadership-showcase-card card-amber">
                <div>
                  <div className="leadership-card-header">
                    <div className="leadership-header-left">
                      <div className="leadership-icon-halo halo-amber">
                        <span className="material-symbols-outlined fs-5">account_circle</span>
                      </div>
                      <div>
                        <span className="leadership-category-tag" style={{ color: '#d97706' }}>Leadership Desk</span>
                        <h3 className="leadership-card-title">Principal's Message</h3>
                      </div>
                    </div>
                    <span className="leadership-header-badge" style={{ color: '#d97706', borderColor: 'rgba(245, 158, 11, 0.3)' }}>LEADERSHIP</span>
                  </div>

                  <div className="leadership-img-frame">
                    <img
                      src="/images/principal.jpg"
                      alt="Principal Swami Shiwanand Academy"
                    />
                    <span className="leadership-img-pill">
                      <span className="material-symbols-outlined fs-6 text-warning">workspace_premium</span>
                      <span>Deepak Kumar • Principal</span>
                    </span>
                  </div>

                  <div className="leadership-card-body pb-0">
                    <div className="leadership-quote-box">
                      "Education is a shared commitment between dedicated teachers, motivated students, and enthusiastic parents with high expectations. We look forward to working closely with every family to make this early learning experience joyful, holistic, and enriching."
                    </div>
                    <div className="leadership-tags-row">
                      <span className="leadership-tag-chip">Value-Based Pedagogy</span>
                      <span className="leadership-tag-chip">Holistic Growth</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 pt-0">
                  <button onClick={handleReadMorePrincipal} className="leadership-read-btn" style={{ color: '#d97706', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                    <span>Read Principal's Note</span>
                    <span className="material-symbols-outlined fs-6">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Important Message by Management (Material 3 Bulletin) */}
            <div className="col-lg-4 col-md-12 col-12">
              <div className="leadership-showcase-card card-bulletin">
                <div>
                  <div className="bulletin-header">
                    <div className="d-flex align-items-center gap-2">
                      <div className="leadership-icon-halo halo-gold">
                        <span className="material-symbols-outlined fs-5">campaign</span>
                      </div>
                      <div>
                        <span className="leadership-category-tag" style={{ color: '#fbbf24' }}>Institutional Circulars</span>
                        <h3 className="leadership-card-title text-white">Bulletin Board</h3>
                      </div>
                    </div>
                    <span className="bulletin-live-pill">
                      <span className="bulletin-pulse-dot"></span>
                      LIVE
                    </span>
                  </div>

                  <div className="p-3 pb-0">
                    {/* Institutional Trust Board Badge */}
                    <div className="bulletin-trust-banner">
                      <span className="material-symbols-outlined text-warning fs-3">shield</span>
                      <div>
                        <div className="fw-bold text-white small" style={{ letterSpacing: '0.2px' }}>Deepkiran Educational Trust</div>
                        <div className="text-white-50" style={{ fontSize: '0.72rem' }}>Administrative &amp; Board of Governors</div>
                      </div>
                    </div>

                    {/* High Contrast Clear Announcements */}
                    <div className="bulletin-feed-list">
                      <div className="bulletin-item-card" style={{ borderLeftColor: '#38bdf8' }}>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="bulletin-item-tag text-info">OLYMPIAD 2026</span>
                          <span className="bulletin-item-date">
                            <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>schedule</span> Oct 2026
                          </span>
                        </div>
                        <p className="bulletin-item-desc">
                          Kids Talent Hunt &amp; Foundation Olympiad registration open for Session 2026–27.
                        </p>
                      </div>

                      <div className="bulletin-item-card" style={{ borderLeftColor: '#f59e0b' }}>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="bulletin-item-tag text-warning">WORKSHOP</span>
                          <span className="bulletin-item-date">
                            <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>schedule</span> This Saturday
                          </span>
                        </div>
                        <p className="bulletin-item-desc">
                          Positive Early Parenting seminar at 10 AM in the school auditorium.
                        </p>
                      </div>

                      <div className="bulletin-item-card" style={{ borderLeftColor: '#34d399' }}>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="bulletin-item-tag text-success">ADMISSIONS</span>
                          <span className="bulletin-item-date">
                            <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>schedule</span> Open Now
                          </span>
                        </div>
                        <p className="bulletin-item-desc">
                          Playgroup to Std V registration counseling active at administrative desk.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 pt-0">
                  <button
                    onClick={() => openPortal('Online School Management (OSM) Portal', '2026–27')}
                    className="bulletin-portal-btn"
                  >
                    <span className="material-symbols-outlined fs-5">lock_open</span>
                    <span>Access OSM Portal Login</span>
                    <span className="badge bg-warning text-dark px-2 py-1 ms-2" style={{ fontSize: '10px' }}>Coming Soon</span>
                    <span className="material-symbols-outlined fs-6 ms-auto">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inside School Tabbed Section */}
      <section id="insideSchool">
        <div className="container">
          {/* Inside School Header in Dedicated Box */}
          <div className="section-header-box mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="header-icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                <span className="material-symbols-outlined">school</span>
              </div>
              <div>
                <h3 className="header-title">Inside School</h3>
                <p className="header-subtitle">
                  Academic milestones, cultural achievements, and student growth programs.
                </p>
              </div>
            </div>
          </div>

          <div className="tab-nav-wrapper">
            <button
              className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <i className="fas fa-calendar-alt"></i> Events
            </button>
            <button
              className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              <i className="fas fa-trophy"></i> Achievements
            </button>
            <button
              className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
              onClick={() => setActiveTab('social')}
            >
              <i className="fas fa-seedling"></i> Social Awareness
            </button>
          </div>

          <div className="row g-4">
            {insideSchoolTabs[activeTab].map((item) => (
              <div key={item.id} className="col-md-4 col-12">
                <div className="event-card">
                  <img src={item.img} alt={item.title} />
                  <div className="event-card-body">
                    <h4 className="event-card-title">{item.title}</h4>
                    <p className="event-card-desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Esteemed Faculty Section */}
      <section id="teachersSection">
        <div className="container">
          {/* Faculty Header in Dedicated Box */}
          <div className="section-header-box">
            <div className="d-flex align-items-center gap-3">
              <div className="header-icon-box" style={{ background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-primary)' }}>
                <span className="material-symbols-outlined">co_present</span>
              </div>
              <div>
                <h3 className="header-title">Our Esteemed Faculty</h3>
                <p className="header-subtitle">
                  Meet our dedicated permanent teachers and mentors shaping the future of young learners with affection, values, and modern pedagogy.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {facultyMembers.slice(0, 3).map((teacher) => (
              <div key={teacher.id} className="col-md-4 col-12">
                <div className="teacher-card">
                  <div className="teacher-img-wrap">
                    <img src={teacher.img} alt={teacher.name} className="teacher-img" />
                    <span className="teacher-role-badge">{teacher.role}</span>
                  </div>
                  <div className="teacher-body">
                    <div>
                      <h5 className="teacher-name">{teacher.name}</h5>
                      <p className="teacher-qualification">
                        <i className="fas fa-graduation-cap me-1"></i> {teacher.qualification}
                      </p>
                      <p className="teacher-quote">"{teacher.quote}"</p>
                    </div>
                    <div className="mt-3 pt-2 border-top">
                      <span className="badge bg-light text-primary border px-3 py-1.5" style={{ borderRadius: '20px', fontSize: '0.8rem' }}>
                        {teacher.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid Preview with Lightbox */}
      <section id="gallerySection">
        <div className="container">
          {/* Photo Gallery Header in Dedicated Box */}
          <div className="section-header-box">
            <div className="d-flex align-items-center gap-3">
              <div className="header-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                <span className="material-symbols-outlined">photo_camera</span>
              </div>
              <div>
                <h3 className="header-title">Photo Gallery</h3>
                <p className="header-subtitle">
                  A Glimpse of Joyful Moments, Learning Activities &amp; Celebrations
                </p>
              </div>
            </div>
            <div>
              <Link to="/gallery" className="m3-btn m3-btn-filled px-4">
                <span>View All Photos</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="gallery-grid">
            {galleryPhotos.slice(0, 6).map((photo) => (
              <div
                key={photo.id}
                className="gallery-item"
                onClick={() => openLightbox(photo.img, photo.title)}
              >
                <img src={photo.img} alt={photo.title} />
                <div className="gallery-overlay">
                  <h5>{photo.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Stats Counter Strip in Separate Boxes */}
      <section className="stats-counter-strip">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="stat-box">
                <div className="stat-icon-box">
                  <span className="material-symbols-outlined fs-2">child_care</span>
                </div>
                <div className="stat-number">500+</div>
                <div className="stat-label">Happy Young Learners</div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="stat-box">
                <div className="stat-icon-box">
                  <span className="material-symbols-outlined fs-2">cast_for_education</span>
                </div>
                <div className="stat-number">35+</div>
                <div className="stat-label">Trained &amp; Caring Teachers</div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="stat-box">
                <div className="stat-icon-box">
                  <span className="material-symbols-outlined fs-2">smart_display</span>
                </div>
                <div className="stat-number">20+</div>
                <div className="stat-label">Smart Digital Classrooms</div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="stat-box">
                <div className="stat-icon-box">
                  <span className="material-symbols-outlined fs-2">directions_bus</span>
                </div>
                <div className="stat-number">10+</div>
                <div className="stat-label">Safe GPS Vehicle Routes</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
