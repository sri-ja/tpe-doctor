import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';

// Define types for patient data
interface PatientDetails {
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

// Context interface
interface PatientContextType {
    patientDetails: PatientDetails | null;
    isLoading: boolean;
    error: string | null;
    fetchPatientById: (id: string) => Promise<void>;
    setPatientDetails: (details: PatientDetails) => void;
    updatePatientDetails: (updates: Partial<PatientDetails>) => void;
    clearPatientDetails: () => void;
    savePatientDetails: () => Promise<void>;
}

// Create the context
const PatientContext = createContext<PatientContextType | undefined>(undefined);

// Provider props
interface PatientProviderProps {
    children: ReactNode;
}

// Provider component
export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
    const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch patient data by ID
    const fetchPatientById = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // Replace with your actual API call
            const response = await fetch(`http://localhost:5000/api/patients/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch patient data');
            }
            const data = await response.json();
            console.log('Fetched patient data:', data);
            setPatientDetails(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setPatientDetails(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Update patient details
    const updatePatientDetails = useCallback((updates: Partial<PatientDetails>) => {
        setPatientDetails(prev => {
            if (!prev) return null;
            return { ...prev, ...updates };
        });
    }, []);

    // Save patient details to backend
    const savePatientDetails = useCallback(async () => {
        if (!patientDetails) return;
        
        setIsLoading(true);
        setError(null);
        try {
            const method = patientDetails.id ? 'PUT' : 'POST';
            const url = patientDetails.id ? `/api/patients/${patientDetails.id}` : '/api/patients';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientDetails),
            });
            
            if (!response.ok) {
                throw new Error('Failed to save patient data');
            }
            
            const savedData = await response.json();
            setPatientDetails(savedData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    }, [patientDetails]);

    // Clear patient details
    const clearPatientDetails = useCallback(() => {
        setPatientDetails(null);
        setError(null);
    }, []);

    return (
        <PatientContext.Provider value={{
            patientDetails,
            isLoading,
            error,
            fetchPatientById,
            setPatientDetails,
            updatePatientDetails,
            clearPatientDetails,
            savePatientDetails,
        }}>
            {children}
        </PatientContext.Provider>
    );
};

// Hook to use the patient context
export const usePatient = () => {
    const context = useContext(PatientContext);
    if (context === undefined) {
        throw new Error('usePatient must be used within a PatientProvider');
    }
    return context;
};