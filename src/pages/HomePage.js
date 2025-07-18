import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [latestJobs, setLatestJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const sortedJobs = storedJobs.slice().reverse();
    setLatestJobs(sortedJobs.slice(0, 3));
  }, []);

  const dummyJobs = [
    { title: 'Frontend Developer', company: 'TechNova', location: 'Remote' },
    { title: 'Backend Engineer', company: 'CodeForge Inc.', location: 'Bangalore' },
    { title: 'UI/UX Designer', company: 'DesignPro', location: 'Delhi' },
  ];

  const dummyCourses = [
    {
      name: 'Full Stack Web Dev',
      price: '₹499',
      offer: '75% Off - Limited Time!',
    },
    {
      name: 'React Mastery Course',
      price: '₹299',
      offer: 'Today Only!',
    },
    {
      name: 'Python for Beginners',
      price: '₹199',
      offer: 'Flat 50% Off',
    },
    {
      name: 'Advanced Firebase',
      price: '₹349',
      offer: 'Combo Offer',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12 space-y-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center py-8 md:py-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 text-gray-900 leading-tight">
          Find Your Dream Job with Jobify 🚀
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Your intelligent platform to discover, apply, and manage jobs. Featuring smart matching, an intuitive resume builder, and real-time application tracking.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/jobs"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            Explore Jobs
          </Link>
          <Link
            to="/post-job"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            Post a Job
          </Link>
        </div>
      </div>

      {/* Course Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🔥 Popular Courses</h2>
        {/* Horizontal scroll for small screens, grid for larger screens */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:px-0 sm:mx-0 lg:grid lg:grid-cols-4 md:grid-cols-2 md:w-full gap-6 custom-scrollbar-hide">
          {dummyCourses.map((course, index) => (
            <div
              key={index}
              className="flex-none w-72 md:w-auto bg-white p-6 rounded-xl border border-gray-200 shadow-md flex flex-col justify-between transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-purple-700 mb-2">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.offer}</p>
              </div>
              <div className="mt-auto">
                <p className="text-2xl font-extrabold text-green-600 mb-4">{course.price}</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-colors duration-200">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Job Posts */}
      {latestJobs.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">✨ Latest Job Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-1">{job.title}</h3>
                  <p className="text-gray-700 mb-1">{job.company}</p>
                  <p className="text-sm text-gray-500 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </p>
                </div>
                <Link
                  to="/jobs"
                  className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold text-base transition-colors duration-200"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Older Dummy Jobs */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">⭐ Other Opportunities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-1">{job.title}</h3>
                <p className="text-gray-700 mb-1">{job.company}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;