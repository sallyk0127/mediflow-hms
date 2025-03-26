import { PrismaClient } from '@prisma/client';
import { patientSchema, PatientData } from '../actions/schemas-patients';
import { z } from 'zod';

const prisma = new PrismaClient();

export const createPatient = async (data: PatientData) => {
  try {
    const validatedData = patientSchema.parse(data);

    const patient = await prisma.patient.create({
      data: validatedData,
    });

    return { success: true, patient };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation Error:', error.errors);
      return { success: false, error: error.errors };
    }
    console.error('Error creating patient:', error);
    return { success: false, error: 'Failed to create patient.' };
  }
};

export const updatePatient = async (id: number, data: Partial<PatientData>) => {
  try {
    const validatedData = patientSchema.partial().parse(data);

    const patient = await prisma.patient.update({
      where: { id },
      data: validatedData,
    });

    return { success: true, patient };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation Error:', error.errors);
      return { success: false, error: error.errors };
    }
    console.error('Error updating patient:', error);
    return { success: false, error: 'Failed to update patient.' };
  }
};
