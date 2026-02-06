import Link from "next/link"

export type NavLinkProps = {
    text: string,
    href: string
}

export default function NavLink({ text, href }: NavLinkProps) {
    return (
        <Link 
            href={href} 
            className="font-medium text-base text-neutral-600 hover:text-neutral-900 hover:underline underline-offset-4">
            {text}
        </Link>
    )
}