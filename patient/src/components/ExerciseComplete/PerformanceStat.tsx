import React from "react";

interface PerformanceStatProps {
  text: string;
  icon?: React.ReactNode; // Optional icon element
  highlight?: boolean; // Optional flag for highlighting
}

const PerformanceStat: React.FC<PerformanceStatProps> = ({ text, icon, highlight }) => {
  // Base classes
  const baseClasses = "flex items-center gap-3 py-2";
  // Conditional classes for highlighting
  const highlightClasses = highlight ? "font-semibold text-teal-600" : "text-gray-700";

  return (
    <li className={`${baseClasses} ${highlightClasses}`}>
      {icon && <span className="text-teal-500">{icon}</span>} {/* Render icon if provided */}
      <span>{text}</span>
    </li>
  );
};

export default PerformanceStat;
