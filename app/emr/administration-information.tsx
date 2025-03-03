'use client';

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdministrationInformation() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Administration Information</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="insuranceProvider">Insurance Provider</label>
            <Input id="insuranceProvider" placeholder="Enter insurance provider" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="policyNumber">Policy Number</label>
            <Input id="policyNumber" placeholder="Enter policy number" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="admissionDate">Admission Date</label>
            <Input id="admissionDate" type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="dischargeDate">Discharge Date</label>
            <Input id="dischargeDate" type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="roomNumber">Room Number</label>
            <Input id="roomNumber" placeholder="Enter room number" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="wardType">Ward Type</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="billingNotes">Billing Notes</label>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="submit">Save Information</Button>
        </div>
      </form>
    </div>
  );
}
