import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const runs = await prisma.run.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const pages = await prisma.page.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const lowPerforming = pages.filter(p => !p.title || !p.headings)

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const staleRuns = runs.filter(r => new Date(r.createdAt) < thirtyDaysAgo)

  return NextResponse.json({
    totalRuns: runs.length,
    totalPages: pages.length,
    lowPerforming,
    staleRuns,
    recentRuns: runs.slice(0, 5)
  })
}
