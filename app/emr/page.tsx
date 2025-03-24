'use client';

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientRegistration from "./patient-registration";
import MedicalInformation from "./medical-information";
import AdministrationInformation from "./administration-information";
import PatientList from "./patient-list";

export default function EMRPage() {
  const [selectedTab, setSelectedTab] = useState("patient-registration");
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    if (indicatorRef.current && tabRefs.current[selectedTab]) {
      const tabElement = tabRefs.current[selectedTab]!;
      indicatorRef.current.style.left = `${tabElement.offsetLeft}px`;
      indicatorRef.current.style.width = `${tabElement.offsetWidth}px`;
    }
  }, [selectedTab]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">EMR (Electronic Medical Records)</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
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
                onClick={() => setSelectedTab(tab.value)}
                className={`relative px-4 py-2 transition-all text-center ${
                  selectedTab === tab.value ? "font-bold text-blue-600" : "text-gray-600"
                }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="p-4">
            {selectedTab === "patient-registration" && <PatientRegistration setSelectedTab={setSelectedTab} />}
            {selectedTab === "administration-information" && <AdministrationInformation setSelectedTab={setSelectedTab} />}
            {selectedTab === "medical-information" && <MedicalInformation />}
            {selectedTab === "patient-list" && <PatientList />}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
