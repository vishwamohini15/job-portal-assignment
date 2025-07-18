const templates = {
  applicationReceived: (seeker, jobTitle) =>
    `Dear Employer,\n\n${seeker} has applied for the job "${jobTitle}". Please review their application.`,

  statusUpdated: (status) =>
    `Dear Candidate,\n\nYour application status has been updated to "${status}". Check your dashboard for more details.`,

  resumeSubmitted: () =>
    `Dear Candidate,\n\nThanks for submitting your resume. You can edit and export it anytime from the Resume Builder.`,
};

export default templates;