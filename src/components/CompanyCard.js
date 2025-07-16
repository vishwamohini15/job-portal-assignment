// src/components/CompanyCard.jsx
import React from 'react';
import './CompanyCard.css'; // Custom CSS for flip animation

const CompanyCard = ({ company, jobs }) => {
  const jobCount = jobs.filter(job => job.company === company.name).length;

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-front">
          <img src={company.logo} alt="logo" className="logo" />
          <h3 className="company-name">{company.name}</h3>
        </div>
        <div className="card-back">
          <h4 className="text-lg font-semibold mb-1">Open Jobs</h4>
          <p>{jobCount} openings</p>
          <ul className="mt-2 text-sm list-disc pl-4">
            {jobs
              .filter(job => job.company === company.name)
              .slice(0, 3)
              .map(job => (
                <li key={job.id}>{job.title}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
