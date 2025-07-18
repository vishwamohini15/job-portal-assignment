import React from 'react';
import useRecommendedJobs from '../hooks/useRecommendedJobs';
import { Link } from 'react-router-dom';

const RecommendedJobs = () => {
  const { recommended, userProfile } = useRecommendedJobs();

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Recommended Jobs For You</h2>

      {userProfile && (
        <p className="mb-6 text-sm text-gray-600">
          Based on your skills:{" "}
          <span className="text-blue-600 font-medium">{userProfile.skills.join(', ')}</span>
        </p>
      )}

      {recommended.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 px-4 py-3 rounded">
          No matching jobs found. Update your profile for better results.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {recommended.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md border border-gray-200 rounded-xl p-5 transition hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <h4 className="text-xl font-semibold text-gray-800">{job.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {job.company} • {job.location}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="inline-block text-xs bg-green-100 text-green-700 font-medium px-2 py-1 rounded">
                  Match Score: {job.score}%
                </span>

                <Link
                  to={`/jobs`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedJobs;
