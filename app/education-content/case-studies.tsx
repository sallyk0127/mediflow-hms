import React, { useState } from 'react';

const CaseStudies: React.FC = () => {
  // State to track expanded case study
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<number | null>(null);

  // Toggle function to expand/collapse content
  const toggleExpand = (id: number) => {
    setExpandedCaseStudy(expandedCaseStudy === id ? null : id);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📚 Medical Case Studies</h2>
      <p className="mb-6 text-gray-700">
        Explore real-world case studies to enhance learning and practical understanding.
      </p>

      {/* Case Study 1 */}
      <div className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-100 rounded">
        <h3 className="text-xl font-semibold">Case Study 1: Diabetic Ketoacidosis (DKA)</h3>
        <p><strong>Patient:</strong> John D., 45-year-old male</p>
        <p className="text-gray-600">
          John, a long-time diabetic, presented to the ER with nausea, vomiting, and deep, rapid breathing. 
          His lab results showed a blood sugar level of 450 mg/dL, high ketones in urine, and metabolic acidosis. 
          John was admitted to the ICU, where he was given IV insulin and fluids, stabilizing over 24 hours.
        </p>
        
        {/* Conditionally render full content if expanded */}
        {expandedCaseStudy === 1 && (
          <>
            <p className="text-gray-600">
              Early recognition of Diabetic Ketoacidosis (DKA) is critical. If untreated, it can lead to severe complications, including organ failure or coma.
            </p>
            <ul className="mt-2 list-disc pl-6 text-gray-700">
              <li>Recognizing the early signs of DKA such as nausea, vomiting, and rapid breathing.</li>
              <li>Emergency treatment involves IV fluids and insulin administration.</li>
              <li>Patient education on managing blood sugar levels and recognizing warning signs to prevent future episodes.</li>
            </ul>
          </>
        )}
        
        {/* Read More button */}
        <button
          onClick={() => toggleExpand(1)}
          className="text-blue-500 mt-2"
        >
          {expandedCaseStudy === 1 ? 'Show Less' : 'Read More'}
        </button>
      </div>

      {/* Case Study 2 */}
      <div className="mb-6 p-4 border-l-4 border-green-500 bg-green-100 rounded">
        <h3 className="text-xl font-semibold">Case Study 2: Hypertension Management</h3>
        <p><strong>Patient:</strong> Susan M., 60-year-old female</p>
        <p className="text-gray-600">
          Susan was diagnosed with hypertension during a routine check-up. Despite having no noticeable symptoms, her blood pressure was recorded at 160/95 mmHg. 
          Lifestyle changes including a balanced diet and exercise were recommended, and a low-dose medication was prescribed.
        </p>
        
        {/* Conditionally render full content if expanded */}
        {expandedCaseStudy === 2 && (
          <>
            <p className="text-gray-600">
              Managing hypertension early can help prevent severe complications such as stroke or heart attack. Regular monitoring and lifestyle changes play a crucial role.
            </p>
            <ul className="mt-2 list-disc pl-6 text-gray-700">
              <li>Importance of regular blood pressure monitoring, especially when no symptoms are present.</li>
              <li>Lifestyle modifications such as diet and exercise can help reduce blood pressure.</li>
              <li>Medication may be required when lifestyle changes alone are not sufficient.</li>
            </ul>
          </>
        )}
        
        {/* Read More button */}
        <button
          onClick={() => toggleExpand(2)}
          className="text-blue-500 mt-2"
        >
          {expandedCaseStudy === 2 ? 'Show Less' : 'Read More'}
        </button>
      </div>

      {/* Case Study 3 */}
      <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-100 rounded">
        <h3 className="text-xl font-semibold">Case Study 3: Pediatric Asthma Exacerbation</h3>
        <p><strong>Patient:</strong> 8-year-old boy, frequent asthma attacks</p>
        <p className="text-gray-600">
          An 8-year-old child with a history of asthma arrived at the clinic with severe wheezing and shortness of breath. 
          Oxygen therapy, nebulized bronchodilators, and steroids were administered. The child's condition improved after treatment.
        </p>
        
        {/* Conditionally render full content if expanded */}
        {expandedCaseStudy === 3 && (
          <>
            <p className="text-gray-600">
              Asthma exacerbations can be managed with quick interventions, but it is crucial to identify triggers and develop an action plan.
            </p>
            <ul className="mt-2 list-disc pl-6 text-gray-700">
              <li>Identifying common asthma triggers such as allergens or respiratory infections.</li>
              <li>Immediate treatment with bronchodilators and steroids can relieve symptoms during an exacerbation.</li>
              <li>Developing a personalized asthma action plan for managing future attacks and preventing hospital visits.</li>
            </ul>
          </>
        )}
        
        {/* Read More button */}
        <button
          onClick={() => toggleExpand(3)}
          className="text-blue-500 mt-2"
        >
          {expandedCaseStudy === 3 ? 'Show Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default CaseStudies;
