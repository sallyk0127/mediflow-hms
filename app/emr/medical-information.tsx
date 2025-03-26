"use client";

import React, { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/hooks/use-toast' 

// Predefined suggestions for allergies and conditions
const allergySuggestionsList = ["Cold", "Cough", "Dust", "Pollen", "Peanuts", "Shellfish"];
const conditionSuggestionsList = ["Diabetes", "Hypertension", "Asthma", "Arthritis", "Chronic Pain"];

export default function MedicalInformation() {
  const [medicalHistory, setMedicalHistory] = useState("");
  const [medications, setMedications] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [allergySuggestions, setAllergySuggestions] = useState<string[]>([]);
  const [conditionSuggestions, setConditionSuggestions] = useState<string[]>([]);

  const handleAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAllergies(value);
    setAllergySuggestions(value ? allergySuggestionsList.filter(item => item.toLowerCase().startsWith(value.toLowerCase())) : []);
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConditions(value);
    setConditionSuggestions(value ? conditionSuggestionsList.filter(item => item.toLowerCase().startsWith(value.toLowerCase())) : []);
  };

  const { toast } = useToast();


  
  const handleSubmit = () => {  
      toast({
        title: 'Submitted',
        description: 'Patient Registered Successfully',
      });

  
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Medical History */}
      <div className="col-span-2">
        <label className="text-sm font-medium">Medical History</label>
        <textarea
          className="w-full border p-2 rounded mt-1"
          rows={3}
          placeholder="Enter medical history"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
        />
      </div>

      {/* Current Medications */}
      <div className="col-span-2">
        <label className="text-sm font-medium">Current Medications</label>
        <textarea
          className="w-full border p-2 rounded mt-1"
          rows={2}
          placeholder="Enter current medications"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
        />
      </div>

      {/* Allergies */}
      <div className="col-span-2">
        <label className="text-sm font-medium">Allergies</label>
        <Input
          name="allergies"
          value={allergies}
          onChange={handleAllergyChange}
          placeholder="Enter allergies"
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
      <div className="col-span-2">
        <label className="text-sm font-medium">Chronic Conditions</label>
        <Input
          name="conditions"
          value={conditions}
          onChange={handleConditionChange}
          placeholder="Enter chronic conditions"
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

      <div className="flex justify-end gap-2 mt-6 col-span-2">
        <Button className="bg-blue-600 text-white" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
