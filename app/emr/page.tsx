'use client';

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PatientRegistration from "./patient-registration";

export default function EMRPage() {
  const [selectedTab, setSelectedTab] = useState("patient-registration");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">EMR (Electronic Medical Records)</h1>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="flex border-b">
          <TabsTrigger value="patient-registration">Patient Registration</TabsTrigger>
          <TabsTrigger value="administration-info">Administration Information</TabsTrigger>
          <TabsTrigger value="medical-info">Medical Information</TabsTrigger>
          <TabsTrigger value="patient-list">Patient List</TabsTrigger>
        </TabsList>
        <TabsContent value="patient-registration">
          <PatientRegistration />
        </TabsContent>
      </Tabs>
    </div>
  );
}
