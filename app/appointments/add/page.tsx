"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const departmentDoctors = {
  "Cardiology": [
    "Dr. Ethan Wright (Interventional Cardiologist)",
    "Dr. Sophia Chen (Electrophysiologist)",
    "Dr. Marcus Reynolds (Cardiac Surgeon)"
  ],
  "Neurology": [
    "Dr. Olivia Park (Movement Disorder Specialist)",
    "Dr. Nathan Brooks (Epileptologist)",
    "Dr. Aisha Khan (Neuroimmunologist)"
  ],
  "Pediatrics": [
    "Dr. Liam Foster (General Pediatrician)",
    "Dr. Isabella Wong (Pediatric Cardiologist)",
    "Dr. Caleb Rivera (Pediatric Neurologist)"
  ],
  "Orthopedics": [
    "Dr. Hannah Pierce (Sports Medicine)",
    "Dr. Derek Coleman (Spinal Surgeon)",
    "Dr. Zoe Ramirez (Joint Replacement Specialist)"
  ],
  "Oncology": [
    "Dr. Evelyn Shaw (Medical Oncologist)",
    "Dr. Julian Torres (Radiation Oncologist)",
    "Dr. Naomi Patel (Hematologist)"
  ],
  "Gastroenterology": [
    "Dr. Vincent Cho (Hepatologist)",
    "Dr. Audrey Simmons (Endoscopist)",
    "Dr. Dominic Ferraro (IBD Specialist)"
  ],
  "Pulmonology": [
    "Dr. Samantha Hughes (Critical Care)",
    "Dr. Theodore Grant (Sleep Medicine)",
    "Dr. Priya Malhotra (Interventional Pulmonologist)"
  ],
  "Endocrinology": [
    "Dr. Daniel Kim (Diabetologist)",
    "Dr. Rachel Nguyen (Thyroid Specialist)",
    "Dr. Gabriel Silva (Metabolic Bone Disease)"
  ],
  "Rheumatology": [
    "Dr. Maya Patel (Lupus Specialist)",
    "Dr. Connor Fitzgerald (Vasculitis Expert)",
    "Dr. Jasmine Zhao (Pediatric Rheumatologist)"
  ],
  "Nephrology": [
    "Dr. Elijah Thompson (Dialysis Director)",
    "Dr. Valentina Costa (Transplant Nephrologist)",
    "Dr. Simon Wu (Hypertension Specialist)"
  ]
};

// Department list for dropdown
const departments = Object.keys(departmentDoctors).sort();

const doctors = [
  "Dr. Smith (Cardiology)",
  "Dr. Johnson (Neurology)",
  "Dr. Williams (Pediatrics)",
  // Add more doctors as needed
];

const timeSlots = [
  "9:00 AM", "9:15 AM", "9:30 AM", "9:45 AM",
  "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
  "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
  "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM",
  "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM",
  "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM"
];

export default function AddAppointmentPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDepartment, setSelectedDepartment] = useState<{ label: string; value: string } | null>(null);
  useEffect(() => { if (selectedDepartment) console.log(selectedDepartment); }, [selectedDepartment]); 
  const [selectedDoctor, setSelectedDoctor] = useState<{ label: string; value: string } | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<{label: string, value: string}[]>([]);
  const [selectedTime, setSelectedTime] = useState<{ label: string; value: string } | null>(null);
  const [selectedMedication, setSelectedMedication] = useState<{ label: string; value: string }[]>([]);
  useEffect(() => { if (selectedMedication.length > 0) console.log(selectedMedication); }, [selectedMedication]);
  const [contactPreference, setContactPreference] = useState("email");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Appointment</h1>
      <div className="bg-white rounded-lg shadow p-6">

      {/* Search Patient */}
      <Input type="search" placeholder="Search patient by name or ID" className="mb-4 w-full" />

      {/* Contact Preference */}
      <div className="mb-4">
        <label className="font-medium">Contact Preference:</label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="email"
              checked={contactPreference === "email"}
              onChange={() => setContactPreference("email")}
            />
            Via Email
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="phone"
              checked={contactPreference === "phone"}
              onChange={() => setContactPreference("phone")}
            />
            Via Phone
          </label>
        </div>
      </div>

      {/* Select Department */}
      <div className="mb-4">
        <label className="font-medium">Select Department:</label>
        {isClient && (
          <Select
            options={departments.map((dept) => ({ label: dept, value: dept }))}
            onChange={(selectedOption) => setSelectedDepartment(selectedOption as { label: string; value: string } | null)}
            placeholder="Search & select department"
          />
        )}
      </div>
       {/* ▼▼▼ ADDED DOCTOR SELECTION ▼▼▼ */}
       <div className="mb-4">
          <label className="font-medium">Select Doctor:</label>
          {isClient && (
            <Select
              options={doctors.map(doctor => ({ label: doctor, value: doctor }))}
              onChange={(selectedOption) => setSelectedDoctor(selectedOption as { label: string; value: string } | null)}
              placeholder="Search & select doctor"
              className="mt-2"
            />
          )}
        </div>

       {/* Appointment Date */}
       <div className="mb-4">
        <label className="font-medium mb-2 block">Select Appointment Date:</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            {isClient && <Calendar mode="single" selected={date} onSelect={(day) => setDate(day || undefined)} initialFocus />}
          </PopoverContent>
        </Popover>
      </div>

       {/* Time Selector */}
  <div>
    <label className="font-medium mb-2 block">Select Time:</label>
    {isClient && (
      <Select
        options={timeSlots.map(time => ({ label: time, value: time }))}
        onChange={(selectedOption) => 
          setSelectedTime(selectedOption as { label: string; value: string } | null)
        }
        placeholder="Select time slot"
      />
    )}
  </div>
  
      {/* Medication Selection */}
      <div className="mb-4">
        <label className="font-medium">Select Medication:</label>
        {isClient && (
          <Select
            isMulti
            options={[
              { label: "Paracetamol", value: "Paracetamol" },
              { label: "Ibuprofen", value: "Ibuprofen" },
              { label: "Aspirin", value: "Aspirin" },
            ]}
            onChange={(selectedOptions) => setSelectedMedication(selectedOptions as { label: string; value: string }[])}
            placeholder="Search & select medication"
          />
        )}
      </div>

      {/* Generate Bill Button */}
      <Button className="bg-green-500 hover:bg-green-600 flex justify-end gap-2 mt-6">Generate Bill</Button>
      {/* View Scheduled Appointments Button */}
      <Button className="bg-blue-500 hover:bg-blue-600 flex justify-end gap-2 mt-6" onClick={() => router.push("/appointments")}>View Scheduled Appointments</Button>
    </div>
  </div>
  );
}
