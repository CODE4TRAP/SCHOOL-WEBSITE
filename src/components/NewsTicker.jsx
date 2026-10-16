import React from 'react';
import { Link } from 'react-router-dom';

const tickerItems = [
  {
    tag: 'ADMISSIONS 2026–27',
    tagColor: '#38bdf8',
    text: 'Admissions Open for Playgroup, Nursery, LKG, UKG, and Std I to V. Limited seats per batch.',
    link: '/admission'
  },
  {
    tag: 'WORKSHOP',
    tagColor: '#4ade80',
    text: 'Summer Camp and Kids Creative Workshop registrations are now open for all students.',
    link: '/facilities'
  },
  {
    tag: 'PTM NOTICE',
    tagColor: '#facc15',
    text: 'Parents-Teacher Meeting (PTM) scheduled for Saturday. Contact the school office for timings.',
    link: '#noticeBoardSection'
  },
  {
    tag: 'HOLIDAY LIST',
    tagColor: '#f472b6',
    text: 'Official Academic Calendar & Gazetted Holidays 2026–27 published for all classes.',
    link: '/student-corner#vacations'
  },
  {
    tag: 'SAFE TRANSPORT',
    tagColor: '#c084fc',
    text: 'Safe GPS-enabled school bus tracking facility active across all Sasaram routes.',
    link: '/facilities'
  }
];

export default function NewsTicker() {
  return (
    <div className="news-ticker-strip">
      <div className="container">
        <div className="news-ticker-container">
          {/* Static Left Badge (Will never overlap scrolling text) */}
          <div className="ticker-badge-wrap">
            <span className="ticker-label">
              <span className="ticker-live-beacon"></span>
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>campaign</span>
              <span className="label-full-text">LATEST UPDATES</span>
            </span>
          </div>

          {/* Smooth Continuous Marquee Track with Edge Masking */}
          <div className="ticker-content-track">
            <div className="ticker-track-inner">
              {/* Primary Sequence */}
              {tickerItems.map((item, idx) => (
                <a key={`orig-${idx}`} href={item.link} className="ticker-item">
                  <span
                    className="ticker-item-tag"
                    style={{ color: item.tagColor, borderColor: `${item.tagColor}50` }}
                  >
                    {item.tag}
                  </span>
                  <span>{item.text}</span>
                  <span className="ticker-item-sep">◆</span>
                </a>
              ))}
              {/* Duplicate Sequence for Zero-Jump Infinite Scroll */}
              {tickerItems.map((item, idx) => (
                <a key={`dup-${idx}`} href={item.link} className="ticker-item">
                  <span
                    className="ticker-item-tag"
                    style={{ color: item.tagColor, borderColor: `${item.tagColor}50` }}
                  >
                    {item.tag}
                  </span>
                  <span>{item.text}</span>
                  <span className="ticker-item-sep">◆</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Action Button */}
          <a href="#noticeBoardSection" className="ticker-action-btn">
            <span>Notice Board</span>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}
