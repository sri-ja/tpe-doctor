import React from "react";
import { useNavigate } from "react-router-dom";

interface StartButtonProps {
  exerciseId: string;
  exerciseData: any; // Exercise data object
}

export const StartButton: React.FC<StartButtonProps> = ({ exerciseId, exerciseData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to exercise page with exercise data in state
    navigate(`/exercise/${exerciseId}`, { 
      state: { 
        exercise: exerciseData,
        startTime: new Date().toISOString()
      } 
    });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-green-600 hover:bg-green-400 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-200 ease-in-out"
    >
      Start Exercise
    </button>
  );
};
