import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    if (!apiUrl) return NextResponse.json({ status: 'error', reason: 'API_URL not set' }, { status: 503 })

    const res = await fetch(`${apiUrl}/health`, { next: { revalidate: 0 } })

    if (!res.ok) throw new Error(`Upstream status: ${res.status}`)

    return NextResponse.json({ status: 'ready' }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { status: 'error', reason: err instanceof Error ? err.message : 'Unknown' },
      { status: 503 }
    )
  }
}
