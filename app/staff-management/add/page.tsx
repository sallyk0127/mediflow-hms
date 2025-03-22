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
  "Manager",
  "Assistant",
  "Nurse",
  "Doctor",
  "Technician",
  "Administrator",
  "Support Staff",
];

const shifts = [
  "Morning",
  "Afternoon",
  "Evening",
  "Night",
];

export default function AddRosterPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedRole, setSelectedRole] = useState<{ label: string; value: string } | null>(null);
  const [selectedShift, setSelectedShift] = useState<{ label: string; value: string } | null>(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    console.log("Selected Role:", selectedRole);
    console.log("Selected Shift:", selectedShift);
  }, [selectedRole, selectedShift]);

  useEffect(() => { setIsClient(true); }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Roster</h1>
      <div className="bg-white rounded-lg shadow p-6">

        {/* Search Staff */}
        <Input type="search" placeholder="Search staff by name or ID" className="mb-4 w-full" />

        {/* Select Role */}
        <div className="mb-4">
          <label className="font-medium">Select Role:</label>
          {isClient && (
            <Select
              options={roles.map((role) => ({ label: role, value: role }))}
              onChange={(selectedOption) => setSelectedRole(selectedOption as { label: string; value: string } | null)}
              placeholder="Search & select role"
            />
          )}
        </div>

        {/* Select Shift */}
        <div className="mb-4">
          <label className="font-medium">Select Shift:</label>
          {isClient && (
            <Select
              options={shifts.map((shift) => ({ label: shift, value: shift }))}
              onChange={(selectedOption) => setSelectedShift(selectedOption as { label: string; value: string } | null)}
              placeholder="Search & select shift"
            />
          )}
        </div>

        {/* Roster Date */}
        <div className="mb-4">
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
              {isClient && <Calendar mode="single" selected={date} onSelect={(day) => setDate(day || undefined)} initialFocus />}
            </PopoverContent>
          </Popover>
        </div>

        {/* Save Roster Button */}
        <Button className="bg-green-500 hover:bg-green-600 flex justify-end gap-2 mt-6">Save Roster</Button>

        {/* View Rosters Button */}
        <Button className="bg-blue-500 hover:bg-blue-600 flex justify-end gap-2 mt-6" onClick={() => router.push("/staff-roster")}>View Rosters</Button>
      </div>
    </div>
  );
}