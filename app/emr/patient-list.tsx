"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/tabs.tsx"
import { Info, X } from "lucide-react"

const patientsData = [
  { id: 1, name: "Elizabeth Polson", age: 32, gender: "Female", blood: "B+ve", phone: "+91 12345 67890", email: "elsabethpolsan@hotmail.com" },
  { id: 2, name: "John David", age: 28, gender: "Male", blood: "B+ve", phone: "+91 12345 67890", email: "davidjohn22@gmail.com" },
  { id: 3, name: "Krishtav Rajan", age: 24, gender: "Male", blood: "AB-ve", phone: "+91 12345 67890", email: "krishnarajan23@gmail.com" },
  { id: 4, name: "Sumanth Tinson", age: 26, gender: "Male", blood: "O+ve", phone: "+91 12345 67890", email: "tintintin@gmail.com" },
  { id: 5, name: "EG Subramani", age: 77, gender: "Male", blood: "AB+ve", phone: "+91 12345 67890", email: "egs31322@gmail.com" },
  { id: 6, name: "Ranjan Maari", age: 77, gender: "Male", blood: "O+ve", phone: "+91 12345 67890", email: "ranjanmaari@yahoo.com" },
  { id: 7, name: "Philipile Gopal", age: 55, gender: "Male", blood: "O-ve", phone: "+91 12345 67890", email: "gopal22@gmail.com" }
]

export default function PatientList() {
  const [search, setSearch] = useState("")

  const filteredPatients = patientsData.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Patient List</h2>
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button>Add New Patient</Button>
      </div>

      <Card className="p-4">
        <CardContent>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell>Patient Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email ID</TableCell>
                <TableCell>User Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.blood}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Info className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <X className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
