import React, { useState } from "react";

const CaseStudies = () => {
  const [expandedCase, setExpandedCase] = useState(null);

  const toggleExpand = (caseId) => {
    setExpandedCase(expandedCase === caseId ? null : caseId); // Toggle between expanding and collapsing
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Medical Case Studies</h2>
      <p className="mb-6 text-gray-700">
        Explore real-world case studies to enhance learning and practical understanding.
      </p>

      {/* Case Study 1 */}
      <div className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-100 rounded">
        <h3 className="text-xl font-semibold">Case Study 1: Diabetic Ketoacidosis (DKA)</h3>
        <p><strong>Patient:</strong> John D., 45-year-old male</p>
        
        {/* Show preview of the content */}
        <div className="text-gray-600">
          {expandedCase === 1 ? (
            <>
              John, a long-time diabetic, presented to the ER with nausea, vomiting, and deep, rapid breathing. 
              Lab results showed high blood sugar (450 mg/dL), ketones in urine, and metabolic acidosis. 
              He was admitted to the ICU, given IV insulin, and stabilized over 24 hours.
              <div className="mt-2 list-disc pl-6 text-gray-700">
                <ul>
                  <li>Recognizing early signs of DKA</li>
                  <li>Emergency treatment with fluids and insulin</li>
                  <li>Patient education on managing blood sugar levels</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              John, a long-time diabetic, presented to the ER with nausea, vomiting, and deep, rapid breathing. 
              Lab results showed high blood sugar (450 mg/dL), ketones in urine, and metabolic acidosis. 
              <span className="text-blue-600 cursor-pointer" onClick={() => toggleExpand(1)}>
                Read more...
              </span>
            </>
          )}
        </div>
      </div>

      {/* Case Study 2 */}
      <div className="mb-6 p-4 border-l-4 border-green-500 bg-green-100 rounded">
        <h3 className="text-xl font-semibold">Case Study 2: Hypertension Management</h3>
        <p><strong>Patient:</strong> Susan M., 60-year-old female</p>
        
        {/* Show preview of the content */}
        <div className="text-gray-600">
          {expandedCase === 2 ? (
            <>
              Susan was diagnosed with hypertension during a routine check-up. She had no symptoms but a BP of 160/95 mmHg. 
              Lifestyle changes and a low-dose medication were prescribed. At a follow-up, her BP had improved.
              <div className="mt-2 list-disc pl-6 text-gray-700">
                <ul>
                  <li>Importance of regular BP monitoring</li>
                  <li>Lifestyle changes vs. medication in managing hypertension</li>
                  <li>Long-term health risks of uncontrolled BP</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              Susan was diagnosed with hypertension during a routine check-up. She had no symptoms but a BP of 160/95 mmHg. 
              <span className="text-blue-600 cursor-pointer" onClick={() => toggleExpand(2)}>
                Read more...
              </span>
            </>
          )}
        </div>
      </div>

      {/* Case Study 3 */}
      <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-100 rounded">
        <h3 className="text-xl font-semibold">Case Study 3: Pediatric Asthma Exacerbation</h3>
        <p><strong>Patient:</strong> 8-year-old boy, frequent asthma attacks</p>
        
        {/* Show preview of the content */}
        <div className="text-gray-600">
          {expandedCase === 3 ? (
            <>
              A child with a history of asthma arrived at the clinic with severe wheezing and shortness of breath. 
              Oxygen therapy, nebulized bronchodilators, and steroids were administered. The child’s condition improved, 
              and he was discharged with an updated asthma action plan.
              <div className="mt-2 list-disc pl-6 text-gray-700">
                <ul>
                  <li>Identifying asthma triggers</li>
                  <li>Emergency response to an asthma attack</li>
                  <li>Long-term management of pediatric asthma</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              A child with a history of asthma arrived at the clinic with severe wheezing and shortness of breath. 
              <span className="text-blue-600 cursor-pointer" onClick={() => toggleExpand(3)}>
                Read more...
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
