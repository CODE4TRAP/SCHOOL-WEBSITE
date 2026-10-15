import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const closeMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="m3-nav-bar">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Mobile Hamburger Button */}
        <button
          className="m3-mobile-toggle d-lg-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          <span>Menu</span>
        </button>

        {/* Navigation Links */}
        <div className={`m3-nav-menu-wrapper ${mobileOpen ? 'show-mobile' : ''}`}>
          <ul className="m3-nav-list">
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) => `m3-nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">home</span>
                <span>Home</span>
              </NavLink>
            </li>

            {/* ABOUT US */}
            <li className="m3-dropdown-wrapper">
              <button
                onClick={() => toggleDropdown('about')}
                className={`m3-nav-link ${location.pathname.startsWith('/about') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">info</span>
                <span>About Us</span>
                <span className="material-symbols-outlined dropdown-arrow">expand_more</span>
              </button>
              <ul className={`m3-dropdown-menu ${openDropdown === 'about' ? 'show' : ''}`}>
                <li><Link to="/about" onClick={closeMenu}>About School &amp; Heritage</Link></li>
                <li><Link to="/about#principal-message" onClick={closeMenu}>Principal’s Message</Link></li>
                <li><Link to="/about#aims" onClick={closeMenu}>Aims &amp; Objectives</Link></li>
                <li><Link to="/about#perspective" onClick={closeMenu}>Education Perspective</Link></li>
                <li><Link to="/about#society" onClick={closeMenu}>Management Trust</Link></li>
                <li><Link to="/about#statistics" onClick={closeMenu}>Key Statistics</Link></li>
              </ul>
            </li>

            {/* GENERAL INFORMATION */}
            <li className="m3-dropdown-wrapper">
              <button
                onClick={() => toggleDropdown('general')}
                className={`m3-nav-link ${location.pathname.startsWith('/mandatory-disclosure') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">verified_user</span>
                <span>General Info</span>
                <span className="material-symbols-outlined dropdown-arrow">expand_more</span>
              </button>
              <ul className={`m3-dropdown-menu ${openDropdown === 'general' ? 'show' : ''}`}>
                <li><Link to="/mandatory-disclosure" onClick={closeMenu}>Affiliation Status</Link></li>
                <li><Link to="/mandatory-disclosure" onClick={closeMenu}>Mandatory Public Disclosure</Link></li>
                <li><Link to="/mandatory-disclosure#managing-committee" onClick={closeMenu}>Managing Committee</Link></li>
                <li><Link to="/mandatory-disclosure#noc" onClick={closeMenu}>NOC &amp; Recognition Letters</Link></li>
              </ul>
            </li>

            {/* ADMISSION */}
            <li className="m3-dropdown-wrapper">
              <button
                onClick={() => toggleDropdown('admission')}
                className={`m3-nav-link ${location.pathname.startsWith('/admission') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">assignment</span>
                <span>Admission</span>
                <span className="material-symbols-outlined dropdown-arrow">expand_more</span>
              </button>
              <ul className={`m3-dropdown-menu ${openDropdown === 'admission' ? 'show' : ''}`}>
                <li><Link to="/admission" onClick={closeMenu}>New Admission 2026–27</Link></li>
                <li><Link to="/admission#form" onClick={closeMenu}>Online Admission Form</Link></li>
                <li><Link to="/admission#fee-structure" onClick={closeMenu}>Fee Structure &amp; Calculator</Link></li>
                <li><Link to="/admission#guidelines" onClick={closeMenu}>Age Criteria &amp; Rules</Link></li>
                <li><Link to="/admission#fee-payment" onClick={closeMenu}>Online Fee Payment</Link></li>
              </ul>
            </li>

            {/* STUDENT CORNER */}
            <li className="m3-dropdown-wrapper">
              <button
                onClick={() => toggleDropdown('student')}
                className="m3-nav-link"
              >
                <span className="material-symbols-outlined fs-5">sentiment_satisfied</span>
                <span>Student Corner</span>
                <span className="material-symbols-outlined dropdown-arrow">expand_more</span>
              </button>
              <ul className={`m3-dropdown-menu ${openDropdown === 'student' ? 'show' : ''}`}>
                <li><Link to="/about#moral" onClick={closeMenu}>Assembly &amp; Moral Values</Link></li>
                <li><Link to="/about#uniform" onClick={closeMenu}>School Uniform Dress Code</Link></li>
                <li><Link to="/about#timings" onClick={closeMenu}>Class Timing &amp; Daily Routine</Link></li>
                <li><Link to="/about#vacations" onClick={closeMenu}>Vacations &amp; Holidays 2026</Link></li>
              </ul>
            </li>

            {/* FACILITIES */}
            <li className="m3-dropdown-wrapper">
              <button
                onClick={() => toggleDropdown('facilities')}
                className={`m3-nav-link ${location.pathname.startsWith('/facilities') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">apartment</span>
                <span>Facilities</span>
                <span className="material-symbols-outlined dropdown-arrow">expand_more</span>
              </button>
              <ul className={`m3-dropdown-menu ${openDropdown === 'facilities' ? 'show' : ''}`}>
                <li><Link to="/facilities#smart-classes" onClick={closeMenu}>Smart Digital Classrooms</Link></li>
                <li><Link to="/facilities#play-area" onClick={closeMenu}>Montessori Play Activity Zone</Link></li>
                <li><Link to="/facilities#science-lab" onClick={closeMenu}>Discovery &amp; Science Corner</Link></li>
                <li><Link to="/facilities#computer-lab" onClick={closeMenu}>Kids Computer Lab</Link></li>
                <li><Link to="/facilities#transport" onClick={closeMenu}>School Transport &amp; GPS</Link></li>
                <li><Link to="/facilities#safety" onClick={closeMenu}>Safety &amp; CCTV Monitoring</Link></li>
              </ul>
            </li>

            {/* GALLERY */}
            <li>
              <NavLink
                to="/gallery"
                onClick={closeMenu}
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
                onClick={closeMenu}
                className={({ isActive }) => `m3-nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined fs-5">call</span>
                <span>Contact</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
