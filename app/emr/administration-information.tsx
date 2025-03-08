'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import { useState } from 'react';

export default function AdministrationInformation() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Input name="insuranceProvider" placeholder="Insurance Provider" value={formData.insuranceProvider} onChange={handleChange} />
      <Input name="policyNumber" placeholder="Policy Number" value={formData.policyNumber} onChange={handleChange} />
      
      <Select name="coverageType" value={formData.coverageType} onChange={handleChange}>
        <SelectItem value="Full">Full</SelectItem>
        <SelectItem value="Partial">Partial</SelectItem>
        <SelectItem value="Copay">Copay</SelectItem>
      </Select>
      
      <Input name="billingAddress" placeholder="Billing Address" value={formData.billingAddress} onChange={handleChange} />
      <Input name="paymentMethod" placeholder="Payment Method" value={formData.paymentMethod} onChange={handleChange} />
      <Input name="roomNumber" placeholder="Assigned Room Number" value={formData.roomNumber} onChange={handleChange} />
      
      <Select name="wardDepartment" value={formData.wardDepartment} onChange={handleChange}>
        <SelectItem value="ICU">ICU</SelectItem>
        <SelectItem value="General">General</SelectItem>
        <SelectItem value="Maternity">Maternity</SelectItem>
        <SelectItem value="Surgical">Surgical</SelectItem>
        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
        <SelectItem value="Psychiatry">Psychiatry</SelectItem>
      </Select>
      
      <Input name="bedNumber" placeholder="Bed Number" value={formData.bedNumber} onChange={handleChange} />
      <Input name="attendingDoctor" placeholder="Attending Doctor" value={formData.attendingDoctor} onChange={handleChange} />
      
      <div className="flex justify-end gap-2 mt-6">
        <Button className="bg-blue-600 text-white">Save</Button>
        <Button className="bg-green-600 text-white">Update</Button>
        <Button className="bg-red-600 text-white">Delete</Button>
      </div>
    </div>
  );
}
