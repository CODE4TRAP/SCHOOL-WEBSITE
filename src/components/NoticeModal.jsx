import React from 'react';
import { useModal } from '../context/ModalContext';
import { schoolInfo } from '../data/content';

export default function NoticeModal() {
  const { noticeModal, closeNotice } = useModal();

  if (!noticeModal.isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop-custom" onClick={closeNotice}>
      <div className="modal-content-custom modal-content-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header-custom">
          <h5><i className="fas fa-file-contract text-warning me-2"></i> Official Circular &amp; Notice</h5>
          <button className="modal-close-btn" onClick={closeNotice} aria-label="Close modal">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body-custom p-4">
          {/* Official Letterhead Header */}
          <div className="d-flex align-items-center gap-3 pb-3 mb-3 border-bottom">
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ width: '68px', height: '68px', objectFit: 'contain', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '3px' }}
            />
            <div className="flex-grow-1">
              <h5 className="fw-bold text-primary mb-0">{schoolInfo.name}</h5>
              <p className="small text-muted mb-0">{schoolInfo.address}</p>
              <div className="d-flex justify-content-between small text-muted mt-1">
                <span>Estd: {schoolInfo.estd} &bull; Reg: SSA-ROH-2009-8213</span>
                <span>Ref: SSA/CIR/2026/{Math.floor(100 + Math.random() * 900)}</span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-primary text-white px-3 py-1 fw-bold" style={{ fontSize: '0.82rem' }}>
              Official Announcement
            </span>
            <div className="text-muted small">
              <i className="far fa-calendar-alt text-primary me-1"></i>
              <strong>Date:</strong> {noticeModal.date}
            </div>
          </div>

          <h4 className="fw-bold text-dark mb-3" style={{ lineHeight: '1.4' }}>
            {noticeModal.title}
          </h4>

          <div
            className="text-dark p-3 rounded-3 mb-4"
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontSize: '0.96rem',
              lineHeight: '1.85',
              textAlign: 'justify'
            }}
          >
            {noticeModal.desc}
          </div>

          {/* Signatory Footer */}
          <div className="d-flex justify-content-between align-items-end pt-3 border-top text-muted small">
            <div>
              <span>Published by: Office of the Principal</span><br />
              <span>Contact: {schoolInfo.phones[0]}</span>
            </div>
            <div className="text-end">
              <div className="text-dark fw-bold">Authorized Signatory</div>
              <span className="small text-muted">{schoolInfo.name}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer-custom">
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={closeNotice}>
            Close
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={handlePrint}>
            <i className="fas fa-print me-1"></i> Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
