const fs = require('fs');
const path = require('path');

const exercisesPath = path.join(__dirname, '../../../data/exercise.json');
const prescriptionsPath = path.join(__dirname, '../../../data/prescription.json');

// Get all exercises
const getAllExercises = () => {
  try {
    const data = fs.readFileSync(exercisesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading exercises data: ${error.message}`);
  }
};

// Get exercise by ID
const getExerciseById = (id) => {
  try {
    const exercises = getAllExercises();
    return exercises.find(exercise => exercise.id === id);
  } catch (error) {
    throw new Error(`Error finding exercise: ${error.message}`);
  }
};

// Get exercises for a specific patient
const getExercisesForPatient = (patientId) => {
  try {
    // Read prescriptions data
    const prescriptionsData = fs.readFileSync(prescriptionsPath, 'utf8');
    const prescriptions = JSON.parse(prescriptionsData);
    
    // Filter prescriptions for the patient
    const patientPrescriptions = prescriptions.filter(
      prescription => prescription.patientId === patientId
    );
    // console.log(patientPrescriptions);
    if (patientPrescriptions.length === 0) {
      return [];
    }
    // Get all exercises
    const exercises = getAllExercises();
    
    // Collect all prescribed exercises from the patient's prescriptions
    const prescribedExercises = [];

    // Loop through each prescription for the patient
    patientPrescriptions.forEach(prescription => {
      // Process each prescribed exercise in this prescription
      prescription.prescribedExercises.forEach(prescribedExercise => {
        // Find the full exercise details by ID
        const exerciseDetails = exercises.find(
          exercise => exercise.id === prescribedExercise.exerciseId
        );
        
        if (exerciseDetails) {
          // Combine the exercise details with prescription-specific information
          prescribedExercises.push({
            ...exerciseDetails,
            prescription: {
              customization: prescribedExercise.customization,
              schedule: prescribedExercise.schedule,
              progressionPlan: prescribedExercise.progressionPlan,
              specialInstructions: prescribedExercise.specialInstructions
            }
          });
        }
      });
    });
    console.log(prescribedExercises);
    return prescribedExercises;
  } catch (error) {
    throw new Error(`Error getting exercises for patient: ${error.message}`);
  }
};

module.exports = {
  getAllExercises,
  getExerciseById,
  getExercisesForPatient
};
