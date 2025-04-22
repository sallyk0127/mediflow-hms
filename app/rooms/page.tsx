"use client";

import React, { useState, useEffect } from "react";
import RoomChart from "./room-chart";
import RoomTable from "./room-table";
import { useToast } from "@/components/hooks/use-toast"; 

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

const getDivisionColor = (divisionName: string) => {
  switch (divisionName) {
    case "Med-Surgical": return "#5B9BD5";
    case "ICU": return "#ED7D31";
    case "Maternity Care": return "#FF6384";
    case "Behaviour and Mental": return "#9C27B0";
    case "Senior Living": return "#4CAF50";
    default: return "#8884d8";
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
  const [editingBed, setEditingBed] = useState<Bed | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { toast } = useToast();

  const fetchBeds = async () => {
    try {
      const res = await fetch("/api/beds");
      const data = await res.json();
      const beds: Bed[] = Array.isArray(data) ? data : data.beds; 
  
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
        if (bed.status === "AVAILABLE") divisionsMap[divisionName].availableBeds += 1;
        else divisionsMap[divisionName].occupiedBeds += 1;
      }
      setRoomData(Object.values(divisionsMap));
    } catch (error) {
      console.error("Failed to fetch beds:", error);
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => { fetchBeds(); }, []);

  const handleEditBed = (bed: RoomDetail) => {
    setEditingBed({
      id: bed.id,
      bedId: bed.id,
      division: "",
      location: bed.location,
      status: bed.status === "Available" ? "AVAILABLE" : "OCCUPIED",
      patientName: bed.patientName === "-" ? "" : bed.patientName,
      usedUntil: bed.usedUntil || null,
    });
    setShowEditModal(true);
  };

  const handleSaveBed = async () => {
    if (!editingBed) return;
    try {
      await fetch(`/api/beds/${editingBed.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: editingBed.patientName,
          status: editingBed.status,
          usedUntil: editingBed.usedUntil,
        }),
      });
      await fetchBeds();
      setShowEditModal(false);
  
      toast({
        title: "Bed Updated",
        description: "The bed information was successfully updated!",
      });
  
    } catch (error) {
      console.error("Error saving bed:", error);
  
      toast({
        title: "Update Failed",
        description: "Something went wrong while saving. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredRoomData = roomData.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDivision = selectedDivision === "All" || room.name === selectedDivision;
    const matchesStatus = statusFilter === "All" ||
      (statusFilter === "Available" && room.availableBeds > 0) ||
      (statusFilter === "Occupied" && room.occupiedBeds > 0);
    return matchesSearch && matchesDivision && matchesStatus;
  });

  const allRoomDetails = roomData
    .filter((room) => selectedDivision === "All" || room.name === selectedDivision)
    .flatMap((room) => room.details);

  const filteredBedDetails = allRoomDetails.filter((bed) => {
    const matchesSearch = bed.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bed.patientName !== "-" && bed.patientName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "All" || bed.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="p-6">Loading beds...</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Room Availability</h1>

      {/* Tabs and Filters */}
      <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md">
        <div className="flex space-x-4 ml-auto">
          <button onClick={() => setActiveTab("chart")} className={`px-4 py-2 ${activeTab === "chart" ? "text-blue-600 font-bold" : ""}`}>Chart</button>
          <button onClick={() => setActiveTab("table")} className={`px-4 py-2 ${activeTab === "table" ? "text-blue-600 font-bold" : ""}`}>Table</button>
        </div>
      </div>

      {activeTab === "table" && (
        <div className="space-y-3">
          <div className="flex space-x-4">
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border p-2 rounded-lg w-full" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-2 rounded-lg">
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)} className="border p-2 rounded-lg">
              <option value="All">All Divisions</option>
              {roomData.map((room) => (
                <option key={room.id} value={room.name}>{room.name}</option>
              ))}
            </select>
            <div className="flex border rounded-lg overflow-hidden">
              <button onClick={() => setViewMode("summary")} className={`px-4 py-2 ${viewMode === "summary" ? "bg-blue-500 text-white" : "bg-gray-100"}`}>Summary</button>
              <button onClick={() => setViewMode("details")} className={`px-4 py-2 ${viewMode === "details" ? "bg-blue-500 text-white" : "bg-gray-100"}`}>Details</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
        {activeTab === "chart" && <RoomChart roomData={roomData} />}
        {activeTab === "table" && (
          <RoomTable
            viewMode={viewMode}
            selectedDivision={selectedDivision}
            filteredRoomData={filteredRoomData}
            filteredBedDetails={filteredBedDetails}
            onEdit={handleEditBed}
          />
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingBed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Bed {editingBed.bedId}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input type="text" value={editingBed.patientName || ""} onChange={(e) => setEditingBed({ ...editingBed, patientName: e.target.value })} className="w-full p-2 border rounded-lg mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select value={editingBed.status} onChange={(e) => setEditingBed({ ...editingBed, status: e.target.value as "AVAILABLE" | "OCCUPIED" })} className="w-full p-2 border rounded-lg mt-1">
                <option value="AVAILABLE">Available</option>
                <option value="OCCUPIED">Occupied</option>
              </select>
            </div>
            {editingBed.status === "OCCUPIED" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Used Until</label>
                <input type="date" value={editingBed.usedUntil?.slice(0, 10) || ""} onChange={(e) => setEditingBed({ ...editingBed, usedUntil: e.target.value })} className="w-full p-2 border rounded-lg mt-1" />
              </div>
            )}
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Cancel</button>
              <button onClick={handleSaveBed} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
