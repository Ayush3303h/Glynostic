import { motion } from "framer-motion";
import { sectionVariants } from "../animations";
import { SYMPTOMS } from "../data/content";

export default function Symptoms() {
  return (
    <motion.section className="py-14 px-4 sm:px-6 bg-[#eef3f8]" variants={sectionVariants}>
      <div className="max-w-5xl mx-auto text-center mb-9">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          You may have <span className="text-blue-600">"normal" sugar</span>
        </h2>
        <p className="text-gray-500 text-sm">
          and still have metabolic damage building underneath.
        </p>
        <p className="text-gray-700 font-semibold mt-1 text-sm">
          If you struggle with
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 fade-up-delay-1">
        {SYMPTOMS.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-xl p-5 shadow-sm border border-[#edf1f6] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-start gap-3 pro-hover"
          >
            <img src={s.icon} alt={s.title} className="w-10 h-10 object-contain" />
            <h3 className="font-bold text-gray-800 text-sm">{s.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}