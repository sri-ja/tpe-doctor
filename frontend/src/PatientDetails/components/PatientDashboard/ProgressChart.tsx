import React from "react";

const ProgressChart: React.FC = () => {
  return (
    // Removed margin-bottom, standardized styling
    <div>
      {/* Standardized heading style */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Progress Chart</h2>
      {/* Standardized placeholder container */}
      <div
        className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-[300px] flex items-center justify-center"
        role="img"
        aria-label="Patient progress chart placeholder"
      >
        {/* Standardized placeholder text */}
        <p className="text-base text-gray-500">Chart data will be displayed here.</p>
      </div>
    </div>
  );
};

export default ProgressChart;
