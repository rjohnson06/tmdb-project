"use client"

import { useState, useEffect } from "react"
import { apiGet } from "@/lib/tmdb/ourApiClient"
import { MovieDetailsType } from "@/lib/tmdb/sharedTypes"
import { useQuery } from "@tanstack/react-query"

export type Props = {
    movieId: number
}

export function MovieDetails({ movieId }: Props) {
    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["movieDetails", movieId],
        queryFn: ({ signal }) => apiGet<MovieDetailsType>(`/api/movie/${movieId}`, signal),
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

    return (
        <div className="rounded-2xl border p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold">
                        {data.title}
                    </h2>
                    <p className="text-sm opacity-70">
                        {`Released: ${data.release_date}`}
                    </p>
                </div>

                {isFetching ? <span className="text-sm opacity-60">Loading...</span> : null}
            </div>
            {
                data.overview ? (
                    <p className="mt-3 leading-relaxed">{data.overview}</p>
                ) : (
                    <p className="mt-3 opacity-70">No overview available</p>
                )
            }
        </div>
    )
}