import { motion } from "framer-motion";
import { sectionVariants } from "../animations";
import { generateReport } from "../api/report";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const res = await generateReport({
                user: "test",
            });

            navigate(`/report?id=${res.id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <motion.section
            id="top"
            className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto"
            variants={sectionVariants}
        >
            <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* LEFT SIDE */}
                <div className="fade-up">
                    <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        CLINICALLY VALIDATED
                    </div>

                    <h1 className="text-[40px] sm:text-[44px] font-bold text-[#1f2937] leading-[1.1] mb-5">
                        Know Your Metabolic Risk.{" "}
                        <span className="text-blue-600">
                            Control Diabetes Before It Progresses
                        </span>{" "}
                        Or Start Reversing It Naturally.
                    </h1>

                    <p className="text-gray-500 text-sm max-w-xl mb-7 leading-relaxed">
                        Get a personalized Glynostic Metabolic Intelligence Report that reveals your metabolic age,
                        belly fat risk, hidden insulin resistance signals, and a tailored 30-day reversal blueprint.
                    </p>

                    <ul className="flex flex-col gap-2 mb-7">
                        {[
                            "5-minute assessment",
                            "Personalized report in 24 hours",
                            "Designed to detect risk early and support reversal naturally",
                            "Guided by metabolic science",
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="text-green-500 font-bold">✓</span> {item}
                            </li>
                        ))}
                    </ul>

                    {/* ✅ ONLY CHANGE: onClick added */}
                    <button
                        onClick={handleClick}
                        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg text-sm hover:bg-blue-700 shadow-md cta-pop"
                    >
                        Get Your Report at ₹899
                    </button>
                </div>

                {/* RIGHT SIDE */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover fade-up-delay-1">
                    <img
                        src="/assets/AB6AXuBeTo8NRwE0EVvp8607s_ArwSOTHAhUqKm7YAJLoYzIuTbvpNSb1h1ejkcGKj1t-Mew-eXDmHvNovEAANm0sfVHRqZ8mbQ_YiwftKyI0_9IFk69uYszrGv1QIq7pFsOetKKE4YBdxRvi6-X8CDxPRS-aU-5N2FNOBMJiqIaWCmml2HHs1Bqy4qHuMrY10WehRqFxsmFRWezfg9kmbPL_GPHGJoCuufMLtuiGYMLZyIm.png"
                        alt="Glucose meter"
                        className="rounded-xl w-full h-60 object-cover mb-4"
                    />

                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">METABOLIC SCORE</p>
                            <p className="text-2xl font-bold text-gray-800">82/100</p>
                        </div>
                        <span className="text-green-500 text-sm font-semibold">
                            +4.2 pts ↗
                        </span>
                    </div>
                </div>

            </div>
        </motion.section>
    );
}