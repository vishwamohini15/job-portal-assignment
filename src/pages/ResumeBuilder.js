// src/pages/ResumeBuilder.jsx
import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from '../components/ResumePDF';

const ResumeBuilder = () => {
  const [resume, setResume] = useState({
    name: '',
    contact: '',
    summary: '',
    education: '',
    experience: '',
    skills: ''
  });

  const handleChange = (field, value) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Resume Builder 🛠️
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Fill Your Details ✍️</h2>
          {Object.entries(resume).map(([field, value]) => (
            <div key={field} className="mb-4">
              <label className="block font-medium capitalize text-sm text-gray-600 mb-1">
                {field}
              </label>
              <textarea
                rows={field === 'summary' ? 4 : 2}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
        </div>

        {/* Right: Live Preview */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Live Preview 📄</h2>
          <div className="bg-white p-4 rounded shadow text-sm whitespace-pre-line border border-dashed border-gray-300">
            <p className="text-lg font-bold">{resume.name}</p>
            <p className="text-gray-700">{resume.contact}</p>
            <p className="mt-2 italic">{resume.summary}</p>
            <p className="mt-2"><strong>Education:</strong> {resume.education}</p>
            <p className="mt-2"><strong>Experience:</strong> {resume.experience}</p>
            <p className="mt-2"><strong>Skills:</strong> {resume.skills}</p>
          </div>

          <div className="mt-6">
            <PDFDownloadLink
              document={<ResumePDF resume={resume} />}
              fileName="Resume.pdf"
              className="inline-block"
            >
              {({ loading }) => (
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded mt-2 transition"
                >
                  {loading ? 'Generating PDF...' : 'Download PDF'}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
