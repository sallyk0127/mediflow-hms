"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/hooks/use-toast";
import { useCallback } from "react";

interface Appointment {
  id: string;
  time: string;
  date: string;
  severity: string;
  patientName: string;
  patientId: string;
  doctorName: string;
}

interface NewAppointmentsPageProps {
  currentPage: number;
  setTotalPages: (total: number) => void;
  setTotalAppointments: (total: number) => void;
}

export default function NewAppointmentsPage({
  currentPage,
  setTotalPages,
  setTotalAppointments,
}: NewAppointmentsPageProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { toast } = useToast();

const fetchAppointments = useCallback(async () => {
  try {
    const res = await fetch(`/api/appointments?status=new&page=${currentPage}&limit=10`);
    const result = await res.json();
    if (result.success && Array.isArray(result.data)) {
      const total = result.total ?? result.data.length;
      setAppointments(result.data);
      setTotalAppointments(total);
      setTotalPages(Math.ceil(total / 10));
    } else {
      setAppointments([]);
      setTotalAppointments(0);
      setTotalPages(1);
    }
  } catch (err) {
    console.error("Failed to fetch appointments", err);
    setAppointments([]);
    setTotalAppointments(0);
    setTotalPages(1);
  }
}, [currentPage, setTotalAppointments, setTotalPages]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const markAsCompleted = async (id: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "PATCH" });
      const result = await res.json();
      if (result.success) {
        toast({ title: "Marked Completed", description: "Appointment has been marked as completed." });
        fetchAppointments();
      } else {
        toast({ title: "Error", description: result.error || "Failed to update status", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error marking appointment as completed:", error);
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Input type="search" placeholder="Search" className="pl-8" />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
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
            {appointments.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="p-4">{a.time}</td>
                <td className="p-4">{format(new Date(a.date), "dd/MM/yyyy")}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-white text-sm ${
                    a.severity === "S4" ? "bg-red-500" :
                    a.severity === "S3" ? "bg-orange-500" :
                    a.severity === "S2" ? "bg-yellow-400" : "bg-green-400"}`}
                  >
                    {a.severity}
                  </span>
                </td>
                <td className="p-4">{a.patientName}</td>
                <td className="p-4">{a.patientId}</td>
                <td className="p-4">{a.doctorName}</td>
                <td className="p-4">
                  <span
                    onClick={() => markAsCompleted(a.id)}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Mark Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
