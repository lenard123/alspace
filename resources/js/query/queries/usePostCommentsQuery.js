import { useInfiniteQuery } from "react-query"
import { PostApi } from "../../apis"
import { fetchReplies } from "../../apis/CommentApi"
import { fetchComments } from "../../apis/PostApi"
import queryKeyFactory from "../queryKeyFactory"
import { paginationDataReducer } from "../ReactQueryProvider"

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
    return useInfiniteQuery({
        queryKey: getQueryKey(type, id),
        queryFn: ({ pageParam }) => fetcher(type, id, pageParam),
        select: paginationDataReducer
    })
}

const usePostCommentsQuery = (postId) => {
    return useInfiniteQuery({
        queryKey: queryKeyFactory.postComments(postId),
        queryFn: ({ pageParam }) => PostApi.fetchComments(postId, pageParam),
        select: paginationDataReducer
    })
}

export default usePostCommentsQuery