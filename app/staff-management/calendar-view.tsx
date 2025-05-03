"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  staff: {
    name: string;
    role: string;
    department?: string;
    staffId: string;
  };
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = Array.from({ length: 17 }, (_, i) => 6 + i); // 6:00 to 22:00

const roleColors: Record<string, string> = {
  "Registered Nurse": "bg-green-200 text-green-900",
  "Senior Consultant": "bg-blue-200 text-blue-900",
  "Administrator": "bg-yellow-200 text-yellow-900",
  "Registrar": "bg-purple-200 text-purple-900",
  "Enrolled Nurse": "bg-pink-200 text-pink-900",
  // fallback color
  default: "bg-gray-100 text-gray-800"
};

export default function WeeklyCalendar() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
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
        }[];
      }[] = await res.json();

      const allSchedules: Schedule[] = data.flatMap((staff) =>
        staff.schedules.map((s) => ({
          ...s,
          staff: {
            name: staff.name,
            role: staff.role,
            department: staff.department || undefined,
            staffId: staff.staffId
          }
        }))
      );

      setSchedules(allSchedules);
    };

    fetchSchedules();
  }, []);

  const getCellContent = (day: string, hour: number) => {
    const slotTime = hour.toString().padStart(2, "0") + ":00";

    return schedules
      .filter((s) => s.day === day && s.startTime <= slotTime && s.endTime > slotTime)
      .map((s) => {
        const roleClass = roleColors[s.staff.role] || roleColors.default;

        return (
          <div
            key={`${s.staff.staffId}-${day}-${slotTime}`}
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

  return (
    <div className="overflow-auto border rounded-lg mt-6">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-16 p-2 text-left text-xs font-medium">Time</th>
            {days.map((day) => (
              <th key={day} className="p-2 text-xs font-semibold text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour} className="border-t">
              <td className="p-2 text-xs text-gray-500 align-top">{hour}:00</td>
              {days.map((day) => (
                <td key={`${day}-${hour}`} className="p-1 h-16 align-top">
                  {getCellContent(day, hour)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
