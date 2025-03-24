import { PrismaClient, Patient } from '@prisma/client';

type PatientData = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>;

const prisma = new PrismaClient();

export const createPatient = async (data: PatientData) => {
  try {
    const patient = await prisma.patient.create({
      data,
    });
    return { success: true, patient };
  } catch (error) {
    console.error('Error creating patient:', error);
    return { success: false, error: 'Failed to create patient.' };
  }
};

export const getPatientById = async (id: number) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id },
    });
    return { success: true, patient };
  } catch (error) {
    console.error('Error retrieving patient:', error);
    return { success: false, error: 'Failed to retrieve patient.' };
  }
};

export const updatePatient = async (id: number, data: PatientData) => {
  try {
    const patient = await prisma.patient.update({
      where: { id },
      data,
    });
    return { success: true, patient };
  } catch (error) {
    console.error('Error updating patient:', error);
    return { success: false, error: 'Failed to update patient.' };
  }
};

export const deletePatient = async (id: number) => {
  try {
    await prisma.patient.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting patient:', error);
    return { success: false, error: 'Failed to delete patient.' };
  }
};
