"use client"

import Movie from "./movie"
import { MovieProps } from "./movie"

export type MovieListProps = {
    movies: (MovieProps & { id: number, poster_thumb: string | null })[]
}

export function MovieList({ movies }: MovieListProps) {
     return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex gap-6 flex-col">
                {movies.map(movie => (
                    <Movie 
                        key={movie.id}
                        id={movie.id} 
                        title={movie.title} 
                        overview={movie.overview} 
                        thumbnailUrl={movie.poster_thumb ?? ""} 
                        favorite={movie.favorite} 
                        favoriteClicked={movie.favoriteClicked} />
                ))}
            </div>
        </div>
     )
}