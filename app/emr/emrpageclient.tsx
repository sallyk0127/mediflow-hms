'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientRegistration from "./patient-registration";
import AdministrationInformation from "./administration-information";
import MedicalInformation from "./medical-information";
import PatientList from "./patient-list";
import { useToast } from "@/components/hooks/use-toast";

const initialPatientState = {
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
  department: '',
  bedNumber: '',
  attendingDoctor: '',

  medicalHistory: '',
  medications: '',
  allergies: '',
  conditions: '',
};

export default function EMRPageClient() {
  const [selectedTab, setSelectedTab] = useState("patient-list");
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("id");

  const [patientData, setPatientData] = useState(initialPatientState);

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
        return;
      }
    }

    if (newTab === "patient-list") {
      router.replace("/emr");
      setPatientData(initialPatientState);
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

  useEffect(() => {
    if (editId) {
      fetch(`/api/patients/${editId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setPatientData({
              ...initialPatientState,
              ...data,
              dob: data.dob?.split("T")[0] || '',
            });
            setSelectedTab("patient-registration");
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Failed to fetch patient details.",
            variant: "destructive",
          });
        });
    }
  }, [editId, toast]);

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
              { value: "patient-list", label: "Patient List" },
              { value: "patient-registration", label: "Patient Registration" },
              { value: "administration-information", label: "Administration Information" },
              { value: "medical-information", label: "Medical Information" },
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
