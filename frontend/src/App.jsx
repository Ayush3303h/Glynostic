import { useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import GlynosticLanding from "./components/GlynosticLanding"
import PaymentPage499 from "./components/paymentpage499"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AssessmentProvider } from "./context/AssessmentContext"
import ProtectedRoute from "./components/ProtectedRoute"

import PatientInfoPage from "./components/patientinfopage"
import PatientHistoryPage from "./components/patienthistorypage"
import PatientLifestylePage from "./components/patientlifestylepage"
import PatientBiometricsPage from "./components/patientbiometricspage"
import PatientSummaryPage from "./components/patientsummarypage"
import DonePage from "./components/donepage"
import DoctorLogin from "./components/DoctorLogin"
import DoctorDashboard from "./components/DoctorDashboard"
import Nintydayspage from "./components/nintydayspage"

export default function App() {

  return (
    <Router>
      <AssessmentProvider>
        <Routes>
          <Route path="/" element={<GlynosticLanding />} />
          <Route path="/nintydayspage" element={<Nintydayspage />} />
          <Route path="/paymentpage499" element={<PaymentPage499 />} />
          <Route path="/patient-info" element={<PatientInfoPage />} />
          <Route path="/patient-history" element={<PatientHistoryPage />} />
          <Route path="/patient-lifestyle" element={<PatientLifestylePage />} />
          <Route path="/patient-biometrics" element={<PatientBiometricsPage />} />
          <Route path="/patient-summary" element={<PatientSummaryPage />} />
          <Route path="/done" element={<DonePage />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        </Routes>
      </AssessmentProvider>
    </Router>
  );
}



