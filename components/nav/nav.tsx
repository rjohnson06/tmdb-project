import NavLink from "./nav-link";

export default function Nav() {
    return (
        <div className="flex flex-row p-8 gap-5"> 
            <NavLink text="Home" href="/" />
            <NavLink text="Favorites" href="/favorites" />
        </div>
    )
}