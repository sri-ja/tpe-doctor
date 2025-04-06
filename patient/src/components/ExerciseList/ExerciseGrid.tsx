import React from "react";
import ExerciseCard from "./ExerciseCard";

interface Exercise {
  id: string;
  name: string;
  type: string;
  description: string;
  image: {
    thumbnail: string;
    banner: string;
  };
  targetBodyParts: string[];
  difficulty: string;
  estimatedDuration: string;
  goals: Record<string, any>;
  customizationOptions: Record<string, any>;
}

interface ExerciseGridProps {
  exercises: Array<Exercise>;
  onExerciseClick: (exercise: Exercise) => void;
}

const ExerciseGrid: React.FC<ExerciseGridProps> = ({ exercises, onExerciseClick }) => {
  return (
    // Use CSS Grid for layout: 2 columns on medium screens+, 1 column below
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          onClick={() => onExerciseClick(exercise)}
          className="cursor-pointer"
        >
          <ExerciseCard
            title={exercise.name}
            description={exercise.description}
            duration={exercise.estimatedDuration}
            imageBanner={exercise.image.banner}
            imageThumbnail={exercise.image.thumbnail}
            type={exercise.type}
            difficulty={exercise.difficulty}
          />
        </div>
      ))}
    </div>
  );
};

export default ExerciseGrid;
