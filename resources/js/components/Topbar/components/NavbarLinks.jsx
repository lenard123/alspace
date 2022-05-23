import { Link } from "react-router-dom";


export default function NavbarLinks() {
    return (
        <div className='ml-8 hidden md:flex items-center gap-4'>
            <Link to='/home'>Home</Link>
            <Link to='/alumni'>Alumni</Link>
            <Link to='/events'>Events</Link>
            <Link to='/jobs'>Jobs</Link>
            <Link to='/items'>Items</Link>
        </div>
    )
}