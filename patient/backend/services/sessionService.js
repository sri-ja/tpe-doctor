const fs = require('fs');
const path = require('path');

const sessionsPath = path.join(__dirname, '../../../data/session.json');

// Get all sessions for a patient
const getSessionsForPatient = (patientId) => {
  try {
    const data = fs.readFileSync(sessionsPath, 'utf8');
    const sessions = JSON.parse(data);
    return sessions.filter(session => session.patientId === patientId);
  } catch (error) {
    // If file doesn't exist yet, return empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw new Error(`Error reading sessions data: ${error.message}`);
  }
};

// Get a patient's previous best performance for an exercise
const getPatientBestForExercise = (patientId, exerciseId) => {
  try {
    const sessions = getSessionsForPatient(patientId);
    
    // Filter sessions for this specific exercise
    const exerciseSessions = sessions.filter(
      session => session.exerciseId === exerciseId
    );
    
    if (exerciseSessions.length === 0) {
      return null; // No previous sessions for this exercise
    }
    
    // Sort sessions by performance (e.g., by time, score, or steps)
    // Here we'll sort by time taken (assuming lower is better)
    const sortedSessions = exerciseSessions.sort((a, b) => {
      // Convert time strings to seconds for comparison
      const getSeconds = (time) => {
        if (!time) return Infinity;
        const [mins, secs] = time.split(':').map(Number);
        return mins * 60 + secs;
      };
      
      const aTime = getSeconds(a.metrics?.timeTaken);
      const bTime = getSeconds(b.metrics?.timeTaken);
      
      return aTime - bTime;
    });
    
    // Return the best session
    return sortedSessions[0];
  } catch (error) {
    console.error('Error getting patient best performance:', error);
    return null;
  }
};

// Create a new session
const createSession = (sessionData) => {
  try {
    let sessions = [];
    
    // Try to read existing sessions
    try {
      const data = fs.readFileSync(sessionsPath, 'utf8');
      sessions = JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, we'll create a new array
      if (error.code !== 'ENOENT') {
        throw error;
      }
      
      // Create directory if it doesn't exist
      const dir = path.dirname(sessionsPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true
        });
      }
    }
    // Add the new session
    sessions.push(sessionData);
    // Write back to the file
    fs.writeFileSync(sessionsPath, JSON.stringify(sessions, null, 2));
    return sessionData;
  }
  catch (error) {
    console.error('Error creating session:', error);
    throw new Error(`Error saving session data: ${error.message}`);
  }
}
// Export the functions
module.exports = {
  getSessionsForPatient,
  getPatientBestForExercise,
  createSession
};
// Note: In a real-world application, you would likely want to use a database
// instead of a JSON file for better performance and reliability.
// Also, consider adding validation for the session data before saving it.

