"use client"

import useFavorites from "@/lib/tmdb/favorites/favorites";
import { useQueries } from "@tanstack/react-query";
import { MovieList } from "../movie-list/movie-list";
import { movieDetails } from "@/lib/tmdb/ourApiClient"

export default function Favorites() {
    const [favorites, setFavorites, toggleFavorite] = useFavorites()

    if (favorites.length === 0) {
        return (
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-3xl">Favorites</h1>
            </div>
        )
    }

    const queries = useQueries({
        queries: favorites
            .map((movieId) => ({
                queryKey: ["movieDetails", movieId],
                queryFn: ({ signal }: { signal: AbortSignal }) => movieDetails(movieId, signal),
                staleTime: 60_000 
            }))
    })

    const isLoadingAny = queries.some((q) => q.isLoading)
    const isErrorAny = queries.some((q) => q.isError)

    if (isLoadingAny) return <div>Loading...</div>
    if (isErrorAny) {
        return <div>Error: please try again later</div>
    }

    const data = queries
        .map(q => q.data)
        .filter(m => m !== undefined)
        .map(m => ({ ...m, favorite: favorites.includes(m.id) }))

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl">Favorites</h1>
            <MovieList movies={data.map(movie => ({ 
                id: movie.id, 
                title: movie.title, 
                overview: movie.overview, 
                poster_thumb: movie.poster_thumb, 
                favorite: movie.favorite,
                favoriteClicked: toggleFavorite
            }))} />
        </div>
    )
}