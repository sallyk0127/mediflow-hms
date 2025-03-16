"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table"
import { Info, X, MessageCircle } from "lucide-react"

const patientsData = [
  { id: 1, name: "Elizabeth Polson 1", image: "https://static.independent.co.uk/2024/10/04/08/newFile.jpg?width=1200&height=1200&fit=crop", age: 32, gender: "Female", blood: "B+ve", phone: "+91 12345 67890", email: "elsabethpolsan@hotmail.com" },
  { id: 2, name: "John David 2",  image: "https://static.independent.co.uk/2024/10/04/08/newFile.jpg?width=1200&height=1200&fit=crop", age: 28, gender: "Male", blood: "B+ve", phone: "+91 12345 67890", email: "davidjohn22@gmail.com" },
  { id: 3, name: "Krishtav Rajan 3", image: "https://static.independent.co.uk/2024/10/04/08/newFile.jpg?width=1200&height=1200&fit=crop", age: 24, gender: "Male", blood: "AB-ve", phone: "+91 12345 67890", email: "krishnarajan23@gmail.com" },
  { id: 4, name: "Sumanth Tinson 4", image: "https://static.independent.co.uk/2024/10/04/08/newFile.jpg?width=1200&height=1200&fit=crop", age: 26, gender: "Male", blood: "O+ve", phone: "+91 12345 67890", email: "tintintin@gmail.com" },
  { id: 5, name: "EG Subramani 5", image: "https://static.independent.co.uk/2024/10/04/08/newFile.jpg?width=1200&height=1200&fit=crop", age: 77, gender: "Male", blood: "AB+ve", phone: "+91 12345 67890", email: "egs31322@gmail.com" },
  { id: 6, name: "Ranjan Maari 6", image: "https://static.independent.co.uk/2024/10/04/08/newFile.jpg?width=1200&height=1200&fit=crop", age: 77, gender: "Male", blood: "O+ve", phone: "+91 12345 67890", email: "ranjanmaari@yahoo.com" },
  { id: 7, name: "Philipile Gopal 7", image: "https://static.independent.co.uk/2024/10/04/08/newFile.jpg?width=1200&height=1200&fit=crop", age: 55, gender: "Male", blood: "O-ve", phone: "+91 12345 67890", email: "gopal22@gmail.com" },
  { id: 8, name: "Krishtav Rajan 8", image: "https://static.independent.co.uk/2024/10/04/08/newFile.jpg?width=1200&height=1200&fit=crop", age: 24, gender: "Male", blood: "AB-ve", phone: "+91 12345 67890", email: "krishnarajan23@gmail.com" },
  { id: 9, name: "Sumanth Tinson 9", image: "https://static.independent.co.uk/2024/10/04/08/newFile.jpg?width=1200&height=1200&fit=crop", age: 26, gender: "Male", blood: "O+ve", phone: "+91 12345 67890", email: "tintintin@gmail.com" },
  { id: 10, name: "EG Subramani 10", image: "https://static.independent.co.uk/2024/10/04/08/newFile.jpg?width=1200&height=1200&fit=crop", age: 77, gender: "Male", blood: "AB+ve", phone: "+91 12345 67890", email: "egs31322@gmail.com" },
]

export default function PatientList() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // SearchBar
  const filteredPatients = patientsData.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage
  const selectedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="p-4">
      {/* Search and add Patient */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs bg-gray-100 border-none rounded-full px-4 py-2"
        />
        <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">
          + New Patient
        </Button>
      </div>

      {/* Patient Table */}
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed border-collapse">
          <TableHead className="border-none">
            <TableRow className="bg-gray-100 text-gray-600 border-none">
              <TableCell className="text-left w-1/4 border-none font-bold">Patient Name</TableCell>
              <TableCell className="text-left w-1/12 border-none font-bold">Age</TableCell>
              <TableCell className="text-left w-1/12 border-none font-bold">Gender</TableCell>
              <TableCell className="text-left w-1/12 border-none font-bold">Blood Group</TableCell>
              <TableCell className="text-left w-1/6 border-none font-bold">Phone Number</TableCell>
              <TableCell className="text-left w-1/4 border-none font-bold">Email ID</TableCell>
              <TableCell className="text-left w-1/6 border-none font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-gray-300">
            {selectedPatients.map((patient) => (
              <TableRow key={patient.id} className="hover:bg-gray-100">
                <TableCell className="border-none flex items-center space-x-3">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-bold">{patient.name}</span>
                </TableCell>
                <TableCell className="border-none">{patient.age}</TableCell>
                <TableCell className="border-none">{patient.gender}</TableCell>
                <TableCell className="border-none">{patient.blood}</TableCell>
                <TableCell className="border-none">{patient.phone}</TableCell>
                <TableCell className="border-none">{patient.email}</TableCell>
                <TableCell className="border-none">
                  <div className="flex space-x-2">
                    {/* Button Message */}
                    <Button variant="ghost" size="icon" className="bg-green-200 text-green-600 rounded-full p-1">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    
                    {/* Button Info */}
                    <Button variant="ghost" size="icon" className="bg-blue-200 text-blue-600 rounded-full p-1">
                      <Info className="w-4 h-4" />
                    </Button>
                    {/* Button Delete */}
                    <Button variant="ghost" size="icon" className="bg-red-200 text-red-600 rounded-full p-1">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        {/* Previous Button */}
        <Button
          className={`px-4 py-2 rounded-md ${
            currentPage > 1 ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* Page Number */}
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        {/* Next Button */}
        <Button
          className={`px-4 py-2 rounded-md ${
            currentPage < totalPages ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
