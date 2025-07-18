import React from 'react';

const steps = ["applied", "review", "interview", "selected"];

const getStepIndex = (status) => {
  const index = steps.indexOf(status);
  return index === -1 ? 0 : index;
};

function ApplicationTracker({ status }) {
  const currentStep = getStepIndex(status);

  return (
    <div className="flex gap-2 items-center mt-3">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`h-4 w-4 rounded-full ${
              index <= currentStep ? 'bg-green-600' : 'bg-gray-300'
            }`}
          ></div>
          {index < steps.length - 1 && (
            <div className={`h-1 w-6 ${
              index < currentStep ? 'bg-green-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
      <span className="ml-2 text-sm capitalize text-gray-600">
        {status}
      </span>
    </div>
  );
}

export default ApplicationTracker;