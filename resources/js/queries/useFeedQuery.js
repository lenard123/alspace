import { useInfiniteQuery } from "react-query"
import { PostApi } from "../apis"

const fetchPosts = ({ pageParam = 1 }) => {
    return PostApi.fetchPosts(pageParam)
}

const useFeedQuery = () => {
    return useInfiniteQuery(['posts'], fetchPosts, {
        getNextPageParam: (lastPage) => {
            if (lastPage.current_page < lastPage.last_page) {
                return lastPage.current_page + 1
            }
            return undefined
        },
        select: ({ pages }) => {
            return pages.map(page => {
                return page.data
            }).flat()
        }
    })
}

export default useFeedQuery