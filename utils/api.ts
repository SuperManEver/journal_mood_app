const createURL = (path: string): string => window.location.origin + path

const ENTITY_PATH = 'journal'

export const newEntry = async () => {
  const url = createURL(`/api/${ENTITY_PATH}`)

  const params = {
    method: 'POST',
    body: JSON.stringify({ content: 'new entry' }),
  }

  const request = new Request(url, params)
  const res = await fetch(request)

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const deleteEntry = async (id: string) => {
  const url = createURL(`/api/${ENTITY_PATH}/${id}`)
  const params = {
    method: 'DELETE',
  }

  const request = new Request(url, params)
  const res = await fetch(request)

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const updateEntry = async (id: string, updates: { content: string }) => {
  const url = createURL(`/api/${ENTITY_PATH}/${id}`)
  const params = {
    method: 'PATCH',
    body: JSON.stringify({ updates }),
  }

  const request = new Request(url, params)
  const res = await fetch(request)

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const askQuestion = async (question: string) => {
  const url = createURL(`/api/question`)

  const params = {
    method: 'POST',
    body: JSON.stringify({ question }),
  }

  const request = new Request(url, params)
  const res = await fetch(request)

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}
