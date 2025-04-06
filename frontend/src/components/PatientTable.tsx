"use client";
import React from "react";

// 1. Define Patient interface
interface Patient {
  name: string;
  id: string;
  lastSession: string;
  exercise: string;
  progress: 'High' | 'Medium' | 'Low'; // Use specific progress levels
}

// 2. Define Props interface
interface Props {
  patients: Patient[]; // Type the incoming prop (even if unused currently)
}

// 3. Type the PatientTable component
const PatientTable: React.FC<Props> = ({ patients }) => { // Use the Props interface
  // 4. Type getProgressLevelStyle and its parameter/styles object
  const getProgressLevelStyle = (level: 'High' | 'Medium' | 'Low'): string => {
    const styles: { [key in 'High' | 'Medium' | 'Low']: string } = {
      High: "text-blue-500 bg-indigo-50",
      Medium: "text-amber-500 bg-yellow-50",
      Low: "text-red-500 bg-pink-100",
    };
    // Access styles safely, provide default
    return styles[level] ?? styles.Medium;
  };

  return (
    <div role="region" aria-label="Patient list" className="w-full">
      <div className="flex flex-wrap gap-5 justify-between py-4 pr-20 pl-6 mt-6 w-full text-sm font-medium leading-none bg-stone-50 text-stone-500 max-md:px-5 max-md:max-w-full">
        <div>Patient Name</div>
        <div className="flex gap-10 max-md:max-w-full">
          <div>Patient ID</div>
          <div>Last Session</div>
          <div className="basis-auto">Current Exercise</div>
          <div className="basis-auto">Progress Level</div>
          <div>Actions</div>
        </div>
      </div>

      {/* Assign array to a variable first */}
      {(() => {
        const patientData: Patient[] = [
          {
            name: "John Smith",
          id: "PT-001",
          lastSession: "2024-01-15",
          exercise: "Balance Master",
          progress: "High",
        },
        {
          name: "Sarah Johnson",
          id: "PT-002",
          lastSession: "2024-01-14",
          exercise: "Pattern Puzzle",
          progress: "Medium",
        },
        {
          name: "Michael Brown",
          id: "PT-003",
          lastSession: "2024-01-13",
          exercise: "Focus Flow",
          progress: "Low",
        },
        {
          name: "Emma Davis",
          id: "PT-004",
          lastSession: "2024-01-12",
          exercise: "Quick Reflexes",
          progress: "High",
        },
        {
          name: "James Wilson",
          id: "PT-005",
          lastSession: "2024-01-11",
          exercise: "Rhythm Flow",
            progress: "Medium",
          },
        ];

        return patientData.map((patient: Patient, index: number) => ( // Map over the variable
          <React.Fragment key={patient.id}>
            <div className="flex flex-wrap gap-5 justify-between mt-4 ml-6 w-full text-sm leading-none max-w-[1047px] max-md:max-w-full">
              <div className="flex gap-3 my-auto font-medium text-black">
              <div
                className="flex shrink-0 w-8 h-8 rounded-lg bg-zinc-300"
                role="img"
                aria-label={`${patient.name}'s avatar`}
              />
              <div className="my-auto">{patient.name}</div>
            </div>
            <div className="flex flex-wrap gap-10 items-center text-stone-500 max-md:max-w-full">
              <div className="self-stretch my-auto">{patient.id}</div>
              <div className="self-stretch my-auto">{patient.lastSession}</div>
              <div className="self-stretch my-auto basis-auto">
                {patient.exercise}
              </div>
              <div
                className={`self-start px-3 py-1.5 mt-2 text-xs font-medium leading-none whitespace-nowrap rounded-lg ${getProgressLevelStyle(patient.progress)}`}
              >
                {patient.progress}
              </div>
              <button
                className="self-stretch px-2.5 py-2 text-center text-white bg-blue-500 rounded-lg shadow-[0px_4px_6px_rgba(74,144,226,0.2)] max-md:pr-5 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => {}}
                aria-label={`View details for ${patient.name}`}
              >
                View Details
              </button>
            </div>
          </div>
          <div className="flex shrink-0 mt-4 h-px bg-indigo-50 max-md:max-w-full" />
          </React.Fragment>
        ));
      })()}
    </div>
  );
};

export default PatientTable;
