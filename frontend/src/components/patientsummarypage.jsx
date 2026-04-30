import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'

const logo = 'https://www.figma.com/api/mcp/asset/1c6213eb-a0bd-4d3e-b074-11129c54703f'
const accountIcon = 'https://www.figma.com/api/mcp/asset/0baa08e4-7375-4104-948f-3162e9bbd12e'

const stepDone = 'https://www.figma.com/api/mcp/asset/0415dde3-1d12-42a2-92de-43449f3f986a'
const historyIcon = 'https://www.figma.com/api/mcp/asset/2903afb4-3681-45cb-9657-f0758d10c719'
const lifestyleIcon = 'https://www.figma.com/api/mcp/asset/ad2dee28-569c-4673-8f45-148a0a815016'
const biometricsIcon = 'https://www.figma.com/api/mcp/asset/40c4d8e1-798e-43d8-9843-7b0bf10599d1'
const summaryActiveIcon = 'https://www.figma.com/api/mcp/asset/c0b3ff0a-d1e4-4e33-bd43-530af7fb86da'
const completeBadge = 'https://www.figma.com/api/mcp/asset/3c6de1b4-3f22-4cd1-b845-7492e5594639'

const centralCheckIcon = 'https://www.figma.com/api/mcp/asset/7054516b-38f3-4131-8c77-018238a99e5c'
const dataSecurityIcon = 'https://www.figma.com/api/mcp/asset/81289fa1-2542-42c6-9cf7-a0c529bb404f'
const clinicalGradeIcon = 'https://www.figma.com/api/mcp/asset/423a5ea7-25fb-4530-a964-a92aaa3e8133'
const lockSmallIcon = 'https://www.figma.com/api/mcp/asset/3e48a147-b40b-4872-847d-ee05f812a4e5'
const bentoEmailIcon = 'https://www.figma.com/api/mcp/asset/17fa9349-1043-47d9-a464-f96b111ce94c'
const bentoWhatsappIcon = 'https://www.figma.com/api/mcp/asset/db10cca9-f9e9-4088-8337-72e2bb656b3d'
const bentoRealtimeIcon = 'https://www.figma.com/api/mcp/asset/9e452501-9487-4506-a394-956fa7712fd4'

function IconWrap({ src, className, alt = '' }) {
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden ${className}`}>
      <img alt={alt} src={src} className="absolute inset-0 size-full max-w-none object-contain" />
    </span>
  )
}

export default function PatientSummaryPage() {
  const navigate = useNavigate()
  const { assessmentData } = useAssessment()
  const { user, logout } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleComplete = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:5000/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(assessmentData)
      })
      if (!response.ok) throw new Error('Failed to save')
      navigate('/done')
    } catch (err) {
      console.error(err)
      alert("Failed to save assessment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7fafc] font-['Inter',sans-serif] text-[#151c27] antialiased">
      <header className="border-b border-solid border-[#f1f5f9] bg-[rgba(255,255,255,0.8)] shadow-[0px_4px_10px_rgba(0,82,204,0.05)] backdrop-blur-[6px]">
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-6 py-4 sm:px-6 lg:px-[86px]">
          <img
            src={logo}
            alt="Glynostic"
            className="h-8 w-[133px] shrink-0 object-contain object-left"
          />
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
                <IconWrap src={accountIcon} className="size-5" />
                <button
                  type="button"
                  className="rounded-full bg-[#003d9b] px-6 py-2 text-center text-sm font-semibold leading-5 text-white"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-12 pt-14 sm:px-8 lg:px-[83px] lg:pt-[56px]">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1000px)_minmax(260px,1fr)] xl:items-start xl:gap-8">
          {/* Main column — Figma 253:4465: max-w 768, gap 32 between sections */}
          <div className="mx-auto flex w-full min-w-0 max-w-[768px] flex-col gap-8 xl:mx-0">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-['Manrope',sans-serif] text-base font-normal leading-6 text-[#005344]">
                Assessment Complete
              </p>
              <p className="text-base font-normal leading-6 text-[#64748b]">
                Your clinical data profile is now ready for analysis.
              </p>
            </div>

            {/* Central Summary Card — 253:4471 */}
            <section className="relative w-full rounded-[12px] border border-solid border-[#f1f5f9] bg-white px-6 py-10 sm:p-[49px] shadow-[0px_32px_64px_-12px_rgba(0,109,91,0.08)]">
              <div className="flex flex-col items-center gap-[15.5px]">
                <div className="flex w-[80px] shrink-0 justify-center rounded-full bg-[rgba(150,235,213,0.65)] py-5">
                  <div className="relative h-[35px] w-[36.667px] shrink-0">
                    <img
                      alt=""
                      src={centralCheckIcon}
                      className="absolute inset-0 size-full max-w-none object-contain"
                    />
                  </div>
                </div>

                <div className="w-full pt-[16.5px] text-center">
                  <h2 className="font-['Manrope',sans-serif] text-base font-normal leading-6 text-[#151c27]">
                    Submission Received
                  </h2>
                </div>

                <div className="w-full max-w-[512px] text-center">
                  <p className="text-base font-normal leading-[26px] text-[#475569]">
                    <span className="mb-0 block">Your information has been received securely. All details are kept</span>
                    <span className="mb-0 block">confidential. Within 24 hours, you will receive your full report via</span>
                    <span className="block">email and WhatsApp.</span>
                  </p>
                </div>

                <div className="w-full py-[16.5px]">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
                    <div className="flex h-[76px] items-start gap-3 rounded-lg bg-[#f8fafc] p-4">
                      <div className="relative h-5 w-4 shrink-0">
                        <img
                          alt=""
                          src={dataSecurityIcon}
                          className="absolute inset-0 size-full max-w-none object-contain"
                        />
                      </div>
                      <div className="min-w-0 text-left">
                        <p className="text-base font-normal leading-6 text-[#151c27]">Data Security</p>
                        <p className="mt-0 text-sm font-normal leading-5 text-[#64748b]">
                          256-bit HIPAA compliant encryption.
                        </p>
                      </div>
                    </div>
                    <div className="flex h-[76px] items-start gap-3 rounded-lg bg-[#f8fafc] p-4">
                      <div className="relative size-5 shrink-0">
                        <img
                          alt=""
                          src={clinicalGradeIcon}
                          className="absolute inset-0 size-full max-w-none object-contain"
                        />
                      </div>
                      <div className="min-w-0 text-left">
                        <p className="text-base font-normal leading-6 text-[#151c27]">Clinical Grade</p>
                        <p className="mt-0 text-sm font-normal leading-5 text-[#64748b]">
                          Validated by medical practitioners.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleComplete}
                  className={`relative rounded-full bg-[#003d9b] px-12 py-4 shadow-[0px_10px_15px_-3px_rgba(0,83,68,0.2),0px_4px_6px_-4px_rgba(0,83,68,0.2)] ${isSubmitting ? 'opacity-70' : ''}`}
                >
                  <span className="text-center text-lg font-semibold leading-7 text-white">
                    {isSubmitting ? 'Saving...' : 'Complete Assessment'}
                  </span>
                </button>

                <div className="flex w-full items-center justify-center gap-[7.99px]">
                  <IconWrap src={lockSmallIcon} className="h-[11.667px] w-[9.333px]" />
                  <p className="text-center text-sm font-normal leading-5 text-[#94a3b8]">
                    Your privacy is our priority.
                  </p>
                </div>
              </div>
            </section>

            {/* Bottom reassurance bento — 253:4502 */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex h-[58px] items-center gap-3 rounded-[12px] border border-solid border-[#f1f5f9] bg-[rgba(255,255,255,0.6)] p-[17px]">
                <div className="relative h-[18px] w-[21px] shrink-0">
                  <img
                    alt=""
                    src={bentoEmailIcon}
                    className="absolute inset-0 size-full max-w-none object-contain"
                  />
                </div>
                <p className="text-sm font-normal leading-5 text-[#64748b]">Email confirmation sent</p>
              </div>
              <div className="flex h-[58px] items-center gap-3 rounded-[12px] border border-solid border-[#f1f5f9] bg-[rgba(255,255,255,0.6)] p-[17px]">
                <div className="relative size-5 shrink-0">
                  <img
                    alt=""
                    src={bentoWhatsappIcon}
                    className="absolute inset-0 size-full max-w-none object-contain"
                  />
                </div>
                <p className="text-sm font-normal leading-5 text-[#64748b]">WhatsApp support active</p>
              </div>
              <div className="flex h-[58px] items-center gap-3 rounded-[12px] border border-solid border-[#f1f5f9] bg-[rgba(255,255,255,0.6)] p-[17px] sm:col-span-2 lg:col-span-1">
                <div className="relative size-[18px] shrink-0">
                  <img
                    alt=""
                    src={bentoRealtimeIcon}
                    className="absolute inset-0 size-full max-w-none object-contain"
                  />
                </div>
                <p className="text-sm font-normal leading-5 text-[#64748b]">Processing real-time</p>
              </div>
            </div>
          </div>

          {/* Sidebar — 253:2190; step 05 Summary active; 100 COMPLETE */}
          <aside className="min-w-0 w-full">
            <div className="overflow-hidden rounded-[12px] bg-white shadow-[0px_4px_32px_0px_rgba(0,0,0,0.04)]">
              <div className="border-b border-solid border-[#f8fafc] px-6 pb-[25px] pt-6">
                <p className="font-['Manrope',sans-serif] text-lg font-normal leading-7 text-[#005344]">
                  Progress
                </p>
                <p className="mt-0 text-base font-normal leading-6 text-[#94a3b8]">Assessment Steps</p>
              </div>
              <nav>
                <div className="flex items-center gap-4 px-6 py-4">
                  <span className="w-[17px] text-sm font-normal leading-5 text-[#94a3b8]">01</span>
                  <span className="flex-1 text-base font-medium leading-6 text-[#94a3b8]">patient info</span>
                  <IconWrap src={stepDone} className="size-[9.33px]" />
                </div>
                <div className="flex items-center gap-4 px-6 py-4">
                  <span className="w-[17px] text-sm font-normal leading-5 text-[#94a3b8]">02</span>
                  <span className="flex-1 text-base font-medium leading-6 text-[#94a3b8]">History</span>
                  <IconWrap src={historyIcon} className="size-[10.5px]" />
                </div>
                <div className="flex items-center gap-4 px-6 py-4">
                  <span className="w-[17px] text-sm font-normal leading-5 text-[#94a3b8]">03</span>
                  <span className="flex-1 text-base font-medium leading-6 text-[#94a3b8]">Lifestyle</span>
                  <IconWrap src={lifestyleIcon} className="h-[11.67px] w-[8.75px]" />
                </div>
                <div className="flex items-center gap-4 px-6 py-4">
                  <span className="w-[17px] text-sm font-normal leading-5 text-[#94a3b8]">04</span>
                  <span className="flex-1 text-base font-medium leading-6 text-[#94a3b8]">Biometrics</span>
                  <IconWrap src={biometricsIcon} className="h-[11.67px] w-[10.5px]" />
                </div>
                <div className="flex items-center gap-4 border-r-4 border-solid border-[#96ebd5] bg-[#e6f0ee] py-4 pl-6 pr-7">
                  <span className="w-[17px] text-center font-['Manrope',sans-serif] text-sm font-bold leading-5 text-[#003d9b]">
                    05
                  </span>
                  <span className="flex-1 text-base font-semibold leading-6 text-[#003d9b]">Summary</span>
                  <IconWrap src={summaryActiveIcon} className="h-[9.33px] w-[11.67px]" />
                </div>
              </nav>
              <div className="flex items-center justify-between bg-[#f8fafc] p-6">
                <span className="text-xs font-bold uppercase leading-4 tracking-[1.2px] text-[#64748b]">
                  100 COMPLETE
                </span>
                <IconWrap src={completeBadge} className="size-5" />
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-6 border-t border-solid border-[#f1f5f9] px-4 py-12 sm:px-8 lg:flex-row lg:items-center lg:px-8">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold leading-7 text-[#0f172a]">Need Help?</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="#" className="font-semibold leading-[22.75px] text-[#005344]">
              WhatsApp Us
            </a>
            <span className="font-normal leading-[22.75px] text-[#cbd5e1]">|</span>
            <a href="mailto:support@glynostic.com" className="font-normal leading-[22.75px] text-[#64748b]">
              support@glynostic.com
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-left lg:items-end lg:text-right">
          <p className="max-w-[414px] text-xs font-normal leading-4 text-[#64748b]">
            © 2024 Glynostic Healthcare. HIPAA Compliant &amp; SOC2 Type II Certified.
          </p>
          <div className="flex gap-6 text-sm leading-[22.75px] text-[#64748b] lg:justify-end lg:gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
