import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from 'react-confetti';
import StatCard from "./StatCard";
import PerformanceStat from "./PerformanceStat";
import { Exercise, SessionData, saveExerciseSession } from "../../services/api";

const ExerciseComplete: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const saveAttemptedRef = useRef(false); // Add this ref to track save attempts

  // Get data from navigation state
  const {
    exercise,
    sessionData,
    primaryMetricValue,
    primaryMetricName,
    timeTaken,
    averageRate,
    isPersonalBest,
    exerciseName = "Exercise",
  } = location.state || {};
  
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [sessionSaved, setSessionSaved] = useState(false);

  // Effect to get window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to stop confetti after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 20000); // Stop confetti after 20 seconds

    return () => clearTimeout(timer);
  }, []);

  // Save session data to backend when component mounts
  useEffect(() => {
    // Don't try to save if we don't have valid session data or already attempted to save
    if (!sessionData || sessionSaved || saveAttemptedRef.current) return;
    
    // Mark that we've attempted a save
    saveAttemptedRef.current = true;

    // Format the data for the backend
    const formattedSessionData: SessionData = {
      patientId: sessionData.patientId,
      exerciseId: sessionData.exerciseId,
      prescriptionId: sessionData.prescriptionId,
      exerciseCustomization: sessionData.exerciseCustomization,
      status: "completed",
      duration: sessionData.duration,
      metrics: {
        score: sessionData.metrics.score,
        stepsClimbed: sessionData.metrics.stepsClimbed,
        avgSpeed: sessionData.metrics.avgSpeed,
        calories: sessionData.metrics.calories,
        personalBest: sessionData.metrics.personalBest,
        restPeriods: sessionData.metrics.restPeriods,
        restDuration: sessionData.metrics.restDuration,
        heartRate: sessionData.metrics.heartRate,
        timeTaken: sessionData.metrics.timeTaken,
      },
      performance: sessionData.performance,
      patientReported: {
        painLevel: 1,  // Default values, in a real app these would be collected from the user
        exertionLevel: 3,
        confidenceLevel: 4,
        notes: "Completed via patient app"
      },
      feedback: {
        reviewed: false,
        reviewedBy: null,
        reviewDate: null,
        comments: null,
        rating: null,
        improvementAreas: [],
        recommendations: null,
        nextSessionAdjustments: {
          "difficulty": null,
          "duration": null,
          "goals": null
        },
        progressNotes: null
      },
    };

    // Save to backend
    setIsSaving(true);
    saveExerciseSession(formattedSessionData)
      .then(savedSession => {
        console.log('Session saved successfully:', savedSession);
        setSessionSaved(true);
      })
      .catch(error => {
        console.error('Error saving session:', error);
        setSaveError('Failed to save your session. Your progress was not recorded.');
      })
      .finally(() => {
        setIsSaving(false);
      });
  }, [sessionData, sessionSaved]);

  const handleReturn = () => {
    navigate('/'); // Navigate to dashboard
  };

  // If no data passed, show error
  if (!exercise || !sessionData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-white p-4">
        <div className="text-xl text-red-600">No exercise data available</div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-white p-8">
      {/* Confetti Overlay */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
        />
      )}

      {/* Checkmark Icon */}
      <div className="bg-green-500 p-4 rounded-full mb-6 shadow-md z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center z-10">
        Awesome Work!
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-teal-700 mb-8 text-center z-10">
        {exerciseName} Complete!
      </p>

      {/* Saving Indicator */}
      {isSaving && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 w-full max-w-2xl z-10">
          <p className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving your progress...
          </p>
        </div>
      )}

      {/* Save Error */}
      {saveError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 w-full max-w-2xl z-10">
          <p className="font-bold">Error</p>
          <p>{saveError}</p>
        </div>
      )}

      {/* Session Saved Success */}
      {sessionSaved && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 w-full max-w-2xl z-10">
          <p className="font-bold">Success!</p>
          <p>Your session has been saved. Great job!</p>
        </div>
      )}

      {/* Stat Cards Section */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl mb-8 z-10">
        <StatCard
          title={primaryMetricName || "Score"}
          value={primaryMetricValue?.toString() || "0"}
        />
        <StatCard title="Time Taken" value={timeTaken || "0:00"} />
      </div>

      {/* Performance Stats Section */}
      <div className="flex flex-col p-6 rounded-xl bg-white w-full max-w-2xl mb-8 shadow-md z-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Performance Stats
        </h2>
        <ul className="space-y-1">
          <PerformanceStat
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            text={`Average speed: ${averageRate}`}
          />
          {isPersonalBest && (
            <PerformanceStat
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              }
              text="New personal best time!"
              highlight={true}
            />
          )}
          {/* Additional performance stats from sessionData */}
          {sessionData.performance && (
            <>
              <PerformanceStat
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
                text={`Accuracy: ${Math.round(sessionData.performance.accuracy * 100)}%`}
              />
              <PerformanceStat
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                text={`Steadiness: ${Math.round(sessionData.performance.steadiness * 100)}%`}
              />
            </>
          )}
          {sessionData.metrics && sessionData.metrics.heartRate && (
            <PerformanceStat
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              text={`Peak heart rate: ${sessionData.metrics.heartRate.peak} BPM`}
            />
          )}
        </ul>
      </div>

      {/* Enhanced Motivational Message */}
      <div className="flex flex-col items-center text-center rounded-lg bg-teal-50 shadow-sm mb-10 z-10 w-full max-w-md p-6">
        {/* Star Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.31h5.418a.562.562 0 0 1 .321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.07a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988h5.418a.563.563 0 0 0 .475-.31L11.48 3.5Z" />
        </svg>
        {/* Main Motivational Text */}
        <p className="text-3xl font-bold text-teal-600 mb-2">
          Fantastic Effort!
        </p>
        {/* Sub-text */}
        <p className="text-md text-gray-700">
          Keep it up and get even better
        </p>
      </div>

      {/* Return Button */}
      <button
        onClick={handleReturn}
        disabled={isSaving}
        className={`px-8 py-3 bg-teal-600 text-white text-lg font-semibold rounded-xl shadow-md transition-colors z-10 
          ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'}`}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ExerciseComplete;
