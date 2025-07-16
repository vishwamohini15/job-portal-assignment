import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-r from-blue-50 via-white to-green-50">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Welcome to Jobify Portal 🚀
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your one-stop platform to post, apply, and manage jobs with smart matching, resume builder, and real-time tracking.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/jobs"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
          >
            Browse Jobs
          </Link>
          <Link
            to="/post-job"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
