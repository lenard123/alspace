import { commentOnPost } from "@/js/apis/PostApi"
import { useMutation, useQueryClient } from "react-query"
import { useState } from 'react'
import queryKeyFactory from "@/js/query/queryKeyFactory"
import { prependPagination } from "@/js/utils/paginationReducer"
import { replyOnComment } from "@/js/apis/CommentApi"

const submitComment = (type, id, content) => {
    if (type === 'comment') {
        return replyOnComment(id, content)
    }
    return commentOnPost(id, content)
}

const useWriteComment = (type, id) => {
    const [content, setContent] = useState('')
    const queryClient = useQueryClient()
    const mutation = useMutation(
        (content) => submitComment(type, id, content),
        {
            onSuccess: (data) => {
                setContent('')
                if (type === 'post') {
                    queryClient.setQueryData(queryKeyFactory.postComments(id), prependPagination(data))
                }
                if (type === 'comment') {
                    queryClient.setQueryData(queryKeyFactory.commentReplies(id), prependPagination(data))
                }
            }
        }
    )

    return {
        ...mutation,
        content,
        setContent
    }
}

export default useWriteComment