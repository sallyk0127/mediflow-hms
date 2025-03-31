'use client';

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientRegistration from "./patient-registration";
import AdministrationInformation from "./administration-information";
import MedicalInformation from "./medical-information";
import PatientList from "./patient-list";
import { useToast } from "@/components/hooks/use-toast";

export default function EMRPage() {
  const [selectedTab, setSelectedTab] = useState("patient-registration");
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [patientData, setPatientData] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    preferredName: '',
    dob: '',
    maritalStatus: '',
    email: '',
    phoneNumber: '',
    address: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    billingNote: '',
    previousNames: '',

    medicareNumber: '',
    insuranceProvider: '',
    policyNumber: '',
    coverageType: '',
    billingAddress: '',
    paymentMethod: '',
    assignedRoom: '',
    Department: '',
    bedNumber: '',
    attendingDoctor: '',

    medicalHistory: '',
    medications: '',
    allergies: '',
    conditions: '',
  });

  const handlePatientChange = (value: string, field: string) => {
    setPatientData((prev) => ({ ...prev, [field]: value }));
  };

  const validatePatientForm = () => {
    return (
      patientData.firstName &&
      patientData.lastName &&
      patientData.gender &&
      patientData.dob
    );
  };

  const handleTabChange = (newTab: string) => {
    if (
      selectedTab === "patient-registration" &&
      (newTab === "administration-information" || newTab === "medical-information")
    ) {
      if (!validatePatientForm()) {
        toast({
          title: "Error",
          description: "First Name, Last Name, Gender and Date of Birth are required.",
          variant: "destructive",
        });
        return; // Prevent tab switch
      }
    }
    setSelectedTab(newTab);
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
      <h1 className="text-2xl font-semibold mb-4">EMR (Electronic Medical Records)</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="relative flex border-b mb-4">
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300"
            ></div>
            {[
              { value: "patient-registration", label: "Patient Registration" },
              { value: "administration-information", label: "Administration Information" },
              { value: "medical-information", label: "Medical Information" },
              { value: "patient-list", label: "Patient List" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-tab={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={`relative px-4 py-2 transition-all text-center ${
                  selectedTab === tab.value ? "font-bold text-blue-600" : "text-gray-600"
                }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="p-4">
            {selectedTab === "patient-registration" && (
              <PatientRegistration
                setSelectedTab={setSelectedTab}
                patientData={patientData}
                handlePatientChange={handlePatientChange}
              />
            )}
            {selectedTab === "administration-information" && (
              <AdministrationInformation
                setSelectedTab={setSelectedTab}
                patientData={patientData}
                handlePatientChange={handlePatientChange}
              />
            )}
            {selectedTab === "medical-information" && (
              <MedicalInformation
                patientData={patientData}
                handlePatientChange={handlePatientChange}
              />
            )}
            {selectedTab === "patient-list" && <PatientList />}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
