"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import NewRosterPage from "./new";
import WeeklyCalendar from "./calendar-view";

export default function StaffRosterPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header and Add Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Staff Roster</h1>
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => router.push("/staff-management/add")}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Roster
        </Button>
      </div>

      {/* Calendar View */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Weekly Calendar</h2>
        <WeeklyCalendar />
      </div>

      {/* Roster List */}
      <div className="bg-white rounded-lg shadow p-6">
        <NewRosterPage />
      </div>
    </div>
  );
}
