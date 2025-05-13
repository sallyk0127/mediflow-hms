"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface StaffRecord {
  name: string;
  staffId: string;
  role: string;
  department: string;
}

interface ScheduleEntry {
  day: string;
  startTime: string;
  endTime: string;
}

function WeeklyScheduleForm({ onChange }: { onChange: (schedules: ScheduleEntry[]) => void }) {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(
    days.map((day) => ({ day, startTime: "", endTime: "" }))
  );

  const updateTime = (index: number, field: "startTime" | "endTime", value: string) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
    const filled = newSchedule.filter((s) => s.startTime && s.endTime);
    onChange(filled);
  };

  return (
    <div className="mt-6 w-full">
      <div className="space-y-3 w-full">
        {schedule.map((entry, index) => (
          <div key={entry.day} className="flex items-center w-full">
            <span className="w-24 pr-3 text-right font-medium">{entry.day}</span>
            <div className="flex items-center gap-2 flex-1">
              <Input
                type="time"
                className="flex-1 max-w-[140px]"
                value={entry.startTime}
                onChange={(e) => updateTime(index, "startTime", e.target.value)}
              />
              <span className="w-4 text-center">-</span>
              <Input
                type="time"
                className="flex-1 max-w-[140px]"
                value={entry.endTime}
                onChange={(e) => updateTime(index, "endTime", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AddRosterPage() {
  const router = useRouter();

  const [staffOptions, setStaffOptions] = useState<StaffRecord[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<StaffRecord | null>(null);
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date | null>(null); // ✅ new

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("/api/staff");
        if (!res.ok) throw new Error("Failed to fetch staff list.");
        const data: StaffRecord[] = await res.json();
        console.log("Fetched staff:", data);
        setStaffOptions(data);
      } catch (err) {
        console.error("Error loading staff data:", err);
      }
    };

    fetchStaff();
  }, []);

  const handleSave = async () => {
    if (!selectedStaff || schedules.length === 0 || !selectedWeekStart) {
      alert("Please select a staff, a week, and at least one schedule entry.");
      return;
    }
  
    const schedulesWithWeek = schedules.map((s) => ({
      ...s,
      weekStart: selectedWeekStart.toISOString(),
    }));
  
    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedStaff.name,
          staffId: selectedStaff.staffId,
          role: selectedStaff.role,
          department: selectedStaff.department,
          schedules: schedulesWithWeek,
          weekStart: selectedWeekStart.toISOString(),
        }),
      });
  
      if (res.ok) {
        alert("Roster saved.");
        router.push("/staff-management");
      } else {
        const err = await res.json();
        alert(err.error || "Error saving staff schedule.");
      }
    } catch (err) {
      console.error("Error saving:", err);
      alert("Unexpected error occurred.");
    }
  };  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Roster</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">

        {/* Select Staff */}
        <div>
          <label className="font-medium">Select Staff:</label>
          {isClient && (
            <Select<StaffRecord>
              options={staffOptions}
              getOptionLabel={(s) => `${s.name} (${s.staffId})`}
              getOptionValue={(s) => s.staffId}
              value={selectedStaff}
              onChange={(selected) => setSelectedStaff(selected ?? null)}
              placeholder="Search & select staff"
            />
          )}
        </div>

        {/* Info Boxes: Role, Department, ID */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Role:</label>
            <div className="border rounded px-3 py-2 bg-gray-100 text-gray-700">
              {selectedStaff?.role || "-"}
            </div>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Department:</label>
            <div className="border rounded px-3 py-2 bg-gray-100 text-gray-700">
              {selectedStaff?.department || "-"}
            </div>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Staff ID:</label>
            <div className="border rounded px-3 py-2 bg-gray-100 text-gray-700">
              {selectedStaff?.staffId || "-"}
            </div>
          </div>
        </div>

        {/* Weekly Schedule + Week Picker */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Weekly Schedule</h2>

          {/* Week Picker */}
          <div className="flex items-center gap-4 mb-4">
            <label className="font-medium">Select Week:</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-[240px] justify-start text-left font-normal", !selectedWeekStart && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedWeekStart ? format(selectedWeekStart, "PPP") : "Choose a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedWeekStart || undefined}
                  onSelect={(date) => {
                    if (!date) return;
                    const offset = (date.getDay() + 6) % 7; // Monday = start of week
                    const monday = new Date(date);
                    monday.setDate(date.getDate() - offset);
                    setSelectedWeekStart(monday);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <WeeklyScheduleForm onChange={setSchedules} />
        </div>

        {/* Save Button */}
        <div className="flex gap-4 mt-6">
          <Button className="bg-green-500 hover:bg-green-600" onClick={handleSave}>
            Save Staff Schedule
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
