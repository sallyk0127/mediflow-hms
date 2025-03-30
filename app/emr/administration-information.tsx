'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  patientData: Record<string, string>;
  handlePatientChange: (value: string, field: string) => void;
  setSelectedTab: (value: string) => void;
}

export default function AdministrationInformation({
  patientData,
  handlePatientChange,
  setSelectedTab,
}: Props) {
  const handleNext = () => {
    console.log("Saved Admin Form Data:", patientData);
    setSelectedTab("medical-information");
  };

  const fields: [string, string][] = [
    ["Medicare Number", "medicareNumber"],
    ["Insurance Provider", "insuranceProvider"],
    ["Policy Number", "policyNumber"],
    ["Coverage Type", "coverageType"],
    ["Billing Address", "billingAddress"],
    ["Payment Method", "paymentMethod"],
    ["Assigned Room", "assignedRoom"],
    ["Department", "Department"],
    ["Bed Number", "bedNumber"],
    ["Attending Doctor", "attendingDoctor"],
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="grid grid-cols-2 gap-4 items-center col-span-2">
        {fields.map(([label, name]) => (
          <div key={name} className="flex items-center gap-2">
            <label className="text-sm font-medium w-40">{label}</label>
            {(name === "coverageType" || name === "Department") ? (
              <Select
                value={patientData[name] || ''}
                onValueChange={(value) => handlePatientChange(value, name)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {name === "coverageType" &&
                      ["Full", "Partial", "Copay"].map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    {name === "Department" &&
                      ["Behaviour and Mental", "ICU", "Maternity Care", "Medical Surgical", "Senior Living"].map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Input
                name={name}
                value={patientData[name] || ''}
                onChange={(e) => handlePatientChange(e.target.value, name)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 mt-6 col-span-2">
        <Button className="bg-blue-600 text-white" onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
