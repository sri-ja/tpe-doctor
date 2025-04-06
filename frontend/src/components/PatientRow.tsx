import React from "react";

// Interface for Patient data (matching context)
interface Patient {
  id: string;
  name: string;
  sessionDate: string;
  exercise: string;
  duration: string;
  performance: number;
}

// Props interface
interface Props {
  patient: Patient | null | undefined;
  onReviewSession: (patientId: string) => void;
}

// User Icon component
const UserIcon: React.FC = () => (
  <svg className="w-5 h-5 text-text-secondary inline-block mr-2 align-middle" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
);

// Rewritten PatientRow using <tr> and <td>
export const PatientRow: React.FC<Props> = ({ patient, onReviewSession }) => {
  if (!patient) {
    return null; // Or a placeholder row if needed
  }

  return (
    <tr className="hover:bg-background transition-colors duration-150 ease-in-out">
      {/* Patient Name */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
        <UserIcon />
        {patient.name || 'N/A'}
      </td>
      {/* Session Date */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {patient.sessionDate || 'N/A'}
      </td>
      {/* Exercise */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {patient.exercise || 'N/A'}
      </td>
      {/* Duration */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {patient.duration || 'N/A'}
      </td>
      {/* Performance */}
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
        <span className="px-2.5 py-0.5 text-xs font-medium text-secondary-dark bg-secondary-light rounded-full">
          {patient.performance !== undefined ? `${patient.performance}%` : 'N/A'}
        </span>
      </td>
      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <button
          onClick={() => onReviewSession(patient.id)}
          className="px-4 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
        >
          Review Session
        </button>
      </td>
    </tr>
  );
};
