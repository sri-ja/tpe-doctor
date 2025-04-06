import React from "react";

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  // Applying light theme: white background, gray text
  return (
    <div className="flex flex-col flex-1 px-6 py-4 bg-white rounded-xl shadow-md text-center">
      {/* Title text color adjusted */}
      <div className="text-sm text-gray-600">{title}</div>
      {/* Value text color and size adjusted */}
      <div className="mt-1 text-3xl font-bold text-gray-800">{value}</div>
    </div>
  );
};

export default StatCard;
