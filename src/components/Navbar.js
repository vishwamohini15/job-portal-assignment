import React from 'react';
import { Link } from 'react-router-dom';
// import { useEffect } from 'react';


function Navbar({ role, setRole }) {
  const handleToggle = () => {
    setRole(prev => (prev === 'seeker' ? 'employer' : 'seeker'));
  };
// localStorage.setItem('userRole', 'employer');

//   useEffect(() => {
//   const savedRole = localStorage.getItem('userRole');
//   if (savedRole) {
//     setRole(savedRole);
//   }
// }, []);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Job Portal</div>
      <div className="flex gap-4 items-center">
       <Link to="/">Home</Link>
  <Link to="/jobs">Jobs</Link>
  {role === 'employer' && <Link to="/post-job">Post a Job</Link>}
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/resume-builder">Resume Builder</Link>
  <Link to="/companies" className="hover:underline">Companies</Link>
<Link to="/post-job-wizard">Post a Job</Link>

  
  {role?.toLowerCase() === 'employer' && (
  <Link to="/applicants" className="text-blue-600 hover:underline">
    Manage Applications
  </Link>
)}

{role === 'employer' && (
  <Link to="/analytics" className="text-blue-600 hover:underline">
    Analytics
  </Link>
)}

{role === 'seeker' && (
  <Link to="/recommended" className="hover:underline">Recommended</Link>
)}
{role === 'employer' && (
  <Link to="/pipeline" className="hover:underline">Hiring Pipeline</Link>
)}
<Link to="/inbox">Inbox</Link>


        <button
          onClick={handleToggle}
          className="bg-white text-blue-600 px-3 py-1 rounded"
        >
          Switch to {role === 'seeker' ? 'Employer' : 'Seeker'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
