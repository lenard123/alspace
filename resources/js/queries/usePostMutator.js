import { useQueryClient } from "react-query"


const usePostMutator = () => {

    const queryClient = useQueryClient()

    const updatePost = (post) => {
        queryClient.setQueryData(['posts'], data => ({
            ...data,
            pages: data.pages.map(page => ({
                ...page,
                data: page.data.map(oldPost => oldPost.id === post.id ? post : oldPost)
            }))
        }))
    }

    return {
        updatePost
    }
}

export default usePostMutator