import React, { useState, useEffect } from 'react';
import { noticesData } from '../data/notices';
import { useModal } from '../context/ModalContext';

export default function NoticeBoard() {
  const { openNotice } = useModal();
  const [noticesList, setNoticesList] = useState(noticesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('/api/notices')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setNoticesList(data.data);
        }
      })
      .catch(err => {
        console.warn('Notice API fallback to local notices:', err);
      });
  }, []);

  const categories = ['All', 'Admission', 'Academics', 'Events', 'Recruitment'];

  const formatNoticeDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const year = parts[2];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (monthIdx >= 0 && monthIdx < 12) {
        return `${day} ${months[monthIdx]} ${year}`;
      }
    }
    return dateStr;
  };

  const filteredNotices = noticesList.filter((notice) => {
    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notice.desc && notice.desc.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="noticeBoard">
      <div className="notiseBoardTitle">
        <h3>
          <span className="material-symbols-outlined text-warning fs-5">campaign</span> Notice Board &amp; Circulars
        </h3>
        <div className="d-flex align-items-center gap-2">
          <span className="m3-badge m3-badge-tonal">
            <span className="material-symbols-outlined fs-6">calendar_month</span> Session 2026–27
          </span>
        </div>
      </div>

      {/* Interactive Category & Search Bar */}
      <div className="notice-filter-bar">
        <input
          type="text"
          className="notice-search-input"
          placeholder="Search notices, circulars, announcements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="d-flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`m3-chip ${selectedCategory === cat ? 'm3-chip-primary' : 'm3-chip-tonal'}`}
              style={{ fontSize: '0.78rem', padding: '4px 12px' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notice List */}
      <ul className="notice-list">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice, idx) => (
            <li key={notice._id || notice.id || idx} className="notice-item">
              <div className="d-flex align-items-start justify-content-between gap-3">
                <div className="notice-title-text" style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <button
                    onClick={() => openNotice(notice)}
                    className="notice-btn-main"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <span className="notice-arrow-box" style={{ flexShrink: 0 }}>
                      <span className="material-symbols-outlined fs-6">arrow_forward</span>
                    </span>
                    <span className="notice-title-inner" style={{ flex: '1 1 auto', minWidth: 0 }}>
                      {notice.title}
                    </span>
                  </button>
                  <div className="notice-meta-row">
                    <span className="notice-time-pill" title={`Date Published: ${formatNoticeDate(notice.date)}`}>
                      <span className="material-symbols-outlined notice-time-icon">calendar_today</span>
                      <span>{formatNoticeDate(notice.date)}</span>
                    </span>
                    <span className="notice-category-badge">
                      {notice.category || 'General'}
                    </span>
                    {notice.isNew && (
                      <span className="notice-new-badge">
                        <span className="notice-new-pulse"></span>
                        NEW
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => openNotice(notice)}
                  className="m3-btn m3-btn-tonal p-2"
                  style={{ borderRadius: '10px', width: '36px', height: '36px', flexShrink: 0 }}
                  title="View Notice Details"
                >
                  <span className="material-symbols-outlined fs-6">open_in_new</span>
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="p-4 text-center text-muted">
            <span className="material-symbols-outlined fs-1 text-muted mb-2 d-block">folder_off</span>
            No notices found matching your criteria.
          </li>
        )}
      </ul>

      {/* View All & Status Bar */}
      <div className="viewAllBtn">
        <span className="small text-muted">
          Showing {filteredNotices.length} of {noticesList.length} updates
        </span>
        <button
          onClick={() => {
            setSelectedCategory('All');
            setSearchTerm('');
          }}
          className="m3-btn m3-btn-outlined py-1 px-3"
          style={{ fontSize: '0.8rem' }}
        >
          <span className="material-symbols-outlined fs-6">refresh</span> Reset Filters
        </button>
      </div>
    </div>
  );
}
