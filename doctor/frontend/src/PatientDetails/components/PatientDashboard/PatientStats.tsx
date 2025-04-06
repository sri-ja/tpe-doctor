import React, { useState, useEffect } from "react";
import { API_BASE_URL, fetchPrescriptions } from '../../../services/api';

// 1. Type getProgressBadgeStyle parameter
const getProgressBadgeStyle = (level: string | undefined | null): string => {
  switch (level?.toLowerCase()) {
    case 'low':
      return "bg-red-100 text-red-700";
    case 'medium':
      return "bg-yellow-100 text-yellow-800"; // Adjusted yellow for better contrast
    case 'high':
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-600"; // Default/fallback style
  }
};

// 2. Define Props for StatCard and type it
interface StatCardProps {
  label: string;
  value: string | undefined | null; // Value can be string, undefined, or null
  type?: "text" | "badge"; // Type can be 'text' or 'badge'
}

const StatCard: React.FC<StatCardProps> = ({ label, value, type = "text" }) => {
  const isBadge = type === "badge";
  // Pass value directly to getProgressBadgeStyle
  const badgeStyle = isBadge ? getProgressBadgeStyle(value) : "";

  return (
    // Standardized styling
    <div
      className="bg-gray-50 p-4 rounded-lg border border-gray-200" // Adjusted padding, background, border
      role="group"
      aria-label={label}
    >
      {/* Standardized text styles */}
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      {isBadge ? (
        // Standardized badge styling
        <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${badgeStyle}`}>
          {value || 'N/A'}
        </span>
      ) : (
        // Standardized text style
        <p className="text-base font-semibold text-gray-800">{value || 'N/A'}</p>
      )}
    </div>
  );
};

// 3. Define Props for PatientStats and type it
interface PatientStatsProps {
  age: string;
  patientId: string;
  progressLevel: string; // Consider specific types like 'low' | 'medium' | 'high' if applicable
}

const PatientStats: React.FC<PatientStatsProps> = ({ age, patientId, progressLevel }) => {
  const [treatmentStart, setTreatmentStart] = useState<string>('N/A');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatmentStart = async () => {
      try {
        const prescriptions = await fetchPrescriptions(patientId);
        
        // Find earliest prescription date
        const earliestDate = prescriptions.reduce((earliest: Date | null, p: any) => {
          const date = new Date(p.createdDate);
          return earliest === null || date < earliest ? date : earliest;
        }, null);

        setTreatmentStart(earliestDate ? earliestDate.toLocaleDateString() : 'N/A');
      } catch (err) {
        console.error('Failed to fetch treatment start date:', err);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchTreatmentStart();
    }
  }, [patientId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard label="Age" value={age} />
      <StatCard label="Treatment Start" value={treatmentStart} />
      <StatCard label="Progress Level" value={progressLevel} type="badge" />
    </div>
  );
};

export default PatientStats;
