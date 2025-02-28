'use client';

import React from "react";

export default function MedicalInformation() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Medical History</label>
          <textarea className="w-full border p-2 rounded" rows={3} placeholder="Enter medical history"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Current Medications</label>
          <textarea className="w-full border p-2 rounded" rows={2} placeholder="Enter current medications"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Allergies</label>
          <input type="text" className="w-full border p-2 rounded" placeholder="Enter allergies" />
        </div>

        <div>
          <label className="block text-sm font-medium">Chronic Conditions</label>
          <input type="text" className="w-full border p-2 rounded" placeholder="Enter chronic conditions" />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
      </form>
    </div>
  );
}
