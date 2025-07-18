const calculateScore = (userProfile, job) => {
  if (!job || !userProfile) return 0;

  let score = 0;
  let total = 3; // total criteria

  // 1. Skill match
  const jobSkills = Array.isArray(job.skills)
  ? job.skills.map(s => s.toLowerCase().trim())
  : job.skills.toLowerCase().split(',').map(s => s.trim());
 const userSkills = Array.isArray(userProfile.skills)
  ? userProfile.skills.map(s => s.toLowerCase().trim())
  : userProfile.skills.toLowerCase().split(',').map(s => s.trim());

  const matchedSkills = jobSkills.filter(skill => userSkills.includes(skill));
  const skillScore = (matchedSkills.length / jobSkills.length) * 100;

  // 2. Location match
  const locationScore = (job.location && userProfile.location &&
    job.location.toLowerCase() === userProfile.location.toLowerCase()) ? 100 : 0;
  score += locationScore;

  // 3. Salary expectation
  const salaryScore = Number(job.salary) >= Number(userProfile.expectedSalary) ? 100 : 0;

  score = (skillScore + locationScore + salaryScore) / total;

  return Math.round(score);
};

export default calculateScore;
