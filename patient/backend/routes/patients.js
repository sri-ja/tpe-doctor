const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const patientsPath = path.join(__dirname, '../../../data/patient.json');

// Helper to read patients data
const readPatientsData = () => {
  try {
    const data = fs.readFileSync(patientsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    console.error("Error reading patients data:", error);
    return [];
  }
};

// Get all patients
router.get('/', (req, res) => {
  try {
    const patients = readPatientsData();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get patient by ID
router.get('/:id', (req, res) => {
  try {
    const patients = readPatientsData();
    const patient = patients.find(p => p.id === req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new patient
router.post('/', (req, res) => {
  try {
    const patients = readPatientsData();
    const newPatient = {
      id: Date.now().toString(), // Simple ID generation
      ...req.body
    };
    
    patients.push(newPatient);
    fs.writeFileSync(patientsPath, JSON.stringify(patients, null, 2));
    
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update patient
router.put('/:id', (req, res) => {
  try {
    const patients = readPatientsData();
    const index = patients.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    patients[index] = { ...patients[index], ...req.body };
    fs.writeFileSync(patientsPath, JSON.stringify(patients, null, 2));
    
    res.json(patients[index]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
