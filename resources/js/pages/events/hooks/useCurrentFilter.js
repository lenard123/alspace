import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { validFilters } from "@/js/query/queries/useEventsQuery"

const useCurrentFilter = () => {
    const [searchParams] = useSearchParams()
    const filter = searchParams.get('filter')
    const navigate = useNavigate()

    useEffect(() => {

        if (! validFilters.includes(filter) ) {
            navigate('/events?filter=active', {replace:true})
        }

    }, [filter])

    return filter
}

export default useCurrentFilter