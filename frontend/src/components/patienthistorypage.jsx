import { useRef, useState } from 'react'

const logo = 'https://www.figma.com/api/mcp/asset/28ec0a78-b960-4809-9051-9f5aa90c8a80'
const accountIcon = 'https://www.figma.com/api/mcp/asset/0e62cbe0-c424-41ce-98e0-b829a57b9487'
const stepDone = 'https://www.figma.com/api/mcp/asset/7f4594fc-722c-4bc4-ac42-176816b4f0b7'
const stepActiveCheck = 'https://www.figma.com/api/mcp/asset/30467a2b-36ff-428c-b77c-c3f30b74f962'
const stepLifestyle = 'https://www.figma.com/api/mcp/asset/f6e3679b-4d1e-4680-bdd8-6431d65c9242'
const stepBiometrics = 'https://www.figma.com/api/mcp/asset/f35d79f2-c6a1-40d6-91d1-89d2cbafbfc6'
const stepSummary = 'https://www.figma.com/api/mcp/asset/651d1b5c-a105-4db2-ba57-f61976aaabd1'
const completeBadge = 'https://www.figma.com/api/mcp/asset/bddafee0-2f7d-48ca-92e9-30011d6827b6'
const medicalIcon = 'https://www.figma.com/api/mcp/asset/9a55d5b1-d3a2-45cf-9978-f0821785da41'
const familyIcon = 'https://www.figma.com/api/mcp/asset/529b0c9c-20ee-43f6-a802-61e83a426475'
const medsIcon = 'https://www.figma.com/api/mcp/asset/d148e823-f992-419d-a1e6-2c84341eba98'
const addIcon = 'https://www.figma.com/api/mcp/asset/7c58422e-9f4a-46ea-8516-7c2ef193cbe0'
const lifestyleIcon = 'https://www.figma.com/api/mcp/asset/f2d5a194-31df-4e16-9cd1-3262b36ed4c9'
const reportsIcon = 'https://www.figma.com/api/mcp/asset/899d05e2-b33c-4e97-9476-53dc3bf8d9c8'
const uploadIcon = 'https://www.figma.com/api/mcp/asset/9f16d1ec-0536-4d2c-8c6f-d7530df4d24b'
const infoIcon = 'https://www.figma.com/api/mcp/asset/b79447c8-c896-42a1-aff3-3092bdad872b'
const continueArrow = 'https://www.figma.com/api/mcp/asset/c99a659d-2612-4ab7-9f82-00e2c4154e99'

const conditions = [
  'Diabetes (Type 1 or 2)',
  'Hypertension',
  'PCOS',
  'Thyroid Disorder',
  'Cardiovascular Disease',
  'Gestational Diabetes',
]

export default function PatientHistoryPage() {
  const fileRef = useRef(null)
  const [selectedConditions, setSelectedConditions] = useState([])
  const [otherCondition, setOtherCondition] = useState('')
  const [diabetesHistory, setDiabetesHistory] = useState('yes')
  const [heartDiseaseHistory, setHeartDiseaseHistory] = useState('no')
  const [relation, setRelation] = useState('')
  const [exercise, setExercise] = useState('3-4 times / week')
  const [smoke, setSmoke] = useState(false)
  const [alcohol, setAlcohol] = useState(true)
  const [files, setFiles] = useState([])
  const [medications, setMedications] = useState([
    { id: 1, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
    { id: 2, name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Once daily' },
  ])

  const toggleCondition = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition],
    )
  }

  const addMedication = () => {
    setMedications((prev) => [
      ...prev,
      { id: Date.now(), name: '', dosage: '', frequency: '' },
    ])
  }

  const removeMedication = (id) => {
    setMedications((prev) => prev.filter((m) => m.id !== id))
  }

  const updateMedication = (id, key, value) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [key]: value } : m)),
    )
  }

  const onSelectFiles = (e) => {
    const selected = Array.from(e.target.files || [])
    setFiles(selected)
  }

  return (
    <div className="min-h-screen bg-[#f7fafc] font-['Inter',sans-serif] text-[#151c27]">
      <header className="border-b border-[#f1f5f9] bg-[rgba(255,255,255,0.8)] px-4 shadow-[0px_4px_10px_rgba(0,82,204,0.05)] backdrop-blur-[6px] sm:px-8 lg:px-[86px]">
        <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between">
          <img src={logo} alt="Glynostic" className="h-8 w-[133px] object-contain object-left" />
          <div className="flex items-center gap-4">
            <img src={accountIcon} alt="" className="hidden size-5 sm:block" />
            <button className="rounded-full bg-[#003d9b] px-4 py-2 text-xs font-semibold text-white sm:px-6 sm:text-sm">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-4 pb-10 pt-8 lg:grid-cols-12 lg:px-8">
        <section className="lg:col-span-9">
          <h1 className="font-['Manrope',sans-serif] text-[32px] font-semibold leading-10 tracking-[-0.32px]">
            Your Health History
          </h1>
          <p className="mt-2 max-w-[672px] text-[18px] leading-7 text-[#57605f]">
            We gather your medical and lifestyle history to personalize your assessment and plan.
            Your data is encrypted and HIPAA-compliant.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="rounded-xl border border-[#f3f4f6] bg-white p-6 shadow-[0px_4px_32px_-4px_rgba(0,0,0,0.04)] xl:col-span-8">
              <div className="mb-6 flex items-center gap-3">
                <img src={medicalIcon} alt="" className="size-5" />
                <h2 className="font-['Manrope',sans-serif] text-[32px] font-semibold leading-8 text-[24px]">
                  Medical Conditions
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {conditions.map((condition) => (
                  <label
                    key={condition}
                    className="flex h-[58px] cursor-pointer items-center gap-3 rounded-lg border border-[#bec9c4] px-[17px]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(condition)}
                      onChange={() => toggleCondition(condition)}
                      className="size-5 rounded border-[#bec9c4] text-[#003d9b]"
                    />
                    <span className="text-base">{condition}</span>
                  </label>
                ))}
              </div>

              <label className="mt-5 block">
                <span className="text-xs font-semibold uppercase tracking-[0.6px] text-[#57605f]">
                  OTHER CONDITIONS
                </span>
                <input
                  type="text"
                  value={otherCondition}
                  onChange={(e) => setOtherCondition(e.target.value)}
                  placeholder="Please specify any other diagnosed conditions"
                  className="mt-2 h-[58px] w-full rounded-lg bg-[#f8fafc] px-4 text-base placeholder:text-[#6b7280] focus:outline-none"
                />
              </label>
            </div>

            <div className="rounded-xl border border-[#f3f4f6] bg-white p-6 shadow-[0px_4px_32px_-4px_rgba(0,0,0,0.04)] xl:col-span-4">
              <div className="mb-4 flex items-center gap-3">
                <img src={familyIcon} alt="" className="h-[21px] w-[19px]" />
                <h2 className="font-['Manrope',sans-serif] text-2xl font-semibold">Family History</h2>
              </div>
              <p className="text-sm leading-5 text-[#57605f]">
                Does anyone in your family have a history of diabetes, heart disease, or other conditions?
              </p>

              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium">Diabetes History</span>
                    <div className="flex rounded-full bg-[rgba(150,235,213,0.35)] p-1">
                      <button
                        onClick={() => setDiabetesHistory('yes')}
                        className={`rounded-full px-4 py-1 text-xs font-semibold ${diabetesHistory === 'yes' ? 'bg-white text-[#003d9b] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]' : 'text-[#94a3b8]'}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDiabetesHistory('no')}
                        className={`rounded-full px-4 py-1 text-xs font-semibold ${diabetesHistory === 'no' ? 'bg-white text-[#003d9b] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]' : 'text-[#94a3b8]'}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="Specify relation (e.g., Mother, Sibling)"
                    className="mt-2 h-[42px] w-full rounded-lg bg-[#f8fafc] px-3 text-sm placeholder:text-[#6b7280] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">Heart Disease</span>
                  <div className="flex rounded-full bg-[rgba(150,235,213,0.32)] p-1">
                    <button
                      onClick={() => setHeartDiseaseHistory('yes')}
                      className={`rounded-full px-4 py-1 text-xs font-semibold ${heartDiseaseHistory === 'yes' ? 'bg-white text-[#003d9b] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]' : 'text-[#94a3b8]'}`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setHeartDiseaseHistory('no')}
                      className={`rounded-full px-4 py-1 text-xs font-semibold ${heartDiseaseHistory === 'no' ? 'bg-white text-[#003d9b] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]' : 'text-[#94a3b8]'}`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-6 rounded-xl border border-[#f3f4f6] bg-white p-6 shadow-[0px_4px_32px_-4px_rgba(0,0,0,0.04)]">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={medsIcon} alt="" className="size-[18px]" />
                <h2 className="font-['Manrope',sans-serif] text-2xl font-semibold">
                  Medications &amp; Supplements
                </h2>
              </div>
              <button onClick={addMedication} className="flex items-center gap-2 text-base font-semibold text-[#003d9b]">
                <img src={addIcon} alt="" className="size-5" />
                Add New
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#f3f4f6]">
              <table className="w-full min-w-[700px]">
                <thead className="bg-[#f8fafc]">
                  <tr className="text-left text-xs font-semibold tracking-[0.6px] text-[#57605f]">
                    <th className="px-6 py-4">NAME</th>
                    <th className="px-6 py-4">DOSAGE</th>
                    <th className="px-6 py-4">FREQUENCY</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med, idx) => (
                    <tr key={med.id} className={idx > 0 ? 'border-t border-[#f3f4f6]' : ''}>
                      <td className="px-6 py-4">
                        <input
                          value={med.name}
                          onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
                          className="w-full bg-transparent text-base focus:outline-none"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          value={med.dosage}
                          onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
                          className="w-full bg-transparent text-base focus:outline-none"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          value={med.frequency}
                          onChange={(e) => updateMedication(med.id, 'frequency', e.target.value)}
                          className="w-full bg-transparent text-base focus:outline-none"
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => removeMedication(med.id)} className="opacity-50">
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
            <section className="rounded-xl border border-[#f3f4f6] bg-white p-6 shadow-[0px_4px_32px_-4px_rgba(0,0,0,0.04)] xl:col-span-7">
              <div className="mb-6 flex items-center gap-3">
                <img src={lifestyleIcon} alt="" className="size-5" />
                <h2 className="font-['Manrope',sans-serif] text-2xl font-semibold">Lifestyle Habits</h2>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.6px] text-[#57605f]">EXERCISE FREQUENCY</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {['Never', '1-2 times / week', '3-4 times / week', 'Daily'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setExercise(option)}
                    className={`rounded-full px-6 py-2 text-sm font-medium ${exercise === option ? 'border-2 border-[#003d9b] bg-[rgba(157,243,220,0.1)] font-semibold text-[#003d9b]' : 'border border-[#bec9c4] text-[#151c27]'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-12">
                <div className="flex items-center gap-8">
                  <span className="text-base font-medium">Do you smoke?</span>
                  <button
                    onClick={() => setSmoke((v) => !v)}
                    className={`relative h-6 w-11 rounded-full ${smoke ? 'bg-[#003d9b]' : 'bg-[#e2e8f0]'}`}
                  >
                    <span
                      className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${smoke ? 'left-[22px]' : 'left-[2px]'}`}
                    />
                  </button>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-base font-medium">Alcohol consumption?</span>
                  <button
                    onClick={() => setAlcohol((v) => !v)}
                    className={`relative h-6 w-11 rounded-full ${alcohol ? 'bg-[#003d9b]' : 'bg-[#e2e8f0]'}`}
                  >
                    <span
                      className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${alcohol ? 'left-[22px]' : 'left-[2px]'}`}
                    />
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-[#f3f4f6] bg-white p-6 shadow-[0px_4px_32px_-4px_rgba(0,0,0,0.04)] xl:col-span-5">
              <div className="mb-6 flex items-center gap-3">
                <img src={reportsIcon} alt="" className="h-5 w-4" />
                <h2 className="font-['Manrope',sans-serif] text-2xl font-semibold">Previous Reports</h2>
              </div>

              <button
                onClick={() => fileRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed border-[#e2e8f0] p-8 text-center"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#f8fafc]">
                  <img src={uploadIcon} alt="" className="h-4 w-[22px]" />
                </div>
                <p className="mt-4 text-base font-medium">Click or drag to upload</p>
                <p className="mt-1 text-xs text-[#57605f]">PDF, PNG, or JPEG (Max 10MB)</p>
                <span className="mt-6 inline-block rounded-full bg-[rgba(150,235,213,0.6)] px-6 py-2 text-sm font-semibold text-[#5b6563]">
                  Select Files
                </span>
              </button>
              <input
                ref={fileRef}
                type="file"
                multiple
                onChange={onSelectFiles}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
              />
              <div className="mt-4 flex items-center gap-3 rounded-lg bg-[rgba(150,235,213,0.39)] p-3">
                <img src={infoIcon} alt="" className="size-[11px]" />
                <p className="text-xs leading-4">
                  Uploading previous lab results can improve accuracy by 40%.
                </p>
              </div>
              {files.length > 0 && (
                <p className="mt-3 text-xs text-[#57605f]">{files.length} file(s) selected</p>
              )}
            </section>
          </div>

          <div className="mt-8 flex justify-center lg:justify-end">
            <button className="flex items-center gap-3 rounded-full bg-[#003d9b] px-10 py-4 text-lg text-white shadow-[0px_10px_15px_-3px_rgba(0,83,68,0.2),0px_4px_6px_-4px_rgba(0,83,68,0.2)]">
              Continue
              <img src={continueArrow} alt="" className="size-4" />
            </button>
          </div>
        </section>

        <aside className="lg:col-span-3">
          <div className="overflow-hidden rounded-xl bg-white shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
            <div className="border-b border-[#f8fafc] px-6 pb-[25px] pt-6">
              <p className="font-['Manrope',sans-serif] text-[28px] leading-7 text-[#005344]">Progress</p>
              <p className="mt-2 text-base text-[#94a3b8]">Assessment Steps</p>
            </div>
            <div>
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="text-sm text-[#94a3b8]">01</span>
                <span className="text-base text-[#94a3b8]">patient info</span>
                <img src={stepDone} alt="" className="ml-auto size-[9px]" />
              </div>
              <div className="flex items-center gap-4 border-r-4 border-[#96ebd5] bg-[#e6f0ee] px-6 py-4">
                <span className="text-sm text-[#94a3b8]">02</span>
                <span className="text-base font-semibold text-[#003d9b]">History</span>
                <img src={stepActiveCheck} alt="" className="ml-auto size-[10px]" />
              </div>
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="text-sm text-[#94a3b8]">03</span>
                <span className="text-base text-[#94a3b8]">Lifestyle</span>
                <img src={stepLifestyle} alt="" className="ml-auto h-[11px] w-[9px]" />
              </div>
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="text-sm text-[#94a3b8]">04</span>
                <span className="text-base text-[#94a3b8]">Biometrics</span>
                <img src={stepBiometrics} alt="" className="ml-auto h-[9px] w-[11px]" />
              </div>
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="text-sm text-[#94a3b8]">05</span>
                <span className="text-base text-[#94a3b8]">Summary</span>
                <img src={stepSummary} alt="" className="ml-auto h-[11px] w-[10px]" />
              </div>
            </div>
            <div className="flex items-center justify-between bg-[#f8fafc] p-6">
              <span className="text-xs font-bold uppercase tracking-[1.2px] text-[#64748b]">49 COMPLETE</span>
              <img src={completeBadge} alt="" className="size-5" />
            </div>
          </div>
        </aside>
      </main>

      <footer className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-6 px-4 pb-10 pt-4 sm:px-8 lg:flex-row lg:items-center">
        <div>
          <p className="text-[20px] font-semibold text-[#0f172a]">Need Help?</p>
          <div className="mt-2 flex items-center gap-4 text-sm">
            <a href="#" className="font-semibold text-[#005344]">WhatsApp Us</a>
            <span className="text-[#cbd5e1]">|</span>
            <a href="mailto:support@glynostic.com" className="text-[#64748b]">support@glynostic.com</a>
          </div>
        </div>
        <div className="text-left lg:text-right">
          <p className="text-xs text-[#64748b]">© 2024 Glynostic Healthcare. HIPAA Compliant &amp; SOC2 Type II Certified.</p>
          <div className="mt-3 flex gap-6 text-sm text-[#64748b] lg:justify-end">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
