import React from 'react'
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Modal } from "antd"
import * as PostApi from '@/js/apis/PostApi'
import useApi from '@/js/hooks/useApi'
import { useCurrentUser } from '@/js/queries/useCurrentUserQuery'
import { useQueryClient } from 'react-query'
import queryKeyFactory from '@/js/queries/queryKeyFactory'
import { removeFromPagination } from '@/js/utils/paginationReducer'
import usePostMutator from '@/js/queries/usePostMutator'


const usePostLogic = (post, onDelete) => {
    const { execute, message } = useApi(PostApi.deletePost)
    const { id:currentUserId } = useCurrentUser()
    const { removePost } = usePostMutator()
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
                if (typeof onDelete === 'function') onDelete()
                removePost(post.id)
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