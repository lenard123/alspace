import { useInfiniteQuery, useQueryClient } from "react-query"
import { PostApi } from "../apis"
import queryKeyFactory from "./queryKeyFactory"

const fetchPosts = ({ pageParam = 1 }) => {
    return PostApi.fetchPosts(pageParam)
}

const useFeedQuery = () => {
    const queryClient = useQueryClient()

    return useInfiniteQuery({
        queryKey: queryKeyFactory.posts, 
        queryFn: fetchPosts, 
        getNextPageParam: (lastPage) => {
            if (lastPage.current_page < lastPage.last_page) {
                return lastPage.current_page + 1
            }
            return undefined
        },
        onSuccess: (data) => {
            data.forEach(post => {
                queryClient.setQueryData(queryKeyFactory.post(post.id), post)
            })
        },
        select: ({ pages }) => {
            return pages.map(page => {
                return page.data
            }).flat()
        }
    })
}

export default useFeedQuery