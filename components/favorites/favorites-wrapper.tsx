"use client"

import dynamic from 'next/dynamic'

const FavoritesClientOnly = dynamic(
    () => import('./favorites'),
    { ssr: false }
)

export function FavoritesWrapper() {
    return (
        <FavoritesClientOnly />
    )
}