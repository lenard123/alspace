import { useInfiniteQuery } from "react-query"
import { PostApi } from "../apis"
import { fetchReplies } from "../apis/CommentApi"
import { fetchComments } from "../apis/PostApi"
import queryKeyFactory from "./queryKeyFactory"

const getQueryKey = (type, id) => {
    if (type === 'comment') {
        return queryKeyFactory.commentReplies(id)
    } 
    return queryKeyFactory.postComments(id)
}

const fetcher = (type, id, page) => {
    if (type === 'comment') {
        return fetchReplies(id, page)
    }
    return fetchComments(id, page)
}

export const useCommentsQuery = (type, id) => {
    return useInfiniteQuery(
        getQueryKey(type, id),
        ({ pageParam = 1 }) => fetcher(type, id, pageParam),
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