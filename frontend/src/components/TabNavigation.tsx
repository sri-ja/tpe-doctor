import React from "react";

// Define the interface for the component's props
interface Props {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  pendingCount: number;
}

export const TabNavigation: React.FC<Props> = ({ activeTab, onTabChange, pendingCount }) => {
  // Define type for individual tab objects for better type safety
  interface Tab {
    id: string;
    label: string;
    count?: number; // Make count optional
  }

  const tabs: Tab[] = [
    { id: "ongoing", label: "Ongoing Patients" },
    { id: "completed", label: "Completed Treatment" },
    { id: "pending", label: "Pending Reviews", count: pendingCount }
  ];

  return (
    // Use new theme border color and adjust spacing
    <nav className="flex flex-wrap gap-6 md:gap-10 self-start text-sm border-b border-border" role="tablist"> {/* Increased gap, used theme border */}
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          // Use new theme colors for active/inactive states and hover effects
          className={`relative pb-3 px-1 transition-colors duration-150 ease-in-out focus:outline-none
            ${activeTab === tab.id
              ? "text-primary font-semibold after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-primary" // Use primary color
              : "text-text-secondary hover:text-text-primary"}`} // Use text-secondary and text-primary
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.id === 'pending' && tab.count !== undefined && tab.count > 0 && (
              // Use secondary color for badge, adjust styling
              <span className="ml-2 px-2.5 py-0.5 text-xs font-medium text-secondary-dark bg-secondary-light rounded-full"> {/* Use secondary theme colors */}
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </nav>
  );
};
