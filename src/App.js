import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobPostPage from './pages/JobPostPage';
import JobListPage from './pages/JobListPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
// import ApplicantsPage from './pages/ApplicantsPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import CompanyDirectory from './pages/CompanyDirectory';
import ApplicantsPage from './pages/ApplicantsPage';
import PostJobWizard from './pages/PostJobWizard';
import RecommendedJobs from './pages/RecommendedJobs';
import HiringBoard from './pages/HiringBoard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Inbox from './pages/Inbox';

function App() {
  const [role, setRole] = useState('seeker'); // seeker or employer



  return (
    <Router>
      <Navbar role={role} setRole={setRole} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobListPage role={role} />} />
        <Route path="/post-job" element={<JobPostPage role={role} />} />
        <Route path="/dashboard" element={<DashboardPage role={role} />} />
        <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        <Route path="/applicants" element={<ApplicantsPage/>} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/companies" element={<CompanyDirectory/>} />
        <Route path="/post-job-wizard" element={<PostJobWizard/>} />
        <Route path="/recommended" element={<RecommendedJobs/>} />
        <Route path="/pipeline" element={<HiringBoard/>} />
        <Route path="/inbox" element={<Inbox/>} />

        

      </Routes>
        <ToastContainer position="top-right" autoClose={3000}/>

    </Router>
    
  );
}

export default App;
