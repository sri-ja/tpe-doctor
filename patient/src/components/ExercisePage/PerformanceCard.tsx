import React from "react";

// Define a metric type to support various exercise metrics
export interface ExerciseMetric {
  name: string;
  value: string;
  unit?: string;
}

interface PerformanceCardProps {
  icon: string;
  title?: string;
  metrics: ExerciseMetric[];
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  icon,
  title = "Performance",
  metrics = [],
}) => {
  return (
    <div className="flex flex-col flex-1 min-w-[280px]">
      <div className="flex grow flex-col p-6 w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Header with icon and title */}
        <div className="flex gap-3 items-center mb-4">
          <div className="p-2 bg-teal-100 rounded-lg">
            <img
              loading="lazy"
              src={icon}
              className="object-contain w-6 h-6 aspect-square"
              alt={`${title} icon`}
            />
          </div>
          <div className="text-lg font-medium text-gray-700">{title}</div>
        </div>
        
        {/* Metrics display */}
        <div className="flex flex-wrap justify-between gap-4 mt-2">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${metrics.length > 1 ? 'flex-1' : 'w-full'}`}
            >
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {metric.name}
              </div>
              <div className="mt-1 flex items-baseline">
                <div className="text-3xl font-bold text-teal-600">
                  {metric.value}
                </div>
                {metric.unit && (
                  <div className="ml-1 text-lg text-gray-600">
                    {metric.unit}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
