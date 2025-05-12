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
import { useToast } from "@/components/hooks/use-toast"; 

const Select = dynamic(() => import("react-select"), { ssr: false });

const types = [
  "Liquid", "Tablet", "Soluble Tablet", "Dispersible Tablet", "Capsule",
  "Topical", "Suppository", "Drops (Eye/Ear/Nose)", "Inhaler", "Injection",
  "Implant or Patch", "Buccal Tablet", "Sublingual Tablet",
];

export default function AddMedicinePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [productName, setProductName] = useState("");
  const [medicineCode, setMedicineCode] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [selectedType, setSelectedType] = useState<{ label: string; value: string } | null>(null);
  const [manufacturer, setManufacturer] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSave = async () => {
    if (!productName || !medicineCode || !price || stock === "" || !selectedType || !expiryDate || !manufacturer) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields before saving.",
        variant: "destructive",
      });
      return;
    }

    const newMedicine = {
      name: productName,
      code: medicineCode,
      price,
      stock: Number(stock),
      type: selectedType.value,
      manufacturer,
      expiry: expiryDate.toISOString(),
    };

    try {
      const res = await fetch("/api/medicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMedicine),
      });

      let result;
      try {
        result = await res.json();
      } catch {
        result = null;
      }

      if (!res.ok || !result?.success) {
        toast({
          title: "Error",
          description: result?.error || "Failed to save medicine.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `${productName} was added to the inventory.`,
      });

      router.push("/medicine-inventory");
    } catch (error) {
      console.error("Network error:", error);
      toast({
        title: "Network Error",
        description: "Could not connect to the server.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Medicine</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium">Product Name:</label>
            <Input
              type="text"
              placeholder="Enter medicine name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Medicine Code:</label>
            <Input
              type="text"
              placeholder="Enter medicine code"
              value={medicineCode}
              onChange={(e) => setMedicineCode(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Price:</label>
            <Input
              type="text"
              placeholder="e.g., $28.55"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Stock Quantity:</label>
            <Input
              type="number"
              placeholder="e.g., 100"
              value={stock}
              onChange={(e) => {
                const val = e.target.value;
                setStock(val === "" ? "" : parseInt(val));
              }}
            />
          </div>

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

          <div>
            <label className="font-medium">Manufacturer:</label>
            <Input
              type="text"
              placeholder="Enter manufacturer"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </div>

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
