import React from "react";

// Interface for column configuration
interface ColumnConfig {
  label: string;
  align?: 'left' | 'center' | 'right';
}

// Define column configurations (simplified, spans are implicit now)
const pendingColumns: ColumnConfig[] = [
  { label: "Patient Name" },
  { label: "Session Date" },
  { label: "Exercise" },
  { label: "Duration" },
  { label: "Performance", align: 'center' },
  { label: "Actions", align: 'center' },
];

const ongoingColumns: ColumnConfig[] = [
  { label: "Patient Name" },
  { label: "Last Session" },
  { label: "Exercise" },
  { label: "Progress", align: 'center' },
  { label: "Actions", align: 'center' },
];

interface Props {
  tab: "pending" | "ongoing";
}

export const TableHeader: React.FC<Props> = ({ tab }) => {
  const columns: ColumnConfig[] = tab === "pending" ? pendingColumns : ongoingColumns;

  // Define alignment utility function
  const getAlignmentClass = (align?: 'left' | 'center' | 'right'): string => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  return (
    <thead className="bg-gray-100 sticky top-0 z-10">
      <tr>
        {columns.map((col) => (
          <th
            key={col.label}
            scope="col"
            className={`px-6 py-3 ${getAlignmentClass(col.align)} text-xs font-semibold text-text-secondary uppercase tracking-wider`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
