"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/components/lib/utils";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const departments = [
    "Aged Health, Chronic Care & Rehabilitation",
    "Allied Health",
    "Anaesthetics and Pain Management",
    "Andrology",
    "Audiology",
    "Basic Physician Training Network",
    "Bereavement",
    "Blood Cancers",
    "Breast and Endocrine Surgery",
    "Burns – NSW Statewide Burn Injury Service",
    "Cardiology",
    "Centre for STRONG Medicine",
    "Concord Cancer Centre",
    "Chaplaincy",
    "Colorectal",
    "Dermatology",
    "Drug and Alcohol",
    "Emergency",
    "Endocrinology and Metabolism",
    "Ear Nose and Throat",
    "Eye Clinic",
    "Gastroenterology",
    "Gynaecology",
    "Haematology Department",
    "Hospital in The Home",
    "Immunology",
    "Interpreter Services",
    "Intensive Care Unit",
    "Mental Health",
    "Microbiology and Infectious Diseases",
    "Molecular Imaging",
    "National Centre for Veterans' Healthcare (NCVH)",
    "Neurosciences",
    "Neurosurgery",
    "Nutrition and Dietetics",
    "Ophthalmology",
    "Orthopaedics",
    "Palliative and Supportive Care",
    "Pathology Department",
    "Patient and Family Experience Officer",
    "Plastic, Reconstructive and Hand Surgery Unit",
    "Podiatry",
    "Pre-Admission Clinic",
    "Psychology",
    "Radiology",
    "Renal",
    "Respiratory and Sleep Medicine",
    "Rheumatology",
    "Social Work",
    "Speech Pathology",
    "Stomal Therapy",
    "The Sydney Cancer Survivorship Centre",
    "Urology",
    "Vascular Surgery",
];

export default function AddAppointmentPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDepartment, setSelectedDepartment] = useState<{ label: string; value: string } | null>(null);
  useEffect(() => { if (selectedDepartment) console.log(selectedDepartment); }, [selectedDepartment]); 
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
