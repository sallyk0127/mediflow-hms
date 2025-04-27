'use client';

import React, { useState, useEffect } from 'react';
import DashboardBarChart from './DashboardBarChart';
import {
  ChevronDown,
  Users,
  Calendar,
  FilePlus2,
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

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = '';
    };
  }, []);

  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    { id: 'high-severity', label: 'High Severity (S3-S4)', checked: false },
    { id: 'low-severity', label: 'Low Severity (S1-S2)', checked: false },
    { id: 'dr-john', label: 'Dr. John', checked: false },
    { id: 'dr-joel', label: 'Dr. Joel', checked: false },
  ]);

  const appointments: Appointment[] = [
    { time: '9:30 AM', date: '15/02/2025', severity: 4, patientName: 'Elizabeth P', patientAvatar: '/avatars/elizabeth.jpg', doctor: 'Dr. John' },
    { time: '9:30 AM', date: '15/02/2025', severity: 4, patientName: 'John D', patientAvatar: '/avatars/john-david.jpg', doctor: 'Dr. Joel' },
    { time: '10:30 AM', date: '15/02/2025', severity: 3, patientName: 'Krishtav R', patientAvatar: '/avatars/krishtav.jpg', doctor: 'Dr. Joel' },
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
    { title: '4 Nutritions to Take Daily', author: 'Joel P', authorAvatar: '/avatars/joel.jpg' },
    { title: '6 Healthy Lifestyle Tips', author: 'John P', authorAvatar: '/avatars/john.jpg' },
    { title: "Do's and Don'ts in Hospital", author: 'Joel P', authorAvatar: '/avatars/joel.jpg' },
  ];

  const patientFees: PatientFee[] = [
    { name: 'EG Subramani', avatar: '/avatars/eg.jpg', pending: true },
    { name: 'Elizabeth P', avatar: '/avatars/elizabeth.jpg', pending: true },
    { name: 'Sumanth T', avatar: '/avatars/sumanth.jpg', pending: true },
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

  // Room Availibility Data
  const roomData = [
    { label: 'Med-Surgical', value: 50, color: 'bg-teal-400', textColor: 'text-teal-600' },
    { label: 'ICU', value: 75, color: 'bg-yellow-400', textColor: 'text-yellow-600' },
    { label: 'Maternity', value: 65, color: 'bg-red-500', textColor: 'text-red-600' },
    { label: 'Mental', value: 65, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { label: 'Senior', value: 40, color: 'bg-green-400', textColor: 'text-green-600' }
  ];  

  return (
    <div className="p-2 h-screen flex flex-col">
      <div className="mb-2">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Activity Overview */}
      <div className="mb-2 bg-white rounded-lg shadow-sm p-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-medium text-gray-700">Activity Overview</h2>
          <div className="relative">
            <button 
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200 text-xs"
              onClick={() => setShowTimeframeDropdown(!showTimeframeDropdown)}
            >
              <span className="text-xs text-gray-600">{timeframe}</span>
              <ChevronDown size={12} className={`transform transition-transform ${showTimeframeDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showTimeframeDropdown && (
              <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md z-10 py-1 border border-gray-200">
                {timeframeOptions.map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-3 py-1 text-xs hover:bg-blue-50 transition-colors duration-150 ${timeframe === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
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

        <div className="grid grid-cols-4 gap-2">
          <div className="bg-blue-50 p-2 rounded-lg text-center transition-transform hover:shadow-md duration-200">
            <div className="flex justify-center mb-1">
              <Calendar className="text-blue-600" size={16} />
            </div>
            <h3 className="text-lg font-bold">100</h3>
            <p className="text-xs text-gray-600">Appointments</p>
          </div>

          <div className="bg-green-50 p-2 rounded-lg text-center transition-transform hover:shadow-md duration-200">
            <div className="flex justify-center mb-1">
              <Users className="text-green-600" size={16} />
            </div>
            <h3 className="text-lg font-bold">50</h3>
            <p className="text-xs text-gray-600">New Patients</p>
          </div>

          <div className="bg-yellow-50 p-2 rounded-lg text-center transition-transform hover:shadow-md duration-200">
            <div className="flex justify-center mb-1">
              <UserCheck className="text-yellow-600" size={16} />
            </div>
            <h3 className="text-lg font-bold">50</h3>
            <p className="text-xs text-gray-600">Discharge</p>
          </div>

          <div className="bg-purple-50 p-2 rounded-lg text-center transition-transform hover:shadow-md duration-200">
            <div className="flex justify-center mb-1">
              <FilePlus2 className="text-purple-600" size={16} />
            </div>
            <h3 className="text-lg font-bold">100</h3>
            <p className="text-xs text-gray-600">Lab Tests</p>
          </div>
        </div>
      </div>

      {/* Main Content Area - All sections in a compact layout */}
      <div className="grid grid-cols-4 gap-2 mb-2" style={{ height: '35vh' }}>
        {/* Appointments Section - Takes 2 out of 4 columns */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm flex flex-col">
        <h2 className="text-sm font-medium text-gray-700 p-2">Appointment</h2>
          <div className="border-b border-gray-200 flex items-center h-8 p-2">
            <button 
              className={`px-3 py-1 text-xs font-medium transition-colors duration-200 hover:bg-gray-50 ${activeTab === 'new' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('new')}
            >
              New Appointments
            </button>
            <button 
              className={`px-3 py-1 text-xs font-medium transition-colors duration-200 hover:bg-gray-50 ${activeTab === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed Appointments
            </button>
            
            <div className="ml-auto mr-2 relative">
              <button 
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs
                ${activeFiltersCount > 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} 
                transition-colors duration-200`}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <Filter size={10} />
                <span className="text-xs">
                  {activeFiltersCount > 0 ? `(${activeFiltersCount})` : 'Filter'}
                </span>
              </button>
              
              {showFilterDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-200">
                  <div className="flex justify-between items-center p-2 border-b border-gray-200">
                    <h3 className="font-medium text-xs">Filter Appointments</h3>
                    <button 
                      className="text-blue-600 text-xs hover:text-blue-800 transition-colors"
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="p-2">
                    <h4 className="font-medium text-xs text-gray-500 mb-1">Severity</h4>
                    {filterOptions.slice(0, 2).map((option) => (
                      <div 
                        key={option.id} 
                        className="flex items-center mb-1 cursor-pointer hover:bg-gray-50 p-1 rounded" 
                        onClick={() => toggleFilterOption(option.id)}
                      >
                        {option.checked ? 
                          <CheckSquare size={12} className="text-blue-600 mr-1" /> : 
                          <Square size={12} className="text-gray-400 mr-1" />
                        }
                        <span className="text-xs">{option.label}</span>
                      </div>
                    ))}
                    
                    <h4 className="font-medium text-xs text-gray-500 mt-2 mb-1">Doctor</h4>
                    {filterOptions.slice(2).map((option) => (
                      <div 
                        key={option.id} 
                        className="flex items-center mb-1 cursor-pointer hover:bg-gray-50 p-1 rounded" 
                        onClick={() => toggleFilterOption(option.id)}
                      >
                        {option.checked ? 
                          <CheckSquare size={12} className="text-blue-600 mr-1" /> : 
                          <Square size={12} className="text-gray-400 mr-1" />
                        }
                        <span className="text-xs">{option.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-gray-200">
                    <button 
                      className="w-full bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-600 transition-colors"
                      onClick={() => setShowFilterDropdown(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-2 flex-grow">
            <div className="grid grid-cols-5 gap-1 mb-1 text-xs font-medium text-gray-500">
              <div className="flex items-center">
                Time <ChevronDown size={10} className="ml-1" />
              </div>
              <div className="flex items-center">
                Date <ChevronDown size={10} className="ml-1" />
              </div>
              <div className="flex items-center">
                Sev. <ChevronDown size={10} className="ml-1" />
              </div>
              <div className="flex items-center">
                Patient <ChevronDown size={10} className="ml-1" />
              </div>
              <div className="flex items-center">
                Dr. <ChevronDown size={10} className="ml-1" />
              </div>
            </div>

            {filteredAppointments.length > 0 ? (
              <div className="space-y-1">
                {filteredAppointments.map((appointment, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-5 gap-1 items-center text-xs p-1 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                  >
                    <div>{appointment.time}</div>
                    <div>{appointment.date}</div>
                    <div>
                      <span className={`inline-block px-1 py-0.5 rounded-md text-white text-xs ${getSeverityClass(appointment.severity)}`}>
                        S{appointment.severity}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-200 mr-1 overflow-hidden flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-xs">
                          {appointment.patientName.charAt(0)}
                        </div>
                      </div>
                      <span className="truncate">{appointment.patientName}</span>
                    </div>
                    <div>{appointment.doctor}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p className="text-xs">No matching appointments.</p>
                <button 
                  className="mt-1 text-blue-500 hover:text-blue-700 text-xs"
                  onClick={clearAllFilters}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Education Content - Takes 1 out of 4 columns */}
        <div className="bg-white rounded-lg shadow-sm flex flex-col">
          <div className="p-2 flex justify-between items-center">
            <h2 className="text-sm font-medium text-gray-700">Education Content</h2>
          </div>
          <div className="p-2 flex-grow">
            {educationContents.map((content, index) => (
              <div key={index} className="flex justify-between items-center mb-2 p-1 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-1 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-xs">
                      {content.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium truncate max-w-28">{content.title}</h3>
                    <p className="text-xs text-gray-500">{content.author}</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-2 py-0.5 rounded-md text-xs hover:bg-blue-600 shadow-sm hover:shadow transition-all">
                  Assign
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Fee - Takes 1 out of 4 columns */}
        <div className="bg-white rounded-lg shadow-sm flex flex-col">
          <div className="p-2 flex justify-between items-center">
            <h2 className="text-sm font-medium text-gray-700">Patient Fee</h2>
          </div>
          <div className="p-2 flex-grow">
            {patientFees.map((patient, index) => (
              <div key={index} className="flex justify-between items-center mb-2 p-1 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-1 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-xs">
                      {patient.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium truncate max-w-28">{patient.name}</h3>
                    <p className="text-xs text-red-500">Fee pending</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-2 py-0.5 rounded-md text-xs hover:bg-blue-600 shadow-sm transition-all">
                  Request
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Room Availability Chart */}
      <div className="bg-white rounded-lg shadow-sm p-2 pb-2 mb-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-gray-700 p-2">Room Availability</h2>
        <div className="relative">
          <button 
            className="flex items-center text-xs text-gray-600 hover:text-blue-600 focus:outline-none"
            onClick={() => setShowRoomTimeframeDropdown(!showRoomTimeframeDropdown)}
          >
            {roomTimeframe} <ChevronDown size={12} className="ml-1" />
          </button>
          
          {showRoomTimeframeDropdown && (
            <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md z-10 py-1 border border-gray-200">
              {roomTimeframeOptions.map((option) => (
                <button
                  key={option}
                  className={`block w-full text-left px-3 py-1 text-xs hover:bg-blue-50 transition-colors ${roomTimeframe === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
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
      <DashboardBarChart data={roomData} />
    </div>
    </div>
  );
};

export default Dashboard;