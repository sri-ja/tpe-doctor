import React from "react";

// 1. Define Props for StatusBadge and type it
interface StatusBadgeProps {
  status?: string | null; // Status can be string, null, or undefined
  performance?: number | null; // Performance can be number, null, or undefined
  onClick?: () => void; // onClick is optional
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, performance, onClick }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full inline-block";

  if (typeof performance === "number") { // Check if performance is a number
    // Performance Badge
    return (
      <span className={`${baseClasses} bg-blue-100 text-blue-700`}>
        {performance}%
      </span>
    );
  }

  // Status Badge/Button
  switch (status?.toLowerCase()) {
    case 'review':
      return (
        <button
          onClick={onClick} // Pass onClick for review action
          className={`${baseClasses} bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors`}
        >
          Review
        </button>
      );
    case 'completed':
      return (
        <span className={`${baseClasses} bg-green-100 text-green-700`}>
          Completed
        </span>
      );
    default:
      return (
        <span className={`${baseClasses} bg-gray-100 text-gray-600`}>
          {status || 'N/A'}
        </span>
      );
  }
};

// 2. Define Props for DifficultyBadge and type it
interface DifficultyBadgeProps {
  level: string | undefined | null; // Level can be string, undefined, or null
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ level }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full inline-block capitalize";
  let styleClasses = "bg-gray-100 text-gray-600"; // Default

  switch (level?.toLowerCase()) {
    case 'easy':
      styleClasses = "bg-green-100 text-green-700";
      break;
    case 'medium':
      styleClasses = "bg-yellow-100 text-yellow-800";
      break;
    case 'hard':
      styleClasses = "bg-red-100 text-red-700";
      break;
  }

  return (
    <span className={`${baseClasses} ${styleClasses}`}>
      {level || 'N/A'}
    </span>
  );
};

// 3. Define interface for SessionData
interface SessionData {
  id: number;
  date: string;
  exercise: string;
  difficulty: string;
  performance: number;
  status: string; // Consider specific types like 'Review' | 'Completed'
}

// 4. Type mockSessions array
// Mock Data (can be replaced with actual data fetching)
const mockSessions: SessionData[] = [
   { id: 1, date: "Mar 15, 2024", exercise: "Climbing Temple Stairs", difficulty: "Hard", performance: 95, status: "Review" },
   { id: 2, date: "Mar 12, 2024", exercise: "Strength Training", difficulty: "Medium", performance: 88, status: "Completed" },
   { id: 3, date: "Mar 10, 2024", exercise: "Balance Beam Walk", difficulty: "Medium", performance: 75, status: "Completed" },
];

// 5. Define Props for CompletedSessions
interface CompletedSessionsProps {
  // Type the callback function, accepting session ID (number based on mock data)
  onReviewSession: (sessionId: number) => void;
}

// 6. Type CompletedSessions component
const CompletedSessions: React.FC<CompletedSessionsProps> = ({ onReviewSession }) => {
  const sessions: SessionData[] = mockSessions; // Use mock data for now

  return (
    <div>
      {/* Standardized heading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Completed Sessions</h2>
      {/* Standardized container */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        {sessions.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200" role="table">
            <thead className="bg-gray-100">
              {/* Standardized table header */}
              <tr>
                <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Exercise</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Difficulty</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Performance</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session: SessionData) => ( // 7. Type session in map
                <tr key={session.id}>
                  {/* Standardized table cells */}
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{session.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">{session.exercise}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <DifficultyBadge level={session.difficulty} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge performance={session.performance} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {/* Pass session ID to review handler */}
                    <StatusBadge status={session.status} onClick={() => session.status === 'Review' && onReviewSession(session.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
           // Added empty state
           <div className="text-sm text-gray-500 text-center py-6">
             No completed sessions found.
           </div>
        )}
      </div>
    </div>
  );
};

export default CompletedSessions;
