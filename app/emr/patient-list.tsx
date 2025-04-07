'use client'

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight, Edit, Trash2, Eye } from "lucide-react"
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/patients/list?page=${currentPage}&limit=${patientsPerPage}&search=${encodeURIComponent(searchTerm)}`
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to fetch patients: ${errorText}`)
      }

      const data = await response.json()
      setPatients(data.patients)
      setTotalPages(Math.ceil(data.total / patientsPerPage))
    } catch (error) {
      console.error("Error fetching patients:", error)
      toast({
        title: "Error",
        description: "Failed to load patient data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setCurrentPage(1)
    fetchPatients()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  const handleViewDetails = (patientId: number) => {
    toast({ title: "View", description: `Patient ID: ${patientId}` })
  }

  const handleEdit = (patientId: number) => {
    toast({ title: "Edit", description: `Editing Patient ID: ${patientId}` })
  }

  const handleDelete = async (patientId: number) => {
    if (!confirm("Are you sure you want to delete this patient?")) return

    try {
      const res = await fetch(`/api/patients/${patientId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")

      toast({ title: "Deleted", description: "Patient deleted successfully" })
      fetchPatients()
    } catch (error) {
      console.error("Something went wrong:", error);
      toast({
        title: "Error",
        description: "Failed to delete patient.",
        variant: "destructive",
      });
    }
  }
    
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Patient Records</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-64"
          />
          <Button onClick={handleSearch} variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : patients.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No patients found.</div>
      ) : (
        <>
          <TableContainer className="rounded-md border overflow-hidden">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold">Name</TableCell>
                  <TableCell className="font-semibold">Gender</TableCell>
                  <TableCell className="font-semibold">DOB</TableCell>
                  <TableCell className="font-semibold">Medicare</TableCell>
                  <TableCell className="font-semibold">Contact</TableCell>
                  <TableCell className="font-semibold text-right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.title ? p.title + ' ' : ''}${p.firstName} ${p.lastName}`}</TableCell>
                    <TableCell>{p.gender}</TableCell>
                    <TableCell>{formatDate(p.dob)}</TableCell>
                    <TableCell>{p.medicareNumber || "N/A"}</TableCell>
                    <TableCell>
                      <div>{p.email || "N/A"}</div>
                      <div>{p.phoneNumber || "N/A"}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex space-x-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(p.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(p.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(p.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
        </>
      )}
    </div>
  )
}
