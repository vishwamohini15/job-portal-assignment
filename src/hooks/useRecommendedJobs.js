import { useEffect, useState } from 'react';
import useCompatibilityScore from './useCompatibilityScore';

const useRecommendedJobs = () => {
  const [recommended, setRecommended] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const calculateScore = useCompatibilityScore();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    if (!profile) return;

    setUserProfile(profile);

    const scoredJobs = jobs.map(job => ({
      ...job,
      score: calculateScore(profile, job)
    }));

    const topMatches = scoredJobs
      .filter(j => j.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setRecommended(topMatches);
  }, []);

  return { recommended, userProfile };
};

export default useRecommendedJobs;
