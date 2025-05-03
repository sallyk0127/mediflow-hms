"use client";

import React from "react";

// Corrected types
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
  viewMode: "summary" | "details";
  selectedDivision: string;
  filteredRoomData: RoomData[];
  filteredBedDetails: RoomDetail[];
  onEdit: (bed: RoomDetail) => void;
};

export default function RoomTable({ viewMode, selectedDivision, filteredRoomData, filteredBedDetails, onEdit }: Props) {
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

  if (viewMode === "summary") {
    return (
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
    );
  }

  return (
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
              <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
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
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEdit(bed)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
