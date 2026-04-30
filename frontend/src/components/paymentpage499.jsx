import { useEffect, useState } from 'react'
import axios from 'axios'
import { ASSETS } from '../../public/assets/figmaAssets'
import { useAuth } from '../context/AuthContext'
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
  'https://www.figma.com/api/mcp/asset/f9d86229-56d5-4973-99ff-dfa8f45bb7c5'
const imgDetailsIcon =
  'https://www.figma.com/api/mcp/asset/413979f9-1e99-41f6-bff7-48d541a53d9e'
const imgDeliveryIcon =
  'https://www.figma.com/api/mcp/asset/3fd783dd-fcf0-48aa-9b99-23e8dcb63493'
const imgSecureIcon =
  'https://www.figma.com/api/mcp/asset/97139a8a-8d58-4857-9ec0-257e009a4ad9'
const imgUpiIcon =
  'https://www.figma.com/api/mcp/asset/dc09521c-9c3b-4b81-a958-bb38d73d0137'
const imgCardIcon =
  'https://www.figma.com/api/mcp/asset/adbb0605-008b-42db-a329-3cd0e94688f8'
const imgArrowIcon =
  'https://www.figma.com/api/mcp/asset/8027da2f-bddb-404a-bcd7-e6805c662aa0'
const imgTrustSecure =
  'https://www.figma.com/api/mcp/asset/423315c7-9b37-428b-8919-7ffdc62c5874'
const imgTrustClinical =
  'https://www.figma.com/api/mcp/asset/d7700897-4792-4c16-b015-6e51ed96d71a'
const imgTrustRefund =
  'https://www.figma.com/api/mcp/asset/a8b2822e-2519-431f-9696-07d5ee3232d9'

const listItems = [
  'AI-powered analysis of 25+ factors',
  'Metabolic Age & Risk Score',
  'Root cause insights',
  'Personalized recommendations',
  'Action plan to reduce risk',
]

const postPaymentItems = [
  'Instant access to our Metabolic Questionnaire dashboard.',
  'Complete your health profile (takes 5-8 mins).',
  'Receive your clinical PDF report via Email & WhatsApp.',
]

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function PaymentPage499() {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    const res = await loadRazorpayScript()

    if (!res) {
      alert('Razorpay SDK failed to load. Are you offline?')
      setIsProcessing(false)
      return
    }

    try {
      const response = await axios.post('http://localhost:5000/api/payment/create-order')
      const { id, amount, currency } = response.data

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummy_key',
        amount: amount,
        currency: currency,
        name: 'Glynostic',
        description: 'Metabolic Risk Assessment',
        order_id: id,
        handler: function (response) {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id)
        },
        prefill: {
          name: user?.name || 'Customer Name',
          email: user?.email || 'customer@example.com',
        },
        theme: {
          color: '#003d9b',
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (err) {
      alert('Could not start payment. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      navigate('/')
    }
  }, [user, loading, navigate])

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
              <img src={imgMedicalDashboard} alt="" className="h-full w-full object-cover" />
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

          <aside className="lg:col-span-5">
            <div className="rounded-xl border border-[rgba(190,201,196,0.2)] bg-white p-4 shadow-[0px_4px_16px_rgba(0,0,0,0.04)] sm:p-6 lg:p-[33px]">
              <div className="flex items-center justify-between border-b border-[rgba(190,201,196,0.3)] pb-[17px]">
                <h3 className="text-xl font-semibold leading-7 text-[#151c27] sm:text-[27px]">Amount Payable</h3>
                <span className="text-[30px] font-semibold leading-8 text-[#003d9b] sm:text-[36px]">₹499</span>
              </div>


              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#003d9b] py-4 text-base font-semibold leading-6 text-white shadow-[0px_10px_15px_-3px_rgba(0,83,68,0.2),0px_4px_6px_-4px_rgba(0,83,68,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Starting Payment...' : 'Pay ₹499 Securely'}
                <img src={imgArrowIcon} alt="" className="size-[13px]" />
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 opacity-60">
                <span className="text-[10px] font-semibold uppercase tracking-[1px] text-[#57605f]">
                  POWERED BY
                </span>
                <img src={imgRazorpay} alt="Razorpay" className="size-4 object-cover" />
              </div>
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
                WhatsApp Us
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
            <div className="mt-3 flex gap-4 text-sm text-[#64748b] sm:gap-6 lg:justify-end">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
