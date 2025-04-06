import React from "react";

interface ExerciseHeaderProps {
  title: string;
  icon?: React.ReactNode; // Changed imageSrc/Alt to optional icon prop
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  title,
  icon, // Use the icon prop
}) => {
  return (
    // Updated styling: white text, larger font size, align items center
    <div className="flex gap-4 items-center self-start text-3xl font-semibold text-white">
      {/* Render the icon if provided */}
      {icon && <div className="shrink-0">{icon}</div>}
      <div className="flex-auto my-auto">{title}</div>
    </div>
  );
};
