const express = require('express');
const router = express.Router();
const sessionService = require('../services/sessionService');

// Get all sessions for a patient
router.get('/patient/:patientId', (req, res) => {
  try {
    const sessions = sessionService.getSessionsForPatient(req.params.patientId);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a patient's best performance for an exercise
router.get('/patient/:patientId/best/:exerciseId', (req, res) => {
  try {
    const bestSession = sessionService.getPatientBestForExercise(
      req.params.patientId,
      req.params.exerciseId
    );
    
    if (!bestSession) {
      return res.status(404).json({ message: "No sessions found for this exercise" });
    }
    
    res.json(bestSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new session
router.post('/', (req, res) => {
  try {
    const newSession = sessionService.createSession(req.body);
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
