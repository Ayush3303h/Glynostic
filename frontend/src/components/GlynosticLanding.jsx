import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GlynosticLanding.css'
import { ASSETS } from '../../public/assets/figmaAssets'
import { useAuth } from '../context/AuthContext'
import Login from './Login'
import UserProfilePanel from './UserProfilePanel'

function Img({ src, alt = '', className, width, height }) {
  return <img src={src} alt={alt} className={className} width={width} height={height} loading="lazy" />
}

export default function GlynosticLanding() {
  const { user, logout, login } = useAuth()
  const navigate = useNavigate()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

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

  const PENDING_ANCHOR_KEY = 'gl_pending_anchor'

  const scrollToAnchor = (anchorId) => {
    const el = document.getElementById(anchorId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const triggerGoogleLogin = () => {
    login()
  }

  const handleCtaClick = (e, anchorId) => {
    e.preventDefault()
    if (user) {
      if (anchorId === 'assessment' || anchorId === 'program') {
        navigate('/patient-info')
      } else if (anchorId === 'nintydayspage') {
        navigate('/nintydayspage')
      } else {
        scrollToAnchor(anchorId)
      }
      return
    }

    localStorage.setItem(PENDING_ANCHOR_KEY, anchorId)
    triggerGoogleLogin()
  }

  const handleGetStartedClick = (e) => {
    e.preventDefault()
    if (user) {
      localStorage.removeItem(PENDING_ANCHOR_KEY)
      logout()
      return
    }

    triggerGoogleLogin()
  }

  useEffect(() => {
    const pending = localStorage.getItem(PENDING_ANCHOR_KEY)
    if (!user || !pending) return
    localStorage.removeItem(PENDING_ANCHOR_KEY)
    setShowLoginPrompt(false)
    if (pending === 'nav-assessment') {
      scrollToAnchor('assessment')
    } else if (pending === 'assessment' || pending === 'program') {
      navigate('/patient-info')
    } else {
      scrollToAnchor(pending)
    }
  }, [user, navigate])

  return (
    <div className="gl-root">
      {/* Clerk handles its own modal via openSignIn() */}
      <header className="gl-header-bar">
        <div className="gl-header-bar__shell">
          <a className="gl-logo-lockup" href="#top" aria-label="Glynostic home">
            <Img src={ASSETS.navbarLogo} alt="Glynostic" className="gl-logo-lockup__mark" width={236} height={64} />
          </a>
          <div className="gl-header-bar__actions">
            {user ? (
              <img
                src={user.picture}
                alt="user profile"
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                width={32}
                height={32}
              />
            ) : (
              <Img src={ASSETS.headerBell} alt="" className="gl-header-bar__bell" />
            )}
            <a
              className="gl-btn-gl gl-btn-gl--pill gl-btn-gl--navy-sm"
              href="#assessment"
              onClick={handleGetStartedClick}
            >
              {user ? 'Logout' : 'Get Started'}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="gl-hero-section">
          <div className="gl-hero-shell gl-hero-section__wrap">
            <div className="gl-hero-col gl-hero-col--copy">
              <div className="gl-hero-badge">
                <Img src={ASSETS.heroBadgeIcon} alt="" className="gl-hero-badge__ico" width={13} height={12} />
                <span>India&apos;s Most Advanced Metabolic Risk Assessment</span>
              </div>
              <h1 className="gl-hero-h1">
                <span className="gl-hero-h1__line">Detect. Reverse. Transform.</span>
                <span className="gl-hero-h1__line">
                  Your <strong>Metabolism</strong>,{' '}
                </span>
                <span className="gl-hero-h1__accent">Before Disease Happens.</span>
              </h1>
              <p className="gl-hero-lead">
                AI-driven analysis of 25+ factors to identify hidden metabolic dysfunctions before they turn
                into chronic conditions.
              </p>
              <ul className="gl-hero-matrix">
                <li>
                  <Img src={ASSETS.featAi} alt="" width={18} height={18} />
                  <span>AI-Powered Precision Analysis</span>
                </li>
                <li>
                  <Img src={ASSETS.featRisk} alt="" width={14} height={19} />
                  <span>25+ Metabolic Risk Factors</span>
                </li>
                <li>
                  <Img src={ASSETS.featData} alt="" width={20} height={18} />
                  <span>Data-Driven Personalisation</span>
                </li>
                <li>
                  <Img src={ASSETS.featSupport} alt="" width={20} height={18} />
                  <span>24x7 Expert Support</span>
                </li>
              </ul>
              <div className="mt-6 w-full max-w-[360px] rounded-[16px] border border-[#f1f5f9] bg-white p-5 text-center shadow-[0px_8px_32px_rgba(0,0,0,0.12)]">
                {/* Offer Ends section */}
                <div className="flex items-center justify-center gap-1.5 text-[#2f4d8a]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="text-[13px] font-medium tracking-wide uppercase flex items-center">
                    Offer ends in 
                    <span className="ml-1.5 rounded-md bg-[#eff6ff] px-1.5 py-0.5 text-[15px] font-bold text-[#1d4ed8] shadow-sm border border-[#dbeafe]">
                      {formatTime(timeLeft)}
                    </span>
                  </span>
                </div>

                {/* SAVE 80% text */}
                <h3 className="mt-3 text-[20px] font-bold text-[#203f9e]">
                  SAVE 80%
                </h3>

                {/* The original button */}
                <div className="mt-4 flex justify-center w-full">
                  <a
                    className="gl-btn-gl gl-btn-gl--hero-gr"
                    href="#assessment"
                    onClick={(e) => handleCtaClick(e, 'assessment')}
                    style={{ width: '100%', justifyContent: 'center', margin: 0, gap: '10px' }}
                  >
                    <span>Start Your Metabolic Risk Assessment</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <del style={{ opacity: 0.7, fontSize: '15px' }}>₹2100</del>
                      <strong>₹499</strong>
                    </div>
                    <Img src={ASSETS.heroCtaArrow} alt="" width={16} height={16} />
                  </a>
                </div>

                {/* Secure text */}
                <p className="mt-3 text-[11px] text-[#9ca3af]">
                  Secure payment processed via encrypted gateway.
                </p>
              </div>
            </div>

            <div className="gl-hero-col gl-hero-col--visual">
              <Img
                src="/assets/post .png"
                alt="Glynostic Hero"
                className="gl-hero-vis__review-card"
                width={520}
                height={480}
              />
            </div>
          </div>
        </section>

        {/* 3-step journey */}
        <section className="gl-slice gl-slice--white gl-journey">
          <div className="gl-inner gl-inner--journey">
            <h2 className="gl-h2-gl gl-h2-gl--center">
              Your 3-Step Journey to <span className="gl-text-brand">Metabolic Freedom</span>
            </h2>
            <div className="gl-journey-grid">
              <article className="gl-journey-card gl-journey-card--interactive">
                <p className="gl-journey-card__step">STEP 1</p>
                <h3 className="gl-journey-card__title-lg">
                  METABOLIC RISK
                  <br />
                  DETECTOR
                </h3>
                <p className="gl-journey-card__lead">
                  <span className="gl-fw-reg">
                    Our AI analyzes 25+ parameters including lifestyle, symptoms, biometrics &amp; clinical
                    markers to uncover hidden risks.
                  </span>
                </p>
                <ul className="gl-journey-card__checks">
                  <li>
                    <Img src={ASSETS.stepBullet} alt="" width={23} height={17} />
                    Metabolic Risk Score
                  </li>
                  <li>
                    <Img src={ASSETS.stepBullet} alt="" width={23} height={17} />
                    Metabolic Age
                  </li>
                </ul>
                <a
                  className="gl-btn-gl gl-btn-gl--fill-navy lg-block"
                  href="#assessment"
                  onClick={(e) => handleCtaClick(e, 'assessment')}
                >
                  <span>Start Now</span>
                  <strong>₹499</strong>
                </a>
              </article>

              <article className="gl-journey-card gl-journey-card--interactive">
                <p className="gl-journey-card__step">STEP 2</p>
                <h3 className="gl-journey-card__title-lg">
                  90-DAY METABOLIC
                  <br />
                  REVERSAL
                </h3>
                <p className="gl-journey-card__lead">
                  <span className="gl-fw-reg">
                    A complete 90-day guided program to reverse your condition with personalised diet,
                    lifestyle, expert coaching &amp; continuous support.
                  </span>
                </p>
                <ul className="gl-journey-card__checks">
                  <li>
                    <Img src={ASSETS.stepBullet} alt="" width={23} height={17} />
                    Precision Diet Plan
                  </li>
                  <li>
                    <Img src={ASSETS.stepBullet} alt="" width={23} height={17} />
                    Lifestyle Reset Guide
                  </li>
                </ul>
                <a
                  className="gl-btn-gl gl-btn-gl--fill-navy lg-block"
                  href="nintydayspage"
                  onClick={(e) => handleCtaClick(e, 'nintydayspage')}
                >
                  <span>Join Program</span>
                  <strong>₹4999</strong>
                </a>
              </article>

              <article className="gl-journey-card gl-journey-card--interactive">
                <p className="gl-journey-card__step">STEP 3</p>
                <h3 className="gl-journey-card__title-lg">
                  TARGETED
                  <br />
                  SUPPLEMENTS
                </h3>
                <div className="gl-journey-card__lead multi">
                  <p>
                    <span className="gl-fw-bold-caps">(ONLY IF NEEDED)</span>{' '}
                    <span className="gl-fw-reg">Precision-formulated</span>
                  </p>
                  <p className="gl-fw-reg">clinical supplements for specific deficiencies.</p>
                  <p className="gl-fw-reg">Required in only 5% of cases.</p>
                </div>
                <ul className="gl-journey-card__checks gl-journey-card__checks--dense">
                  <li>
                    <Img src={ASSETS.stepBullet} alt="" width={23} height={17} />
                    Evidence-Based Formulas
                  </li>
                  <li>
                    <Img src={ASSETS.stepBullet} alt="" width={23} height={17} />
                    Personalized for You
                  </li>
                </ul>
                <a
                  className="gl-btn-gl gl-btn-gl--outline-navy-rounded lg-block mt-auto"
                  href="#assessment"
                  onClick={(e) => handleCtaClick(e, 'assessment')}
                >
                  Only if needed
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Bento */}
        <section className="gl-slice gl-bento-zone">
          <div className="gl-inner">
            <h2 className="gl-h2-gl gl-h2-gl--center">
              Why Glynostic is <span className="gl-text-brand">Different?</span>
            </h2>
            <div className="gl-bento-grid-gl">
              <article className="gl-b-cell gl-b-cell--tall">
                <div className="gl-b-cell__ico-wrap">
                  <Img src={ASSETS.bentoDna} alt="" width={30} height={30} />
                </div>
                <h4 className="gl-b-cell__ttl gl-b-cell__ttl--ebx">Detects Hidden Risks Early</h4>
                <p className="gl-b-cell__txt">
                  Advanced screening that picks up metabolic shifts 5-10 years before clinical symptoms appear.
                </p>
              </article>
              <article className="gl-b-cell gl-b-cell--sm">
                <div className="gl-b-cell__ico-wrap">
                  <Img src={ASSETS.bentoBrain} alt="" width={27} height={27} />
                </div>
                <h4 className="gl-b-cell__ttl gl-b-cell__ttl--inter">Data-Driven</h4>
                <p className="gl-b-cell__txt gl-b-cell__txt--narrow gl-b-cell__txt--12">
                  Every recommendation is backed by your unique biological data points.
                </p>
              </article>
              <article className="gl-b-cell gl-b-cell--grad">
                <div className="gl-b-cell__grad-row">
                  <div className="gl-b-cell__ico-gl">
                    <Img src={ASSETS.bentoRoots} alt="" width={27} height={27} />
                  </div>
                  <div>
                    <h4 className="gl-b-cell__ttl-inv">Root Cause Focused</h4>
                    <p className="gl-b-cell__txt-inv">
                      We don&apos;t treat symptoms. We recalibrate the systemic failures causing them.
                    </p>
                  </div>
                </div>
              </article>
              <article className="gl-b-cell gl-b-cell--wide">
                <div className="gl-b-cell__ico-wrap lg">
                  <Img src={ASSETS.bentoJourney} alt="" width={30} height={30} />
                </div>
                <div>
                  <h4 className="gl-b-cell__ttl">Complete End-to-End</h4>
                  <p className="gl-b-cell__txt">
                    From first assessment to final reversal—we manage your entire metabolic journey with clinical
                    precision.
                  </p>
                </div>
              </article>
              <article className="gl-b-cell gl-b-cell--br">
                <div className="gl-b-cell__ico-ring">
                  <Img src={ASSETS.bentoSystem} alt="" width={27} height={27} />
                </div>
                <h4 className="gl-b-cell__ttl">Treats With System</h4>
                <p className="gl-b-cell__txt">
                  A systemic approach that understands how your hormones, gut, and cells work together.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Report */}
        <section className="gl-slice gl-slice--muted gl-report-gl">
          <div className="gl-inner gl-inner--report gl-report-gl__wrap">
            <div className="gl-report-gl__visual-wrap">
              <div className="gl-report-gl__glow-bg" aria-hidden />
              <div className="gl-report-gl__tilt">
                <div className="gl-report-gl__preview">
                  <Img
                    src="/assets/MockUp.png"
                    alt=""
                    width={600}
                    height={600}
                    className="gl-report-gl__preview-img"
                  />
                </div>
              </div>
              <aside className="gl-report-gl__quote">
                <div className="gl-report-gl__stars" aria-hidden>
                  {[...Array(5)].map((_, idx) => (
                    <Img key={`star-${idx}`} src={ASSETS.starGlyph} alt="" width={12} height={11} />
                  ))}
                </div>
                <p className="gl-report-gl__quote-text">
                  &ldquo;The Glynostic report was a wake-up call. It identified exactly why my energy was low when
                  my usual blood tests said everything was fine.&rdquo;
                </p>
                <div className="gl-report-gl__author">
                  <span className="gl-report-gl__author-avatar" aria-hidden >RM</span>
                  <span>Rahul Mehta</span>
                </div>
              </aside>
            </div>
            <div className="gl-report-gl__copy">
              <h2 className="gl-h2-gl gl-h2-gl--split">
                What&apos;s Inside Your{' '}
                <span className="gl-text-brand blk">Glynostic Report</span>
              </h2>
              <div className="gl-report-rows">
                <div className="gl-report-rows__row">
                  <div className="gl-report-rows__ico-bg">
                    <Img src={ASSETS.reportIcon1} alt="" width={12} height={16} />
                  </div>
                  <div>
                    <h3>Cellular Metabolism Analysis</h3>
                    <p>In-depth look at how your cells produce energy and process glucose.</p>
                  </div>
                </div>
                <div className="gl-report-rows__row">
                  <div className="gl-report-rows__ico-bg">
                    <Img src={ASSETS.reportIcon2} alt="" width={15} height={15} />
                  </div>
                  <div>
                    <h3>Personalized Biomarker Benchmarks</h3>
                    <p>{`Know your optimal ranges, not just the generic 'normal' lab ranges.`}</p>
                  </div>
                </div>
                <div className="gl-report-rows__row">
                  <div className="gl-report-rows__ico-bg">
                    <Img src={ASSETS.reportIcon3} alt="" width={15} height={17} />
                  </div>
                  <div>
                    <h3>Tailored Action Roadmap</h3>
                    <p>Step-by-step instructions on lifestyle, nutrition, and recovery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works — node 187:1060: gap 80px title ↔ steps */}
        <section className="gl-slice gl-slice--white gl-how">
          <div className="gl-inner">
            <div className="gl-how-stack">
              <h2 className="gl-h2-gl gl-h2-gl--center">How It Works</h2>
              <div className="gl-flow-gl">
                <div className="gl-flow-gl__rail" aria-hidden />
                {[
                  {
                    Icon: ASSETS.flowQ,
                    w: 22,
                    h: 20,
                    tit: 'Answer 22 Questions',
                    sub: 'Deep dive into your habits and family history.',
                  },
                  {
                    Icon: ASSETS.flowAi,
                    w: 22,
                    h: 22,
                    tit: 'AI Analyzes',
                    sub: 'Our engine correlates 25+ risk factors.',
                  },
                  {
                    Icon: ASSETS.flowReport,
                    w: 20,
                    h: 25,
                    tit: 'Get Report',
                    sub: 'Receive your metabolic blueprint digitally.',
                  },
                  {
                    Icon: ASSETS.flowProgram,
                    w: 25,
                    h: 25,
                    tit: 'Join Program',
                    sub: 'Begin your 90-day reversal journey.',
                  },
                ].map((step, idx) => (
                  <div key={step.tit} className="gl-flow-gl__step">
                    <div className={idx >= 2 ? 'gl-flow-gl__orb gl-flow-gl__orb--muted' : 'gl-flow-gl__orb'}>
                      <Img src={step.Icon} alt="" width={step.w} height={step.h} />
                    </div>
                    <p className="gl-flow-gl__tit">{step.tit}</p>
                    <p className="gl-flow-gl__sub">{step.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust — node 187:1101 */}
        <div className="gl-trust-banner">
          <div className="gl-inner gl-inner--trust gl-trust-banner__flex">
            <p className="gl-trust-banner__promise">Your Health, Our Promise</p>
            <div className="gl-trust-banner__cols">
              {[
                [ASSETS.trustLock, 'RECOGNISED BY INDIAN GOVERMENT'],
                [ASSETS.trustLab, 'RECOGNISED BY INDIAN MEDICAL COUNCIL'],
                [ASSETS.trustShield, 'HIPAA COMPLIANT'],
              ].map(([src, lbl]) => (
                <div key={lbl} className="gl-trust-banner__item">
                  <Img src={src} alt="" width={20} height={25} />
                  <span>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <section className="gl-slice gl-cta-fin" id="assessment">
          <div className="gl-inner gl-cta-fin__flex">
            <div>
              <h2 className="gl-h2-gl">Take the First Step Today</h2>
              <p className="gl-cta-fin__lead">
                Knowledge today. Freedom tomorrow.
                <br /> Start with your Metabolic Risk Assessment.
              </p>
            </div>
            <div className="gl-cta-fin__panel" id="program">
              <div className="gl-cta-fin__accent-blob" aria-hidden />
              
              {/* Offer Ends section */}
              <div className="flex items-center justify-center gap-1.5 text-[#2f4d8a] mb-2 mt-2 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span className="text-[13px] font-medium tracking-wide uppercase flex items-center">
                  Offer ends in 
                  <span className="ml-1.5 rounded-md bg-[#eff6ff] px-1.5 py-0.5 text-[15px] font-bold text-[#1d4ed8] shadow-sm border border-[#dbeafe]">
                    {formatTime(timeLeft)}
                  </span>
                </span>
              </div>

              {/* SAVE 80% text */}
              <h3 className="mb-4 text-[20px] font-bold text-[#203f9e] text-center relative z-10">
                SAVE 80%
              </h3>

              <p className="gl-cta-fin__label relative z-10">Metabolic Risk Assessment</p>
              <div className="gl-cta-fin__price-row relative z-10">
                <strong>₹499</strong>
                <del>₹2100</del>
              </div>
              <a
                className="gl-btn-gl gl-btn-gl--fill-navy-lg relative z-10"
                href="#assessment"
                onClick={(e) => handleCtaClick(e, 'assessment')}
              >
                Start Assessment Now
                <Img src={ASSETS.ctaArrow} alt="" width={19} height={9} />
              </a>
              <div className="gl-cta-fin__footnote relative z-10">
                <Img src={ASSETS.ctaClock} alt="" width={12} height={12} />
                Takes only 5 mins to complete
              </div>
            </div>
          </div>
        </section>

        <UserProfilePanel />
      </main>

      <footer className="gl-footer-site">
        <div className="gl-inner gl-footer-site__shell">
          <div className="gl-footer-site__brand">
            <p className="gl-footer-site__wordmark">Need Help?</p>
            <p className="gl-footer-site__legal">
              9217596156 | support@glynostic.com
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
            <nav className="gl-footer-site__links" aria-label="Footer links">
              {[
                ['© 2024 Glynostic Healthcare. HIPAA Compliant & SOC2 Type II Certified.'],
              ].map(([label]) => (
                <p key={label} className='gl-footer-site__legal '>{label}</p>
              ))}
            </nav>
            <div className="gl-footer-site__socials" style={{ display: 'flex', gap: '16px' }}>
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
