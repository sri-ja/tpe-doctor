import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableHeader } from "./TableHeader";
import { PatientRow } from "./PatientRow";
import { Pagination } from "./Pagination";
import { usePatients } from "../context/ReviewSessionContext";

// Interface for Patient data (matching context)
interface Patient {
  id: string;
  name: string;
  sessionDate: string;
  exercise: string;
  duration: string;
  performance: number;
}

export const PendingReviews: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { pendingReviews = [] } = usePatients();
  const itemsPerPage: number = 5;

  const typedPendingReviews: Patient[] = pendingReviews;

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: Patient[] = typedPendingReviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages: number = Math.ceil(typedPendingReviews.length / itemsPerPage);

  const handleReviewSession = (patientId: string) => {
    navigate(`/session-review/${patientId}`);
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-border sm:rounded-lg overflow-hidden"> {/* Added shadow and rounded corners */}
            <table className="min-w-full divide-y divide-border">
              <TableHeader tab={"pending"} />
              <tbody className="bg-surface divide-y divide-border">
                {currentItems.length > 0 ? (
                  currentItems.map((patient) => (
                    <PatientRow
                      key={patient.id}
                      patient={patient}
                      onReviewSession={handleReviewSession}
                    />
                  ))
                ) : (
                  <tr>
                    {/* Ensure colSpan matches the number of columns */}
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-text-secondary">
                      No pending reviews found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination remains outside the table structure */}
      {typedPendingReviews.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={typedPendingReviews.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
