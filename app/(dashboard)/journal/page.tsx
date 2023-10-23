import React from 'react'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntries = async () => {
  const user = await getUserFromClerkID()
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return data
}

async function JournalPage() {
  const data = await getEntries()

  console.log('Entries: ', data)

  return <div>Journal Page</div>
}

export default JournalPage
