import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const data = await request.json()

  console.log('Question POST: ', data)

  return NextResponse.json({ data: 'ok!' })
}
