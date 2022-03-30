import { useEffect } from 'react'
import { Spin } from "antd"
import { LikeFilled, LikeOutlined } from "@ant-design/icons"
import { useIsCurrentUserLikePost } from "@/js/recoil/selectors/currentUserSelector"
import { likePost, unlikePost } from "@/js/apis/PostApi"
import usePostsLikerIdsActions from "@/js/recoil/actions/usePostsLikerIdsActions"
import useApi from "@/js/hooks/useApi"

const toggleLike = (id, isLike) => {   
    return isLike ? unlikePost(id) : likePost(id)
}

export default function LikeButton({ id })
{
    const { isLoading, status, data:newLikerIds, execute } = useApi(toggleLike)
    const isLike = useIsCurrentUserLikePost(id)
    const { setPostLikerIds } = usePostsLikerIdsActions()

    useEffect(() => {
        if (status === 'success') {
            setPostLikerIds(id, newLikerIds)
        }
    }, [status])

    const likePost = () => {
        if (isLoading) return;
        execute(id, isLike)
    }

    return (
        <button onClick={likePost} className='cursor-pointer flex-grow py-1 bg-white hover:bg-gray-100 rounded-full'>
            <Spin spinning={isLoading}>
                {isLike 
                    ? <LikeFilled className='text-blue-500'/> 
                    : <LikeOutlined />
                }
            </Spin>
        </button>
    )
}