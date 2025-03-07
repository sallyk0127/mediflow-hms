"use client";
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import NewAppointmentsPage from "./new";
import CompletedAppointmentsPage from "./completed";

export default function AppointmentsPage() {
  const [selectedTab, setSelectedTab] = useState("new");
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (indicatorRef.current) {
      const activeTab = document.querySelector(`[data-state='active']`);
      if (activeTab) {
        indicatorRef.current.style.left = `${(activeTab as HTMLElement).offsetLeft}px`;
        indicatorRef.current.style.width = `${(activeTab as HTMLElement).offsetWidth}px`;
      }
    }
  }, [selectedTab]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-4">Appointments</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <PlusIcon className="mr-2 h-4 w-4" /> New Appointment
        </Button>
      </div>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="relative flex border-b mb-4">
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300"
          ></div>
          <TabsTrigger value="new" onClick={() => setSelectedTab("new")} className={`px-4 py-2 text-center ${selectedTab === "new" ? "text-blue-600 font-bold" : "text-gray-600"}`}>
            New Appointments
          </TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setSelectedTab("completed")} className={`px-4 py-2 text-center ${selectedTab === "completed" ? "text-blue-600 font-bold" : "text-gray-600"}`}>
            Completed Appointments
          </TabsTrigger>
        </TabsList>
        <div className="p-4">
          {selectedTab === "new" && <NewAppointmentsPage />}
          {selectedTab === "completed" && <CompletedAppointmentsPage />}
        </div>
      </Tabs>
    </div>
  );
}
