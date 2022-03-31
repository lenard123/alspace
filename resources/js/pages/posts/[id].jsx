import { useState, useEffect } from 'react'
import { Avatar, Input, Button, List, Skeleton } from 'antd'
import { LikeOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import Post from '@/js/components/Post/Post'
import PostComment from '@/js/components/Comment/Comment'
import { useParams } from 'react-router-dom'
import useApi from '@/js/hooks/useApi'
import { commentOnPost, fetchPost } from '@/js/apis/PostApi'
import usePost from '@/js/recoil/selectors/usePost'
import usePostsActions from '@/js/recoil/actions/usePostsActions'
import WriteComment from '@/js/components/WriteComment'
import { arrayIsLoading } from '@/js/utils'
import usePostComments from '@/js/recoil/selectors/usePostComments'
import moment from 'moment'
import usePostsCommentIdsAction from '@/js/recoil/actions/usePostsCommentIdsActions'

export default function ViewPostPage() {
    const { id } = useParams()
    const { execute, status, data, isLoading } = useApi(fetchPost)
    const post = usePost(id)
    const { setPost } = usePostsActions()
    const { appendPostCommentIds } = usePostsCommentIdsAction()
    const comments = usePostComments(id)

    useEffect(() => {
        if (status === 'success') {
            setPost(data)
        }
    }, [status])

    useEffect(() => {
        execute(id)
    }, [id])

    const submitComment = (comment) => {
        return commentOnPost(id, comment)
    }

    const successfullyComment = (comment) => {
        appendPostCommentIds(id, comment)
    }

    return (
        <div className='max-w-xl mx-auto sm:pt-4 pb-4'>
            <Skeleton loading={!post} avatar active>
                <Post post={post}>

                    <List
                        size='small'
                        locale={{ emptyText: 'Be the first to comment' }}
                        dataSource={arrayIsLoading(comments, isLoading && comments.length <= 0)}
                        renderItem={comment => (
                            <List.Item>
                                <Skeleton rows={1} avatar loading={comment.isLoading}>
                                    <PostComment comment={comment} />
                                </Skeleton>
                            </List.Item>
                        )}
                        footer={
                            <WriteComment submitHandler={submitComment} callback={successfullyComment} />
                        }
                    />

                </Post>
            </Skeleton>
        </div>
    )
}