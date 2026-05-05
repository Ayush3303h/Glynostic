import { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ASSETS } from "../../public/assets/figmaAssets"
/** Figma MCP — node 256:6150 (refresh via get_design_context if URLs expire) */
const logo = 'https://www.figma.com/api/mcp/asset/5116c326-1a6b-4e79-bbc1-dedb44bda793'
const accountIcon = 'https://www.figma.com/api/mcp/asset/d71d00d6-ab7c-4fe1-b4eb-3370ca93bd6e'

const badgeCheckIcon = 'https://www.figma.com/api/mcp/asset/09fa2185-1727-4c7d-94d3-dda7036447ac'
const heroAvatar1 = 'https://www.figma.com/api/mcp/asset/5656d278-65be-45ac-9573-eb5c3d07c778'
const heroAvatar2 = 'https://www.figma.com/api/mcp/asset/d58b80c3-7950-46be-86e4-f6b42bb00ae1'
const heroImage = 'https://www.figma.com/api/mcp/asset/b062178a-8c0b-4fc5-9c23-8a9a43474089'

const guideCardIcon = 'https://www.figma.com/api/mcp/asset/f6b33a73-f48e-4d2f-bbaa-548132823ac0'
const guideCardImage = 'https://www.figma.com/api/mcp/asset/9cc2b669-79f6-47a0-b4c0-cd888fdf70c5'
const dietIcon = 'https://www.figma.com/api/mcp/asset/b4e6c4b1-7f7a-4e7f-8497-ee401fc3eead'
const lifestyleIcon = 'https://www.figma.com/api/mcp/asset/2194e677-452b-4b59-9d07-bdd3dabbd239'
const testsIcon = 'https://www.figma.com/api/mcp/asset/afb3c052-f919-4b10-8b0a-c12ca14f3f56'
const testsCardImage = 'https://www.figma.com/api/mcp/asset/968d21e6-62b8-4399-88da-7695a5583bca'
const whatsappBg = 'https://www.figma.com/api/mcp/asset/55b260fe-6905-4b53-9097-b4346763c975'
const coachBg = 'https://www.figma.com/api/mcp/asset/f152cbc6-3c03-4dfd-b67b-9adada9c980e'

const trustSecure = 'https://www.figma.com/api/mcp/asset/8bcfcef9-5966-499d-a424-85f69f992a56'
const trustMoney = 'https://www.figma.com/api/mcp/asset/010b2262-09f4-4e6e-b8da-1d9c02ab8833'
const trustPrivacy = 'https://www.figma.com/api/mcp/asset/5427b534-40c8-474f-9a97-057c8876282a'
const paymentVerifiedIcon = 'https://www.figma.com/api/mcp/asset/47094123-0558-4dae-a2c2-6b5407c81a00'

const nextEmailIcon = 'https://www.figma.com/api/mcp/asset/96a3af17-34af-4aaa-b253-659145d862a6'
const nextTruckIcon = 'https://www.figma.com/api/mcp/asset/d69f262a-2ee0-4570-a159-b5b5efbf9e02'
const nextUsersIcon = 'https://www.figma.com/api/mcp/asset/9f51690f-2af4-4192-a0ad-2c64c6f092f2'

function IconWrap({ src, className, alt = '' }) {
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden ${className}`}>
      <img alt={alt} src={src} className="absolute inset-0 size-full max-w-none object-contain" />
    </span>
  )
}

export default function NintydaysPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [upiId, setUpiId] = useState('glynostic@upi')
  const [copyLabel, setCopyLabel] = useState('Copy')

  const [timeLeft, setTimeLeft] = useState(10800);

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
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const copyUpi = useCallback(() => {
    if (!navigator.clipboard?.writeText) return
    void navigator.clipboard.writeText(upiId).then(
      () => {
        setCopyLabel('Copied')
        setTimeout(() => setCopyLabel('Copy'), 2000)
      },
      () => { },
    )
  }, [upiId])

  const handlePayment = async () => {
    if (!fullName || !mobile || !email) {
      alert("Please fill all details in the form first.");
      return;
    }
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${apiUrl}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 499900 }) // 4999 in paise
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
        description: '90-Day Metabolic Reversal Program',
        order_id: order.id,
        handler: function (response) {
          alert('Payment Successful! Welcome to the 90-Day Program.');
          // Navigate to a success page or dashboard
        },
        prefill: {
          name: fullName || '',
          email: email || '',
          contact: mobile || '',
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
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error initiating payment");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] font-['Inter',sans-serif] text-[#151c27] antialiased">
      <header className="border-b border-solid border-[#f1f5f9] bg-[rgba(255,255,255,0.8)] shadow-[0px_4px_10px_rgba(0,82,204,0.05)] backdrop-blur-[6px]">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-4 lg:px-[86px]">
          <img
            src={ASSETS.navbarLogo}
            alt="Glynostic"
            className="h-8 w-[133px] shrink-0 object-contain object-left"
          />
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <img src={user.picture} alt="" className="size-8 rounded-full object-cover" />
                <button
                  type="button"
                  onClick={() => { logout(); navigate('/'); }}
                  className="rounded-full bg-[#003d9b] px-6 py-2 text-sm font-semibold leading-5 text-white cursor-pointer hover:bg-[#002d7a] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <IconWrap src={accountIcon} className="size-5" />
                <button
                  type="button"
                  className="rounded-full bg-[#003d9b] px-6 py-2 text-sm font-semibold leading-5 text-white"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-6">
        {/* Hero — gap 48px row, py 80px */}
        <section className="flex flex-col items-center gap-12 py-16 lg:flex-row lg:items-center lg:gap-12 lg:py-20">
          <div className="flex w-full max-w-[672px] flex-shrink-0 flex-col gap-6 lg:max-w-none lg:flex-1 lg:basis-[710px]">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#9df3dc] px-3 py-1">
              <div className="relative h-3.5 w-[14.667px] shrink-0">
                <img alt="" src={badgeCheckIcon} className="absolute inset-0 size-full object-contain" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.6px] text-[#00201a]">
                ASSESSMENT COMPLETED
              </span>
            </div>
            <h1 className="font-['Manrope',sans-serif] text-4xl font-bold leading-[56px] tracking-[-0.96px] text-[#003d9b] sm:text-[48px]">
              <span className="block">Take the Leap Beyond</span>
              <span className="block">Assessment.</span>
            </h1>
            <div className="max-w-[672px] text-lg font-normal leading-7 text-[#3e4945]">
              <p className="mb-0">
                You&apos;ve taken the first step with our ₹499 assessment. Now, unlock the full 90-
              </p>
              <p className="mb-0">
                Day Glynostic Metabolic Reversal Program designed to stabilize your blood
              </p>
              <p>sugar and reclaim your energy.</p>
            </div>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-stretch">
              <a
                href="#enroll"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#003d9b] px-8 py-4 text-lg font-semibold leading-7 text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
              >
                Start My 90-Day Reversal
              </a>
              <div className="inline-flex items-center gap-3 self-start rounded-full border border-solid border-[#bec9c4] px-[17px] py-[9px]">
                <div className="relative flex shrink-0 items-start">
                  <span className="relative size-8 shrink-0 overflow-hidden rounded-full border-2 border-white ring-0">
                    <img alt="" src={heroAvatar1} className="absolute inset-0 size-full object-cover" />
                  </span>
                  <span className="-ml-2 relative size-8 shrink-0 overflow-hidden rounded-full border-2 border-white">
                    <img alt="" src={heroAvatar2} className="absolute inset-0 size-full object-cover" />
                  </span>
                </div>
                <span className="text-sm font-semibold leading-5 text-[#151c27]">
                  Clinically Validated Protocol
                </span>
              </div>
            </div>
          </div>
          <div className="relative w-full max-w-[474px] shrink-0 lg:w-[473.61px]">
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[#9df3dc] opacity-30 blur-[40px]" aria-hidden />
            <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-[32px] border-4 border-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:max-w-[473.61px]">
              <img alt="" src="/assets/Unted-1.jpg" className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        {/* Bento — section gap 48, title block gap 8 */}
        <section className="flex flex-col gap-12 py-16">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-['Manrope',sans-serif] text-3xl font-semibold leading-10 tracking-[-0.32px] text-[#003d9b] sm:text-[32px]">
              Everything Included in Your Reversal
            </h2>
            <p className="text-base font-normal leading-6 text-[#3e4945]">
              A holistic ecosystem designed for permanent metabolic health.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 xl:grid-rows-[258px_258px_150px] xl:gap-6">
            {/* Row 1: guide 8 cols */}
            <div className="flex min-h-[200px] flex-col gap-8 rounded-[12px] border border-solid border-[#f3f4f6] bg-white p-[33px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center xl:col-span-8 xl:row-start-1 xl:min-h-[258px]">
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-[#96ebd5]">
                    <IconWrap src={guideCardIcon} className="h-4 w-[22px]" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-['Manrope',sans-serif] text-2xl font-semibold leading-8 text-[#151c27]">
                      90-Day Reversal Guide
                    </h3>
                  </div>
                  <p className="text-base font-normal leading-6 text-[#3e4945]">
                    Your roadmap to metabolic freedom. Phase-by-phase instructions on balancing hormones and
                    restoring insulin sensitivity.
                  </p>
                </div>
              </div>
              <div className="mx-auto h-[192px] w-[192px] shrink-0 overflow-hidden rounded-xl sm:mx-0">
                <img alt="" src={guideCardImage} className="size-full object-cover" />
              </div>
            </div>

            {/* Row 1: diet 4 cols */}
            <div className="flex min-h-[200px] flex-col gap-2 rounded-[12px] bg-[#003d9b] px-8 pb-[58px] pt-8 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] xl:col-span-4 xl:row-start-1 xl:min-h-[258px]">
              <div className="relative h-[30px] w-[22.5px] shrink-0">
                <img alt="" src={dietIcon} className="absolute inset-0 size-full object-contain" />
              </div>
              <div className="pt-2">
                <h3 className="font-['Manrope',sans-serif] text-2xl font-semibold leading-8 text-[#96ebd5]">
                  Personalized Diet Plan
                </h3>
              </div>
              <p className="text-base font-normal leading-6 text-[#96ebd5] opacity-90">
                Custom-engineered meal maps based on your unique glycemic response and preferences.
              </p>
            </div>

            {/* Row 2: lifestyle 4 */}
            <div className="flex min-h-[200px] flex-col gap-2 rounded-[12px] border border-solid border-[#f3f4f6] bg-white px-[33px] pb-[57px] pt-[33px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] xl:col-span-4 xl:row-start-2 xl:min-h-[258px]">
              <div className="relative size-[30px] shrink-0">
                <img alt="" src={lifestyleIcon} className="absolute inset-0 size-full object-contain" />
              </div>
              <div className="pt-2">
                <h3 className="font-['Manrope',sans-serif] text-2xl font-semibold leading-8 text-[#005344]">
                  Lifestyle Reset Guide
                </h3>
              </div>
              <p className="text-base font-normal leading-6 text-[#3e4945]">
                Sleep, stress, and circadian alignment protocols that amplify your physiological healing.
              </p>
            </div>

            {/* Row 2: tests 8 */}
            <div className="flex min-h-[200px] flex-col gap-6 rounded-[12px] border border-solid border-[#dce2f3] bg-[#f0f3ff] px-[33px] py-[33px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center sm:justify-between xl:col-span-8 xl:row-start-2 xl:min-h-[258px]">
              <div className="max-w-[448px] min-w-0 flex-1">
                <div className="flex flex-col gap-2">
                  <div className="relative h-[31.5px] w-[30px] shrink-0">
                    <img alt="" src={testsIcon} className="absolute inset-0 size-full object-contain" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-['Manrope',sans-serif] text-2xl font-semibold leading-8 text-[#003d9b]">
                      Periodic Tests &amp; Tracking
                    </h3>
                  </div>
                  <p className="text-base font-normal leading-6 text-[#3e4945]">
                    Regular biomarker assessments to monitor your progress in real-time with clinical precision.
                  </p>
                </div>
              </div>
              <div className="mx-auto h-[192px] w-52 shrink-0 overflow-hidden rounded-l-xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] sm:mx-0 sm:rotate-[3deg]">
                <img alt="" src={testsCardImage} className="h-full w-full object-cover" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex min-h-[120px] gap-6 rounded-[12px] border border-solid border-[#f3f4f6] bg-white p-[33px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] xl:col-span-6 xl:row-start-3 xl:h-[150px] xl:min-h-0">
              <div className="relative size-[52px] shrink-0">
                <img alt="" src={whatsappBg} className="absolute inset-0 size-full object-contain" />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="font-['Manrope',sans-serif] text-2xl font-semibold leading-8 text-[#005344]">
                  24/7 WhatsApp Support
                </h3>
                <p className="text-base font-normal leading-6 text-[#3e4945]">
                  Direct access to your clinical concierge for instant answers and motivation whenever you need it.
                </p>
              </div>
            </div>
            <div className="flex min-h-[120px] gap-6 rounded-[12px] border border-solid border-[#f3f4f6] bg-white p-[33px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] xl:col-span-6 xl:row-start-3 xl:h-[150px] xl:min-h-0">
              <div className="relative h-[51px] w-[54px] shrink-0">
                <img alt="" src={coachBg} className="absolute inset-0 size-full object-contain" />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="font-['Manrope',sans-serif] text-2xl font-semibold leading-8 text-[#005344]">
                  Virtual Metabolic Coach
                </h3>
                <p className="text-base font-normal leading-6 text-[#3e4945]">
                  AI-powered insights that learn from your data to provide hyper-personalized daily guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enrollment */}
        <section
          id="enroll"
          className="mb-16 overflow-hidden rounded-[32px] border border-solid border-[#f3f4f6] bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left payment */}
            <div className="flex w-full flex-col justify-center gap-8 border-b border-solid border-[#f3f4f6] bg-[#f9f9ff] px-6 py-10 sm:px-12 sm:py-12 lg:w-[50%] lg:max-w-[615.5px] lg:border-b-0 lg:border-r lg:pr-[49px]">
              <h2 className="font-['Manrope',sans-serif] text-3xl font-semibold leading-10 tracking-[-0.32px] text-[#005344] sm:text-[32px]">
                Secure Enrollment
              </h2>
              
              <div className="mt-6 w-full rounded-[20px] border border-[#f1f5f9] bg-white p-8 text-center shadow-[0px_8px_32px_rgba(0,0,0,0.04)]">
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
                  <span className="text-[24px] font-bold leading-tight">Pay Now - ₹4,999</span>
                  <span className="text-[15px] font-medium text-white/70 line-through">₹25,000</span>
                </button>

                {/* Secure text */}
                <p className="mt-5 text-[13px] text-[#9ca3af]">
                  Secure payment processed via encrypted gateway.
                </p>
              </div>

              <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-6 px-2">
                <div className="flex flex-col items-center gap-2">
                  <IconWrap src={trustSecure} className="h-5 w-4" />
                  <span className="text-center text-[10px] font-semibold uppercase leading-[15px] tracking-[1px] text-[#3e4945]">
                    SECURE PAYMENT
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IconWrap src={trustMoney} className="h-5 w-4" />
                  <span className="text-center text-[10px] font-semibold uppercase leading-[15px] tracking-[1px] text-[#3e4945]">
                    MONEY-BACK GUARANTEE
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IconWrap src={trustPrivacy} className="h-[21px] w-4" />
                  <span className="text-center text-[10px] font-semibold uppercase leading-[15px] tracking-[1px] text-[#3e4945]">
                    PRIVACY ENCRYPTED
                  </span>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="flex w-full flex-col gap-4 p-6 sm:p-12 lg:flex-1 lg:max-w-[614.5px]">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#f0fdf4] px-4 py-2">
                <IconWrap src={paymentVerifiedIcon} className="size-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.35px] text-[#16a34a]">
                  PAYMENT VERIFIED SUCCESSFULLY
                </span>
              </div>
              <h2 className="pt-4 font-['Manrope',sans-serif] text-3xl font-semibold leading-10 tracking-[-0.32px] text-[#005344] sm:text-[32px]">
                Finalize Your Profile
              </h2>
              <p className="text-base font-normal leading-6 text-[#3e4945]">
                Confirm your details to receive your 90-day reversal kit and access the portal.
              </p>

              <form
                className="flex flex-col gap-6 pt-4"
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold leading-5 text-[#151c27]">Full Name</span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-solid border-[#bec9c4] bg-white px-[21px] py-[19px] text-base text-[#151c27] outline-none placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#003d9b]/25"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold leading-5 text-[#151c27]">Mobile Number</span>
                  <div className="flex w-full overflow-hidden rounded-xl border border-solid border-[#bec9c4] bg-white">
                    <span className="flex shrink-0 items-center border-r border-[#bec9c4] bg-[#f9fafb] px-4 py-[19px] text-base text-[#3e4945]">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="00000 00000"
                      className="min-w-0 flex-1 px-[21px] py-[19px] text-base text-[#151c27] outline-none placeholder:text-[#6b7280] focus:ring-2 focus:ring-inset focus:ring-[#003d9b]/25"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold leading-5 text-[#151c27]">Email Address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full rounded-xl border border-solid border-[#bec9c4] bg-white px-[21px] py-[19px] text-base text-[#151c27] outline-none placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#003d9b]/25"
                  />
                </label>
                <button
                  type="button"
                  onClick={handlePayment}
                  className="relative w-full overflow-hidden rounded-xl bg-[#003d9b] py-5 text-lg font-semibold leading-7 text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] hover:bg-[#002f7a] transition-colors"
                >
                  Complete Enrollment
                </button>
                <p className="text-center text-[11px] font-normal italic leading-[16.5px] text-[#3e4945]">
                  By continuing, you agree to our Medical Disclaimer and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Next steps */}
        <section className="mb-20 flex flex-col gap-12 rounded-[32px] bg-[#f0f3ff] p-8 sm:p-16">
          <h2 className="text-center font-['Manrope',sans-serif] text-3xl font-semibold leading-10 tracking-[-0.32px] text-[#003d9b] sm:text-[32px]">
            What happens after you enroll?
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-[88px] items-start justify-center pb-6">
                <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <div className="relative h-5 w-[25px]">
                    <img alt="" src={nextEmailIcon} className="absolute inset-0 size-full object-contain" />
                  </div>
                </div>
              </div>
              <h4 className="pb-2 text-lg font-semibold leading-7 text-[#151c27]">Confirmation Email</h4>
              <p className="max-w-[293px] text-sm font-normal leading-5 text-[#3e4945]">
                Instant access to your digital dashboard and receipt via your registered email.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-[88px] items-start justify-center pb-6">
                <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <div className="relative h-5 w-[27.5px]">
                    <img alt="" src={nextTruckIcon} className="absolute inset-0 size-full object-contain" />
                  </div>
                </div>
              </div>
              <h4 className="pb-2 text-lg font-semibold leading-7 text-[#151c27]">Diet Chart Delivery</h4>
              <p className="max-w-[330px] text-sm font-normal leading-5 text-[#3e4945]">
                Your personalized 90-day metabolic nutrition plan will be generated within 24 hours.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-[88px] items-start justify-center pb-6">
                <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <div className="relative h-[15px] w-[30px]">
                    <img alt="" src={nextUsersIcon} className="absolute inset-0 size-full object-contain" />
                  </div>
                </div>
              </div>
              <h4 className="pb-2 text-lg font-semibold leading-7 text-[#151c27]">Expert Onboarding</h4>
              <p className="max-w-[278px] text-sm font-normal leading-5 text-[#3e4945]">
                A dedicated reversal coach will call you to schedule your initial consultation.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
