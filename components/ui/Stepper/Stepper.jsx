// components/ui/Stepper/Stepper.jsx
'use client';

// Stepper UI Component (Modular & Reusable)

const Stepper = ({ currentStep, totalSteps, goToStep }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="my-6 flex w-full items-center justify-between">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-1 items-center">
          <button
            onClick={() => goToStep(step)}
            aria-current={currentStep === step ? 'step' : undefined}
            className={`z-10 flex h-10 w-10 items-center justify-center rounded-full font-bold transition-colors duration-300 ${
              currentStep > step
                ? 'cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700' // Completed
                : currentStep === step
                  ? 'bg-indigo-500 text-white shadow-lg' // Active
                  : 'cursor-pointer bg-gray-200 text-gray-500 hover:bg-gray-300' // Pending
            } `}
          >
            {currentStep > step ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            ) : (
              step
            )}
          </button>

          {index < totalSteps - 1 && (
            <div
              className={`-ml-1 -mr-1 h-1 flex-1 transition-colors duration-300 ${
                currentStep > step ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
