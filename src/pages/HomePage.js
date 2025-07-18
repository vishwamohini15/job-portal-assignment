import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [latestJobs, setLatestJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const sortedJobs = storedJobs.slice().reverse(); // Latest first
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-green-50 px-4 py-12 space-y-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center">
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

      {/* Course Section */}
       <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🔥 Popular Courses</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dummyCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-purple-800">{course.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{course.offer}</p>
              <p className="text-xl font-semibold text-green-600 mt-2">{course.price}</p>
              <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
                Buy Course
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* Latest Job Posts */}
      {latestJobs.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Job Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-blue-800">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500 mb-4">{job.location}</p>
                <Link
                  to="/jobs"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Older Dummy Jobs */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Older Job Posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-green-800">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default HomePage;
