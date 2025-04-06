import React from "react";

export const SearchBar = () => {
  return (
    // Adjusted styling for consistency and added SVG icon
    <div className="relative flex items-center w-full md:w-72">
      <input
        type="text"
        placeholder="Search patients..."
        // Use new theme colors and focus styles
        className="w-full px-4 py-2 text-sm text-text-primary bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
        aria-label="Search patients"
      />
      {/* Inline SVG Search Icon - Use text-secondary */}
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" // Use text-secondary for icon
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};
