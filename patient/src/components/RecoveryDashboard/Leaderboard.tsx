import React from "react";

interface LeaderboardEntry {
  name: string;
  points: number;
  avatarUrl?: string; // Optional avatar URL
  isCurrentUser?: boolean; // Flag for the current user
}

// Updated data matching the image, including the current user
const leaderboardData: LeaderboardEntry[] = [
  { name: "Scott", points: 98, avatarUrl: "https://avatar.iran.liara.run/public/boy?username=Scott" }, // Placeholder avatar
  { name: "Alex", points: 97, avatarUrl: "https://avatar.iran.liara.run/public/boy?username=Alex", isCurrentUser: true }, // Placeholder avatar for Alex
  { name: "Gemma", points: 92, avatarUrl: "https://avatar.iran.liara.run/public/boy?username=Gemma" }, // Placeholder avatar
];

// Placeholder user rank and total participants
const userRank = 5;
const totalParticipants = 20;

const Leaderboard: React.FC = () => {
  return (
    // Removed margin and shadow, parent card handles this
    <div className="w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Leaderboard</h2>
        <div className="flex items-center space-x-4 text-sm">
          <span className="font-medium text-gray-700">Your Rank: {userRank}/{totalParticipants}</span>
          <div className="flex items-center text-green-500">
            {/* Using a simple dot icon for Top 25% */}
            <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" />
            </svg>
            <span>Top 25%</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Entries */}
      <div className="space-y-3">
        {leaderboardData.map((entry, index) => (
          <div
            key={index}
            // Conditional background for the current user
            className={`flex items-center justify-between p-3 rounded-lg ${
              entry.isCurrentUser ? 'bg-orange-100' : 'bg-white' // Highlight Alex
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <img
                src={entry.avatarUrl || 'https://via.placeholder.com/32/CCCCCC/FFFFFF?text=?'} // Default placeholder if no URL
                alt={`${entry.name}'s avatar`}
                className="w-8 h-8 rounded-full object-cover"
              />
              {/* Name */}
              <span className={`font-medium ${entry.isCurrentUser ? 'text-orange-800' : 'text-gray-800'}`}>
                {entry.name}
              </span>
            </div>
            {/* Points */}
            <span className={`font-semibold ${entry.isCurrentUser ? 'text-orange-800' : 'text-gray-600'}`}>
              {entry.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
