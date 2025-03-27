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

const roles = [
  "Senior Consultants", "Registrars", "Residents", "Interns", "Student Doctors",
  "Nurse Unit Manager", "Associate Nurse Unit Manager", "Nurse Practitioners",
  "Specialist Nurses", "Registered Nurses", "Enrolled Nurses", "Dietitians",
  "Occupational Therapists", "Pharmacists", "Physiotherapists", "Podiatrists",
  "Speech Pathologists", "Clinical Assistants", "Patient Service Assistants",
  "Porters", "Ward Clerks"
];

const shifts = ["Morning", "Afternoon", "Evening", "Night"];

export default function AddRosterPage() {
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedRole, setSelectedRole] = useState<{ label: string; value: string } | null>(null);
  const [selectedShift, setSelectedShift] = useState<{ label: string; value: string } | null>(null);
  const [staffName, setStaffName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [time, setTime] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSave = () => {
    if (!date || !selectedRole || !selectedShift || !staffName || !staffId || !time) {
      alert("Please fill out all fields.");
      return;
    }

    const newRoster = {
      date: format(date, "dd/MM/yyyy"),
      role: selectedRole.value,
      staffName,
      staffId,
      shift: selectedShift.value,
      time,
    };

    console.log("New Roster:", newRoster);
    alert("Roster saved (mock)");

    // Reset form (optional)
    setDate(undefined);
    setSelectedRole(null);
    setSelectedShift(null);
    setStaffName("");
    setStaffId("");
    setTime("");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Roster</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">

        {/* Staff Name */}
        <div>
          <label className="font-medium">Staff Name:</label>
          <Input
            type="text"
            placeholder="Enter staff name"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
          />
        </div>

        {/* Staff ID */}
        <div>
          <label className="font-medium">Staff ID:</label>
          <Input
            type="text"
            placeholder="Enter staff ID"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
          />
        </div>

        {/* Select Role */}
        <div>
          <label className="font-medium">Select Role:</label>
          {isClient && (
            <Select
              options={roles.map((role) => ({ label: role, value: role }))}
              value={selectedRole}
              onChange={(selected) =>
                setSelectedRole(selected as { label: string; value: string } | null)
              }
              placeholder="Search & select role"
            />
          )}
        </div>

        {/* Select Shift */}
        <div>
          <label className="font-medium">Select Shift:</label>
          {isClient && (
            <Select
              options={shifts.map((shift) => ({ label: shift, value: shift }))}
              value={selectedShift}
              onChange={(selected) =>
                setSelectedShift(selected as { label: string; value: string } | null)
              }
              placeholder="Search & select shift"
            />
          
          )}
        </div>

        {/* Select Date */}
        <div>
          <label className="font-medium">Select Roster Date:</label>
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
              {isClient && (
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => setDate(d || undefined)}
                  initialFocus
                />
              )}
            </PopoverContent>
          </Popover>
        </div>

        {/* Time */}
        <div>
          <label className="font-medium">Time:</label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-[240px]"
          />
        </div>

        {/* Save Button */}
        <div className="flex gap-4 mt-6">
          <Button className="bg-green-500 hover:bg-green-600" onClick={handleSave}>
            Save Roster
          </Button>

          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
