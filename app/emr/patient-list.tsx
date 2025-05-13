'use client'

import { useCallback, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Edit, Eye, Trash2, Search } from "lucide-react"
import { useToast } from "@/components/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Patient {
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
  medicalHistory?: string | null
}

function calculateAge(dob: string): number {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPatients, setTotalPatients] = useState(0)
  const { toast } = useToast()
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null)
  const patientsPerPage = 10
  const router = useRouter()

  const fetchPatients = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/patients/list?page=${currentPage}&limit=${patientsPerPage}&search=${encodeURIComponent(searchTerm)}`
      )
      const data = await response.json()
      setPatients(data.patients)
      setTotalPatients(data.total)
      setTotalPages(Math.ceil(data.total / patientsPerPage))
    } catch {
      toast({
        title: "Error",
        description: "Failed to load patient data.",
        variant: "destructive",
      })
    }
  }, [currentPage, searchTerm, toast])

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchPatients()
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this patient?")) return

    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const message = await res.text()
        throw new Error(message)
      }

      toast({ title: "Deleted", description: "Patient deleted successfully." })
      fetchPatients()
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete the patient.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dob: string) =>
    new Date(dob).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 w-full max-w-lg">
          <Input
            placeholder="Search patients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-8 flex-1 text-base"
          />
          <Button variant="outline" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <table className="w-full table-auto text-base">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left font-semibold text-gray-600 w-1/5">Patient</th>
              <th className="p-4 text-left font-semibold text-gray-600 w-1/6">Gender</th>
              <th className="p-4 text-left font-semibold text-gray-600 w-1/6">DOB</th>
              <th className="p-4 text-left font-semibold text-gray-600 w-1/6">Age</th>
              <th className="p-4 text-left font-semibold text-gray-600 w-1/6">Medicare</th>
              <th className="p-4 text-left font-semibold text-gray-600 w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-b align-middle hover:bg-gray-50">
                <td className="p-4 align-middle font-medium text-gray-800">
                  {`${p.title ? p.title + " " : ""}${p.firstName} ${p.lastName}`}
                </td>
                <td className="p-4 align-middle text-gray-700">{p.gender}</td>
                <td className="p-4 align-middle text-gray-700">{formatDate(p.dob)}</td>
                <td className="p-4 align-middle text-gray-700">{calculateAge(p.dob)}</td>
                <td className="p-4 align-middle text-gray-700">{p.medicareNumber || "N/A"}</td>
                <td className="p-4 align-middle text-left">
                  <div className="flex justify-start items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-white rounded-md border shadow-sm hover:bg-gray-100"
                      onClick={() => setViewingPatient(p)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-white rounded-md border shadow-sm hover:bg-gray-100"
                      onClick={() => router.push(`/emr?id=${p.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-700 bg-white rounded-md border shadow-sm hover:bg-gray-100"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewingPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Patient Details</h2>
            <p><strong>Name:</strong> {`${viewingPatient.title ? viewingPatient.title + " " : ""}${viewingPatient.firstName} ${viewingPatient.lastName}`}</p>
            <p><strong>ID:</strong> {viewingPatient.id}</p>
            <p><strong>Email:</strong> {viewingPatient.email || "N/A"}</p>
            <p><strong>Phone:</strong> {viewingPatient.phoneNumber || "N/A"}</p>
            <p><strong>Medical History:</strong> {viewingPatient.medicalHistory || "N/A"}</p>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setViewingPatient(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <div className="text-base text-gray-600">
          Showing {patients.length} of {totalPatients} patients
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
          <span className="text-base">Page {currentPage} of {totalPages}</span>
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
