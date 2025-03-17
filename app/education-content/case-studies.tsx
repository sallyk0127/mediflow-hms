import React from "react";

const CaseStudies = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📚 Medical Case Studies</h2>
      <p className="mb-6 text-gray-700">
        Explore real-world case studies to enhance learning and practical understanding.
      </p>

      {/* Case Study 1 */}
      <div className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-100 rounded">
        <h3 className="text-xl font-semibold">📌 Case Study 1: Diabetic Ketoacidosis (DKA)</h3>
        <p><strong>Patient:</strong> John D., 45-year-old male</p>
        <p className="text-gray-600">
          John, a long-time diabetic, presented to the ER with nausea, vomiting, and deep, rapid breathing. 
          Lab results showed high blood sugar (450 mg/dL), ketones in urine, and metabolic acidosis. 
          He was admitted to the ICU, given IV insulin, and stabilized over 24 hours.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>Recognizing early signs of DKA</li>
          <li>Emergency treatment with fluids and insulin</li>
          <li>Patient education on managing blood sugar levels</li>
        </ul>
      </div>

      {/* Case Study 2 */}
      <div className="mb-6 p-4 border-l-4 border-green-500 bg-green-100 rounded">
        <h3 className="text-xl font-semibold">📌 Case Study 2: Hypertension Management</h3>
        <p><strong>Patient:</strong> Susan M., 60-year-old female</p>
        <p className="text-gray-600">
          Susan was diagnosed with hypertension during a routine check-up. She had no symptoms but a BP of 160/95 mmHg. 
          Lifestyle changes and a low-dose medication were prescribed. At a follow-up, her BP had improved.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>Importance of regular BP monitoring</li>
          <li>Lifestyle changes vs. medication in managing hypertension</li>
          <li>Long-term health risks of uncontrolled BP</li>
        </ul>
      </div>

      {/* Case Study 3 */}
      <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-100 rounded">
        <h3 className="text-xl font-semibold">📌 Case Study 3: Pediatric Asthma Exacerbation</h3>
        <p><strong>Patient:</strong> 8-year-old boy, frequent asthma attacks</p>
        <p className="text-gray-600">
          A child with a history of asthma arrived at the clinic with severe wheezing and shortness of breath. 
          Oxygen therapy, nebulized bronchodilators, and steroids were administered. The child’s condition improved, 
          and he was discharged with an updated asthma action plan.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>Identifying asthma triggers</li>
          <li>Emergency response to an asthma attack</li>
          <li>Long-term management of pediatric asthma</li>
        </ul>
      </div>
    </div>
  );
};

export default CaseStudies;
