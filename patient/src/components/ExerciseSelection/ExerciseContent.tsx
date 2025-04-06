import React from "react";

interface ExerciseContentProps {
  description: string;
  duration: string;
  level: string;
}

export const ExerciseContent: React.FC<ExerciseContentProps> = ({
  description,
  duration,
  level,
}) => {
  return (
    // Removed outer fragment and unnecessary divs
    // Added main container with flex column and gap
    <div className="flex flex-col gap-4 text-white">
      {/* Description */}
      <p className="text-lg leading-relaxed">{description}</p>

      {/* Duration and Level Row */}
      <div className="flex gap-6 items-center text-lg font-medium">
        {/* Duration */}
        <div className="flex items-center gap-2">
          {/* Clock Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{duration}</span>
        </div>

        {/* Level */}
        <div className="flex items-center gap-2">
          {/* Person/Beginner Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> {/* Simple person icon */}
          </svg>
          {/* Making level uppercase to match image */}
          <span>{level}</span>
        </div>
      </div>
    </div>
  );
};
