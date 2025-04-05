import React from "react";

// 1. Define Appointment interface (matching PatientDashboard)
interface Appointment {
  date: string;
  time: string;
  description: string;
  // Add an optional id if available for better key prop
  id?: string | number;
}

// 2. Define Props for AppointmentCard and type it
interface AppointmentCardProps {
  date: string;
  time: string;
  description: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ date, time, description }) => {
  return (
    // Standardized card styling
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-1">
        {/* Standardized text styles */}
        <span className="text-sm font-medium text-gray-800">{date || 'N/A'}</span>
        <span className="text-xs text-gray-500">{time || ''}</span>
      </div>
      <p className="text-sm text-gray-600">{description || 'No description provided.'}</p>
    </div>
  );
};

// 3. Define Props for AppointmentHistory
interface AppointmentHistoryProps {
  appointments?: Appointment[]; // Make appointments optional and default in component
}

// 4. Type AppointmentHistory component
const AppointmentHistory: React.FC<AppointmentHistoryProps> = ({ appointments = [] }) => { // Default to empty array
  return (
    <div>
      {/* Standardized heading style */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Past Appointments</h2>
      <div className="space-y-3"> {/* Adjusted spacing */}
        {appointments.length > 0 ? (
          appointments.map((appointment: Appointment, index) => ( // 5. Type appointment in map
            <AppointmentCard
              // Use a more stable key if possible, e.g., appointment.id if available
              key={appointment.id ?? index} // Use id if present, otherwise fallback to index
              date={appointment.date}
              time={appointment.time}
              description={appointment.description}
            />
          ))
        ) : (
          // Added empty state
          <div className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
            No past appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
