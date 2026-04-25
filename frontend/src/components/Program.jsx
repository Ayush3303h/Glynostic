import { motion } from "framer-motion";
import { sectionVariants } from "./animations";

export default function Program() {
  return (
    <motion.section id="program" className="py-14 px-4 sm:px-6" variants={sectionVariants}>
      <div className="max-w-5xl mx-auto bg-blue-700 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 fade-up-delay-2">

        <div className="flex-1 text-white">
          <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-3">
            THE FULL TRANSFORMATION
          </p>
          <h2 className="text-3xl font-bold mb-4">90 Days metabolic reset program</h2>
          <p className="text-blue-200 text-sm mb-6 leading-relaxed">
            Move beyond testing. We provide the tools, support, and biological data to reverse years
            of metabolic damage in 12 weeks.
          </p>

          <div className="flex gap-6 mb-8">
            <div>
              <p className="font-bold text-sm">🧑‍⚕️ Coach Access</p>
              <p className="text-blue-300 text-xs mt-0.5">Ensure clinical board coaches</p>
            </div>
            <div>
              <p className="font-bold text-sm">🍽️ Meal Sequencing</p>
              <p className="text-blue-300 text-xs mt-0.5">Data-backed food order rules</p>
            </div>
          </div>

          <button className="bg-green-400 hover:bg-green-300 transition-colors text-gray-900 font-bold px-7 py-3 rounded-full text-sm cta-pop">
            Enroll in 90-Day Program
          </button>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm w-full">
          <img
            src="/assets/AB6AXuCq2R1qrQ8rtfuET83sNS17t7ivCH-qZeRCiT2dVMXI3818Koecyg0WEe1naPUSm4YCHoaeRaAsNyXIZECGvXiJhQm7A0Lo5gwqZE0L62q2ggvWA2PQxcf2gacO7Efp0n9CAlzr2eDS-jSViBDFM8WG3g6vfVj4Hao8TOX3G0P1Y8BWqJVB6mRa0yBj6KNy6MMm_2HmlueY7lKjTGYylfGOqj_L82EgAks5nv6JktDB.png"
            className="rounded-2xl object-cover h-36 w-full"
          />
          <img
            src="/assets/AB6AXuAeWBMBpL8gkdN8QwzNO9QIqrD9WSTEjQoAh0thUSV8uAfRFwDI08dwjmFwXTaUjLU57Cnti6MZtpBMsk1ZyEujAC6YaXlqTyFMWpgHUr99xWeNQ-Cvf9dK8xJwU5VjtdquPNq8Dvs6kZlCqGP7dx-Lr2QcmMK71wLMtmAvxXHntIK3E3s_0xq1JoQR6at7HyKGPzloc8UMSui9xrkrm9zpL0V_ogS3DJTw06gbpmoG.png"
            className="rounded-2xl object-cover h-36 w-full"
          />
        </div>

      </div>
    </motion.section>
  );
}