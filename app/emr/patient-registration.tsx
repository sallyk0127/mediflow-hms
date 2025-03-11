'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import { useState } from 'react';

export default function PatientRegistration() {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    preferredName: '',
    dob: '',
    maritalStatus: '',
    email: '',
    phoneNumber: '',
    address: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    billingNote: '',
    previousNames: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
      <Select name="title" value={formData.title} onChange={handleChange}>
        <SelectItem value="Mr">Mr</SelectItem>
        <SelectItem value="Mrs">Mrs</SelectItem>
        <SelectItem value="Miss">Miss</SelectItem>
      </Select>
      <Input name="firstName" placeholder="First Name*" required value={formData.firstName} onChange={handleChange} />
      <Input name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
      <Input name="lastName" placeholder="Last Name*" required value={formData.lastName} onChange={handleChange} />
      <Select name="gender" value={formData.gender} onChange={handleChange}>
        <SelectItem value="Male">Male</SelectItem>
        <SelectItem value="Female">Female</SelectItem>
        <SelectItem value="Other">Other</SelectItem>
      </Select>
      <Input name="preferredName" placeholder="Preferred Name" value={formData.preferredName} onChange={handleChange} />
      <Input name="dob" type="date" placeholder="Date of Birth*" required value={formData.dob} onChange={handleChange} />
      <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
        <SelectItem value="Single">Single</SelectItem>
        <SelectItem value="Married">Married</SelectItem>
      </Select>
      <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <Input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
      <Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
      <Input name="emergencyContactName" placeholder="Emergency Contact Name" value={formData.emergencyContactName} onChange={handleChange} />
      <Input name="emergencyContactNumber" placeholder="Emergency Contact Number" value={formData.emergencyContactNumber} onChange={handleChange} />
      <Input name="billingNote" placeholder="Billing Note" value={formData.billingNote} onChange={handleChange} />
      <Input name="previousNames" placeholder="Previous Names" value={formData.previousNames} onChange={handleChange} />
      <div className="flex justify-end gap-2 mt-6">
        <Button className="bg-blue-600 text-white">Next</Button>
        <Button className="bg-green-600 text-white">Update</Button>
        <Button className="bg-red-600 text-white">Delete</Button>
      </div>
    </div>
  );
}
