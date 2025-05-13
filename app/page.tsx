"use client"; // Add this directive at the top for client-side components

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
          <Link href="/auth" className="text-blue-600 dark:text-blue-300 hover:underline">
            Login
          </Link>
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
              href="/auth"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
            >
              Get Started
            </Link>
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
          {[
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
          ].map((feature) => (
            <div key={feature.title} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-2">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto mt-24 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
            <p>160 Sussex St, Sydney NSW 2000</p>
            <p>Support: <a href="tel:+6112345678" className="text-blue-600 dark:text-blue-400 hover:underline">+61 12345678</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}