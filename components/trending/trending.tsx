"use client"

import { useQuery } from "@tanstack/react-query"
import { MovieList } from "../movie-list/movie-list"
import useFavorites from "@/lib/tmdb/favorites/favorites"
import { useMovieClient } from "@/lib/tmdb/MovieClientProvider"

export function Trending() {
    const movieClient = useMovieClient()

    const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ["trendingMovies"],
        queryFn: ({ signal }) => movieClient.movieListDay(signal)
    })

    const [favorites, setFavorites, toggleFavorite] = useFavorites()

    let content

    if (isLoading) {
        content = <div className="p4">Loading...</div>
    }
    else if (isError) {
        content = 
            <div className="pb-4">
                <div className="text-red-600">
                    Error: failed to get the trending movies. Please try again later.
                </div>
            </div>
    }
    else if (!data) {
        content = <div className="p4">No trending movie data.</div>
    }
    else {
        content = 
            <MovieList movies={data.results.map(movie => ({ 
                id: movie.id,
                title: movie.title,
                overview: movie.overview, 
                poster_thumb: movie.poster_thumb, 
                favorite: favorites.includes(movie.id),
                favoriteClicked: toggleFavorite 
            }))} />
    }

    return (
        <div className="flex flex-col gap-6 py-8">
            <h1 className="font-bold text-3xl">Trending Movies</h1>
            {content}
        </div>
    )
}