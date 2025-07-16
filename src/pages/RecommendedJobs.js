import React from 'react';
import useRecommendedJobs from '../hooks/useRecommendedJobs';
import { Link } from 'react-router-dom';

const RecommendedJobs = () => {
  const { recommended, userProfile } = useRecommendedJobs();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Recommended Jobs For You</h2>
      {userProfile && (
        <p className="mb-4 text-sm text-gray-600">
          Based on your skills: <strong>{userProfile.skills.join(', ')}</strong>
        </p>
      )}

      {recommended.length === 0 ? (
        <p>No matching jobs found. Update your profile for better results.</p>
      ) : (
        <div className="space-y-4">
          {recommended.map(job => (
            <div key={job.id} className="border p-4 rounded shadow bg-white">
              <h4 className="font-semibold text-lg">{job.title}</h4>
              <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
              <p className="text-sm mt-1">Score: {job.score}%</p>
              <Link
                to={`/jobs/${job.id}`}
                className="text-blue-600 underline text-sm mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedJobs;
