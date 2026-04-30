/** Figma MCP — node 253:4567 (refresh via get_design_context if URLs expire) */

const decorativeIcon = 'https://www.figma.com/api/mcp/asset/57ff94e2-84ed-4e06-a4b7-95045213fa53'

export default function DonePage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#003d9b] px-8 font-['Inter',sans-serif] antialiased">
      <div className="flex w-full max-w-[1280px] flex-col items-center text-center">
        {/* 253:4554 — 96px frosted ring, 40px icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex size-24 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-[2px]">
            <div className="relative size-10 shrink-0">
              <img
                alt=""
                src={decorativeIcon}
                className="absolute inset-0 size-full max-w-none object-contain"
              />
            </div>
          </div>
        </div>

        {/* 253:4558 — heading margin pb 8 */}
        <div className="pb-2">
          <h1 className="font-['Manrope',sans-serif] text-[40px] font-bold leading-[48px] tracking-[-1.2px] text-white sm:text-[48px] sm:leading-[56px]">
            You are all done
          </h1>
        </div>

        <p className="max-w-[361px] text-lg font-normal leading-7 text-[rgba(255,255,255,0.8)]">
          Thank you for completing the assessment.
        </p>

        {/* 253:4562 — pt 32 before button */}
        <div className="pt-8">
          <a
            href="/"
            className="inline-flex rounded-full border border-solid border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] px-[33px] py-[13px] text-xs font-semibold uppercase leading-4 tracking-[0.6px] text-white transition-colors hover:bg-[rgba(255,255,255,0.15)]"
          >
            Return to dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
