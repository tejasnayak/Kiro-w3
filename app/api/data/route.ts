import { NextResponse } from 'next/server'
import { generateDummyData } from '@/lib/utils'

export async function GET() {
  try {
    const data = generateDummyData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate data' }, { status: 500 })
  }
}