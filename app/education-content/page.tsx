"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaseStudies from "./case-studies";
import Training from "./training";
import Wellness from "./wellness";
import News from "./news";

export default function EducationContentPage() {
  const [selectedTab, setSelectedTab] = useState("case-studies");
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
      <h1 className="text-2xl font-semibold mb-4">Education Content</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="relative flex border-b mb-4">
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300"
            ></div>
            {[
              { value: "case-studies", label: "Case Studies" },
              { value: "training", label: "Training" },
              { value: "wellness", label: "Wellness" },
              { value: "news", label: "News" },
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
            {selectedTab === "case-studies" && <CaseStudies />}
            {selectedTab === "training" && <Training />}
            {selectedTab === "wellness" && <Wellness />}
            {selectedTab === "news" && <News />}
          </div>
        </Tabs>
      </div>
    </div>
  );
}