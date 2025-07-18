// src/pages/JobPostPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobPostPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jobToEdit = location.state?.jobToEdit || null;

  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: { min: '', max: '' },
    skills: '',
    type: 'full-time',
    experience: 'entry-level',
    requirements: '',
  });

  useEffect(() => {
    if (jobToEdit) {
      setJob({
        title: jobToEdit.title || '',
        description: jobToEdit.description || '',
        location: jobToEdit.location || '',
        salary: {
          min: jobToEdit.salary?.min || '',
          max: jobToEdit.salary?.max || ''
        },
        skills: Array.isArray(jobToEdit.skills) ? jobToEdit.skills.join(', ') : (jobToEdit.skills || ''),
        type: jobToEdit.type || 'full-time',
        experience: jobToEdit.experience || 'entry-level',
        requirements: Array.isArray(jobToEdit.requirements) ? jobToEdit.requirements.join(', ') : (jobToEdit.requirements || ''),
      });
    }
  }, [jobToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'min' || name === 'max') {
      setJob(prev => ({
        ...prev,
        salary: {
          ...prev.salary,
          [name]: value
        }
      }));
    } else {
      setJob(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!job.title || !job.description || !job.location || !job.salary.min || !job.salary.max || !job.skills) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];

    const formattedSkills = job.skills.split(',').map(s => s.trim()).filter(s => s !== '');
    const formattedRequirements = job.requirements.split(',').map(r => r.trim()).filter(r => r !== '');

    let updatedJobs;
    if (jobToEdit) {
      updatedJobs = storedJobs.map(j =>
        j.id === jobToEdit.id
          ? {
              ...jobToEdit,
              ...job,
              skills: formattedSkills,
              requirements: formattedRequirements,
              salary: {
                min: Number(job.salary.min),
                max: Number(job.salary.max)
              }
            }
          : j
      );
      toast.success('Job updated successfully!');
    } else {
      const newJob = {
        id: Date.now().toString(),
        ...job,
        skills: formattedSkills,
        requirements: formattedRequirements,
        salary: {
          min: Number(job.salary.min),
          max: Number(job.salary.max)
        },
        postedDate: new Date().toISOString(),
        applications: [],
      };
      updatedJobs = [...storedJobs, newJob];
      toast.success('Job posted successfully!');
    }

    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    navigate('/jobs');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {jobToEdit ? 'Edit Job' : 'Post a New Job'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />

          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            placeholder="Location"
            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="min"
              value={job.salary.min}
              onChange={handleChange}
              placeholder="Min Salary (₹)"
              className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              name="max"
              value={job.salary.max}
              onChange={handleChange}
              placeholder="Max Salary (₹)"
              className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="text"
            name="skills"
            value={job.skills}
            onChange={handleChange}
            placeholder="Skills (e.g., React, JavaScript)"
            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition duration-200 w-full"
          >
            {jobToEdit ? 'Update Job' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPostPage;
