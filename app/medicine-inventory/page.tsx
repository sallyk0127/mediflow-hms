"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import NewMedicineInventory from "./new"; 

export default function MedicineInventoryPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Medicine Inventory</h1>
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => router.push("/medicine-inventory/add")}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <NewMedicineInventory />
      </div>
    </div>
  );
}
