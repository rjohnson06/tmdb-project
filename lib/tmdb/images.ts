import "server-only"
import { getTmdbConfig } from "./config"

export async function tmdbPosterUrl(
    posterPath: string
): Promise<string | null> {
    if (!posterPath) return null

    try {
        const cfg = await getTmdbConfig()
        const base = cfg.images?.secure_base_url

        return `${base}original${posterPath}`
    }
    catch {
        return null
    }
}

