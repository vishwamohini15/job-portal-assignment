import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { sendEmail } from '../utils/emailSimulator';
import templates from '../data/emailTemplates';
import { notifySuccess } from '../utils/notify';
import { useRef } from 'react';


function ResumeBuilderPage() {
const resumeRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    experience: '',
    skills: ''
  });

  const previewRef = useRef();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 const handlePrint = useReactToPrint({
  content: () => resumeRef.current,
  documentTitle: 'Resume',
  onAfterPrint: () => {
    notifySuccess("Resume exported successfully!");
    
    sendEmail(
      'seeker@example.com',
      'Resume Submitted',
      templates.resumeSubmitted()
    );
  }
});


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Form */}
      <div>
        <h2 className="text-xl font-bold mb-4">Build Your Resume</h2>
        <form className="space-y-4 bg-white p-6 rounded shadow">
          <input type="text" name="name" placeholder="Full Name"
            value={formData.name} onChange={handleChange}
            className="w-full border p-2 rounded" />
          <input type="email" name="email" placeholder="Email"
            value={formData.email} onChange={handleChange}
            className="w-full border p-2 rounded" />
          <textarea name="education" placeholder="Education"
            value={formData.education} onChange={handleChange}
            className="w-full border p-2 rounded" rows={3} />
          <textarea name="experience" placeholder="Experience"
            value={formData.experience} onChange={handleChange}
            className="w-full border p-2 rounded" rows={3} />
          <input type="text" name="skills" placeholder="Skills (comma separated)"
            value={formData.skills} onChange={handleChange}
            className="w-full border p-2 rounded" />
          <button type="button" onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Export to PDF
          </button>
        </form>
      </div>

      {/* Preview */}
      <div>
        <h2 className="text-xl font-bold mb-4">Live Preview</h2>
        <div ref={previewRef} className="border p-6 rounded shadow bg-white space-y-3">
          <h3 className="text-2xl font-semibold text-blue-600">{formData.name || 'Your Name'}</h3>
          <p className="text-sm text-gray-600">{formData.email || 'you@example.com'}</p>
          <div>
            <h4 className="font-semibold">Education</h4>
            <p>{formData.education || '-'}</p>
          </div>
          <div>
            <h4 className="font-semibold">Experience</h4>
            <p>{formData.experience || '-'}</p>
          </div>
          <div>
            <h4 className="font-semibold">Skills</h4>
            <ul className="list-disc list-inside">
              {(formData.skills ? formData.skills.split(',') : []).map((s, i) => (
                <li key={i}>{s.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilderPage;
