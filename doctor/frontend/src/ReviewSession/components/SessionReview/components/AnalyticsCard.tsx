import React from "react";

// 1. Define Props interface
interface Props {
  title: string;
  value: string | number; // Value could be string or number
  unit?: string; // Unit is optional
}

// 2. Type the component
const AnalyticsCard: React.FC<Props> = ({ title, value, unit }) => {
  return (
    // Removed outer div with fixed width, standardized styling
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm h-full"> {/* Added h-full */}
      {/* Standardized text styles */}
      <div className="text-sm font-medium text-gray-500 mb-1">{title || 'N/A'}</div>
      <div className="flex items-baseline gap-1.5"> {/* Use items-baseline for better alignment */}
        {/* Standardized value style */}
        <div className="text-2xl font-semibold text-blue-600">{value || '0'}</div>
        {/* Standardized unit style */}
        <div className="text-sm text-gray-500">{unit || ''}</div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
