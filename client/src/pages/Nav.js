import { Link, Outlet } from "react-router-dom";

export const Nav=()=>{
    return(
        <>
        <nav>
            <ul className="flex gap-10 pl-10 mb-5 py-5 justify-center font-medium shadow-lg">
                <li>
                    <Link to='/'>Generate</Link>
                </li>
                <li className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:border-b-4- hover:bg-indigo-500 duration-300">
                    <Link to='/data'>Data</Link>
                </li>
                <li>
                    <a href='/ujian'>Ujian</a>
                </li>
            </ul>
        </nav>
        </>
    )
}