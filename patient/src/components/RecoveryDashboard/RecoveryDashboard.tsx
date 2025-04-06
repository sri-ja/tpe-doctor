import React, { useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Leaderboard from "./Leaderboard";
import NextAppointment from "./NextAppointment";
import StartSessionButton from "./StartSessionButton"; // Will likely rename/refactor this later
import { usePatient } from "../../context/patientContext"; // Assuming you have a context for patient data


const RecoveryDashboard: React.FC = () => {
  const { patientDetails, fetchPatientById, isLoading, error } = usePatient();
  
  // Add this effect to fetch data when component mounts
  useEffect(() => {
    // Replace '123' with actual patient ID (could come from auth or params)
    fetchPatientById('p-123456')
    console.log("Fetching patient data");
  }, [fetchPatientById]);

  // Add loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-white px-4 sm:px-6 lg:px-8 py-8 justify-center items-center">
        <div className="text-2xl font-semibold">Loading patient data...</div>
      </div>
    );
  }

  // Add error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-white px-4 sm:px-6 lg:px-8 py-8 justify-center items-center">
        <div className="text-2xl font-semibold text-red-600">Error: {error}</div>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => fetchPatientById('p-123456')} // Retry fetching patient data
        >
          Try Again
        </button>
      </div>
    );
  }

  const patientName = patientDetails?.personalInfo.firstName || "Patient"; // Fallback to "Patient" if name is not available
  const recoveryPercentage = patientDetails?.recoveryStatus.overallProgress || 0; // Fallback to 0 if not available
  const remainingPercentage = (100 - recoveryPercentage).toFixed(2); // Calculate remaining percentage
  return (
    // Main container with gradient background
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-white px-4 sm:px-6 lg:px-8 py-8">
      {/* Motivational Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          You're crushing it, {patientName}!
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 mt-2">
          Just {remainingPercentage}% more to full recovery!
        </p>
      </div>

      {/* Dashboard Content Area */}
      <div className="flex flex-col space-y-6 w-full max-w-2xl mx-auto">
        {/* Comeback Journey Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Comeback Journey
          </h2>
          <ProgressBar percentage={recoveryPercentage} />
        </div>

        {/* Leaderboard Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <Leaderboard />
        </div>

        {/* Quote Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          {/* <span className="text-4xl text-gray-400">“</span> */}
          <span className="text-lg text-gray-700 italic text-center">
            Small steps every day lead to big changes over time. Keep going!
          </span>
          {/* <span className="text-4xl text-gray-400">”</span> */}
        </div>

        {/* Action Button */}
        <div className="mt-4"> {/* Added margin-top */}
          <StartSessionButton /> {/* We'll update the text/styling inside this component */}
        </div>


        {/* Next Appointment Card
        <div className="bg-white rounded-xl shadow-md p-6">
          <NextAppointment />
        </div> */}
      </div>
    </div>
  );
};

export default RecoveryDashboard;
