import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma' 

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const where: Prisma.PatientWhereInput = search
      ? {
          OR: [
            {
              firstName: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              lastName: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              email: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {}

    const total = await prisma.patient.count({ where })

    const patients = await prisma.patient.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ patients, total })
  } catch (error) {
    console.error('[GET /api/patients/list] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 })
  }
}
