import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { qa } from '@/utils/ai'

import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const data = await request.json()
  const user = await getUserFromClerkID()

  console.log('Question POST: ', data)

  const { question } = data as { question: string }

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)

  return NextResponse.json({ data: answer })
}
