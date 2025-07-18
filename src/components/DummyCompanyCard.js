import React from 'react';
import './FlipCard.css'; // Custom CSS file for flip effect

const DummyCompanyCard = ({ company }) => {
  return (
    <div className="flip-card w-full sm:w-72">
      <div className="flip-card-inner">
        {/* Front Side */}
        <div className="flip-card-front bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
          <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-full mb-3" />
          <h3 className="text-lg font-semibold">{company.name}</h3>
        </div>

        {/* Back Side */}
        <div className="flip-card-back bg-gray-100 rounded-xl shadow-md p-4 flex flex-col">
          <h4 className="text-md font-bold mb-2">Jobs:</h4>
          <ul className="list-disc list-inside text-sm">
            {company.jobs.map((job, idx) => (
              <li key={idx}>{job}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DummyCompanyCard;
