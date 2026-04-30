import { useMemo, useState } from 'react'

/** Figma MCP — refresh via get_design_context if URLs expire */
const logo = 'https://www.figma.com/api/mcp/asset/33b53192-99d5-4b16-9d68-0a04a8f3482f'
const accountIcon = 'https://www.figma.com/api/mcp/asset/85dd3131-a37c-4f27-8d0b-de4e6d5605e6'

const stepDone = 'https://www.figma.com/api/mcp/asset/7d61e838-6eca-43b0-8294-7d3b7fba75b7'
const historyIcon = 'https://www.figma.com/api/mcp/asset/ac0a644d-34e1-42b4-a5e6-b361bc8b1a03'
const lifestyleIcon = 'https://www.figma.com/api/mcp/asset/208ca90f-bdd0-45f3-820d-c939f21a793d'
const biometricsIcon = 'https://www.figma.com/api/mcp/asset/97e1fe90-5a17-451d-b7d4-b43ff1263405'
const summaryIcon = 'https://www.figma.com/api/mcp/asset/c0ded46c-addc-4403-84ff-ae9d63a1eb3e'
const completeBadge = 'https://www.figma.com/api/mcp/asset/5be220b2-de61-4eba-b5a9-d4d55a3d40e3'

const coreMeasurementsIcon = 'https://www.figma.com/api/mcp/asset/1b1711cf-cfb9-4473-bbe3-e24646756e1e'
const infoIcon = 'https://www.figma.com/api/mcp/asset/aa3b5105-805d-498a-b702-a82910cea76a'
const gaugeDecor = 'https://www.figma.com/api/mcp/asset/05c183d8-a777-4b1a-b0f2-98debf5ef2fc'
const gaugeCalcIcon = 'https://www.figma.com/api/mcp/asset/3a67b2fc-63d7-4947-9d8c-e42aa372717e'
const gaugeRingSvg = 'https://www.figma.com/api/mcp/asset/448abb1e-8156-461c-9feb-5a805441a105'
const continueArrow = 'https://www.figma.com/api/mcp/asset/b919a3f3-5854-4fc9-ad34-0a79607a8f2a'

/** Matches design BMI when only weight is known (72.4 kg @ 173 cm ≈ 24.2). */
const DEFAULT_HEIGHT_CM = 173

function IconWrap({ src, className, alt = '' }) {
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden ${className}`}>
      <img alt={alt} src={src} className="absolute inset-0 size-full max-w-none object-contain" />
    </span>
  )
}

function bmiCategoryLabel(bmi) {
  if (bmi === null || Number.isNaN(bmi))
    return { pill: '—', lines: ['Enter your weight to preview your BMI.'] }
  if (bmi < 18.5)
    return {
      pill: 'Underweight',
      lines: ['Your body mass index is below the commonly used healthy range.'],
    }
  if (bmi < 25)
    return {
      pill: 'Normal',
      lines: ['Your body mass index is', 'within the healthy range.'],
    }
  if (bmi < 30)
    return {
      pill: 'Overweight',
      lines: ['Your body mass index is above the commonly used healthy range.'],
    }
  return {
    pill: 'Obese',
    lines: ['Your body mass index suggests a higher BMI category.'],
  }
}

/** Figma static bar uses ~45% fill (inset 0 55% 0 0). Map live BMI to track width. */
function bmiGaugePercent(bmi) {
  if (bmi === null || Number.isNaN(bmi)) return 45
  const pct = ((bmi - 15) / (40 - 15)) * 100
  return Math.min(100, Math.max(0, pct))
}

export default function PatientBiometricsPage() {
  const [weight, setWeight] = useState('')
  const [waist, setWaist] = useState('')

  const bmi = useMemo(() => {
    const w = parseFloat(String(weight).replace(',', '.'))
    if (Number.isNaN(w) || w <= 0) return null
    const hm = DEFAULT_HEIGHT_CM / 100
    const v = w / (hm * hm)
    return Math.round(v * 10) / 10
  }, [weight])

  const gaugePercent = useMemo(() => bmiGaugePercent(bmi), [bmi])
  const category = useMemo(() => bmiCategoryLabel(bmi), [bmi])

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
            <IconWrap src={accountIcon} className="size-5" />
            <button
              type="button"
              className="rounded-full bg-[#003d9b] px-6 py-2 text-center text-sm font-semibold leading-5 text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Figma frame: main column max ~1000px for cards grid; sidebar uses remaining width */}
      <main className="mx-auto w-full max-w-[1280px] px-4 pb-12 pt-14 sm:px-8 lg:px-[83px] lg:pt-[56px]">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1000px)_minmax(260px,1fr)] xl:items-start xl:gap-8">
          <div className="flex min-w-0 flex-col gap-8">
            {/* Header — gap 4px between title lines (251:2011) */}
            <div className="flex flex-col gap-1">
              <h1 className="font-['Manrope',sans-serif] text-[32px] font-semibold leading-10 tracking-[-0.32px] text-[#151c27]">
                Biometrics
              </h1>
              <p className="max-w-[672px] text-base font-normal leading-6 text-[#57605f]">
                These measurements help us calculate your metabolic risk factors.
              </p>
            </div>

            {/*
              Figma 251:2016: 12-column grid inside 1000px content, gap 24px, row min-height 603px.
              Sections 251:2018 & 251:2064 both use size-full — equal-height cards flush to gutter.
            */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 xl:min-h-[603px] xl:gap-6 xl:items-stretch">
              {/* Core — spans 7/12 */}
              <section className="relative flex min-h-[603px] h-full flex-col rounded-[12px] border border-solid border-[#f3f4f6] bg-white p-[33px] shadow-[0px_32px_64px_-12px_rgba(0,0,0,0.04)] xl:col-span-7">
                <div className="flex flex-shrink-0 flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <IconWrap src={coreMeasurementsIcon} className="size-[18px]" />
                    <h2 className="font-['Manrope',sans-serif] text-2xl font-semibold leading-8 text-[#151c27]">
                      Core Measurements
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#3e4945]">
                        Weight (kg)
                      </span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="00.0"
                        className="h-12 w-full rounded-[12px] border-0 bg-[rgba(150,235,213,0.37)] px-4 text-base font-normal leading-normal text-[#151c27] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#3e4945]">
                        Waist Circumference (cm)
                      </span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder="00"
                        className="h-12 w-full rounded-[12px] border-0 bg-[rgba(150,235,213,0.49)] px-4 text-base font-normal leading-normal text-[#151c27] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30"
                      />
                    </label>
                  </div>

                  <div className="flex gap-4 rounded-lg border border-solid border-[#003d9b] bg-[rgba(150,235,213,0.33)] p-[17px]">
                    <IconWrap src={infoIcon} className="mt-0.5 h-6 w-5 shrink-0" />
                    <div className="min-w-0 text-sm font-normal leading-[22.75px] text-[#3e4945]">
                      <p className="mb-0">Accurate measurements are crucial for metabolic assessment.</p>
                      <p className="mb-0">Please use a calibrated scale and measure your waist at the</p>
                      <p className="mb-0">narrowest point.</p>
                    </div>
                  </div>
                </div>
                {/* Consume remaining card height below info block — matches Figma size-full stacking */}
                <div className="flex-1 min-h-0" aria-hidden />
              </section>

              {/* BMI — spans 5/12; ≈407px column width inside 976px usable (1000 − gaps) */}
              <section className="relative flex min-h-[603px] h-full xl:col-span-5">
                <div className="relative flex h-full min-h-[603px] w-full flex-col justify-between overflow-hidden rounded-[12px] bg-[#003d9b] p-8 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
                  <div className="pointer-events-none absolute -right-[49.65px] -top-[50px] h-[133.333px] w-[166.667px] opacity-90">
                    <IconWrap src={gaugeDecor} className="h-full w-full" />
                  </div>

                  <div className="relative z-[1] flex w-full flex-col gap-8">
                    <div className="flex w-full items-center justify-between">
                      <h2 className="font-['Manrope',sans-serif] text-2xl font-semibold leading-8 text-[#96ebd5]">
                        BMI Calculator
                      </h2>
                      <IconWrap src={gaugeCalcIcon} className="size-[18px]" />
                    </div>

                    <div className="relative z-[1] flex w-full flex-col items-center py-10">
                      <div className="relative isolate size-[192px] shrink-0">
                        <IconWrap src={gaugeRingSvg} className="relative z-[2] size-[192px]" />
                        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center">
                          <span className="font-['Manrope',sans-serif] text-[48px] font-bold leading-[48px] tracking-[-0.96px] text-white">
                            {bmi !== null ? bmi.toFixed(1) : '—'}
                          </span>
                          <div className="pt-2">
                            <span className="text-xs font-semibold uppercase leading-4 tracking-[0.6px] text-white opacity-80">
                              kg/m²
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-[1] flex w-full flex-col items-center pt-8">
                        <div className="flex max-w-[200px] flex-col items-center gap-2 px-[18.51px] text-center">
                          <div className="flex items-start justify-center rounded-full bg-[rgba(150,235,213,0.2)] px-6 py-2">
                            <span className="font-['Manrope',sans-serif] text-2xl font-semibold leading-8 text-[#96ebd5]">
                              {category.pill}
                            </span>
                          </div>
                          <div className="text-sm font-normal leading-5 text-[rgba(150,235,213,0.8)]">
                            {category.lines.length === 1 ? (
                              <p className="mb-0">{category.lines[0]}</p>
                            ) : (
                              category.lines.map((line, i) => (
                                <p key={i} className="mb-0">
                                  {line}
                                </p>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 251:2089 Margin pt-[32px] — border hugs bottom via justify-between */}
                  <div className="relative z-[1] w-full shrink-0 pt-8">
                    <div className="border-t border-solid border-[rgba(255,255,255,0.1)] pt-[17px]">
                      <div className="flex flex-col gap-1 opacity-80">
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-semibold uppercase leading-4 tracking-[0.6px] text-white">
                            Underweight
                          </span>
                          <span className="text-xs font-semibold uppercase leading-4 tracking-[0.6px] text-white">
                            Overweight
                          </span>
                        </div>
                        <div className="h-[6px] w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.2)]">
                          <div
                            className="h-[6px] rounded-full bg-white transition-[width] duration-300"
                            style={{ width: `${gaugePercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Actions: Figma — spacer + right-aligned cluster */}
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="hidden min-w-0 flex-1 sm:block" aria-hidden />
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <button
                  type="button"
                  className="flex h-14 w-full shrink-0 items-center justify-center rounded-full border border-solid border-[#003d9b] px-[33px] text-base font-semibold leading-6 text-[#003d9b] sm:w-[164px]"
                >
                  Save Progress
                </button>
                <button
                  type="button"
                  className="relative flex h-14 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#003d9b] px-12 text-base font-semibold leading-6 text-white shadow-[0px_10px_15px_-3px_rgba(0,83,68,0.2),0px_4px_6px_-4px_rgba(0,83,68,0.2)] sm:w-auto sm:min-w-[174px]"
                >
                  Continue
                  <IconWrap src={continueArrow} className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 251:1783 — aside width fills second column */}
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
                <div className="flex items-center gap-4 border-r-4 border-solid border-[#96ebd5] bg-[#e6f0ee] py-4 pl-6 pr-7">
                  <span className="w-[17px] text-center font-['Manrope',sans-serif] text-sm font-bold leading-5 text-[#003d9b]">
                    04
                  </span>
                  <span className="flex-1 text-base font-semibold leading-6 text-[#003d9b]">Biometrics</span>
                  <IconWrap src={biometricsIcon} className="h-[9.33px] w-[11.67px]" />
                </div>
                <div className="flex items-center gap-4 px-6 py-4">
                  <span className="w-[17px] text-sm font-normal leading-5 text-[#94a3b8]">05</span>
                  <span className="flex-1 text-base font-medium leading-6 text-[#94a3b8]">Summary</span>
                  <IconWrap src={summaryIcon} className="h-[11.67px] w-[10.5px]" />
                </div>
              </nav>
              <div className="flex items-center justify-between bg-[#f8fafc] p-6">
                <span className="text-xs font-bold uppercase leading-4 tracking-[1.2px] text-[#64748b]">
                  85 COMPLETE
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
