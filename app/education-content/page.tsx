"use client";

import { useState } from "react";
import { FaBookOpen, FaChalkboardTeacher, FaHeartbeat, FaNewspaper } from "react-icons/fa";
import CaseStudies from "./case-studies";
import Training from "./training";
import Wellness from "./wellness";
import News from "./news";

export default function EducationContentPage() {
  const [activeTab, setActiveTab] = useState("Case Studies");

  const tabs = [
    { name: "Case Studies", icon: <FaBookOpen size={20} /> },
    { name: "Training", icon: <FaChalkboardTeacher size={20} /> },
    { name: "Wellness", icon: <FaHeartbeat size={20} /> },
    { name: "News", icon: <FaNewspaper size={20} /> },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">📚 Education Content</h1>
      <p className="text-gray-600 text-center mb-4">
        Explore a variety of educational materials, from medical case studies to staff training and wellness programs.
      </p>

      {/* Tabs Navigation */}
      <div className="flex justify-center space-x-6 border-b pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center space-x-2 px-4 py-2 text-lg font-medium rounded-md transition-all ${
              activeTab === tab.name ? "bg-blue-500 text-white shadow-md" : "text-gray-700 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Render Active Tab */}
      <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner">
        {activeTab === "Case Studies" && <CaseStudies />}
        {activeTab === "Training" && <Training />}
        {activeTab === "Wellness" && <Wellness />}
        {activeTab === "News" && <News />}
      </div>
    </div>
  );
}

