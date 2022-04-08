import { useQueryClient } from "react-query"
import { updatePagination } from "../utils/paginationReducer"
import queryKeyFactory from "./queryKeyFactory"


const usePostMutator = () => {

    const queryClient = useQueryClient()

    const updatePost = (post) => {

        // queryClient.setQueryData(
        //     queryKeyFactory.posts,
        //     data => {
        //         if (!data) return;
        //         return {
        //             ...data,
        //             pages: data.pages.map(page => ({
        //                 ...page,
        //                 data: page.data.map(oldPost => oldPost.id === post.id ? post : oldPost)
        //             }))
        //         }
        //     }
        // )
        queryClient.setQueryData(queryKeyFactory.posts, updatePagination(post))

        queryClient.setQueryData(queryKeyFactory.post(post.id), post)
    }

    return {
        updatePost
    }
}

export default usePostMutator