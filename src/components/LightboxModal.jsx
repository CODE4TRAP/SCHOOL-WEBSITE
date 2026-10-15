import React, { useEffect } from 'react';
import { useModal } from '../context/ModalContext';

export default function LightboxModal() {
  const { lightboxModal, closeLightbox, nextLightbox, prevLightbox } = useModal();

  useEffect(() => {
    if (!lightboxModal.isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxModal.isOpen, nextLightbox, prevLightbox, closeLightbox]);

  if (!lightboxModal.isOpen) return null;

  const total = lightboxModal.imagesList?.length || 1;
  const current = (lightboxModal.currentIndex || 0) + 1;

  return (
    <div
      className="modal-backdrop-custom"
      onClick={closeLightbox}
      style={{ background: 'rgba(3, 10, 22, 0.94)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="modal-content-custom modal-content-lg"
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0b162c',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          position: 'relative'
        }}
      >
        <div
          className="modal-header-custom"
          style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="d-flex align-items-center gap-2">
            <h5 className="text-white mb-0" style={{ fontSize: '1.05rem' }}>
              <i className="fas fa-camera text-warning me-2"></i> {lightboxModal.caption}
            </h5>
            {total > 1 && (
              <span className="badge bg-secondary text-white small" style={{ fontSize: '0.75rem' }}>
                {current} of {total}
              </span>
            )}
          </div>
          <button className="modal-close-btn" onClick={closeLightbox} aria-label="Close modal">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div
          className="modal-body-custom text-center p-3"
          style={{ background: '#050d1e', position: 'relative', minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {total > 1 && (
            <button
              onClick={prevLightbox}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
              title="Previous (Left Arrow)"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}

          <img
            src={lightboxModal.img}
            alt={lightboxModal.caption}
            style={{
              maxHeight: '70vh',
              maxWidth: '100%',
              margin: '0 auto',
              borderRadius: '8px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
              objectFit: 'contain'
            }}
          />

          {total > 1 && (
            <button
              onClick={nextLightbox}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
              title="Next (Right Arrow)"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>

        <div
          className="modal-footer-custom justify-content-between"
          style={{ background: '#0b162c', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <span className="small text-muted">Use arrow keys ◀ ▶ to navigate &bull; Esc to exit</span>
          <button type="button" className="btn btn-warning btn-sm" onClick={closeLightbox}>
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
