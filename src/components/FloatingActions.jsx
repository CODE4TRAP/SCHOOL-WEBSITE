import React, { useState, useEffect } from 'react';
import { schoolInfo } from '../data/content';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="floating-actions">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${schoolInfo.whatsappNumber}?text=Hello%20Swami%20Shiwanand%20Academy,%20I%20want%20to%20inquire%20about%20admission`}
        target="_blank"
        rel="noreferrer"
        className="floating-btn btn-whatsapp"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="floating-btn btn-scroll-top"
          title="Scroll To Top"
          aria-label="Scroll To Top"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      )}
    </div>
  );
}
