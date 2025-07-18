import React, { useState, useEffect } from 'react';
import { sendEmail } from '../utils/emailSimulator';

function JobPostPage({ role }) {
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: { min: '', max: '' },
    skills: ''
  });

  const [jobs, setJobs] = useState([]);

  // Load existing jobs from localStorage
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
  }, []);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJobs = [...jobs, { ...job, id: Date.now() }];
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
    setJob({
      title: '',
      description: '',
      location: '',
      salary: '',
      skills: ''
    });
    alert("Job posted successfully!");
   sendEmail('employer', 'Job Posted Successfully', `You have posted a new job: ${job.title}`);
sendEmail('seeker', 'New Job Posted', `A new job has been posted: ${job.title}`);
  };

  if (role !== 'employer') {
    return (
      <div className="p-6 text-red-600">
        Only employers can post jobs. Please switch roles.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
  type="number"
  name="minSalary"
  placeholder="Minimum Salary (₹)"
  value={job.salary.min}
  onChange={(e) =>
    setJob({ ...job, salary: { ...job.salary, min: e.target.value } })
  }
  className="w-full border p-2 rounded"
  required
/>

<input
  type="number"
  name="maxSalary"
  placeholder="Maximum Salary (₹)"
  value={job.salary.max}
  onChange={(e) =>
    setJob({ ...job, salary: { ...job.salary, max: e.target.value } })
  }
  className="w-full border p-2 rounded"
  required
/>

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={job.skills}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default JobPostPage;
