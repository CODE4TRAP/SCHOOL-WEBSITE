import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { schoolInfo } from '../../data/content';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('admissions');
  const [adminUser, setAdminUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inqLoading, setInqLoading] = useState(false);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check Auth with Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const token = localStorage.getItem('ssa_admin_token');
      const userStr = localStorage.getItem('ssa_admin_user');

      if (!user && !token) {
        navigate('/admin/login');
        return;
      }

      if (userStr) {
        setAdminUser(JSON.parse(userStr));
      } else if (user) {
        setAdminUser({
          email: user.email,
          role: 'Administrator',
          name: user.displayName || 'Principal & Director Office'
        });
      }

      fetchStats();
      fetchAdmissions();
      fetchInquiries();
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('SignOut error:', err);
    }
    localStorage.removeItem('ssa_admin_token');
    localStorage.removeItem('ssa_admin_user');
    navigate('/admin/login');
  };

  // Fetch Institutional Statistics from Cloud Firestore
  const fetchStats = async () => {
    try {
      if (db) {
        const [admSnap, inqSnap] = await Promise.all([
          getDocs(collection(db, 'admissions')),
          getDocs(collection(db, 'inquiries'))
        ]);
        const totalAdmissions = admSnap.size;
        const pendingAdmissions = admSnap.docs.filter(d => (d.data().status || 'Pending') === 'Pending').length;
        const totalInquiries = inqSnap.size;
        const newInquiries = inqSnap.docs.filter(d => (d.data().status || 'New') === 'New').length;
        setStats({ totalAdmissions, pendingAdmissions, totalInquiries, newInquiries, totalNotices: 0 });
      }
    } catch (err) {
      console.error('Failed to fetch Firestore stats:', err);
    }
  };

  // --- Admissions API / Cloud Firestore ---
  const fetchAdmissions = async () => {
    setAdmLoading(true);
    try {
      if (db) {
        const snap = await getDocs(collection(db, 'admissions'));
        let list = snap.docs.map(d => {
          const data = d.data();
          const createdVal = data.createdAt;
          const createdStr = createdVal?.toDate ? createdVal.toDate().toISOString() : (createdVal ? String(createdVal) : new Date(0).toISOString());
          return {
            _id: d.id,
            id: d.id,
            ...data,
            createdAt: createdStr
          };
        });

        // In-memory sort descending by creation date
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        if (admStatusFilter !== 'All') {
          list = list.filter(a => a.status === admStatusFilter);
        }
        if (admSearch) {
          const term = admSearch.toLowerCase();
          list = list.filter(a =>
            (a.studentName && a.studentName.toLowerCase().includes(term)) ||
            (a.appNumber && a.appNumber.toLowerCase().includes(term)) ||
            (a.fatherName && a.fatherName.toLowerCase().includes(term)) ||
            (a.motherName && a.motherName.toLowerCase().includes(term)) ||
            (a.mobile && a.mobile.includes(term)) ||
            (a.category && a.category.toLowerCase().includes(term))
          );
        }

        setAdmissions(list);
      }
    } catch (err) {
      console.error('Error fetching admissions from Firestore:', err);
    } finally {
      setAdmLoading(false);
    }
  };

  const updateAdmissionStatus = async (id, newStatus) => {
    try {
      if (db) {
        await updateDoc(doc(db, 'admissions', id), {
          status: newStatus,
          updatedAt: serverTimestamp()
        });
        setAdmissions(prev => prev.map(a => (a._id === id || a.id === id ? { ...a, status: newStatus } : a)));
        if (selectedAdmission && (selectedAdmission._id === id || selectedAdmission.id === id)) {
          setSelectedAdmission(prev => ({ ...prev, status: newStatus }));
        }
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to update admission status:', err);
      alert('Failed to update status');
    }
  };

  const deleteAdmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admission record?')) return;
    try {
      if (db) {
        await deleteDoc(doc(db, 'admissions', id));
        setAdmissions(prev => prev.filter(a => a._id !== id && a.id !== id));
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to delete admission:', err);
      alert('Failed to delete admission');
    }
  };

  // --- Inquiries API / Cloud Firestore ---
  const fetchInquiries = async () => {
    setInqLoading(true);
    try {
      if (db) {
        const snap = await getDocs(collection(db, 'inquiries'));
        let list = snap.docs.map(d => {
          const data = d.data();
          const createdVal = data.createdAt;
          const createdStr = createdVal?.toDate ? createdVal.toDate().toISOString() : (createdVal ? String(createdVal) : new Date(0).toISOString());
          return {
            _id: d.id,
            id: d.id,
            ...data,
            createdAt: createdStr
          };
        });

        // In-memory sort descending by creation date
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setInquiries(list);
      }
    } catch (err) {
      console.error('Error fetching inquiries from Firestore:', err);
    } finally {
      setInqLoading(false);
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      if (db) {
        await updateDoc(doc(db, 'inquiries', id), {
          status,
          updatedAt: serverTimestamp()
        });
        setInquiries(prev => prev.map(i => (i._id === id || i.id === id ? { ...i, status } : i)));
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
      alert('Failed to update status');
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      if (db) {
        await deleteDoc(doc(db, 'inquiries', id));
        setInquiries(prev => prev.filter(i => i._id !== id && i.id !== id));
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
      alert('Failed to delete inquiry');
    }
  };

  const navItems = [
    { id: 'admissions', icon: 'how_to_reg', label: 'Registration Details', count: stats.totalAdmissions },
    { id: 'inquiries', icon: 'contact_mail', label: 'Enquiries Info', count: stats.totalInquiries },
  ];

  const statusColor = (status) => {
    switch (status) {
      case 'Approved': return { bg: '#05966914', text: '#059669', border: '#05966930' };
      case 'Rejected': return { bg: '#dc262614', text: '#dc2626', border: '#dc262630' };
      case 'Contacted': return { bg: '#2563eb14', text: '#2563eb', border: '#2563eb30' };
      default: return { bg: '#f59e0b14', text: '#f59e0b', border: '#f59e0b30' };
    }
  };

  return (
    <div className="adm-shell">
      {/* ─── SIDEBAR ─── */}
      <aside className={`adm-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="adm-sidebar-brand">
          <img src="/images/logo.png" alt="Logo" className="adm-sidebar-logo" />
          {!sidebarCollapsed && (
            <div className="adm-sidebar-brand-text">
              <span className="adm-brand-name">SSA Admin</span>
              <span className="adm-brand-sub">Registrations &amp; Enquiries</span>
            </div>
          )}
        </div>

        <nav className="adm-sidebar-nav">
          <div className="adm-nav-section-label">{!sidebarCollapsed && 'Core Modules'}</div>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`adm-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
            >
              <span className="material-symbols-outlined adm-nav-icon">{item.icon}</span>
              {!sidebarCollapsed && (
                <>
                  <span className="adm-nav-label">{item.label}</span>
                  {item.count > 0 && (
                    <span className="adm-nav-badge">{item.count}</span>
                  )}
                </>
              )}
            </button>
          ))}

          <div className="adm-nav-section-label" style={{ marginTop: '24px' }}>{!sidebarCollapsed && 'Quick Actions'}</div>
          <Link to="/" target="_blank" rel="noreferrer" className="adm-nav-item" title="View Live Site">
            <span className="material-symbols-outlined adm-nav-icon">language</span>
            {!sidebarCollapsed && <span className="adm-nav-label">View Live Site</span>}
          </Link>
        </nav>

        <div className="adm-sidebar-footer">
          <button
            className="adm-collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand' : 'Collapse'}
          >
            <span className="material-symbols-outlined">
              {sidebarCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="adm-main">
        {/* Top Header Bar */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button className="adm-mobile-menu-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="adm-breadcrumb">
              <span className="adm-breadcrumb-root">Admin Portal</span>
              <span className="material-symbols-outlined adm-breadcrumb-sep">chevron_right</span>
              <span className="adm-breadcrumb-current">
                {activeTab === 'admissions' && 'Registration Details'}
                {activeTab === 'inquiries' && 'Enquiries Info'}
              </span>
            </div>
          </div>

          <div className="adm-topbar-right">
            <div className="adm-live-clock">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
              <span>{currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
            <div className="adm-db-status">
              <span className="adm-status-dot"></span>
              <span>Cloud Firestore</span>
            </div>
            <div className="adm-user-chip">
              <div className="adm-user-avatar">
                {(adminUser?.name || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="adm-user-info">
                <span className="adm-user-name">{adminUser?.name || 'Administrator'}</span>
                <span className="adm-user-role">{adminUser?.role || 'Super Admin'}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="adm-logout-btn" title="Log Out">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <div className="adm-content">
          {/* ─── STATS OVERVIEW CARDS ─── */}
          <div className="adm-stats-grid">
            <div className="adm-stat-card adm-stat-blue">
              <div className="adm-stat-icon-wrap">
                <span className="material-symbols-outlined">how_to_reg</span>
              </div>
              <div className="adm-stat-info">
                <span className="adm-stat-number">{stats.totalAdmissions}</span>
                <span className="adm-stat-label">Total Registrations</span>
              </div>
              <div className="adm-stat-footer">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>pending_actions</span>
                <span>{stats.pendingAdmissions} Pending Review</span>
              </div>
            </div>

            <div className="adm-stat-card adm-stat-emerald">
              <div className="adm-stat-icon-wrap">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <div className="adm-stat-info">
                <span className="adm-stat-number">
                  {admissions.filter(a => a.status === 'Approved').length}
                </span>
                <span className="adm-stat-label">Approved Registrations</span>
              </div>
              <div className="adm-stat-footer">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check_circle</span>
                <span>Confirmed Seats</span>
              </div>
            </div>

            <div className="adm-stat-card adm-stat-amber">
              <div className="adm-stat-icon-wrap">
                <span className="material-symbols-outlined">contact_mail</span>
              </div>
              <div className="adm-stat-info">
                <span className="adm-stat-number">{stats.totalInquiries}</span>
                <span className="adm-stat-label">Parent Enquiries</span>
              </div>
              <div className="adm-stat-footer">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>mark_email_unread</span>
                <span>{stats.newInquiries || inquiries.filter(i => i.status === 'New').length} New Enquiries</span>
              </div>
            </div>

            <div className="adm-stat-card adm-stat-violet">
              <div className="adm-stat-icon-wrap">
                <span className="material-symbols-outlined">cloud_done</span>
              </div>
              <div className="adm-stat-info">
                <span className="adm-stat-number" style={{ fontSize: '1.4rem' }}>Cloud DB</span>
                <span className="adm-stat-label">Cloud Firestore</span>
              </div>
              <div className="adm-stat-footer">
                <span className="adm-status-dot" style={{ width: '8px', height: '8px' }}></span>
                <span>Firestore Connected</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              TAB 1: REGISTRATIONS MANAGEMENT
              ═══════════════════════════════════════ */}
          {activeTab === 'admissions' && (
            <div className="adm-panel" style={{ animationDelay: '0.05s' }}>
              <div className="adm-panel-header">
                <div className="adm-panel-title-group">
                  <span className="material-symbols-outlined adm-panel-icon">how_to_reg</span>
                  <div>
                    <h2 className="adm-panel-title">Registration Details &amp; Applications</h2>
                    <p className="adm-panel-subtitle">Review student registration details and update admission approval status</p>
                  </div>
                </div>

                <div className="adm-panel-actions">
                  <div className="adm-search-box">
                    <span className="material-symbols-outlined adm-search-icon">search</span>
                    <input
                      type="text"
                      className="adm-search-input"
                      placeholder="Search name, app no, mobile..."
                      value={admSearch}
                      onChange={(e) => setAdmSearch(e.target.value)}
                      onKeyUp={(e) => e.key === 'Enter' && fetchAdmissions()}
                    />
                  </div>
                  <select
                    className="adm-filter-select"
                    value={admStatusFilter}
                    onChange={(e) => setAdmStatusFilter(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button onClick={fetchAdmissions} className="adm-icon-btn" title="Search / Refresh">
                    <span className="material-symbols-outlined">refresh</span>
                  </button>
                </div>
              </div>

              <div className="adm-panel-body">
                {admLoading ? (
                  <div className="adm-empty-state">
                    <div className="adm-spinner"></div>
                    <p>Loading admissions from database...</p>
                  </div>
                ) : admissions.length === 0 ? (
                  <div className="adm-empty-state">
                    <span className="material-symbols-outlined adm-empty-icon">folder_open</span>
                    <h3>No Admission Records Found</h3>
                    <p>New parent online applications will appear here automatically.</p>
                  </div>
                ) : (
                  <div className="adm-table-wrap">
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>App No.</th>
                          <th>Student Name</th>
                          <th>Class</th>
                          <th>DOB &amp; Age</th>
                          <th>Father &amp; Mother</th>
                          <th>Contacts</th>
                          <th>Category / Caste</th>
                          <th>Transport</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admissions.map((adm, idx) => (
                          <tr key={adm._id} style={{ animationDelay: `${idx * 0.03}s` }}>
                            <td>
                              <span className="adm-badge adm-badge-id">{adm.appNumber}</span>
                            </td>
                            <td className="adm-cell-primary">
                              <span style={{ fontWeight: 700, cursor: 'pointer', color: '#1e3a8a' }} onClick={() => setSelectedAdmission(adm)} title="Click to view candidate record">
                                {adm.studentName}
                              </span>
                              {adm.gender && <div className="small text-muted" style={{ fontSize: '11px' }}>{adm.gender}</div>}
                            </td>
                            <td>
                              <span className="adm-badge adm-badge-class">{adm.applyingClass}</span>
                            </td>
                            <td className="adm-cell-muted">
                              <div>{adm.dob}</div>
                              {(adm.ageYear || adm.ageMonth) && (
                                <div className="small text-secondary" style={{ fontSize: '11px' }}>
                                  {adm.ageYear ? `${adm.ageYear}y ` : ''}{adm.ageMonth ? `${adm.ageMonth}m` : ''}
                                </div>
                              )}
                            </td>
                            <td className="adm-cell-parents">
                              <div><strong>F:</strong> {adm.fatherName}</div>
                              <div className="adm-cell-muted"><strong>M:</strong> {adm.motherName}</div>
                            </td>
                            <td>
                              <div>
                                <a href={`tel:${adm.mobile || adm.fatherContact || adm.motherContact}`} className="adm-phone-link">
                                  {adm.mobile || adm.fatherContact || adm.motherContact}
                                </a>
                              </div>
                              <div className="d-flex align-items-center gap-1 mt-1">
                                {(adm.whatsapp || adm.mobile) && (
                                  <a
                                    href={`https://wa.me/91${(adm.whatsapp || adm.mobile).replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(adm.fatherName || adm.studentName)},%20regarding%20${encodeURIComponent(adm.studentName)}'s%20admission%20application%20(${adm.appNumber})%20at%20Swami%20Shiwanand%20Academy`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="adm-wa-link"
                                    title="Chat with Parent on WhatsApp"
                                  >
                                    <i className="fab fa-whatsapp"></i>
                                  </a>
                                )}
                                {adm.email && (
                                  <a href={`mailto:${adm.email}`} className="text-secondary small" title={adm.email}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>email</span>
                                  </a>
                                )}
                              </div>
                            </td>
                            <td>
                              <div>{adm.category || adm.caste || '—'}</div>
                              {adm.bpl === 'Yes' && (
                                <span className="badge bg-warning-subtle text-warning-emphasis px-1 py-0 small" style={{ fontSize: '10px' }}>
                                  BPL
                                </span>
                              )}
                            </td>
                            <td className="adm-cell-muted">{adm.transportNeeded}</td>
                            <td>
                              <select
                                className="adm-status-select"
                                style={{
                                  color: statusColor(adm.status).text,
                                  background: statusColor(adm.status).bg,
                                  borderColor: statusColor(adm.status).border
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
                              <div className="adm-action-group">
                                <button
                                  onClick={() => setSelectedAdmission(adm)}
                                  className="adm-action-btn adm-action-view"
                                  title="View Candidate Record & Details"
                                  style={{ background: '#0b57d018', color: '#0b57d0' }}
                                >
                                  <span className="material-symbols-outlined">description</span>
                                </button>
                                <button onClick={() => deleteAdmission(adm._id)} className="adm-action-btn adm-action-delete" title="Delete Application">
                                  <span className="material-symbols-outlined">delete</span>
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

          {/* ═══════════════════════════════════════
              TAB 2: ENQUIRIES MANAGEMENT
              ═══════════════════════════════════════ */}
          {activeTab === 'inquiries' && (
            <div className="adm-panel" style={{ animationDelay: '0.05s' }}>
              <div className="adm-panel-header">
                <div className="adm-panel-title-group">
                  <span className="material-symbols-outlined adm-panel-icon">contact_mail</span>
                  <div>
                    <h2 className="adm-panel-title">Enquiries Info &amp; Parent Messages</h2>
                    <p className="adm-panel-subtitle">Review contact messages, student inquiries &amp; counselor followup status</p>
                  </div>
                </div>
              </div>

              <div className="adm-panel-body">
                {inqLoading ? (
                  <div className="adm-empty-state">
                    <div className="adm-spinner"></div>
                    <p>Loading parent inquiries...</p>
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="adm-empty-state">
                    <span className="material-symbols-outlined adm-empty-icon">inbox</span>
                    <h3>No Inquiries Found</h3>
                    <p>Messages submitted from the contact page will appear here.</p>
                  </div>
                ) : (
                  <div className="adm-table-wrap">
                    <table className="adm-table">
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
                        {inquiries.map((inq, idx) => (
                          <tr key={inq._id} style={{ animationDelay: `${idx * 0.03}s` }}>
                            <td className="adm-cell-muted">
                              {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                            </td>
                            <td className="adm-cell-primary">{inq.name}</td>
                            <td>
                              <a href={`tel:${inq.phone}`} className="adm-phone-link">{inq.phone}</a>
                            </td>
                            <td className="adm-cell-muted">{inq.email || '—'}</td>
                            <td style={{ color: '#2563eb', fontWeight: 600 }}>{inq.childAge || '—'}</td>
                            <td className="adm-cell-muted" style={{ maxWidth: '280px' }}>{inq.message}</td>
                            <td>
                              <select
                                className="adm-status-select"
                                style={{
                                  color: inq.status === 'Responded' ? '#059669' : inq.status === 'Archived' ? '#64748b' : '#f59e0b',
                                  background: inq.status === 'Responded' ? '#05966914' : inq.status === 'Archived' ? '#64748b14' : '#f59e0b14'
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
                              <div className="adm-action-group">
                                <a
                                  href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${inq.name},%20replying%20to%20your%20inquiry%20regarding%20Swami%20Shiwanand%20Academy`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="adm-action-btn adm-action-wa"
                                  title="Reply on WhatsApp"
                                >
                                  <i className="fab fa-whatsapp"></i>
                                </a>
                                <button onClick={() => deleteInquiry(inq._id)} className="adm-action-btn adm-action-delete" title="Delete">
                                  <span className="material-symbols-outlined">delete</span>
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
      </div>

      {/* ─── CANDIDATE ADMISSION RECORD MODAL ─── */}
      {selectedAdmission && (
        <div className="adm-modal-overlay" onClick={() => setSelectedAdmission(null)}>
          <div className="adm-modal" style={{ maxWidth: '840px' }} onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div className="adm-modal-title-group">
                <span className="material-symbols-outlined" style={{ color: '#0b57d0', fontSize: '26px' }}>assignment_ind</span>
                <div>
                  <h3 style={{ margin: 0 }}>Candidate Admission Record</h3>
                  <div className="small text-muted">
                    {selectedAdmission.studentName} &bull; App No: <strong className="text-primary">{selectedAdmission.appNumber}</strong>
                  </div>
                </div>
              </div>
              <button className="adm-modal-close" onClick={() => setSelectedAdmission(null)} aria-label="Close modal">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Quick Admin Actions Strip */}
            <div style={{ background: '#f8fafc', padding: '12px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div className="d-flex align-items-center gap-2">
                <span className="small fw-bold text-dark">Admission Status:</span>
                <select
                  className="adm-status-select"
                  style={{
                    color: statusColor(selectedAdmission.status).text,
                    background: statusColor(selectedAdmission.status).bg,
                    borderColor: statusColor(selectedAdmission.status).border,
                    fontWeight: 700
                  }}
                  value={selectedAdmission.status}
                  onChange={(e) => updateAdmissionStatus(selectedAdmission._id, e.target.value)}
                >
                  <option value="Pending">⏳ Pending Review</option>
                  <option value="Approved">✅ Approved (Confirmed Seat)</option>
                  <option value="Contacted">📞 Contacted Parent</option>
                  <option value="Rejected">❌ Rejected</option>
                </select>
              </div>

              <div className="d-flex align-items-center gap-2">
                {(selectedAdmission.whatsapp || selectedAdmission.mobile) && (
                  <a
                    href={`https://wa.me/91${(selectedAdmission.whatsapp || selectedAdmission.mobile).replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedAdmission.fatherName || selectedAdmission.studentName)},%20this%20is%20Swami%20Shiwanand%20Academy%20Admissions%20Office%20regarding%20${encodeURIComponent(selectedAdmission.studentName)}'s%20admission%20application%20(${selectedAdmission.appNumber}).`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-success fw-bold d-inline-flex align-items-center gap-1"
                    title="Send WhatsApp Message"
                  >
                    <i className="fab fa-whatsapp"></i> WhatsApp Parent
                  </a>
                )}
                <a
                  href={`tel:${selectedAdmission.mobile || selectedAdmission.fatherContact || selectedAdmission.motherContact}`}
                  className="btn btn-sm btn-outline-primary fw-bold d-inline-flex align-items-center gap-1"
                  title="Call Parent"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>call</span> Call
                </a>
              </div>
            </div>

            <div className="adm-modal-body" style={{ background: '#f8fafc', padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="row g-4">
                {/* Section 1: Candidate Profile */}
                <div className="col-12">
                  <div className="p-3 bg-white rounded-3 shadow-sm border">
                    <h5 className="fw-bold text-primary mb-3 d-flex align-items-center gap-2 border-bottom pb-2">
                      <span className="material-symbols-outlined fs-5">school</span>
                      1. Student Academic &amp; Personal Profile
                    </h5>
                    <div className="row g-3">
                      <div className="col-12 col-md-4">
                        <span className="text-muted small d-block">Candidate Full Name</span>
                        <strong className="text-dark fs-6">{selectedAdmission.studentName}</strong>
                      </div>
                      <div className="col-6 col-md-4">
                        <span className="text-muted small d-block">Applying For Class</span>
                        <span className="badge bg-primary text-white fw-bold px-2 py-1">{selectedAdmission.applyingClass}</span>
                      </div>
                      <div className="col-6 col-md-4">
                        <span className="text-muted small d-block">Gender</span>
                        <strong className="text-dark">{selectedAdmission.gender || '—'}</strong>
                      </div>
                      <div className="col-6 col-md-4">
                        <span className="text-muted small d-block">Date of Birth</span>
                        <strong className="text-dark">{selectedAdmission.dob || '—'}</strong>
                      </div>
                      <div className="col-6 col-md-4">
                        <span className="text-muted small d-block">Calculated Age</span>
                        <span className="text-dark">{selectedAdmission.ageYear ? `${selectedAdmission.ageYear} Yrs ` : ''}{selectedAdmission.ageMonth ? `${selectedAdmission.ageMonth} Mos` : '—'}</span>
                      </div>
                      <div className="col-6 col-md-4">
                        <span className="text-muted small d-block">Social Category / Caste</span>
                        <strong className="text-dark">{selectedAdmission.category || selectedAdmission.caste || '—'}</strong>
                      </div>
                      <div className="col-12 col-md-6">
                        <span className="text-muted small d-block">Previous School Attended</span>
                        <span className="text-dark">{selectedAdmission.prevSchool || 'None / Fresh Admission'}</span>
                      </div>
                      <div className="col-12 col-md-6">
                        <span className="text-muted small d-block">School Transport Required</span>
                        <span className="text-dark">{selectedAdmission.transportNeeded === 'Yes' ? `Yes (${selectedAdmission.busStop || 'Stop TBD'})` : 'No (Self Conveyance)'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Parents & Contact Info */}
                <div className="col-12">
                  <div className="p-3 bg-white rounded-3 shadow-sm border">
                    <h5 className="fw-bold text-success mb-3 d-flex align-items-center gap-2 border-bottom pb-2">
                      <span className="material-symbols-outlined fs-5">family_restroom</span>
                      2. Parent &amp; Family Details
                    </h5>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <span className="text-muted small d-block">Father / Guardian Name</span>
                        <strong className="text-dark">{selectedAdmission.fatherName}</strong>
                        {selectedAdmission.fatherOccupation && (
                          <div className="small text-muted">Occupation: {selectedAdmission.fatherOccupation}</div>
                        )}
                      </div>
                      <div className="col-12 col-md-6">
                        <span className="text-muted small d-block">Mother's Name</span>
                        <strong className="text-dark">{selectedAdmission.motherName || '—'}</strong>
                        {selectedAdmission.motherOccupation && (
                          <div className="small text-muted">Occupation: {selectedAdmission.motherOccupation}</div>
                        )}
                      </div>
                      <div className="col-6 col-md-4">
                        <span className="text-muted small d-block">Primary Contact Number</span>
                        <a href={`tel:${selectedAdmission.mobile}`} className="fw-bold text-primary text-decoration-none">{selectedAdmission.mobile}</a>
                      </div>
                      <div className="col-6 col-md-4">
                        <span className="text-muted small d-block">WhatsApp Number</span>
                        <span className="text-dark">{selectedAdmission.whatsapp || selectedAdmission.mobile || '—'}</span>
                      </div>
                      <div className="col-12 col-md-4">
                        <span className="text-muted small d-block">Email Address</span>
                        <span className="text-dark">{selectedAdmission.email || 'Not Provided'}</span>
                      </div>
                      <div className="col-12">
                        <span className="text-muted small d-block">Residential Address</span>
                        <span className="text-dark">{selectedAdmission.address || '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Central Database Record Information */}
                <div className="col-12">
                  <div className="p-3 bg-white rounded-3 shadow-sm border">
                    <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2 border-bottom pb-2">
                      <span className="material-symbols-outlined fs-5">dns</span>
                      3. Central Database Record Details
                    </h5>
                    <div className="row g-3">
                      <div className="col-6 col-md-3">
                        <span className="text-muted small d-block">Permanent App No</span>
                        <strong className="text-primary">{selectedAdmission.appNumber}</strong>
                      </div>
                      <div className="col-6 col-md-3">
                        <span className="text-muted small d-block">Current Status</span>
                        <span className="badge" style={{ ...statusColor(selectedAdmission.status), border: `1px solid ${statusColor(selectedAdmission.status).border}` }}>
                          {selectedAdmission.status}
                        </span>
                      </div>
                      <div className="col-12 col-md-3">
                        <span className="text-muted small d-block">Submission Timestamp</span>
                        <span className="small text-dark">{selectedAdmission.createdAt ? new Date(selectedAdmission.createdAt).toLocaleString('en-IN') : '—'}</span>
                      </div>
                      <div className="col-12 col-md-3">
                        <span className="text-muted small d-block">Firestore Document ID</span>
                        <span className="small font-monospace text-muted">{selectedAdmission._id || selectedAdmission.id}</span>
                      </div>
                      {selectedAdmission.remarks && (
                        <div className="col-12">
                          <span className="text-muted small d-block">Special Notes / Medical Remarks</span>
                          <span className="text-dark">{selectedAdmission.remarks}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="adm-modal-footer">
              <button className="adm-secondary-btn" onClick={() => setSelectedAdmission(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
