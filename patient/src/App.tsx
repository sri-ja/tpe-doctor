import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RecoveryDashboard  from './components/RecoveryDashboard/RecoveryDashboard';
import ExerciseList from './components/ExerciseList/ExerciseList';
import ExerciseSelection from './components/ExerciseSelection/ExerciseSelection';
import ExercisePage from './components/ExercisePage/ExercisePage';
import ExerciseComplete from './components/ExerciseComplete/ExerciseComplete';
import { PatientProvider } from './context/patientContext';


function App() {
  return (
    <PatientProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<RecoveryDashboard />} />
            <Route path="/exercise-list" element={<ExerciseList />} />
            <Route path="/exercise-details/:exerciseId" element={<ExerciseSelection />} />
            <Route path="/exercise/:exerciseId" element={<ExercisePage />} />
            <Route path="/exercise-complete" element={<ExerciseComplete />} />
          </Routes>
        </div>
      </Router>
    </PatientProvider>
  );
}

export default App;