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
import { useToast } from '@/components/hooks/use-toast' 

export default function PatientRegistration({ setSelectedTab }: { setSelectedTab: (value: string) => void }) {
  const [formData, setFormData] = useState<Record<string, string>>({
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
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!formData.firstName || !formData.lastName || !date) {  
      toast({
        title: 'Error',
        description: 'First Name, Last Name, and Date of Birth are required.',
        variant: 'destructive', // This is optional but useful to show an error toast
      }); 
      return;
    }
    console.log("Saved Form Data:", formData); 
    setSelectedTab("administration-information");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="grid grid-cols-2 gap-4 items-center col-span-2">

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40">Title</label>
          <Select onValueChange={(value) => handleChange(value, 'title')}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select Title" /></SelectTrigger>
            <SelectContent><SelectGroup>
              {['Mr', 'Mrs', 'Miss', 'Ms', 'Mx', 'Sir', 'Dame', 'Dr', 'Cllr', 'Lady', 'Lord', 'General', 'Captain', 'Father', 'Doctor', 'Earl'].map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectGroup></SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40 text-red-500">First Name</label>
          <Input name="firstName" value={formData.firstName} onChange={(e) => handleChange(e.target.value, 'firstName')} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40">Middle Name</label>
          <Input name="middleName" value={formData.middleName} onChange={(e) => handleChange(e.target.value, 'middleName')} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40 text-red-500">Last Name</label>
          <Input name="lastName" value={formData.lastName} onChange={(e) => handleChange(e.target.value, 'lastName')} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40">Preferred Name</label>
          <Input name="preferredName" value={formData.preferredName} onChange={(e) => handleChange(e.target.value, 'preferredName')} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40">Gender</label>
          <Select onValueChange={(value) => handleChange(value, 'gender')}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select Gender" /></SelectTrigger>
            <SelectContent><SelectGroup>
              {['Male', 'Female', 'Other'].map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectGroup></SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40 text-red-500">Date of Birth</label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-gray-500">{date ? format(date, "dd/MM/yyyy") : "Select Date"}</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40">Marital Status</label>
          <Select onValueChange={(value) => handleChange(value, 'maritalStatus')}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select Marital Status" /></SelectTrigger>
            <SelectContent><SelectGroup>
              {['Single', 'Married', 'Widowed', 'Divorced', 'Separated', 'Registered partnership'].map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectGroup></SelectContent>
          </Select>
        </div>
      </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40">Email</label>
          <Input name="email" value={formData.email} onChange={(e) => handleChange(e.target.value, 'email')} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40">Phone Number</label>
          <Input name="phoneNumber" value={formData.phoneNumber} onChange={(e) => handleChange(e.target.value, 'phoneNumber')} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40">Address</label>
          <Input name="address" value={formData.address} onChange={(e) => handleChange(e.target.value, 'address')} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40">Emergency Contact Name</label>
          <Input name="emergencyContactName" value={formData.emergencyContactName} onChange={(e) => handleChange(e.target.value, 'emergencyContactName')} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-40">Emergency Contact Number</label>
          <Input name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={(e) => handleChange(e.target.value, 'emergencyContactNumber')} />
        </div>

      <div className="col-span-2">
        <label className="text-sm font-medium">Billing Note</label>
        <Input name="billingNote" value={formData.billingNote} onChange={(e) => handleChange(e.target.value, 'billingNote')} />
      </div>

      <div className="col-span-2">
        <label className="text-sm font-medium">Previous Names</label>
        <Input name="previousNames" value={formData.previousNames} onChange={(e) => handleChange(e.target.value, 'previousNames')} />
      </div>

      <div className="flex justify-end gap-2 mt-6 col-span-2">
        <Button className="bg-blue-600 text-white" onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
