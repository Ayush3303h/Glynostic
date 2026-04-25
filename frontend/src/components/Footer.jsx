import { motion } from "framer-motion";
import { sectionVariants } from "./animations";

export default function Footer() {
  return (
    <motion.footer className="bg-white border-t border-gray-100 py-9 px-4 sm:px-6" variants={sectionVariants}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div>
          <span className="text-blue-600 font-bold text-xl">Glynostic</span>
          <p className="text-gray-400 text-xs mt-2">
            © 2024 Glynostic Metabolic Systems.
          </p>
        </div>

        <div className="flex gap-4 text-xs text-gray-500">
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
        </div>
      </div>
    </motion.footer>
  );
}