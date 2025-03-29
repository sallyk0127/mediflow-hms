'use client';

import { useState } from "react";
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

export default function AdministrationInformation({ setSelectedTab }: { setSelectedTab: (value: string) => void }) {
  const [formData, setFormData] = useState<Record<string, string>>({
    medicareNumber: '',
    insuranceProvider: '',
    policyNumber: '',
    coverageType: '',
    billingAddress: '',
    paymentMethod: '',
    assignedRoom: '',
    Department: '',
    bedNumber: '',
    attendingDoctor: '',
  });

  const handleChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    console.log("Saved Form Data:", formData); 
    setSelectedTab("medical-information");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="grid grid-cols-2 gap-4 items-center col-span-2">
        {[
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
        ].map(([label, name]) => (
          <div key={name} className="flex items-center gap-2">
            <label className="text-sm font-medium w-40">{label}</label>
            {name === "coverageType" || name === "Department" ? (
              <Select onValueChange={(value) => handleChange(value, name)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {name === "coverageType" && ["Full", "Partial", "Copay"].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                    {name === "Department" && [
                      "Behaviour and Mental",
                      "ICU",
                      "Maternity Care",
                      "Medical Surgical",
                      "Senior Living"
                    ].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Input name={name} value={formData[name]} onChange={(e) => handleChange(e.target.value, name)} />
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
