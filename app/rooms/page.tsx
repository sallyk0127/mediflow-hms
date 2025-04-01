"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Data for Chart and Table
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

// Initial data
const initialData: Record<string, RoomData[]> = {
  "2025-04-01": [
    {
      id: "R001",
      name: "Med-Surgical",
      totalBeds: 30,
      occupiedBeds: 20,
      availableBeds: 10,
      color: "#5B9BD5",
      details: [
        { id: "MS-001", patientName: "-", location: "Floor 2, Room 201", status: "Available" },
        { id: "MS-002", patientName: "John Doe", location: "Floor 2, Room 202", status: "Occupied", usedUntil: "2025-04-05" },
        { id: "MS-003", patientName: "-", location: "Floor 2, Room 203", status: "Available" },
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
        { id: "ICU-001", patientName: "Jane Smith", location: "Floor 1, Room 101", status: "Occupied", usedUntil: "2025-04-03" },
        { id: "ICU-002", patientName: "-", location: "Floor 1, Room 102", status: "Available" },
        { id: "ICU-003", patientName: "-", location: "Floor 1, Room 103", status: "Available" },
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
        { id: "MC-001", patientName: "-", location: "Floor 3, Room 301", status: "Available" },
        { id: "MC-002", patientName: "Sarah Johnson", location: "Floor 3, Room 302", status: "Occupied", usedUntil: "2025-04-10" },
        { id: "MC-003", patientName: "-", location: "Floor 3, Room 303", status: "Available" },
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
        { id: "BM-001", patientName: "Robert Brown", location: "Floor 4, Room 401", status: "Occupied", usedUntil: "2025-04-08" },
        { id: "BM-002", patientName: "-", location: "Floor 4, Room 402", status: "Available" },
        { id: "BM-003", patientName: "Michael Davis", location: "Floor 4, Room 403", status: "Occupied", usedUntil: "2025-04-15" },
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
        { id: "SL-001", patientName: "Helen Wilson", location: "Floor 5, Room 501", status: "Occupied", usedUntil: "2025-04-06" },
        { id: "SL-002", patientName: "George Miller", location: "Floor 5, Room 502", status: "Occupied", usedUntil: "2025-04-07" },
        { id: "SL-003", patientName: "-", location: "Floor 5, Room 503", status: "Available" },
      ],
    },
  ],
};

// Mock shadcn UI components if they're not available
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className || ''}`}>{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border-b">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
);

export default function RoomAvailabilityChart() {
  // collect today date
  const today = new Date().toISOString().split('T')[0];
  
  // Convert dataByDate to state
  const [dataByDate, setDataByDate] = useState<Record<string, RoomData[]>>(initialData);
  
  // use today as default
  const [selectedDate, setSelectedDate] = useState<string>("2025-04-01");
  const [activeTab, setActiveTab] = useState<string>("chart");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedDivision, setSelectedDivision] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"summary" | "details">("summary");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomDetail | null>(null);
  const [previousStatus, setPreviousStatus] = useState<"Available" | "Occupied">("Available");

  // State for add rooms
  const [newRoom, setNewRoom] = useState<{
    patientName: string;
    location: string;
    status: "Available" | "Occupied";
    usedUntil?: string;
  }>({
    patientName: "",
    location: "",
    status: "Available",
    usedUntil: "",
  });

  // Date format - Fixed to use safer locale handling
  const formatDisplayDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      // Use more universal date formatting
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  // Get data use date
  const getDataForSelectedDate = () => {
    if (dataByDate[selectedDate]) {
      return dataByDate[selectedDate];
    }
   
    const availableDates = Object.keys(dataByDate).sort();
    
    // Add fallback if no dates are available
    if (availableDates.length === 0) {
      return [];
    }
    
    for (let i = availableDates.length - 1; i >= 0; i--) {
      if (availableDates[i] <= selectedDate) {
        return dataByDate[availableDates[i]];
      }
    }
    
    return dataByDate[availableDates[0]];
  };

  // Handler for opening edit modal
  const handleEditRoom = (room: RoomDetail) => {
    setEditingRoom(room);
    setPreviousStatus(room.status);
    setIsEditModalOpen(true);
  };

  // Handle input change for editing room - FIXED: removed duplicate definition
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (!editingRoom) return;
    
    if (name === "status") {
      // If changing status, store the previous status
      setPreviousStatus(editingRoom.status);
    }
    
    setEditingRoom(prev => prev ? { ...prev, [name]: value } : null);
  };

  // Save edited room
  const handleSaveRoom = () => {
    if (!editingRoom || !editingRoom.location) {
      alert("Please fill in all required fields");
      return;
    }

    // Validation for Occupied status
    if (editingRoom.status === "Occupied" && (!editingRoom.patientName || editingRoom.patientName === "-")) {
      alert("Patient name is required for occupied rooms");
      return;
    }

    if (editingRoom.status === "Occupied" && !editingRoom.usedUntil) {
      alert("Date is required for occupied rooms");
      return;
    }

    // Find the division that contains this room
    const divisions = getDataForSelectedDate();
    let updatedDivisions = [...divisions];
    
    for (let i = 0; i < updatedDivisions.length; i++) {
      const division = updatedDivisions[i];
      const roomIndex = division.details.findIndex(r => r.id === editingRoom.id);
      
      if (roomIndex !== -1) {
        // Update the room details
        let updatedDivision = { ...division };
        const updatedDetails = [...updatedDivision.details];
        
        // Handle status change and patient name logic
        if (previousStatus !== editingRoom.status) {
          if (editingRoom.status === "Available") {
            // If changing from Occupied to Available
            updatedDivision.occupiedBeds -= 1;
            updatedDivision.availableBeds += 1;
            // Clear patient name and usedUntil for Available rooms
            editingRoom.patientName = "-";
            delete editingRoom.usedUntil;
          } else {
            // If changing from Available to Occupied
            updatedDivision.occupiedBeds += 1;
            updatedDivision.availableBeds -= 1;
          }
        }
        
        updatedDetails[roomIndex] = editingRoom;
        updatedDivision.details = updatedDetails;
        updatedDivisions[i] = updatedDivision;
        
        // Update the data
        const updatedDataByDate = { ...dataByDate };
        updatedDataByDate[selectedDate] = updatedDivisions;
        
        // Update the state with the new data
        setDataByDate(updatedDataByDate);
        
        break;
      }
    }
    
    // Close modal and reset state
    setIsEditModalOpen(false);
    setEditingRoom(null);
  };

  // Filter room data based on division and selected status
  const filteredRoomData = getDataForSelectedDate().filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDivision = selectedDivision === "All" || room.name === selectedDivision;
    const matchesStatus = statusFilter === "All" || 
      (statusFilter === "Available" && room.availableBeds > 0) || 
      (statusFilter === "Occupied" && room.occupiedBeds > 0);
    
    return matchesSearch && matchesDivision && matchesStatus;
  });

  // Collect Room Details
  const allRoomDetails = getDataForSelectedDate()
    .filter(room => selectedDivision === "All" || room.name === selectedDivision)
    .flatMap(room => room.details);

  // Filter detail bed
  const filteredBedDetails = allRoomDetails.filter(bed => {
    const matchesSearch = 
      bed.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bed.patientName !== "-" && bed.patientName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "All" || bed.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handler for input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  // Add New Room
  const handleAddRoom = () => {
    if (!selectedDivision || selectedDivision === "All" || !newRoom.location) {
      alert("Please select a division and fill in all required fields");
      return;
    }

    // Validation status
    if (newRoom.status === "Occupied" && !newRoom.patientName) {
      alert("Patient name is required for occupied rooms");
      return;
    }

    if (newRoom.status === "Occupied" && !newRoom.usedUntil) {
      alert("Date is required for occupied rooms");
      return;
    }

    // Collect Index
    const divisions = getDataForSelectedDate();
    const divisionIndex = divisions.findIndex(
      (room) => room.name === selectedDivision
    );

    if (divisionIndex === -1) return;

    // Create new id use selected div
    const division = divisions[divisionIndex];
    // FIXED: Added a safe check for empty details array
    const prefix = division.details.length > 0 
      ? division.details[0]?.id.split('-')[0] 
      : division.name.substring(0, 2).toUpperCase();
      
    const newId = `${prefix}-${String(division.details.length + 1).padStart(3, '0')}`;

    // Add new detail room
    const newBed: RoomDetail = {
      id: newId,
      patientName: newRoom.status === "Available" ? "-" : newRoom.patientName,
      location: newRoom.location,
      status: newRoom.status,
      ...(newRoom.status === "Occupied" && newRoom.usedUntil ? { usedUntil: newRoom.usedUntil } : {}),
    };

    const updatedDataByDate = { ...dataByDate };
    const currentData = [ ...divisions ];
    const updatedDivision = { ...division };
    
    updatedDivision.details = [...updatedDivision.details, newBed];
    
    // Update totalBeds, occupiedBeds, dan availableBeds
    updatedDivision.totalBeds += 1;
    if (newRoom.status === "Occupied") {
      updatedDivision.occupiedBeds += 1;
    } else {
      updatedDivision.availableBeds += 1;
    }
    
    currentData[divisionIndex] = updatedDivision;
    updatedDataByDate[selectedDate] = currentData;
    
    // Update state with the new data
    setDataByDate(updatedDataByDate);
    
    // Reset form and close modal
    setNewRoom({
      patientName: "",
      location: "",
      status: "Available",
      usedUntil: "",
    });
    setIsAddModalOpen(false);
  };

  // Format date for display
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "-";
    
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return "-";
      return date.toLocaleDateString();
    } catch (e) {
      return "-"; 
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Room Availability</h1>
      
      {/* Date Picker & Tabs */}
      <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <label htmlFor="date-picker" className="text-sm font-medium text-gray-600">Date:</label>
          <input
            id="date-picker"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={today}
            className="border p-2 rounded-lg"
          />
          <span className="text-sm text-gray-600 ml-2">
            {formatDisplayDate(selectedDate)}
          </span>
        </div>
        <div className="flex space-x-4">
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
              {getDataForSelectedDate().map((room) => (
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
              <BarChart data={getDataForSelectedDate()}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalBeds" radius={[10, 10, 0, 0]}>
                  {getDataForSelectedDate().map((entry, index) => (
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
                  <BarChart data={getDataForSelectedDate()}>
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
                  <BarChart data={getDataForSelectedDate()}>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Beds</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRoomData.map((room) => (
                    <tr key={room.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{room.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{room.totalBeds}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{room.occupiedBeds}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{room.availableBeds}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{Math.round((room.occupiedBeds / room.totalBeds) * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "table" && viewMode === "details" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {selectedDivision === "All" ? "All Beds" : `${selectedDivision} Beds`}
              </h2>
              
              {/* Add Room Button(If not All Div) */}
              {selectedDivision !== "All" && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Add Room
                </button>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used Until</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBedDetails.map((bed) => (
                    <tr key={bed.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{bed.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{bed.patientName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{bed.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-2 py-1 rounded ${
                            bed.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {bed.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatDate(bed.usedUntil)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleEditRoom(bed)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Room Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Room to {selectedDivision}</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newRoom.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                </select>
              </div>
              
              {/* Patient Name field - Conditionally required when status is Occupied */}
              {newRoom.status === "Occupied" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={newRoom.patientName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={newRoom.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g. Floor 2, Room 204"
                  required
                />
              </div>
              
              {newRoom.status === "Occupied" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Used Until <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="usedUntil"
                    value={newRoom.usedUntil}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRoom}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Room {editingRoom.id}</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={editingRoom.status}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                </select>
              </div>
              
              {/* Patient Name field - Always show but mark required only when Occupied */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name {editingRoom.status === "Occupied" && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={editingRoom.patientName === "-" ? "" : editingRoom.patientName}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g. John Doe"
                  required={editingRoom.status === "Occupied"}
                  disabled={editingRoom.status === "Available"}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={editingRoom.location}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g. Floor 2, Room 204"
                  required
                />
              </div>
              
              {/* Only show usedUntil field when Occupied */}
              {editingRoom.status === "Occupied" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Used Until <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="usedUntil"
                    value={editingRoom.usedUntil || ""}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRoom}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}