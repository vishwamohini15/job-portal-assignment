const useCompatibilityScore = (job, userProfile) => {
  if (!job || !userProfile) return 0;

  let score = 0;
  let total = 3; // total criteria

  // 1. Skill match
  const jobSkills = job.skills.toLowerCase().split(',').map(s => s.trim());
  const userSkills = userProfile.skills.toLowerCase().split(',').map(s => s.trim());
  const matchedSkills = jobSkills.filter(skill => userSkills.includes(skill));
  const skillScore = (matchedSkills.length / jobSkills.length) * 100;

  // 2. Location match
  const locationScore = job.location.toLowerCase() === userProfile.location.toLowerCase() ? 100 : 0;

  // 3. Salary expectation
  const salaryScore = Number(job.salary) >= Number(userProfile.expectedSalary) ? 100 : 0;

  // Final weighted average
  score = (skillScore + locationScore + salaryScore) / total;

  return Math.round(score);
};

export default useCompatibilityScore;
