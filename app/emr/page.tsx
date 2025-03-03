'use client';

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PatientRegistration from "./patient-registration";
import MedicalInformation from "./medical-information";
import AdministrationInformation from "./administration-information";
import PatientList from "./patient-list";

export default function EMRPage() {
  const [selectedTab, setSelectedTab] = useState("patient-registration");

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
        {selectedTab === "patient-registration" && <TabsContent value="patient-registration"><PatientRegistration /></TabsContent>}
        {selectedTab === "administration-info" && <TabsContent value="administration-info"><AdministrationInformation /></TabsContent>}
        {selectedTab === "medical-info" && <TabsContent value="medical-info"><MedicalInformation /></TabsContent>}
        {selectedTab === "patient-list" && <TabsContent value="patient-list"><PatientList /></TabsContent>}
      </Tabs>
    </div>
  );
}
