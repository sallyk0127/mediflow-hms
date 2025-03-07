import React from "react";

const News = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📰 Medical News & Updates</h2>
      <p className="mb-6 text-gray-700">
        Stay informed with the latest developments in healthcare, medical research, and industry news.
      </p>

      {/* News Item 1 */}
      <div className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-100 rounded">
        <h3 className="text-xl font-semibold">📌 New Breakthrough in Cancer Treatment</h3>
        <p className="text-gray-600">
          Researchers have discovered a promising new therapy that significantly improves cancer treatment outcomes.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>How the new drug works</li>
          <li>Clinical trials and results</li>
          <li>Potential side effects and availability</li>
        </ul>
      </div>

      {/* News Item 2 */}
      <div className="mb-6 p-4 border-l-4 border-green-500 bg-green-100 rounded">
        <h3 className="text-xl font-semibold">📌 AI in Healthcare: The Future of Diagnosis</h3>
        <p className="text-gray-600">
          Artificial intelligence is revolutionizing diagnostics by improving accuracy and reducing turnaround time.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>AI-powered tools in radiology</li>
          <li>Ethical concerns in AI diagnosis</li>
          <li>How AI is improving patient outcomes</li>
        </ul>
      </div>

      {/* News Item 3 */}
      <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-100 rounded">
        <h3 className="text-xl font-semibold">📌 Updates on COVID-19 Vaccines</h3>
        <p className="text-gray-600">
          A new booster shot has been introduced to improve immunity against emerging COVID-19 variants.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>Who should take the booster?</li>
          <li>Effectiveness against new variants</li>
          <li>Side effects and safety concerns</li>
        </ul>
      </div>
    </div>
  );
};

export default News;
