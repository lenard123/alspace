import classNames from "classnames"
import { Link } from "react-router-dom"
import useCurrentFilter from "../useCurrentFilter"


const FilterLink = ({ filter, children }) => {

    const activeFilter = useCurrentFilter()
    const isActive = activeFilter === filter

    return (
        <Link
            className={classNames('btn btn-secondary rounded-full', { 'active': isActive })}
            to={`/events?filter=${filter}`}
        >
            {children}
        </Link>
    )
}

export default FilterLink