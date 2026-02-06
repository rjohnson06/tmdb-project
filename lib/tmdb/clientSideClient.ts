// client-side client

import { TrendingMoviesWithPosterUrls, MovieDetailsWithPosterUrls } from "./sharedTypes"

export interface IMovieClient {
    movieListDay(signal?: AbortSignal): Promise<TrendingMoviesWithPosterUrls>
    movieDetails(movieId: number, signal?: AbortSignal): Promise<MovieDetailsWithPosterUrls>
}

class MovieClient implements IMovieClient {
    private async apiGet<T>(url: string, signal?: AbortSignal): Promise<T> {
        const res = await fetch(url, { method: "GET", signal })

        if (!res.ok) {
            const text = await res.text()
            throw new Error(`API ${res.status}: ${text}`)
        }

        return (await res.json()) as T
    }

    async movieListDay(signal?: AbortSignal): Promise<TrendingMoviesWithPosterUrls> {
        return this.apiGet<TrendingMoviesWithPosterUrls>("/api/trending/movie/day", signal)
    }

    async movieDetails(movieId: number, signal?: AbortSignal): Promise<MovieDetailsWithPosterUrls> {
        return this.apiGet<MovieDetailsWithPosterUrls>(`/api/movie/${movieId}`, signal)
    }
}

export const movieClient: IMovieClient = new MovieClient()