import { motion } from "framer-motion";
import { sectionVariants } from "./animations";

const STEPS = [
  { icon: "📋", title: "Assessment Completed", desc: "Complete your profile in 10–15 minutes.", color: "bg-gray-100" },
  { icon: "🔬", title: "Clinical Analysis", desc: "Our algorithms and MDs process your data.", color: "bg-gray-100" },
  { icon: "📄", title: "Delivered in 24h", desc: "Secure PDF delivery to your registered email.", color: "bg-green-500" },
];

export default function Steps() {
  return (
    <motion.section className="py-16 px-4 sm:px-6" variants={sectionVariants}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-12">
          Your Path to Clarity
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.title} className="flex flex-col items-center gap-3">
              <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center`}>
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}