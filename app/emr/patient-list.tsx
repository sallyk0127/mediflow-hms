"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const patients = [
  { id: 1, name: "John Doe", dob: "1980-01-01", lastVisit: "2023-05-15", status: "Active" },
  { id: 2, name: "Jane Smith", dob: "1992-03-15", lastVisit: "2023-05-10", status: "Inactive" },
  { id: 3, name: "Bob Johnson", dob: "1975-11-30", lastVisit: "2023-05-05", status: "Active" },
  { id: 4, name: "Alice Brown", dob: "1988-07-22", lastVisit: "2023-05-20", status: "Active" },
  { id: 5, name: "Charlie Wilson", dob: "1995-09-18", lastVisit: "2023-05-01", status: "Inactive" },
]

export default function PatientList() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Patient List</h2>
      <div className="flex justify-between items-center mb-6">
        <Input placeholder="Search patients..." className="max-w-sm" />
        <Button>Add New Patient</Button>
      </div>
    </div>
  )
}

