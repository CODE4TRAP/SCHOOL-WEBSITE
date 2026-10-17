import React, { useState } from 'react';
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
  const [isPaused, setIsPaused] = useState(false);

  const renderItem = (item, key) => {
    const isInternal = item.link.startsWith('/') && !item.link.includes('#');
    const content = (
      <>
        <span
          className="ticker-item-tag"
          style={{ color: item.tagColor, borderColor: `${item.tagColor}50` }}
        >
          {item.tag}
        </span>
        <span className="ticker-item-text">{item.text}</span>
        <span className="ticker-item-sep">◆</span>
      </>
    );

    if (isInternal) {
      return (
        <Link key={key} to={item.link} className="ticker-item">
          {content}
        </Link>
      );
    }
    return (
      <a key={key} href={item.link} className="ticker-item">
        {content}
      </a>
    );
  };

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
            <div
              className={`ticker-track-inner ${isPaused ? 'is-paused' : ''}`}
              style={{
                animationPlayState: isPaused ? 'paused' : 'running'
              }}
            >
              {/* Primary Sequence */}
              {tickerItems.map((item, idx) => renderItem(item, `orig-${idx}`))}
              {/* Duplicate Sequence for Zero-Jump Infinite Scroll */}
              {tickerItems.map((item, idx) => renderItem(item, `dup1-${idx}`))}
              {/* Triplicate Sequence for Extra-Wide Displays */}
              {tickerItems.map((item, idx) => renderItem(item, `dup2-${idx}`))}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="ticker-actions-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              className="ticker-ctrl-btn"
              onClick={() => setIsPaused((prev) => !prev)}
              title={isPaused ? 'Resume live ticker' : 'Pause ticker'}
              aria-label={isPaused ? 'Resume live ticker' : 'Pause ticker'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                {isPaused ? 'play_arrow' : 'pause'}
              </span>
            </button>

            <a href="#noticeBoardSection" className="ticker-action-btn">
              <span>Notice Board</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
