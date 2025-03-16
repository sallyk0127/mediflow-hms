import React from "react";

const Training = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">🎓 Staff Training Modules</h2>
      <p className="mb-6 text-gray-700">
        Enhance your medical knowledge and practical skills through structured training modules.
      </p>

      {/* Module 1 */}
      <div className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-100 rounded">
        <h3 className="text-xl font-semibold">📌 Basic Life Support (BLS) Certification</h3>
        <p className="text-gray-600">
          Learn essential life-saving techniques, including CPR, AED usage, and first aid for choking emergencies.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>Step-by-step CPR techniques</li>
          <li>Emergency response in cardiac arrest cases</li>
          <li>Legal considerations in providing BLS</li>
        </ul>
      </div>

      {/* Module 2 */}
      <div className="mb-6 p-4 border-l-4 border-green-500 bg-green-100 rounded">
        <h3 className="text-xl font-semibold">📌 Infection Control & Hygiene</h3>
        <p className="text-gray-600">
          Covers best practices for preventing hospital-acquired infections, including proper hand hygiene and PPE usage.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>Handwashing techniques and importance</li>
          <li>Proper disposal of medical waste</li>
          <li>Handling infectious diseases safely</li>
        </ul>
      </div>

      {/* Module 3 */}
      <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-100 rounded">
        <h3 className="text-xl font-semibold">📌 Patient Communication & Ethics</h3>
        <p className="text-gray-600">
          Effective communication techniques for healthcare professionals to improve patient care and build trust.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>Breaking bad news sensitively</li>
          <li>Dealing with difficult patients and families</li>
          <li>Maintaining confidentiality and ethical responsibilities</li>
        </ul>
      </div>
    </div>
  );
};

export default Training;
