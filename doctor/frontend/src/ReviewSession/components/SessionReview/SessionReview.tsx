import React, { useState, useEffect } from "react";
import ExerciseMetrics from "./components/ExerciseMetrics"; // Assuming this will be updated
import AnalyticsCard from "./components/AnalyticsCard"; // Assuming this will be updated
import CommentSection from "./components/CommentSection"; // Assuming this will be updated
import { useNavigate, useParams } from "react-router-dom";
import { completeSessionReview } from "../../../services/api";

const BackArrowIcon: React.FC = () => (
  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const SessionReview: React.FC = () => {
  const navigate = useNavigate();
  const { patientId, sessionId } = useParams<{ patientId: string; sessionId: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add debug logs to track params
  useEffect(() => {
    console.log('Current URL params:', { patientId, sessionId });
  }, [patientId, sessionId]);

  const sessionDetails: { date: string; time: string } = { date: "Jan 15, 2024", time: "10:00 AM" }; // Placeholder

  const handleFinishReview = async (): Promise<void> => {
    console.log('Attempting to finish review for session:', sessionId);
    
    if (!sessionId) {
      const error = "Session ID is missing from URL parameters";
      console.error(error);
      setError(error);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await completeSessionReview(sessionId);
      console.log("Review Completed for session:", sessionId);
      navigate("/"); // Navigate back to patient list on success
    } catch (err) {
      const errorMessage = "Failed to complete review. Please try again.";
      console.error(errorMessage, err);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 md:p-8 space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold text-gray-800">
            Session Review
          </h1>
          <time className="text-sm text-gray-500">
            {sessionDetails.date} - {sessionDetails.time}
          </time>
        </div>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Return to Patient List"
        >
          <BackArrowIcon />
          Back to Patient List
        </button>
      </header>

      <ExerciseMetrics />

      <section aria-labelledby="analytics-title">
        <h2 id="analytics-title" className="text-lg font-semibold text-gray-700 mb-3">
          Exercise Analytics
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsCard title="Average Heart Rate" value="85" unit="BPM" />
            <AnalyticsCard title="Steps Climbed" value="248" unit="steps" />
            <AnalyticsCard title="Average Speed" value="18" unit="steps/min" />
            <AnalyticsCard title="Calories Burned" value="186" unit="kcal" />
          </div>
        </div>
      </section>

      <section aria-labelledby="progress-title">
        <h2 id="progress-title" className="text-lg font-semibold text-gray-700 mb-3">
          Progress Chart
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-[300px] flex items-center justify-center">
          <p className="text-base text-gray-500">Progress chart data will be displayed here.</p>
        </div>
      </section>

      {patientId ? <CommentSection patientId={patientId} /> : <div>Loading patient data...</div>}

      {error && (
        <div className="text-red-600 text-sm mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleFinishReview}
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Completing...' : 'Finish Review'}
        </button>
      </div>
    </div>
  );
};

export default SessionReview;
