import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Input } from "antd";
import { useCurrentUser } from '@/js/query/queries/useCurrentUserQuery';
import useWriteComment from './useWriteComment';


export default function WriteComment({ type, id, fullname }) {

    const { isLoading, mutate, content, setContent } = useWriteComment(type, id)
    const { avatarUrl } = useCurrentUser()
    
    const submitComment = () => {
        if (isLoading) return;
        mutate(content)
    }

    return (
        <Comment
            className='children:p-0'
            avatar={<Avatar src={avatarUrl} />}
            content={
                    <Input
                        size='large'
                        className='rounded-full'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        onPressEnter={submitComment}
                        placeholder={type === 'post' ? 'Write a comment' : `Reply to ${fullname}`}
                        suffix={
                            content.trim().length > 0
                                ? <Button onClick={submitComment} loading={isLoading} type='text' size='small' icon={<SendOutlined className='cursor-pointer text-blue-500' />} />
                                : <span />
                        }
                    />
            }
        />
    )
}