'use client';

import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { format } from 'date-fns';

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
  const [date, setDate] = useState<Date | undefined>();

  const handleChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
      <Select onValueChange={(value) => handleChange(value, 'title')}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Title" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Mr">Mr</SelectItem>
            <SelectItem value="Mrs">Mrs</SelectItem>
            <SelectItem value="Miss">Miss</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input name="firstName" placeholder="First Name*" required value={formData.firstName} onChange={(e) => handleChange(e.target.value, 'firstName')} />
      <Input name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={(e) => handleChange(e.target.value, 'middleName')} />
      <Input name="lastName" placeholder="Last Name*" required value={formData.lastName} onChange={(e) => handleChange(e.target.value, 'lastName')} />
      <Select onValueChange={(value) => handleChange(value, 'gender')}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input name="preferredName" placeholder="Preferred Name" value={formData.preferredName} onChange={(e) => handleChange(e.target.value, 'preferredName')} />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            {date ? format(date, "dd/MM/yyyy") : "Date of Birth"}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar mode="single" selected={date} onSelect={setDate} captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear()} />
        </PopoverContent>
      </Popover>
      <Select onValueChange={(value) => handleChange(value, 'maritalStatus')}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Marital Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Single">Single</SelectItem>
            <SelectItem value="Married">Married</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={(e) => handleChange(e.target.value, 'email')} />
      <Input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => handleChange(e.target.value, 'phoneNumber')} />
      <Input name="address" placeholder="Address" value={formData.address} onChange={(e) => handleChange(e.target.value, 'address')} />
      <Input name="emergencyContactName" placeholder="Emergency Contact Name" value={formData.emergencyContactName} onChange={(e) => handleChange(e.target.value, 'emergencyContactName')} />
      <Input name="emergencyContactNumber" placeholder="Emergency Contact Number" value={formData.emergencyContactNumber} onChange={(e) => handleChange(e.target.value, 'emergencyContactNumber')} />
      <Input name="billingNote" placeholder="Billing Note" value={formData.billingNote} onChange={(e) => handleChange(e.target.value, 'billingNote')} />
      <Input name="previousNames" placeholder="Previous Names" value={formData.previousNames} onChange={(e) => handleChange(e.target.value, 'previousNames')} />
      <div className="flex justify-end gap-2 mt-6">
        <Button className="bg-blue-600 text-white">Next</Button>
        <Button className="bg-green-600 text-white">Update</Button>
        <Button className="bg-red-600 text-white">Delete</Button>
      </div>
    </div>
  );
}
