import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionReview from "./ReviewSession/components/SessionReview/SessionReview";
import Layout from "./components/Layout";
import { PatientProvider } from "./context/ReviewSessionContext";
import PatientManagement from "./components/PatientManagement";
import PatientDashboard from "./PatientDetails/components/PatientDashboard/PatientDashboard"

function App() {
  return (
    <PatientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PatientManagement />} />
            <Route path="session-review/:patientId" element={<SessionReview />} />
            <Route path="patient/:patientId" element={<PatientDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PatientProvider>
  );
}

export default App;
