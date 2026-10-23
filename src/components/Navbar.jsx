import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { schoolInfo } from '../data/content';

export default function Navbar() {
  const { mobileDrawerOpen, closeMobileDrawer, toggleMobileDrawer } = useModal();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDrawerAccordion, setOpenDrawerAccordion] = useState(null);
  const location = useLocation();

  // Close drawer and accordions on location change
  useEffect(() => {
    closeMobileDrawer();
    setOpenDrawerAccordion(null);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const toggleAccordion = (name) => {
    setOpenDrawerAccordion(prev => prev === name ? null : name);
  };

  return (
    <>
      {/* ========================================================
          DESKTOP STICKY NAVBAR (min-width: 992px)
          ======================================================== */}
      <nav className="m3-nav-bar d-none d-lg-block">
        <div className="container">
          <ul className="m3-nav-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `m3-nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">home</span>
                <span>Home</span>
              </NavLink>
            </li>

            {/* ABOUT US */}
            <li className="m3-dropdown-wrapper">
              <button
                type="button"
                onClick={() => toggleDropdown('about')}
                className={`m3-nav-link ${location.pathname.startsWith('/about') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">info</span>
                <span>About Us</span>
                <span className="material-symbols-outlined dropdown-arrow">expand_more</span>
              </button>
              <ul className={`m3-dropdown-menu ${openDropdown === 'about' ? 'show' : ''}`}>
                <li><Link to="/about" onClick={() => setOpenDropdown(null)}>About School &amp; Heritage</Link></li>
                <li><Link to="/about#principal-message" onClick={() => setOpenDropdown(null)}>Principal’s Message</Link></li>
                <li><Link to="/about#aims" onClick={() => setOpenDropdown(null)}>Aims &amp; Objectives</Link></li>
                <li><Link to="/about#perspective" onClick={() => setOpenDropdown(null)}>Education Perspective</Link></li>
                <li><Link to="/about#society" onClick={() => setOpenDropdown(null)}>Management Trust</Link></li>
                <li><Link to="/about#statistics" onClick={() => setOpenDropdown(null)}>Key Statistics</Link></li>
              </ul>
            </li>

            {/* GENERAL INFORMATION */}
            <li className="m3-dropdown-wrapper">
              <button
                type="button"
                onClick={() => toggleDropdown('general')}
                className={`m3-nav-link ${location.pathname.startsWith('/mandatory-disclosure') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">verified_user</span>
                <span>General Info</span>
                <span className="material-symbols-outlined dropdown-arrow">expand_more</span>
              </button>
              <ul className={`m3-dropdown-menu ${openDropdown === 'general' ? 'show' : ''}`}>
                <li><Link to="/mandatory-disclosure" onClick={() => setOpenDropdown(null)}>Affiliation Status</Link></li>
                <li><Link to="/mandatory-disclosure" onClick={() => setOpenDropdown(null)}>Mandatory Public Disclosure</Link></li>
                <li><Link to="/mandatory-disclosure#managing-committee" onClick={() => setOpenDropdown(null)}>Managing Committee</Link></li>
                <li><Link to="/mandatory-disclosure#noc" onClick={() => setOpenDropdown(null)}>NOC &amp; Recognition Letters</Link></li>
              </ul>
            </li>

            {/* ADMISSION */}
            <li className="m3-dropdown-wrapper">
              <button
                type="button"
                onClick={() => toggleDropdown('admission')}
                className={`m3-nav-link ${location.pathname.startsWith('/admission') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">assignment</span>
                <span>Admission</span>
                <span className="material-symbols-outlined dropdown-arrow">expand_more</span>
              </button>
              <ul className={`m3-dropdown-menu ${openDropdown === 'admission' ? 'show' : ''}`}>
                <li><Link to="/admission" onClick={() => setOpenDropdown(null)}>New Admission 2026–27</Link></li>
                <li><Link to="/admission#form" onClick={() => setOpenDropdown(null)}>Online Admission Form</Link></li>
                <li><Link to="/admission#fee-structure" onClick={() => setOpenDropdown(null)}>Fee Structure &amp; Calculator</Link></li>
                <li><Link to="/admission#guidelines" onClick={() => setOpenDropdown(null)}>Age Criteria &amp; Rules</Link></li>
                <li><Link to="/admission#fee-payment" onClick={() => setOpenDropdown(null)}>Online Fee Payment</Link></li>
              </ul>
            </li>

            {/* STUDENT CORNER */}
            <li className="m3-dropdown-wrapper">
              <button
                type="button"
                onClick={() => toggleDropdown('student')}
                className={`m3-nav-link ${location.pathname.startsWith('/student') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">sentiment_satisfied</span>
                <span>Student Corner</span>
                <span className="material-symbols-outlined dropdown-arrow">expand_more</span>
              </button>
              <ul className={`m3-dropdown-menu ${openDropdown === 'student' ? 'show' : ''}`}>
                <li><Link to="/student-corner#timings" onClick={() => setOpenDropdown(null)}>School Timing &amp; Routine</Link></li>
                <li><Link to="/student-corner#uniform" onClick={() => setOpenDropdown(null)}>School Uniform Guide</Link></li>
                <li><Link to="/student-corner#moral" onClick={() => setOpenDropdown(null)}>Assembly &amp; Moral Education</Link></li>
                <li><Link to="/student-corner#guidelines-students" onClick={() => setOpenDropdown(null)}>Guidelines For Students</Link></li>
                <li><Link to="/student-corner#attendance" onClick={() => setOpenDropdown(null)}>Attendance &amp; Leave Rules</Link></li>
                <li><Link to="/student-corner#cca-calendar" onClick={() => setOpenDropdown(null)}>CCA Calendar 2026–27</Link></li>
                <li><Link to="/student-corner#vacations" onClick={() => setOpenDropdown(null)}>Vacations &amp; Holidays</Link></li>
              </ul>
            </li>

            {/* FACILITIES */}
            <li className="m3-dropdown-wrapper">
              <button
                type="button"
                onClick={() => toggleDropdown('facilities')}
                className={`m3-nav-link ${location.pathname.startsWith('/facilities') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">apartment</span>
                <span>Facilities</span>
                <span className="material-symbols-outlined dropdown-arrow">expand_more</span>
              </button>
              <ul className={`m3-dropdown-menu ${openDropdown === 'facilities' ? 'show' : ''}`}>
                <li><Link to="/facilities#smart-classes" onClick={() => setOpenDropdown(null)}>Smart Digital Classrooms</Link></li>
                <li><Link to="/facilities#play-area" onClick={() => setOpenDropdown(null)}>Montessori Play Activity Zone</Link></li>
                <li><Link to="/facilities#science-lab" onClick={() => setOpenDropdown(null)}>Discovery &amp; Science Corner</Link></li>
                <li><Link to="/facilities#computer-lab" onClick={() => setOpenDropdown(null)}>Kids Computer Lab</Link></li>
                <li><Link to="/facilities#transport" onClick={() => setOpenDropdown(null)}>School Transport &amp; GPS</Link></li>
                <li><Link to="/facilities#safety" onClick={() => setOpenDropdown(null)}>Safety &amp; CCTV Monitoring</Link></li>
              </ul>
            </li>

            {/* GALLERY */}
            <li>
              <NavLink
                to="/gallery"
                className={({ isActive }) => `m3-nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">photo_library</span>
                <span>Gallery</span>
              </NavLink>
            </li>

            {/* CONTACT US */}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `m3-nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">call</span>
                <span>Contact</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* ========================================================
          MOBILE NAVIGATION DRAWER & BACKDROP OVERLAY
          ======================================================== */}
      <div
        className={`m3-mobile-drawer-overlay ${mobileDrawerOpen ? 'is-visible' : ''}`}
        onClick={closeMobileDrawer}
        aria-hidden="true"
      />

      <aside
        className={`m3-mobile-drawer ${mobileDrawerOpen ? 'is-open' : ''}`}
        aria-label="Mobile Navigation Menu"
        aria-hidden={!mobileDrawerOpen}
      >
        {/* Drawer Header with School Identity */}
        <div className="m3-drawer-header">
          <div className="m3-drawer-brand">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="m3-drawer-logo"
            />
            <div className="m3-drawer-brand-text">
              <div className="m3-drawer-title-main">Swami Shiwanand Academy</div>
              <div className="m3-drawer-title-sub">Kid's Play School &bull; Estd. {schoolInfo.estd}</div>
            </div>
          </div>
          <button
            type="button"
            className="m3-drawer-close-btn"
            onClick={closeMobileDrawer}
            aria-label="Close navigation menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Quick Action Badges Strip */}
        <div className="m3-drawer-quick-actions">
          <Link
            to="/admission"
            onClick={closeMobileDrawer}
            className="m3-drawer-action-btn action-apply"
          >
            <span className="material-symbols-outlined">edit_document</span>
            <span>Admissions 2026–27</span>
          </Link>

          <a
            href={`tel:${schoolInfo.phones[0]}`}
            className="m3-drawer-action-btn action-call"
            title="Call Helpline"
          >
            <span className="material-symbols-outlined">call</span>
            <span>Helpline</span>
          </a>

          <a
            href={`https://wa.me/${schoolInfo.whatsappNumber}?text=Hello%20Swami%20Shiwanand%20Academy,%20I%20want%20to%20inquire%20about%20admission`}
            target="_blank"
            rel="noreferrer"
            className="m3-drawer-action-btn action-whatsapp"
            title="WhatsApp Desk"
          >
            <i className="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Drawer Navigation List with Accordions */}
        <div className="m3-drawer-content">
          <div className="m3-drawer-nav-group">
            <div className="m3-drawer-group-label">EXPLORE SCHOOL</div>

            {/* HOME */}
            <NavLink
              to="/"
              onClick={closeMobileDrawer}
              end
              className={({ isActive }) => `m3-drawer-link ${isActive ? 'active' : ''}`}
            >
              <div className="m3-drawer-link-left">
                <span className="material-symbols-outlined drawer-link-icon">home</span>
                <span className="drawer-link-text">Home</span>
              </div>
              <span className="material-symbols-outlined drawer-link-arrow">chevron_right</span>
            </NavLink>

            {/* ABOUT US ACCORDION */}
            <div className="m3-drawer-accordion-item">
              <button
                type="button"
                className={`m3-drawer-link accordion-toggle ${location.pathname.startsWith('/about') ? 'active-parent' : ''}`}
                onClick={() => toggleAccordion('about')}
                aria-expanded={openDrawerAccordion === 'about'}
              >
                <div className="m3-drawer-link-left">
                  <span className="material-symbols-outlined drawer-link-icon">info</span>
                  <span className="drawer-link-text">About Us</span>
                </div>
                <span className={`material-symbols-outlined drawer-chevron ${openDrawerAccordion === 'about' ? 'rotate' : ''}`}>
                  expand_more
                </span>
              </button>
              {openDrawerAccordion === 'about' && (
                <div className="m3-drawer-sublinks">
                  <Link to="/about" onClick={closeMobileDrawer}>About School &amp; Heritage</Link>
                  <Link to="/about#principal-message" onClick={closeMobileDrawer}>Principal’s Message</Link>
                  <Link to="/about#aims" onClick={closeMobileDrawer}>Aims &amp; Objectives</Link>
                  <Link to="/about#perspective" onClick={closeMobileDrawer}>Education Perspective</Link>
                  <Link to="/about#society" onClick={closeMobileDrawer}>Management Trust</Link>
                  <Link to="/about#statistics" onClick={closeMobileDrawer}>Key Statistics</Link>
                </div>
              )}
            </div>

            {/* GENERAL INFO ACCORDION */}
            <div className="m3-drawer-accordion-item">
              <button
                type="button"
                className={`m3-drawer-link accordion-toggle ${location.pathname.startsWith('/mandatory-disclosure') ? 'active-parent' : ''}`}
                onClick={() => toggleAccordion('general')}
                aria-expanded={openDrawerAccordion === 'general'}
              >
                <div className="m3-drawer-link-left">
                  <span className="material-symbols-outlined drawer-link-icon">verified_user</span>
                  <span className="drawer-link-text">General Info</span>
                </div>
                <span className={`material-symbols-outlined drawer-chevron ${openDrawerAccordion === 'general' ? 'rotate' : ''}`}>
                  expand_more
                </span>
              </button>
              {openDrawerAccordion === 'general' && (
                <div className="m3-drawer-sublinks">
                  <Link to="/mandatory-disclosure" onClick={closeMobileDrawer}>Affiliation Status</Link>
                  <Link to="/mandatory-disclosure" onClick={closeMobileDrawer}>Mandatory Public Disclosure</Link>
                  <Link to="/mandatory-disclosure#managing-committee" onClick={closeMobileDrawer}>Managing Committee</Link>
                  <Link to="/mandatory-disclosure#noc" onClick={closeMobileDrawer}>NOC &amp; Recognition Letters</Link>
                </div>
              )}
            </div>

            {/* ADMISSION ACCORDION */}
            <div className="m3-drawer-accordion-item">
              <button
                type="button"
                className={`m3-drawer-link accordion-toggle ${location.pathname.startsWith('/admission') ? 'active-parent' : ''}`}
                onClick={() => toggleAccordion('admission')}
                aria-expanded={openDrawerAccordion === 'admission'}
              >
                <div className="m3-drawer-link-left">
                  <span className="material-symbols-outlined drawer-link-icon">assignment</span>
                  <span className="drawer-link-text">Admission</span>
                  <span className="m3-drawer-pill-badge">Open</span>
                </div>
                <span className={`material-symbols-outlined drawer-chevron ${openDrawerAccordion === 'admission' ? 'rotate' : ''}`}>
                  expand_more
                </span>
              </button>
              {openDrawerAccordion === 'admission' && (
                <div className="m3-drawer-sublinks">
                  <Link to="/admission" onClick={closeMobileDrawer}>New Admission 2026–27</Link>
                  <Link to="/admission#form" onClick={closeMobileDrawer}>Online Admission Form</Link>
                  <Link to="/admission#fee-structure" onClick={closeMobileDrawer}>Fee Structure &amp; Calculator</Link>
                  <Link to="/admission#guidelines" onClick={closeMobileDrawer}>Age Criteria &amp; Rules</Link>
                  <Link to="/admission#fee-payment" onClick={closeMobileDrawer}>Online Fee Payment</Link>
                </div>
              )}
            </div>

            {/* STUDENT CORNER ACCORDION */}
            <div className="m3-drawer-accordion-item">
              <button
                type="button"
                className={`m3-drawer-link accordion-toggle ${location.pathname.startsWith('/student') ? 'active-parent' : ''}`}
                onClick={() => toggleAccordion('student')}
                aria-expanded={openDrawerAccordion === 'student'}
              >
                <div className="m3-drawer-link-left">
                  <span className="material-symbols-outlined drawer-link-icon">sentiment_satisfied</span>
                  <span className="drawer-link-text">Student Corner</span>
                </div>
                <span className={`material-symbols-outlined drawer-chevron ${openDrawerAccordion === 'student' ? 'rotate' : ''}`}>
                  expand_more
                </span>
              </button>
              {openDrawerAccordion === 'student' && (
                <div className="m3-drawer-sublinks">
                  <Link to="/student-corner#timings" onClick={closeMobileDrawer}>School Timing &amp; Routine</Link>
                  <Link to="/student-corner#uniform" onClick={closeMobileDrawer}>School Uniform Guide</Link>
                  <Link to="/student-corner#moral" onClick={closeMobileDrawer}>Assembly &amp; Moral Values</Link>
                  <Link to="/student-corner#guidelines-students" onClick={closeMobileDrawer}>Guidelines For Students</Link>
                  <Link to="/student-corner#attendance" onClick={closeMobileDrawer}>Attendance &amp; Leave Rules</Link>
                  <Link to="/student-corner#cca-calendar" onClick={closeMobileDrawer}>CCA Calendar 2026–27</Link>
                  <Link to="/student-corner#vacations" onClick={closeMobileDrawer}>Vacations &amp; Holidays</Link>
                </div>
              )}
            </div>

            {/* FACILITIES ACCORDION */}
            <div className="m3-drawer-accordion-item">
              <button
                type="button"
                className={`m3-drawer-link accordion-toggle ${location.pathname.startsWith('/facilities') ? 'active-parent' : ''}`}
                onClick={() => toggleAccordion('facilities')}
                aria-expanded={openDrawerAccordion === 'facilities'}
              >
                <div className="m3-drawer-link-left">
                  <span className="material-symbols-outlined drawer-link-icon">apartment</span>
                  <span className="drawer-link-text">Campus Facilities</span>
                </div>
                <span className={`material-symbols-outlined drawer-chevron ${openDrawerAccordion === 'facilities' ? 'rotate' : ''}`}>
                  expand_more
                </span>
              </button>
              {openDrawerAccordion === 'facilities' && (
                <div className="m3-drawer-sublinks">
                  <Link to="/facilities#smart-classes" onClick={closeMobileDrawer}>Smart Digital Classrooms</Link>
                  <Link to="/facilities#play-area" onClick={closeMobileDrawer}>Montessori Play Activity Zone</Link>
                  <Link to="/facilities#science-lab" onClick={closeMobileDrawer}>Discovery &amp; Science Corner</Link>
                  <Link to="/facilities#computer-lab" onClick={closeMobileDrawer}>Kids Computer Lab</Link>
                  <Link to="/facilities#transport" onClick={closeMobileDrawer}>School Transport &amp; GPS</Link>
                  <Link to="/facilities#safety" onClick={closeMobileDrawer}>Safety &amp; CCTV Monitoring</Link>
                </div>
              )}
            </div>

            {/* GALLERY */}
            <NavLink
              to="/gallery"
              onClick={closeMobileDrawer}
              className={({ isActive }) => `m3-drawer-link ${isActive ? 'active' : ''}`}
            >
              <div className="m3-drawer-link-left">
                <span className="material-symbols-outlined drawer-link-icon">photo_library</span>
                <span className="drawer-link-text">Photo &amp; Video Gallery</span>
              </div>
              <span className="material-symbols-outlined drawer-link-arrow">chevron_right</span>
            </NavLink>

            {/* CONTACT */}
            <NavLink
              to="/contact"
              onClick={closeMobileDrawer}
              className={({ isActive }) => `m3-drawer-link ${isActive ? 'active' : ''}`}
            >
              <div className="m3-drawer-link-left">
                <span className="material-symbols-outlined drawer-link-icon">call</span>
                <span className="drawer-link-text">Contact &amp; Campus Map</span>
              </div>
              <span className="material-symbols-outlined drawer-link-arrow">chevron_right</span>
            </NavLink>
          </div>

          {/* ADMIN & INSTITUTIONAL LINKS */}
          <div className="m3-drawer-nav-group mt-3">
            <div className="m3-drawer-group-label">PORTAL &amp; TRUST</div>

            <Link
              to="/admin/login"
              onClick={closeMobileDrawer}
              className="m3-drawer-link admin-link"
            >
              <div className="m3-drawer-link-left">
                <span className="material-symbols-outlined drawer-link-icon text-warning">lock</span>
                <span className="drawer-link-text">Staff &amp; Admin Portal</span>
              </div>
              <span className="material-symbols-outlined drawer-link-arrow">lock_open</span>
            </Link>
          </div>

          {/* Institutional Trust Footnote */}
          <div className="m3-drawer-footer">
            <div className="drawer-footer-title">Swami Shiwanand Academy</div>
            <div className="drawer-footer-text">
              Under {schoolInfo.trust}<br />
              {schoolInfo.address}<br />
              Helpline: {schoolInfo.phones[0]}
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MOBILE APP BOTTOM TAB BAR (fixed, touch-optimized)
          ======================================================== */}
      <nav className="mobile-app-tabbar d-lg-none" aria-label="Mobile Bottom App Navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `mobile-app-tab ${isActive && !mobileDrawerOpen ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined">home</span>
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/admission"
          className={({ isActive }) => `mobile-app-tab ${isActive && !mobileDrawerOpen ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined">edit_document</span>
          <span>Admission</span>
        </NavLink>

        <NavLink
          to="/facilities"
          className={({ isActive }) => `mobile-app-tab ${isActive && !mobileDrawerOpen ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined">apartment</span>
          <span>Facilities</span>
        </NavLink>

        <NavLink
          to="/student-corner"
          className={({ isActive }) => `mobile-app-tab ${isActive && !mobileDrawerOpen ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined">school</span>
          <span>Students</span>
        </NavLink>

        <button
          type="button"
          onClick={toggleMobileDrawer}
          className={`mobile-app-tab mobile-app-tab-btn ${mobileDrawerOpen ? 'active' : ''}`}
          aria-label={mobileDrawerOpen ? 'Close full menu' : 'Open full menu'}
          aria-expanded={mobileDrawerOpen}
        >
          <span className="material-symbols-outlined">
            {mobileDrawerOpen ? 'close' : 'menu'}
          </span>
          <span>{mobileDrawerOpen ? 'Close' : 'Menu'}</span>
        </button>
      </nav>
    </>
  );
}
