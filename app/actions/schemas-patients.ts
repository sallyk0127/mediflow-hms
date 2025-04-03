import { z } from 'zod';

export const patientSchema = z.object({
  title: z.string().optional(),
  firstName: z.string().min(1, 'First Name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last Name is required'),
  gender: z.string().min(1, 'Gender is required'),
  preferredName: z.string().optional(),
  dob: z.string().min(1, 'Date of Birth is required'),
  maritalStatus: z.string().optional(),
  email: z.union( [
    z.literal( '' ),
    z.string().email(),
] ),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactNumber: z.string().optional(),
  billingNote: z.string().optional(),
  previousNames: z.string().optional(),

  // Administration Information
  medicareNumber: z.string().optional(),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  coverageType: z.string().optional(),
  billingAddress: z.string().optional(),
  paymentMethod: z.string().optional(),
  assignedRoom: z.string().optional(),
  Department: z.string().optional(),
  bedNumber: z.string().optional(),
  attendingDoctor: z.string().optional(),

  // Medical Information
  medicalHistory: z.string().optional(),
  medications: z.string().optional(),
  allergies: z.string().optional(),
  conditions: z.string().optional(),
});

export type PatientData = z.infer<typeof patientSchema>;
