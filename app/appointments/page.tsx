"use client";

import { useState, useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import NewAppointmentsPage from "./new";
import CompletedAppointmentsPage from "./completed";

export default function AppointmentsPage() {
  const [selectedTab, setSelectedTab] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleTabChange = (newTab: string) => {
    setSelectedTab(newTab);
    setCurrentPage(1);
  };

  useEffect(() => {
    const activeTab = document.querySelector(`[data-tab="${selectedTab}"]`) as HTMLElement | null;
    if (indicatorRef.current && activeTab) {
      indicatorRef.current.style.left = `${activeTab.offsetLeft}px`;
      indicatorRef.current.style.width = `${activeTab.offsetWidth}px`;
    }
  }, [selectedTab]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold mb-4">Appointments</h1>
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => router.push("/appointments/add")}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add Appointment
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="relative flex border-b mb-4">
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300"
            ></div>
            {["new", "completed"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                data-tab={tab}
                onClick={() => handleTabChange(tab)}
                className={`relative px-4 py-2 transition-all text-center ${
                  selectedTab === tab ? "font-bold text-blue-600" : "text-gray-600"
                }`}
              >
                {tab === "new" ? "New Appointments" : "Completed Appointments"}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="p-4">
            {selectedTab === "new" && (
              <NewAppointmentsPage
                currentPage={currentPage}
                setTotalPages={setTotalPages}
                setTotalAppointments={setTotalAppointments}
              />
            )}
            {selectedTab === "completed" && (
              <CompletedAppointmentsPage
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setTotalPages={setTotalPages}
                setTotalAppointments={setTotalAppointments}
              />
            )}
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-base text-gray-600">
              Showing {Math.min(10, totalAppointments - (currentPage - 1) * 10)} of {totalAppointments} appointments
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {"<"}
              </Button>
              <span className="text-base">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                {">"}
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
