"use client"
import { useState } from "react"

// Completely rewritten case studies data to avoid any special characters
const caseStudies = [
  {
    id: 1,
    title: "Case Study 1: Diabetic Ketoacidosis (DKA)",
    patient: "John D., 45-year-old male",
    summary:
      "John, a long-time diabetic, presented to the ER with nausea, vomiting, and deep, rapid breathing. His lab results showed a blood sugar level of 450 mg/dL, high ketones in urine, and metabolic acidosis. John was admitted to the ICU, where he was given IV insulin and fluids, stabilizing over 24 hours.",
    details: [
      "Early recognition of Diabetic Ketoacidosis (DKA) is critical. If untreated, it can lead to severe complications, including organ failure or coma.",
      "Recognizing the early signs of DKA such as nausea, vomiting, and rapid breathing.",
      "Emergency treatment involves IV fluids and insulin administration.",
      "Patient education on managing blood sugar levels and recognizing warning signs to prevent future episodes.",
    ],
    borderColor: "border-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    title: "Case Study 2: Hypertension Management",
    patient: "Susan M., 60-year-old female",
    summary:
      "Susan was diagnosed with hypertension during a routine check-up. Despite having no noticeable symptoms, her blood pressure was recorded at 160/95 mmHg. Lifestyle changes including a balanced diet and exercise were recommended, and a low-dose medication was prescribed.",
    details: [
      "Managing hypertension early can help prevent severe complications such as stroke or heart attack. Regular monitoring and lifestyle changes play a crucial role.",
      "Importance of regular blood pressure monitoring, especially when no symptoms are present.",
      "Lifestyle modifications such as diet and exercise can help reduce blood pressure.",
      "Medication may be required when lifestyle changes alone are not sufficient.",
    ],
    borderColor: "border-green-500",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    title: "Case Study 3: Pediatric Asthma Exacerbation",
    patient: "8-year-old boy, frequent asthma attacks",
    summary:
      "An 8-year-old child with a history of asthma arrived at the clinic with severe wheezing and shortness of breath. Oxygen therapy, nebulized bronchodilators, and steroids were administered. After treatment, the condition of the child improved significantly.",
    details: [
      "Asthma exacerbations can be managed with quick interventions, but it is crucial to identify triggers and develop an action plan.",
      "Identifying common asthma triggers such as allergens or respiratory infections.",
      "Immediate treatment with bronchodilators and steroids can relieve symptoms during an exacerbation.",
      "Developing a personalized asthma action plan for managing future attacks and preventing hospital visits.",
    ],
    borderColor: "border-red-500",
    bgColor: "bg-red-100",
  },
]

const CaseStudies = () => {
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedCaseStudy((prev) => (prev === id ? null : id))
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📚 Medical Case Studies</h2>
      <p className="mb-6 text-gray-700">
        Explore real-world case studies to enhance learning and practical understanding.
      </p>

      {caseStudies.map((study) => (
        <div key={study.id} className={`mb-6 p-4 border-l-4 ${study.borderColor} ${study.bgColor} rounded`}>
          <h3 className="text-xl font-semibold">{study.title}</h3>
          <p>
            <strong>Patient:</strong> {study.patient.replace(/'/g, "&#39;")}
          </p>
          <p className="text-gray-600">{study.summary.replace(/'/g, "&#39;")}</p>

          {expandedCaseStudy === study.id && (
            <>
              <p className="text-gray-600">{study.details[0].replace(/'/g, "&#39;")}</p>
              <ul className="mt-2 list-disc pl-6 text-gray-700">
                {study.details.slice(1).map((point, index) => (
                  <li key={index}>{point.replace(/'/g, "&#39;")}</li>
                ))}
              </ul>
            </>
          )}

          <button
            onClick={() => toggleExpand(study.id)}
            aria-expanded={expandedCaseStudy === study.id}
            className="text-blue-500 mt-2 cursor-pointer"
          >
            {expandedCaseStudy === study.id ? "Show Less" : "Read More"}
          </button>
        </div>
      ))}
    </div>
  )
}

export default CaseStudies
