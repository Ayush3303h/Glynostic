import { motion } from "framer-motion";
import { sectionVariants } from "../animations";
import { FAQS } from "../data/content";

export default function FAQ({ openFaq, setOpenFaq }) {
  return (
    <motion.section id="faq" className="py-14 px-4 sm:px-6 bg-[#f4f7fb]" variants={sectionVariants}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-gray-800 text-sm hover:text-blue-600 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <span className={`ml-4 text-gray-400 text-lg ${openFaq === i ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              {openFaq === i && (
                <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}