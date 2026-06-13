'use client';

import React, { useState, useEffect } from 'react';

// Registration Interface matching backend db schema
interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  industry: string;
  referral: string;
  dietary: string[];
  requirements: string;
  isFundraising: boolean;
  investmentStage: string;
  helpNeeded: string;
  createdAt: string;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedFundraising, setSelectedFundraising] = useState('all');

  // Attempt to load passcode from sessionStorage on mount
  useEffect(() => {
    const savedPasscode = sessionStorage.getItem('admin_passcode');
    if (savedPasscode) {
      verifyAndFetch(savedPasscode);
    }
  }, []);

  const verifyAndFetch = async (codeToVerify: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`/api/admin/registrations?passcode=${encodeURIComponent(codeToVerify)}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setRegistrations(data.registrations);
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_passcode', codeToVerify);
        setPasscode(codeToVerify);
      } else {
        setAuthError(data.message || 'Invalid passcode. Please try again.');
        sessionStorage.removeItem('admin_passcode');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setAuthError('Network error. Failed to reach server.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError('Please enter a passcode.');
      return;
    }
    verifyAndFetch(passcode);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_passcode');
    setIsAuthenticated(false);
    setRegistrations([]);
    setPasscode('');
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry = selectedIndustry === '' || reg.industry === selectedIndustry;
    
    let matchesFundraising = true;
    if (selectedFundraising === 'yes') {
      matchesFundraising = reg.isFundraising === true;
    } else if (selectedFundraising === 'no') {
      matchesFundraising = reg.isFundraising === false;
    }

    return matchesSearch && matchesIndustry && matchesFundraising;
  });

  // Calculate Quick Stats
  const totalCount = registrations.length;
  const fundraisingCount = registrations.filter(r => r.isFundraising).length;
  
  const dietaryCounts = registrations.reduce((acc, curr) => {
    curr.dietary.forEach(diet => {
      acc[diet] = (acc[diet] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Export to CSV Function
  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) return;

    // Define CSV headers
    const headers = [
      'ID', 'Full Name', 'Email', 'Phone', 'Company', 'Job Title', 
      'Industry', 'Referral Source', 'Dietary Restrictions', 
      'Special Requirements', 'Actively Fundraising', 'Investment Stage', 
      'Startup Park Help Needed', 'Registration Date'
    ];

    // Map rows
    const rows = filteredRegistrations.map(reg => [
      reg.id,
      `"${reg.fullName.replace(/"/g, '""')}"`,
      reg.email,
      reg.phone,
      `"${reg.company.replace(/"/g, '""')}"`,
      `"${reg.jobTitle.replace(/"/g, '""')}"`,
      reg.industry,
      reg.referral,
      `"${reg.dietary.join(', ')}"`,
      `"${(reg.requirements || '').replace(/"/g, '""')}"`,
      reg.isFundraising ? 'Yes' : 'No',
      reg.investmentStage || 'N/A',
      `"${(reg.helpNeeded || '').replace(/"/g, '""')}"`,
      reg.createdAt
    ]);

    // Build CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    // Create file blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Startup_Park_Dinner_Attendees_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-page-wrapper">
      <header className="admin-header">
        <div className="container header-container">
          <div className="logo-area">
            <span className="logo-spark">STARTUP PARK</span>
            <span className="logo-tag">ADMIN PORTAL</span>
          </div>
          {isAuthenticated && (
            <button onClick={handleLogout} className="btn-logout">
              Log Out
            </button>
          )}
        </div>
      </header>

      <main className="container admin-main-content">
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="login-card-container">
            <form onSubmit={handleLoginSubmit} className="card-glass login-card">
              <h2 className="login-title text-gradient">Admin Access</h2>
              <p className="login-subtitle">Enter the security passcode to retrieve the registered attendee dataset.</p>
              
              {authError && (
                <div className="login-error-alert">
                  <svg style={{ width: '18px', height: '18px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{authError}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="passcode" className="form-label">Passcode</label>
                <input
                  type="password"
                  id="passcode"
                  className="form-control"
                  placeholder="••••••••"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Passcode'}
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Content */
          <div className="dashboard-layout">
            <div className="dashboard-intro">
              <h2 className="dashboard-title">Attendee Registry Dashboard</h2>
              <p className="dashboard-subtitle">Manage, filter, and review applications for the Corporate Dinner Night.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="stats-grid">
              <div className="card-glass stat-card">
                <span className="stat-label">TOTAL REGISTRATIONS</span>
                <span className="stat-value text-gradient">{totalCount}</span>
              </div>
              <div className="card-glass stat-card">
                <span className="stat-label">ACTIVELY FUNDRAISING</span>
                <span className="stat-value text-gradient">{fundraisingCount}</span>
              </div>
              <div className="card-glass stat-card">
                <span className="stat-label">VEGETARIAN REQUESTS</span>
                <span className="stat-value text-gradient">{dietaryCounts['Vegetarian'] || 0}</span>
              </div>
              <div className="card-glass stat-card">
                <span className="stat-label">VEGAN REQUESTS</span>
                <span className="stat-value text-gradient">{dietaryCounts['Vegan'] || 0}</span>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="card-glass filters-card">
              <div className="filters-bar">
                {/* Search */}
                <div className="filter-item search-filter">
                  <label className="form-label">Search</label>
                  <div className="search-input-wrapper">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search name, email, company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Industry Filter */}
                <div className="filter-item">
                  <label className="form-label">Industry</label>
                  <select
                    className="form-control"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                  >
                    <option value="">All Industries</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Fundraising Filter */}
                <div className="filter-item">
                  <label className="form-label">Fundraising Status</label>
                  <select
                    className="form-control"
                    value={selectedFundraising}
                    onChange={(e) => setSelectedFundraising(e.target.value)}
                  >
                    <option value="all">All Fundraising Statuses</option>
                    <option value="yes">Actively Fundraising</option>
                    <option value="no">Not Fundraising</option>
                  </select>
                </div>

                {/* Export Button */}
                <div className="filter-item-export">
                  <button 
                    onClick={exportToCSV} 
                    className="btn-primary btn-export"
                    disabled={filteredRegistrations.length === 0}
                  >
                    <svg style={{ width: '18px', height: '18px', marginRight: '8px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export CSV ({filteredRegistrations.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Attendees Registry Table */}
            <div className="card-glass table-container-card">
              <div className="table-responsive">
                {filteredRegistrations.length === 0 ? (
                  <div className="empty-state">
                    <svg style={{ width: '48px', height: '48px', color: 'var(--text-muted)', marginBottom: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>No attendees match the specified filters.</p>
                  </div>
                ) : (
                  <table className="attendee-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Name</th>
                        <th>Contact info</th>
                        <th>Company & Role</th>
                        <th>Industry</th>
                        <th>Dietary</th>
                        <th>Fundraising</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.map((reg) => (
                        <tr key={reg.id}>
                          <td className="td-date">
                            {new Date(reg.createdAt).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="td-name">{reg.fullName}</td>
                          <td className="td-contact">
                            <span className="contact-email">{reg.email}</span>
                            <span className="contact-phone">{reg.phone}</span>
                          </td>
                          <td className="td-company">
                            <span className="company-name">{reg.company}</span>
                            <span className="job-role">{reg.jobTitle}</span>
                          </td>
                          <td className="td-industry">
                            <span className="tag-industry">{reg.industry}</span>
                          </td>
                          <td className="td-diet">
                            {reg.dietary.length > 0 ? (
                              <div className="diet-tags">
                                {reg.dietary.map((d, i) => (
                                  <span key={i} className="tag-diet">{d}</span>
                                ))}
                              </div>
                            ) : (
                              <span className="txt-muted">None</span>
                            )}
                          </td>
                          <td className="td-fundraising">
                            {reg.isFundraising ? (
                              <span className="tag-fundraising yes">
                                {reg.investmentStage || 'Yes'}
                              </span>
                            ) : (
                              <span className="tag-fundraising no">No</span>
                            )}
                          </td>
                          <td className="td-details">
                            {reg.requirements && (
                              <div className="tooltip-detail" title={`Special Requirements: ${reg.requirements}`}>
                                ♿ Needs
                              </div>
                            )}
                            {reg.helpNeeded && (
                              <div className="tooltip-detail" title={`Startup Park Help: ${reg.helpNeeded}`}>
                                💡 Help
                              </div>
                            )}
                            {!reg.requirements && !reg.helpNeeded && <span className="txt-muted">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Styled JSX (Vanilla CSS Dashboard Scoped Layouts) */}
      <style jsx>{`
        .admin-page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #080809;
        }

        .admin-header {
          background: rgba(10, 10, 10, 0.9);
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
          height: 70px;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }

        .logo-area {
          display: flex;
          flex-direction: column;
        }

        .logo-spark {
          font-family: 'Outfit', sans-serif;
          font-size: 1.2rem;
          font-weight: 950;
          letter-spacing: 0.1em;
          color: var(--text-primary);
        }

        .logo-tag {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: var(--gold-primary);
          font-weight: 700;
          margin-top: -2px;
        }

        .btn-logout {
          padding: 0.45rem 1.15rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--text-secondary);
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }

        .btn-logout:hover {
          border-color: var(--status-error);
          color: var(--status-error);
          background: rgba(255, 90, 95, 0.05);
        }

        .admin-main-content {
          flex: 1;
          padding-top: 2.5rem;
          padding-bottom: 4rem;
        }

        /* Login Card CSS */
        .login-card-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          border-top: 4px solid var(--gold-primary);
          padding: 2.5rem;
        }

        .login-title {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .login-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-align: center;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .login-error-alert {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--status-error-bg);
          border: 1px solid var(--status-error);
          color: var(--status-error);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }

        /* Dashboard Styles */
        .dashboard-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dashboard-title {
          font-size: 1.75rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .dashboard-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1.5rem;
          border-left: 3px solid var(--gold-primary);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 750;
          letter-spacing: 0.05em;
        }

        .stat-value {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 850;
          line-height: 1;
        }

        /* Filters */
        .filters-card {
          padding: 1.5rem;
        }

        .filters-bar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 992px) {
          .filters-bar {
            flex-direction: row;
            align-items: flex-end;
          }
        }

        .filter-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .search-filter {
          flex: 1.5;
        }

        .filter-item-export {
          margin-top: 1rem;
        }

        @media (min-width: 992px) {
          .filter-item-export {
            margin-top: 0;
          }
        }

        .btn-export {
          height: 44px;
          width: 100%;
        }

        /* Table CSS */
        .table-container-card {
          padding: 0;
          overflow: hidden;
        }

        .table-responsive {
          overflow-x: auto;
          width: 100%;
        }

        .attendee-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }

        .attendee-table th {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          color: var(--text-primary);
          background-color: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1rem 1.25rem;
        }

        .attendee-table td {
          padding: 1.25rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          vertical-align: middle;
          color: var(--text-secondary);
        }

        .attendee-table tr:hover td {
          background-color: rgba(212, 175, 55, 0.02);
          color: var(--text-primary);
        }

        .td-date {
          white-space: nowrap;
          font-size: 0.825rem;
        }

        .td-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .td-contact {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.825rem;
        }

        .contact-email {
          color: var(--text-primary);
        }

        .contact-phone {
          color: var(--text-muted);
        }

        .td-company {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .company-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .job-role {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .tag-industry {
          display: inline-block;
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          color: var(--text-primary);
        }

        .diet-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }

        .tag-diet {
          font-size: 0.7rem;
          padding: 0.15rem 0.4rem;
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: var(--gold-primary);
          border-radius: 4px;
        }

        .tag-fundraising {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 50px;
          text-align: center;
        }

        .tag-fundraising.yes {
          background: var(--status-success-bg);
          border: 1px solid var(--status-success);
          color: var(--status-success);
        }

        .tag-fundraising.no {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
        }

        .td-details {
          display: flex;
          gap: 0.5rem;
        }

        .tooltip-detail {
          cursor: help;
          font-size: 0.8rem;
          padding: 0.2rem 0.4rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .txt-muted {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .empty-state {
          padding: 4rem 2rem;
          text-align: center;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
