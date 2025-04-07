'use client'

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Edit, Eye, Trash2, Search } from "lucide-react"
import { useToast } from "@/components/hooks/use-toast"

type Patient = {
  id: number
  title: string | null
  firstName: string
  lastName: string
  gender: string
  dob: string
  email: string | null
  phoneNumber: string | null
  medicareNumber: string | null
  createdAt: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()
  const patientsPerPage = 10

  useEffect(() => {
    fetchPatients()
  }, [currentPage])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/patients/list?page=${currentPage}&limit=${patientsPerPage}&search=${encodeURIComponent(searchTerm)}`)
      if (!response.ok) throw new Error(await response.text())
      const data = await response.json()
      setPatients(data.patients)
      setTotalPages(Math.ceil(data.total / patientsPerPage))
    } catch (error) {
      toast({ title: "Error", description: "Failed to load patient data.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setCurrentPage(1)
    fetchPatients()
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this patient?")) return
    try {
      const res = await fetch(`/api/patients/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      toast({ title: "Deleted", description: "Patient removed" })
      fetchPatients()
    } catch {
      toast({ title: "Error", description: "Delete failed", variant: "destructive" })
    }
  }

  const formatDate = (dob: string) =>
    new Date(dob).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Search patients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-8"
          />
          <Button variant="outline" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left text-sm font-medium text-gray-500">Patient</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Gender</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">DOB</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Medicare</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Contact</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-4 flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>
                      {getInitials(`${p.firstName} ${p.lastName}`)}
                    </AvatarFallback>
                  </Avatar>
                  {`${p.title ? p.title + " " : ""}${p.firstName} ${p.lastName}`}
                </td>
                <td className="p-4">{p.gender}</td>
                <td className="p-4">{formatDate(p.dob)}</td>
                <td className="p-4">{p.medicareNumber || "N/A"}</td>
                <td className="p-4">
                  <div>{p.email || "N/A"}</div>
                  <div>{p.phoneNumber || "N/A"}</div>
                </td>
                <td className="p-4 space-x-2 text-right">
                  <Button size="sm" variant="outline" onClick={() => toast({ title: "View", description: `Patient ID: ${p.id}` })}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast({ title: "Edit", description: `Edit Patient ID: ${p.id}` })}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {patients.length} of {patientsPerPage * totalPages} patients
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }
