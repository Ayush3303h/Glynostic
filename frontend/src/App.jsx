import { useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import GlynosticLanding from "./components/GlynosticLanding"
import PaymentPage499 from "./components/paymentpage499"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlynosticLanding />} />
        <Route path="/paymentpage499" element={<PaymentPage499 />} />
      </Routes>
    </Router>
  );
}



