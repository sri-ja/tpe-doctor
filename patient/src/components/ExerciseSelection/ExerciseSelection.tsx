import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ExerciseHeader } from "./ExerciseHeader";
import { ExerciseContent } from "./ExerciseContent";
import { ExerciseGoal } from "./ExerciseGoal";
import { StartButton } from "./StartButton";

interface ExerciseDetails {
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

const ExerciseSelection: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const location = useLocation();
  const [exercise, setExercise] = useState<ExerciseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Try to get exercise from location state first, otherwise fetch it
  useEffect(() => {
    const fetchExerciseDetails = async () => {
      setLoading(true);
      
      try {
        // Check if exercise data is already available in location state
        if (location.state && location.state.exercise) {
          setExercise(location.state.exercise);
          return;
        }
        
        // If not, fetch from API
        if (!exerciseId) {
          throw new Error("Exercise ID not provided");
        }
        
        const response = await fetch(`http://localhost:5000/api/exercises/${exerciseId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch exercise details");
        }
        
        const data = await response.json();
        setExercise(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching exercise details:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExerciseDetails();
  }, [exerciseId, location.state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-white">
        <div className="text-xl text-teal-800">Loading exercise details...</div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-white">
        <div className="text-xl text-red-600">
          {error || "Failed to load exercise details"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-white p-4">
      <div className="flex flex-col max-w-lg w-full bg-teal-500 rounded-2xl shadow-lg overflow-hidden text-white">
        <div className="p-6">
          <ExerciseHeader
            title={exercise.name}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
        </div>

        <div className="relative p-4">
          <img
            src={exercise.image.thumbnail ? exercise.image.thumbnail : exercise.image.banner}
            className="w-full h-80 object-cover object-center rounded-3xl"
          />
          <div className="absolute top-4 right-4 bg-white text-blue-600 font-bold px-3 py-1 rounded-md text-sm shadow">
            INTERACTIVE GAME
          </div>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <ExerciseContent
            description={exercise.description}
            duration={exercise.estimatedDuration}
            level={exercise.difficulty}
          />
          <ExerciseGoal 
            goal={`${exercise.goals.steps ? `Climb ${exercise.goals.steps} steps` : 
                  exercise.goals.targets ? `Hit ${exercise.goals.targets} targets` :
                  exercise.goals.distance ? `Walk ${exercise.goals.distance}m` :
                  `Complete exercise`}`} 
          />
          <StartButton exerciseData={exercise} exerciseId={exercise.id} />
        </div>
      </div>
    </div>
  );
};

export default ExerciseSelection;
