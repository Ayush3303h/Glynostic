// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import './App.css'





// const NAV_LINKS = ["Home", "The Report", "90-Day Program", "FAQ"];

// const SYMPTOMS = [
//   {
//     icon: "/assets/obesity__1__1.png",
//     title: "Stubborn Belly Fat",
//     desc: "Weight that won't budge regardless of intense workouts or calorie counting.",
//   },
//   {
//     icon: "/assets/crash_1.png",
//     title: "3PM Energy Crash",
//     desc: "Dependency on caffeine or sugar to survive the afternoon slump.",
//   },
//   {
//     icon: "/assets/cotton-candy_1.png",
//     title: "Sugar Cravings",
//     desc: "Intense urge for carbs or sweets shortly after finishing a meal.",
//   },
//   {
//     icon: "/assets/brain_1.png",
//     title: "Brain Fog",
//     desc: "Difficulty concentrating or feeling mentally sharp throughout the day.",
//   },
// ];

// const COMPARISON = [
//   { feature: "Testing Method", others: "Standard HbA1c Only", glynostic: "Multi-Marker Metabolic Map" },
//   { feature: "Insights", others: "Generic Lab Ranges", glynostic: "Clinical Prediction Models" },
//   { feature: "Support", others: "DIY (Figure it out)", glynostic: "Guided 90-Day Protocol" },
//   { feature: "Approach", others: "Calorie Counting", glynostic: "Metabolic Flexibility" },
// ];

// const FAQS = [
//   {
//     q: "Do I need to visit a lab?",
//     a: "We offer convenient home sample collection. A certified phlebotomist will visit your preferred location at your chosen time.",
//   },
//   {
//     q: "How is this different from a regular checkup?",
//     a: "A regular checkup looks at standard markers. Glynostic maps your full metabolic picture — insulin sensitivity, glucose trends, hormonal balance — that standard diagnostics ignore.",
//   },
//   {
//     q: "Will I need to buy expensive supplements?",
//     a: "No. Our recommendations are based on food-first protocols and lifestyle adjustments. Supplements are optional and never required.",
//   },
// ];

// const STEPS = [
//   { icon: "📋", title: "Assessment Completed", desc: "Complete your profile in 10–15 minutes.", color: "bg-gray-100" },
//   { icon: "🔬", title: "Clinical Analysis", desc: "Our algorithms and MDs process your data.", color: "bg-gray-100" },
//   { icon: "📄", title: "Delivered in 24h", desc: "Secure PDF delivery to your registered email.", color: "bg-green-500" },
// ];

// const pageVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.06,
//     },
//   },
// };

// const sectionVariants = {
//   hidden: { opacity: 0, y: 20 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.65,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };



// export default function App() {
//   const [openFaq, setOpenFaq] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <motion.div
//       className="font-sans text-gray-800 bg-[#f7f9fc] min-h-screen"
//       variants={pageVariants}
//       initial="hidden"
//       animate="show"
//     >

//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
//           <span className="text-blue-600 font-bold text-xl tracking-tight">Glynostic</span>
//           <div className="hidden md:flex items-center gap-7">
//             {NAV_LINKS.map((link) => (
//               <a
//                 key={link}
//                 href="#"
//                 className={`text-sm font-medium transition-colors ${
//                   link === "Home"
//                     ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
//                     : "text-gray-600 hover:text-blue-600"
//                 }`}
//               >
//                 {link}
//               </a>
//             ))}
//           </div>
//           <div className="hidden md:flex items-center gap-3">
//             <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">🌐</button>
//             <button className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-blue-700 transition-colors">
//               Get Started
//             </button>
//           </div>
//           <button
//             className="md:hidden text-gray-600"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//               />
//             </svg>
//           </button>
//         </div>
//         {menuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
//             {NAV_LINKS.map((link) => (
//               <a key={link} href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">
//                 {link}
//               </a>
//             ))}
//             <button className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full w-fit hover:bg-blue-700">
//               Get Started
//             </button>
//           </div>
//         )}
//       </nav>




//       <motion.section className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto" variants={sectionVariants}>
//         <div className="grid md:grid-cols-2 gap-12 items-center">

//           {/* LEFT SIDE */}
//           <div className="fade-up">
//             <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
//               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//               CLINICALLY VALIDATED
//             </div>

//             <h1 className="text-[40px] sm:text-[44px] font-bold text-[#1f2937] leading-[1.1] mb-5">
//               Know Your Metabolic Risk.{" "}
//               <span className="text-blue-600">
//                 Control Diabetes Before It Progresses
//               </span>{" "}
//               Or Start Reversing It Naturally.
//             </h1>

//             <p className="text-gray-500 text-sm max-w-xl mb-7 leading-relaxed">
//               Get a personalized Glynostic Metabolic Intelligence Report that reveals your metabolic age,
//               belly fat risk, hidden insulin resistance signals, and a tailored 30-day reversal blueprint.
//             </p>

//             <ul className="flex flex-col gap-2 mb-7">
//               {[
//                 "5-minute assessment",
//                 "Personalized report in 24 hours",
//                 "Designed to detect risk early and support reversal naturally",
//                 "Guided by metabolic science",
//               ].map((item) => (
//                 <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
//                   <span className="text-green-500 font-bold">✓</span> {item}
//                 </li>
//               ))}
//             </ul>

//             <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg text-sm hover:bg-blue-700 shadow-md cta-pop">
//               Get Your Report at ₹899
//             </button>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover fade-up-delay-1">
//             <img
//               src="/assets/AB6AXuBeTo8NRwE0EVvp8607s_ArwSOTHAhUqKm7YAJLoYzIuTbvpNSb1h1ejkcGKj1t-Mew-eXDmHvNovEAANm0sfVHRqZ8mbQ_YiwftKyI0_9IFk69uYszrGv1QIq7pFsOetKKE4YBdxRvi6-X8CDxPRS-aU-5N2FNOBMJiqIaWCmml2HHs1Bqy4qHuMrY10WehRqFxsmFRWezfg9kmbPL_GPHGJoCuufMLtuiGYMLZyIm.png" // ⚠️ replace with your actual image
//               alt="Glucose meter"
//               className="rounded-xl w-full h-60 object-cover mb-4"
//             />

//             <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-gray-400">METABOLIC SCORE</p>
//                 <p className="text-2xl font-bold text-gray-800">82/100</p>
//               </div>
//               <span className="text-green-500 text-sm font-semibold">
//                 +4.2 pts ↗
//               </span>
//             </div>
//           </div>

//         </div>
//       </motion.section>


//       {/* SYMPTOMS */}
//       <motion.section className="py-14 px-4 sm:px-6 bg-[#eef3f8]" variants={sectionVariants}>
//         <div className="max-w-5xl mx-auto text-center mb-9">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//             You may have{" "}
//             <span className="text-blue-600">"normal" sugar</span>
//           </h2>
//           <p className="text-gray-500 text-sm">
//             and still have metabolic damage building underneath.
//           </p>
//           <p className="text-gray-700 font-semibold mt-1 text-sm">If you struggle with</p>
//         </div>
//         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 fade-up-delay-1">
//           {SYMPTOMS.map((s) => (
//             <div
//               key={s.title}
//               className="bg-white rounded-xl p-5 shadow-sm border border-[#edf1f6] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-start gap-3 pro-hover"
//             >
//               <img src={s.icon} alt={s.title} className="w-10 h-10 object-contain" />
//               <h3 className="font-bold text-gray-800 text-sm">{s.title}</h3>
//               <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
//             </div>
//           ))}
//         </div>
//       </motion.section>

//       {/* REPORT INCLUDES */}
//       <motion.section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto" variants={sectionVariants}>
//         <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
//           Your ₹1499 Glynostic Report Includes:
//         </h2>
//         <p className="text-gray-500 text-sm mb-10">
//           A deep-dive analysis into your cellular health that standard diagnostics ignore.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 fade-up-delay-1">
//           {/* Row 1 */}
//           <div className="bg-blue-600 rounded-xl p-6 text-white flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover">
//             <span className="text-2xl">📊</span>
//             <h3 className="font-bold text-lg">Metabolic Age</h3>
//             <p className="text-blue-100 text-sm leading-relaxed">
//               Calculate how fast your body is aging relative to your calendar age based on glycemic markers.
//             </p>
//           </div>
//           <div className="bg-blue-50 rounded-xl p-6 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover">
//             <span className="text-2xl">🗺️</span>
//             <h3 className="font-bold text-lg text-gray-800">Insulin Resistance Map</h3>
//             <p className="text-gray-500 text-sm leading-relaxed">
//               Identify if your body is efficiently converting food into energy or storing it as fat.
//             </p>
//           </div>
//           <div className="bg-green-50 rounded-xl p-6 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover">
//             <span className="text-2xl">⚠️</span>
//             <h3 className="font-bold text-lg text-gray-800">Prediabetes Analysis</h3>
//             <p className="text-gray-500 text-sm leading-relaxed">
//               Catch silent rising glucose patterns 5–10 years before a Type 2 Diabetes diagnosis.
//             </p>
//           </div>
//           {/* Row 2 */}
//           <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col md:flex-row transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover">
//             <img
//               src="/assets/AB6AXuAFu9TObptSv_55JVRSDWrII7aaAJs81xZxMD3E_SRqKz4jLnDVfiMTBJmhbU-ANarD0pZLnK2w1ueVimFeHn6xT6niFx9za1ImhCvpJb7PdLeyTw-1iRCZSdfi5wdrKkh3Jstx0V5K3sckhffGHFdOlH3a2893QGWkM2rSExDdGifqdTiK0A65kY_NSZGVYMGl9qQyo7ZhznaVJLF2ley-n_3WpICh_BMo-MkVQWWM.png"
//               alt="Nutritional Precision"
//               className="w-full md:w-44 h-40 md:h-auto object-cover"
//             />
//             <div className="p-6 flex flex-col gap-2 justify-center">
//               <span className="text-2xl">🍽️</span>
//               <h3 className="font-bold text-lg text-gray-800">Nutritional Precision</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">
//                 Get specific macro-nutrient ratios tailored to your current metabolic speed and lifestyle.
//               </p>
//             </div>
//           </div>
//           <div className="bg-blue-600 rounded-xl p-6 text-white flex flex-col gap-2 justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover">
//             <span className="text-2xl">⚖️</span>
//             <h3 className="font-bold text-lg">Hormonal Balance</h3>
//             <p className="text-blue-100 text-sm leading-relaxed">
//               Understand how cortisol and stress impact your weight management and energy.
//             </p>
//           </div>
//         </div>
//       </motion.section>

//       {/* WHY DIFFERENT */}
//       <motion.section className="py-14 px-4 sm:px-6 bg-[#f4f7fb]" variants={sectionVariants}>
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
//             Why Glynostic is Different
//           </h2>
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-gray-100">
//                   <th className="text-left px-6 py-4 font-semibold text-gray-600">Feature</th>
//                   <th className="text-left px-6 py-4 font-semibold text-gray-400">Most Programs</th>
//                   <th className="text-left px-6 py-4 font-bold text-blue-600">Glynostic</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {COMPARISON.map((row, i) => (
//                   <tr
//                     key={row.feature}
//                     className={i < COMPARISON.length - 1 ? "border-b border-gray-50" : ""}
//                   >
//                     <td className="px-6 py-4 font-semibold text-gray-700">{row.feature}</td>
//                     <td className="px-6 py-4 text-gray-400">{row.others}</td>
//                     <td className="px-6 py-4 font-bold text-blue-600">{row.glynostic}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </motion.section>

//       {/* 90 DAY PROGRAM */}
//       <motion.section className="py-14 px-4 sm:px-6" variants={sectionVariants}>
//         <div className="max-w-5xl mx-auto bg-blue-700 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 fade-up-delay-2">
//           <div className="flex-1 text-white">
//             <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-3">
//               THE FULL TRANSFORMATION
//             </p>
//             <h2 className="text-3xl font-bold mb-4">90 Days metabolic reset program</h2>
//             <p className="text-blue-200 text-sm mb-6 leading-relaxed">
//               Move beyond testing. We provide the tools, support, and biological data to reverse years
//               of metabolic damage in 12 weeks.
//             </p>
//             <div className="flex gap-6 mb-8">
//               <div>
//                 <p className="font-bold text-sm">🧑‍⚕️ Coach Access</p>
//                 <p className="text-blue-300 text-xs mt-0.5">Ensure clinical board coaches</p>
//               </div>
//               <div>
//                 <p className="font-bold text-sm">🍽️ Meal Sequencing</p>
//                 <p className="text-blue-300 text-xs mt-0.5">Data-backed food order rules</p>
//               </div>
//             </div>
//             <button className="bg-green-400 hover:bg-green-300 transition-colors text-gray-900 font-bold px-7 py-3 rounded-full text-sm cta-pop">
//               Enroll in 90-Day Program
//             </button>
//           </div>
//           <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm w-full">
//             <img
//               src="/assets/AB6AXuCq2R1qrQ8rtfuET83sNS17t7ivCH-qZeRCiT2dVMXI3818Koecyg0WEe1naPUSm4YCHoaeRaAsNyXIZECGvXiJhQm7A0Lo5gwqZE0L62q2ggvWA2PQxcf2gacO7Efp0n9CAlzr2eDS-jSViBDFM8WG3g6vfVj4Hao8TOX3G0P1Y8BWqJVB6mRa0yBj6KNy6MMm_2HmlueY7lKjTGYylfGOqj_L82EgAks5nv6JktDB.png"
//               alt="Healthy food"
//               className="rounded-2xl object-cover h-36 w-full"
//             />
//             <img
//               src="/assets/AB6AXuAeWBMBpL8gkdN8QwzNO9QIqrD9WSTEjQoAh0thUSV8uAfRFwDI08dwjmFwXTaUjLU57Cnti6MZtpBMsk1ZyEujAC6YaXlqTyFMWpgHUr99xWeNQ-Cvf9dK8xJwU5VjtdquPNq8Dvs6kZlCqGP7dx-Lr2QcmMK71wLMtmAvxXHntIK3E3s_0xq1JoQR6at7HyKGPzloc8UMSui9xrkrm9zpL0V_ogS3DJTw06gbpmoG.png"
//               alt="Medical device"
//               className="rounded-2xl object-cover h-36 w-full"
//             />

//           </div>
//         </div>
//       </motion.section>

//       {/* FAQ */}
//       <motion.section className="py-14 px-4 sm:px-6 bg-[#f4f7fb]" id="faq" variants={sectionVariants}>
//         <div className="max-w-3xl mx-auto">
//           <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
//             Frequently Asked Questions
//           </h2>
//           <div className="flex flex-col gap-3">
//             {FAQS.map((faq, i) => (
//               <div
//                 key={faq.q}
//                 className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md pro-hover"
//               >
//                 <button
//                   className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-gray-800 text-sm hover:text-blue-600 transition-colors"
//                   onClick={() => setOpenFaq(openFaq === i ? null : i)}
//                 >
//                   {faq.q}
//                   <span
//                     className={`ml-4 text-gray-400 text-lg transition-transform duration-200 ${
//                       openFaq === i ? "rotate-180" : ""
//                     }`}
//                   >
//                     ▾
//                   </span>
//                 </button>
//                 {openFaq === i && (
//                   <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-3">
//                     {faq.a}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* PATH TO CLARITY */}
//       <motion.section className="py-16 px-4 sm:px-6" variants={sectionVariants}>
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-12">Your Path to Clarity</h2>
//           <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-px bg-gray-200"></div>
//             {STEPS.map((step) => (
//               <div key={step.title} className="relative flex flex-col items-center gap-3">
//                 <div
//                   className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 ${step.color}`}
//                 >
//                   {step.icon}
//                 </div>
//                 <h3 className="font-bold text-gray-800 text-sm">{step.title}</h3>
//                 <p className="text-gray-500 text-xs text-center max-w-xs">{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* FOOTER */}
//       <motion.footer className="bg-white border-t border-gray-100 py-9 px-4 sm:px-6" variants={sectionVariants}>
//         <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
//           <div>
//             <span className="text-blue-600 font-bold text-xl">Glynostic</span>
//             <p className="text-gray-400 text-xs mt-2">© 2024 Glynostic Metabolic Systems. All rights reserved.</p>
//             <p className="text-gray-400 text-xs">This report is not intended as medical advice.</p>
//           </div>
//           <div className="flex flex-wrap gap-4 text-xs text-gray-500">
//             {["Privacy Policy", "Terms of Service", "Clinical Standards", "Contact Support", "Affiliates"].map(
//               (link) => (
//                 <a key={link} href="#" className="hover:text-blue-600 transition-colors">
//                   {link}
//                 </a>
//               )
//             )}
//           </div>
//         </div>
//       </motion.footer>
//     </motion.div>
//   );
// }




// import { useState } from "react";
// import { motion } from "framer-motion";
// import { pageVariants } from "./animations";

// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Symptoms from "./components/Symptoms";
// import Report from "./components/Report";
// import Comparison from "./components/Comparison";
// import Program from "./components/Program";
// import FAQ from "./components/FAQ";
// import Steps from "./components/Steps";
// import Footer from "./components/Footer";

// import "./App.css";

// export default function App() {
//   const [openFaq, setOpenFaq] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <motion.div
//       className="font-sans text-gray-800 bg-[#f7f9fc] min-h-screen"
//       variants={pageVariants}
//       initial="hidden"
//       animate="show"
//     >
//       <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
//       <Hero />
//       <Symptoms />
//       <Report />
//       <Comparison />
//       <Program />
//       <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
//       <Steps />
//       <Footer />
//     </motion.div>
//   );
// }




import { useState } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "./animations";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ReportPage from "./pages/ReportPage";
import FAQ from "./components/FAQ";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <motion.div
        className="font-sans text-gray-800 bg-[#f7f9fc] min-h-screen"
        variants={pageVariants}
        initial="hidden"
        animate="show"
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                openFaq={openFaq}
                setOpenFaq={setOpenFaq}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            }
          />
          <Route path="/report" element={<ReportPage />} />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}