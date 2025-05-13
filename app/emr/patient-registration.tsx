'use client';

import { useToast } from '@/components/hooks/use-toast';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useState } from 'react';

interface Props {
  patientData: Record<string, string>;
  handlePatientChange: (value: string, field: string) => void;
  setSelectedTab: (value: string) => void;
}

export default function PatientRegistration({ patientData, handlePatientChange, setSelectedTab }: Props) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(
    patientData.dob ? new Date(patientData.dob) : undefined
  );
  const [open, setOpen] = useState(false);

  const handleDateChange = (selected: Date | undefined) => {
    setDate(selected);
    if (selected) {
      handlePatientChange(format(selected, 'yyyy-MM-dd'), 'dob');
      setOpen(false);
    }
  };

  const handleNext = () => {
    if (!patientData.firstName || !patientData.lastName || !patientData.gender || !date) {
      toast({
        title: 'Error',
        description: 'First Name, Last Name, Gender and DOB are required.',
        variant: 'destructive',
      });
      return;
    }
    setSelectedTab('administration-information');
  };

  const fields = [
    { label: 'Title', field: 'title', type: 'select', options: ['Mr', 'Mrs', 'Miss', 'Ms', 'Mx', 'Sir', 'Dame', 'Dr', 'Cllr', 'Lady', 'Lord', 'General', 'Captain', 'Father', 'Doctor', 'Earl'] },
    { label: 'First Name', field: 'firstName', required: true },
    { label: 'Middle Name', field: 'middleName' },
    { label: 'Last Name', field: 'lastName', required: true },
    { label: 'Preferred Name', field: 'preferredName' },
    { label: 'Date of Birth', field: 'dob', type: 'date', required: true },
    { label: 'Gender', field: 'gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
    { label: 'Marital Status', field: 'maritalStatus', type: 'select', options: ['Single', 'Married', 'Widowed', 'Divorced', 'Separated', 'Registered partnership'] },
    { label: 'Email', field: 'email' },
    { label: 'Phone Number', field: 'phoneNumber' },
    { label: 'Address', field: 'address' },
    { label: 'Emergency Contact Name', field: 'emergencyContactName' },
    { label: 'Emergency Contact Number', field: 'emergencyContactNumber' },
    { label: 'Billing Note', field: 'billingNote' },
    { label: 'Previous Names', field: 'previousNames' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="grid grid-cols-2 gap-4 items-center col-span-2">
        {fields.map(({ label, field, type, options, required }) => (
          <div key={field} className="flex items-center gap-2">
            <label className={`text-sm font-medium w-40 ${required ? 'text-red-500' : ''}`}>{label}</label>
            {type === 'select' ? (
              <Select value={patientData[field] || ''} onValueChange={(val) => handlePatientChange(val, field)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options?.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : type === 'date' ? (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full text-gray-500">
                    {date ? format(date, 'dd/MM/yyyy') : `Select ${label}`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar mode="single" selected={date} onSelect={handleDateChange} />
                </PopoverContent>
              </Popover>
            ) : (
              <Input value={patientData[field] || ''} onChange={(e) => handlePatientChange(e.target.value, field)} />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-6 col-span-2">
        <Button className="bg-blue-600 text-white" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
