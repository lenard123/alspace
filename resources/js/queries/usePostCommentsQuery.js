import { useInfiniteQuery } from "react-query"
import { PostApi } from "../apis"
import queryKeyFactory from "./queryKeyFactory"

const usePostCommentsQuery = (postId) => {
    return useInfiniteQuery(
        queryKeyFactory.postComments(postId),
        ({ pageParam = 1 }) => PostApi.fetchComments(postId, pageParam),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.current_page < lastPage.last_page) {
                    return lastPage.current_page + 1
                }
                return undefined
            },
            select: ({ pages }) => {
                return pages.map(page => {
                    return page.data
                }).flat().reverse()
            }
        }
    )
}

export default usePostCommentsQuery