// page.tsx
'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Users,
  Calendar,
  FilePlus2,
  Maximize2,
  UserCheck,
  Filter,
  CheckSquare,
  Square
} from 'lucide-react';

interface Appointment {
  time: string;
  date: string;
  severity: number;
  patientName: string;
  patientAvatar: string;
  doctor: string;
}

interface EducationContent {
  title: string;
  author: string;
  authorAvatar: string;
}

interface PatientFee {
  name: string;
  avatar: string;
  pending: boolean;
}

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [timeframe, setTimeframe] = useState('Weekly');
  const [roomTimeframe, setRoomTimeframe] = useState('Today');
  const [showTimeframeDropdown, setShowTimeframeDropdown] = useState(false);
  const [showRoomTimeframeDropdown, setShowRoomTimeframeDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const timeframeOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  const roomTimeframeOptions = ['Today', 'This Week', 'This Month'];

  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    { id: 'high-severity', label: 'High Severity (S3-S4)', checked: false },
    { id: 'low-severity', label: 'Low Severity (S1-S2)', checked: false },
    { id: 'dr-john', label: 'Dr. John', checked: false },
    { id: 'dr-joel', label: 'Dr. Joel', checked: false },
  ]);

  const appointments: Appointment[] = [
    { time: '9:30 AM', date: '15/02/2025', severity: 4, patientName: 'Elizabeth Polson', patientAvatar: '/avatars/elizabeth.jpg', doctor: 'Dr. John' },
    { time: '9:30 AM', date: '15/02/2025', severity: 4, patientName: 'John David', patientAvatar: '/avatars/john-david.jpg', doctor: 'Dr. Joel' },
    { time: '10:30 AM', date: '15/02/2025', severity: 3, patientName: 'Krishtav Rajan', patientAvatar: '/avatars/krishtav.jpg', doctor: 'Dr. Joel' },
    { time: '11:00 AM', date: '15/02/2025', severity: 2, patientName: 'Sumanth Tinson', patientAvatar: '/avatars/sumanth.jpg', doctor: 'Dr. John' },
    { time: '11:30 AM', date: '15/02/2025', severity: 1, patientName: 'EG Subramani', patientAvatar: '/avatars/eg.jpg', doctor: 'Dr. John' },
  ];

  const filteredAppointments = appointments.filter(appointment => {
    // If no filters are active, show all appointments
    if (filterOptions.every(option => !option.checked)) {
      return true;
    }

    // Apply selected filters
    return filterOptions.some(option => {
      if (!option.checked) return false;
      
      switch (option.id) {
        case 'high-severity':
          return appointment.severity >= 3;
        case 'low-severity':
          return appointment.severity <= 2;
        case 'dr-john':
          return appointment.doctor === 'Dr. John';
        case 'dr-joel':
          return appointment.doctor === 'Dr. Joel';
        default:
          return false;
      }
    });
  });

  const educationContents: EducationContent[] = [
    { title: '4 Nutritions to Take Daily', author: 'Joel Paulliston', authorAvatar: '/avatars/joel.jpg' },
    { title: '6 Healthy Lifestyle Tips', author: 'John Paulliston', authorAvatar: '/avatars/john.jpg' },
    { title: "Do's and Don'ts in Hospital", author: 'Joel Paulliston', authorAvatar: '/avatars/joel.jpg' },
    { title: 'Healthy Habits to Follow', author: 'Unknown', authorAvatar: '/avatars/unknown.jpg' },
  ];

  const patientFees: PatientFee[] = [
    { name: 'EG Subramani', avatar: '/avatars/eg.jpg', pending: true },
    { name: 'Elizabeth Polson', avatar: '/avatars/elizabeth.jpg', pending: true },
    { name: 'Sumanth Tinson', avatar: '/avatars/sumanth.jpg', pending: true },
    { name: 'Krishtav Rajan', avatar: '/avatars/krishtav.jpg', pending: true },
  ];

  const getSeverityClass = (severity: number) => {
    switch (severity) {
      case 4: return 'bg-red-500';
      case 3: return 'bg-orange-500';
      case 2: return 'bg-yellow-400';
      case 1: return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const toggleFilterOption = (id: string) => {
    setFilterOptions(prevOptions =>
      prevOptions.map(option =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  const clearAllFilters = () => {
    setFilterOptions(prevOptions =>
      prevOptions.map(option => ({ ...option, checked: false }))
    );
  };
  
  // Count active filters
  const activeFiltersCount = filterOptions.filter(option => option.checked).length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Activity Overview */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-700">Activity Overview</h2>
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
              onClick={() => setShowTimeframeDropdown(!showTimeframeDropdown)}
            >
              <span className="text-sm text-gray-600">{timeframe}</span>
              <ChevronDown size={16} className={`transform transition-transform ${showTimeframeDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showTimeframeDropdown && (
              <div className="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-md z-10 py-1 border border-gray-200">
                {timeframeOptions.map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors duration-150 ${timeframe === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    onClick={() => {
                      setTimeframe(option);
                      setShowTimeframeDropdown(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center transition-transform hover:shadow-md hover:scale-105 duration-200">
            <div className="flex justify-center mb-2">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold">100</h3>
            <p className="text-sm text-gray-600">Appointments</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-center transition-transform hover:shadow-md hover:scale-105 duration-200">
            <div className="flex justify-center mb-2">
              <Users className="text-green-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold">50</h3>
            <p className="text-sm text-gray-600">New Patients</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg text-center transition-transform hover:shadow-md hover:scale-105 duration-200">
            <div className="flex justify-center mb-2">
              <UserCheck className="text-yellow-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold">50</h3>
            <p className="text-sm text-gray-600">Discharge</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg text-center transition-transform hover:shadow-md hover:scale-105 duration-200">
            <div className="flex justify-center mb-2">
              <FilePlus2 className="text-purple-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold">100</h3>
            <p className="text-sm text-gray-600">Lab Tests</p>
          </div>
        </div>
      </div>

      {/* Main Content Area - Modified to use 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Appointments Section - Takes 2 out of 3 columns */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button 
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50 ${activeTab === 'new' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('new')}
              >
                New Appointments
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50 ${activeTab === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('completed')}
              >
                Completed Appointments
              </button>
              
              <div className="ml-auto mr-4 relative">
                <button 
                  className={`flex items-center gap-1 px-3 py-1.5 mt-1.5 rounded 
                  ${activeFiltersCount > 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} 
                  transition-colors duration-200`}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <Filter size={14} />
                  <span className="text-xs font-medium">
                    {activeFiltersCount > 0 ? `Filters (${activeFiltersCount})` : 'Filter'}
                  </span>
                </button>
                
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-1 w-64 bg-white shadow-lg rounded-md z-10 border border-gray-200">
                    <div className="flex justify-between items-center p-3 border-b border-gray-200">
                      <h3 className="font-medium text-sm">Filter Appointments</h3>
                      <button 
                        className="text-blue-600 text-xs hover:text-blue-800 transition-colors"
                        onClick={clearAllFilters}
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-xs text-gray-500 mb-2">Severity</h4>
                      {filterOptions.slice(0, 2).map((option) => (
                        <div 
                          key={option.id} 
                          className="flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded" 
                          onClick={() => toggleFilterOption(option.id)}
                        >
                          {option.checked ? 
                            <CheckSquare size={16} className="text-blue-600 mr-2" /> : 
                            <Square size={16} className="text-gray-400 mr-2" />
                          }
                          <span className="text-sm">{option.label}</span>
                        </div>
                      ))}
                      
                      <h4 className="font-medium text-xs text-gray-500 mt-3 mb-2">Doctor</h4>
                      {filterOptions.slice(2).map((option) => (
                        <div 
                          key={option.id} 
                          className="flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded" 
                          onClick={() => toggleFilterOption(option.id)}
                        >
                          {option.checked ? 
                            <CheckSquare size={16} className="text-blue-600 mr-2" /> : 
                            <Square size={16} className="text-gray-400 mr-2" />
                          }
                          <span className="text-sm">{option.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <button 
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
                        onClick={() => setShowFilterDropdown(false)}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-5 gap-2 mb-2 text-xs font-medium text-gray-500">
              <div className="flex items-center">
                Time <ChevronDown size={14} className="ml-1" />
              </div>
              <div className="flex items-center">
                Date <ChevronDown size={14} className="ml-1" />
              </div>
              <div className="flex items-center">
                Severity <ChevronDown size={14} className="ml-1" />
              </div>
              <div className="flex items-center">
                Patient Name <ChevronDown size={14} className="ml-1" />
              </div>
              <div className="flex items-center">
                Doctor <ChevronDown size={14} className="ml-1" />
              </div>
            </div>

            {filteredAppointments.length > 0 ? (
              <div className="space-y-3">
                {filteredAppointments.map((appointment, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-5 gap-2 items-center text-sm p-2 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                  >
                    <div>{appointment.time}</div>
                    <div>{appointment.date}</div>
                    <div>
                      <span className={`inline-block px-2 py-1 rounded-md text-white text-xs ${getSeverityClass(appointment.severity)}`}>
                        S{appointment.severity}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 overflow-hidden flex-shrink-0">
                        {/* Replace with actual avatar */}
                        <div className="w-full h-full flex items-center justify-center text-xs font-medium">
                          {appointment.patientName.charAt(0)}
                        </div>
                      </div>
                      <span>{appointment.patientName}</span>
                    </div>
                    <div>{appointment.doctor}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No appointments match your filter criteria.</p>
                <button 
                  className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
                  onClick={clearAllFilters}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Education Content - Takes 1 out of 3 columns */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-700">Education Content</h2>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <Maximize2 size={16} />
            </button>
          </div>
          <div className="p-4 pt-0">
            {educationContents.map((content, index) => (
              <div key={index} className="flex justify-between items-center mb-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden flex-shrink-0">
                    {/* Replace with actual avatar */}
                    <div className="w-full h-full flex items-center justify-center text-xs font-medium">
                      {content.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{content.title}</h3>
                    <p className="text-xs text-gray-500">By {content.author}</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600 shadow-sm hover:shadow transition-all">
                  Assign
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second row with Room Availability and Patient Fee */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Room Availability - Takes 2 out of 3 columns */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-base font-medium text-gray-700">Room Availability</h2>
            <div className="relative">
              <button 
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                onClick={() => setShowRoomTimeframeDropdown(!showRoomTimeframeDropdown)}
              >
                <span className="text-xs text-gray-600">{roomTimeframe}</span>
                <ChevronDown size={14} className={`transform transition-transform ${showRoomTimeframeDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showRoomTimeframeDropdown && (
                <div className="absolute right-0 mt-1 w-36 bg-white shadow-lg rounded-md z-10 py-1 border border-gray-200">
                  {roomTimeframeOptions.map((option) => (
                    <button
                      key={option}
                      className={`block w-full text-left px-4 py-2 text-xs hover:bg-blue-50 transition-colors ${roomTimeframe === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                      onClick={() => {
                        setRoomTimeframe(option);
                        setShowRoomTimeframeDropdown(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="p-4 pt-2">
            <div className="flex items-end h-32 gap-2">
              <div className="relative h-16 w-full bg-teal-400 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer">
                <div className="absolute -top-6 w-full text-center text-xs">50</div>
              </div>
              <div className="relative h-24 w-full bg-yellow-400 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer">
                <div className="absolute -top-6 w-full text-center text-xs">75</div>
              </div>
              <div className="relative h-20 w-full bg-red-500 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer">
                <div className="absolute -top-6 w-full text-center text-xs">65</div>
              </div>
              <div className="relative h-20 w-full bg-blue-500 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer">
                <div className="absolute -top-6 w-full text-center text-xs">65</div>
              </div>
              <div className="relative h-12 w-full bg-green-400 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer">
                <div className="absolute -top-6 w-full text-center text-xs">40</div>
              </div>
            </div>
            <div className="grid grid-cols-5 mt-1 text-xs text-center">
              <div className="text-teal-600">Med-Surgical</div>
              <div className="text-yellow-600">ICU</div>
              <div className="text-red-600">Maternity Care</div>
              <div className="text-blue-600">Behavioral and Mental</div>
              <div className="text-green-600">Senior Living</div>
            </div>
          </div>
        </div>

        {/* Patient Fee - Takes 1 out of 3 columns */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-base font-medium text-gray-700">Patient Fee</h2>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <Maximize2 size={14} />
            </button>
          </div>
          <div className="p-4 pt-0">
            {patientFees.map((patient, index) => (
              <div key={index} className="flex justify-between items-center mb-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden flex-shrink-0">
                    {/* Replace with actual avatar or initial */}
                    <div className="w-full h-full flex items-center justify-center text-xs font-medium">
                      {patient.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{patient.name}</h3>
                    <p className="text-xs text-red-500">Doctor fee pending</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-600 shadow-sm hover:shadow transition-all">
                  Request Fee
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;