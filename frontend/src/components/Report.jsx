import { motion } from "framer-motion";
import { sectionVariants } from "./animations";

export default function Report() {
  return (
    <motion.section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto" variants={sectionVariants}>
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
        Your ₹899 Glynostic Report Includes:
      </h2>
      <p className="text-gray-500 text-sm mb-10">
        A deep-dive analysis into your cellular health that standard diagnostics ignore.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 fade-up-delay-1">

        <div className="bg-blue-600 rounded-xl p-6 text-white flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover">
          <span className="text-2xl">📊</span>
          <h3 className="font-bold text-lg">Metabolic Age</h3>
          <p className="text-blue-100 text-sm leading-relaxed">
            Calculate how fast your body is aging relative to your calendar age based on glycemic markers.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover">
          <span className="text-2xl">🗺️</span>
          <h3 className="font-bold text-lg text-gray-800">Insulin Resistance Map</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Identify if your body is efficiently converting food into energy or storing it as fat.
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-6 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover">
          <span className="text-2xl">⚠️</span>
          <h3 className="font-bold text-lg text-gray-800">Prediabetes Analysis</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Catch silent rising glucose patterns 5–10 years before a Type 2 Diabetes diagnosis.
          </p>
        </div>

        <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col md:flex-row transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover">
          <img
            src="/assets/AB6AXuAFu9TObptSv_55JVRSDWrII7aaAJs81xZxMD3E_SRqKz4jLnDVfiMTBJmhbU-ANarD0pZLnK2w1ueVimFeHn6xT6niFx9za1ImhCvpJb7PdLeyTw-1iRCZSdfi5wdrKkh3Jstx0V5K3sckhffGHFdOlH3a2893QGWkM2rSExDdGifqdTiK0A65kY_NSZGVYMGl9qQyo7ZhznaVJLF2ley-n_3WpICh_BMo-MkVQWWM.png"
            alt="Nutritional Precision"
            className="w-full md:w-44 h-40 md:h-auto object-cover"
          />
          <div className="p-6 flex flex-col gap-2 justify-center">
            <span className="text-2xl">🍽️</span>
            <h3 className="font-bold text-lg text-gray-800">Nutritional Precision</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Get specific macro-nutrient ratios tailored to your current metabolic speed and lifestyle.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 rounded-xl p-6 text-white flex flex-col gap-2 justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover">
          <span className="text-2xl">⚖️</span>
          <h3 className="font-bold text-lg">Hormonal Balance</h3>
          <p className="text-blue-100 text-sm leading-relaxed">
            Understand how cortisol and stress impact your weight management and energy.
          </p>
        </div>

      </div>
    </motion.section>
  );
}