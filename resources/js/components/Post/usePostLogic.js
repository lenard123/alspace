import React from 'react'
import usePost from "@/js/recoil/selectors/usePost"
import authState from "@/js/recoil/states/authState"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Modal } from "antd"
import { useRecoilValue } from "recoil"
import * as PostApi from '@/js/apis/PostApi'
import useApi from '@/js/hooks/useApi'
import usePostsActions from '@/js/recoil/actions/usePostsActions'


const usePostLogic = (post, onDelete) => {
    const { execute, message } = useApi(PostApi.deletePost)
    const { currentUserId } = useRecoilValue(authState)
    const { deletePost } = usePostsActions()
    const isBelongsToUser = post.user_id == currentUserId

    const showDeleteModal = () => {
        Modal.confirm({
            title: 'Are you sure to delete this post?',
            icon: React.createElement(ExclamationCircleOutlined),
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                await execute(post.id)
                deletePost(post.id)
                if (typeof onDelete === 'function') onDelete()
                message.info('Post deleted successfully')
            }
        })
    }

    return {
        post,
        isBelongsToUser,
        showDeleteModal
    }
}

export default usePostLogic