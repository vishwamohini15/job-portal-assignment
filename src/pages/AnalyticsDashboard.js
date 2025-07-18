import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#d0ed57'];

function AnalyticsDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const storedApps = JSON.parse(localStorage.getItem('applications')) || [];

    setJobs(storedJobs);
    setApplications(storedApps);
  }, []);

  // Breakdown by status
  const statusCount = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.entries(statusCount).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Employer Analytics Dashboard</h2>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-4 shadow rounded">
          <h4 className="text-lg font-semibold">Total Jobs Posted</h4>
          <p className="text-3xl text-blue-600">{jobs.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h4 className="text-lg font-semibold">Total Applications</h4>
          <p className="text-3xl text-green-600">{applications.length}</p>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h4 className="text-lg font-semibold mb-4">Applications by Status</h4>
        {statusData.length === 0 ? (
          <p className="text-gray-600">No application data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default AnalyticsDashboard;