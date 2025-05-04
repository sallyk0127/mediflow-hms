"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Medicine {
  name: string;
  type: string;
  price: string;
  stock: number;
  expiry: string; // e.g., "01 Jun 2026"
  manufacturer: string;
  code: string;
}

const medicines: Medicine[] = [
  {
    name: "Albuterol (salbutamol)",
    type: "Inhaler",
    price: "$28.55",
    stock: 100,
    expiry: "01 Jun 2026",
    manufacturer: "John's Health Care",
    code: "ALSXEC0123",
  },
  {
    name: "Amoxicillin 250 mg",
    type: "Tablet",
    price: "$40.55",
    stock: 28,
    expiry: "21 Jul 2026",
    manufacturer: "Pattikson Pvt Ltd",
    code: "AMSXEC0043",
  },
  {
    name: "Aspirin 300 mg",
    type: "Tablet",
    price: "$28.55",
    stock: 190,
    expiry: "01 Jun 2027",
    manufacturer: "David's Ltd",
    code: "ASPKC01010",
  },
];

export default function NewMedicineInventory() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selected, setSelected] = useState<Medicine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleView = (medicine: Medicine) => {
    setSelected(medicine);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const today = new Date();

  const filtered = medicines.filter((med) => {
    const medDate = parse(med.expiry, "dd MMM yyyy", new Date());
    const isFuture = medDate >= new Date(today.setHours(0, 0, 0, 0));
    const matchDate = date ? medDate.toDateString() === date.toDateString() : true;
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
              <th className="p-4 text-left text-sm font-medium text-gray-500">User Action</th>
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
                  <td className="p-4">{med.expiry}</td>
                  <td className="p-4">{med.manufacturer}</td>
                  <td className="p-4 flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleView(med)}>
                      View
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => alert(`Add stock to ${med.name}`)}>
                      ➕
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isHydrated && selected && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selected.name}</DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-2">
                {selected.type} · {selected.manufacturer} <br />
                Code: {selected.code} <br />
                Expires: {selected.expiry}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
