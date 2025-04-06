import React, { useState, useEffect } from "react";
import { fetchExercises } from '../../../services/api';
import { Exercise } from '../../../types';

const ExerciseAssignment: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const exercisesData = await fetchExercises();
        setExercises(exercisesData);
      } catch (err) {
        setError('Failed to load exercises');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    console.log({
      exerciseType: formData.get('exerciseType'),
      difficulty: formData.get('difficulty'),
      parameters: formData.get('parameters')
    });
  };

  if (loading) return <div>Loading exercises...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Assign Exercise</h2>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="exerciseType" className="block text-sm font-medium text-gray-700 mb-1">
              Exercise Type
            </label>
            <select
              id="exerciseType"
              name="exerciseType"
              className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Exercise</option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty Level
            </label>
            <select
              id="difficulty"
              name="difficulty"
              className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Difficulty</option>
              {exercises[0]?.customizationOptions.difficulty.options.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="parameters"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Parameters / Notes
          </label>
          <textarea
            id="parameters"
            name="parameters"
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter exercise parameters, duration, reps, sets, etc..."
          />
        </div>
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
