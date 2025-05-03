"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Roster {
  id: string;
  name: string;
  staffId: string;
  role: string;
  shift: string;
  date: string;
  time: string;
}

export default function NewRosterPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [rosters, setRosters] = useState<Roster[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Roster | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const fetchRosters = async () => {
      try {
        const res = await fetch("/api/staff");
        const data: Roster[] = await res.json();
        const validData = data.filter((r) => r.date && r.name);
        setRosters(validData);
      } catch (error) {
        console.error("Failed to fetch rosters", error);
      }
    };

    fetchRosters();
  }, []);

  const today = new Date();

  const filteredRosters = rosters
    .filter((roster) => roster.date)
    .filter((roster) => {
      const rosterDate = parseISO(roster.date);
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
            <Calendar mode="single" selected={date} onSelect={(d) => setDate(d || undefined)} initialFocus />
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
              filteredRosters.map((roster) => (
                <tr key={roster.id} className="border-b">
                  <td className="p-4">{format(parseISO(roster.date), "dd/MM/yyyy")}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-md text-white text-sm bg-blue-500">
                      {roster.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div
                      className="flex items-center cursor-pointer text-blue-600 hover:underline"
                      onClick={() => {
                        setSelectedStaff(roster);
                        setIsModalOpen(true);
                      }}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {roster.name
                            ? roster.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "?"}
                        </AvatarFallback>
                      </Avatar>
                      {roster.name}
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
                <span className="block mt-1">Role: {selectedStaff?.role}</span>
                <span className="block">Shift: {selectedStaff?.shift}</span>
                <span className="block">
                  Rostered for: {selectedStaff?.time} on {selectedStaff?.date}
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}