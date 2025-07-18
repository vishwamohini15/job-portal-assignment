import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userProfile from '../data/userProfile'; 

function DashboardPage({ role }) {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);

  // Load applications and jobs from local storage
  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];

    setApplications(storedApps);
    setJobs(storedJobs);
  }, []);

  // Seeker's Dashboard View
  if (role === 'seeker') {
    // Filter applications relevant to the current seeker
    // Using userProfile.id to filter applications - this assumes userProfile is correctly structured
    const seekerApplications = applications.filter(app => app.applicantId === userProfile.id);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Your Application Dashboard 🚀
          </h2>

          {seekerApplications.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <p className="text-2xl text-gray-600 font-medium mb-4">You haven’t applied to any jobs yet.</p>
              <Link
                to="/jobs"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
              >
                Browse Jobs Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seekerApplications.map((app) => {
                const job = jobs.find((j) => j.id === app.jobId);
                // Determine status badge color for visual feedback
                let statusColorClass = 'bg-gray-200 text-gray-800'; // Default
                if (app.status === 'applied') statusColorClass = 'bg-blue-100 text-blue-800';
                else if (app.status === 'review') statusColorClass = 'bg-yellow-100 text-yellow-800';
                else if (app.status === 'interview') statusColorClass = 'bg-purple-100 text-purple-800';
                else if (app.status === 'selected') statusColorClass = 'bg-green-100 text-green-800';
                else if (app.status === 'rejected') statusColorClass = 'bg-red-100 text-red-800';

                return (
                  <div key={app.jobId} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
                    <div>
                      <h3 className="text-xl font-bold text-blue-700 mb-2">{job?.title || 'Unknown Job'}</h3>
                      <p className="text-gray-700 text-sm mb-3">{job?.company || 'Unknown Company'}</p>
                      
                      <p className="text-sm text-gray-600 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {job?.location || 'N/A'}
                      </p>

                      <p className="mt-3">
                        <strong className="text-gray-700">Status:</strong>{' '}
                        <span className={`capitalize px-3 py-1 rounded-full text-sm font-semibold ${statusColorClass}`}>
                          {app.status}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Applied on: {new Date(app.appliedDate || app.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 border-t pt-4 border-gray-100 text-right">
                        <Link
                            to={`/jobs`} // Link to a general jobs page; you might want a job-specific detail page
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                        >
                            View Job Details →
                        </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Employer's Dashboard View
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Employer Dashboard 📊
        </h2>

        {jobs.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <p className="text-2xl text-gray-600 font-medium mb-4">You haven’t posted any jobs yet.</p>
            <Link
              to="/post-job-wizard"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => {
              // Calculate applicants for each job posted by the employer
              const jobApplicants = applications.filter(app => app.jobId === job.id);
              const totalApplicants = jobApplicants.length;
              const newApplicants = jobApplicants.filter(app => app.status === 'applied').length;

              return (
                <div key={job.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
                  <div>
                    <h3 className="text-xl font-bold text-purple-700 mb-2">{job.title}</h3>
                    <p className="text-gray-700 text-sm mb-3">{job.company || 'Your Company'}</p>
                    
                    <div className="text-gray-600 text-sm mb-2">
                        <p className="flex items-center mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Location: {job.location}
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            Skills: {Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}
                        </p>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 font-semibold flex items-center mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                            Total Applicants: <span className="ml-2 text-lg font-bold">{totalApplicants}</span>
                        </p>
                        {newApplicants > 0 && (
                            <p className="text-xs text-green-700 font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                {newApplicants} New Applicants
                            </p>
                        )}
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4 border-gray-100">
                    <Link
                      to="/applicants"
                      className="w-full inline-block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-colors duration-200"
                    >
                      Manage Applicants
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;