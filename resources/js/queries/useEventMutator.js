import { useQueryClient } from "react-query"
import { updatePagination } from "../utils/paginationReducer"


const useEventMutator = () => {
    const queryClient = useQueryClient()
    const updateEvent = (event) => {
        queryClient.setQueriesData(['events'], updatePagination(event))
    }

    return {
        updateEvent
    }
}

export default useEventMutator