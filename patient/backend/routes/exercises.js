const express = require('express');
const router = express.Router();
const exerciseService = require('../services/exerciseService');

// Get all exercises
router.get('/', (req, res) => {
  try {
    const exercises = exerciseService.getAllExercises();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get exercise by ID
router.get('/:id', (req, res) => {
  try {
    const exercise = exerciseService.getExerciseById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get exercises for a specific patient
router.get('/patient/:patientId', (req, res) => {
  try {
    // console.log(req.params.patientId);
    const exercises = exerciseService.getExercisesForPatient(req.params.patientId);
    res.json(exercises);
  } catch (error) {
    // console.error("Error getting exercises for patient:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
