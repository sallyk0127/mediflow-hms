'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Patient {
  name: string;
  id: string;
  age: number;
  gender: string;
  avatar: string;
  initials: string;
}

const patients: Patient[] = [
  {
    name: "Elizabeth Polson",
    id: "8271827",
    age: 42,
    gender: "Female",
    avatar: "/placeholder.svg",
    initials: "EP",
  },
  {
    name: "Krishtav Rajan",
    id: "8982314",
    age: 29,
    gender: "Male",
    avatar: "/placeholder.svg",
    initials: "KR",
  },
];

export default function PatientList() {
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Input
            type="search"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-4"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left text-sm font-medium text-gray-500">Patient Name</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Patient ID</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Age</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Gender</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback>{patient.initials}</AvatarFallback>
                  </Avatar>
                  {patient.name}
                </td>
                <td className="p-4">{patient.id}</td>
                <td className="p-4">{patient.age}</td>
                <td className="p-4">{patient.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
