import { likeComment, unlikeComment } from '@/js/apis/CommentApi'
import { LoadingOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from 'react-query'
import queryKeyFactory from '@/js/query/queryKeyFactory'
import { updatePagination } from '@/js/utils/paginationReducer'

const toggleLike = ({id, is_like}) => {
    return is_like
        ? unlikeComment(id)
        : likeComment(id)
}

export default function LikeButton({comment}) 
{
    const { id, is_like, commentable_id } = comment
    const queryClient = useQueryClient()
    const { isLoading, mutate } = useMutation(toggleLike, {
        onSuccess: (data) => {
            if (data.commentable_type === 'App\\Models\\Post') {
                queryClient.setQueryData(queryKeyFactory.postComments(commentable_id), updatePagination(data))
            }
            if (data.commentable_type === 'App\\Models\\Comment') {
                queryClient.setQueryData(queryKeyFactory.commentReplies(commentable_id), updatePagination(data))
            }
        }
    })
    
    const handleClick = () => {
        if (isLoading)return;
        mutate({id, is_like})
    }

    return (
        <span onClick={handleClick}>
            {isLoading 
                ? <LoadingOutlined />
                : <span className={is_like ? 'text-blue-500 font-semibold' : ''}>Like</span>
            }
        </span>
    )
}