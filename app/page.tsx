"use client"; // Add this directive at the top for client-side components

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Feature {
  title: string;
  description: string;
}

interface FeatureModalProps {
  feature: Feature | null;
  onClose: () => void;
}

const FeatureModal = ({ feature, onClose }: FeatureModalProps) => {
  if (!feature) return null;

  const featureContent: Record<string, JSX.Element> = {
    "Appointment Scheduling": (
      <ol className="list-decimal pl-5 space-y-2">
        <li>Go to &quot;Appointments&quot; &gt; &quot;Schedule New.&quot;</li>
        <li>Select a patient, doctor, and preferred time.</li>
        <li>Choose Contact Preference (Email/Phone).</li>
        <li>Confirm the appointment.</li>
      </ol>
    ),
    "Bed Management": (
      <ol className="list-decimal pl-5 space-y-2">
        <li>Navigate to &quot;Bed Management.&quot;</li>
        <li>View available beds (Green = Available, Red = Occupied).</li>
        <li>Assign a bed to a patient by clicking &quot;Assign Bed.&quot;</li>
      </ol>
    ),
    "Electronic Medical Records": (
      <ol className="list-decimal pl-5 space-y-2">
        <li>Patient Registration input including administration and medical information.</li>
        <li>View or update medical history, prescriptions, and test results.</li>
      </ol>
    ),
    "Medicine Inventory": (
      <ol className="list-decimal pl-5 space-y-2">
        <li>Go to &quot;Medicine Inventory.&quot;</li>
        <li>Check stock levels and expiry dates.</li>
        <li>Add new stock.</li>
      </ol>
    ),
    "Staff Management": (
      <ol className="list-decimal pl-5 space-y-2">
        <li>Access &quot;Staff&quot; &gt; &quot;Roster.&quot;</li>
        <li>Assign shifts and manage leave requests.</li>
      </ol>
    ),
    "Educational Content": (
      <div className="space-y-2">
        <p>Access training materials under &quot;Educational Content&quot;</p>
        <p>Download wellness guides for patients.</p>
      </div>
    )
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{feature.title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-gray-600 dark:text-gray-300">
          {featureContent[feature.title]}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const dashboardImages = [
    "/dashboard.png",
    "/dashboard1.png",
    "/dashboard2.png",
    "/dashboard3.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === dashboardImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [dashboardImages.length]);

  const features: Feature[] = [
    {
      title: "Appointment Scheduling",
      description: "Easily schedule and manage patient appointments with doctors."
    },
    {
      title: "Bed Management",
      description: "Real-time view of bed availability and assignments."
    },
    {
      title: "Electronic Medical Records",
      description: "Secure access to patient history and medical data."
    },
    {
      title: "Medicine Inventory",
      description: "Track stock levels and manage medicine supplies."
    },
    {
      title: "Staff Management",
      description: "Efficiently manage staff schedules and shifts."
    },
    {
      title: "Educational Content",
      description: "Access training materials and patient wellness guides."
    }
  ];

  return (
    <div className="min-h-screen p-8 sm:p-12">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-16">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="MEDIFLOW-HMS Logo"
            width={48}
            height={48}
            className="h-12 w-auto"
            priority
          />
          <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            MEDIFLOW-HMS
          </h1>
        </div>
        <nav className="hidden sm:flex gap-6">
          <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:underline">
            Features
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Streamline Your Healthcare Management
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            MEDIFLOW-HMS is a comprehensive Healthcare Management System designed to 
            streamline hospital operations, improve patient care, and enhance administrative efficiency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#features"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium py-3 px-6 rounded-lg transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
          {dashboardImages.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`MEDIFLOW-HMS Dashboard ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute'
              }`}
              priority={index === 0}
            />
          ))}
        </div>
      </main>

      <section id="features" className="max-w-6xl mx-auto mt-24">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature: Feature) => (
            <div 
              key={feature.title} 
              onClick={() => setSelectedFeature(feature)}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-2">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto mt-24 pt-12 border-t border-gray-200 dark:border-gray-700">
        <div className="py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                <span>|</span>
                <span>Copyright © {new Date().getFullYear()} MEDIFLOW-HMS. All rights reserved.</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="MEDIFLOW-HMS Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">MEDIFLOW-HMS</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
                <p>160 Sussex St, Sydney NSW 2000</p>
                <p>Support: <a href="tel:+6112345678" className="text-blue-600 dark:text-blue-400 hover:underline">+61 12345678</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Feature Modal */}
      {selectedFeature && (
        <FeatureModal 
          feature={selectedFeature} 
          onClose={() => setSelectedFeature(null)} 
        />
      )}
    </div>
  );
}