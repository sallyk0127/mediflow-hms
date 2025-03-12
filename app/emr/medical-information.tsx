"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Predefined suggestions for allergies and conditions
const allergySuggestionsList = ["Cold", "Cough", "Dust", "Pollen", "Peanuts", "Shellfish"];
const conditionSuggestionsList = ["Diabetes", "Hypertension", "Asthma", "Arthritis", "Chronic Pain"];

export default function MedicalInformation() {
  const router = useRouter();
  const [medicalHistory, setMedicalHistory] = useState("");
  const [medications, setMedications] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [allergySuggestions, setAllergySuggestions] = useState<string[]>([]);
  const [conditionSuggestions, setConditionSuggestions] = useState<string[]>([]);

  // Handle input change for allergies
  const handleAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAllergies(value);
    if (value) {
      const filteredSuggestions = allergySuggestionsList.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setAllergySuggestions(filteredSuggestions);
    } else {
      setAllergySuggestions([]);
    }
  };

  // Handle input change for conditions
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConditions(value);
    if (value) {
      const filteredSuggestions = conditionSuggestionsList.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setConditionSuggestions(filteredSuggestions);
    } else {
      setConditionSuggestions([]);
    }
  };

  // Handle form submission
  const handleUpdate = async () => {
    const medicalData = {
      history: medicalHistory,
      medications: medications,
      allergies: allergies,
      conditions: conditions,
    };

    try {
      const response = await fetch("/api/update-medical-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medicalData),
      });

      if (response.ok) {
        alert("Medical information updated successfully!");
      } else {
        alert("Error updating medical information.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("An error occurred while updating medical information.");
    }
  };

  // Clear form fields
  const handleDelete = () => {
    setMedicalHistory("");
    setMedications("");
    setAllergies("");
    setConditions("");
    alert("Medical information has been cleared!");
  };

  return (
    <div className="p-4">
      <form className="space-y-4">
        {/* Medical History */}
        <div>
          <label className="block text-sm font-medium">Medical History</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="Enter medical history"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
          />
        </div>

        {/* Current Medications */}
        <div>
          <label className="block text-sm font-medium">Current Medications</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={2}
            placeholder="Enter current medications"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
          />
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm font-medium">Allergies</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter allergies"
            value={allergies}
            onChange={handleAllergyChange}
          />
          {allergySuggestions.length > 0 && (
            <ul className="border border-gray-300 rounded mt-1">
              {allergySuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setAllergies(suggestion);
                    setAllergySuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chronic Conditions */}
        <div>
          <label className="block text-sm font-medium">Chronic Conditions</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter chronic conditions"
            value={conditions}
            onChange={handleConditionChange}
          />
          {conditionSuggestions.length > 0 && (
            <ul className="border border-gray-300 rounded mt-1">
              {conditionSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setConditions(suggestion);
                    setConditionSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => router.push("/next-section")}
          >
            Next
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}