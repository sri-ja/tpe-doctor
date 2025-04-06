import React from "react";

interface MetricCardProps {
  icon: string;
  title: string;
  value: string;
  unit: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  unit,
}) => {
  return (
    // Use flex-1 for flexible width, add min-width for smaller screens
    <div className="flex flex-col flex-1 min-w-[280px]"> 
      {/* Consistent card styling: white bg, rounded-xl, shadow-md, padding */}
      <div className="flex flex-col grow p-6 w-full bg-white rounded-xl shadow-md"> 
        {/* Increased title size and weight */}
        <div className="flex gap-3 items-center text-lg font-medium text-gray-700"> 
          <img
            loading="lazy"
            src={icon}
            // Ensure icon size is appropriate
            className="object-contain shrink-0 w-6 h-6 aspect-square"
            alt={`${title} icon`}
          />
          <div>{title}</div>
        </div>
        {/* Adjusted alignment and spacing */}
        <div className="flex gap-1.5 items-baseline mt-2 whitespace-nowrap"> 
          {/* Increased value size, changed color to teal */}
          <div className="text-5xl font-bold leading-none text-teal-600"> 
            {value}
          </div>
          {/* Increased unit size */}
          <div className="text-lg text-gray-600">{unit}</div> 
        </div>
      </div>
    </div> 
  );
};

export default MetricCard;
