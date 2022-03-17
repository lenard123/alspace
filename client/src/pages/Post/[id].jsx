import { useState } from 'react'
import { Avatar, Comment, Input, Button, List } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Post from '/src/components/Post/Post'
import PostComment from '/src/components/Comment/Comment'

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
                    <PostComment comment={comment}/>
                </List.Item>
            )}
        />
    )
}

export default function()
{

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    const submitComment = () => {
        if (comment.trim().length == 0) return
        setComments(comments => {
            return [...comments, comment]
        })
        setComment('')
    }

    return (
        <div className='my-4 max-w-xl mx-auto'>
            <Post>

                <CommentList comments={comments} />

                <Comment 
                    avatar={<Avatar icon={<UserOutlined />}/>}
                    content={
                        <div className='space-y-2'>
                            <Input.TextArea value={comment} onChange={e=>setComment(e.target.value)} rows={2} placeholder='Write a comment' />
                            <Button onClick={submitComment} type='primary'>Submit</Button>
                        </div>
                    }
                />

            </Post>
        </div>
    )
}