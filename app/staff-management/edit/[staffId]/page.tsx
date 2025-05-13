"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, isAfter } from "date-fns";
import { cn } from "@/lib/utils";

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
  weekStart: string;
}

interface StaffWithSchedules extends StaffRecord {
    schedules: ScheduleEntry[];
  }  

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function EditStaffPage() {
  const { staffId } = useParams();
  const router = useRouter();

  const [staff, setStaff] = useState<StaffRecord | null>(null);
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date | null>(null);
  const isPastWeek = selectedWeekStart ? selectedWeekStart < new Date(new Date().setHours(0, 0, 0, 0)) : true;
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);

  useEffect(() => {
    const loadStaff = async () => {
        const res = await fetch("/api/staff");
        const data: StaffWithSchedules[] = await res.json();
        const found = data.find((s) => s.staffId === staffId);
        if (found) {
          setStaff({
            name: found.name,
            staffId: found.staffId,
            role: found.role,
            department: found.department,
          });
      
          const futureSchedules = found.schedules.filter((s: ScheduleEntry) =>
            isAfter(new Date(s.weekStart), new Date())
          );
      
          setSchedules(futureSchedules);
          if (futureSchedules.length) {
            setSelectedWeekStart(new Date(futureSchedules[0].weekStart));
          }
        }
      };      

    loadStaff();
  }, [staffId]);

  const handleScheduleChange = (index: number, field: "startTime" | "endTime", value: string) => {
    const updated = [...schedules];
    updated[index][field] = value;
    setSchedules(updated);
  };

  const handleSave = async () => {
    if (!staff || !selectedWeekStart || schedules.length === 0) {
      alert("Fill all required fields.");
      return;
    }

    const cleaned = schedules.map((s) => ({
      ...s,
      weekStart: selectedWeekStart.toISOString(),
    }));

    const res = await fetch("/api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: staff.name,
        staffId: staff.staffId,
        role: staff.role,
        department: staff.department,
        schedules: cleaned,
        weekStart: selectedWeekStart.toISOString(),
      }),
    });

    if (res.ok) {
      alert("Schedule updated.");
      router.push("/staff-management");
    } else {
      const error = await res.json();
      alert(error.error || "Update failed.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Roster</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">

        {/* Staff Info */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Name:</label>
            <div className="border rounded px-3 py-2 bg-gray-100 text-gray-700">{staff?.name || "-"}</div>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Role:</label>
            <div className="border rounded px-3 py-2 bg-gray-100 text-gray-700">{staff?.role || "-"}</div>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Department:</label>
            <div className="border rounded px-3 py-2 bg-gray-100 text-gray-700">{staff?.department || "-"}</div>
          </div>
        </div>

        {/* Week Picker */}
        <div>
          <label className="font-medium">Edit Week:</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[240px] justify-start text-left font-normal", !selectedWeekStart && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedWeekStart ? format(selectedWeekStart, "PPP") : "Choose week"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedWeekStart || undefined}
                onSelect={(date) => date && setSelectedWeekStart(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {isPastWeek && (
            <p className="text-sm text-red-500 mt-2">
                This week is in the past. Schedule editing is disabled.
            </p>
            )}
        </div>

        {/* Schedule Editor */}
        <div className="space-y-3">
          {days.map((day, index) => {
            const existing = schedules.find((s) => s.day === day);
            return (
              <div key={day} className="flex items-center w-full">
                <span className="w-24 pr-3 text-right font-medium">{day}</span>
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="time"
                    className="flex-1 max-w-[140px]"
                    value={existing?.startTime || ""}
                    onChange={(e) => handleScheduleChange(index, "startTime", e.target.value)}
                    disabled={isPastWeek}
                    />
                  <span className="w-4 text-center">-</span>
                  <Input
                    type="time"
                    className="flex-1 max-w-[140px]"
                    value={existing?.endTime || ""}
                    onChange={(e) => handleScheduleChange(index, "endTime", e.target.value)}
                    disabled={isPastWeek}
                    />
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="flex gap-4 mt-6">
          <Button className="bg-green-500 hover:bg-green-600" onClick={handleSave}>
            Save Schedule
          </Button>
          <Button className="bg-red-500 hover:bg-red-600" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
