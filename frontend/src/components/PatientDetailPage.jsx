import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ASSETS } from '../../public/assets/figmaAssets';

/* ── Reusable micro-components ── */
function Badge({ children, color = 'slate' }) {
  const colors = {
    rose:    'bg-rose-50 text-rose-600 border-rose-200',
    amber:   'bg-amber-50 text-amber-600 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    blue:    'bg-blue-50 text-blue-600 border-blue-200',
    indigo:  'bg-indigo-50 text-indigo-600 border-indigo-200',
    slate:   'bg-slate-100 text-slate-600 border-slate-200',
    navy:    'bg-[#f0f5ff] text-[#003d9b] border-[#c7d7ff]',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${colors[color] || colors.slate}`}>
      {children}
    </span>
  );
}

function SectionCard({ number, title, accent = '#003d9b', children }) {
  return (
    <div
      className="overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,61,155,0.1)] hover:bg-white"
      style={{ boxShadow: '0px 4px 20px rgba(15,23,42,0.03), inset 0 0 0 1px rgba(255,255,255,0.5), 0 0 0 1px rgba(15,23,42,0.04)' }}
    >
      {/* Card header */}
      <div className="flex items-center gap-4 px-8 py-6 border-b border-slate-100" style={{ background: 'linear-gradient(90deg, rgba(248,250,255,0.5) 0%, rgba(255,255,255,0.5) 100%)' }}>
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white shadow-lg"
          style={{ background: accent }}
        >
          {number}
        </span>
        <span className="text-xl font-black tracking-tight text-slate-800">{title}</span>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-2 items-start gap-4 py-3.5 border-b border-slate-100 last:border-0">
      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 pt-0.5">{label}</p>
      <p className="text-[14px] font-semibold text-slate-800">{value || <span className="text-slate-300">—</span>}</p>
    </div>
  );
}

function StatWidget({ label, value, unit }) {
  return (
    <div
      className="group flex flex-col items-center justify-center rounded-3xl p-6 text-center transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(0,61,155,0.15)] hover:-translate-y-1 bg-white/50 hover:bg-white"
      style={{ boxShadow: '0px 2px 12px rgba(15,23,42,0.04), inset 0 0 0 1px rgba(15,23,42,0.04)' }}
    >
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 group-hover:text-indigo-500 transition-colors">{label}</p>
      {value ? (
        <div className="flex items-baseline gap-1">
          <p className="text-4xl font-black tracking-tight text-slate-800">{value}</p>
          <p className="text-sm font-bold text-slate-400">{unit}</p>
        </div>
      ) : (
        <p className="text-3xl font-black text-slate-200">—</p>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function PatientDetailPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('doctorToken');
    if (!token) {
      navigate('/doctor/login');
      return;
    }

    fetch('http://localhost:5000/api/doctor/patients')
      .then(r => r.json())
      .then(all => {
        setPatient((all || []).find(p => p._id === patientId) || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [patientId, navigate]);

  const handleToggle = async () => {
    if (!patient) return;
    setToggling(true);
    const newStatus = !(patient.assessmentData?.reportDone || false);
    try {
      await fetch(`http://localhost:5000/api/doctor/patients/${patientId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: newStatus })
      });
      setPatient(p => ({ ...p, assessmentData: { ...p.assessmentData, reportDone: newStatus } }));
    } catch {
      alert('Failed to update status');
    } finally {
      setToggling(false);
    }
  };

  /* ── States ── */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] font-['Inter',sans-serif]">
        <div className="size-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#003d9b]" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] font-['Inter',sans-serif]">
        <p className="text-lg font-bold text-slate-600">Patient not found.</p>
        <button onClick={() => navigate('/doctor/dashboard')} className="mt-4 rounded-full bg-[#003d9b] px-6 py-2.5 text-sm font-bold text-white">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const data       = patient.assessmentData   || {};
  const isDone     = data.reportDone          || false;
  const info       = data.patientInfo         || {};
  const history    = data.patientHistory      || {};
  const lifestyle  = data.patientLifestyle    || {};
  const biometrics = data.patientBiometrics   || {};

  const bmi = biometrics.weight && biometrics.height
    ? (biometrics.weight / ((biometrics.height / 100) ** 2)).toFixed(1)
    : null;

  const bmiCategory = !bmi ? null
    : bmi < 18.5 ? { label: 'Underweight', color: 'blue',    bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700'    }
    : bmi < 25   ? { label: 'Normal',       color: 'emerald', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' }
    : bmi < 30   ? { label: 'Overweight',   color: 'amber',   bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700'   }
    :              { label: 'Obese',         color: 'rose',    bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-700'    };

  return (
    <div className="min-h-screen font-['Inter',sans-serif] antialiased" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #f8fafc 50%, #f0faf8 100%)' }}>

      {/* ── Sticky Navbar ── */}
      <header className="sticky top-0 z-20 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/doctor/dashboard')}
              className="flex items-center gap-2 rounded-full bg-slate-100/80 px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Dashboard
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <img src={ASSETS.navbarLogo} alt="Glynostic" className="h-7 w-auto shrink-0 object-contain" />
          </div>

          <button
            onClick={handleToggle}
            disabled={toggling}
            className={`flex items-center gap-2.5 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
              isDone
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                : 'bg-gradient-to-r from-[#003d9b] to-[#005344] text-white shadow-[0_8px_20px_-6px_rgba(0,61,155,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,61,155,0.6)] active:scale-95'
            }`}
          >
            {toggling
              ? <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              : <span className="text-base leading-none">{isDone ? '✓' : '○'}</span>
            }
            {isDone ? 'Report Completed' : 'Mark as Done'}
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-24 pt-10 lg:px-12" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #f8fafc 50%, #f0faf8 100%)', minHeight: '100vh' }}>

        {/* ── Patient Hero Banner ── */}
        <div
          className={`mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-8 rounded-[32px] p-10 transition-all duration-500 backdrop-blur-md ${
            isDone ? 'bg-gradient-to-r from-emerald-50/80 to-white/90' : 'bg-white/80'
          }`}
          style={{ boxShadow: '0px 12px 40px -12px rgba(15,23,42,0.1), inset 0 0 0 1px rgba(255,255,255,0.5), 0 0 0 1px rgba(15,23,42,0.04)' }}
        >
          {/* Avatar */}
          {patient.picture ? (
            <div className="relative shrink-0">
              <img src={patient.picture} alt="" className="size-28 rounded-[24px] object-cover ring-4 ring-white shadow-[0_12px_24px_-8px_rgba(0,0,0,0.3)]" />
              {isDone && (
                <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white text-base shadow-lg ring-4 ring-white">✓</div>
              )}
            </div>
          ) : (
            <div className="flex size-28 shrink-0 items-center justify-center rounded-[24px] text-4xl font-black text-white shadow-[0_12px_24px_-8px_rgba(0,61,155,0.4)] ring-4 ring-white/50"
              style={{ background: 'linear-gradient(135deg, #003d9b 0%, #005344 100%)' }}>
              {(info.fullName || patient.name || 'U')[0].toUpperCase()}
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <h1 className="text-4xl font-black tracking-tight text-slate-900">{info.fullName || patient.name || 'Unknown Patient'}</h1>
              {isDone && <Badge color="emerald">✓ Report Done</Badge>}
            </div>
            <p className="text-lg text-slate-500 font-bold mb-5">{info.email || patient.email}</p>
            <div className="flex flex-wrap gap-3">
              {info.mobile      && <Badge color="slate">📞 {info.mobile}</Badge>}
              {info.dob         && <Badge color="slate">🎂 {info.dob}</Badge>}
              {info.biologicalSex && <Badge color="navy">⚥ {info.biologicalSex}</Badge>}
            </div>
          </div>

          {/* BMI Widget */}
          {bmi && bmiCategory && (
            <div className={`shrink-0 flex flex-col items-center rounded-3xl px-10 py-8 border-2 text-center shadow-[0_12px_32px_-12px_rgba(0,0,0,0.1)] ${bmiCategory.bg} ${bmiCategory.border}`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">BMI Score</p>
              <p className={`text-5xl font-black mb-2 ${bmiCategory.text}`}>{bmi}</p>
              <Badge color={bmiCategory.color}>{bmiCategory.label}</Badge>
            </div>
          )}
        </div>

        {/* ── 4-Card Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 01 — Patient History */}
          <SectionCard number="01" title="Medical History">
            {history.selectedConditions && history.selectedConditions.length > 0 && (
              <div className="mb-5 pb-5 border-b border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Pre-existing Conditions</p>
                <div className="flex flex-wrap gap-2">
                  {history.selectedConditions.map(c => <Badge key={c} color="rose">{c}</Badge>)}
                </div>
              </div>
            )}
            <InfoRow label="Family Diabetes History"    value={history.diabetesHistory} />
            <InfoRow label="Family Heart Disease"       value={history.heartDiseaseHistory} />

            {/* Lifestyle risk indicators */}
            <div className="grid grid-cols-2 gap-3 py-4 border-b border-slate-100">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Smokes</p>
                <Badge color={history.smoke ? 'rose' : 'emerald'}>{history.smoke ? '🚬 Yes' : '✗ No'}</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Alcohol</p>
                <Badge color={history.alcohol ? 'amber' : 'emerald'}>{history.alcohol ? '🍺 Yes' : '✗ No'}</Badge>
              </div>
            </div>

            {/* Medications */}
            {history.medications && history.medications.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Current Medications</p>
                <div className="flex flex-col gap-2">
                  {history.medications.map(m => (
                    <div key={m.id || m.name} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 hover:border-slate-200 transition-colors">
                      <div className="size-2.5 shrink-0 rounded-full bg-indigo-400" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{m.name}</p>
                        <p className="text-xs text-slate-500">{m.dosage} · {m.frequency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded Reports */}
            {history.files && history.files.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Uploaded Reports</p>
                <div className="flex flex-col gap-2">
                  {history.files.map((file, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => {
                        if (file.url) {
                          window.open(file.url, '_blank')
                        } else {
                          // Fallback for older saves where file was just a string
                          alert(`Opening secure document: ${file.name || file}\n\n(Note: This file was uploaded before the backend storage was configured.)`)
                        }
                      }}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm transition-all hover:shadow-md hover:border-slate-200 cursor-pointer"
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-700 truncate">{file.name || file}</p>
                      </div>
                      <span className="text-xs font-bold text-indigo-600">View</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionCard>

          {/* 02 — Biometrics */}
          <SectionCard number="02" title="Biometrics & Measurements" accent="#005344">
            <div className="grid grid-cols-3 gap-4 mb-5">
              <StatWidget label="Weight" value={biometrics.weight} unit="kg" />
              <StatWidget label="Waist"  value={biometrics.waist}  unit="cm" />
              <StatWidget label="Height" value={biometrics.height} unit="cm" />
            </div>
            {bmi && bmiCategory && (
              <div className={`flex items-center justify-between rounded-2xl border-2 px-6 py-4 ${bmiCategory.bg} ${bmiCategory.border}`}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Calculated BMI</p>
                  <p className={`text-3xl font-extrabold ${bmiCategory.text}`}>{bmi}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge color={bmiCategory.color}>{bmiCategory.label}</Badge>
                  <p className="text-xs text-slate-400 text-right">
                    {bmiCategory.label === 'Normal' ? 'Healthy range' :
                     bmiCategory.label === 'Overweight' ? 'Above healthy range' :
                     bmiCategory.label === 'Obese' ? 'Clinical attention advised' : 'Below healthy range'}
                  </p>
                </div>
              </div>
            )}
          </SectionCard>

          {/* 03 — Lifestyle */}
          <SectionCard number="03" title="Lifestyle & Habits" accent="#7c3aed">
            <InfoRow label="Exercise Frequency" value={lifestyle.exerciseFreq || history.exercise} />
            <InfoRow label="Work-Life Balance"  value={lifestyle.workBalance} />
            
            <div className="py-4 border-b border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Sleep Cycle</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-slate-400">Duration</p>
                  <p className="text-sm font-bold text-slate-800">{lifestyle.sleepHours ? `${lifestyle.sleepHours} hrs` : '—'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-slate-400">Bedtime</p>
                  <p className="text-sm font-bold text-slate-800">{lifestyle.bedtime || '—'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-slate-400">Wake-up</p>
                  <p className="text-sm font-bold text-slate-800">{lifestyle.wakeTime || '—'}</p>
                </div>
              </div>
            </div>

            {/* Stress bar */}
            <div className="py-4 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Stress Level</p>
                {lifestyle.stressLevel && (
                  <span className="text-sm font-extrabold text-slate-700">{lifestyle.stressLevel}<span className="text-slate-400">/5</span></span>
                )}
              </div>
              {lifestyle.stressLevel ? (
                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      lifestyle.stressLevel <= 2 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                      lifestyle.stressLevel <= 3 ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                      'bg-gradient-to-r from-rose-400 to-rose-500'
                    }`}
                    style={{ width: `${(lifestyle.stressLevel / 5) * 100}%` }}
                  />
                </div>
              ) : <p className="text-sm text-slate-300">Not recorded</p>}
            </div>

            {lifestyle.activities && lifestyle.activities.length > 0 && (
              <div className="py-4 border-b border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Physical Activities</p>
                <div className="flex flex-wrap gap-2">
                  {lifestyle.activities.map(a => <Badge key={a} color="blue">{a}</Badge>)}
                </div>
              </div>
            )}
            {lifestyle.dietNotes && (
              <div className="pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Diet Notes</p>
                <div className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
                  <p className="text-sm font-medium italic text-slate-600 leading-relaxed">"{lifestyle.dietNotes}"</p>
                </div>
              </div>
            )}
          </SectionCard>

          {/* 04 — Report Status */}
          <SectionCard number="04" title="Report Status" accent={isDone ? '#059669' : '#475569'}>
            <div className={`flex flex-col items-center justify-center gap-5 py-8 rounded-2xl border-2 border-dashed transition-colors ${isDone ? 'border-emerald-200 bg-gradient-to-b from-emerald-50/80 to-white' : 'border-slate-200 bg-gradient-to-b from-slate-50/80 to-white'}`}>
              <div className={`flex size-20 items-center justify-center rounded-2xl text-3xl shadow-sm ${isDone ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                {isDone ? '✓' : '⏳'}
              </div>
              <div className="text-center px-4">
                <p className="text-xl font-extrabold text-slate-800 mb-1">{isDone ? 'Report Completed' : 'Pending Review'}</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {isDone
                    ? 'This assessment has been reviewed and marked complete.'
                    : 'This assessment is awaiting your review.'}
                </p>
              </div>
              <button
                onClick={handleToggle}
                disabled={toggling}
                className={`flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-200 ${
                  isDone
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-[#003d9b] text-white shadow-[0px_4px_14px_rgba(0,61,155,0.3)] hover:bg-[#002f7a] hover:shadow-[0px_8px_24px_rgba(0,61,155,0.35)]'
                }`}
              >
                {toggling && <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
                {isDone ? 'Mark as Pending' : '✓ Mark as Done'}
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
