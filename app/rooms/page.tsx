"use client";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

type RoomData = {
  name: string;
  beds: number;
  color: string;
};

const dataByDate: Record<string, RoomData[]> = {
  Today: [
    { name: "Med-Surgical", beds: 30, color: "#5B9BD5" },
    { name: "ICU", beds: 50, color: "#ED7D31" },
    { name: "Maternity Care", beds: 40, color: "#FF6384" },
    { name: "Behavioural and Mental", beds: 45, color: "#4472C4" },
    { name: "Senior Living", beds: 20, color: "#70AD47" },
  ],
  Yesterday: [
    { name: "Med-Surgical", beds: 25, color: "#5B9BD5" },
    { name: "ICU", beds: 45, color: "#ED7D31" },
    { name: "Maternity Care", beds: 38, color: "#FF6384" },
    { name: "Behavioural and Mental", beds: 40, color: "#4472C4" },
    { name: "Senior Living", beds: 18, color: "#70AD47" },
  ],
  "Last 7 Days": [
    { name: "Med-Surgical", beds: 28, color: "#5B9BD5" },
    { name: "ICU", beds: 48, color: "#ED7D31" },
    { name: "Maternity Care", beds: 42, color: "#FF6384" },
    { name: "Behavioural and Mental", beds: 43, color: "#4472C4" },
    { name: "Senior Living", beds: 22, color: "#70AD47" },
  ],
  "Last 30 Days": [
    { name: "Med-Surgical", beds: 35, color: "#5B9BD5" },
    { name: "ICU", beds: 55, color: "#ED7D31" },
    { name: "Maternity Care", beds: 45, color: "#FF6384" },
    { name: "Behavioural and Mental", beds: 50, color: "#4472C4" },
    { name: "Senior Living", beds: 25, color: "#70AD47" },
  ],
};

const dateOptions = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days"];

export default function RoomAvailabilityChart() {
  const [selectedDate, setSelectedDate] = useState<string>("Today");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Room</h1>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Room Availability</h2>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-sm bg-transparent border-none outline-none cursor-pointer"
          >
            {dateOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataByDate[selectedDate as keyof typeof dataByDate]}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="beds" barSize={200} radius={[10, 10, 0, 0]}>
              {dataByDate[selectedDate as keyof typeof dataByDate].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
