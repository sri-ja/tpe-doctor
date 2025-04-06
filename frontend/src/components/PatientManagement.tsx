import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { TabNavigation } from "./TabNavigation";
import { PendingReviews } from "./PendingReviews";
import OngoingPatients from "./OngoingPatients";
import { usePatients } from "../context/ReviewSessionContext";

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const { pendingCount } = usePatients();

  const renderActiveTab = () => {
    switch (activeTab) {
      case "ongoing":
        return <OngoingPatients />;
      case "pending":
        return <PendingReviews />;
      case "completed":
        // Placeholder for completed treatments view
        return <div className="text-center text-gray-500 mt-8">Completed Treatments section coming soon.</div>;
      default:
        return <OngoingPatients />;
    }
  };

  return (
    // Increase padding, border-radius, and shadow for a softer look
    <section className="bg-surface rounded-xl border border-border shadow-lg p-8 md:p-10"> {/* Increased padding, rounded-xl, shadow-lg */}
      <div className="flex flex-col w-full">
        {/* Improved header layout and spacing */}
        <header className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full mb-8">
          <h1 className="text-3xl font-semibold text-text-primary">
            Patient Management
          </h1>
          <SearchBar /> {/* Will update SearchBar separately */}
        </header>

        {/* Moved TabNavigation outside the header but inside the main flex container */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingCount={pendingCount}
        />

        {/* Render active tab content */}
        <div className="mt-6"> {/* Added margin-top for separation */}
          {renderActiveTab()}
        </div>
      </div>
    </section>
  );
};

export default PatientManagement;
