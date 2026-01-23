import { notFound } from 'next/navigation'
import { MovieDetails, Props } from '@/components/MovieDetails'

type PageProps = {
    params: {
        movieId: string
    }
}

export default async function MoviePage({ params }: PageProps) {
    const param = await params
    const movieId = Number(param.movieId)

    if (!Number.isInteger(movieId) || movieId <= 0) {
        notFound()
    }

    return (
        <main className='mx-auto max-w-3xl p-6'>
            <MovieDetails movieId={movieId}></MovieDetails>
        </main>
    )
}