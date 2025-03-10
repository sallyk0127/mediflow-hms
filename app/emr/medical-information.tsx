"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function MedicalInformation() {
  const router = useRouter();
  const [medicalHistory, setMedicalHistory] = useState("");
  const [medications, setMedications] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");

  const handleNext = () => {
    router.push("/next-section"); // Change to your actual route
  };

  const handleUpdate = async () => {
    const medicalData = {
      history: medicalHistory,
      medications: medications,
      allergies: allergies,
      conditions: conditions,
    };

    console.log("Updating medical information:", medicalData);

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
    }
  };

  const handleDelete = () => {
    setMedicalHistory("");
    setMedications("");
    setAllergies("");
    setConditions("");

    console.log("Medical information deleted");
    alert("Medical information has been cleared!");
  };

  return (
    <div className="p-6">
      <form className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium">Allergies</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter allergies"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Chronic Conditions</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter chronic conditions"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleNext}>
            Next
          </button>
          <button type="button" className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}


