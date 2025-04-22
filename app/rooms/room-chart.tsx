"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Define RoomDetail type
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

type Props = {
  roomData: RoomData[];
};

export default function RoomChart({ roomData }: Props) {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
