import React from 'react';

export default function NewsTicker() {
  return (
    <div className="news-ticker-strip">
      <div className="container d-flex align-items-center">
        <span className="ticker-label me-3">
          <i className="fas fa-bullhorn"></i> Latest Updates
        </span>
        <div className="ticker-content flex-grow-1">
          <marquee
            direction="left"
            scrollamount="5"
            onMouseOver={(e) => e.target.stop()}
            onMouseOut={(e) => e.target.start()}
          >
            • Admissions Open for Session 2026–27 for Playgroup, Nursery, LKG, UKG, and Std I to V.
            &nbsp;&nbsp;&nbsp;&nbsp;• Summer Camp and Kids Creative Workshop registrations are now open!
            &nbsp;&nbsp;&nbsp;&nbsp;• Parents-Teacher Meeting (PTM) scheduled for Saturday. Contact the school office for timings.
            &nbsp;&nbsp;&nbsp;&nbsp;• Download School Prospectus and Admission Form online.
          </marquee>
        </div>
      </div>
    </div>
  );
}
