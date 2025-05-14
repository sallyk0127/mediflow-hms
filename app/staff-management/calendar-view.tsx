"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addWeeks, subWeeks, format, startOfWeek, addDays } from "date-fns";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  weekStart: string;
  staff: {
    name: string;
    role: string;
    department?: string;
    staffId: string;
  };
}

const hours = Array.from({ length: 24 }, (_, i) => i); // 0:00 to 23:00

const roleColors: Record<string, string> = {
  "Registered Nurse": "bg-green-200 text-green-900",
  "Senior Consultant": "bg-blue-200 text-blue-900",
  "Administrator": "bg-yellow-200 text-yellow-900",
  "Registrar": "bg-purple-200 text-purple-900",
  "Enrolled Nurse": "bg-pink-200 text-pink-900",
  default: "bg-gray-100 text-gray-800"
};

export default function WeeklyCalendar() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const router = useRouter();

  useEffect(() => {
    const fetchSchedules = async () => {
      const res = await fetch("/api/staff");
      const data: {
        name: string;
        role: string;
        staffId: string;
        department?: string;
        schedules: {
          id: string;
          day: string;
          startTime: string;
          endTime: string;
          weekStart: string;
        }[];
      }[] = await res.json();
        
      const allSchedules: Schedule[] = data.flatMap((staff) =>
        (staff.schedules || []).map((s: {
          id: string;
          day: string;
          startTime: string;
          endTime: string;
          weekStart: string;
        }) => ({        
          ...s,
          staff: {
            name: staff.name,
            role: staff.role,
            department: staff.department,
            staffId: staff.staffId,
          },
        }))
      );
  
      const weekStart = startOfWeek(currentWeek);
      const weekEnd = addDays(weekStart, 7);
  
      const filtered = allSchedules.filter((s) => {
        const ws = new Date(s.weekStart);
        return ws >= weekStart && ws < weekEnd;
      });
  
      setSchedules(filtered);
    };
  
    fetchSchedules();
  }, [currentWeek]);  

  const getWeekDates = () => {
    const startDate = startOfWeek(currentWeek);
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const getDayName = (date: Date) => {
    return format(date, "EEEE"); // Full day name (Monday, Tuesday, etc.)
  };

  const getFormattedDate = (date: Date) => {
    return format(date, "dd/MM");
  };

  const getCellContent = (date: Date, hour: number) => {
    const dayName = getDayName(date);
    const slotTime = hour.toString().padStart(2, "0") + ":00";
  
    const dailyMap = new Map<string, Schedule>();
  
    schedules
      .filter((s) => selectedRole === "all" || s.staff.role === selectedRole)
      .filter((s) => s.day === dayName && s.startTime <= slotTime && s.endTime > slotTime)
      .forEach((s) => {
        const key = `${s.staff.staffId}-${s.day}`;
        if (!dailyMap.has(key)) {
          dailyMap.set(key, s);
        }
      });
  
    return Array.from(dailyMap.values()).map((s) => {
      const roleClass = roleColors[s.staff.role] || roleColors.default;
  
      return (
        <div
          key={`${s.staff.staffId}-${s.day}-${s.startTime}-${s.id}`}
          className={clsx("p-1 mb-1 rounded text-xs cursor-pointer", roleClass)}
          onClick={() => router.push(`/staff-management/edit/${s.staff.staffId}`)}
        >
          <div>{s.staff.name}</div>
          <div className="text-[10px]">{s.startTime}–{s.endTime}</div>
          <div className="text-[10px] italic">{s.staff.role}</div>
        </div>
      );
    });
  };  

  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));
  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));

  // Get unique roles for filter dropdown
  const uniqueRoles = ["all", ...Array.from(new Set(schedules.map(s => s.staff.role)))];

  return (
    <div className="space-y-4">
      {/* Week Navigation and Role Filter */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={prevWeek}>
            Previous Week
          </Button>
          <span className="font-medium">
            {format(startOfWeek(currentWeek), "MMM d")} - {format(addDays(startOfWeek(currentWeek), 6), "MMM d, yyyy")}
          </span>
          <Button variant="outline" onClick={nextWeek}>
            Next Week
          </Button>
        </div>
        
        <select 
          className="border rounded p-2"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {uniqueRoles.map(role => (
            <option key={role} value={role}>
              {role === "all" ? "All Roles" : role}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar Table */}
      <div className="overflow-auto border rounded-lg">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-16 p-2 text-left text-xs font-medium">Time</th>
              {getWeekDates().map((date) => (
                <th key={date.toString()} className="p-2 text-xs font-semibold text-center">
                  <div>{getDayName(date)}</div>
                  <div className="font-normal">{getFormattedDate(date)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour} className="border-t">
                <td className="p-2 text-xs text-gray-500 align-top">{hour}:00</td>
                {getWeekDates().map((date) => (
                  <td key={`${date.toString()}-${hour}`} className="p-1 h-16 align-top">
                    {getCellContent(date, hour)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}