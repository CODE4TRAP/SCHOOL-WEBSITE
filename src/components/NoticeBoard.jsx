import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { noticesData } from '../data/notices';
import { useModal } from '../context/ModalContext';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const sanitizeNoticeText = (text) => {
  if (!text) return text;
  return text
    .replace(/Std I[–-]V\b/g, 'Std I–VI')
    .replace(/Classes I to V\b/g, 'Classes I to VI')
    .replace(/Class I to V\b/g, 'Class I to VI');
};

export default function NoticeBoard() {
  const { openNotice } = useModal();
  const [noticesList, setNoticesList] = useState(() => 
    noticesData.map(n => ({
      ...n,
      title: sanitizeNoticeText(n.title),
      desc: sanitizeNoticeText(n.desc)
    }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function loadNotices() {
      try {
        const noticesSnap = await getDocs(query(collection(db, 'notices'), orderBy('createdAt', 'desc')));
        if (!noticesSnap.empty) {
          const list = noticesSnap.docs.map(d => ({
            id: d.id,
            ...d.data(),
            title: sanitizeNoticeText(d.data().title),
            desc: sanitizeNoticeText(d.data().desc)
          }));
          setNoticesList(list);
          return;
        }
      } catch (firestoreErr) {
        console.warn('Firestore notices load notice, attempting fallback:', firestoreErr);
      }

      fetch('/api/notices')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data && data.data.length > 0) {
            const sanitized = data.data.map(n => ({
              ...n,
              title: sanitizeNoticeText(n.title),
              desc: sanitizeNoticeText(n.desc)
            }));
            setNoticesList(sanitized);
          }
        })
        .catch(err => {
          console.warn('Notice API fallback to local notices:', err);
        });
    }

    loadNotices();
  }, []);

  const categories = useMemo(() => {
    const cats = ['All', 'Admission', 'Academics', 'Events', 'Recruitment'];
    noticesList.forEach(item => {
      if (item.category && !cats.includes(item.category)) {
        cats.push(item.category);
      }
    });
    return cats;
  }, [noticesList]);

  const parseDateParts = (dateStr) => {
    if (!dateStr) return { day: '01', month: 'OCT', year: '2026' };
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const year = parts[2];
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      return {
        day: day.padStart(2, '0'),
        month: monthIdx >= 0 && monthIdx < 12 ? months[monthIdx] : 'OCT',
        year
      };
    }
    return { day: '01', month: 'OCT', year: '2026' };
  };

  const getCategoryMeta = (cat) => {
    const c = (cat || '').toLowerCase();
    if (c.includes('admission')) {
      return { className: 'notice-tag-admission', icon: 'school' };
    }
    if (c.includes('academic')) {
      return { className: 'notice-tag-academics', icon: 'menu_book' };
    }
    if (c.includes('event') || c.includes('sports')) {
      return { className: 'notice-tag-events', icon: 'celebration' };
    }
    if (c.includes('recruit') || c.includes('staff') || c.includes('job')) {
      return { className: 'notice-tag-recruitment', icon: 'badge' };
    }
    if (c.includes('tender') || c.includes('transport') || c.includes('bus')) {
      return { className: 'notice-tag-tender', icon: 'directions_bus' };
    }
    if (c.includes('health') || c.includes('medical') || c.includes('dental')) {
      return { className: 'notice-tag-health', icon: 'medical_services' };
    }
    return { className: 'notice-tag-admission', icon: 'campaign' };
  };

  const filteredNotices = useMemo(() => {
    return noticesList.filter((notice) => {
      const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        notice.title.toLowerCase().includes(q) ||
        (notice.desc && notice.desc.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [noticesList, selectedCategory, searchTerm]);

  const getCategoryCount = (cat) => {
    if (cat === 'All') return noticesList.length;
    return noticesList.filter(n => n.category === cat).length;
  };

  return (
    <div className="noticeBoard">
      {/* Premium Navy Header */}
      <div className="notiseBoardTitle">
        <div className="notice-header-left">
          <div className="notice-header-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>campaign</span>
          </div>
          <div>
            <h3>Notice Board &amp; Circulars</h3>
            <div className="notice-header-sub">Official school circulars, academic schedules &amp; event updates</div>
            {/* Inline badges on mobile under subtitle */}
            <div className="notice-header-badges-mobile d-flex d-md-none align-items-center gap-2 mt-2">
              <span className="notice-live-pill">
                <span className="notice-live-dot"></span>
                LIVE
              </span>
              <span className="notice-session-pill">
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>calendar_month</span>
                Session 2026–27
              </span>
            </div>
          </div>
        </div>

        {/* Desktop right-aligned badges */}
        <div className="notice-header-badges d-none d-md-flex">
          <span className="notice-live-pill">
            <span className="notice-live-dot"></span>
            LIVE
          </span>
          <span className="notice-session-pill">
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>calendar_month</span>
            Session 2026–27
          </span>
        </div>
      </div>

      {/* Interactive Search & Category Filter Toolbar */}
      <div className="notice-filter-bar">
        <div className="notice-search-wrap">
          <span className="material-symbols-outlined notice-search-icon">search</span>
          <input
            type="text"
            className="notice-search-input"
            placeholder="Search notices, circulars, PTM, admissions, exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="notice-search-clear"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
            </button>
          )}
        </div>

        <div className="notice-chips-row">
          {categories.map((cat) => {
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`notice-chip ${selectedCategory === cat ? 'active' : ''}`}
              >
                <span>{cat}</span>
                <span className="notice-chip-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notice List */}
      <ul className="notice-list">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice, idx) => {
            const dateParts = parseDateParts(notice.date);
            const meta = getCategoryMeta(notice.category);

            return (
              <li
                key={notice._id || notice.id || idx}
                className="notice-item"
                onClick={() => openNotice(notice)}
              >
                <div className="notice-item-inner">
                  {/* Calendar Sheet Date Block */}
                  <div className="notice-calendar-block">
                    <span className="notice-cal-month">{dateParts.month}</span>
                    <span className="notice-cal-day">{dateParts.day}</span>
                    <span className="notice-cal-year">{dateParts.year}</span>
                  </div>

                  {/* Main Content Column */}
                  <div className="notice-content-col">
                    <button
                      type="button"
                      className="notice-title-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openNotice(notice);
                      }}
                    >
                      {notice.title}
                    </button>

                    {notice.desc && (
                      <p className="notice-desc-preview">{notice.desc}</p>
                    )}

                    <div className="notice-meta-tags">
                      <span className={`notice-tag-badge ${meta.className}`}>
                        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>{meta.icon}</span>
                        {notice.category || 'General'}
                      </span>

                      {notice.isNew && (
                        <span className="notice-new-badge">
                          <span className="notice-live-dot" style={{ width: '5px', height: '5px' }}></span>
                          NEW
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Open Button */}
                  <button
                    type="button"
                    className="notice-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openNotice(notice);
                    }}
                    title="View Notice Details"
                    aria-label="View Notice Details"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <li className="p-4 text-center text-muted" style={{ padding: '40px 20px' }}>
            <span className="material-symbols-outlined fs-1 text-muted mb-2 d-block">search_off</span>
            <div className="fw-bold text-dark mb-1">No circulars found</div>
            <p className="small text-muted mb-3">No notices match "{searchTerm}" in category "{selectedCategory}"</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="m3-btn m3-btn-tonal py-1 px-3"
              style={{ fontSize: '0.8rem' }}
            >
              Reset All Filters
            </button>
          </li>
        )}
      </ul>

      {/* View All & Status Bar */}
      <div className="viewAllBtn">
        <span className="small text-muted fw-semibold d-flex align-items-center gap-1">
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#0b57d0' }}>check_circle</span>
          Showing {filteredNotices.length} of {noticesList.length} updates
        </span>

        <div className="d-flex align-items-center gap-2">
          {(searchTerm || selectedCategory !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="m3-btn m3-btn-outlined py-1 px-3"
              style={{ fontSize: '0.78rem' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>refresh</span> Reset
            </button>
          )}

          <Link
            to="/admission"
            className="m3-btn m3-btn-tonal py-1 px-3"
            style={{ fontSize: '0.78rem', textDecoration: 'none' }}
          >
            <span>Notice Archive</span>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
