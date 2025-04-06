import React from "react";

interface ExerciseGoalProps {
  goal: string;
  previousBest?: number; // Made previousBest optional
}

export const ExerciseGoal: React.FC<ExerciseGoalProps> = ({
  goal,
  previousBest
}) => {
  return (
    <div className="flex flex-col gap-2 w-full text-white bg-teal-600 p-4 rounded-lg shadow-md">
      {/* Today's Goal Title - Increased font size */}
      <div className="text-xl font-semibold">Today's Goal</div>
      {/* Goal with Checkmark Icon */}
      <div className="flex items-center gap-2 text-lg">
        {/* Checkmark Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-xl">{goal}</span>
      </div>
      
      {/* Show previous best if available */}
      {previousBest && (
        <div className="flex items-center gap-2 text-sm mt-2 text-teal-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Previous best: {previousBest}</span>
        </div>
      )}
    </div>
  );
};
