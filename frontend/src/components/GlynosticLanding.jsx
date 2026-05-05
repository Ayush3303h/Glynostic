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
              <a
                className="gl-btn-gl gl-btn-gl--hero-gr"
                href="#assessment"
                onClick={(e) => handleCtaClick(e, 'assessment')}
              >
                <span>Start Your Metabolic Risk Assessment</span>
                <strong>₹499</strong>
                <Img src={ASSETS.heroCtaArrow} alt="" width={16} height={16} />
              </a>
            </div>

            <div className="gl-hero-col gl-hero-col--visual">
              <div className="gl-hero-top-chip gl-hero-top-chip--insulin">
                <p className="gl-hero-top-chip__kicker">Insulin Resistance</p>
                <p className="gl-hero-top-chip__value">High</p>
                <p className="gl-hero-top-chip__sub">Needs Attention</p>
              </div>
              <div className="gl-hero-top-chip gl-hero-top-chip--age">
                <p className="gl-hero-top-chip__kicker">Metabolic Age</p>
                <p className="gl-hero-top-chip__value gl-hero-top-chip__value--orange">42</p>
                <p className="gl-hero-top-chip__sub">(Actual: 31)</p>
              </div>
              <div className="gl-hero-vis__accent-slot" aria-hidden>
                <div className="gl-hero-vis__accent" />
              </div>
              <div className="gl-hero-vis__photo">
                <Img
                  src={ASSETS.professionalHealthyMan}
                  alt="Healthcare professional"
                  className="gl-hero-vis__photo-img"
                  width={520}
                  height={480}
                />
              </div>
              <div className="gl-hero-vis__floater gl-hero-vis__floater--panel">
                <div className="gl-hero-vis__score-badge">
                  <Img src={ASSETS.scoreRingVector} alt="" className="gl-hero-vis__score-ring-img" width={44} height={44} />
                  <div className="gl-hero-vis__score-ring-inner">
                    <span className="gl-hero-vis__score-num">72</span>
                    <span className="gl-hero-vis__score-word">good</span>
                  </div>
                </div>
                <span className="gl-hero-vis__floater-caption">Metabolic Score</span>
                <div className="gl-hero-vis__mini-rows">
                  <div className="gl-hero-vis__mini-row">
                    <Img src={ASSETS.metabolicCardCheck} alt="" width={12} height={12} />
                    <span>Root Cause Analysis</span>
                  </div>
                  <div className="gl-hero-vis__mini-row">
                    <Img src={ASSETS.metabolicCardCheck} alt="" width={12} height={12} />
                    <span>Personalized Plan</span>
                  </div>
                  <div className="gl-hero-vis__mini-row">
                    <Img src={ASSETS.metabolicCardCheck} alt="" width={12} height={12} />
                    <span>Action Roadmap</span>
                  </div>
                </div>
              </div>
              <div className="gl-hero-vis__risk-stack">
                <div className="gl-hero-pill-chip">
                  <span className="gl-hero-pill-chip__dot gl-hero-pill-chip__dot--amber" aria-hidden />
                  <span>Diabetes Risk: Moderate</span>
                </div>
                <div className="gl-hero-pill-chip">
                  <span className="gl-hero-pill-chip__dot gl-hero-pill-chip__dot--green" aria-hidden />
                  <span>Fatty Liver Risk: Low</span>
                </div>
              </div>
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
                [ASSETS.trustClinical, 'CLINICAL EXCELLENCE'],
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
              <p className="gl-cta-fin__label">Metabolic Risk Assessment</p>
              <div className="gl-cta-fin__price-row">
                <strong>₹499</strong>
                <del>₹3000</del>
              </div>
              <a
                className="gl-btn-gl gl-btn-gl--fill-navy-lg"
                href="#assessment"
                onClick={(e) => handleCtaClick(e, 'assessment')}
              >
                Start Assessment Now
                <Img src={ASSETS.ctaArrow} alt="" width={19} height={9} />
              </a>
              <div className="gl-cta-fin__footnote">
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
              © 2024 Glynostic Metabolic Systems. All rights reserved. Precision health through clinical data.
            </p>
          </div>
          <nav className="gl-footer-site__links" aria-label="Footer links">
            {[
              ['Privacy Policy', 'privacy-policy'],
              ['Terms of Service', 'terms'],
              ['Clinical Standards', 'clinical-standards'],
              ['Contact Support', 'contact'],
              ['Affiliates', 'affiliates'],
            ].map(([label, slug]) => (
              <a key={slug} href={`#${slug}`}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
