// dependency inject an implementation of our api client

"use client"

import { createContext, ReactNode, useContext } from "react"
import { IMovieClient, movieClient } from "./clientSideClient"

const MovieClientContext = createContext<IMovieClient | null>(null)

export function MovieClientProvider({
    client,
    children
}: {
    client?: IMovieClient
    children: ReactNode
}) {
    return (
        <MovieClientContext.Provider value={client ?? movieClient}>
            {children}
        </MovieClientContext.Provider>
    )
}

export function useMovieClient(): IMovieClient {
    const client = useContext(MovieClientContext)
    if (!client) {
        throw new Error("useMovieClient must be used within a MovieClientProvider")
    }
    return client
}