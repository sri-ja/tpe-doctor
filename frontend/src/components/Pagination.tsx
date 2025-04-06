import React from "react";

// 3. Type Icon components
const ChevronLeftIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
);
const ChevronRightIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
);

// 1. Define Props interface
interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

// 2. Type the component
export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  // Return null if there's only one page or no items
  if (totalPages <= 1 || totalItems === 0) {
    return null;
  }

  // 4. Type local variables
  const startItem: number = (currentPage - 1) * itemsPerPage + 1;
  const endItem: number = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    // Use theme colors for background, border, and text
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-4 py-3 bg-surface border-t border-border sm:px-6 rounded-b-lg"> {/* Use theme background and border */}
      {/* Left side: Item count - Use theme text color */}
      <div className="text-sm text-text-secondary mb-2 sm:mb-0"> {/* Use text-secondary */}
        Showing <span className="font-medium text-text-primary">{startItem}</span> to <span className="font-medium text-text-primary">{endItem}</span> of{' '} {/* Use text-primary for emphasis */}
        <span className="font-medium text-text-primary">{totalItems}</span> results
      </div>

      {/* Right side: Navigation buttons */}
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          // Use theme colors for button states
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border bg-surface text-sm font-medium text-text-secondary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon /> {/* Icon color inherits from text-text-secondary */}
        </button>

        {/* Page Number Buttons (Consider adding logic for ellipsis '...' for many pages later) */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) => ( // 5. Type page in map
          <button
            key={page}
            onClick={() => onPageChange(page)}
            // Use theme colors for active/inactive page button states
            className={`relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium transition-colors duration-150 ease-in-out
              ${currentPage === page
                ? 'z-10 bg-primary-light border-primary text-primary-dark' // Active page style using theme colors
                : 'bg-surface text-text-primary hover:bg-background'}`} // Inactive page style using theme colors
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          // Use theme colors for button states
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border bg-surface text-sm font-medium text-text-secondary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon /> {/* Icon color inherits from text-text-secondary */}
        </button>
      </nav>
    </div>
  );
};
