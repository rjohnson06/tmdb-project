"use client"

import { useEffect, useState } from 'react'

const key = "favorites"

type Favorites = number[]

export default function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>(() => {
        try {
            const stored = localStorage.getItem(key)
            return stored ? JSON.parse(stored) : []
        }
        catch {
            return []
        }
    })

    function toggleFavorite(id: number) {
        console.log("toggle favorite")
        const fav = favorites.find(fId => fId === id)

        if (fav) {
            setFavorites(favorites => favorites.filter(fId => fId !== id))
        }
        else {
            setFavorites(favorites => [...favorites, id])
        }
    }

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(favorites))
        }
        catch { }
    }, [key, favorites])

    return [favorites, setFavorites, toggleFavorite] as const
}