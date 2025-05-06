"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface StaffOption {
  name: string;
  staffId: string;
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
    <div className="space-y-3 mt-6">
      <h2 className="font-semibold text-lg">Weekly Schedule</h2>
      {schedule.map((entry, index) => (
        <div key={entry.day} className="flex items-center gap-4">
          <span className="w-24">{entry.day}</span>
          <Input
            type="time"
            className="w-32"
            value={entry.startTime}
            onChange={(e) => updateTime(index, "startTime", e.target.value)}
          />
          <span>-</span>
          <Input
            type="time"
            className="w-32"
            value={entry.endTime}
            onChange={(e) => updateTime(index, "endTime", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default function AddRosterPage() {
  const router = useRouter();

  const [selectedStaff, setSelectedStaff] = useState<{ label: string; value: string } | null>(null);
  const [staffOptions, setStaffOptions] = useState<{ label: string; value: string }[]>([]);
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Moved useState hooks inside the functional component
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("/api/staff");
        if (!res.ok) throw new Error("Failed to fetch staff list.");
        const data: StaffOption[] = await res.json();
        const options = data.map((staff: StaffOption) => ({
          label: `${staff.name} (${staff.staffId})`,
          value: staff.staffId,
        }));
        setStaffOptions(options);
      } catch (err) {
        console.error("Error loading staff data:", err);
      }
    };

    fetchStaff();
  }, []);

  useEffect(() => {
    if (selectedStaff) {
      // Temporary mock logic (replace with real data later)
      setRole("Nurse");
      setDepartment("Emergency");
    } else {
      setRole("");
      setDepartment("");
    }
  }, [selectedStaff]);
  

  const handleSave = async () => {
    if (!selectedStaff || !role || !department || schedules.length === 0) {
      alert("Please fill out all fields and schedule at least one day.");
      return;
    }

    const res = await fetch("/api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedStaff.label.split(" (")[0],
        staffId: selectedStaff.value,
        role,
        department,
        schedules,
      }),
    });

    if (res.ok) {
      alert("Roster saved.");
      router.push("/staff-management");
    } else {
      alert("Error saving staff schedule.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Staff</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">

        {/* Select Staff */}
        <div>
          <label className="font-medium">Select Staff:</label>
          {isClient && (
            <Select<{ label: string; value: string }>
              options={staffOptions}
              value={selectedStaff}
              onChange={(selected: { label: string; value: string } | null) => setSelectedStaff(selected)}
              placeholder="Search & select staff"
            />
          )}
        </div>

        {/* Info Boxes: Role, Department, ID */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Role:</label>
            <div className="border rounded px-3 py-2 bg-gray-100 text-gray-700">
              {role || "-"}
            </div>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Department:</label>
            <div className="border rounded px-3 py-2 bg-gray-100 text-gray-700">
              {department || "-"}
            </div>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Staff ID:</label>
            <div className="border rounded px-3 py-2 bg-gray-100 text-gray-700">
              {selectedStaff?.value || "-"}
            </div>
          </div>
        </div>


        {/* Weekly Schedule */}
        <WeeklyScheduleForm onChange={setSchedules} />

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
