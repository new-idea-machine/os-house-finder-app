import React from 'react';
import rightArrow from '@assets/images/home/steps_arrow.png';

function DescriptionSteps() {
  const stepsData = [
    {
      id: 1,
      title: 'Step 1',
      description: 'Create Profile',
    },
    {
      id: 2,
      title: 'Step 2',
      description: 'Add Require-ments',
    },
    {
      id: 3,
      title: 'Step 3',
      description: 'Add Listings',
    },
    {
      id: 4,
      title: 'Step 4',
      description: 'Rank Importance',
    },
    {
      id: 5,
      title: 'Step 5',
      description: 'Let Us Calculate!',
    },
  ];

  return (
    <div className="my-10 flex flex-wrap justify-center gap-10 px-48">
      {stepsData.map((step) => {
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center justify-center">
              <h3 className="mb-6 text-center text-3xl font-bold">
                {step.title}
              </h3>
              <div className="flex h-36 w-36 items-center justify-center rounded-full border border-slate-200 text-center text-xl text-white">
                {step.description}
              </div>
            </div>
            {step.id !== stepsData.length && (
              <div className="relative w-32">
                <img
                  src={rightArrow}
                  alt="Right Arrow"
                  className="absolute bottom-[12%]"
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default DescriptionSteps;
