"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Appointment {
  time: string;
  date: string;
  severity: {
    level: string;
    color: string;
  };
  patient: {
    name: string;
    avatar: string;
    initials: string;
  };
  patientId: string;
  doctor: string;
}

const appointments: Appointment[] = [
  {
    time: "9:30 AM",
    date: "15/02/2025",
    severity: { level: "S4", color: "bg-red-500" },
    patient: {
      name: "Elizabeth Polson",
      avatar: "/placeholder.svg",
      initials: "EP",
    },
    patientId: "8271827",
    doctor: "Dr. John",
  },
  {
    time: "10:30 AM",
    date: "15/02/2025",
    severity: { level: "S3", color: "bg-orange-500" },
    patient: {
      name: "Krishtav Rajan",
      avatar: "/placeholder.svg",
      initials: "KR",
    },
    patientId: "8982314",
    doctor: "Dr. Joel",
  },
];

export default function NewAppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);

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
              <th className="p-4 text-left text-sm font-medium text-gray-500">Time</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Severity</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Patient Name</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Patient ID</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Doctor</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">User Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">{appointment.time}</td>
                <td className="p-4">{appointment.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-white text-sm ${appointment.severity.color}`}>
                    {appointment.severity.level}
                  </span>
                </td>
                <td className="p-4 flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={appointment.patient.avatar} />
                    <AvatarFallback>{appointment.patient.initials}</AvatarFallback>
                  </Avatar>
                  {appointment.patient.name}
                </td>
                <td className="p-4">{appointment.patientId}</td>
                <td className="p-4">{appointment.doctor}</td>
                <td className="p-4 text-blue-500 cursor-pointer">Reschedule</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center space-x-2 py-6">
        <Button variant="outline" size="sm" disabled>
            Previous
        </Button>
        <Button variant="outline" size="sm" className="bg-blue-500 text-white">
            1
        </Button>
        <Button variant="outline" size="sm">
            2
        </Button>
        <Button variant="outline" size="sm">
            3
        </Button>
        <Button variant="outline" size="sm">
            4
        </Button>
        <Button variant="outline" size="sm">
            Next
        </Button>
      </div>
    </div>
  );
}
