'use client';

import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [adminId, setAdminId] = useState('');
  const [suspicious, setSuspicious] = useState<any[]>([]);
  const [flaggedUsers, setFlaggedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    if (!adminId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/monitor?adminId=${adminId}`);
      const data = await res.json();
      if (data.success) {
        setSuspicious(data.suspiciousActivities || []);
        setFlaggedUsers(data.flaggedUsers || []);
      }
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">🛡️ Admin Dashboard</h1>
        <p className="text-slate-400 mb-6">Player Monitoring & Security</p>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Admin ID"
              className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white w-48"
            />
            <button onClick={fetchData} disabled={loading} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded disabled:opacity-50">
              {loading ? '...' : 'Load'}
            </button>
          </div>
          {error && <div className="text-red-400 text-sm mb-4">{error}</div>}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase">Suspicious Activities</p>
              <p className="text-xl font-bold text-red-400">{suspicious.length}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase">Flagged Users</p>
              <p className="text-xl font-bold text-orange-400">{flaggedUsers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <h2 className="text-lg font-bold text-white p-4 border-b border-slate-700">⚠️ Suspicious Activities</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 py-2 text-slate-400 font-bold">User</th>
                  <th className="px-4 py-2 text-slate-400 font-bold">Action</th>
                  <th className="px-4 py-2 text-slate-400 font-bold">Risk</th>
                  <th className="px-4 py-2 text-slate-400 font-bold">Flagged</th>
                </tr>
              </thead>
              <tbody>
                {suspicious.map((a) => (
                  <tr key={a.id} className="border-b border-slate-700/50">
                    <td className="px-4 py-2">{a.username || a.email}</td>
                    <td className="px-4 py-2 text-slate-300">{a.action}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${a.risk_score >= 50 ? 'text-red-400' : 'text-green-400'}`}>
                        {a.risk_score}
                      </span>
                    </td>
                    <td className="px-4 py-2">{a.flagged ? '⚠️ YES' : 'No'}</td>
                  </tr>
                ))}
                {suspicious.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-500">No suspicious activities</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}