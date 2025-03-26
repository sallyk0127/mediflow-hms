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
  const [formData, setFormData] = useState<Record<string, any>>({
    medicareNumber: '',
    insuranceProvider: '',
    policyNumber: '',
    coverageType: '',
    billingAddress: '',
    paymentMethod: '',
    roomNumber: null,
    wardDepartment: '',
    bedNumber: null,
    attendingDoctor: '',
  });

  const handleChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumericChange = (value: string, name: string) => {
    const numericValue = value ? parseInt(value, 10) : null; // Convert to number or null
    setFormData((prev) => ({ ...prev, [name]: numericValue }));
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
          ["Assigned Room Number", "roomNumber"],
          ["Ward Department", "wardDepartment"],
          ["Bed Number", "bedNumber"],
          ["Attending Doctor", "attendingDoctor"],
        ].map(([label, name]) => (
          <div key={name} className="flex items-center gap-2">
            <label className="text-sm font-medium w-40">{label}</label>
            {name === "coverageType" || name === "wardDepartment" ? (
              <Select onValueChange={(value) => handleChange(value, name)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {name === "coverageType" && ["Full", "Partial", "Copay"].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                    {name === "wardDepartment" && ["ICU", "General", "Maternity", "Surgical", "Pediatrics", "Psychiatry"].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : name === "roomNumber" || name === "bedNumber" ? (
              <Input 
                name={name} 
                type="number" 
                value={formData[name] || ''} 
                onChange={(e) => handleNumericChange(e.target.value, name)} 
              />
            ) : (
              <Input 
                name={name} 
                value={formData[name]} 
                onChange={(e) => handleChange(e.target.value, name)} 
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
