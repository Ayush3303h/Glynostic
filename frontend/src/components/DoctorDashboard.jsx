import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../../public/assets/figmaAssets';

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('doctorToken');
    if (!token) {
      navigate('/doctor/login');
      return;
    }
    fetchPatients();
  }, [navigate]);

  const fetchPatients = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/doctor/patients`);
      const data = await res.json();
      setPatients(data || []);
    } catch (err) {
      console.error('Failed to fetch patients', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('doctorToken');
    navigate('/doctor/login');
  };

  const pendingPatients = patients.filter(p => !p.assessmentData?.reportDone);
  const historyPatients = patients.filter(p => p.assessmentData?.reportDone);
  const displayedPatients = activeTab === 'pending' ? pendingPatients : historyPatients;

  return (
    <div className="min-h-screen font-['Inter',sans-serif] antialiased" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #f8fafc 50%, #f0faf8 100%)' }}>

      {/* ── Premium Navbar ── */}
      <header className="sticky top-0 z-20 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between px-6 lg:px-12">
          
          {/* Left: Logo + Tabs */}
          <div className="flex items-center gap-10">
            <img src={ASSETS.navbarLogo} alt="Glynostic" className="h-8 w-auto shrink-0 object-contain" />

            {/* Tabs in navbar */}
            <nav className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 ${
                  activeTab === 'pending'
                    ? 'bg-white text-[#003d9b] shadow-[0px_2px_8px_rgba(0,61,155,0.12)]'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Pending
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold leading-none ${
                  activeTab === 'pending'
                    ? 'bg-[#003d9b] text-white'
                    : 'bg-slate-300 text-slate-600'
                }`}>
                  {pendingPatients.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 ${
                  activeTab === 'history'
                    ? 'bg-white text-[#003d9b] shadow-[0px_2px_8px_rgba(0,61,155,0.12)]'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                History
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold leading-none ${
                  activeTab === 'history'
                    ? 'bg-[#003d9b] text-white'
                    : 'bg-slate-300 text-slate-600'
                }`}>
                  {historyPatients.length}
                </span>
              </button>
            </nav>
          </div>

          {/* Right: label + logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Doctor Portal</span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 hover:shadow-none"
            >
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="mx-auto w-full max-w-[1280px] px-6 pb-24 pt-12 lg:px-12">

        {/* Page heading */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#003d9b] mb-1">
              {activeTab === 'pending' ? 'Awaiting Review' : 'Archived Records'}
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {activeTab === 'pending' ? 'Pending Assessments' : 'Assessment History'}
            </h1>
          </div>
          <p className="text-sm text-slate-400 font-medium">
            {activeTab === 'pending' 
              ? 'Click "See Details" to open full profile.'
              : 'All completed reports are archived here.'}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="relative">
              <div className="size-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#003d9b]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-4 rounded-full bg-[#003d9b]/20" />
              </div>
            </div>
          </div>
        ) : displayedPatients.length === 0 ? (
          <div className="flex h-60 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 backdrop-blur-sm">
            <div className="mb-4 rounded-2xl bg-slate-50 p-5 shadow-inner">
              <svg className="size-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-lg font-extrabold text-slate-500">
              {activeTab === 'pending' ? '🎉 All caught up!' : 'No history yet'}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-400">
              {activeTab === 'pending' ? 'No pending assessments at this time.' : 'Completed reports will appear here.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayedPatients.map((patient, index) => {
              const data = patient.assessmentData || {};
              const info = data.patientInfo || {};
              const biometrics = data.patientBiometrics || {};
              const isDone = data.reportDone || false;
              const bmi = biometrics.weight && biometrics.height
                ? (biometrics.weight / ((biometrics.height / 100) ** 2)).toFixed(1)
                : null;

              return (
                <div
                  key={patient._id}
                  className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm px-8 py-6 transition-all duration-500 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,61,155,0.15)] hover:-translate-y-1"
                  style={{ boxShadow: '0px 4px 20px rgba(15,23,42,0.03), inset 0 0 0 1px rgba(255,255,255,0.5), 0 0 0 1px rgba(15,23,42,0.04)' }}
                >
                  {/* Subtle left accent bar */}
                  <div className={`absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full transition-colors duration-500 ${isDone ? 'bg-gradient-to-b from-emerald-400 to-emerald-300' : 'bg-gradient-to-b from-[#003d9b] to-indigo-500'}`} />

                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    {/* Index Number */}
                    <span className="shrink-0 ml-2 text-2xl font-black text-slate-100 select-none w-8 text-center group-hover:text-slate-200 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {patient.picture ? (
                      <>
                        <img src={patient.picture} alt="" className="size-14 rounded-full object-cover ring-4 ring-white shadow-md" />
                        <div className={`absolute -bottom-1 -right-1 size-4 rounded-full border-[3px] border-white shadow-sm ${isDone ? 'bg-slate-300' : 'bg-emerald-500'}`} />
                      </>
                    ) : (
                      <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#003d9b] to-indigo-600 text-lg font-black text-white shadow-lg ring-4 ring-indigo-50/50">
                        {(info.fullName || patient.name || 'U')[0].toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Name + Email */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-[15px] font-extrabold text-slate-800 truncate">{info.fullName || patient.name || 'Unknown Patient'}</h2>
                      {isDone && (
                        <span className="shrink-0 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-700 uppercase tracking-wide">✓ Done</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 font-medium truncate">{info.email || patient.email}</p>
                  </div>

                  </div>

                  {/* Right Actions / Chips */}
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                    {/* BMI chip (if available) */}
                    {bmi && (
                      <div className="flex flex-col items-center shrink-0 px-4 py-2 rounded-xl bg-slate-50/80 border border-slate-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">BMI</p>
                        <p className="text-xl font-black text-slate-700 leading-none mt-1">{bmi}</p>
                      </div>
                    )}

                  {/* Quick info chips */}
                  {info.biologicalSex && (
                    <span className="hidden lg:inline-flex shrink-0 items-center rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500">{info.biologicalSex}</span>
                  )}

                    {/* CTA */}
                    <button
                      onClick={() => navigate(`/doctor/patient/${patient._id}`)}
                      className="shrink-0 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#003d9b] to-[#005344] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(0,61,155,0.4)] transition-all duration-300 hover:shadow-[0_12px_24px_-8px_rgba(0,61,155,0.6)] hover:gap-3 active:scale-95 group-hover:from-indigo-600 group-hover:to-[#003d9b]"
                    >
                      See Details
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
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
