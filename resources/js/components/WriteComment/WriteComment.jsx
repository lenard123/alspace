import { useState, useEffect } from 'react'
import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Input } from "antd";
import useApi from '@/js/hooks/useApi';
import { useCurrentUser } from '@/js/queries/useCurrentUserQuery';


export default function WriteComment({ type, id }) {

    // const { isLoading, data, execute, status, message } = useApi(submitHandler)
    const { avatarUrl } = useCurrentUser()
    const [comment, setComment] = useState('')

    // useEffect(() => {
    //     if (status === 'success') {
    //         setComment('')
    //         message.success('Commented successfully')
    //         callback(data)
    //     }
    // }, [status])
    
    const submitComment = () => {
        // if (isLoading) return;
        // execute(comment)
    }

    return (
        <Comment
            className='children:p-0'
            avatar={<Avatar src={avatarUrl} />}
            content={
                    <Input
                        size='large'
                        className='rounded-full'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        onPressEnter={submitComment}
                        placeholder='Write a comment'
                        suffix={
                            comment.trim().length > 0
                                ? <Button onClick={submitComment} loading={false} type='text' size='small' icon={<SendOutlined className='cursor-pointer text-blue-500' />} />
                                : <span />
                        }
                    />
            }
        />
    )
}