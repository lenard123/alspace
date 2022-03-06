import { Search } from "@mui/icons-material";

import './searchbar.css'

export default function Searchbar() {
    return (
        <div className="searchbar">
            <Search className="ml-2 text-blue-500"/>
            <input className="searchbarInput" type="search" placeholder="Search for posts, jobs, or events"/>
        </div>
    )
}