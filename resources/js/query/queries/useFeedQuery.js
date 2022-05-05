import { useInfiniteQuery, useQueryClient } from "react-query"
import { PostApi } from "../../apis"
import { getPaginationPayload, getPayload } from "../../utils"
import queryKeyFactory from "../queryKeyFactory"
import { paginationDataReducer } from "../ReactQueryProvider"

const fetchPosts = ({ pageParam = 1 }) => {
    return PostApi.fetchPosts(pageParam)
}

const useFeedQuery = (options = {}) => {
    const queryClient = useQueryClient()

    return useInfiniteQuery({
        queryKey: queryKeyFactory.posts, 
        queryFn: fetchPosts, 
        initialData: getPaginationPayload(),
        select: paginationDataReducer,
        ...options
    })
}

export default useFeedQuery