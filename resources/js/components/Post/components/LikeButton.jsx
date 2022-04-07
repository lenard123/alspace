import { useEffect } from 'react'
import { Spin } from "antd"
import { LikeFilled, LikeOutlined } from "@ant-design/icons"
import { useIsCurrentUserLikePost } from "@/js/recoil/selectors/currentUserSelector"
import { likePost, unlikePost } from "@/js/apis/PostApi"
import usePostsLikerIdsActions from "@/js/recoil/actions/usePostsLikerIdsActions"
import useApi from "@/js/hooks/useApi"
import { useMutation } from 'react-query'
import usePostMutator from '@/js/queries/usePostMutator'

const toggleLike = ({id, is_like}) => {   
    return is_like ? unlikePost(id) : likePost(id)
}

export default function LikeButton({ post })
{
    const { is_like, id } = post
    const { updatePost } = usePostMutator()
    const { isLoading, mutate } = useMutation(toggleLike, {
        onSuccess: data => {
            updatePost(data)
        }
    })
    // const { isLoading, status, data:newLikerIds, execute } = useApi(toggleLike)
    // const isLike = useIsCurrentUserLikePost(id)
    // const { setPostLikerIds } = usePostsLikerIdsActions()

    // useEffect(() => {
    //     if (status === 'success') {
    //         setPostLikerIds(id, newLikerIds)
    //     }
    // }, [status])

    const likePost = () => {
        if (isLoading) return;
        mutate({id, is_like})
    }

    return (
        <button onClick={likePost} className='cursor-pointer flex-grow py-1 bg-white hover:bg-gray-100 rounded-full'>
            <Spin spinning={isLoading}>
                {is_like 
                    ? <LikeFilled className='text-blue-500'/> 
                    : <LikeOutlined />
                }
            </Spin>
        </button>
    )
}