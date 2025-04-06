import React from "react";

// 1. Define Props for MetricBox
interface MetricBoxProps {
  label: string;
  value: string | number | undefined | null; // Allow different types for value
}

// 2. Type MetricBox component
const MetricBox: React.FC<MetricBoxProps> = ({ label, value }) => (
  // Standardized styling
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full"> {/* Added h-full for consistent height in grid */}
    {/* Standardized text */}
    <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
    <div className="text-base font-semibold text-gray-800">{value || 'N/A'}</div>
  </div>
);

// 3. Define interface for metrics data
interface MetricsData {
  exerciseType: string;
  duration: string;
  performanceScore: number;
  performanceText: string;
}

// 4. Type mockMetrics object
// TODO: Fetch actual metrics data
const mockMetrics: MetricsData = {
  exerciseType: "Climbing Temple Stairs",
  duration: "45 minutes",
  performanceScore: 95,
  performanceText: "Excellent" // Example text based on score
};

// 5. Type ExerciseMetrics component
const ExerciseMetrics: React.FC = () => {
  const { exerciseType, duration, performanceScore, performanceText } = mockMetrics;

  return (
    // Removed margin-top, added responsive grid
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricBox label="Exercise Type" value={exerciseType} />
      <MetricBox label="Duration" value={duration} />

      {/* Performance Score Box - Standardized */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full">
        <div className="text-sm font-medium text-gray-500 mb-1">Performance Score</div>
        <div className="flex items-center gap-2">
          {/* Standardized badge */}
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
            {performanceScore}%
          </span>
          {/* Standardized text */}
          <span className="text-sm text-gray-600">{performanceText}</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseMetrics;
