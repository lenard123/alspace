import { useEffect } from 'react'
import { likeComment, unlikeComment } from '@/js/apis/CommentApi'
import useApi from '@/js/hooks/useApi'
import { useIsCurrentUserLikeComment } from '@/js/recoil/selectors/currentUserSelector'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useCommentLikerIds } from '@/js/recoil/selectors/useComment'
import useCommentsLikerIdsActions from '@/js/recoil/actions/useCommentsLikerIdsActions'

const toggleLike = async (isLike, id) => {
    return isLike 
        ? await unlikeComment(id)
        : await likeComment(id)
}

export default function LikeButton({id}) {

    const { isLoading, status, data, execute } = useApi(toggleLike)
    const isLike = useIsCurrentUserLikeComment(id)
    const { setCommentLikerIds } = useCommentsLikerIdsActions()

    useEffect(() => {
        if (status==='success') {
            setCommentLikerIds(id, data)
        }
    }, [status])
    
    const handleClick = () => {
        if (isLoading)return;
        execute(isLike, id)
    }

    return (
        <span onClick={handleClick}>
            {isLoading 
                ? <LoadingOutlined />
                : <span className={isLike ? 'text-blue-500 font-semibold' : ''}>Like</span>
            }
        </span>
    )
}