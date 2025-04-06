import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_BASE_URL } from "../services/api";

// 1. Define interface for the review session data
interface PatientReviewSession {
  id: string;
  name: string;
  sessionDate: string;
  exercise: string;
  duration: string;
  performance: number;
}

// 2. Define interface for the context value
interface ReviewSessionContextType {
  pendingReviews: PatientReviewSession[];
  pendingCount: number;
  completeReview: (patientId: string) => void; // Typed the parameter
}

// 3. Provide a default value matching the type for createContext
const defaultContextValue: ReviewSessionContextType = {
  pendingReviews: [],
  pendingCount: 0,
  completeReview: () => {}, // Default function does nothing
};

const ReviewSessionContext = createContext<ReviewSessionContextType>(defaultContextValue);

// 4. Type the children prop
interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [pendingReviews, setPendingReviews] = useState<PatientReviewSession[]>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);

  useEffect(() => {
    const fetchPendingReviews = async () => {
      try {
        // Fetch all sessions
        const sessionsResponse = await fetch(`${API_BASE_URL}/api/allsessions`);
        if (!sessionsResponse.ok) {
          throw new Error('Failed to fetch sessions');
        }
        const allSessions = await sessionsResponse.json();

        // Filter sessions that need review
        const unreviewed = allSessions.filter((session: any) => !session.feedback.reviewed);

        // Fetch all patients to get their names
        const patientsResponse = await fetch(`${API_BASE_URL}/api/patients`);
        if (!patientsResponse.ok) {
          throw new Error('Failed to fetch patients');
        }
        const patients = await patientsResponse.json();

        // Create review sessions array
        const reviewSessions: PatientReviewSession[] = unreviewed.map((session: any) => {
          const patient = patients.find((p: any) => p.id === session.patientId);
          return {
            id: session.id,
            name: patient ? `${patient.personalInfo.firstName} ${patient.personalInfo.lastName}` : 'Unknown Patient',
            sessionDate: new Date(session.feedback?.reviewDate || session.duration).toLocaleDateString(),
            exercise: session.exerciseCustomization?.exerciseId || 'Unknown Exercise',
            duration: `${Math.round(session.duration / 60)} min`,
            performance: session.metrics?.score || 0
          };
        });

        setPendingReviews(reviewSessions);
        setPendingCount(reviewSessions.length);
      } catch (error) {
        console.error('Error fetching pending reviews:', error);
        // Handle error appropriately - maybe set an error state
      }
    };

    fetchPendingReviews();
  }, []); // Empty dependency array means this runs once when component mounts

  const completeReview = async (sessionId: string) => {
    try {
      // Update session in backend (you'll need to add this endpoint)
      const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}/review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewed: true,
          reviewDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update session review status');
      }

      // Update local state
      setPendingReviews((prev) => prev.filter((p) => p.id !== sessionId));
      setPendingCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error completing review:', error);
      // Handle error appropriately
    }
  };

  return (
    <ReviewSessionContext.Provider
      value={{ pendingReviews, pendingCount, completeReview }}
    >
      {children}
    </ReviewSessionContext.Provider>
  );
};

// 7. Type the return value of the hook
export const usePatients = (): ReviewSessionContextType => {
  const context = useContext(ReviewSessionContext);
  if (context === undefined) {
    // Provide a more helpful error message if used outside the provider
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};
