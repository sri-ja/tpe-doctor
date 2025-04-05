import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import PatientStats from "./PatientStats";
import ProgressChart from "./ProgressChart";
import AppointmentHistory from "./AppointmentHistory";
import SessionScheduler from "./SessionScheduler";
import ExerciseAssignment from "./ExerciseAssignment";
import CompletedSessions from "./CompletedSessions";

// 1. Define Appointment interface
interface Appointment {
  date: string;
  time: string;
  description: string;
}

// 2. Define PatientData interface
interface PatientData {
  id: string;
  name: string;
  age: string;
  treatmentStart: string;
  progressLevel: string; // Consider using 'low' | 'medium' | 'high' if applicable
  appointments: Appointment[];
}

// 3. Type mockOngoingPatients array
// Keep mock data for now
const mockOngoingPatients: PatientData[] = [
  {
    id: "PT001",
    name: "Sarah Johnson",
    age: "42 years",
    treatmentStart: "Mar 15, 2024",
    progressLevel: "High",
    appointments: [
      {
        date: "Mar 15, 2024",
        time: "10:30 AM",
        description: "Completed balance exercises with improved stability",
      },
      {
        date: "Mar 12, 2024",
        time: "2:15 PM",
        description: "Focus training session - good progress on coordination",
      },
    ],
  },
  // Add more patients as needed
];

// 4. Type PatientDashboard component
const PatientDashboard: React.FC = () => {
  // 5. Type patientId from useParams
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();

  // 7. Type handleReviewSession
  const handleReviewSession = (): void => {
    // Keep this handler, it's used by CompletedSessions
    // Ensure patientId exists before navigating
    if (patientId) {
      navigate(`/session-review/${patientId}`);
    } else {
      console.error("Cannot navigate to session review: patientId is undefined.");
    }
  };

  // 6. Type the patient variable
  const patient: PatientData | undefined = mockOngoingPatients.find(p => p.id === patientId);

  if (!patient) {
    // Improved 'Not Found' state
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 bg-white rounded-lg border border-gray-200 shadow-lg p-6 md:p-8">
        Patient data not found for ID: {patientId}
      </div>
    );
  }

  return (
    // Removed outer div and main, applying standard container styling
    // Added space-y-8 for vertical spacing between direct children
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 md:p-8 space-y-8">
        <PatientHeader
          name={patient.name}
          patientId={patient.id}
          photoUrl="https://placehold.co/48x48" // Placeholder image
        />

        <PatientStats
          age={patient.age}
          treatmentStart={patient.treatmentStart}
          progressLevel={patient.progressLevel}
        />

        {/* Assuming ProgressChart is a self-contained component */}
        <ProgressChart />

        {/* Grid for Appointment History and Scheduler */}
        {/* Adjusted grid columns for better responsiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AppointmentHistory appointments={patient.appointments} />
          <SessionScheduler />
        </div>

        {/* Assuming ExerciseAssignment is self-contained */}
        <ExerciseAssignment />

        {/* Assuming CompletedSessions is self-contained */}
        <CompletedSessions onReviewSession={handleReviewSession} />

        {/* Standardized Back Button */}
        <div className="flex pt-6 border-t border-gray-200"> {/* Added top border for separation */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
             {/* Optional: Add a back arrow icon */}
             <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
               <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
             </svg>
            Back to Patient List
          </button>
        </div>
        {/* Removed the dangerous font import div */}
    </div>
  );
};

export default PatientDashboard;

// Removed unused BackArrowIcon definition
