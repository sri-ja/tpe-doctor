import React, { createContext, useContext, useState, ReactNode } from "react";

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

const mockReviewSessions: PatientReviewSession[] = [ // Type the mock data array
  {
    id: "PT001",
    name: "John Smith",
    sessionDate: "2024-01-15",
    exercise: "Climbing Temple Stairs",
    duration: "45 min",
    performance: 92,
  },
  {
    id: "PT002",
    name: "Sarah Johnson",
    sessionDate: "2024-01-14",
    exercise: "Pattern Puzzle",
    duration: "30 min",
    performance: 88,
  },
  {
    id: "PT003",
    name: "Michael Brown",
    sessionDate: "2024-01-13",
    exercise: "Focus Flow",
    duration: "25 min",
    performance: 76,
  },
  {
    id: "PT004",
    name: "Emma Davis",
    sessionDate: "2024-01-12",
    exercise: "Quick Reflexes",
    duration: "35 min",
    performance: 95,
  },
  {
    id: "PT005",
    name: "James Wilson",
    sessionDate: "2024-01-11",
    exercise: "Rhythm Flow",
    duration: "40 min",
    performance: 82,
  },
  {
    id: "PT006",
    name: "Olivia Smith",
    sessionDate: "2024-01-10",
    exercise: "Climbing Temple Stairs",
    duration: "45 min",
    performance: 90,
  },
  {
    id: "PT007",
    name: "William Johnson",
    sessionDate: "2024-01-09",
    exercise: "Pattern Puzzle",
    duration: "30 min",
    performance: 85,
  },
  {
    id: "PT008",
    name: "Sophia Brown",
    sessionDate: "2024-01-08",
    exercise: "Focus Flow",
    duration: "25 min",
    performance: 78,
  },
  {
    id: "PT009",
    name: "Ethan Davis",
    sessionDate: "2024-01-07",
    exercise: "Quick Reflexes",
    duration: "35 min",
    performance: 92,
  },
  {
    id: "PT010",
    name: "Ava Wilson",
    sessionDate: "2024-01-06",
    exercise: "Rhythm Flow",
    duration: "40 min",
    performance: 80,
  },
];

// 4. Type the children prop
interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  // 5. Type useState calls
  const [pendingReviews, setPendingReviews] = useState<PatientReviewSession[]>(mockReviewSessions);
  const [pendingCount, setPendingCount] = useState<number>(mockReviewSessions.length);

  // 6. Type patientId parameter (already done in context type definition)
  const completeReview = (patientId: string) => {
    setPendingReviews((prev) => prev.filter((p) => p.id !== patientId));
    // Ensure count doesn't go below zero
    setPendingCount((prev) => Math.max(0, prev - 1));
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
