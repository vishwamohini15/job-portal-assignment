import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userProfile from '../data/userProfile';
import CompatibilityRing from '../components/CompatibilityRing';
import SalaryRangeSlider from '../components/SalaryRangeSlider';

function JobListPage({ role }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState([10000, 100000]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);

    const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
    setAppliedJobs(storedApps);
  }, []);

  const handleApply = (jobId) => {
    const newApp = {
      id: Date.now().toString(),
      jobId,
      status: 'applied',
      appliedDate: new Date().toISOString(),
      applicantId: userProfile.id,
      applicantName: userProfile.name || 'Job Seeker',
    };

    const updatedApps = [...appliedJobs, newApp];
    localStorage.setItem('applications', JSON.stringify(updatedApps));
    setAppliedJobs(updatedApps);
    alert('Applied successfully!');
  };

  const hasApplied = (jobId) => {
    return appliedJobs.some(app => app.jobId === jobId && app.applicantId === userProfile.id);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    if (!confirmDelete) return;

    const updatedJobs = jobs.filter(job => job.id !== id);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
    alert('Job deleted successfully!');
  };

  const handleEdit = (job) => {
    navigate('/post-job', { state: { jobToEdit: job } });
  };

  const filteredJobs = jobs.filter(job => {
    const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = locationFilter
      ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;

    const jobMinSalary = job.salary?.min || 0;
    const jobMaxSalary = job.salary?.max || Infinity;
    const salaryMatch =
      jobMinSalary <= salaryRange[1] && jobMaxSalary >= salaryRange[0];

    const jobSkillsArray = Array.isArray(job.skills)
      ? job.skills
      : job.skills?.split(',').map(s => s.trim()) || [];

    const skillsMatch = skillFilter
      ? jobSkillsArray.some(skill =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      : true;

    return titleMatch && locationMatch && salaryMatch && skillsMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Explore Amazing Job Opportunities 🚀
        </h2>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-10 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">Filter Jobs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
            <input
              type="text"
              placeholder="Filter by skills (e.g., React, SQL)..."
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
            <div className="col-span-full lg:col-span-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 px-4 py-3">
              <span className="text-gray-700 font-medium">Salary:</span>
              <SalaryRangeSlider value={salaryRange} onChange={setSalaryRange} />
            </div>
          </div>
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <p className="text-2xl text-gray-600 font-medium">
              No jobs match your current filters. Try broadening your search.
            </p>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-1634869-1389069.png"
              alt="No results"
              className="mx-auto mt-8 h-48 opacity-70"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => {
              let score = null;

              if (role === 'seeker') {
                const jobSkills = Array.isArray(job.skills)
                  ? job.skills.map(s => s.trim().toLowerCase())
                  : (job.skills || '').split(',').map(s => s.trim().toLowerCase());

                const userSkills = Array.isArray(userProfile.skills)
                  ? userProfile.skills.map(s => s.trim().toLowerCase())
                  : (userProfile.skills || '').split(',').map(s => s.trim().toLowerCase());

                const matchedSkills = jobSkills.filter(skill =>
                  userSkills.includes(skill)
                );

                const skillScore = jobSkills.length
                  ? (matchedSkills.length / jobSkills.length) * 100
                  : 0;

                const locationScore =
                  job.location?.toLowerCase() === userProfile.location?.toLowerCase()
                    ? 100
                    : 0;

                const userExpectedSalary = Number(userProfile.expectedSalary);
                const jobMin = job.salary?.min || 0;
                const jobMax = job.salary?.max || Infinity;

                let salaryScore = 0;
                if (userExpectedSalary >= jobMin && userExpectedSalary <= jobMax) {
                  salaryScore = 100;
                } else if (userExpectedSalary < jobMin) {
                  salaryScore = 50;
                } else {
                  salaryScore = 20;
                }

                score = Math.round((skillScore + locationScore + salaryScore) / 3);
              }

              return (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-transform transform hover:scale-[1.01]"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-blue-700 mb-2">{job.title}</h3>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">{job.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                      <p className="flex items-center">
                        <span className="font-medium mr-1">Location:</span> {job.location}
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium mr-1">Salary:</span> ₹{job.salary?.min} - ₹{job.salary?.max}
                      </p>
                      <p className="col-span-2 flex items-start">
                        <span className="font-medium mr-1">Skills:</span>
                        <span className="flex flex-wrap gap-1">
                          {(Array.isArray(job.skills) ? job.skills : job.skills?.split(',')).map((skill, i) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {role === 'seeker' && (
                    <div className="flex items-center justify-between mt-4 border-t pt-4">
                      <CompatibilityRing score={score} />
                      <button
                        className={`px-5 py-2 rounded-full font-semibold text-white transition duration-300 ${
                          hasApplied(job.id)
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                        }`}
                        disabled={hasApplied(job.id)}
                        onClick={() => handleApply(job.id)}
                      >
                        {hasApplied(job.id) ? 'Applied' : 'Apply Now'}
                      </button>
                    </div>
                  )}

                  {role === 'employer' && (
                    <div className="flex justify-end gap-3 mt-4 border-t pt-4">
                      <button
                        onClick={() => handleEdit(job)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 shadow-md"
                      >
                        Edit Job
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md"
                      >
                        Delete Job
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobListPage;
