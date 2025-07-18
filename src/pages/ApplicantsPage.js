import React, { useEffect, useState } from 'react';
import { sendEmail } from '../utils/emailSimulator';

const statusOptions = ['applied', 'review', 'interview', 'selected', 'rejected'];

function ApplicantsPage() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setApplications(storedApps);
    setJobs(storedJobs);
  }, []);

  const handleStatusChange = (jobId, newStatus) => {
  const updated = applications.map(app => {
    if (app.jobId === jobId) {
      // 🔔 Send notification only when status actually changes
      const job = jobs.find(j => j.id === app.jobId);

      if (newStatus === 'selected') {
        sendEmail('seeker', 'Application Selected', `🎉 Congratulations! You have been selected for the ${job?.title} role.`);
      } else if (newStatus === 'interview') {
        sendEmail('seeker', 'Interview Scheduled', `📅 Interview scheduled for job: ${job?.title}. Please check your inbox.`);
      } else if (newStatus === 'rejected') {
        sendEmail('seeker', 'Application Rejected', `❌ Unfortunately, your application for ${job?.title} was not selected.`);
      }

      return { ...app, status: newStatus };
    }
    return app;
  });

  localStorage.setItem('applications', JSON.stringify(updated));
  setApplications(updated);
};

  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Applications</h2>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map(app => {
          const job = jobs.find(j => j.id === app.jobId);

          return (
            <div
              key={app.jobId}
              className="border p-4 mb-3 rounded shadow bg-white flex flex-col gap-2"
            >
              <p><strong>Job Title:</strong> {job?.title || 'Unknown Job'}</p>
              <p><strong>Current Status:</strong> {app.status}</p>

              <div className="flex items-center gap-3">
                <label htmlFor="status">Update Status:</label>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.jobId, e.target.value)}
                  className="border p-1 rounded"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ApplicantsPage;