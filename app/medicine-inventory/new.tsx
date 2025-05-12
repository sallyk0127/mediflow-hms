"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Trash2 } from "lucide-react";
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
  const { toast } = useToast();

  useEffect(() => {
    async function fetchMedicines() {
      try {
        const res = await fetch("/api/medicine");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setMedicines(data);
      } catch (err) {
        console.error("Failed to fetch medicines:", err);
      }
    }

    fetchMedicines();
  }, []);

  const handleView = (medicine: Medicine) => {
    setSelected(medicine);
    setIsModalOpen(true);
  };

  const filtered = medicines.filter((med) => {
    const medDate = new Date(med.expiry);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const isFuture = medDate >= todayStart;
    const matchDate = date ? 
      medDate.toDateString() === date.toDateString() : 
      true;
    const matchSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return isFuture && matchDate && matchSearch;
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Input
            type="search"
            placeholder="Search"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left text-sm font-medium text-gray-500">Product</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Type</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Price</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">In Stock</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Expiry</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Manufacturer</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No matching medicines found.
                </td>
              </tr>
            ) : (
              filtered.map((med, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    {med.name}
                    <div className="text-xs text-gray-400">{med.code}</div>
                  </td>
                  <td className="p-4">{med.type}</td>
                  <td className="p-4">{med.price}</td>
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
                          const res = await fetch(`/api/medicine/${med.code}`, {
                            method: "DELETE",
                          });
                          const result = await res.json();
                          if (result.success) {
                            toast({ title: "Medicine deleted" });
                            setMedicines((prev) => prev.filter((m) => m.code !== med.code));   
                          } else {
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
                  setEditingStock({ ...editingStock, current: parseInt(e.target.value) })
                }
              />
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={async () => {
                    const res = await fetch(`/api/medicine/${editingStock.code}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ stock: editingStock.current }),
                    });
                    const result = await res.json();
                    if (result.success) {
                      toast({ title: "Stock updated" });
                      setMedicines((prev) =>
                        prev.map((m) =>
                          m.code === editingStock.code ? { ...m, stock: editingStock.current } : m
                        )
                      );
                      setEditingStock(null);                      
                    } else {
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
