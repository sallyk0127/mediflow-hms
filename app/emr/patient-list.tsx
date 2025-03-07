"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

