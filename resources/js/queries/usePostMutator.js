import { useQueryClient } from "react-query"
import { removeFromPagination, updatePagination } from "../utils/paginationReducer"
import queryKeyFactory from "./queryKeyFactory"
import useFeedQuery from "./useFeedQuery"
import { map } from 'lodash'

const usePostMutator = () => {

    const { data:feedPosts } = useFeedQuery({ enabled: false })
    const queryClient = useQueryClient()

    const updatePost = (post) => {
        queryClient.setQueryData(queryKeyFactory.posts, updatePagination(post))
        queryClient.setQueryData(queryKeyFactory.userPosts(post.user_id), updatePagination(post))
        queryClient.setQueryData(queryKeyFactory.post(post.id), post)
    }

    const removePost = (postId) => {
        if (feedPosts && map(feedPosts, 'id').includes(postId)) {
            queryClient.setQueryData(queryKeyFactory.posts, removeFromPagination(postId))
        }

        queryClient.removeQueries(queryKeyFactory.post(postId))
    }

    return {
        updatePost,
        removePost
    }
}

export default usePostMutator