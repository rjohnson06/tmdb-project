// server side tmdb client

import "server-only"
import createClient from "openapi-fetch"
import type { paths } from "./types"

export function tmdbClient() {
    const token = process.env.MOVIEDB_READ_TOKEN
    if (!token) throw new Error("Missing MOVIEDB_READ_TOKEN")

    const baseUrl = process.env.MOVIEDB_BASE_URL
    if (!baseUrl) throw new Error("Missing MOVIEDB_BASE_URL")

    return createClient<paths>({
        baseUrl: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
}