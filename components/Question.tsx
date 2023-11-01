'use client'

import { useCallback } from 'react'
import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleQuestionChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setQuestion(evt.target.value)
    },
    [setQuestion]
  )

  const handleSubmit = useCallback(
    async (evt: React.FormEvent) => {
      evt.preventDefault()
      setLoading(true)

      const { data } = await askQuestion(question)

      setAnswer(data)
      setLoading(false)
      setQuestion('')
    },
    [question, setLoading, setAnswer, setQuestion]
  )

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          className="border border-gray-300 rounded-md p-2 text-lg"
          disabled={loading}
          placeholder="Ask a question..."
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-md"
        >
          Ask
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {answer && <p className="my-4 text-xl">{answer}</p>}
    </div>
  )
}

export default Question
