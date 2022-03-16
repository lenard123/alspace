import { Avatar, Comment, Input, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Post from '/src/components/Post/Post'
import PostComment from '/src/components/Comment/Comment'

export default function()
{
    return (
        <div className='my-4 max-w-xl mx-auto'>
            <Post>
                <PostComment />
                <PostComment />
                <PostComment />

                <Comment 
                    avatar={<Avatar icon={<UserOutlined />}/>}
                    content={
                        <div className='space-y-2'>
                            <Input.TextArea rows={2} placeholder='Write a comment' />
                            <Button type='primary'>Submit</Button>
                        </div>
                    }
                />

            </Post>
        </div>
    )
}