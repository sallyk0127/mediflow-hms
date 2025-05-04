"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const types = [
  "Liquid",
  "Tablet",
  "Soluble Tablet",
  "Dispersible Tablet",
  "Capsule",
  "Topical",
  "Suppository",
  "Drops (Eye/Ear/Nose)",
  "Inhaler",
  "Injection)",
  "Implant or Patch",
  "Buccal Tablet",
  "Sublingual Tablet",
];

export default function AddMedicinePage() {
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [medicineCode, setMedicineCode] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState<number | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<{ label: string; value: string } | null>(null);
  const [manufacturer, setManufacturer] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSave = () => {
    if (!productName || !medicineCode || !price || !stock || !selectedType || !expiryDate || !manufacturer) {
      alert("Please fill out all fields.");
      return;
    }

    const newMedicine = {
      name: productName,
      code: medicineCode,
      price,
      stock,
      type: selectedType.value,
      manufacturer,
      expiry: format(expiryDate, "dd MMM yyyy"),
    };

    console.log("New Medicine:", newMedicine);
    alert("Medicine saved (mock)");

    // Reset form
    setProductName("");
    setMedicineCode("");
    setPrice("");
    setStock(undefined);
    setSelectedType(null);
    setManufacturer("");
    setExpiryDate(undefined);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Medicine</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="font-medium">Product Name:</label>
            <Input
              type="text"
              placeholder="Enter medicine name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* Medicine Code */}
          <div>
            <label className="font-medium">Medicine Code:</label>
            <Input
              type="text"
              placeholder="Enter medicine code"
              value={medicineCode}
              onChange={(e) => setMedicineCode(e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-medium">Price (e.g., $28.55):</label>
            <Input
              type="text"
              placeholder="e.g., $28.55"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Stock */}
          <div>
            <label className="font-medium">Stock Quantity:</label>
            <Input
              type="number"
              placeholder="e.g., 100"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
            />
          </div>

          {/* Select Type */}
          <div>
            <label className="font-medium">Medicine Type:</label>
            {isClient && (
              <Select
                options={types.map((t) => ({ label: t, value: t }))}
                value={selectedType}
                onChange={(selected) =>
                  setSelectedType(selected as { label: string; value: string } | null)
                }
                placeholder="Select medicine type"
              />
            )}
          </div>

          {/* Select Manufacturer */}
          <div>
            <label className="font-medium">Manufacturer:</label>
            {isClient && (
              <Input
                type="text"
                placeholder="Enter manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="font-medium">Expiry Date:</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-[240px] justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {isClient && (
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={(d) => setExpiryDate(d || undefined)}
                    initialFocus
                  />
                )}
              </PopoverContent>
            </Popover>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-4 mt-6">
            <Button className="bg-green-500 hover:bg-green-600" onClick={handleSave}>
              Save Medicine
            </Button>
            <Button className="bg-red-500 hover:bg-red-600" onClick={() => router.back()}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
