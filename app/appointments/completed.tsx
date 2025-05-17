"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  time: string;
  date: string;
  severity: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  contactPreference: string;
  department: string;
  reason: string;
  medications: string[];
}

interface CompletedAppointmentsPageProps {
  currentPage: number;
  setTotalPages: (total: number) => void;
  setTotalAppointments: (total: number) => void;
}

export default function CompletedAppointmentsPage({
  currentPage,
  setTotalPages,
  setTotalAppointments,
}: CompletedAppointmentsPageProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (appt: Appointment) => {
    setSelectedAppointment(appt);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`/api/appointments?status=completed&page=${currentPage}&limit=10`);
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setAppointments(result.data);
          setTotalAppointments(result.total || result.data.length);
          setTotalPages(Math.ceil((result.total || result.data.length) / 10));
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Failed to fetch completed appointments:", error);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [currentPage, setTotalPages, setTotalAppointments]);

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
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Filter by date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day) => setDate(day || undefined)}
              initialFocus
            />
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
                  <span
                    className={`px-2 py-1 rounded-md text-white text-sm ${
                      a.severity === "S4"
                        ? "bg-red-500"
                        : a.severity === "S3"
                        ? "bg-orange-500"
                        : a.severity === "S2"
                        ? "bg-yellow-400"
                        : "bg-green-400"
                    }`}
                  >
                    {a.severity}
                  </span>
                </td>
                <td className="p-4">{a.patientName}</td>
                <td className="p-4">{a.patientId}</td>
                <td className="p-4">{a.doctorName}</td>
                <td className="p-4">
                  <span
                    onClick={() => handleViewDetails(a)}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    View Details
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Appointment Details</h2>
            <p><strong>Contact Preference:</strong> {selectedAppointment.contactPreference}</p>
            <p><strong>Department:</strong> {selectedAppointment.department}</p>
            <p><strong>Reason:</strong> {selectedAppointment.reason}</p>
            <p><strong>Medications:</strong> {selectedAppointment.medications?.join(", ") || "N/A"}</p>
            <div className="mt-4 text-right">
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
