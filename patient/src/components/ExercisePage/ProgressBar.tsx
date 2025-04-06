import React from "react";

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  // Calculate percentage, ensuring it doesn't exceed 100%
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    // Keep light gray background, full width
    <div className="w-full mt-3 bg-gray-200 rounded-full h-2.5 overflow-hidden"> 
      <div
        // Changed fill color to teal for theme consistency
        className="h-2.5 bg-teal-500 rounded-full transition-width duration-300 ease-in-out" 
        style={{ width: `${percentage}%` }}
      />
    </div> 
  );
};

export default ProgressBar;
