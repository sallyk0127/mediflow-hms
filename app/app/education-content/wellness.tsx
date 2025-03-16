import React from "react";

const Wellness = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">💖 Health & Wellness</h2>
      <p className="mb-6 text-gray-700">
        Tips and guides for maintaining a healthy lifestyle, reducing stress, and improving overall well-being.
      </p>

      {/* Wellness Tip 1 */}
      <div className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-100 rounded">
        <h3 className="text-xl font-semibold">📌 Nutrition & Healthy Eating</h3>
        <p className="text-gray-600">
          A balanced diet plays a crucial role in preventing chronic diseases and maintaining overall health.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>Best foods for heart health</li>
          <li>Importance of hydration</li>
          <li>Meal planning for busy professionals</li>
        </ul>
      </div>

      {/* Wellness Tip 2 */}
      <div className="mb-6 p-4 border-l-4 border-green-500 bg-green-100 rounded">
        <h3 className="text-xl font-semibold">📌 Managing Stress & Mental Well-being</h3>
        <p className="text-gray-600">
          Learn stress management techniques to improve focus, productivity, and emotional resilience.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>Mindfulness meditation exercises</li>
          <li>How to balance work and personal life</li>
          <li>Recognizing and coping with burnout</li>
        </ul>
      </div>

      {/* Wellness Tip 3 */}
      <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-100 rounded">
        <h3 className="text-xl font-semibold">📌 Importance of Sleep & Recovery</h3>
        <p className="text-gray-600">
          Quality sleep is essential for brain function, immunity, and overall health. Learn how to improve your sleep.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700">
          <li>How screen time affects sleep</li>
          <li>Creating a sleep-friendly environment</li>
          <li>Benefits of power naps</li>
        </ul>
      </div>
    </div>
  );
};

export default Wellness;
