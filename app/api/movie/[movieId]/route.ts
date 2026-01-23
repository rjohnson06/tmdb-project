import { NextRequest, NextResponse } from 'next/server'
import { tmdbClient } from '@/lib/tmdb/client'
import { tmdbPosterUrl } from '@/lib/tmdb/images'
import "server-only"

export async function GET(
    _req: NextRequest,
    { params }: { params: { movieId: string } }
) {
    const param = await params
    const movie_id = Number(param.movieId)
    if (!Number.isInteger(movie_id)) {
        return NextResponse.json({ error: "movieId must be a positive integer" }, { status: 400 })
    }

    const tmdb = tmdbClient()

    const { data, error } = await tmdb.GET("/3/movie/{movie_id}", {
        params: { path: { movie_id: movie_id } }
    })

    if (error) {
        return NextResponse.json(error, { status: 502 })
    }

    return NextResponse.json({
        ...data,
        poster_thumb: data.poster_path && await tmdbPosterUrl(data.poster_path),
        poster_full: data.poster_path && await tmdbPosterUrl(data.poster_path)
    })
}
