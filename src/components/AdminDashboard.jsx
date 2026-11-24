'use client';

import React, { useState } from 'react';

export default function AdminDashboard() {
  const [adminId, setAdminId] = useState('');
  const [suspicious, setSuspicious] = useState([]);
  const [flaggedUsers, setFlaggedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    if (!adminId) {
      setError('Please enter an Admin ID');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/monitor?adminId=${encodeURIComponent(adminId)}`);
      const data = await res.json();
      if (data.success) {
        setSuspicious(data.suspiciousActivities || []);
        setFlaggedUsers(data.flaggedUsers || []);
      } else {
        setError(data.error || 'Failed to fetch monitoring data');
      }
    } catch {
      setError('Network or server error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">🛡️ Admin Dashboard</h1>
        <p className="text-slate-400 mb-6">Player Monitoring & Security</p>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-6 shadow-xl">
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Enter Admin ID"
              className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg disabled:opacity-50 transition-all cursor-pointer shadow-lg"
            >
              {loading ? 'Loading...' : 'Load Data'}
            </button>
          </div>

          {error && <div className="text-red-400 text-sm mb-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Suspicious Activities</p>
              <p className="text-2xl font-bold text-red-400 mt-1">{suspicious.length}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Flagged Users</p>
              <p className="text-2xl font-bold text-orange-400 mt-1">{flaggedUsers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
          <h2 className="text-lg font-bold text-white p-4 border-b border-slate-700 flex items-center gap-2">
            <span>⚠️</span> Suspicious Activities Log
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800 text-slate-400 uppercase font-bold text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Risk Score</th>
                  <th className="px-4 py-3">Flagged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {suspicious.length > 0 ? (
                  suspicious.map((a, idx) => (
                    <tr key={a.id || idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 text-slate-200 font-medium">{a.username || a.email || 'Unknown User'}</td>
                      <td className="px-4 py-3 text-slate-300 font-mono text-xs">{a.action}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${Number(a.risk_score) >= 50 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                          {a.risk_score}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        {a.flagged ? <span className="text-red-400">⚠️ YES</span> : <span className="text-slate-500">No</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-slate-500 italic">
                      No suspicious activities recorded or data not loaded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}