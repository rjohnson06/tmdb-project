import { NextRequest, NextResponse } from 'next/server'
import { tmdbClient } from '@/lib/tmdb/client'
import "server-only"

type Period = "day" | "week"

function isPeriod(value: string): value is Period {
    return value === "day" || value === "week"
}

export async function GET(
    _req: NextRequest,
    { params }: { params: { period: string } }
) {
    const { period } = await params

    if (!isPeriod(period)) {
        return NextResponse.json(
            { error: "Invalid period. Must be 'day' or 'week'." },
            { status: 400 }
        )
    }

    const p = period as Period

    const tmdb = tmdbClient()

    const { data, error } = await tmdb.GET("/3/trending/movie/{time_window}", {
        params: { path: { time_window: p } }
    })

    if (error) {
        return NextResponse.json(error, { status: 502 })
    }

    return NextResponse.json(data)
}
