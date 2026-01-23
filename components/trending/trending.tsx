"use client"

import { movieListDay } from "@/lib/tmdb/ourApiClient"
import { useQuery } from "@tanstack/react-query"
import { MovieList } from "../movie-list/movie-list"
import useFavorites from "@/lib/tmdb/favorites/favorites"

export function Trending() {
     const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ["trendingMovies"],
        queryFn: ({ signal }) => movieListDay(signal),
        gcTime: 0,           // Garbage collection time (formerly cacheTime)
        staleTime: 0,        // Data is immediately considered stale
        refetchOnMount: true // Refetch every time component mounts
     })

     const [favorites, setFavorites, toggleFavorite] = useFavorites()

     if (isLoading) return <div className="p4">Loading...</div>

     if (isError) {
        return (
            <div className="pb-4">
                <div className="text-red-600">
                    Error: failed to get the trending movies. Please try again later.
                </div>
            </div>
        )
     }

     if (!data) return <div className="p4">No trending movie data.</div>

     return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl">Trending Movies</h1>
            <MovieList movies={data.results.map(movie => ({ 
                id: movie.id,
                title: movie.title,
                overview: movie.overview, 
                poster_thumb: movie.poster_thumb, 
                favorite: favorites.includes(movie.id),
                favoriteClicked: toggleFavorite 
            }))} />
        </div>
     )
}