import React from "react";
import { useNavigate } from "react-router-dom";

const StartSessionButton: React.FC = () => {
  const navigate = useNavigate();

  const handleStartSession = () => {
    navigate('/exercise-list');
  };

  return (
    <button
      // Updated styles: full width, teal background, adjusted padding/text size, removed specific margins
      className="w-full px-6 py-4 text-lg font-semibold text-center text-white bg-teal-500 rounded-xl shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-colors duration-200"
      onClick={handleStartSession}
    >
      Let's go! Click here to start your session.
    </button>
  );
};

export default StartSessionButton;
