import React, { useState, useEffect } from "react";
import { TableHeader } from "./TableHeader";
import { Pagination } from "./Pagination";
import { useNavigate } from "react-router-dom";
import { fetchOngoingPatients } from "../services/api";

// Interface for ongoing patient data
interface OngoingPatient {
  id: string;
  name: string;
  lastSession: string;
  exercise: string;
  progress: string;  // Changed from union type to just string
}

// Progress style function updated to handle number values
const getProgressStyle = (progress: string | number | undefined): string => {
  // Convert number to string and map to progress level
  if (typeof progress === 'number') {
    if (progress < 40) return "bg-red-100 text-red-700";      // low
    if (progress < 70) return "bg-yellow-100 text-yellow-800"; // medium
    return "bg-green-100 text-green-700";                      // high
  }

  // Handle string values
  switch (String(progress).toLowerCase()) {
    case 'low': return "bg-red-100 text-red-700";
    case 'medium': return "bg-yellow-100 text-yellow-800";
    case 'high': return "bg-green-100 text-green-700";
    default: return "bg-gray-100 text-text-secondary";
  }
};

// Props for the local PatientTableRow
interface PatientTableRowProps {
  patient: OngoingPatient;
  onViewDetails: (patientId: string) => void;
}

// Rewritten PatientTableRow using <tr> and <td>
const PatientTableRow: React.FC<PatientTableRowProps> = ({ patient, onViewDetails }) => {
  const progressClass = getProgressStyle(patient.progress);

  const UserIcon: React.FC = () => (
    <svg className="w-5 h-5 text-text-secondary inline-block mr-2 align-middle" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
  );

  return (
    <tr className="hover:bg-background transition-colors duration-150 ease-in-out">
      {/* Patient Name */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
        <UserIcon />
        {patient.name}
      </td>
      {/* Last Session */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {patient.lastSession}
      </td>
      {/* Exercise */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {patient.exercise}
      </td>
      {/* Progress */}
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${progressClass}`}>
          {patient.progress}
        </span>
      </td>
      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <button
          onClick={() => onViewDetails(patient.id)}
          className="px-4 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

// Main OngoingPatients component using <table>
const OngoingPatients: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [patients, setPatients] = useState<OngoingPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage: number = 5;

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchOngoingPatients();
        setPatients(data);
      } catch (err) {
        setError('Failed to load patients');
        console.error('Error loading patients:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const handleViewDetails = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: OngoingPatient[] = patients.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-text-secondary">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-border sm:rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <TableHeader tab={"ongoing"} />
              <tbody className="bg-surface divide-y divide-border">
                {currentItems.length > 0 ? (
                  currentItems.map((patient) => (
                    <PatientTableRow
                      key={patient.id}
                      patient={patient}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-text-secondary">
                      No ongoing patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {patients.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(patients.length / itemsPerPage)}
          totalItems={patients.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default OngoingPatients;
