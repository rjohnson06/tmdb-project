import { NextRequest, NextResponse } from 'next/server'
import { tmdbClient } from '@/lib/tmdb/client'
import { tmdbPosterUrl } from '@/lib/tmdb/images'
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

    console.log('api')

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

    //console.log(data)

    const resultWithImgUrls = {
        ...data,
        results: await Promise.all(data.results?.map(async (result) => ({
            ...result,
            poster_thumb: result.poster_path && await tmdbPosterUrl(result.poster_path),
            poster_full: result.poster_path && await tmdbPosterUrl(result.poster_path)
        })) ?? [])
    }

    console.log(resultWithImgUrls)

    return NextResponse.json(resultWithImgUrls)
}
