import React, { useEffect, useState } from 'react';

function DashboardPage({ role }) {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];

    setApplications(storedApps);
    setJobs(storedJobs);
  }, []);

  if (role === 'seeker') {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Applications</h2>
        {applications.length === 0 ? (
          <p>You haven’t applied to any jobs yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const job = jobs.find((j) => j.id === app.jobId);
              return (
                <div key={app.jobId} className="p-4 border rounded bg-white shadow">
                  <h3 className="text-lg font-semibold">{job?.title || 'Unknown Job'}</h3>
                  <p className="text-sm text-gray-600">{job?.company || ''}</p>
                  <p className="mt-2">
                    <strong>Status:</strong>{' '}
                    <span className="capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {app.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Applied on: {new Date(app.date).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // EMPLOYER VIEW
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>You haven’t posted any jobs yet.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 border rounded bg-white shadow">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-sm text-gray-700 mt-1">
                Skills: {job.skills}
              </p>
              {/* Dummy count for now */}
              <p className="text-sm mt-2">
                <strong>Applicants:</strong> {
                  JSON.parse(localStorage.getItem('applications') || '[]')
                    .filter(app => app.jobId === job.id).length
                }
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
