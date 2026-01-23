// client-side client

import { TrendingMoviesWithPosterUrls, MovieDetailsWithPosterUrls } from "./sharedTypes"

export async function apiGet<T>(url: string, signal?: AbortSignal): Promise<T> {
    const res = await fetch(url, {
        method: "GET",
        signal
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`API ${res.status}: ${text}`)
    }

    return (await res.json()) as T
}

export async function movieListDay(signal?: AbortSignal): Promise<TrendingMoviesWithPosterUrls> {
    const res = await fetch("/api/trending/movie/day", {
        method: "GET",
        signal
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`API ${res.status}: ${text}`)
    }

    return (await res.json()) as TrendingMoviesWithPosterUrls
}

export async function movieDetails(movieId: number, signal?: AbortSignal): Promise<MovieDetailsWithPosterUrls> {
    const res = await fetch(`/api/movie/${movieId}`, {
        method: "GET",
        signal
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`API ${res.status}: ${text}`)
    }

    return (await res.json()) as MovieDetailsWithPosterUrls
}