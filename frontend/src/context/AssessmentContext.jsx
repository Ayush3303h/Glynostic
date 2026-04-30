import { createContext, useContext, useState } from "react";

const AssessmentContext = createContext();

export function AssessmentProvider({ children }) {
  const [assessmentData, setAssessmentData] = useState({
    patientInfo: {},
    patientHistory: {},
    patientLifestyle: {},
    patientBiometrics: {},
  });

  const updateAssessmentData = (section, data) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  return (
    <AssessmentContext.Provider value={{ assessmentData, updateAssessmentData }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export const useAssessment = () => useContext(AssessmentContext);
