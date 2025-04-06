import React, { useState, useEffect } from 'react';

const messages = [
  "Keep pushing, you're doing great!",
  "Every step counts towards your goal!",
  "Stay focused, stay strong!",
  "You've got this!",
  "Believe in yourself and keep going!",
  "Consistency is key!",
  "Feel the burn, embrace the progress!",
  "One step at a time!",
];

const MotivationalMessage: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMessage(messages[randomIndex]);
    }, 10000); // Change message every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    // Consistent card styling: white bg, rounded-xl, shadow-md, padding
    // Added text-center and adjusted margin/padding
    <div className="mt-6 p-6 bg-white text-center rounded-xl shadow-md"> 
      {/* Increased font size and changed color */}
      <p className="text-xl font-medium text-teal-700 italic">{message}</p> 
    </div>
  ); 
};

export default MotivationalMessage;
