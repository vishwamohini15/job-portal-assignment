import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ role, setRole }) {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close

  const handleToggleRole = () => {
    const newRole = role === 'seeker' ? 'employer' : 'seeker';
    setRole(newRole);
    setIsOpen(false); // Close mobile menu after role change
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Brand/Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide text-white hover:text-gray-100 transition duration-300">
          Jobify <span className="text-yellow-300">Portal</span>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 rounded-md transition duration-300"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8 text-lg font-medium">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>Home</NavLink>
          <NavLink to="/jobs" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>Jobs</NavLink>
          {role === 'employer' && (
            <NavLink to="/post-job" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>JobPost</NavLink>
          )}
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>Dashboard</NavLink>
          <NavLink to="/companies" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>Companies</NavLink>
          
          {role === 'employer' && (
            <>
              <NavLink to="/post-job-wizard" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>PostWizard</NavLink>
              <NavLink to="/applicants" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>Applicants</NavLink>
              <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>Analytics</NavLink>
              <NavLink to="/pipeline" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>Hiring</NavLink>
            </>
          )}
          {role === 'seeker' && (
            <NavLink to="/recommended" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>Recommended</NavLink>
          )}
          <NavLink to="/inbox" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>Inbox</NavLink>
          <NavLink to="/resume" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} onClick={closeMobileMenu}>Resume Builder</NavLink>
        </div>

        {/* Role Toggle Button (Desktop) */}
        <button
          onClick={handleToggleRole}
          className="hidden md:block bg-white text-blue-700 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 hover:text-blue-800 transition duration-300 transform hover:scale-105"
        >
          Switch to {role === 'seeker' ? 'Employer' : 'Seeker'}
        </button>
      </div>

      {/* Mobile Menu (Conditionally Rendered) */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 pt-2 pb-4 shadow-inner">
          <div className="flex flex-col items-center space-y-3 text-lg font-medium">
            <NavLink to="/" className="nav-link-mobile" onClick={closeMobileMenu}>Home</NavLink>
            <NavLink to="/jobs" className="nav-link-mobile" onClick={closeMobileMenu}>Jobs</NavLink>
            {role === 'employer' && (
              <NavLink to="/post-job" className="nav-link-mobile" onClick={closeMobileMenu}>Post a Job</NavLink>
            )}
            <NavLink to="/dashboard" className="nav-link-mobile" onClick={closeMobileMenu}>Dashboard</NavLink>
            <NavLink to="/companies" className="nav-link-mobile" onClick={closeMobileMenu}>Companies</NavLink>

            {role === 'employer' && (
              <>
                <NavLink to="/post-job-wizard" className="nav-link-mobile" onClick={closeMobileMenu}>Post Job (Wizard)</NavLink>
                <NavLink to="/applicants" className="nav-link-mobile" onClick={closeMobileMenu}>Applicants</NavLink>
                <NavLink to="/analytics" className="nav-link-mobile" onClick={closeMobileMenu}>Analytics</NavLink>
                <NavLink to="/pipeline" className="nav-link-mobile" onClick={closeMobileMenu}>Hiring Pipeline</NavLink>
              </>
            )}
            {role === 'seeker' && (
              <NavLink to="/recommended" className="nav-link-mobile" onClick={closeMobileMenu}>Recommended</NavLink>
            )}
            <NavLink to="/inbox" className="nav-link-mobile" onClick={closeMobileMenu}>Inbox</NavLink>
            <NavLink to="/resume" className="nav-link-mobile" onClick={closeMobileMenu}>Resume Builder</NavLink>
            
            {/* Role Toggle Button (Mobile) */}
            <button
              onClick={handleToggleRole}
              className="mt-4 bg-white text-blue-700 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 hover:text-blue-800 transition duration-300 transform hover:scale-105 w-auto"
            >
              Switch to {role === 'seeker' ? 'Employer' : 'Seeker'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;