import { getUserFromClerkID } from '@/utils/auth'
import { analyzeEntry } from '@/utils/ai'
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

  // call to LLM API
  const analysis = await analyzeEntry(entry)

  const savedAnalysis =
    analysis &&
    (await prisma.entryAnalysis.upsert({
      where: {
        entryId: entry.id,
      },
      update: { ...analysis },
      create: {
        entryId: entry.id,
        userId: user.id,
        ...analysis,
        sentimentScore: 0.2,
      },
    }))

  update(['/journal'])

  const responseData = {
    data: { ...entry, analysis: savedAnalysis ? savedAnalysis : null },
  }

  return NextResponse.json(responseData)
}
