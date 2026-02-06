"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useMovieClient } from "@/lib/tmdb/MovieClientProvider"

export type Props = {
    movieId: number
}

export function MovieDetails({ movieId }: Props) {
    const movieClient = useMovieClient()
    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["movieDetails", movieId],
        queryFn: ({ signal }) => movieClient.movieDetails(movieId, signal),
        enabled: Number.isFinite(movieId) && movieId > 0
    })

    if (isLoading) return <div className="p-4">Loading...</div>

    if (isError) {
        return (
            <div className="p4">
                <div className="text-red-600">
                    Error: failed to get the Movie details. Please try again later.
                </div>
            </div>
        )
    }

    if (!data) return <div className="p4">No data.</div>
     
    console.log(data.poster_full)
    
    return (
        <div className="relative flex flex-col justify-center p-8">
            {data.poster_full && (
                <Image 
                    src={data.poster_full} 
                    alt={data.title ?? ""}
                    width={500}
                    height={750}
                    className="w-auto h-auto max-w-full"
                />
            )}
            <div className="p-4 bg-white border-t border-white/50">
                <h2 className="text-xl font-semibold">{data.title}</h2>
                <p className="text-sm opacity-70">{`Released: ${data.release_date}`}</p>
                {data.overview ? (
                    <p className="mt-3 leading-relaxed">{data.overview}</p>
                ) : (
                    <p className="mt-3 opacity-70">No overview available</p>
                )}
            </div>
        </div>
    )
}