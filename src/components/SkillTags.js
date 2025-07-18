import React from 'react';

function SkillTags({ jobSkills = '', userSkills = '' }) {
  const jobSkillArray = jobSkills.toLowerCase().split(',').map(skill => skill.trim());
  const userSkillArray = userSkills.toLowerCase().split(',').map(skill => skill.trim());

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {jobSkillArray.map((skill, index) => {
        const isMatched = userSkillArray.includes(skill);
        return (
          <span
            key={index}
            className={`px-2 py-1 rounded text-xs font-medium ${
              isMatched ? 'bg-green-100 text-green-700 border border-green-400' :
                          'bg-gray-200 text-gray-600'
            }`}
          >
            {skill}
          </span>
        );
      })}
    </div>
  );
}

export default SkillTags;