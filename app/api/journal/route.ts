import { getUserFromClerkID } from '@/utils/auth'
import { update } from '@/utils/actions'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const data = await request.json()
  const user = await getUserFromClerkID()

  const entry = await prisma.journalEntry.create({
    data: {
      content: data.content,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  update(['/journal'])

  return NextResponse.json({ data: entry })
}
