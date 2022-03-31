import { useState, useEffect } from 'react'
import { Avatar, Comment, Input, Button, List, Skeleton } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Post from '@/js/components/Post/Post'
import PostComment from '@/js/components/Comment/Comment'
import { useParams } from 'react-router-dom'
import useApi from '@/js/hooks/useApi'
import { fetchPost } from '@/js/apis/PostApi'
import usePost from '@/js/recoil/selectors/usePost'
import usePostsActions from '@/js/recoil/actions/usePostsActions'

const CommentList = ({ comments }) => {
    return (
        <List
            header={comments.length > 0 && `${comments.length} ${comments.length > 1 ? 'comments' : 'comments'}`}
            dataSource={comments}
            locale={{
                emptyText: 'Be the first to comment'
            }}
            renderItem={comment => (
                <List.Item className='py-0'>
                    <PostComment comment={comment} />
                </List.Item>
            )}
        />
    )
}

export default function ViewPostPage() 
{
    const { id } = useParams()
    const { execute, status, data } = useApi(fetchPost)
    const post = usePost(id)
    const { setPost } = usePostsActions()

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        if (status === 'success') {
            setPost(data)
        }
    }, [status])

    useEffect(() => {
        execute(id)
    }, [id])

    const submitComment = () => {
        if (comment.trim().length == 0) return
        setComments(comments => {
            return [...comments, comment]
        })
        setComment('')
    }

    return (
        <div className='max-w-xl mx-auto sm:pt-4 pb-4'>
            <Skeleton loading={!post} avatar active>
                <Post post={post}>

                    <CommentList comments={comments} />

                    <Comment
                        avatar={<Avatar icon={<UserOutlined />} />}
                        content={
                            <div className='space-y-2'>
                                <Input.TextArea value={comment} onChange={e => setComment(e.target.value)} rows={2} placeholder='Write a comment' />
                                <Button onClick={submitComment} type='primary'>Submit</Button>
                            </div>
                        }
                    />

                </Post>
            </Skeleton>
        </div>
    )
}