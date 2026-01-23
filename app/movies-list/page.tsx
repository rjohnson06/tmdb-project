import { Trending } from '@/components/trending/trending'

export default async function MoviePage() {
    return (
        <main className='mx-auto max-w-3xl p-6'>
            <Trending />
        </main>
    )
}