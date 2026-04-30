import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const logo = 'https://www.figma.com/api/mcp/asset/1c6213eb-a0bd-4d3e-b074-11129c54703f';
const stepDone = 'https://www.figma.com/api/mcp/asset/0415dde3-1d12-42a2-92de-43449f3f986a';
const historyIcon = 'https://www.figma.com/api/mcp/asset/2903afb4-3681-45cb-9657-f0758d10c719';
const lifestyleIcon = 'https://www.figma.com/api/mcp/asset/ad2dee28-569c-4673-8f45-148a0a815016';
const biometricsIcon = 'https://www.figma.com/api/mcp/asset/40c4d8e1-798e-43d8-9843-7b0bf10599d1';

function IconWrap({ src, className, alt = '' }) {
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden ${className}`}>
      <img alt={alt} src={src} className="absolute inset-0 size-full max-w-none object-contain" />
    </span>
  );
}

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('doctorToken');
    if (!token) {
      navigate('/doctor/login');
      return;
    }
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/doctor/patients');
      const data = await res.json();
      setPatients(data || []);
    } catch (err) {
      console.error("Failed to fetch patients", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReportDoneToggle = async (patientId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await fetch(`http://localhost:5000/api/doctor/patients/${patientId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: newStatus })
      });
      // Update local state
      setPatients(patients.map(p => 
        p._id === patientId 
          ? { ...p, assessmentData: { ...p.assessmentData, reportDone: newStatus } } 
          : p
      ));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const logout = () => {
    localStorage.removeItem('doctorToken');
    navigate('/doctor/login');
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] font-['Inter',sans-serif] text-[#151c27] antialiased">
      <header className="border-b border-solid border-[#f1f5f9] bg-white shadow-[0px_4px_10px_rgba(0,82,204,0.05)]">
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-6 py-4 sm:px-6 lg:px-[86px]">
          <img src={logo} alt="Glynostic" className="h-8 w-[133px] shrink-0 object-contain object-left" />
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#005344]">Doctor Portal</span>
            <button
              onClick={logout}
              className="rounded-full bg-[#003d9b] px-6 py-2 text-center text-sm font-semibold text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-12 pt-10 sm:px-8 lg:px-[83px]">
        <div className="mb-8 flex items-center justify-between border-b border-[#e2e8f0] pb-4">
          <h1 className="text-2xl font-bold text-[#0f172a]">Patient Assessments</h1>
          <p className="text-sm text-[#64748b]">Total Patients: {patients.length}</p>
        </div>

        {loading ? (
          <p>Loading patients...</p>
        ) : patients.length === 0 ? (
          <p className="text-[#64748b]">No patient assessments found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {patients.map(patient => {
              const data = patient.assessmentData || {};
              const isDone = data.reportDone || false;
              const info = data.patientInfo || {};
              const history = data.patientHistory || {};
              const lifestyle = data.patientLifestyle || {};
              const biometrics = data.patientBiometrics || {};

              return (
                <div key={patient._id} className="overflow-hidden rounded-[12px] bg-white shadow-[0px_4px_32px_0px_rgba(0,0,0,0.04)] border border-[#f1f5f9]">
                  <div className="flex items-center justify-between bg-[#f8fafc] px-6 py-4 border-b border-[#f1f5f9]">
                    <div className="flex items-center gap-4">
                      {patient.picture && (
                        <img src={patient.picture} alt="" className="size-10 rounded-full object-cover" />
                      )}
                      <div>
                        <h2 className="text-lg font-bold text-[#005344]">{info.fullName || patient.name || "Unknown"}</h2>
                        <p className="text-sm text-[#64748b]">{info.email || patient.email}</p>
                      </div>
                    </div>
                    <label className="flex cursor-pointer items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm border border-[#e2e8f0]">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => handleReportDoneToggle(patient._id, isDone)}
                        className="size-5 accent-[#005344] cursor-pointer"
                      />
                      <span className="text-sm font-bold text-[#151c27]">Report Done</span>
                    </label>
                  </div>

                  {/* Patient Details inspired by the UI sidebar */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#f1f5f9]">
                    
                    {/* 01 Patient Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-bold text-[#003d9b]">01</span>
                        <span className="text-base font-bold text-[#151c27]">Patient Info</span>
                        <IconWrap src={stepDone} className="size-4 ml-auto" />
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <p><span className="text-[#64748b]">Phone:</span> {info.mobile || "N/A"}</p>
                        <p><span className="text-[#64748b]">DOB:</span> {info.dob || "N/A"}</p>
                        <p><span className="text-[#64748b]">Biological Sex:</span> {info.biologicalSex || "N/A"}</p>
                      </div>
                    </div>

                    {/* 02 History */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-bold text-[#003d9b]">02</span>
                        <span className="text-base font-bold text-[#151c27]">History</span>
                        <IconWrap src={historyIcon} className="size-4 ml-auto" />
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        {history.selectedConditions && history.selectedConditions.length > 0 && (
                          <p><span className="text-[#64748b]">Conditions:</span> {history.selectedConditions.join(", ")}</p>
                        )}
                        <p><span className="text-[#64748b]">Family Diabetes:</span> {history.diabetesHistory || "N/A"}</p>
                        <p><span className="text-[#64748b]">Family Heart Disease:</span> {history.heartDiseaseHistory || "N/A"}</p>
                        <p><span className="text-[#64748b]">Smokes:</span> {history.smoke ? "Yes" : "No"}</p>
                        <p><span className="text-[#64748b]">Drinks Alcohol:</span> {history.alcohol ? "Yes" : "No"}</p>
                        {history.medications && history.medications.length > 0 && (
                          <div>
                            <span className="text-[#64748b]">Medications:</span>
                            <ul className="list-disc pl-4 mt-1">
                              {history.medications.map(m => (
                                <li key={m.id || m.name}>{m.name} ({m.dosage}) - {m.frequency}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 03 Lifestyle */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-bold text-[#003d9b]">03</span>
                        <span className="text-base font-bold text-[#151c27]">Lifestyle</span>
                        <IconWrap src={lifestyleIcon} className="size-4 ml-auto" />
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <p><span className="text-[#64748b]">Diet Notes:</span> {lifestyle.dietNotes || "N/A"}</p>
                        <p><span className="text-[#64748b]">Exercise Freq:</span> {lifestyle.exerciseFreq || history.exercise || "N/A"}</p>
                        {lifestyle.activities && lifestyle.activities.length > 0 && (
                          <p><span className="text-[#64748b]">Activities:</span> {lifestyle.activities.join(", ")}</p>
                        )}
                        <p><span className="text-[#64748b]">Sleep:</span> {lifestyle.sleepHours ? `${lifestyle.sleepHours} hrs` : "N/A"}</p>
                        <p><span className="text-[#64748b]">Stress Level:</span> {lifestyle.stressLevel ? `${lifestyle.stressLevel}/5` : "N/A"}</p>
                      </div>
                    </div>

                    {/* 04 Biometrics */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-bold text-[#003d9b]">04</span>
                        <span className="text-base font-bold text-[#151c27]">Biometrics</span>
                        <IconWrap src={biometricsIcon} className="size-4 ml-auto" />
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <p><span className="text-[#64748b]">Weight:</span> {biometrics.weight || "N/A"} kg</p>
                        <p><span className="text-[#64748b]">Waist:</span> {biometrics.waist || "N/A"} cm</p>
                        {biometrics.height && <p><span className="text-[#64748b]">Height:</span> {biometrics.height} cm</p>}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
