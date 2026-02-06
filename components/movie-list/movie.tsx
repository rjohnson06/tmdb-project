"use client"

import Image from "next/image"
import { RiStarFill, RiStarLine } from "react-icons/ri"
import Link from "next/link"

export type MovieProps = {
    id: number,
    title?: string,
    overview?: string,
    thumbnailUrl?: string,
    favorite: boolean,
    favoriteClicked: (id: number) => void
}

export default function Movie({ id, title, overview: description, thumbnailUrl, favorite, favoriteClicked }: MovieProps) {
    return (
        <div className="flex flex-row gap-3 border-black rounded-md items-start">
            <Link href={`/movie/${id}`} className="flex gap-3">
                <div className="relative w-24 overflow-hidden rounded-lg shrink-0">
                    <div className="aspect-2/3">
                        {thumbnailUrl && <Image 
                            src={thumbnailUrl} 
                            alt={title ?? ""}
                            fill
                            sizes="(max-width: 640px) 8rem, (max-width: 768px) 10rem, 12rem"
                            className="object-cover" />}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold">{title}</h2>
                        <div>{description}</div>
                    </div>
                </div>
            </Link>
            <div>
                <button className="cursor-pointer">
                    { favorite ? <RiStarFill onClick={() => favoriteClicked(id)} /> : <RiStarLine onClick={() => favoriteClicked(id)} /> }
                </button>
            </div>
        </div>
    )
}