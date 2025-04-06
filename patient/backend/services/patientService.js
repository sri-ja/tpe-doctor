const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../../data/patient.json');

// Get all patients
const getAllPatients = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading patients data: ${error.message}`);
  }
};

// Get patient by ID
const getPatientById = (id) => {
  try {
    const patients = getAllPatients();
    return patients.find(patient => patient.id === id);
  } catch (error) {
    throw new Error(`Error finding patient: ${error.message}`);
  }
};

module.exports = {
  getAllPatients,
  getPatientById
};
