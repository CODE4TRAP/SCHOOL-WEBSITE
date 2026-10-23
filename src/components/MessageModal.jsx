import React from 'react';
import { useModal } from '../context/ModalContext';

export default function MessageModal() {
  const { messageModal, closeMessage } = useModal();

  if (!messageModal.isOpen) return null;

  return (
    <div className="modal-backdrop-custom" onClick={closeMessage}>
      <div className="modal-content-custom modal-content-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header-custom">
          <h5><i className="fas fa-quote-left text-warning me-2"></i> {messageModal.title}</h5>
          <button className="modal-close-btn" onClick={closeMessage} aria-label="Close modal">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body-custom">
          <h5 className="text-primary fw-bold mb-3">{messageModal.author}</h5>
          <div
            className="text-dark"
            style={{ fontSize: '0.96rem', lineHeight: '1.8', textAlign: 'justify' }}
            dangerouslySetInnerHTML={{ __html: messageModal.content }}
          />
        </div>
        <div className="modal-footer-custom">
          <button type="button" className="btn btn-secondary btn-sm" onClick={closeMessage}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
