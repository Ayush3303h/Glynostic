import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import { ASSETS } from '../../public/assets/figmaAssets'

const logo = 'https://www.figma.com/api/mcp/asset/18ff29d9-6ac5-4966-a428-4f1b9e067772'
const accountIcon = 'https://www.figma.com/api/mcp/asset/a368c798-2fbb-4508-b447-9bb81fdf13e1'
const activeStepIcon = '/assets/pactiveStepIcon.svg'
const historyIcon = '/assets/historyIcon.svg'
const lifestyleIcon = '/assets/lifestyleIcon.svg'
const biometricsIcon = '/assets/biometricsIcon.svg'
const summaryIcon = '/assets/summaryIcon.svg'
const completeIcon = '/assets/ompleteIcon.svg'
const detailsIconBg = '/assets/detailsIconBg1.svg'
const trustA = '/assets/trustA.svg'
const trustB = '/assets/trustB.svg'
const trustC = '/assets/trustC.svg'
const continueArrow = '/assets/ctaarrow.svg'

const footerA = '/assets/footerA.svg'
const footerB = '/assets/footerB.svg'
const footerC = '/assets/footerC.svg'

export default function PatientInfoPage() {
  const { assessmentData, updateAssessmentData } = useAssessment()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(assessmentData.patientInfo || {
    fullName: '',
    mobile: '',
    email: '',
    dob: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleContinue = () => {
    if (!formData.fullName || !formData.mobile || !formData.email || !formData.dob) {
      setError('All fields are mandatory. Please fill all the details.')
      return
    }
    updateAssessmentData('patientInfo', formData)
    navigate('/patient-history')
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-['Inter',sans-serif] text-[#151c27]">
      <header className="border-b border-[#f1f5f9] bg-[rgba(255,255,255,0.8)] px-4 shadow-[0px_4px_10px_rgba(0,82,204,0.05)] backdrop-blur-[6px] sm:px-8 lg:px-[86px]">
        <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between">
          <img src={ASSETS.navbarLogo} alt="Glynostic" className="h-8 w-[133px] object-contain object-left" />
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <img src={user.picture} alt="" className="size-8 rounded-full object-cover" />
                <button onClick={logout} className="rounded-full bg-[#003d9b] px-4 py-2 text-xs font-semibold text-white sm:px-6 sm:text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <img src={accountIcon} alt="" className="hidden size-5 sm:block" />
                <button className="rounded-full bg-[#003d9b] px-4 py-2 text-xs font-semibold text-white sm:px-6 sm:text-sm">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-4 pb-8 pt-8 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-9">
        <section className="rounded-xl bg-white p-5 shadow-[0px_4px_32px_rgba(0,0,0,0.04)] sm:p-8 lg:col-span-9 lg:p-12">
          <h1 className="font-['Manrope',sans-serif] text-[32px] font-semibold leading-10 tracking-[-0.32px] text-[#005344]">
            Patient Demographics
          </h1>
          <p className="mt-1 max-w-[561px] text-base leading-6 text-[#64748b]">
            Please provide the primary contact and identity information for the current assessment.
          </p>

          <div className="mt-8 rounded-xl border border-[#f3f4f6] bg-white p-5 shadow-[0px_10px_32px_-4px_rgba(0,109,91,0.06)] sm:p-8">
            <div className="flex items-center gap-4">
              <img src={detailsIconBg} alt="" className="size-11" />
              <h2 className="font-['Manrope',sans-serif] text-[24px] font-semibold leading-8">Personal Details</h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.6px] text-[#64748b]">FULL NAME</span>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName || ''}
                  onChange={handleChange}
                  placeholder="e.g. Mr Ayush"
                  className="mt-2 w-full rounded-lg border border-transparent bg-[rgba(150,235,213,0.39)] px-[13px] py-[15px] text-base text-[#151c27] placeholder:text-[#6b7280] outline-none focus:ring-2 focus:ring-[#96ebd5]"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.6px] text-[#64748b]">MOBILE NUMBER</span>
                <input
                  name="mobile"
                  type="tel"
                  value={formData.mobile || ''}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="mt-2 w-full rounded-lg border border-transparent bg-[rgba(150,235,213,0.41)] px-[13px] py-[15px] text-base text-[#151c27] placeholder:text-[#6b7280] outline-none focus:ring-2 focus:ring-[#96ebd5]"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.6px] text-[#64748b]">EMAIL ID</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="patient@example.com"
                  className="mt-2 w-full rounded-lg border border-transparent bg-[rgba(150,235,213,0.37)] px-[13px] py-[15px] text-base text-[#151c27] placeholder:text-[#6b7280] outline-none focus:ring-2 focus:ring-[#96ebd5]"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.6px] text-[#64748b]">DATE OF BIRTH</span>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob || ''}
                  onChange={handleChange}
                  onClick={(e) => e.target.showPicker && e.target.showPicker()}
                  max={new Date().toISOString().split('T')[0]}
                  className="mt-2 w-full rounded-lg border border-transparent bg-[rgba(150,235,213,0.46)] px-[13px] py-[13px] text-base text-[#151c27] outline-none focus:ring-2 focus:ring-[#96ebd5]"
                />
              </label>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {[
                ['100% Confidential', 'End-to-end data encryption', trustA],
                ['Clinically Designed', 'Validated by board clinicians', trustB],
                ['Trusted by 1000+', 'Top-tier hospital adoption', trustC],
              ].map(([title, subtitle, icon]) => (
                <div
                  key={title}
                  className="rounded-xl border border-dashed border-[#e5e7eb] bg-[rgba(255,255,255,0.6)] px-4 py-[17px] text-center"
                >
                  <div className="mx-auto h-5 w-6 overflow-hidden">
                    <img src={icon} alt="" className="h-full w-full" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[#334155]">{title}</p>
                  <p className="mt-2 text-xs text-[#94a3b8]">{subtitle}</p>
                </div>
              ))}
            </div>

            {error && <p className="mt-4 text-sm text-red-500 font-semibold">{error}</p>}
            <div className="mt-8 flex justify-center md:justify-end">
              <button onClick={handleContinue} className="flex items-center rounded-full bg-[#003d9b] px-8 py-4 text-lg font-semibold text-white shadow-[0px_10px_15px_-3px_rgba(0,83,68,0.2),0px_4px_6px_-4px_rgba(0,83,68,0.2)]">
                Continue
                <img src={continueArrow} alt="" className="ml-3 size-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {[
              ['100% Confidential', 'HIPAA Compliant Encryption', footerA],
              ['Clinically Designed', 'Validated by Endocrinologists', footerB],
              ['Trusted by 1000+', 'Successful Patient Assessments', footerC],
            ].map(([title, subtitle, icon]) => (
              <div key={title} className="flex h-24 items-center gap-4 rounded-xl bg-white p-6 shadow-[0px_4px_16px_rgba(0,0,0,0.04)]">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#f8fafc]">
                  <div className="h-5 w-6 overflow-hidden">
                    <img src={icon} alt="" className="h-full w-full" />
                  </div>
                </div>
                <div>
                  <p className="text-base font-bold text-[#151c27]">{title}</p>
                  <p className="text-[11px] text-[#94a3b8]">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-3">
          <div className="overflow-hidden rounded-xl bg-white shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
            <div className="border-b border-[#f8fafc] px-6 pb-[25px] pt-6">
              <p className="font-['Manrope',sans-serif] text-[28px] leading-7 text-[#005344]">Progress</p>
              <p className="mt-2 text-base text-[#94a3b8]">Assessment Steps</p>
            </div>

            <div>
              <div className="flex items-center gap-4 border-r-4 border-[#96ebd5] bg-[#e6f0ee] px-6 py-4">
                <div className="text-sm text-[#94a3b8]">
                  <p>01</p>
                </div>
                <span className="text-base font-semibold text-[#003d9b]">Patient Info</span>
                <div className="ml-auto size-[9.333px] overflow-hidden">
                  <img src={activeStepIcon} alt="" className="h-full w-full" />
                </div>
              </div>
              {[
                ['02', 'History', historyIcon],
                ['03', 'Lifestyle', lifestyleIcon],
                ['04', 'Biometrics', biometricsIcon],
                ['05', 'Summary', summaryIcon],
              ].map(([id, label, icon]) => (
                <div key={label} className="flex items-center gap-4 px-6 py-4">
                  <span className="text-sm text-[#94a3b8]">{id}</span>
                  <span className="text-base text-[#94a3b8]">{label}</span>
                  <div className="ml-auto h-[11.667px] w-[11.667px] overflow-hidden">
                    <img src={icon} alt="" className="h-full w-full" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between bg-[#f8fafc] p-6">
              <span className="text-xs font-bold uppercase tracking-[1.2px] text-[#64748b]">22 COMPLETE</span>
              <img src={completeIcon} alt="" className="size-5" />
            </div>
          </div>
        </aside>
      </main>

      <footer className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-6 px-4 pb-10 pt-4 sm:px-8 lg:flex-row lg:items-center lg:px-8">
        <div>
          <p className="text-[32px] font-semibold leading-7 text-[#0f172a]">Need Help?</p>
          <div className="mt-2 flex items-center gap-4 text-sm">
            <a href="#" className="font-semibold text-[#005344]">
              9217596156
            </a>
            <span className="text-[#cbd5e1]">|</span>
            <a href="mailto:support@glynostic.com" className="text-[#64748b]">
              support@glynostic.com
            </a>
          </div>
        </div>
        <div className="text-left lg:text-right">
          <p className="text-xs text-[#64748b]">© 2024 Glynostic Healthcare. HIPAA Compliant &amp; SOC2 Type II Certified.</p>
          <div className="mt-3 flex gap-6 text-sm text-[#64748b] lg:justify-end">
            <a href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#005344' }}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#005344' }}>
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
