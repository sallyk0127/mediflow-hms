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
    <div className="flex flex-col w-full h-full bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Education Content</h1>
      <div className="bg-white rounded-lg shadow-md p-6 flex-1">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="relative flex border-b">
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
                className={`relative px-6 py-3 text-lg font-medium transition-all text-center border-b-2 $ {
                  selectedTab === tab.value ? "border-blue-500 text-blue-600" : "border-transparent text-gray-600"
                }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="p-6">
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