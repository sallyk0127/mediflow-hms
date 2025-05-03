"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";

const roles = [
  "Senior Consultants", "Registrars", "Residents", "Interns", "Student Doctors",
  "Nurse Unit Manager", "Associate Nurse Unit Manager", "Nurse Practitioners",
  "Specialist Nurses", "Registered Nurses", "Enrolled Nurses", "Dietitians",
  "Occupational Therapists", "Pharmacists", "Physiotherapists", "Podiatrists",
  "Speech Pathologists", "Clinical Assistants", "Patient Service Assistants",
  "Porters", "Ward Clerks"
];

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

  const [selectedRole, setSelectedRole] = useState<{ label: string; value: string } | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<{ label: string; value: string } | null>(null);
  const [staffOptions, setStaffOptions] = useState<{ label: string; value: string }[]>([]);
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [isClient, setIsClient] = useState(false);

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

  const handleSave = async () => {
    if (!selectedStaff || !selectedRole || schedules.length === 0) {
      alert("Please fill out all fields and schedule at least one day.");
      return;
    }

    const res = await fetch("/api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedStaff.label.split(" (")[0],
        staffId: selectedStaff.value,
        role: selectedRole.value,
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

        {/* Select Role */}
        <div>
          <label className="font-medium">Select Role:</label>
          {isClient && (
            <Select<{ label: string; value: string }>
              options={roles.map((role) => ({ label: role, value: role }))}
              value={selectedRole}
              onChange={(selected: { label: string; value: string } | null) => setSelectedRole(selected)}
              placeholder="Search & select role"
            />
          )}
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
