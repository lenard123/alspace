import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { filters } from "@/js/query/queries/useEventsQuery"

const useCurrentFilter = () => {
    const [searchParams] = useSearchParams()
    const filter = searchParams.get('filter')
    const navigate = useNavigate()

    // useEffect(() => {
    //     if ( !filters.some(({key}) => key === filter)) {
    //         navigate('/events?filter=active', {replace: true})
    //     }
    // }, [filter])

    return filter
}

export default useCurrentFilter