import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MetricCard from "./MetricCard";
import ProgressBar from "./ProgressBar";
import PerformanceCard from "./PerformanceCard";
import VirtualEnvironment from "./VirtualEnvironment";
import AdditionalMetrics from "./AdditionalMetrics";
import MotivationalMessage from "./MotivationalMessage";
import { getCurrentPatientId } from "../../services/api";

const ExercisePage: React.FC = () => {
  const navigate = useNavigate();
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const location = useLocation();

  // Get exercise data from location state
  const exercise = location.state?.exercise;
  const startTime = location.state?.startTime || new Date().toISOString();

  // Exercise metrics state
  const [time, setTime] = useState(0);
  const [heartRate, setHeartRate] = useState(80);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  
  // Add peak heart rate tracking
  const [peakHeartRate, setPeakHeartRate] = useState(0);
  // Rest periods tracking
  const [restPeriods, setRestPeriods] = useState(0);
  const [restDuration, setRestDuration] = useState(0);
  // Performance metrics
  const [accuracy, setAccuracy] = useState(0.7 + Math.random() * 0.2);
  const [steadiness, setSteadiness] = useState(0.65 + Math.random() * 0.25);
  const [stamina, setStamina] = useState(0.6 + Math.random() * 0.3);

  // Add specific exercise metric: steps climbed (used for most exercise types)
  const [stepsClimbed, setStepsClimbed] = useState(0);

  // Error state for API failures
  const [error, setError] = useState<string | null>(null);

  // Exercise goal from exercise data
  const targetGoal =
    exercise?.goals?.steps ||
    exercise?.goals?.targets ||
    exercise?.goals?.distance ||
    100; // Default goal

  useEffect(() => {
    // If no exercise data, try to fetch it
    if (!exercise && exerciseId) {
      fetch(`http://localhost:5000/api/exercises/${exerciseId}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch exercise details");
          return response.json();
        })
        .then((data) => {
          // We can't directly update location.state, but we have the data now
          console.log("Fetched exercise data:", data);
        })
        .catch((err) => {
          setError(`Error fetching exercise: ${err.message}`);
          console.error("Error fetching exercise:", err);
        });
    }

    // Timer update
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    // Metrics update - simulating real-time data
    const metricsInterval = setInterval(() => {
      // Simulate heart rate changes (80-120 BPM)
      const newHeartRate = Math.floor(80 + Math.random() * 40);
      setHeartRate(newHeartRate);
      
      // Track peak heart rate
      if (newHeartRate > peakHeartRate) {
        setPeakHeartRate(newHeartRate);
      }

      // Simulate speed changes with only increasing values
      setCurrentSpeed((prev) => {
        const newSpeed = prev + Math.random() * 0.5; // Only positive increments
        return Math.min(10, newSpeed); // Cap at maximum speed of 10
      });

      // Update distance based on speed
      setDistance((prev) => prev + currentSpeed * 0.1);

      // Update calories
      setCalories((prev) => prev + currentSpeed * 1);

      // Update steps climbed - core exercise metric
      setStepsClimbed((prev) => {
        // Randomly increment steps, but ensure we don't greatly exceed the target
        const increment = Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + increment, targetGoal * 1.2); // Allow slight overachievement
      });

      // Randomly update rest periods (simulating user taking breaks)
      if (Math.random() > 0.95) {
        setRestPeriods(prev => prev + 1);
        const restTime = Math.floor(Math.random() * 30) + 10; // 10-40 seconds
        setRestDuration(prev => prev + restTime);
      }

      // Update performance metrics
      setAccuracy(prev => Math.min(1, prev + (Math.random() * 0.05 - 0.025)));
      setSteadiness(prev => Math.min(1, prev + (Math.random() * 0.05 - 0.02)));
      setStamina(prev => Math.max(0.5, Math.min(1, prev - (Math.random() * 0.02))));

      // In a real app, we would fetch actual data from sensors:
      // fetchExerciseMetrics(exerciseId)
      //   .then(metrics => {
      //     setHeartRate(metrics.heartRate);
      //     setCurrentSpeed(metrics.speed);
      //     setStepsClimbed(metrics.steps);
      //     // etc.
      //   })
      //   .catch(err => setError("Failed to update metrics"));
    }, 2000);

    // Check if exercise is complete when steps reach target
    const checkCompletionInterval = setInterval(() => {
      if (stepsClimbed >= targetGoal) {
        clearInterval(timer);
        clearInterval(metricsInterval);
        clearInterval(checkCompletionInterval);
        handleExerciseComplete();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(metricsInterval);
      clearInterval(checkCompletionInterval);
    };
  }, [exerciseId, exercise, currentSpeed, stepsClimbed, targetGoal, peakHeartRate]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleExerciseComplete = () => {
    // Calculate final stats
    const formattedTime = formatTime(time);
    const averageSpeed =
      stepsClimbed > 0 && time > 0
        ? (stepsClimbed / (time / 60)).toFixed(1)
        : "0";
    const averageSpeedNum = parseFloat(averageSpeed);
    const averageSpeedStr = `${averageSpeed} steps/min`;

    // For this example, we'll simulate a personal best
    // In a real app, we would fetch previous records and compare
    const isPersonalBest = Math.random() > 0.7; // ~30% chance of being a personal best

    // Recovery heart rate (simulated)
    const recoveryHeartRate = Math.floor(heartRate * 0.9);

    // Build the complete session data object to pass to next screen
    const sessionData = {
      patientId: getCurrentPatientId(),
      exerciseId: exerciseId || exercise?.id,
      prescriptionId: "pr-001", // In a real app, this would come from the user's prescription
      exerciseCustomization: {
        difficulty: exercise?.difficulty || "easy",
        goals: {
          [exercise?.goals?.steps ? "steps" : "targets"]: targetGoal,
          timeLimit: 900, // 15 minutes in seconds
        },
      },
      status: "completed",
      duration: time,
      metrics: {
        score: Math.floor(70 + Math.random() * 30), // Simulated score between 70-100
        stepsClimbed: stepsClimbed,
        avgSpeed: averageSpeedNum,
        calories: Math.round(calories),
        personalBest: isPersonalBest,
        restPeriods: restPeriods,
        restDuration: restDuration,
        heartRate: {
          average: heartRate,
          peak: peakHeartRate,
          recovery: recoveryHeartRate,
        },
        timeTaken: formattedTime,
      },
      feedback: {
        reviewed: false,
        reviewedBy: null,
        reviewDate: null,
        comments: null,
        rating: null,
        improvementAreas: [],
        recommendations: null,
        nextSessionAdjustments: {
          "difficulty": null,
          "duration": null,
          "goals": null
        },
        progressNotes: null
      },
      performance: {
        accuracy: accuracy,
        steadiness: steadiness,
        stamina: stamina,
        rangeOfMotion: 0.75 + Math.random() * 0.1,
        symmetry: 0.7 + Math.random() * 0.15,
      },
      startTime: startTime,
      endTime: new Date().toISOString(),
    };

    // Navigate to completion page with session data
    navigate("/exercise-complete", {
      state: {
        exercise,
        sessionData,
        primaryMetricValue: stepsClimbed,
        primaryMetricName: "Steps Climbed",
        timeTaken: formattedTime,
        averageRate: averageSpeedStr,
        isPersonalBest,
        exerciseName: exercise?.name || "Exercise",
      },
    });
  };

  const handleEndExercise = () => {
    handleExerciseComplete();
  };

  // Display error if something went wrong
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-white p-4">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden flex-col min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-white px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap gap-5 justify-between items-start w-full max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap gap-4 text-3xl sm:text-4xl font-bold text-gray-800 items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/fba9e468e5f04bb09ec724ada98a9a23/099df7457c52d7cc4b75e19bd2de63b17edec225ad328f05d652898e7868dda3?apiKey=fba9e468e5f04bb09ec724ada98a9a23&"
            className="object-contain shrink-0 rounded-lg aspect-square w-[50px] sm:w-[60px]"
            alt="Temple Stairs logo"
          />
          <div className="flex-auto self-center">
            {exercise?.name || "Exercise"} - Training Mode
          </div>
        </div>
        <div className="text-5xl sm:text-6xl font-bold leading-none text-gray-800">
          {formatTime(time)}
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full">
          <div className="flex flex-wrap gap-6">
            <MetricCard
              icon="https://cdn.builder.io/api/v1/image/assets/fba9e468e5f04bb09ec724ada98a9a23/24581ae1bcbce5bfc5cd36f371571a1665e993d90f3ed2960beabec3156f0350?apiKey=fba9e468e5f04bb09ec724ada98a9a23&"
              title="Heart Rate"
              value={heartRate.toString()}
              unit="BPM"
            />

            {/* Steps Card - Show progress toward goal */}
            <div className="flex flex-col flex-1 min-w-[280px]">
              <div className="flex flex-col grow p-6 w-full bg-white rounded-xl shadow-md">
                <div className="flex gap-3 self-start text-lg font-medium text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <div className="basis-auto">Steps Climbed</div>
                </div>
                <div className="flex gap-1.5 items-baseline mt-2 whitespace-nowrap">
                  <div className="text-5xl font-bold leading-none text-teal-600">
                    {stepsClimbed}
                  </div>
                  <div className="text-lg text-gray-600">/ {targetGoal}</div>
                </div>
                <ProgressBar value={stepsClimbed} max={targetGoal} />
                <div className="flex justify-between mt-2 text-base text-gray-600">
                  <div>0</div>
                  <div>Target: {targetGoal}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 min-w-[280px]">
              <div className="flex flex-col grow p-6 w-full bg-white rounded-xl shadow-md">
                <div className="flex gap-3 self-start text-lg font-medium text-gray-700">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/fba9e468e5f04bb09ec724ada98a9a23/8b14de3034f1f00a51af4c7c768cc1b9035ee09baa27634e22ca25c6c1b38a1a?apiKey=fba9e468e5f04bb09ec724ada98a9a23&"
                    className="object-contain shrink-0 w-6 aspect-square"
                    alt="Speed icon"
                  />
                  <div className="basis-auto">Current Speed</div>
                </div>
                <div className="flex gap-1.5 items-baseline mt-2 whitespace-nowrap">
                  <div className="text-5xl font-bold leading-none text-teal-600">
                    {currentSpeed.toFixed(1)}
                  </div>
                  <div className="text-lg text-gray-600">steps/min</div>
                </div>
                <ProgressBar value={currentSpeed} max={30} />
                <div className="flex justify-between mt-2 text-base text-gray-600">
                  <div>0</div>
                  <div>Target: 30</div>
                </div>
              </div>
            </div>

            <PerformanceCard 
              icon="https://cdn.builder.io/api/v1/image/assets/fba9e468e5f04bb09ec724ada98a9a23/4c8c2d0b7f3e4d6c8a5b0d1f6f1e3d2b?apiKey=fba9e468e5f04bb09ec724ada98a9a23&"
              title="Calories Burned"
              metrics={[{ name: "Calories", value: calories.toFixed(1), unit: "kcal" }]}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-6">
            {/* <VirtualEnvironment /> */}
            <AdditionalMetrics />
          </div>
        </div>

        {/* Progress percentage for motivational messages */}
        <MotivationalMessage />
        <div className="flex justify-center mt-10">
          <button
            onClick={handleEndExercise}
            className="px-8 py-4 text-lg font-semibold text-center text-white bg-red-600 rounded-xl shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
          >
            End Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
