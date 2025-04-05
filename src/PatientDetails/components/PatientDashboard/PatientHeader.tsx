import React from "react";

// 1. Type EditIcon component
const EditIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
);

// 2. Define Props interface
interface Props {
  name?: string; // Make props optional if they have defaults
  patientId?: string;
  photoUrl?: string;
}

// 3. Type PatientHeader component
const PatientHeader: React.FC<Props> = ({ name = "N/A", patientId = "N/A", photoUrl }) => {
  return (
    // Adjusted spacing and responsive layout
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200"> {/* Removed mb-8, added bottom border */}
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        {/* Improved image styling */}
        <img
          src={photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`} // Fallback to UI Avatars
          className="w-12 h-12 rounded-full border border-gray-200 object-cover" // Circular avatar
          alt={`${name}`} // Removed redundant "Profile photo of"
          // 4. Type onError event handler
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement; // Type assertion
            target.onerror = null; // Prevent infinite loop
            target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e0e0e0&color=666`;
          }}
        />
        <div>
          {/* Standardized text styles */}
          <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
          <p className="text-sm text-gray-500">Patient ID: {patientId}</p>
        </div>
      </div>
      {/* Standardized button */}
      <button
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Edit patient profile"
      >
        <EditIcon />
        <span className="hidden sm:inline">Edit Profile</span> {/* Hide text on small screens */}
      </button>
    </div>
  );
};

export default PatientHeader;
