import { useInfiniteQuery, useQueryClient } from "react-query"
import { PostApi } from "../../apis"
import { getPaginationPayload, getPayload } from "../../utils"
import queryKeyFactory from "../queryKeyFactory"

const fetchPosts = ({ pageParam = 1 }) => {
    return PostApi.fetchPosts(pageParam)
}

const useFeedQuery = (options = {}) => {
    const queryClient = useQueryClient()

    return useInfiniteQuery({
        queryKey: queryKeyFactory.posts, 
        queryFn: fetchPosts, 
        initialData: getPaginationPayload(),
        getNextPageParam: (lastPage) => {
            if (lastPage.next_page_url) {
                return lastPage.current_page + 1
            }
            return undefined
        },
        select: ({ pages }) => {
            return pages.map(page => {
                return page.data
            }).flat()
        },
        ...options
    })
}

export default useFeedQuery