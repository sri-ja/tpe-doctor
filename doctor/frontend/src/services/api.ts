import { Exercise, Session } from '../types';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

export const fetchPatient = async (id: string) => {
  console.log('Fetching patient with ID:', id); // Debug log
  try {
    const response = await fetch(`${API_BASE_URL}/api/patients/${id}`);
    console.log('Patient API response status:', response.status); // Debug response

    if (!response.ok) {
      console.error('Failed to fetch patient:', response.statusText);
      throw new Error(`Failed to fetch patient: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Patient data received:', data); // Debug data
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export const fetchPatientSessions = async (patientId: string): Promise<Session[]> => {
  console.log('Fetching sessions for patient:', patientId); // Debug log
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/patient/${patientId}`);
    console.log('Sessions API response status:', response.status); // Debug response

    if (!response.ok) {
      console.error('Failed to fetch sessions:', response.statusText);
      throw new Error(`Failed to fetch sessions: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Sessions data received:', data); // Debug data
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export const fetchPrescriptions = async (patientId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/prescriptions/patient/${patientId}`);
  if (!response.ok) throw new Error('Failed to fetch prescriptions');
  return response.json();
};

export const fetchExercises = async (): Promise<Exercise[]> => {
  const response = await fetch(`${API_BASE_URL}/api/exercises`);
  if (!response.ok) throw new Error('Failed to fetch exercises');
  return response.json();
};

export const fetchSessionMetrics = async (sessionId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}/metrics`);
  if (!response.ok) throw new Error('Failed to fetch session metrics');
  return response.json();
};

export const fetchOngoingPatients = async (): Promise<any[]> => {
  try {

    // Fetch sessions
    console.log("Hello I am Fetching sessions from API...");
    const sessionsResponse = await fetch(`${API_BASE_URL}/api/allsessions`);
    if (!sessionsResponse.ok) {
      throw new Error(`Failed to fetch sessions: ${sessionsResponse.statusText}`);
    }
    const sessions = await sessionsResponse.json();
    console.log('Successfully fetched sessions from API:', {
      count: sessions.length,
      firstSession: sessions[0]?.id
    });

    // Fetch patients first
    console.log("Hello I am Fetching patients from API...");
    const patientsResponse = await fetch(`${API_BASE_URL}/api/patients`);
    if (!patientsResponse.ok) {
      throw new Error(`Failed to fetch patients: ${patientsResponse.statusText}`);
    }
    const patients = await patientsResponse.json();
    console.log('Successfully fetched patients from API:', {
      count: patients.length,
      firstPatient: patients[0]?.id
    });

    const getProgressLevel = (progress: number): string => {
      if (progress < 40) return 'low';
      if (progress < 70) return 'medium';
      return 'high';
    };

    // Process patients with their latest sessions
    const ongoingPatients = patients.map((patient: any) => {
      const patientSessions = sessions.filter((s: any) => s.patientId === patient.id);
      const lastSession = patientSessions.length > 0 
        ? patientSessions.sort((a: any, b: any) => 
            new Date(b.feedback?.reviewDate || '').getTime() - 
            new Date(a.feedback?.reviewDate || '').getTime()
          )[0]
        : null;

      return {
        id: patient.id,
        name: `${patient.personalInfo.firstName} ${patient.personalInfo.lastName}`,
        lastSession: lastSession?.feedback?.reviewDate 
          ? new Date(lastSession.feedback.reviewDate).toLocaleDateString()
          : 'N/A',
        exercise: lastSession?.exerciseCustomization?.exerciseId || 'N/A',
        progress: getProgressLevel(patient.recoveryStatus?.overallProgress || 0)
      };
    });

    return ongoingPatients;
  } catch (error) {
    console.error('Failed to fetch ongoing patients:', error);
    throw error;
  }
};

export const submitComment = async (sessionId: string, comment: {
  text: string;
  type: string;
  reviewedBy: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      throw new Error('Failed to submit comment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }
};

export const completeSessionReview = async (sessionId: string) => {
  try {
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
      throw new Error('Failed to complete session review');
    }

    const updatedSession = await response.json();
    console.log('Session review completed:', updatedSession);
    return updatedSession;
  } catch (error) {
    console.error('Error completing session review:', error);
    throw error;
  }
};