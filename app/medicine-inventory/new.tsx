"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/hooks/use-toast"; 

interface Medicine {
  name: string;
  type: string;
  price: string;
  stock: number;
  expiry: Date | string;
  manufacturer: string;
  code: string;
}

const formatExpiryDate = (date: Date | string) => {
  if (typeof date === 'string') {
    return format(new Date(date), 'dd MMM yyyy');
  }
  return format(date, 'dd MMM yyyy');
};

export default function NewMedicineInventory() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selected, setSelected] = useState<Medicine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStock, setEditingStock] = useState<{ code: string; current: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const medicinesPerPage = 10;
  const { toast } = useToast();

  const fetchMedicines = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/medicine?page=${currentPage}&limit=${medicinesPerPage}&search=${encodeURIComponent(searchTerm)}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      
      // Ensure we always have an array of medicines
      const medicinesArray = Array.isArray(data) ? data : (data.medicines || []);
      setMedicines(medicinesArray);
      
      // Calculate totals based on response format
      if (Array.isArray(data)) {
        setTotalMedicines(data.length);
        setTotalPages(Math.ceil(data.length / medicinesPerPage));
      } else {
        setTotalMedicines(data.total || medicinesArray.length);
        setTotalPages(Math.ceil((data.total || medicinesArray.length) / medicinesPerPage));
      }
    } catch (err) {
      console.error("Failed to fetch medicines:", err);
      toast({
        title: "Error",
        description: "Failed to load medicine data.",
        variant: "destructive",
      });
      setMedicines([]);
      setTotalMedicines(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, toast]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchMedicines();
  };

  // Filter only the current page's medicines (client-side as fallback)
  const getPaginatedMedicines = () => {
    const startIndex = (currentPage - 1) * medicinesPerPage;
    const endIndex = startIndex + medicinesPerPage;
    return medicines.slice(startIndex, endIndex);
  };

  // Apply additional filters to the paginated medicines
  const filteredMedicines = getPaginatedMedicines().filter((med) => {
    if (!med) return false;
    
    try {
      const medDate = new Date(med.expiry);
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      
      const isFuture = medDate >= todayStart;
      const matchDate = date ? 
        medDate.toDateString() === date.toDateString() : 
        true;
      
      return isFuture && matchDate;
    } catch (e) {
      console.error("Error processing medicine:", med, e);
      return false;
    }
  });

  const handleView = (medicine: Medicine) => {
    setSelected(medicine);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto">
      {/* Search and filter section remains the same */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 w-full max-w-lg">
          <Input
            placeholder="Search medicines"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-8 flex-1 text-base"
          />
          <Button variant="outline" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Filter by expiry date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={(d) => setDate(d || undefined)} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {/* Table section */}
      <div className="rounded-md border">
        <table className="w-full table-auto text-base">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left font-semibold text-gray-600">Product</th>
              <th className="p-4 text-left font-semibold text-gray-600">Type</th>
              <th className="p-4 text-left font-semibold text-gray-600">Price</th>
              <th className="p-4 text-left font-semibold text-gray-600">In Stock</th>
              <th className="p-4 text-left font-semibold text-gray-600">Expiry</th>
              <th className="p-4 text-left font-semibold text-gray-600">Manufacturer</th>
              <th className="p-4 text-left font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Loading medicines...
                </td>
              </tr>
            ) : filteredMedicines.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  {medicines.length === 0 ? "No medicines found" : "No matching medicines found"}
                </td>
              </tr>
            ) : (
              filteredMedicines.map((med, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {med.name}
                    <div className="text-xs text-gray-400">{med.code}</div>
                  </td>
                  <td className="p-4">{med.type}</td>
                  <td className="p-4">AU$ {med.price}</td>
                  <td className="p-4">{med.stock} pcs</td>
                  <td className="p-4">{formatExpiryDate(med.expiry)}</td>
                  <td className="p-4">{med.manufacturer}</td>
                  <td className="p-4 flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleView(med)}>
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditingStock({ code: med.code, current: med.stock })}
                    >
                      ➕
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete ${med.name}?`)) {
                          try {
                            const res = await fetch(`/api/medicine/${med.code}`, {
                              method: "DELETE",
                            });
                            const result = await res.json();
                            if (result.success) {
                              toast({ title: "Medicine deleted" });
                              fetchMedicines();
                            } else {
                              toast({ title: "Deletion failed", variant: "destructive" });
                            }
                          } catch {
                            toast({ title: "Deletion failed", variant: "destructive" });
                          }
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {!isLoading && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-base text-gray-600">
            Showing {filteredMedicines.length} of {totalMedicines} medicines
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
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Rest of your dialog components remain the same */}
      {selected && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selected.name}</DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-2">
                {selected.type} · {selected.manufacturer} <br />
                Code: {selected.code} <br />
                Expires: {formatExpiryDate(selected.expiry)}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      {editingStock && (
        <Dialog open={!!editingStock} onOpenChange={() => setEditingStock(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Stock</DialogTitle>
              <DialogDescription>
                Update stock quantity for <b>{editingStock.code}</b>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="number"
                value={editingStock.current}
                onChange={(e) =>
                  setEditingStock({ ...editingStock, current: parseInt(e.target.value) || 0 })
                }
              />
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/medicine/${editingStock.code}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ stock: editingStock.current }),
                      });
                      const result = await res.json();
                      if (result.success) {
                        toast({ title: "Stock updated" });
                        fetchMedicines();
                        setEditingStock(null);
                      } else {
                        toast({ title: "Update failed", variant: "destructive" });
                      }
                    } catch {
                      toast({ title: "Update failed", variant: "destructive" });
                    }
                  }}
                >
                  Save
                </Button>
                <Button variant="ghost" onClick={() => setEditingStock(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}