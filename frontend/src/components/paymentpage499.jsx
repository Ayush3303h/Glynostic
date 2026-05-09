import { useEffect, useState } from 'react'
import { ASSETS } from '../../public/assets/figmaAssets'
import { useAuth } from '../context/AuthContext'
import { useAssessment } from '../context/AssessmentContext'
import { useNavigate } from 'react-router-dom'
const imgMedicalDashboard =
  'https://www.figma.com/api/mcp/asset/9b60335d-b272-418b-bb36-29776756d891'
const imgRazorpay =
  'https://www.figma.com/api/mcp/asset/54575365-da71-43c7-8392-0f18bfcf0ea6'
const imgGlynosticLogo =
  'https://www.figma.com/api/mcp/asset/18ff29d9-6ac5-4966-a428-4f1b9e067772'
const imgAccountIcon =
  'https://www.figma.com/api/mcp/asset/0fe90abc-754c-4414-a753-57c3096a0ace'
const imgCheckIcon =
  '/assets/imgCheckIcon.svg'
const imgDetailsIcon =
  '/assets/imgDetailsIcon.svg'
const imgDeliveryIcon =
  '/assets/imgDeliveryIcon.svg'
const imgSecureIcon =
  '/assets/imgSecureIcon.svg'
const imgUpiIcon =
  'https://www.figma.com/api/mcp/asset/dc09521c-9c3b-4b81-a958-bb38d73d0137'
const imgCardIcon =
  'https://www.figma.com/api/mcp/asset/adbb0605-008b-42db-a329-3cd0e94688f8'
const imgArrowIcon =
  'https://www.figma.com/api/mcp/asset/8027da2f-bddb-404a-bcd7-e6805c662aa0'
const imgTrustSecure =
  '/assets/imgUpiIcon.svg'
const imgTrustClinical =
  '/assets/imgTrustClinical.svg'
const imgTrustRefund =
  '/assets/imgTrustRefund.svg'

const listItems = [
  'AI-powered analysis of 25+ factors',
  'Metabolic Age & Risk Score',
  'Root cause insights',
  'Personalized recommendations',
  'Action plan to reduce risk',
]

const postPaymentItems = [
  'Your personalized metabolic report will be generated within 24 hours.',
  'The report will be shared on your WhatsApp and registered email.',
  '100% secure payment to proceed.',
]

export default function PaymentPage499() {
  const { user, logout, loading } = useAuth()
  const { assessmentData } = useAssessment()
  const navigate = useNavigate()

  const [timeLeft, setTimeLeft] = useState(10800); // 3 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handlePayment = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${apiUrl}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const order = await response.json();

      if (!order.id) {
        alert("Failed to create order. Please try again.");
        return;
      }

      const options = {
        key: 'rzp_live_SkSDyDMEUlw8HU',
        amount: order.amount,
        currency: order.currency,
        name: 'Glynostic',
        description: 'Metabolic Health Assessment',
        order_id: order.id,
        handler: function (response) {
          navigate('/patient-summary');
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: assessmentData?.patientInfo?.mobile || '',
        },
        theme: {
          color: '#003d9b'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert("Payment Failed: " + response.error.description);
      });
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong initializing the payment.");
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7fafc]">
        <div className="text-[#003d9b] font-semibold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7fafc] font-['Inter',sans-serif] text-[#151c27]">
      <header className="border-b border-[#f1f5f9] bg-[rgba(255,255,255,0.8)] px-3 shadow-[0px_4px_10px_rgba(0,82,204,0.05)] backdrop-blur-[6px] sm:px-6 lg:px-[86px]">
        <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between">
          <img src={ASSETS.navbarLogo} alt="Glynostic" className="h-7 w-auto object-contain sm:h-8" />
          <div className="flex items-center gap-4">
            {user ? (
              <img
                src={user.picture}
                alt="user profile"
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                width={32}
                height={32}
              />
            ) : (
              <img src={imgAccountIcon} alt="" className="hidden size-5 sm:block" />
            )}
            <button
              onClick={() => {
                if (user) {
                  logout()
                  navigate('/')
                }
              }}
              className="rounded-full bg-[#003d9b] px-4 py-2 text-xs font-semibold leading-5 text-white sm:px-6 sm:text-sm cursor-pointer hover:bg-[#002d7a] transition-colors"
            >
              {user ? 'Logout' : 'Get Started'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1280px] px-3 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-24">
        <section className="mb-12 flex flex-col items-center">
          <h1 className="text-center font-['Manrope',sans-serif] text-[28px] font-semibold leading-[1.2] tracking-[-0.32px] text-[#151c27] sm:text-[36px] md:text-[44px] md:leading-[56px]">
            Complete Your Metabolic Risk Assessment
          </h1>
          <p className="mt-2 text-center text-sm font-normal leading-6 text-[#57605f] sm:text-lg sm:leading-7">
            Unlock your personalized Glynostic Metabolic Risk Report
          </p>
          <div className="mt-2 h-1 w-24 rounded-full bg-[#003d9b]" />
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <article className="overflow-hidden rounded-xl border border-[rgba(190,201,196,0.2)] bg-white shadow-[0px_4px_32px_rgba(0,0,0,0.04)] lg:col-span-7">
            <div className="relative h-[240px] w-full overflow-hidden sm:h-[320px] lg:h-[396px]">
              <img src="/assets/MockUp_1.png" alt="" className="h-full w-full object-cover" />
              <span className="absolute left-4 top-3 rounded-full bg-[#003d9b] px-3 py-[3.5px] text-xs font-semibold uppercase tracking-[0.6px] text-white">
                METABOLIC EXCELLENCE
              </span>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <h2 className="font-['Manrope',sans-serif] text-2xl font-semibold leading-8 text-[#151c27] sm:text-[30px] lg:text-[33px]">
                Glynostic Metabolic Risk Report
              </h2>

              <ul className="mt-6 space-y-4">
                {listItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <img src={imgCheckIcon} alt="" className="mt-0.5 size-5" />
                    <span className="text-base leading-6 text-[#3e4945]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-end gap-3 sm:gap-4">
                <span className="text-[34px] font-semibold leading-9 text-[#151c27] sm:text-[40px]">₹499</span>
                <span className="text-base leading-7 text-[#57605f] line-through sm:text-lg">₹3000</span>
              </div>
              <p className="mt-1 text-sm leading-5 text-[#57605f]">
                One-time payment • No hidden charges
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 border-y border-[rgba(190,201,196,0.3)] py-6 sm:grid-cols-3 sm:gap-0">
                <div className="flex flex-col items-center gap-2">
                  <img src={imgDetailsIcon} alt="" className="h-5 w-4" />
                  <p className="text-center text-[10px] font-semibold uppercase leading-[12.5px] text-[#151c27]">
                    DETAILED REPORT
                    <br />
                    15+ PAGES
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src={imgDeliveryIcon} alt="" className="h-4 w-5" />
                  <p className="text-center text-[10px] font-semibold uppercase leading-[12.5px] text-[#151c27]">
                    DELIVERY IN
                    <br />
                    10-15 MINUTES
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src={imgSecureIcon} alt="" className="h-5 w-4" />
                  <p className="text-center text-[10px] font-semibold uppercase leading-[12.5px] text-[#151c27]">
                    100% SECURE &
                    <br />
                    CONFIDENTIAL
                  </p>
                </div>
              </div>

              <h3 className="mt-6 text-base font-semibold leading-6 text-[#151c27]">
                What happens after payment?
              </h3>
              <ol className="mt-4 space-y-4">
                {postPaymentItems.map((item, idx) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#d8e2e0] pb-[1px] text-xs font-semibold text-[#5b6563]">
                      {idx + 1}
                    </span>
                    <span className="text-sm leading-5 text-[#3e4945]">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
          <aside className="lg:col-span-5 flex flex-col items-center pt-2">
            {/* The white card */}
            <div className="w-full rounded-[20px] border border-[#f1f5f9] bg-white p-8 text-center shadow-[0px_8px_32px_rgba(0,0,0,0.04)]">
              {/* Offer Ends section */}
              <div className="flex items-center justify-center gap-2 text-[#2f4d8a]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span className="text-[15px] font-medium tracking-wide uppercase flex items-center">
                  Offer ends in 
                  <span className="ml-2 rounded-md bg-[#eff6ff] px-2 py-1 text-[18px] font-bold text-[#1d4ed8] shadow-sm border border-[#dbeafe]">
                    {formatTime(timeLeft)}
                  </span>
                </span>
              </div>

              {/* SAVE 80% text */}
              <h3 className="mt-5 text-[24px] font-bold text-[#203f9e]">
                SAVE 80%
              </h3>

              {/* Pay button */}
              <button 
                onClick={handlePayment}
                className="mt-5 flex w-full flex-col items-center justify-center rounded-xl bg-[#203f9e] py-3.5 text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="text-[24px] font-bold leading-tight">Pay Now - ₹499</span>
                <span className="text-[15px] font-medium text-white/70 line-through">₹2,100</span>
              </button>

              {/* Secure text */}
              <p className="mt-5 text-[13px] text-[#9ca3af]">
                Secure payment processed via encrypted gateway.
              </p>
            </div>

            {/* Large Shield icon below */}
            <div className="mt-14 flex justify-center text-[#cfd5de]">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-4 pt-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex h-[98px] items-center gap-4 rounded-xl border border-[rgba(190,201,196,0.3)] bg-white p-4 sm:p-[25px]">
            <div className="flex size-12 items-center justify-center rounded-full border-[3px] border-[#96ebd5]">
              <img src={imgTrustSecure} alt="" className="h-5 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-5 text-[#151c27]">100% Secure Payment</p>
              <p className="text-xs leading-4 text-[#57605f]">256-bit SSL encrypted gateway</p>
            </div>
          </div>
          <div className="flex h-[98px] items-center gap-4 rounded-xl border border-[rgba(190,201,196,0.3)] bg-white p-4 sm:p-[25px]">
            <div className="flex size-12 items-center justify-center rounded-full border-[3px] border-[#96ebd5]">
              <img src={imgTrustClinical} alt="" className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-5 text-[#151c27]">Clinically Designed</p>
              <p className="text-xs leading-4 text-[#57605f]">Validated by metabolic specialists</p>
            </div>
          </div>
          <div className="flex h-[98px] items-center gap-4 rounded-xl border border-[rgba(190,201,196,0.3)] bg-white p-4 sm:p-[25px]">
            <div className="flex size-12 items-center justify-center rounded-full border-4 border-[#96ebd5]">
              <img src={imgTrustRefund} alt="" className="h-5 w-[22px]" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-5 text-[#151c27]">Money Back Guarantee</p>
              <p className="text-xs leading-4 text-[#57605f]">100% Satisfaction or refund</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#f1f5f9] bg-[#f8fafc]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-8 px-3 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:px-8 lg:py-12">
          <div>
            <p className="text-2xl font-semibold leading-7 text-[#0f172a] sm:text-[28px]">Need Help?</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm leading-[22.75px] sm:gap-4">
              <a href="#" className="font-semibold text-[#005344]">
              9217596156
              </a>
              <span className="text-[#cbd5e1]">|</span>
              <a href="mailto:support@glynostic.com" className="text-[#64748b]">
                support@glynostic.com
              </a>
            </div>
          </div>
          <div className="w-full text-left lg:w-auto lg:text-right">
            <p className="text-xs leading-4 text-[#64748b]">
              © 2024 Glynostic Healthcare. HIPAA Compliant &amp; SOC2 Type II Certified.
            </p>
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
        </div>
      </footer>
    </div>
  )
}
