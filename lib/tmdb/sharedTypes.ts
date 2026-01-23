import type { paths } from "./types"

export type MovieDetailsType = paths["/3/movie/{movie_id}"]["get"]["responses"]["200"]["content"]["application/json"]
export type MovieDetailsWithPosterUrls = MovieDetailsType & {
    poster_thumb: string | null
    poster_full: string | null
}

export type TrendingMoviesType = paths["/3/trending/movie/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"]
export type TrendingMovieItemWithPosterUrls = NonNullable<TrendingMoviesType["results"]>[number] & {
    poster_thumb: string | null
    poster_full: string | null
}

export type TrendingMoviesWithPosterUrls = 
    Omit<TrendingMoviesType, "results"> & {
        results: TrendingMovieItemWithPosterUrls[]
    }