"use client";

import React, { useState, useEffect } from 'react';
import DashboardBarChart from './DashboardBarChart';
import {
  Users,
  Calendar,
  Bed,
  UserCheck,
  ExternalLink,
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";

interface Appointment {
  id: string;
  time: string;
  date: string;
  severity: string;
  patientName: string;
  patientId: string;
  doctorName: string;
}

interface TrainingSession {
  role: string;
  title: string;
  description: string;
}

interface PatientData {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string | null;
  phoneNumber: string | null;
  medicareNumber: string | null;
  createdAt: string;
}

interface RoomDetail {
  id: string;
  patientName: string;
  location: string;
  status: "Available" | "Occupied";
  usedUntil?: string;
}

interface RoomData {
  id: string;
  name: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  color: string;
  details: RoomDetail[];
}

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('new');
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [selectedTraining, setSelectedTraining] = useState<TrainingSession | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  // Training sessions data from training.tsx
  const trainingSessions: TrainingSession[] = [
    {
      role: "Nurses",
      title: "Autism Awareness",
      description: `Autism Awareness Training for Nurses

        Introduction  
        Autism Spectrum Disorder (ASD) affects many individuals and their families. As nurses, it's essential to understand how to interact with and support autistic patients effectively. This report outlines key areas of focus for autism awareness training.

        Understanding Autism  
        Autism is a developmental disorder characterized by challenges in communication, social interaction, and behavioral patterns. Recognizing the early signs, such as delayed speech or difficulties in social situations, is crucial for timely intervention.

        Sensory Sensitivities  
        Many autistic individuals experience sensory sensitivities. This can include heightened responses to sounds, lights, or textures. Nurses should be aware of these sensitivities to create a comfortable healthcare environment. For example, dimming lights or reducing noise during examinations can help ease anxiety for the patient.

        Supporting Families  
        Families of autistic children often feel anxious and protective. It's vital for nurses to approach these families with empathy and understanding. Open communication is key; reassure them that their concerns are valid and that support is available. Providing resources and connecting them with support groups can also be beneficial.

        Effective Communication Strategies  
        When interacting with autistic patients, use clear and simple language. Avoid jargon and be patient, allowing extra time for responses. Non-verbal communication, like using visual aids, can also enhance understanding. Always listen actively and validate the patient's feelings.

        Creating an Inclusive Healthcare Environment  
        Nurses play a significant role in fostering inclusivity. This includes being mindful of sensory triggers and creating a calming atmosphere. Training sessions should focus on practical strategies to improve patient interactions and create a welcoming environment for all.

        Continuous Education  
        To better understand autism spectrum disorders, nurses should engage in ongoing education. Workshops, seminars, and online courses can provide valuable insights into best practices for patient care.

        Conclusion  
        By focusing on these key areas, nurses can enhance their understanding of autism and improve their interactions with autistic patients and their families. This training will not only benefit the patients but also create a more supportive healthcare environment.`,
    },
    {
      role: "Nurses, Doctors, and Staff",
      title: "Self Wellbeing",
      description: `Self Wellbeing Training

        1. Recognizing Signs of Stress  
        Be aware of the signs of stress in yourself and your colleagues. This could include changes in mood, irritability, fatigue, or withdrawal from social interactions. Recognizing these signs early can help address issues before they escalate.

        2. Self-Care Strategies  
        Make sure to take care of yourself. This could mean taking short breaks during your shift, staying hydrated, and eating well. Find activities outside of work that help you relax, like exercising, reading, or spending time with friends and family.

        3. Seeking Help  
        Don't hesitate to seek help if you're feeling overwhelmed. Our hospital offers employees assistance programs (EAPs) that provide confidential counseling services. It's important to talk to someone about what you're going through.

        4. Peer Support  
        Connect with your colleagues. Sometimes just talking to someone who understands what you're experiencing can be really helpful. Consider forming a support group with your fellow nurses or staff to share experiences and coping strategies.

        5. Mindfulness and Stress Management  
        Techniques like mindfulness, meditation, or yoga can really help manage stress. Even taking a few minutes to breathe deeply or practice mindfulness during a break can make a difference.

        By implementing these strategies, you can better support your own mental health and that of your colleagues. Remember, taking care of yourself is essential to providing the best care for your patients.`,
    },
    {
      role: "All Healthcare Professionals",
      title: "Proper Report Writing",
      description: `Proper Report Writing Training

        Here are some things to consider when writing professional reports:

        1. Clarity and Conciseness  
        Make sure your writing is clear and to the point. Avoid jargon or overly complex language. Use simple terms so that anyone reading the report can understand it easily.

        2. Structure  
        Organize your report logically. Start with an introduction, followed by the body where you detail the observations, assessments, and interventions, and then conclude with any recommendations or follow-up actions.

        3. Accuracy  
        Ensure all information is accurate and factual. Double-check any statistics or data you include. If you're referencing patient information, make sure it's correct and up to date.

        4. Objective Tone  
        Use an objective and professional tone throughout your report. Avoid personal opinions or emotional language. Stick to the facts and observations.

        5. Use of Headings and Bullet Points  
        This can help break up the text and make it easier to read. Headings can guide the reader through different sections, and bullet points can highlight key information.

        By keeping these points in mind, you can write effective and professional reports that will be valuable for patient care and communication within the healthcare team.`,
    },
  ];

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Fetch real room data
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // Try to fetch real data
        const res = await fetch("/api/beds");
        const data = await res.json();
        // Add a safety check for the data structure
        const beds = data && Array.isArray(data) ? data : data && data.beds && Array.isArray(data.beds) ? data.beds : [];

        const divisionsMap: Record<string, RoomData> = {};
        
        // Define division colors
        const getDivisionColor = (divisionName: string) => {
          switch (divisionName) {
            case "Med-Surgical": return "bg-blue-500";
            case "ICU": return "bg-orange-500";
            case "Maternity Care": return "bg-pink-500";
            case "Behaviour and Mental": return "bg-purple-500";
            case "Senior Living": return "bg-green-500";
            default: return "bg-indigo-500";
          }
        };

        for (const bed of beds) {
          // Make sure the bed has a valid division name
          const divisionName = bed.division || "Unknown";
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
            id: bed.bedId || `bed-${Math.random().toString(36).substr(2, 9)}`,
            patientName: bed.patientName ? bed.patientName.replace(/ \[\d+\]$/, "") : "-",
            location: bed.location || "-",
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
        // Set empty array as fallback
        setRoomData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, []);

  // Fetch patient data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/patients/list?page=1&limit=5');
        const data = await response.json();
        // Add safety check for the response structure
        setPatients(data && data.patients && Array.isArray(data.patients) ? data.patients : []);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        // Set empty array as fallback
        setPatients([]);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, []);

  // Fetch appointment data
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoadingAppointments(true);
      try {
        const res = await fetch(`/api/appointments?status=${activeTab}&page=1&limit=5`);
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setAppointments(result.data);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error(`Failed to fetch ${activeTab} appointments:`, error);
        setAppointments([]);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, [activeTab]);

  const markAsCompleted = async (id: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "PATCH" });
      const result = await res.json();
      if (result.success) {
        toast({ title: "Marked Completed", description: "Appointment has been marked as completed." });
        // Refresh appointment data
        const updatedRes = await fetch(`/api/appointments?status=${activeTab}&page=1&limit=5`);
        const updatedResult = await updatedRes.json();
        if (updatedResult.success && Array.isArray(updatedResult.data)) {
          setAppointments(updatedResult.data);
        }
      } else {
        toast({ title: "Error", description: result.error || "Failed to update status", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error marking appointment as completed:", error);
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    
    try {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch (error) {
      console.error("Error calculating age:", error);
      return 0;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "S4": return "bg-red-500";
      case "S3": return "bg-orange-500";
      case "S2": return "bg-yellow-400";
      case "S1": return "bg-green-500";
      default: return "bg-gray-400";
    }
  };

  // Create chart data for available beds with a safety check
  const availableBedData = roomData ? roomData.map(room => ({
    label: room.name,
    value: room.availableBeds, 
    color: room.color,
    textColor: 'text-gray-700'
  })) : [];

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
              <Bed className="text-purple-600" size={16} />
            </div>
            <h3 className="text-lg font-bold">{roomData ? roomData.reduce((total, room) => total + room.totalBeds, 0) : 0}</h3>
            <p className="text-xs text-gray-600">Total Beds</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-2 gap-2 mb-2" style={{ height: '35vh' }}>
        {/* Appointments Section with updated format */}
        <div className="bg-white rounded-lg shadow-sm flex flex-col">
          <div className="flex justify-between items-center p-2">
            <h2 className="text-sm font-medium text-gray-700">Appointment</h2>
            <a href="/appointments" className="text-blue-500 text-xs hover:underline flex items-center">
              View All <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
          
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
          </div>
          
          <div className="p-2 flex-grow overflow-auto">
            {loadingAppointments ? (
              <div className="text-center py-4 text-gray-500">
                <p className="text-xs">Loading appointments...</p>
              </div>
            ) : appointments.length > 0 ? (
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="p-1">Time</th>
                    <th className="p-1">Date</th>
                    <th className="p-1">Sev.</th>
                    <th className="p-1">Patient</th>
                    <th className="p-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b hover:bg-gray-50">
                      <td className="p-1">{appointment.time}</td>
                      <td className="p-1">{format(new Date(appointment.date), "dd/MM/yyyy")}</td>
                      <td className="p-1">
                        <span className={`inline-block px-1 py-0.5 rounded-md text-white text-xs ${getSeverityClass(appointment.severity)}`}>
                          {appointment.severity}
                        </span>
                      </td>
                      <td className="p-1">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-gray-200 mr-1 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <span className="text-xs">{appointment.patientName.charAt(0)}</span>
                          </div>
                          <span className="truncate">{appointment.patientName}</span>
                        </div>
                      </td>
                      <td className="p-1">
                        {activeTab === 'new' ? (
                          <Button 
                            className="h-5 text-xs px-1 bg-green-500 hover:bg-green-600"
                            onClick={() => markAsCompleted(appointment.id)}
                          >
                            Complete
                          </Button>
                        ) : (
                          <span className="text-blue-500 cursor-pointer text-xs">View</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p className="text-xs">No {activeTab} appointments found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Room Availability Chart */}
        <div className="bg-white rounded-lg shadow-sm flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium text-gray-700 p-2">Beds Availability</h2>
            <a href="/bed-management" className="text-blue-500 text-xs hover:underline flex items-center pr-2">
              View All <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
          <div className="flex-grow flex flex-col justify-center p-2">
            {loading ? (
              <div className="text-center py-4 text-gray-500 text-sm">Loading...</div>
            ) : availableBedData && availableBedData.length > 0 ? (
              <DashboardBarChart data={availableBedData} />
            ) : (
              <div className="text-center py-4 text-gray-500 text-sm">No bed data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Second row for Education Content and Patient List */}
      <div className="grid grid-cols-2 gap-2 mb-2" style={{ height: '25vh' }}>
        {/* Education Content */}
        <div className="bg-white rounded-lg shadow-sm flex flex-col">
          <div className="p-2 flex justify-between items-center">
            <h2 className="text-sm font-medium text-gray-700">Training Content</h2>
            <a href="/education-content" className="text-blue-500 text-xs hover:underline flex items-center">
              View All <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
          <div className="p-2 flex-grow overflow-auto">
            {trainingSessions && trainingSessions.map((session, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center mb-2 p-1 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                onClick={() => setSelectedTraining(session)}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-2 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs font-medium">{session.title.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium truncate max-w-xs">{session.title}</h3>
                    <p className="text-xs text-gray-500">For: {session.role}</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-2 py-0.5 rounded-md text-xs hover:bg-blue-600 shadow-sm hover:shadow transition-all">
                  View
                </button>
              </div>
            ))}
          </div>

          {/* Training Details Popup */}
          {selectedTraining && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedTraining.title}</h3>
                <p className="text-gray-600 mb-4">For: {selectedTraining.role}</p>
                <div className="text-gray-700 text-sm whitespace-pre-line">
                  {selectedTraining.description}
                </div>
                <button
                  className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                  onClick={() => setSelectedTraining(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-lg shadow-sm flex flex-col">
          <div className="p-2 flex justify-between items-center">
            <h2 className="text-sm font-medium text-gray-700">Patient List</h2>
            <a href="/emr" className="text-blue-500 text-xs hover:underline flex items-center">
              View All <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
          <div className="p-2 flex-grow overflow-auto">
            {loadingPatients ? (
              <div className="text-center py-4 text-gray-500 text-sm">Loading patients...</div>
            ) : patients.length > 0 ? (
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="p-1 text-left font-medium text-gray-600">Patient</th>
                    <th className="p-1 text-left font-medium text-gray-600">Age</th>
                    <th className="p-1 text-left font-medium text-gray-600">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="p-1 font-medium">
                        {`${patient.firstName} ${patient.lastName}`}
                      </td>
                      <td className="p-1 text-gray-700">
                        {calculateAge(patient.dob)}
                      </td>
                      <td className="p-1 text-gray-700">
                        {patient.gender}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-4 text-gray-500 text-xs">No patients found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;