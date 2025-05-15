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
import { useToast } from "@/components/hooks/use-toast";
import { isSameDay } from "date-fns";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface Option {
  label: string;
  value: string;
}

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
}

interface Medicine {
  id: number;
  name: string;
}

const departments: Option[] = [
  "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Oncology",
  "Gastroenterology", "Pulmonology", "Endocrinology", "Rheumatology", "Nephrology"
].map(dept => ({ label: dept, value: dept }));

const severityOptions: Option[] = [
  { label: "S1 - Low", value: "S1" },
  { label: "S2 - Moderate", value: "S2" },
  { label: "S3 - High", value: "S3" },
  { label: "S4 - Critical", value: "S4" },
];

export default function AddAppointmentPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Option | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Option[]>([]);
  const [selectedTime, setSelectedTime] = useState<Option | null>(null);
  const [selectedMedication, setSelectedMedication] = useState<Option[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<Option | null>(null);
  const [reasonForAppointment, setReasonForAppointment] = useState("");
  const [contactPreference, setContactPreference] = useState("email");
  const [selectedPatient, setSelectedPatient] = useState<Option | null>(null);
  const [patients, setPatients] = useState<Option[]>([]);
  const [medicineOptions, setMedicineOptions] = useState<Option[]>([]);
  const [timeSlots, setTimeSlots] = useState<Option[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!selectedDoctor?.value || !date) return;
    const fetchAvailability = async () => {
      try {
        const res = await fetch(`/api/staff/${selectedDoctor.value}/availability?date=${date.toISOString().split("T")[0]}`);
        const result = await res.json();
        const slots = result.timeSlots.map((time: string) => ({ label: time, value: time }));
        setTimeSlots(slots);
      } catch (err) {
        console.error("Failed to fetch doctor availability", err);
      }
    };
    fetchAvailability();
  }, [selectedDoctor, date]);

  useEffect(() => {
    if (!selectedDepartment?.value) return;
    const fetchDepartmentAvailability = async () => {
      try {
        const res = await fetch(`/api/staff/availability?department=${selectedDepartment.value}`);
        const result = await res.json();
        const availableDays = result.availability ? Object.keys(result.availability).map((d: string) => new Date(d)) : [];
        setAvailableDates(availableDays);
      } catch (err) {
        console.error("Failed to fetch department availability", err);
      }
    };
    fetchDepartmentAvailability();
  }, [selectedDepartment]);

  useEffect(() => {
  if (!selectedDepartment?.value) return;

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`/api/staff?department=${selectedDepartment.value}&role=Doctor`);
      const data = await res.json();

      const formatted = data.map((doc: { id: string; name: string }) => ({
        label: doc.name,
        value: doc.id,
      }));

      setFilteredDoctors(formatted);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    }
  };

  fetchDoctors();
}, [selectedDepartment]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/api/patients");
        const result = await res.json();
        if (result.success) {
          const formatted = result.data.map((p: Patient) => ({
            label: `${p.firstName} ${p.lastName} (ID: ${p.id})`,
            value: p.id.toString(),
          }));
          setPatients(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await fetch("/api/medicine");
        const data = await res.json();
        const formatted = data.map((med: Medicine) => ({
          label: med.name,
          value: med.id.toString(),
        }));
        setMedicineOptions(formatted);
      } catch (error) {
        console.error("Failed to fetch medicine list", error);
      }
    };
    fetchMedicines();
  }, []);

  const handleDateSelect = (selected: Date | undefined) => {
    if (!selected) return;
    const isValid = availableDates.some((d) => isSameDay(d, selected));
    if (!isValid) {
      toast({
        title: "Unavailable Date",
        description: "No available doctors on this day. Please choose another date.",
        variant: "destructive",
      });
      return;
    }
    setDate(selected);
  };

  const handleSave = async () => {
    if (!selectedPatient || !selectedDoctor || !selectedTime || !date || !selectedSeverity || !reasonForAppointment) {
      toast({ title: "Missing Fields", description: "Please complete all required fields before saving.", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: Number(selectedPatient.value),
          doctorId: selectedDoctor.value,
          time: selectedTime.value,
          date: date.toISOString(),
          severity: selectedSeverity.value,
          reason: reasonForAppointment,
          contactPreference,
          department: selectedDepartment?.value || "",
          medications: selectedMedication.map((m) => Number(m.value)),
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast({ title: "Appointment Created", description: "The appointment was successfully saved." });
        router.push("/appointments");
      } else {
        toast({ title: "Save Failed", description: result.error || "An unknown error occurred.", variant: "destructive" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "An error occurred while saving the appointment.", variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Appointment</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block font-medium mb-2">Select Patient</label>
            {isClient && (
              <Select options={patients} value={selectedPatient} onChange={(option) => setSelectedPatient(option as Option | null)} placeholder="Search patient by name or ID" isSearchable />
            )}

            <label className="block font-medium mb-2">Contact Preference</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="email" checked={contactPreference === "email"} onChange={() => setContactPreference("email")} /> Via Email
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="phone" checked={contactPreference === "phone"} onChange={() => setContactPreference("phone")} /> Via Phone
              </label>
            </div>

            <label className="block font-medium mb-2">Select Department</label>
            {isClient && (
              <Select options={departments} value={selectedDepartment} onChange={(selectedOption) => setSelectedDepartment(selectedOption as Option | null)} placeholder="Search & select department" />
            )}

            <label className="block font-medium mb-2">Select Doctor</label>
            {isClient && (
              <Select options={filteredDoctors} value={selectedDoctor} onChange={(selectedOption) => setSelectedDoctor(selectedOption as Option | null)} placeholder="Select doctor" isDisabled={!selectedDepartment} />
            )}

            <label className="block font-medium mb-2">Reason for Appointment</label>
            <Input type="text" placeholder="Enter the reason for appointment" value={reasonForAppointment} onChange={(e) => setReasonForAppointment(e.target.value)} />
          </div>

          <div className="space-y-4">
            <label className="block font-medium mb-2">Severity Level</label>
            {isClient && (
              <Select options={severityOptions} value={selectedSeverity} onChange={(selectedOption) => setSelectedSeverity(selectedOption as Option | null)} placeholder="Select severity level" />
            )}

            <label className="block font-medium mb-2">Appointment Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {isClient && (
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    disabled={(d) => !availableDates.some((enabled) => isSameDay(enabled, d))}
                    initialFocus
                  />
                )}
              </PopoverContent>
            </Popover>

            <label className="block font-medium mb-2">Select Time</label>
            {isClient && (
              <Select options={timeSlots} value={selectedTime} onChange={(selectedOption) => setSelectedTime(selectedOption as Option | null)} placeholder="Select time slot" />
            )}

            <label className="block font-medium mb-2">Select Medication</label>
            {isClient && (
              <Select isMulti options={medicineOptions} value={selectedMedication} onChange={(selectedOptions) => setSelectedMedication(selectedOptions as Option[] || [])} placeholder="Search & select medication" />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button className="bg-green-500 hover:bg-green-600" onClick={handleSave}> Save Appointment </Button>
          <Button className="bg-red-500 hover:bg-red-600" onClick={() => router.back()}> Back </Button>
        </div>
      </div>
    </div>
  );
}
