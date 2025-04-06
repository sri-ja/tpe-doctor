import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import PatientStats from "./PatientStats";
import ProgressChart from "./ProgressChart";
import AppointmentHistory from "./AppointmentHistory";
import SessionScheduler from "./SessionScheduler";
import ExerciseAssignment from "./ExerciseAssignment";
import CompletedSessions from "./CompletedSessions";
import { fetchPatient, fetchPatientSessions } from "../../../services/api";
import { Patient, Session } from "../../../types";

const PatientDashboard: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      console.log('Fetching patient data for ID:', patientId); // Debug log

      try {
        const [patientData, sessionsData] = await Promise.all([
          fetchPatient(patientId || ''),
          fetchPatientSessions(patientId || '')
        ]);

        console.log('Patient data received:', patientData); // Debug patient data
        console.log('Sessions data received:', sessionsData); // Debug sessions data

        if (!patientData) {
          throw new Error('No patient data received');
        }

        setPatient(patientData);

        // Add hardcoded appointment fields to sessions
        const sessionsWithAppointment = sessionsData.map(session => {
          console.log('Processing session:', session.id); // Debug each session
          return {
            ...session,
            date: new Date(session.feedback?.reviewDate || '').toLocaleDateString(),
            time: '10:00 AM',
            description: `Session for ${session.exerciseCustomization?.difficulty || 'N/A'} difficulty exercise`
          };
        });

        console.log('Processed sessions:', sessionsWithAppointment); // Debug processed sessions
        setSessions(sessionsWithAppointment);
      } catch (err) {
        console.error('Error details:', err); // Detailed error logging
        console.error('Error stack:', (err as Error).stack); // Error stack trace
        setError(`Error fetching patient data: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      console.log('Starting data fetch for patientId:', patientId); // Debug fetch start
      fetchPatientData();
    } else {
      console.warn('No patientId provided'); // Debug missing ID
      setError('No patient ID provided');
      setLoading(false);
    }
  }, [patientId]);

  const handleReviewSession = (sessionId: string): void => {
    if (patientId) {
      navigate(`/session-review/${sessionId}`);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error || !patient) {
    return (
      <div className="p-6 text-center text-red-600">
        {error || 'Patient not found'}
        {/* Add debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 text-sm text-gray-500">
            PatientID: {patientId}<br />
            Error: {error}<br />
            Patient: {JSON.stringify(patient)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 md:p-8 space-y-8">
      <PatientHeader
        name={`${patient.personalInfo.firstName} ${patient.personalInfo.lastName}`}
        patientId={patient.id}
        photoUrl="https://placehold.co/48x48"
      />

      <PatientStats
        age={`${patient.personalInfo.age} years`}
        patientId={patient.id}  // Add patientId prop
        progressLevel={String(patient.recoveryStatus.overallProgress)}
      />

      <ProgressChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentHistory appointments={sessions} />
        <SessionScheduler />
      </div>

      <ExerciseAssignment />
      <CompletedSessions onReviewSession={handleReviewSession} />

      <div className="flex pt-6 border-t border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Patient List
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;
