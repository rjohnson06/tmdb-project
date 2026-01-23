export async function apiGet<T>(url: string, signal?: AbortSignal): Promise<T> {
    const res = await fetch(url, {
        method: "GET",
        signal
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`API ${res.status}: ${text}`)
    }

    return (await res.json()) as T
}