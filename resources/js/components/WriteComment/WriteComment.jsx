import { useState, useEffect } from 'react'
import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Input } from "antd";
import { useRecoilValue } from 'recoil';
import currentUserSelector from '@/js/recoil/selectors/currentUserSelector';
import useApi from '@/js/hooks/useApi';


export default function WriteComment({ submitHandler, callback }) {

    const { isLoading, data, execute, status, message } = useApi(submitHandler)
    const { avatarUrl } = useRecoilValue(currentUserSelector)
    const [comment, setComment] = useState('')

    useEffect(() => {
        if (status === 'success') {
            setComment('')
            message.success('Commented successfully')
            callback(data)
        }
    }, [status])
    
    const submitComment = () => {
        if (isLoading) return;
        execute(comment)
    }

    return (
        <Comment
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
                                ? <Button onClick={submitComment} loading={isLoading} type='text' size='small' icon={<SendOutlined className='cursor-pointer text-blue-500' />} />
                                : <span />
                        }
                    />
            }
        />
    )
}