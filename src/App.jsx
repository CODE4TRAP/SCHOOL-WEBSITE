import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ScrollToTop from './components/ScrollToTop';
import NoticeModal from './components/NoticeModal';
import MessageModal from './components/MessageModal';
import LightboxModal from './components/LightboxModal';
import PortalModal from './components/PortalModal';

import Home from './pages/Home';
import About from './pages/About';
import Admission from './pages/Admission';
import Facilities from './pages/Facilities';
import Gallery from './pages/Gallery';
import MandatoryDisclosure from './pages/MandatoryDisclosure';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-layout d-flex flex-column" style={{ minHeight: '100vh' }}>
      <ScrollToTop />

      {/* Render Public Header & Navbar on Public Pages */}
      {!isAdminRoute && (
        <>
          <TopBar />
          <Header />
          <Navbar />
        </>
      )}

      <main className="flex-grow-1">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Portal Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Render Public Footer & FAB on Public Pages */}
      {!isAdminRoute && (
        <>
          <Footer />
          <FloatingActions />
        </>
      )}

      {/* Global Modals */}
      <NoticeModal />
      <MessageModal />
      <LightboxModal />
      <PortalModal />
    </div>
  );
}
