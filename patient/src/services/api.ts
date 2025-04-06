// Define interfaces for exercise and session data

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
  goals: Record<string, any>;
  customizationOptions: Record<string, any>;
}

export interface SessionFeedback {
  reviewed: boolean;
  reviewedBy: string | null;
  reviewDate: string | null;
  comments: string | null;
  rating: number | null;
  improvementAreas: string[];
  recommendations: string | null;
  nextSessionAdjustments: {
    difficulty: string | null;
    duration: string | null;
    goals: string | null;
  };
  progressNotes: string | null;
}

export interface SessionData {
  id?: string;
  patientId: string;
  exerciseId: string;
  prescriptionId?: string;
  exerciseCustomization: {
    difficulty: string;
    goals: Record<string, any>;
  };
  status: string;
  duration: number;
  metrics: {
    score?: number;
    stepsClimbed?: number;
    targetsHit?: number;
    distanceCovered?: number;
    catchesCompleted?: number;
    avgSpeed?: number;
    avgReactionTime?: number;
    calories: number;
    personalBest: boolean;
    restPeriods?: number;
    restDuration?: number;
    heartRate?: {
      average: number;
      peak: number;
      recovery: number;
    };
    timeTaken?: string;
  };
  performance?: {
    accuracy?: number;
    steadiness?: number;
    stamina?: number;
    rangeOfMotion?: number;
    symmetry?: number;
  };
  patientReported?: {
    painLevel?: number;
    exertionLevel?: number;
    confidenceLevel?: number;
    notes?: string;
  };
  feedback: SessionFeedback;
}

// API function to save exercise session data
export async function saveExerciseSession(sessionData: SessionData): Promise<SessionData> {
  try {
    const response = await fetch('http://localhost:5000/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving session data:', error);
    throw error;
  }
}

// Mock function for getting patient ID (in a real app, this would come from authentication)
export function getCurrentPatientId(): string {
  return 'p-123456'; // Placeholder patient ID
}
