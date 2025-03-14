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

  const handleChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="grid grid-cols-2 gap-4 items-center col-span-2">
        {[
          ["Title", "title"],
          ["First Name", "firstName"],
          ["Middle Name", "middleName"],
          ["Last Name", "lastName"],
          ["Gender", "gender"],
          ["Preferred Name", "preferredName"],
          ["Date of Birth", "dob"],
          ["Marital Status", "maritalStatus"],
          ["Email", "email"],
          ["Phone Number", "phoneNumber"],
          ["Address", "address"],
          ["Emergency Contact Name", "emergencyContactName"],
          ["Emergency Contact Number", "emergencyContactNumber"],
        ].map(([label, name]) => (
          <div key={name} className="flex items-center gap-2">
            <label className={`text-sm font-medium w-40 ${["firstName", "lastName", "dob"].includes(name) ? "text-red-500" : ""}`}>{label}</label>
            {name === "dob" ? (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full text-gray-500">
                    {date ? format(date, "dd/MM/yyyy") : "Select Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setOpen(false);
                    }}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
            ) : name === "title" || name === "gender" || name === "maritalStatus" ? (
              <Select onValueChange={(value) => handleChange(value, name)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {name === "title" && ["Mr", "Mrs", "Miss"].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                    {name === "gender" && ["Male", "Female", "Other"].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                    {name === "maritalStatus" && ["Single", "Married"].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Input name={name} value={formData[name]} onChange={(e) => handleChange(e.target.value, name)} />
            )}
          </div>
        ))}
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
        <Button className="bg-blue-600 text-white">Next</Button>
        <Button className="bg-green-600 text-white">Update</Button>
        <Button className="bg-red-600 text-white">Delete</Button>
      </div>
    </div>
  );
}
