import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseGrid from "./ExerciseGrid";
import { usePatient } from "../../context/patientContext";

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

const ExerciseList: React.FC = () => {
  const navigate = useNavigate();
  const { patientDetails, isLoading: patientLoading } = usePatient();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!patientDetails) {
          setExercises([]);
          return;
        }
        
        // Get the active prescription IDs from patient details
        const { activePrescriptionIds } = patientDetails.treatmentPlan;
        
        if (!activePrescriptionIds.length) {
          setExercises([]);
          return;
        }
        
        // Fetch exercises for this patient
        const response = await fetch(`http://localhost:5000/api/exercises/patient/${patientDetails.id}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if patient data is loaded
    if (!patientLoading) {
      fetchExercises();
    }
  }, [patientDetails, patientLoading]);

  const handleExerciseClick = (exercise: Exercise) => {
    navigate(`/exercise-details/${exercise.name.toLowerCase().replace(/\s+/g, '-')}`, {
      state: { exercise }
    });
  };

  return (
    // Apply gradient background and adjust padding
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-100 via-green-100 to-white p-8">
      {/* Center content */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Update title and subtitle */}
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Treat yourself to a powerful workout!
        </h1>
        <p className="mt-2 text-lg text-center text-teal-700">
          Choose one accelerate your journey to recovery
        </p>
        
        {/* Show loading state */}
        {isLoading && (
          <div className="mt-10 text-center">
            <p className="text-xl text-gray-600">Loading your exercises...</p>
          </div>
        )}
        
        {/* Show error message if any */}
        {error && (
          <div className="mt-10 text-center">
            <p className="text-xl text-red-600">Error: {error}</p>
          </div>
        )}
        
        {/* Show message if no exercises */}
        {!isLoading && !error && exercises.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-xl text-gray-600">No exercises found in your treatment plan.</p>
          </div>
        )}
        
        {/* Render exercises if available */}
        {!isLoading && !error && exercises.length > 0 && (
          <div className="mt-10">
            <ExerciseGrid exercises={exercises} onExerciseClick={handleExerciseClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseList;
