"use client"

import useFavorites from "@/lib/tmdb/favorites/favorites";
import { useQueries } from "@tanstack/react-query";
import { MovieList } from "../movie-list/movie-list";
import { useMovieClient } from "@/lib/tmdb/MovieClientProvider";

export default function Favorites() {
    const movieClient = useMovieClient()
    const [favorites, setFavorites, toggleFavorite] = useFavorites()

    const queries = useQueries({
        queries: favorites
            .map((movieId) => ({
                queryKey: ["movieDetails", movieId],
                queryFn: ({ signal }: { signal: AbortSignal }) => movieClient.movieDetails(movieId, signal),
                staleTime: 60_000 
            }))
    })

    const isLoadingAny = queries.some((q) => q.isLoading)
    const isErrorAny = queries.some((q) => q.isError)

    let content

    if (isLoadingAny) {
        content = <div>Loading...</div>
    }
    else if (isErrorAny) {
        content = <div>Error: please try again later</div>
    }
    else {
        const data = queries
            .map(q => q.data)
            .filter(m => m !== undefined)
            .map(m => ({ ...m, favorite: favorites.includes(m.id) }))

        content = 
            <MovieList movies={data.map(movie => ({ 
                id: movie.id, 
                title: movie.title, 
                overview: movie.overview, 
                poster_thumb: movie.poster_thumb, 
                favorite: movie.favorite,
                favoriteClicked: toggleFavorite
            }))} />
    }

    return (
        <div className="flex flex-col gap-6 py-8">
            <h1 className="font-bold text-3xl">Favorites</h1>
            {content}
        </div>
    )
}