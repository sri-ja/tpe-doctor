import React from "react";

// Placeholder data - ideally fetched or passed as props
const appointmentDate = "Thursday, Oct 12";
const appointmentTime = "2:30 PM - 3:30 PM";
const doctorName = "Dr. Sarah Johnson";

const NextAppointment: React.FC = () => {
  return (
    // Removed margin, shadow, and padding - parent card handles this
    <div className="w-full">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Next Appointment
      </h2>
      {/* Details */}
      {/* Removed background, adjusted text styles */}
      <div className="text-gray-700 space-y-1">
        <p className="text-lg font-medium">{appointmentDate}</p>
        <p className="text-md">{appointmentTime}</p>
        <p className="text-md">via {doctorName}</p> {/* Updated text */}
      </div>
    </div>
  );
};

export default NextAppointment;
