import { JournalEntry, EntryAnalysis } from '@prisma/client'

interface IProps {
  entry: JournalEntry & { analysis?: EntryAnalysis | null }
}

const EntryCard = ({ entry }: IProps) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">
        {entry.analysis?.summary || 'No summary yet'}
      </div>
      <div className="px-4 py-4 sm:px-6">
        {entry.analysis?.mood || 'No mood yet'}
      </div>
    </div>
  )
}

export default EntryCard
