"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";

// Data for Chart and Table
type RoomData = {
  name: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  color: string;
};

const dataByDate: Record<string, RoomData[]> = {
  Today: [
    { name: "Med-Surgical", totalBeds: 30, occupiedBeds: 20, availableBeds: 10, color: "#5B9BD5" },
    { name: "ICU", totalBeds: 50, occupiedBeds: 35, availableBeds: 15, color: "#ED7D31" },
    { name: "Maternity Care", totalBeds: 40, occupiedBeds: 25, availableBeds: 15, color: "#FF6384" },
    { name: "Behavioural and Mental", totalBeds: 45, occupiedBeds: 30, availableBeds: 15, color: "#4472C4" },
    { name: "Senior Living", totalBeds: 20, occupiedBeds: 12, availableBeds: 8, color: "#70AD47" },
  ],
  Yesterday: [
    { name: "Med-Surgical", totalBeds: 25, occupiedBeds: 18, availableBeds: 7, color: "#5B9BD5" },
    { name: "ICU", totalBeds: 45, occupiedBeds: 33, availableBeds: 12, color: "#ED7D31" },
    { name: "Maternity Care", totalBeds: 38, occupiedBeds: 26, availableBeds: 12, color: "#FF6384" },
    { name: "Behavioural and Mental", totalBeds: 40, occupiedBeds: 29, availableBeds: 11, color: "#4472C4" },
    { name: "Senior Living", totalBeds: 18, occupiedBeds: 10, availableBeds: 8, color: "#70AD47" },
  ],
};

const dateOptions = ["Today", "Yesterday"];

export default function RoomAvailabilityChart() {
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const [activeTab, setActiveTab] = useState<string>("chart");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Room</h1>
      
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

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold">Bed Available</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dataByDate[selectedDate]}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="availableBeds" radius={[10, 10, 0, 0]}>
                      {dataByDate[selectedDate].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Bed Occupied</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dataByDate[selectedDate]}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="occupiedBeds" radius={[10, 10, 0, 0]}>
                      {dataByDate[selectedDate].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {activeTab === "table" && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold">Room Name</TableCell>
                  <TableCell className="font-bold">Total Beds</TableCell>
                  <TableCell className="font-bold">Occupied Beds</TableCell>
                  <TableCell className="font-bold">Available Beds</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataByDate[selectedDate].map((room) => (
                  <TableRow key={room.name} className="hover:bg-gray-100">
                    <TableCell>{room.name}</TableCell>
                    <TableCell>{room.totalBeds}</TableCell>
                    <TableCell>{room.occupiedBeds}</TableCell>
                    <TableCell>{room.availableBeds}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
