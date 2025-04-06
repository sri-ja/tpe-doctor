import React from "react";

// 1. Type the component
const SessionScheduler: React.FC = () => {
  // 2. Type the event parameter
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO: Implement actual form submission logic
    console.log("Form submitted");
    // Consider adding feedback to the user (e.g., toast notification)
  };

  return (
    <div>
      {/* Standardized heading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Schedule Session</h2>
      {/* Standardized form container */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
        <div>
          {/* Standardized label */}
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          {/* Standardized input */}
          <input
            id="date"
            type="date"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          {/* Standardized label */}
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          {/* Standardized input */}
          <input
            id="time"
            type="time"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        {/* Standardized button container and styles */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirm Request
          </button>
          <button
            type="button"
            // TODO: Add onClick handler for reject action
            className="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reject Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionScheduler;
