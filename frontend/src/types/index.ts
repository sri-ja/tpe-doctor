import { Request, Response } from 'express';

// export interface TypedRequestParams<T> extends Request {
//   params: T
// }

export interface Exercise {
  id: string;
  name: string;
  type: string;
  description: string;
  image: {
    thumbnail: string;
    banner: string;
  };
  targetBodyParts: string[];
  difficulty: string;
  estimatedDuration: string;
  goals: {
    [key: string]: number;
  };
  customizationOptions: {
    difficulty: {
      options: string[];
      default: string;
      affects: string[];
    };
  };
}

export interface Session {
  id: string;
  patientId: string;
  prescriptionId: string;
  exerciseCustomization: {
    difficulty: string;
    goals: {
      [key: string]: number;
    };
  };
  status: string;
  duration: number;
  metrics: {
    score: number;
    [key: string]: any;
  };
  feedback: {
    reviewed: boolean;
    reviewedBy: string | null;
    reviewDate: string | null;
    comments: string | null;
    rating: number | null;
  };
}

export interface FormattedSession {
  id: string;
  date: string;
  exercise: string;
  difficulty: string;
  performance: number;
  status: string;
}

export interface Doctor {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
  };
  patients: {
    active: string[];
    old: string[];
    total: number;
  };
  pendingReviews: string[];
}

export interface Patient {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    age: number;
    contactNumber: string;
    email: string;
  };
  medicalInfo: {
    diagnosis: string;
    primaryCondition: string;
    secondaryConditions: string[];
    functionalLimitations: string[];
    notes: string;
  };
  recoveryStatus: {
    overallProgress: number;
  };
  treatmentPlan: {
    activePrescriptionIds: string[];
    completedPrescriptionIds: string[];
    currentGoals: string[];
  };
}