import React from "react";

interface ExerciseCardProps {
  title: string;
  description: string;
  duration: string;
  imageBanner?: string;
  imageThumbnail?: string;
  type: string;
  difficulty: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  title,
  description,
  duration,
  imageBanner,
  imageThumbnail,
  type,
  difficulty,
}) => {
  // Function to get appropriate icon based on exercise type
  const getExerciseTypeIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      "motor-skills": "🏃",
      "gross-motor": "🦿",
      "mobility": "🚶",
      "upper-limb": "💪",
      "hand-eye-coordination": "🤹",
      "balance": "⚖️",
    };
    
    return iconMap[type] || "🏆";
  };

  // Function to get badge color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    const colorMap: Record<string, string> = {
      "very-easy": "bg-green-100 text-green-800",
      "easy": "bg-blue-100 text-blue-800",
      "moderate": "bg-yellow-100 text-yellow-800",
      "challenging": "bg-orange-100 text-orange-800",
      "difficult": "bg-red-100 text-red-800",
    };
    
    return colorMap[difficulty] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex flex-col items-center p-6 text-center rounded-2xl bg-amber-50 shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Exercise image or icon */}
      <div className="mb-4 relative">
        {imageBanner ? (
          <img
            src={imageBanner}
            alt={title}
            className="w-full h-32 object-cover rounded-lg shadow-md"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center text-4xl bg-gray-200 rounded-lg">
            {getExerciseTypeIcon(type)}
          </div>
        )}
        {/* Difficulty badge */}
        <span className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-semibold rounded-full ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
      </div>
      
      {/* Exercise title */}
      <div className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </div>
      
      {/* Exercise type badge */}
      <div className="mb-2">
        <span className="px-2 py-1 text-xs bg-teal-100 text-teal-800 rounded-full">
          {type}
        </span>
      </div>
      
      {/* Exercise description */}
      <div className="text-sm text-gray-600 mb-3 h-12 overflow-hidden">
        {description}
      </div>
      
      {/* Duration information */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="inline-flex items-center">
          <span className="mr-1">⏱️</span> {duration}
        </span>
      </div>
      
      {/* Call-to-action button */}
      <button className="px-6 py-2 font-semibold text-white bg-teal-500 rounded-full hover:bg-teal-600 transition-colors duration-200 shadow-sm">
        Let's recover!
      </button>
    </div>
  );
};

export default ExerciseCard;
