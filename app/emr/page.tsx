'use client';

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PatientRegistration from "./patient-registration";
import MedicalInformation from "./medical-information";
import AdministrationInformation from "./administration-information";
import PatientList from "./patient-list";

export default function EMRPage() {
  const [selectedTab, setSelectedTab] = useState("patient-registration");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevents server-client mismatch

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">EMR (Electronic Medical Records)</h1>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="flex border-b mb-4">
          <TabsTrigger value="patient-registration" onClick={() => setSelectedTab("patient-registration")}>Patient Registration</TabsTrigger>
          <TabsTrigger value="administration-info" onClick={() => setSelectedTab("administration-info")}>Administration Information</TabsTrigger>
          <TabsTrigger value="medical-info" onClick={() => setSelectedTab("medical-info")}>Medical Information</TabsTrigger>
          <TabsTrigger value="patient-list" onClick={() => setSelectedTab("patient-list")}>Patient List</TabsTrigger>
        </TabsList>
        <div className="p-4">
          {selectedTab === "patient-registration" && <PatientRegistration />}
          {selectedTab === "administration-info" && <AdministrationInformation />}
          {selectedTab === "medical-info" && <MedicalInformation />}
          {selectedTab === "patient-list" && <PatientList />}
        </div>
      </Tabs>
    </div>
  );
}
