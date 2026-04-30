import { useState } from 'react'

const logo = 'https://www.figma.com/api/mcp/asset/abe52546-340a-43f5-8373-f98c8bf06669'
const accountIcon = 'https://www.figma.com/api/mcp/asset/2c68d5dd-5f79-4fb2-9124-0c76561d3a94'
const stepDone = 'https://www.figma.com/api/mcp/asset/e7a476b1-f30c-4fc6-baaa-bd0ebc41bf01'
const historyIcon = 'https://www.figma.com/api/mcp/asset/51431229-b552-430f-a462-e34f2e6ee10e'
const lifestyleIcon = 'https://www.figma.com/api/mcp/asset/7047d5b2-f67b-4e1e-9c70-d8016f45d6d9'
const biometricsIcon = 'https://www.figma.com/api/mcp/asset/4d7c8666-6d53-4f43-980e-6e60a6d059de'
const summaryIcon = 'https://www.figma.com/api/mcp/asset/42fcb679-bde9-49cc-8b52-d9425a3b10b6'
const completeBadge = 'https://www.figma.com/api/mcp/asset/2cfd9f24-e8ca-4d2a-b2a4-3487094e9ebe'

const dietIcon = 'https://www.figma.com/api/mcp/asset/11cb7742-33db-465b-b476-fc3a4a56ce6e'
const dumbbellIcon = 'https://www.figma.com/api/mcp/asset/fa607e7b-6922-4cc5-a2aa-4392cfb5a7dd'
const checkSvg = 'https://www.figma.com/api/mcp/asset/3a467241-c767-4450-b905-5e861e80ea66'
const moonIcon = 'https://www.figma.com/api/mcp/asset/c1a55471-00a3-41f3-b3ec-f5676b9f8455'
const briefcaseIcon = 'https://www.figma.com/api/mcp/asset/108837ce-ada3-48ec-8e04-d51209af8f7b'
const stressIcon = 'https://www.figma.com/api/mcp/asset/b2f6678a-f99d-4e0a-ac40-f3d8bcf7becb'
const infoIcon = 'https://www.figma.com/api/mcp/asset/6140e156-6a54-4076-be47-48abf1da91d3'
const backArrow = 'https://www.figma.com/api/mcp/asset/a02e03c3-6406-40fe-8930-daa7f43a69c8'
const continueArrow = 'https://www.figma.com/api/mcp/asset/6f33fd0a-4bd0-4ed9-8b33-932293188a8a'

const exerciseOptions = ['Never', '1-2 times/week', '3-4 times/week', 'Daily']
const activityTypes = [
  { id: 'cardio', label: 'Cardio', bg: 'bg-[rgba(150,235,213,0.46)]' },
  { id: 'strength', label: 'Strength', bg: 'bg-[rgba(150,235,213,0.38)]' },
  { id: 'yoga', label: 'Yoga', bg: 'bg-[rgba(150,235,213,0.26)]' },
  { id: 'sports', label: 'Sports', bg: 'bg-[rgba(150,235,213,0.44)]' },
]

function IconWrap({ src, className, alt = '' }) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <img alt={alt} src={src} className="absolute inset-0 size-full max-w-none object-contain" />
    </span>
  )
}

export default function PatientLifestylePage() {
  const [dietNotes, setDietNotes] = useState('')
  const [exerciseFreq, setExerciseFreq] = useState('3-4 times/week')
  const [activities, setActivities] = useState(() => new Set(['cardio', 'yoga']))
  const [sleepHours, setSleepHours] = useState('7.5')
  const [bedtime, setBedtime] = useState('22:30')
  const [wakeTime, setWakeTime] = useState('06:30')
  const [stressLevel, setStressLevel] = useState(3)
  const [workBalance, setWorkBalance] = useState('')

  const toggleActivity = (id) => {
    setActivities((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const formatTimeDisplay = (hhmm) => {
    if (!hhmm) return ''
    const [h, m] = hhmm.split(':').map(Number)
    if (Number.isNaN(h) || Number.isNaN(m)) return hhmm
    const d = new Date()
    d.setHours(h, m, 0, 0)
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  return (
    <div className="min-h-screen bg-[#f7fafc] font-['Inter',sans-serif] text-[#151c27]">
      <header className="border-b border-[#f1f5f9] bg-[rgba(255,255,255,0.8)] px-4 shadow-[0px_4px_10px_rgba(0,82,204,0.05)] backdrop-blur-[6px] sm:px-8 lg:px-[86px]">
        <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between pl-0 pr-0 sm:pl-2 sm:pr-2">
          <img
            src={logo}
            alt="Glynostic"
            className="h-8 w-[133px] shrink-0 object-contain object-left"
          />
          <div className="flex items-center gap-4">
            <IconWrap src={accountIcon} className="hidden size-5 sm:block" />
            <button
              type="button"
              className="rounded-full bg-[#003d9b] px-6 py-2 text-sm font-semibold leading-5 text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-4 pb-12 pt-8 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-9">
          <h1 className="font-['Manrope',sans-serif] text-2xl font-semibold text-[#151c27] sm:text-[32px] sm:leading-10 sm:tracking-[-0.32px]">
            Your Lifestyle Habits
          </h1>
          <p className="mt-2 max-w-[672px] text-base leading-6 text-[#3e4945]">
            We assess your daily habits to personalize your metabolic plan.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
            {/* Diet — full width */}
            <section className="rounded-xl border border-[#f1f5f9] bg-white p-6 shadow-[0px_8px_16px_rgba(0,0,0,0.04)] sm:p-[33px] lg:col-span-12">
              <div className="flex items-center gap-3">
                <IconWrap src={dietIcon} className="h-5 w-[15px]" />
                <h2 className="font-['Manrope',sans-serif] text-base font-medium text-[#151c27]">
                  Diet Patterns
                </h2>
              </div>
              <p className="mt-3 text-base leading-6 text-[#3e4945]">
                DESCRIBE DAILY EATING HABITS (MEALS, FOOD TYPES)
              </p>
              <textarea
                value={dietNotes}
                onChange={(e) => setDietNotes(e.target.value)}
                rows={5}
                placeholder="e.g., I typically eat 3 balanced meals a day, focusing on high protein and vegetables. I avoid processed sugars most weekdays..."
                className="mt-3 min-h-[140px] w-full resize-y rounded-xl border-0 bg-[rgba(150,235,213,0.44)] px-4 py-4 text-base leading-6 text-[#003d9b] placeholder:text-[#003d9b]/70 focus:outline-none focus:ring-2 focus:ring-[#96ebd5]"
              />
            </section>

            {/* Physical Activity — 7 cols */}
            <section className="rounded-xl border border-[#f1f5f9] bg-white p-6 shadow-[0px_8px_16px_rgba(0,0,0,0.04)] sm:p-[33px] lg:col-span-7">
              <div className="flex items-center gap-3">
                <IconWrap src={dumbbellIcon} className="size-5" />
                <h2 className="font-['Manrope',sans-serif] text-base font-medium">Physical Activity</h2>
              </div>
              <p className="mt-4 text-base text-[#3e4945]">HOW OFTEN DO YOU EXERCISE?</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {exerciseOptions.map((opt) => {
                  const active = exerciseFreq === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setExerciseFreq(opt)}
                      className={`rounded-full px-[17px] py-[9px] text-sm ${
                        active
                          ? 'bg-[#003d9b] font-semibold text-white'
                          : 'border border-[#bec9c4] font-normal text-[#151c27]'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              <p className="mt-6 text-base text-[#3e4945]">TYPE OF ACTIVITY (MULTI-SELECT)</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activityTypes.map(({ id, label, bg }) => {
                  const on = activities.has(id)
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleActivity(id)}
                      className={`flex h-12 items-center gap-3 rounded-lg pl-[11px] pr-3 ${bg}`}
                    >
                      <span
                        className={`flex size-[22px] shrink-0 items-center justify-center rounded border ${
                          on ? 'border-transparent bg-[#003d9b] p-px' : 'border-[#bec9c4] bg-white'
                        }`}
                      >
                        {on ? (
                          <IconWrap src={checkSvg} className="size-5" />
                        ) : (
                          <span className="size-5" />
                        )}
                      </span>
                      <span className="text-base font-medium">{label}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Sleep — 5 cols */}
            <section className="rounded-xl border border-[#f1f5f9] bg-white p-6 shadow-[0px_8px_16px_rgba(0,0,0,0.04)] sm:p-[33px] lg:col-span-5">
              <div className="flex items-center gap-3">
                <IconWrap src={moonIcon} className="size-5" />
                <h2 className="font-['Manrope',sans-serif] text-base font-medium">Sleep Patterns</h2>
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-base text-[#3e4945]">AVG. DURATION (HOURS)</p>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    className="mt-2 w-full rounded-lg border-0 bg-[rgba(150,235,213,0.34)] p-3 text-base text-[#151c27] focus:outline-none focus:ring-2 focus:ring-[#96ebd5]"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-base text-[#3e4945]">BEDTIME</p>
                    <input
                      type="time"
                      value={bedtime}
                      onChange={(e) => setBedtime(e.target.value)}
                      className="mt-2 w-full rounded-lg border-0 bg-[rgba(150,235,213,0.28)] p-3 text-base text-[#151c27] focus:outline-none focus:ring-2 focus:ring-[#96ebd5]"
                    />
                    <p className="mt-1 text-xs text-[#64748b]">{formatTimeDisplay(bedtime)}</p>
                  </div>
                  <div>
                    <p className="text-base text-[#3e4945]">WAKE-UP TIME</p>
                    <input
                      type="time"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      className="mt-2 w-full rounded-lg border-0 bg-[rgba(150,235,213,0.25)] p-3 text-base text-[#151c27] focus:outline-none focus:ring-2 focus:ring-[#96ebd5]"
                    />
                    <p className="mt-1 text-xs text-[#64748b]">{formatTimeDisplay(wakeTime)}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Stress — 5 cols row 3 */}
            <section className="rounded-xl border border-[#f1f5f9] bg-white p-6 shadow-[0px_8px_16px_rgba(0,0,0,0.04)] sm:p-[33px] lg:col-span-5">
              <div className="flex items-center gap-3">
                <IconWrap src={stressIcon} className="h-5 w-[19px]" />
                <h2 className="font-['Manrope',sans-serif] text-base font-medium">Stress Levels</h2>
              </div>
              <p className="mt-6 text-center text-base text-[#3e4945]">1 (LOW) TO 5 (HIGH)</p>
              <div className="relative mt-6 h-12 w-full px-2">
                <div className="absolute left-8 right-8 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#dce2f3]" />
                <div className="relative flex justify-between px-0 sm:px-2">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const selected = stressLevel === n
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setStressLevel(n)}
                        className={`relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-[#003d9b] text-base font-bold transition ${
                          selected
                            ? 'bg-[#003d9b] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
                            : 'bg-white text-[#003d9b]'
                        }`}
                      >
                        {n}
                      </button>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Work-Life — 7 cols row 3 */}
            <section className="relative min-h-[302px] rounded-xl border border-[#f1f5f9] bg-white p-6 shadow-[0px_8px_16px_rgba(0,0,0,0.04)] sm:p-8 lg:col-span-7">
              <div className="flex items-center gap-3">
                <IconWrap src={briefcaseIcon} className="size-[21px]" />
                <h2 className="font-['Manrope',sans-serif] text-base font-medium">Work-Life Balance</h2>
              </div>
              <p className="mt-3 text-base text-[#3e4945]">
                DESCRIBE YOUR WORK AND PERSONAL LIFE BALANCE
              </p>
              <textarea
                value={workBalance}
                onChange={(e) => setWorkBalance(e.target.value)}
                rows={3}
                placeholder="Highly demanding work schedule, moderate stress..."
                className="mt-4 w-full rounded-xl border-0 bg-[rgba(150,235,213,0.25)] px-4 py-[18px] text-base text-[#151c27] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#96ebd5]"
              />
              <div className="mt-4 flex gap-3 rounded-lg bg-[rgba(150,235,213,0.25)] p-4">
                <IconWrap src={infoIcon} className="size-5 shrink-0" />
                <p className="text-sm italic leading-5 text-[#3e4945]">
                  This information helps our algorithms detect potential cortisol-related metabolic shifts.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 text-base font-semibold text-[#3e4945]"
            >
              <IconWrap src={backArrow} className="size-4" />
              Back
            </button>
            <button
              type="button"
              className="flex items-center gap-3 self-start rounded-full bg-[#003D9B] px-10 py-4 text-base text-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] sm:self-auto"
            >
              Continue
              <IconWrap src={continueArrow} className="size-4" />
            </button>
          </div>
        </div>

        <aside className="lg:col-span-3">
          <div className="overflow-hidden rounded-xl bg-white shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
            <div className="border-b border-[#f8fafc] px-6 pb-[25px] pt-6">
              <p className="font-['Manrope',sans-serif] text-lg text-[#005344]">Progress</p>
              <p className="mt-1 text-base text-[#94a3b8]">Assessment Steps</p>
            </div>
            <nav>
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="text-sm text-[#94a3b8]">01</span>
                <span className="text-base font-medium text-[#94a3b8]">patient info</span>
                <IconWrap src={stepDone} className="ml-auto size-[9px]" />
              </div>
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="text-sm text-[#94a3b8]">02</span>
                <span className="text-base font-medium text-[#94a3b8]">History</span>
                <IconWrap src={historyIcon} className="ml-auto size-[10px]" />
              </div>
              <div className="flex items-center gap-4 border-r-4 border-[#96ebd5] bg-[#e6f0ee] py-4 pl-6 pr-7">
                <span className="inline-block h-[10.5px] w-[11.34px] shrink-0" aria-hidden />
                <span className="text-base font-semibold text-[#003d9b]">Lifestyle</span>
                <IconWrap src={lifestyleIcon} className="ml-auto h-[11px] w-[9px]" />
              </div>
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="text-sm text-[#94a3b8]">04</span>
                <span className="text-base font-medium text-[#94a3b8]">Biometrics</span>
                <IconWrap src={biometricsIcon} className="ml-auto h-[9px] w-[11px]" />
              </div>
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="text-sm text-[#94a3b8]">05</span>
                <span className="text-base font-medium text-[#94a3b8]">Summary</span>
                <IconWrap src={summaryIcon} className="ml-auto h-[11px] w-[10px]" />
              </div>
            </nav>
            <div className="flex items-center justify-between bg-[#f8fafc] p-6">
              <span className="text-xs font-bold uppercase tracking-[1.2px] text-[#64748b]">
                70 COMPLETE
              </span>
              <IconWrap src={completeBadge} className="size-5" />
            </div>
          </div>
        </aside>
      </div>

      <footer className="mx-auto mt-8 flex w-full max-w-[1280px] flex-col items-start justify-between gap-6 border-t border-[#f1f5f9] px-4 py-10 sm:px-8 lg:flex-row lg:items-center">
        <div>
          <p className="text-xl font-semibold text-[#0f172a]">Need Help?</p>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
            <a href="#" className="font-semibold text-[#005344]">
              WhatsApp Us
            </a>
            <span className="text-[#cbd5e1]">|</span>
            <a href="mailto:support@glynostic.com" className="text-[#64748b]">
              support@glynostic.com
            </a>
          </div>
        </div>
        <div className="text-left lg:text-right">
          <p className="max-w-[413px] text-xs text-[#64748b]">
            © 2024 Glynostic Healthcare. HIPAA Compliant &amp; SOC2 Type II Certified.
          </p>
          <div className="mt-3 flex gap-6 text-sm text-[#64748b] lg:justify-end">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
