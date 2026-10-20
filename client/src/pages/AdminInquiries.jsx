import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, RefreshCw, Trash2, CheckCircle, Clock, Phone, Mail, User, Shield } from 'lucide-react';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [notification, setNotification] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      let url = '/api/inquiries';
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInquiries();
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setNotification(`Inquiry ${id} status updated to ${newStatus}`);
        setTimeout(() => setNotification(''), 3000);
        fetchInquiries();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm(`Are you sure you want to delete inquiry ${id}?`)) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setNotification(`Inquiry ${id} removed`);
        setTimeout(() => setNotification(''), 3000);
        fetchInquiries();
      }
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return <span className="status-pill status-new">New</span>;
      case 'Contacted': return <span className="status-pill status-contacted">Contacted</span>;
      case 'Assessment Scheduled': return <span className="status-pill status-scheduled">Scheduled</span>;
      case 'Closed': return <span className="status-pill status-closed">Closed</span>;
      default: return <span className="status-pill">{status}</span>;
    }
  };

  return (
    <div className="admin-page fade-in">
      <div className="container" style={{ padding: '30px 20px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Staff Portal</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            <div className="tag tag-amber" style={{ marginBottom: 8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Shield size={14} />
              <span>Staff CRM Portal</span>
            </div>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>Consultation Inquiries &amp; Leads</h1>
          </div>

          <button 
            className="btn btn-outline btn-sm" 
            onClick={fetchInquiries}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <RefreshCw size={14} />
            <span>Refresh Leads</span>
          </button>
        </div>

        {notification && (
          <div style={{ background: 'var(--teal-light)', color: 'var(--teal)', padding: '10px 18px', borderRadius: 'var(--radius-md)', marginBottom: 20, fontWeight: 600 }}>
            {notification}
          </div>
        )}

        {/* Filter Controls */}
        <div className="card" style={{ padding: '18px 24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['all', 'New', 'Contacted', 'Assessment Scheduled', 'Closed'].map((s) => (
                <button
                  key={s}
                  className={`btn btn-sm ${statusFilter === s ? 'btn-teal' : 'btn-outline'}`}
                  onClick={() => setStatusFilter(s)}
                >
                  {s === 'all' ? 'All Leads' : s}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                className="form-input"
                style={{ width: '220px', padding: '8px 12px' }}
                placeholder="Search name, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Search size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>Contact</th>
                <th>Visa &amp; Destination</th>
                <th>Message / Details</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px' }}>
                    Loading consultation records from Express server...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px', color: 'var(--ink-muted)' }}>
                    No consultation inquiries found.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td><b>{inq.id}</b></td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{inq.name}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem' }}>
                        <Phone size={13} style={{ color: 'var(--teal)' }} />
                        <a href={`tel:${inq.phone}`}>{inq.phone}</a>
                      </div>
                      {inq.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                          <Mail size={12} />
                          <span>{inq.email}</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="tag" style={{ fontSize: '0.75rem', marginBottom: 4 }}>{inq.visaType}</span>
                      <div style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)' }}>{inq.destination}</div>
                      {inq.timeSlot && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--teal)', fontWeight: 600, marginTop: 4 }}>
                          🕒 {inq.timeSlot}
                        </div>
                      )}
                    </td>
                    <td style={{ maxWidth: '240px' }}>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink-secondary)', whiteSpace: 'normal' }}>
                        {inq.message || inq.experience || 'No additional message provided.'}
                      </p>
                    </td>
                    <td>
                      {getStatusBadge(inq.status)}
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <select 
                          value={inq.status} 
                          onChange={(e) => updateStatus(inq.id, e.target.value)}
                          style={{ padding: '4px 6px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Assessment Scheduled">Scheduled</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <button 
                          className="btn btn-icon-only" 
                          style={{ width: 28, height: 28, color: 'var(--stamp)', border: 'none' }}
                          title="Delete Lead"
                          onClick={() => deleteInquiry(inq.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
