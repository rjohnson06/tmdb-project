import "server-only"
import type { paths } from "./types"

type TmdbConfig = paths["/3/configuration"]["get"]["responses"]["200"]["content"]["application/json"]

let inFlight: Promise<TmdbConfig> | null = null

// we don't re-use the tmdbClient typed because we want to take advantage of nextjs fetch caching
export async function getTmdbConfig(): Promise<TmdbConfig> {
    if (inFlight) return inFlight

    inFlight = (async () => {
        const token = process.env.MOVIEDB_READ_TOKEN
        if (!token) {
            inFlight = null
            throw new Error("Missing MOVIEDB_READ_TOKEN")
        }

        const baseUrl = process.env.MOVIEDB_BASE_URL
        if (!baseUrl) {
            inFlight = null
            throw new Error("Missing MOVIEDB_BASE_URL")
        }

        const res = await fetch("https://api.themoviedb.org/3/configuration", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            next: {
                revalidate: 60 * 60 * 24
            }
        })

        if (!res.ok) {
            const text = await res.text()
            inFlight = null
            throw new Error(`Fetching TMDB failed ${res.status}: ${text}`)
        }

        return (await res.json()) as TmdbConfig
    })()

    return inFlight
}