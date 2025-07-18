import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userProfile from '../data/userProfile';
// import useCompatibilityScore from '../hooks/useCompatibilityScore';
import CompatibilityRing from '../components/CompatibilityRing';
import SalaryRangeSlider from '../components/SalaryRangeSlider';


function JobListPage({ role }) {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState([10000, 100000]);


  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);

    const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
    setAppliedJobs(storedApps);
  }, []);

  const handleApply = (jobId) => {
    const newApp = {
      jobId,
      status: 'applied',
      date: new Date().toISOString()
    };
    const updatedApps = [...appliedJobs, newApp];
    localStorage.setItem('applications', JSON.stringify(updatedApps));
    setAppliedJobs(updatedApps);
    alert('Applied successfully!');
  };

  const hasApplied = (jobId) => {
    return appliedJobs.some(app => app.jobId === jobId);
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
    navigate(`/edit-job/${job.id}`);
  };

  const filteredJobs = jobs.filter(job => {
    const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = locationFilter
      ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
   const salaryMatch = minSalary ? Number(job.salary?.min || 0) >= Number(minSalary) : true;
    const skillsMatch = skillFilter
      ? job.skills.toLowerCase().includes(skillFilter.toLowerCase())
      : true;

    return titleMatch && locationMatch && salaryMatch && skillsMatch;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Min salary (₹)"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Filter by skills"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="border p-2 rounded w-full"
        />

          <div className="col-span-1 md:col-span-4">
    <SalaryRangeSlider value={salaryRange} onChange={setSalaryRange} /> 
    
  </div>
      </div>

      {/* Job Cards */}
      {filteredJobs.length === 0 ? (
        <p>No jobs match your criteria.</p>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => {
  let score = null;
  if (role === 'seeker') {
  const jobSkills = Array.isArray(job.skills)
    ? job.skills.map(s => s.trim().toLowerCase())
    : (job.skills || '').toLowerCase().split(',').map(s => s.trim());

  const userSkills = Array.isArray(userProfile.skills)
    ? userProfile.skills.map(s => s.trim().toLowerCase())
    : (userProfile.skills || '').toLowerCase().split(',').map(s => s.trim());

  const matchedSkills = jobSkills.filter(skill => userSkills.includes(skill));
  const skillScore = jobSkills.length > 0 ? (matchedSkills.length / jobSkills.length) * 100 : 0;

  const locationScore =
    job.location?.toLowerCase() === userProfile.location?.toLowerCase() ? 100 : 0;

  const salaryScore =
    Number(job.salary) >= Number(userProfile.expectedSalary) ? 100 : 0;

  score = Math.round((skillScore + locationScore + salaryScore) / 3);
}


  return (
    <div key={job.id} className="p-4 border rounded shadow bg-white">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-700">{job.description}</p>
      <p className="mt-2"><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> ₹{job.salary.min} - ₹{job.salary.max}</p>
      <p><strong>Skills:</strong> {job.skills}</p>

      {role === 'seeker' && (
        <div className="flex items-center justify-between mt-4">
          <CompatibilityRing score={score} />
          <button
            className={`px-4 py-1 rounded ${
              hasApplied(job.id)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            disabled={hasApplied(job.id)}
            onClick={() => handleApply(job.id)}
          >
            {hasApplied(job.id) ? 'Already Applied' : 'Apply'}
          </button>
        </div>
      )}

      {role === 'employer' && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => handleEdit(job)}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(job.id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
})}

        </div>
      )}
    </div>
  );
}

export default JobListPage;
