import React, { useEffect, useState } from 'react';
import CompanyCard from '../components/CompanyCard';
import DummyCompanyCard from '../components/DummyCompanyCard';

const CompanyDirectory = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
  }, []);

  // Extract unique companies
  const realCompanies = [...new Set(jobs.map(job => job.company))].map(name => ({
    name,
    logo: `https://ui-avatars.com/api/?name=${name}&background=random`,
  }));

  // Static dummy companies
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
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Company Profiles
        <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mt-2 rounded-full" />
      </h2>

      {/* Responsive grid for all company cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dummy company cards */}
        {dummyCompanies.map((dummy, index) => (
          <div key={index} className="rounded-xl overflow-hidden bg-white border shadow-sm hover:shadow-lg transition duration-300">
            <DummyCompanyCard company={dummy} />
          </div>
        ))}

        {/* Real company cards from localStorage */}
        {realCompanies.map((company, index) => (
          <div key={index} className="rounded-xl overflow-hidden bg-white border shadow-sm hover:shadow-lg transition duration-300">
            <CompanyCard company={company} jobs={jobs} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDirectory;
