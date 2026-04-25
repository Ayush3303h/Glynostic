import { motion } from "framer-motion";
import { sectionVariants } from "./animations";

const COMPARISON = [
  { feature: "Testing Method", others: "Standard HbA1c Only", glynostic: "Multi-Marker Metabolic Map" },
  { feature: "Insights", others: "Generic Lab Ranges", glynostic: "Clinical Prediction Models" },
  { feature: "Support", others: "DIY (Figure it out)", glynostic: "Guided 90-Day Protocol" },
  { feature: "Approach", others: "Calorie Counting", glynostic: "Metabolic Flexibility" },
];

export default function Comparison() {
  return (
    <motion.section className="py-14 px-4 sm:px-6 bg-[#f4f7fb]" variants={sectionVariants}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
          Why Glynostic is Different
        </h2>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Feature</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-400">Most Programs</th>
                <th className="text-left px-6 py-4 font-bold text-blue-600">Glynostic</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.feature} className={i < COMPARISON.length - 1 ? "border-b border-gray-50" : ""}>
                  <td className="px-6 py-4 font-semibold text-gray-700">{row.feature}</td>
                  <td className="px-6 py-4 text-gray-400">{row.others}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">{row.glynostic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
}