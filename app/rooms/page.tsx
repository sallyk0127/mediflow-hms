"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Types
type RoomDetail = {
  id: string;
  patientName: string;
  location: string;
  status: "Available" | "Occupied";
  usedUntil?: string;
};

type RoomData = {
  id: string;
  name: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  color: string;
  details: RoomDetail[];
};

type Bed = {
  id: string;
  bedId: string;
  division: string;
  location: string;
  status: "AVAILABLE" | "OCCUPIED";
  patientName: string | null;
  usedUntil: string | null;
};

// Color helper
const getDivisionColor = (divisionName: string) => {
  switch (divisionName) {
    case "Med-Surgical":
      return "#5B9BD5";
    case "ICU":
      return "#ED7D31";
    case "Maternity Care":
      return "#FF6384";
    case "Behaviour and Mental":
      return "#9C27B0";
    case "Senior Living":
      return "#4CAF50";
    default:
      return "#8884d8"; // fallback
  }
};

export default function RoomAvailabilityChart() {
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<string>("chart");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedDivision, setSelectedDivision] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"summary" | "details">("summary");

  // Fetch beds from API
  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const res = await fetch("/api/beds");
        const beds: Bed[] = await res.json();

        const divisionsMap: Record<string, RoomData> = {};

        for (const bed of beds) {
          const divisionName = bed.division;

          if (!divisionsMap[divisionName]) {
            divisionsMap[divisionName] = {
              id: divisionName,
              name: divisionName,
              totalBeds: 0,
              occupiedBeds: 0,
              availableBeds: 0,
              color: getDivisionColor(divisionName),
              details: [],
            };
          }

          divisionsMap[divisionName].details.push({
            id: bed.bedId,
            patientName: bed.patientName || "-",
            location: bed.location,
            status: bed.status === "AVAILABLE" ? "Available" : "Occupied",
            usedUntil: bed.usedUntil || undefined,
          });

          divisionsMap[divisionName].totalBeds += 1;
          if (bed.status === "AVAILABLE") {
            divisionsMap[divisionName].availableBeds += 1;
          } else {
            divisionsMap[divisionName].occupiedBeds += 1;
          }
        }

        setRoomData(Object.values(divisionsMap));
      } catch (error) {
        console.error("Failed to fetch beds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeds();
  }, []);

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "-";
      return date.toLocaleDateString();
    } catch {
      return "-";
    }
  };

  // Filtering
  const filteredRoomData = roomData.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDivision = selectedDivision === "All" || room.name === selectedDivision;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Available" && room.availableBeds > 0) ||
      (statusFilter === "Occupied" && room.occupiedBeds > 0);

    return matchesSearch && matchesDivision && matchesStatus;
  });

  const allRoomDetails = roomData
    .filter((room) => selectedDivision === "All" || room.name === selectedDivision)
    .flatMap((room) => room.details);

  const filteredBedDetails = allRoomDetails.filter((bed) => {
    const matchesSearch =
      bed.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bed.patientName !== "-" && bed.patientName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "All" || bed.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="p-6">Loading beds...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Room Availability</h1>

      {/* Tabs */}
      <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md">
        <div className="flex space-x-4 ml-auto">
          <button
            onClick={() => setActiveTab("chart")}
            className={`px-4 py-2 ${activeTab === "chart" ? "text-blue-600 font-bold" : ""}`}
          >
            Chart
          </button>
          <button
            onClick={() => setActiveTab("table")}
            className={`px-4 py-2 ${activeTab === "table" ? "text-blue-600 font-bold" : ""}`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Filters */}
      {activeTab === "table" && (
        <div className="space-y-3">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded-lg w-full"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border p-2 rounded-lg"
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="border p-2 rounded-lg"
            >
              <option value="All">All Divisions</option>
              {roomData.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))}
            </select>

            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("summary")}
                className={`px-4 py-2 ${viewMode === "summary" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
              >
                Summary
              </button>
              <button
                onClick={() => setViewMode("details")}
                className={`px-4 py-2 ${viewMode === "details" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chart or Table */}
      <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
        {activeTab === "chart" && (
          <>
            <h2 className="text-lg font-semibold">Total Beds</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roomData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalBeds" radius={[10, 10, 0, 0]}>
                  {roomData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Available Beds */}
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Available Beds</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={roomData}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="availableBeds" fill="#4CAF50" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Occupied Beds */}
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Occupied Beds</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={roomData}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="occupiedBeds" fill="#F44336" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {activeTab === "table" && viewMode === "summary" && (
          <div>
            <h2 className="text-lg font-semibold">Division Summary</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium text-gray-500">Division</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-500">Total Beds</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-500">Occupied</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-500">Available</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-500">Occupancy Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRoomData.map((room) => (
                    <tr key={room.id}>
                      <td className="px-6 py-4">{room.name}</td>
                      <td className="px-6 py-4">{room.totalBeds}</td>
                      <td className="px-6 py-4">{room.occupiedBeds}</td>
                      <td className="px-6 py-4">{room.availableBeds}</td>
                      <td className="px-6 py-4">{Math.round((room.occupiedBeds / room.totalBeds) * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "table" && viewMode === "details" && (
          <div>
            <h2 className="text-lg font-semibold">{selectedDivision === "All" ? "All Beds" : `${selectedDivision} Beds`}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium text-gray-500">ID</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-500">Patient Name</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-500">Location</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-500">Used Until</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBedDetails.map((bed) => (
                    <tr key={bed.id}>
                      <td className="px-6 py-4">{bed.id}</td>
                      <td className="px-6 py-4">{bed.patientName}</td>
                      <td className="px-6 py-4">{bed.location}</td>
                      <td className="px-6 py-4">{bed.status}</td>
                      <td className="px-6 py-4">{formatDate(bed.usedUntil)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
