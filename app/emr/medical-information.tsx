'use client';

import React from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/hooks/use-toast';

const allergySuggestionsList = ["Cold", "Cough", "Dust", "Pollen", "Peanuts", "Shellfish"];
const conditionSuggestionsList = ["Diabetes", "Hypertension", "Asthma", "Arthritis", "Chronic Pain"];

interface Props {
  patientData: Record<string, string>;
  handlePatientChange: (value: string, field: string) => void;
}

export default function MedicalInformation({
  patientData,
  handlePatientChange,
}: Props) {
  const { toast } = useToast();

  const handleSuggest = (value: string, list: string[]) => {
    return value
      ? list.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
      : [];
  };

  const handleSubmit = () => {
    toast({
      title: 'Submitted',
      description: 'Patient Registered Successfully',
    });
    console.log('Full Patient Data:', patientData); // Debugging output
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="col-span-2">
        <label className="text-sm font-medium">Medical History</label>
        <textarea
          className="w-full border p-2 rounded mt-1"
          rows={3}
          placeholder="Enter medical history"
          value={patientData.medicalHistory || ''}
          onChange={(e) => handlePatientChange(e.target.value, 'medicalHistory')}
        />
      </div>

      <div className="col-span-2">
        <label className="text-sm font-medium">Current Medications</label>
        <textarea
          className="w-full border p-2 rounded mt-1"
          rows={2}
          placeholder="Enter current medications"
          value={patientData.medications || ''}
          onChange={(e) => handlePatientChange(e.target.value, 'medications')}
        />
      </div>

      <div className="col-span-2">
        <label className="text-sm font-medium">Allergies</label>
        <Input
          name="allergies"
          value={patientData.allergies || ''}
          onChange={(e) => handlePatientChange(e.target.value, 'allergies')}
          placeholder="Enter allergies"
        />
        {handleSuggest(patientData.allergies || '', allergySuggestionsList).length > 0 && (
          <ul className="border border-gray-300 rounded mt-1">
            {handleSuggest(patientData.allergies || '', allergySuggestionsList).map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handlePatientChange(suggestion, 'allergies')}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="col-span-2">
        <label className="text-sm font-medium">Chronic Conditions</label>
        <Input
          name="conditions"
          value={patientData.conditions || ''}
          onChange={(e) => handlePatientChange(e.target.value, 'conditions')}
          placeholder="Enter chronic conditions"
        />
        {handleSuggest(patientData.conditions || '', conditionSuggestionsList).length > 0 && (
          <ul className="border border-gray-300 rounded mt-1">
            {handleSuggest(patientData.conditions || '', conditionSuggestionsList).map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handlePatientChange(suggestion, 'conditions')}
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
