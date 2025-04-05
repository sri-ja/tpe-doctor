import React from "react";

// 1. Type the component
const ExerciseAssignment: React.FC = () => {
  // 2. Type the event parameter
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO: Implement actual form submission logic
    console.log("Assign Exercise form submitted");
    // Consider adding feedback to the user
  };

  return (
    // Removed margin-bottom
    <div>
      {/* Standardized heading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Assign Exercise</h2>
      {/* Standardized form container */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
        {/* Responsive grid for selects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {/* Standardized label */}
            <label
              htmlFor="exerciseType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Exercise Type
            </label>
            {/* Standardized select */}
            <select
              id="exerciseType"
              className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Exercise</option>
              <option value="balance">Balance Training</option>
              <option value="strength">Strength Training</option>
              <option value="coordination">Coordination Exercise</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            {/* Standardized label */}
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Difficulty Level
            </label>
            {/* Standardized select */}
            <select
              id="difficulty"
              className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div>
          {/* Standardized label */}
          <label
            htmlFor="parameters"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Parameters / Notes
          </label>
          {/* Standardized textarea */}
          <textarea
            id="parameters"
            rows={3} // Adjusted rows
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter exercise parameters, duration, reps, sets, etc..."
          />
        </div>
        {/* Standardized button */}
        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Assign Exercise
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseAssignment;
