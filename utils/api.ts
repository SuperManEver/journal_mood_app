const createURL = (path: string): string => window.location.origin + path

export const newEntry = async () => {
  const url = createURL('/api/journal')

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
