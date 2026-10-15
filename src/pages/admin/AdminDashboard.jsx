import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { schoolInfo } from '../../data/content';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('admissions');
  const [adminUser, setAdminUser] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    totalAdmissions: 0,
    pendingAdmissions: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalNotices: 0
  });

  // Admissions State
  const [admissions, setAdmissions] = useState([]);
  const [admLoading, setAdmLoading] = useState(false);
  const [admSearch, setAdmSearch] = useState('');
  const [admStatusFilter, setAdmStatusFilter] = useState('All');
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  // Notices State
  const [notices, setNotices] = useState([]);
  const [noticeLoading, setNoticeLoading] = useState(false);
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'Admission',
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
    desc: '',
    isNew: true
  });

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inqLoading, setInqLoading] = useState(false);

  // Check Auth
  useEffect(() => {
    const token = localStorage.getItem('ssa_admin_token');
    const userStr = localStorage.getItem('ssa_admin_user');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (userStr) {
      setAdminUser(JSON.parse(userStr));
    }
    fetchStats();
    fetchAdmissions();
    fetchNotices();
    fetchInquiries();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ssa_admin_token');
    localStorage.removeItem('ssa_admin_user');
    navigate('/admin/login');
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // --- Admissions API ---
  const fetchAdmissions = async () => {
    setAdmLoading(true);
    try {
      let url = '/api/admissions';
      const params = new URLSearchParams();
      if (admStatusFilter !== 'All') params.append('status', admStatusFilter);
      if (admSearch) params.append('search', admSearch);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setAdmissions(data.data);
    } catch (err) {
      console.error('Error fetching admissions:', err);
    } finally {
      setAdmLoading(false);
    }
  };

  const updateAdmissionStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setAdmissions(prev => prev.map(a => a._id === id ? data.data : a));
        fetchStats();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteAdmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admission record?')) return;
    try {
      const res = await fetch(`/api/admissions/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setAdmissions(prev => prev.filter(a => a._id !== id));
        fetchStats();
      }
    } catch (err) {
      alert('Failed to delete admission');
    }
  };

  // --- Notices API ---
  const fetchNotices = async () => {
    setNoticeLoading(true);
    try {
      const res = await fetch('/api/notices');
      const data = await res.json();
      if (data.success) setNotices(data.data);
    } catch (err) {
      console.error('Error fetching notices:', err);
    } finally {
      setNoticeLoading(false);
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice)
      });
      const data = await res.json();
      if (data.success) {
        setNotices(prev => [data.data, ...prev]);
        setShowNoticeForm(false);
        setNewNotice({
          title: '',
          category: 'Admission',
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
          desc: '',
          isNew: true
        });
        fetchStats();
        alert('Notice published successfully to MongoDB & live website!');
      }
    } catch (err) {
      alert('Failed to publish notice');
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm('Delete this notice from website?')) return;
    try {
      const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setNotices(prev => prev.filter(n => n._id !== id));
        fetchStats();
      }
    } catch (err) {
      alert('Failed to delete notice');
    }
  };

  // --- Inquiries API ---
  const fetchInquiries = async () => {
    setInqLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success) setInquiries(data.data);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setInqLoading(false);
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(prev => prev.map(i => i._id === id ? data.data : i));
        fetchStats();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setInquiries(prev => prev.filter(i => i._id !== id));
        fetchStats();
      }
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Admin Navigation Header */}
      <header
        style={{
          background: 'linear-gradient(90deg, #052445 0%, #0c58a2 100%)',
          color: '#ffffff',
          padding: '14px 0',
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ width: '44px', height: '44px', background: '#fff', borderRadius: '8px', padding: '2px' }}
            />
            <div>
              <h5 className="fw-bold mb-0 text-white" style={{ fontSize: '1.1rem' }}>
                {schoolInfo.name}
              </h5>
              <div className="d-flex align-items-center gap-2 small text-light opacity-75">
                <span>Admin Console</span>
                <span>&bull;</span>
                <span className="badge bg-success" style={{ fontSize: '0.7rem' }}>
                  <i className="fas fa-database me-1"></i> MongoDB Atlas Connected
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="small text-white d-none d-md-inline">
              <i className="fas fa-user-shield text-warning me-1"></i> {adminUser?.name || 'Administrator'}
            </span>
            <Link to="/" className="btn btn-outline-light btn-sm" target="_blank" rel="noreferrer">
              <i className="fas fa-external-link-alt me-1"></i> View Live Site
            </Link>
            <button onClick={handleLogout} className="btn btn-warning btn-sm fw-bold">
              <i className="fas fa-sign-out-alt me-1"></i> Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="container py-4 flex-grow-1">
        {/* Metric Overview Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="small text-muted fw-bold d-block">Total Admissions</span>
                  <h3 className="fw-bold text-primary mb-0 mt-1">{stats.totalAdmissions}</h3>
                </div>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                  <i className="fas fa-user-graduate"></i>
                </div>
              </div>
              <span className="small text-warning fw-semibold mt-2 d-block">
                <i className="fas fa-clock me-1"></i> {stats.pendingAdmissions} Pending Review
              </span>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="small text-muted fw-bold d-block">Active Circulars</span>
                  <h3 className="fw-bold text-success mb-0 mt-1">{stats.totalNotices}</h3>
                </div>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                  <i className="fas fa-bullhorn"></i>
                </div>
              </div>
              <span className="small text-muted mt-2 d-block">Live on Notice Board</span>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="small text-muted fw-bold d-block">Parent Inquiries</span>
                  <h3 className="fw-bold text-dark mb-0 mt-1">{stats.totalInquiries}</h3>
                </div>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                  <i className="fas fa-envelope-open-text"></i>
                </div>
              </div>
              <span className="small text-danger fw-semibold mt-2 d-block">
                <i className="fas fa-bell me-1"></i> {stats.newInquiries} New Inquiries
              </span>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="small text-muted fw-bold d-block">Database</span>
                  <h5 className="fw-bold text-success mb-0 mt-1">MongoDB Cloud</h5>
                </div>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: '#f3e8ff', color: '#7e22ce', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                  <i className="fas fa-server"></i>
                </div>
              </div>
              <span className="small text-success mt-2 d-block">
                <i className="fas fa-circle me-1" style={{ fontSize: '0.6rem' }}></i> Cluster Active
              </span>
            </div>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="tab-nav-wrapper justify-content-start mb-4">
          <button
            className={`tab-btn ${activeTab === 'admissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('admissions')}
          >
            <i className="fas fa-user-graduate me-1"></i> Admissions ({stats.totalAdmissions})
          </button>
          <button
            className={`tab-btn ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            <i className="fas fa-bullhorn me-1"></i> Manage Circulars ({stats.totalNotices})
          </button>
          <button
            className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <i className="fas fa-envelope me-1"></i> Parent Inquiries ({stats.totalInquiries})
          </button>
        </div>

        {/* ========================================================
            TAB 1: ADMISSIONS MANAGEMENT
            ======================================================== */}
        {activeTab === 'admissions' && (
          <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
            <div className="card-header bg-white p-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ maxWidth: '400px' }}>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="🔍 Search student name, app no, mobile..."
                  value={admSearch}
                  onChange={(e) => setAdmSearch(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && fetchAdmissions()}
                />
                <button onClick={fetchAdmissions} className="btn btn-sm btn-primary">
                  Search
                </button>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="small text-muted">Filter:</span>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 'auto' }}
                  value={admStatusFilter}
                  onChange={(e) => {
                    setAdmStatusFilter(e.target.value);
                  }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button onClick={fetchAdmissions} className="btn btn-sm btn-outline-secondary" title="Refresh">
                  <i className="fas fa-sync-alt"></i>
                </button>
              </div>
            </div>

            <div className="card-body p-0">
              {admLoading ? (
                <div className="p-5 text-center text-muted">
                  <i className="fas fa-spinner fa-spin fa-2x mb-2"></i>
                  <p className="small mb-0">Loading admissions from MongoDB database...</p>
                </div>
              ) : admissions.length === 0 ? (
                <div className="p-5 text-center text-muted">
                  <i className="fas fa-folder-open fa-3x mb-3 text-secondary opacity-50"></i>
                  <h6 className="fw-bold">No Admission Records Found</h6>
                  <p className="small mb-0">New parent online applications will appear here automatically.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="custom-table mb-0">
                    <thead>
                      <tr>
                        <th>App No.</th>
                        <th>Student Name</th>
                        <th>Class</th>
                        <th>Date of Birth</th>
                        <th>Father &amp; Mother</th>
                        <th>Mobile</th>
                        <th>Transport</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissions.map((adm) => (
                        <tr key={adm._id}>
                          <td>
                            <strong className="badge bg-light text-primary border" style={{ fontSize: '0.82rem' }}>
                              {adm.appNumber}
                            </strong>
                          </td>
                          <td className="fw-bold text-dark">{adm.studentName}</td>
                          <td>
                            <span className="badge bg-primary bg-opacity-10 text-primary border" style={{ fontSize: '0.75rem' }}>
                              {adm.applyingClass}
                            </span>
                          </td>
                          <td className="small text-muted">{adm.dob}</td>
                          <td className="small">
                            <div><strong>F:</strong> {adm.fatherName}</div>
                            <div className="text-muted"><strong>M:</strong> {adm.motherName}</div>
                          </td>
                          <td className="small">
                            <a href={`tel:${adm.mobile}`} className="text-primary fw-semibold">{adm.mobile}</a>
                            {adm.whatsapp && (
                              <a
                                href={`https://wa.me/91${adm.whatsapp}?text=Hello%20${adm.fatherName},%20regarding%20${adm.studentName}'s%20admission%20at%20Swami%20Shiwanand%20Academy`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-success ms-2"
                                title="Chat on WhatsApp"
                              >
                                <i className="fab fa-whatsapp"></i>
                              </a>
                            )}
                          </td>
                          <td className="small text-muted">{adm.transportNeeded}</td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                color: adm.status === 'Approved' ? '#15803d' : adm.status === 'Rejected' ? '#b91c1c' : '#b45309',
                                background: adm.status === 'Approved' ? '#f0fdf4' : adm.status === 'Rejected' ? '#fef2f2' : '#fffbeb'
                              }}
                              value={adm.status}
                              onChange={(e) => updateAdmissionStatus(adm._id, e.target.value)}
                            >
                              <option value="Pending">⏳ Pending</option>
                              <option value="Approved">✅ Approved</option>
                              <option value="Contacted">📞 Contacted</option>
                              <option value="Rejected">❌ Rejected</option>
                            </select>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                onClick={() => setSelectedAdmission(adm)}
                                className="btn btn-sm btn-outline-primary py-1 px-2"
                                title="View & Print Slip"
                              >
                                <i className="fas fa-print"></i>
                              </button>
                              <button
                                onClick={() => deleteAdmission(adm._id)}
                                className="btn btn-sm btn-outline-danger py-1 px-2"
                                title="Delete Application"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: NOTICES MANAGEMENT
            ======================================================== */}
        {activeTab === 'notices' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-dark mb-0">Notice Board &amp; Circulars List</h5>
              <button
                onClick={() => setShowNoticeForm(!showNoticeForm)}
                className="btn btn-primary btn-sm fw-bold"
              >
                <i className={`fas fa-${showNoticeForm ? 'times' : 'plus'} me-1`}></i>
                {showNoticeForm ? 'Close Form' : 'Publish New Circular'}
              </button>
            </div>

            {/* Create Notice Form */}
            {showNoticeForm && (
              <div className="card shadow-sm border-0 rounded-3 mb-4 p-4 border" style={{ background: '#f8fafc' }}>
                <h6 className="fw-bold text-primary mb-3">
                  <i className="fas fa-bullhorn text-warning me-2"></i> Publish New School Notice
                </h6>
                <form onSubmit={handleCreateNotice}>
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label">Notice Title <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="e.g. Admission Notice for Session 2026-27"
                        value={newNotice.title}
                        onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={newNotice.category}
                        onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                      >
                        <option value="Admission">Admission</option>
                        <option value="Academics">Academics</option>
                        <option value="Events">Events</option>
                        <option value="Recruitment">Recruitment</option>
                        <option value="Health">Health</option>
                        <option value="General">General</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Publication Date <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="DD-MM-YYYY"
                        value={newNotice.date}
                        onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                      <div className="form-check mt-4">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isNewCheck"
                          checked={newNotice.isNew}
                          onChange={(e) => setNewNotice({ ...newNotice, isNew: e.target.checked })}
                        />
                        <label className="form-check-label fw-bold small" htmlFor="isNewCheck">
                          Mark with "NEW" flashing badge
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Full Circular Text / Description <span className="text-danger">*</span></label>
                      <textarea
                        className="form-control"
                        rows="3"
                        required
                        placeholder="Complete announcement text for parents and staff..."
                        value={newNotice.desc}
                        onChange={(e) => setNewNotice({ ...newNotice, desc: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-12 text-end">
                      <button type="submit" className="btn btn-warning fw-bold px-4">
                        <i className="fas fa-check-circle me-1"></i> Publish to MongoDB &amp; Notice Board
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Notices Table */}
            <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
              <div className="card-body p-0">
                {noticeLoading ? (
                  <div className="p-5 text-center text-muted">
                    <i className="fas fa-spinner fa-spin fa-2x mb-2"></i>
                    <p className="small mb-0">Loading notices...</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="custom-table mb-0">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Category</th>
                          <th>Title</th>
                          <th>Description Preview</th>
                          <th>Badge</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notices.map((n) => (
                          <tr key={n._id}>
                            <td className="small text-muted fw-semibold" style={{ whiteSpace: 'nowrap' }}>
                              {n.date}
                            </td>
                            <td>
                              <span className="badge bg-light text-primary border" style={{ fontSize: '0.75rem' }}>
                                {n.category}
                              </span>
                            </td>
                            <td className="fw-bold text-dark">{n.title}</td>
                            <td className="small text-muted" style={{ maxWidth: '350px' }}>
                              {n.desc.length > 90 ? `${n.desc.substring(0, 90)}...` : n.desc}
                            </td>
                            <td>
                              {n.isNew && (
                                <span className="badge bg-danger text-white px-2 py-1" style={{ fontSize: '0.7rem' }}>
                                  NEW
                                </span>
                              )}
                            </td>
                            <td>
                              <button
                                onClick={() => deleteNotice(n._id)}
                                className="btn btn-sm btn-outline-danger py-1 px-2"
                                title="Delete Notice"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: INQUIRIES MANAGEMENT
            ======================================================== */}
        {activeTab === 'inquiries' && (
          <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
            <div className="card-body p-0">
              {inqLoading ? (
                <div className="p-5 text-center text-muted">
                  <i className="fas fa-spinner fa-spin fa-2x mb-2"></i>
                  <p className="small mb-0">Loading parent inquiries from database...</p>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="p-5 text-center text-muted">
                  <i className="fas fa-inbox fa-3x mb-3 text-secondary opacity-50"></i>
                  <h6 className="fw-bold">No Inquiries Found</h6>
                  <p className="small mb-0">Messages submitted from the contact page will appear here.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Parent Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Child Age / Class</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inq) => (
                        <tr key={inq._id}>
                          <td className="small text-muted">
                            {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                          </td>
                          <td className="fw-bold text-dark">{inq.name}</td>
                          <td className="small">
                            <a href={`tel:${inq.phone}`} className="text-primary fw-semibold">{inq.phone}</a>
                          </td>
                          <td className="small text-muted">{inq.email || '—'}</td>
                          <td className="small text-primary fw-semibold">{inq.childAge || '—'}</td>
                          <td className="small" style={{ maxWidth: '300px' }}>{inq.message}</td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                color: inq.status === 'Responded' ? '#15803d' : inq.status === 'Archived' ? '#64748b' : '#b45309'
                              }}
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq._id, e.target.value)}
                            >
                              <option value="New">🔴 New</option>
                              <option value="Responded">🟢 Responded</option>
                              <option value="Archived">⚪ Archived</option>
                            </select>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <a
                                href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${inq.name},%20replying%20to%20your%20inquiry%20regarding%20Swami%20Shiwanand%20Academy`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-outline-success py-1 px-2"
                                title="Reply on WhatsApp"
                              >
                                <i className="fab fa-whatsapp"></i>
                              </a>
                              <button
                                onClick={() => deleteInquiry(inq._id)}
                                className="btn btn-sm btn-outline-danger py-1 px-2"
                                title="Delete"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Printable Admission Slip Modal */}
      {selectedAdmission && (
        <div className="modal-backdrop-custom" onClick={() => setSelectedAdmission(null)}>
          <div className="modal-content-custom modal-content-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h5><i className="fas fa-file-invoice text-warning me-2"></i> Candidate Admission Record</h5>
              <button className="modal-close-btn" onClick={() => setSelectedAdmission(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body-custom p-4">
              <div className="p-4 border rounded-3 bg-white" id="officialAdmissionSlip">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <img src="/images/logo.png" alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                    <div>
                      <h5 className="fw-bold text-primary mb-0">{schoolInfo.name}</h5>
                      <span className="small text-muted">{schoolInfo.address}</span>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-warning text-dark px-3 py-1 fw-bold fs-6">
                      {selectedAdmission.appNumber}
                    </span>
                    <div className="small text-muted mt-1">Status: {selectedAdmission.status}</div>
                  </div>
                </div>

                <div className="row g-3 small mb-4">
                  <div className="col-sm-6">
                    <strong>Student Name:</strong> <span className="fs-6 text-dark fw-bold">{selectedAdmission.studentName}</span>
                  </div>
                  <div className="col-sm-6">
                    <strong>Class Applying:</strong> <span className="text-primary fw-bold">{selectedAdmission.applyingClass}</span>
                  </div>
                  <div className="col-sm-6">
                    <strong>Date of Birth:</strong> {selectedAdmission.dob}
                  </div>
                  <div className="col-sm-6">
                    <strong>Gender:</strong> {selectedAdmission.gender}
                  </div>
                  <div className="col-sm-6">
                    <strong>Father's Name:</strong> {selectedAdmission.fatherName}
                  </div>
                  <div className="col-sm-6">
                    <strong>Mother's Name:</strong> {selectedAdmission.motherName}
                  </div>
                  <div className="col-sm-6">
                    <strong>Mobile Contact:</strong> {selectedAdmission.mobile}
                  </div>
                  <div className="col-sm-6">
                    <strong>Transport Opted:</strong> {selectedAdmission.transportNeeded}
                  </div>
                  <div className="col-12">
                    <strong>Address:</strong> {selectedAdmission.address}
                  </div>
                </div>

                <div className="pt-3 border-top d-flex justify-content-between align-items-end text-muted small">
                  <div>
                    <span>Application Date: {new Date(selectedAdmission.createdAt).toLocaleDateString('en-IN')}</span><br />
                    <span>School Counseling Desk: {schoolInfo.phones[0]}</span>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold text-dark">Principal / Admission Incharge</div>
                    <span>{schoolInfo.name}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-custom">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSelectedAdmission(null)}>
                Close
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => window.print()}>
                <i className="fas fa-print me-1"></i> Print Application Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
