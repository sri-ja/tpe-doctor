import React from "react";

interface MetricItemProps {
  label: string;
  value: string;
}

const MetricItem: React.FC<MetricItemProps> = ({ label, value }) => (
  <div className="flex flex-col flex-1 grow shrink-0 items-start p-4 bg-gray-50/80 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 basis-0 min-w-[150px]"> 
    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</div> 
    <div className="mt-1.5 text-2xl font-bold text-gray-800">{value}</div> 
  </div>
);

interface AdditionalMetricsProps {
  exerciseType?: string;
  difficulty?: string;
}

const AdditionalMetrics: React.FC<AdditionalMetricsProps> = ({ 
  exerciseType = "motor-skills",
  difficulty = "moderate"
}) => {
  // Generate appropriate tips based on exercise type
  const getTipsForExerciseType = (type: string): string[] => {
    switch (type) {
      case 'motor-skills':
      case 'gross-motor':
        return [
          "Focus on maintaining proper form during each step",
          "Keep your core engaged for better balance",
          "Look ahead to improve spatial awareness"
        ];
      case 'mobility':
        return [
          "Maintain a consistent pace for best results",
          "Move deliberately through the course",
          "Use your arms to help with balance and momentum"
        ];
      case 'upper-limb':
        return [
          "Keep your shoulder relaxed when reaching",
          "Extend fully to target for maximum benefit",
          "Maintain a steady breathing pattern"
        ];
      case 'hand-eye-coordination':
        return [
          "Focus on the target before making your move",
          "Anticipate the object's movement path",
          "Keep your movements smooth, not jerky"
        ];
      case 'balance':
        return [
          "Fix your gaze on a stationary point",
          "Keep your core engaged",
          "Make small adjustments rather than big movements"
        ];
          default:
        return [
          "Focus on maintaining proper form",
          "Stay consistent with your movements",
          "Remember to breathe naturally"
        ];
        }
  };

  const tips = getTipsForExerciseType(exerciseType);

  // Calculate difficulty ranking
  const difficultyLevels = ["very-easy", "easy", "moderate", "challenging", "difficult"];
  const difficultyRanking = difficultyLevels.indexOf(difficulty) + 1;

  return (
    <div className="flex flex-col w-full flex-1">
      <div className="flex grow flex-col p-6 w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-teal-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Technique Guide</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Difficulty:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-2.5 h-2.5 rounded-full ${
                    level <= difficultyRanking
                      ? "bg-teal-600"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-sm font-medium text-teal-700">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2.5">Focus Areas</h4>
            <div className="flex flex-wrap gap-2">
              {getTagsForExerciseType(exerciseType).map((tag, index) => (
                <span key={index} className="px-3 py-1.5 bg-teal-100/80 text-teal-800 text-sm font-medium rounded-full border border-teal-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2.5">Benefits</h4>
            <div className="flex flex-wrap gap-2">
              {getBenefitsForExerciseType(exerciseType).map((benefit, index) => (
                <span key={index} className="px-3 py-1.5 bg-blue-50/80 text-blue-700 text-sm font-medium rounded-full border border-blue-100">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-transparent rounded-lg p-5 border-l-4 border-teal-400 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a1 1 0 11-2 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            Expert Tips
          </h4>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-medium text-xs mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper functions to get appropriate tags and benefits based on exercise type
function getTagsForExerciseType(type: string): string[] {
  switch (type) {
    case 'motor-skills':
    case 'gross-motor':
      return ["Motor Control", "Balance", "Coordination"];
    case 'mobility':
      return ["Range of Motion", "Coordination", "Flexibility"];
    case 'upper-limb':
      return ["Arm Control", "Reaching", "Precision"];
    case 'hand-eye-coordination':
      return ["Timing", "Reaction", "Precision"];
    case 'balance':
      return ["Stability", "Proprioception", "Core Engagement"];
    default:
      return ["Form", "Technique", "Control"];
  }
}

function getBenefitsForExerciseType(type: string): string[] {
  switch (type) {
    case 'motor-skills':
    case 'gross-motor':
      return ["Enhanced Mobility", "Daily Function", "Independence"];
    case 'mobility':
      return ["Improved Movement", "Reduced Stiffness", "Better Posture"];
    case 'upper-limb':
      return ["Fine Motor Skills", "Dexterity", "Functional Reach"];
    case 'hand-eye-coordination':
      return ["Improved Reaction", "Better Accuracy", "Visual Processing"];
    case 'balance':
      return ["Fall Prevention", "Posture Control", "Confidence"];
    default:
      return ["Overall Function", "Movement Quality", "Confidence"];
  }
}

export default AdditionalMetrics;
