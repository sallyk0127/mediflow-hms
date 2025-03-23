"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";

// Data for Chart and Table
type RoomDetail = {
  id: string;
  bedNumber: string;
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

// Updated data with additional divisions
const dataByDate: Record<string, RoomData[]> = {
  Today: [
    {
      id: "R001",
      name: "Med-Surgical",
      totalBeds: 30,
      occupiedBeds: 20,
      availableBeds: 10,
      color: "#5B9BD5",
      details: [
        { id: "MS-001", bedNumber: "Bed 1", location: "Floor 2, Room 201", status: "Available" },
        { id: "MS-002", bedNumber: "Bed 2", location: "Floor 2, Room 202", status: "Occupied", usedUntil: "16:00" },
        { id: "MS-003", bedNumber: "Bed 3", location: "Floor 2, Room 203", status: "Available" },
      ],
    },
    {
      id: "R002",
      name: "ICU",
      totalBeds: 30,
      occupiedBeds: 10,
      availableBeds: 20,
      color: "#ED7D31",
      details: [
        { id: "ICU-001", bedNumber: "Bed 1", location: "Floor 1, Room 101", status: "Occupied", usedUntil: "14:00" },
        { id: "ICU-002", bedNumber: "Bed 2", location: "Floor 1, Room 102", status: "Available" },
        { id: "ICU-003", bedNumber: "Bed 3", location: "Floor 1, Room 103", status: "Available" },
      ],
    },
    {
      id: "R003",
      name: "Maternity Care",
      totalBeds: 40,
      occupiedBeds: 25,
      availableBeds: 15,
      color: "#FF6384",
      details: [
        { id: "MC-001", bedNumber: "Bed 1", location: "Floor 3, Room 301", status: "Available" },
        { id: "MC-002", bedNumber: "Bed 2", location: "Floor 3, Room 302", status: "Occupied", usedUntil: "20:00" },
        { id: "MC-003", bedNumber: "Bed 3", location: "Floor 3, Room 303", status: "Available" },
      ],
    },
    {
      id: "R004",
      name: "Behaviour and Mental",
      totalBeds: 25,
      occupiedBeds: 18,
      availableBeds: 7,
      color: "#9C27B0",
      details: [
        { id: "BM-001", bedNumber: "Bed 1", location: "Floor 4, Room 401", status: "Occupied", usedUntil: "18:30" },
        { id: "BM-002", bedNumber: "Bed 2", location: "Floor 4, Room 402", status: "Available" },
        { id: "BM-003", bedNumber: "Bed 3", location: "Floor 4, Room 403", status: "Occupied", usedUntil: "22:00" },
      ],
    },
    {
      id: "R005",
      name: "Senior Living",
      totalBeds: 35,
      occupiedBeds: 28,
      availableBeds: 7,
      color: "#4CAF50",
      details: [
        { id: "SL-001", bedNumber: "Bed 1", location: "Floor 5, Room 501", status: "Occupied", usedUntil: "15:45" },
        { id: "SL-002", bedNumber: "Bed 2", location: "Floor 5, Room 502", status: "Occupied", usedUntil: "17:30" },
        { id: "SL-003", bedNumber: "Bed 3", location: "Floor 5, Room 503", status: "Available" },
      ],
    },
  ],
};

const dateOptions = ["Today"];

export default function RoomAvailabilityChart() {
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const [activeTab, setActiveTab] = useState<string>("chart");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedDivision, setSelectedDivision] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"summary" | "details">("summary");

  // Filter room data based on selected division and status
  const filteredRoomData = dataByDate[selectedDate].filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDivision = selectedDivision === "All" || room.name === selectedDivision;
    const matchesStatus = statusFilter === "All" || 
      (statusFilter === "Available" && room.availableBeds > 0) || 
      (statusFilter === "Occupied" && room.occupiedBeds > 0);
    
    return matchesSearch && matchesDivision && matchesStatus;
  });

  // Get all room details flattened for the detail view
  const allRoomDetails = dataByDate[selectedDate]
    .filter(room => selectedDivision === "All" || room.name === selectedDivision)
    .flatMap(room => room.details);

  // Filter bed details based on search query and status filter
  const filteredBedDetails = allRoomDetails.filter(bed => {
    const matchesSearch = 
      bed.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || bed.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Room Availability</h1>
      
      {/* Dropdown & Tabs */}
      <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md">
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded-lg"
        >
          {dateOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <TabsList className="flex space-x-4">
          <TabsTrigger 
            value="chart" 
            onClick={() => setActiveTab("chart")}
            className={activeTab === "chart" ? "text-blue-600 font-bold" : ""}
          >
            Chart
          </TabsTrigger>
          <TabsTrigger 
            value="table" 
            onClick={() => setActiveTab("table")}
            className={activeTab === "table" ? "text-blue-600 font-bold" : ""}
          >
            Table
          </TabsTrigger>
        </TabsList>
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
              {dataByDate[selectedDate].map((room) => (
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

      {/* Chart & Table Section */}
      <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
        {activeTab === "chart" && (
          <>
            <h2 className="text-lg font-semibold">Total Beds</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataByDate[selectedDate]}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalBeds" radius={[10, 10, 0, 0]}>
                  {dataByDate[selectedDate].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Available Beds Chart */}
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Available Beds</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dataByDate[selectedDate]}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="availableBeds" fill="#4CAF50" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Occupied Beds Chart */}
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Occupied Beds</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dataByDate[selectedDate]}>
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
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Division</TableCell>
                    <TableCell>Total Beds</TableCell>
                    <TableCell>Occupied</TableCell>
                    <TableCell>Available</TableCell>
                    <TableCell>Occupancy Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRoomData.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell>{room.name}</TableCell>
                      <TableCell>{room.totalBeds}</TableCell>
                      <TableCell>{room.occupiedBeds}</TableCell>
                      <TableCell>{room.availableBeds}</TableCell>
                      <TableCell>{Math.round((room.occupiedBeds / room.totalBeds) * 100)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {activeTab === "table" && viewMode === "details" && (
          <div>
            <h2 className="text-lg font-semibold">
              {selectedDivision === "All" ? "All Beds" : `${selectedDivision} Beds`}
            </h2>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Bed Number</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Used Until</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBedDetails.map((bed) => (
                    <TableRow key={bed.id}>
                      <TableCell>{bed.id}</TableCell>
                      <TableCell>{bed.bedNumber}</TableCell>
                      <TableCell>{bed.location}</TableCell>
                      <TableCell>
                        <span 
                          className={`px-2 py-1 rounded ${
                            bed.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {bed.status}
                        </span>
                      </TableCell>
                      <TableCell>{bed.usedUntil || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
}