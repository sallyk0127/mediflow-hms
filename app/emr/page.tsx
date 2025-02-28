'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PatientRegistration from "./patient-registration";
import MedicalInformation from "./medical-information";

export default function EMRPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">EMR (Electronic Medical Records)</h1>
      
      <Tabs defaultValue="patient-registration" className="w-full">
        {/* ✅ Tabs Navigation */}
        <TabsList className="flex border-b">
          <TabsTrigger value="patient-registration">Patient Registration</TabsTrigger>
          <TabsTrigger value="administration-info">Administration Information</TabsTrigger>
          <TabsTrigger value="medical-info">Medical Information</TabsTrigger>
          <TabsTrigger value="patient-list">Patient List</TabsTrigger>
        </TabsList>

        {/* ✅ Patient Registration */}
        <TabsContent value="patient-registration">
          <PatientRegistration />
        </TabsContent>

        {/* ✅ Medical Information */}
        <TabsContent value="medical-info">
          <MedicalInformation />
        </TabsContent>

        {/* ✅ Administration Information Placeholder */}
        <TabsContent value="administration-info">
          <p className="p-4 text-gray-500">Administration Information section coming soon...</p>
        </TabsContent>

        {/* ✅ Patient List Placeholder */}
        <TabsContent value="patient-list">
          <p className="p-4 text-gray-500">Patient List section coming soon...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
