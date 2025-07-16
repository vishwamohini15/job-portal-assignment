// src/pages/PostJobWizard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const steps = ['Basic Info', 'Details', 'Requirements', 'Preview'];

const PostJobWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '',
    company: '',
    type: 'full-time',
    location: '',
    salary: { min: '', max: '' },
    experience: '',
    description: '',
    requirements: '',
    skills: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'min' || name === 'max') {
      setForm(prev => ({
        ...prev,
        salary: { ...prev.salary, [name]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const newJob = {
      ...form,
      id: uuid(),
      postedDate: new Date(),
      requirements: form.requirements.split(',').map(req => req.trim()),
      skills: form.skills.split(',').map(skill => skill.trim()),
      applications: [],
    };
    localStorage.setItem('jobs', JSON.stringify([...jobs, newJob]));
    navigate('/jobs');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Post a Job – {steps[step]}</h2>

      {step === 0 && (
        <div className="space-y-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" className="w-full border p-2 rounded" />
          <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" className="w-full border p-2 rounded" />
          <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" />
          <div className="flex gap-2">
            <input name="min" value={form.salary.min} onChange={handleChange} placeholder="Min Salary" className="w-1/2 border p-2 rounded" />
            <input name="max" value={form.salary.max} onChange={handleChange} placeholder="Max Salary" className="w-1/2 border p-2 rounded" />
          </div>
          <input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience (e.g. 2+ years)" className="w-full border p-2 rounded" />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Job Description" className="w-full border p-2 rounded" />
          <input name="requirements" value={form.requirements} onChange={handleChange} placeholder="Requirements (comma-separated)" className="w-full border p-2 rounded" />
          <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma-separated)" className="w-full border p-2 rounded" />
        </div>
      )}

      {step === 3 && (
        <div className="text-sm space-y-2">
          <p><strong>Title:</strong> {form.title}</p>
          <p><strong>Company:</strong> {form.company}</p>
          <p><strong>Type:</strong> {form.type}</p>
          <p><strong>Location:</strong> {form.location}</p>
          <p><strong>Salary:</strong> ₹{form.salary.min} - ₹{form.salary.max}</p>
          <p><strong>Experience:</strong> {form.experience}</p>
          <p><strong>Description:</strong> {form.description}</p>
          <p><strong>Requirements:</strong> {form.requirements}</p>
          <p><strong>Skills:</strong> {form.skills}</p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
        )}
        {step < steps.length - 1 ? (
          <button onClick={handleNext} className="ml-auto px-4 py-2 bg-blue-500 text-white rounded">Next</button>
        ) : (
          <button onClick={handleSubmit} className="ml-auto px-4 py-2 bg-green-600 text-white rounded">Post Job</button>
        )}
      </div>
    </div>
  );
};

export default PostJobWizard;
