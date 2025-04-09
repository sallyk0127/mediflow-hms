"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Roster {
  time: string;
  date: string;
  role: string;
  staff: {
    name: string;
    avatar: string;
    initials: string;
  };
  staffId: string;
  shift: string;
}

const rosters: Roster[] = [
  {
    time: "08:00 AM",
    date: "28/03/2025",
    role: "Registered Nurse",
    staff: {
      name: "Emily Clark",
      avatar: "/placeholder.svg",
      initials: "EC",
    },
    staffId: "RN00123",
    shift: "Morning",
  },
  {
    time: "02:00 PM",
    date: "28/03/2025",
    role: "Dietitian",
    staff: {
      name: "Michael Brown",
      avatar: "/placeholder.svg",
      initials: "MB",
    },
    staffId: "DT00456",
    shift: "Afternoon",
  },
  {
    time: "09:00 PM",
    date: "28/03/2025",
    role: "Resident",
    staff: {
      name: "Sophia Martinez",
      avatar: "/placeholder.svg",
      initials: "SM",
    },
    staffId: "RS00789",
    shift: "Night",
  },
];

export default function NewRosterPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedStaff, setSelectedStaff] = useState<Roster["staff"] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // ✅ Fix for SSR warning

  const handleStaffClick = (staff: Roster["staff"]) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setIsHydrated(true); 
  }, []);

  const today = new Date();

  const filteredRosters = rosters.filter((roster) => {
    const rosterDate = parse(roster.date, "dd/MM/yyyy", new Date());
    const isFutureOrToday = rosterDate >= new Date(today.setHours(0, 0, 0, 0));
    const isMatchingDate = date ? rosterDate.toDateString() === date.toDateString() : true;
    return isFutureOrToday && isMatchingDate;
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Input type="search" placeholder="Search" className="pl-8" />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Filter by date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={(day) => setDate(day || undefined)} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Role</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Staff Name</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Staff ID</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Shift</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Time</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">User Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRosters.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No upcoming rosters found.
                </td>
              </tr>
            ) : (
              filteredRosters.map((roster, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{roster.date}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-md text-white text-sm bg-blue-500">
                      {roster.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div
                      className="flex items-center cursor-pointer text-blue-600 hover:underline"
                      onClick={() => handleStaffClick(roster.staff)}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={roster.staff.avatar} />
                        <AvatarFallback>{roster.staff.initials}</AvatarFallback>
                      </Avatar>
                      {roster.staff.name}
                    </div>
                  </td>
                  <td className="p-4">{roster.staffId}</td>
                  <td className="p-4">{roster.shift}</td>
                  <td className="p-4">{roster.time}</td>
                  <td className="p-4 text-blue-500 cursor-pointer">Edit</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isHydrated && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedStaff?.name}</DialogTitle>
              <DialogDescription>
                <span className="mt-2 text-sm text-gray-600 block">
                  Test.
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
