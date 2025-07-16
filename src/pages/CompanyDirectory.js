import React, { useEffect, useState } from 'react';
import CompanyCard from '../components/CompanyCard';

const CompanyDirectory = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
  }, []);

  // Get unique company names with mock logos
  const companies = [...new Set(jobs.map(job => job.company))].map(name => ({
    name,
    logo: `https://ui-avatars.com/api/?name=${name}&background=random`,
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Company Profiles</h2>
      <div className="flex flex-wrap gap-6">
        {companies.map((company, index) => (
          <CompanyCard key={index} company={company} jobs={jobs} />
        ))}
      </div>
    </div>
  );
};

export default CompanyDirectory;
