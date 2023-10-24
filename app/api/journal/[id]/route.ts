import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { update } from '@/utils/actions'
import { NextResponse } from 'next/server'

interface IOptions {
  params: {
    id: string
  }
}

export const PATCH = async (request: Request, { params }: IOptions) => {
  const { updates } = await request.json()

  const user = await getUserFromClerkID()

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: updates,
  })

  // const analysis = await analyzeEntry(entry)
  // const savedAnalysis = await prisma.entryAnalysis.upsert({
  //   where: {
  //     entryId: entry.id,
  //   },
  //   update: { ...analysis },
  //   create: {
  //     entryId: entry.id,
  //     userId: user.id,
  //     ...analysis,
  //   },
  // })

  update(['/journal'])

  return NextResponse.json({ data: { ...entry } })
}
