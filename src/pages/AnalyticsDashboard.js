import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

  const statusCount = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.entries(statusCount).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Employer Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h4 className="text-base font-semibold text-gray-700 mb-2">
            Total Jobs Posted
          </h4>
          <p className="text-4xl font-bold text-blue-600">{jobs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h4 className="text-base font-semibold text-gray-700 mb-2">
            Total Applications
          </h4>
          <p className="text-4xl font-bold text-green-600">{applications.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">
          Applications by Status
        </h4>
        {statusData.length === 0 ? (
          <p className="text-gray-500 text-sm">No application data available.</p>
        ) : (
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
