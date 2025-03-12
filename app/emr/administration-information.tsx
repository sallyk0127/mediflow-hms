"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { useState } from 'react';

export default function PatientInsuranceAndRoomDetails() {
  const [formData, setFormData] = useState({
    insuranceProvider: '',
    policyNumber: '',
    coverageType: '',
    billingAddress: '',
    paymentMethod: '',
    roomNumber: '',
    wardDepartment: '',
    bedNumber: '',
    attendingDoctor: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
      <Input name="insuranceProvider" placeholder="Insurance Provider" value={formData.insuranceProvider} onChange={(e) => handleChange("insuranceProvider", e.target.value)} />
      <Input name="policyNumber" placeholder="Policy Number" value={formData.policyNumber} onChange={(e) => handleChange("policyNumber", e.target.value)} />
      
      <Select onValueChange={(value) => handleChange("coverageType", value)}>
        <SelectTrigger>{formData.coverageType || "Select Coverage Type"}</SelectTrigger>
        <SelectContent>
          <SelectItem value="Full">Full</SelectItem>
          <SelectItem value="Partial">Partial</SelectItem>
          <SelectItem value="Copay">Copay</SelectItem>
        </SelectContent>
      </Select>
      
      <Input name="billingAddress" placeholder="Billing Address" value={formData.billingAddress} onChange={(e) => handleChange("billingAddress", e.target.value)} />
      <Input name="paymentMethod" placeholder="Payment Method" value={formData.paymentMethod} onChange={(e) => handleChange("paymentMethod", e.target.value)} />
      <Input name="roomNumber" placeholder="Assigned Room Number" value={formData.roomNumber} onChange={(e) => handleChange("roomNumber", e.target.value)} />
      
      <Select onValueChange={(value) => handleChange("wardDepartment", value)}>
        <SelectTrigger>{formData.wardDepartment || "Select Ward Department"}</SelectTrigger>
        <SelectContent>
          <SelectItem value="ICU">ICU</SelectItem>
          <SelectItem value="General">General</SelectItem>
          <SelectItem value="Maternity">Maternity</SelectItem>
          <SelectItem value="Surgical">Surgical</SelectItem>
          <SelectItem value="Pediatrics">Pediatrics</SelectItem>
          <SelectItem value="Psychiatry">Psychiatry</SelectItem>
        </SelectContent>
      </Select>
      
      <Input name="bedNumber" placeholder="Bed Number" value={formData.bedNumber} onChange={(e) => handleChange("bedNumber", e.target.value)} />
      <Input name="attendingDoctor" placeholder="Attending Doctor" value={formData.attendingDoctor} onChange={(e) => handleChange("attendingDoctor", e.target.value)} />
      
      <div className="flex justify-end gap-2 mt-6">
        <Button className="bg-blue-600 text-white">Save</Button>
        <Button className="bg-green-600 text-white">Update</Button>
        <Button className="bg-red-600 text-white">Delete</Button>
      </div>
    </div>
  );
}
