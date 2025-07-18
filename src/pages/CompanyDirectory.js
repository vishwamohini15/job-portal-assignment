import React, { useEffect, useState } from 'react';
import CompanyCard from '../components/CompanyCard';
import DummyCompanyCard from '../components/DummyCompanyCard';

const CompanyDirectory = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
  }, []);

  // Unique real companies from localStorage
  const realCompanies = [...new Set(jobs.map(job => job.company))].map(name => ({
    name,
    logo: `https://ui-avatars.com/api/?name=${name}&background=random`,
  }));

  // 5 Dummy Companies
  const dummyCompanies = [
    {
      name: "TechNova",
      logo: "https://ui-avatars.com/api/?name=TechNova&background=random",
      jobs: ["Frontend Dev", "UI Designer", "QA Tester"],
    },
    {
      name: "InnoSoft",
      logo: "https://ui-avatars.com/api/?name=InnoSoft&background=random",
      jobs: ["Full Stack Dev", "DevOps", "Product Manager"],
    },
    {
      name: "DataWorks",
      logo: "https://ui-avatars.com/api/?name=DataWorks&background=random",
      jobs: ["Data Analyst", "ML Engineer", "BI Developer"],
    },
    {
      name: "CyberMind",
      logo: "https://ui-avatars.com/api/?name=CyberMind&background=random",
      jobs: ["Cybersecurity", "Cloud Engineer", "Support Engg"],
    },
    {
      name: "GreenTech",
      logo: "https://ui-avatars.com/api/?name=GreenTech&background=random",
      jobs: ["IoT Developer", "Energy Analyst", "R&D Engineer"],
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Company Profiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dummy Companies */}
        {dummyCompanies.map((dummy, index) => (
          <DummyCompanyCard key={index} company={dummy} />
        ))}

        {/* Real Companies */}
        {realCompanies.map((company, index) => (
          <CompanyCard key={index} company={company} jobs={jobs} />
        ))}
      </div>
    </div>
  );
};

export default CompanyDirectory;
