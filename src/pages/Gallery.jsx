import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { galleryPhotos } from '../data/content';
import { useModal } from '../context/ModalContext';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const { openLightbox } = useModal();

  const categories = ['All', 'Events', 'Activities', 'Celebrations', 'Sports', 'Campus'];

  const filteredPhotos = filter === 'All'
    ? galleryPhotos
    : galleryPhotos.filter(item => item.category === filter);

  return (
    <div>
      {/* M3 Page Header in Separate Structured Boxes */}
      <div className="m3-page-header">
        <div className="container">
          <div className="m3-header-container">
            <div className="m3-header-badges-box">
              <span className="m3-badge m3-badge-tonal">
                <span className="material-symbols-outlined fs-6">photo_camera</span> Campus Life
              </span>
              <span className="m3-badge m3-badge-amber">
                <span className="material-symbols-outlined fs-6">auto_awesome</span> HD Moments
              </span>
            </div>
            <div className="m3-header-title-box">
              <h2 className="m3-page-header-title mb-0">Campus Photo &amp; Event Gallery</h2>
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
                  <li className="active">Gallery</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Intro Section in Dedicated Box */}
        <div className="section-header-box mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="header-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
              <span className="material-symbols-outlined">collections</span>
            </div>
            <div>
              <h3 className="header-title">Memorable Moments at Swami Shiwanand Academy</h3>
              <p className="header-subtitle">
                Click on any photograph to zoom into high definition view with our interactive full-screen gallery lightbox.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Buttons with Item Counts */}
        <div className="tab-nav-wrapper mb-5">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? galleryPhotos.length
              : galleryPhotos.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                className={`tab-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat} <span className="small opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="gallery-item"
              onClick={() => openLightbox(photo.img, photo.title, filteredPhotos, index)}
            >
              <img src={photo.img} alt={photo.title} />
              <div className="gallery-overlay">
                <div>
                  <span className="badge bg-warning text-dark small mb-1" style={{ fontSize: '0.72rem' }}>
                    {photo.category}
                  </span>
                  <h5>{photo.title}</h5>
                  <span className="small text-white opacity-75">
                    <i className="fas fa-search-plus me-1"></i> Click to Zoom
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Highlights Section in Dedicated Box */}
        <section id="video" className="mt-5 pt-4">
          <div className="section-header-box mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="header-icon-box" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626' }}>
                <span className="material-symbols-outlined">play_circle</span>
              </div>
              <div>
                <h3 className="header-title">Video Highlights</h3>
                <p className="header-subtitle">
                  Watch glimpses of our young achievers in celebrations, sports meets, and classroom activities.
                </p>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div
                className="video-highlight-card"
                style={{ cursor: 'pointer' }}
                onClick={() => openLightbox('/images/facility_smart_class.jpg', 'Annual Cultural Fest Highlights - Swami Shiwanand Academy')}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '220px', background: '#000' }}>
                  <img src="/images/facility_smart_class.jpg" alt="Video Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffd166, var(--md-accent-gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: '#073361', boxShadow: '0 6px 20px rgba(0,0,0,0.4)' }}>
                      <i className="fas fa-play" style={{ marginLeft: '4px' }}></i>
                    </div>
                  </div>
                </div>
                <div className="video-highlight-info">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="m3-badge m3-badge-amber">Cultural Stage</span>
                    <span className="small text-muted d-flex align-items-center gap-1">
                      <span className="material-symbols-outlined fs-6">videocam</span> 4K HD
                    </span>
                  </div>
                  <h5 className="video-highlight-title">Annual Cultural Fest &amp; Kids Drama</h5>
                  <p className="video-highlight-desc">Celebration, traditional folk dance, and musical skits by primary students.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-5">
              <div
                className="video-highlight-card"
                style={{ cursor: 'pointer' }}
                onClick={() => openLightbox('/images/facility_montessori.jpg', 'Montessori Play Station & Activities')}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '220px', background: '#000' }}>
                  <img src="/images/facility_montessori.jpg" alt="Video Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffd166, var(--md-accent-gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: '#073361', boxShadow: '0 6px 20px rgba(0,0,0,0.4)' }}>
                      <i className="fas fa-play" style={{ marginLeft: '4px' }}></i>
                    </div>
                  </div>
                </div>
                <div className="video-highlight-info">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="m3-badge m3-badge-tonal">Early Learning</span>
                    <span className="small text-muted d-flex align-items-center gap-1">
                      <span className="material-symbols-outlined fs-6">videocam</span> 4K HD
                    </span>
                  </div>
                  <h5 className="video-highlight-title">Joyful Classroom &amp; Montessori Play</h5>
                  <p className="video-highlight-desc">Daily tactile learning activities, ball pool play, and cognitive sensory games.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
