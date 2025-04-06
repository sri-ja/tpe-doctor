import React from "react";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  // Ensure percentage is within 0-100 range
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="w-full">
      {/* Progress bar track */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        {/* Progress bar fill */}
        <div
          className="bg-green-500 h-4 rounded-full" // Use rounded-full for pill shape
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Recovery progress" // Added accessibility label
        />
      </div>
      {/* Percentage Markers */}
      <div className="flex justify-between text-sm text-gray-600 mt-2 px-1">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
      {/* Percentage Text */}
      <div className="text-center text-lg font-semibold text-gray-800 mt-2">
        You are almost there! {clampedPercentage}% complete!
      </div>
    </div>
  );
};

export default ProgressBar;
