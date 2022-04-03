import { sendMessage } from "@/js/apis/ThreadApi";
import useApi from "@/js/hooks/useApi";
import useMessagesAction from "@/js/recoil/actions/useMessagesAction";
import currentUserSelector from "@/js/recoil/selectors/currentUserSelector";
import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Input } from "antd";
import { useState, useEffect } from 'react'
import { useRecoilValue } from "recoil";

export default function WriteMessage({ id }) {

    const { execute, isLoading, status, data } = useApi(sendMessage)

    const { avatarUrl } = useRecoilValue(currentUserSelector)

    const [content, setContent] = useState('')

    const { appendMessage } = useMessagesAction()

    useEffect(() => {
        if (status === 'success') {
            setContent('')
            appendMessage(data)
        }
    }, [status])

    const handleSubmit = () => {
        if (isLoading || content.trim().length <= 0) return;
        execute(id, content)
    }

    return (
        <Comment
            className='mx-4'
            avatar={<Avatar src={avatarUrl} />}
            content={
                <Input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onPressEnter={handleSubmit}
                    size='large'
                    className='rounded-full'
                    placeholder='Write a message'
                    suffix={
                        content.trim().length > 0
                            ? <Button loading={isLoading} type='text' onClick={handleSubmit} size='small' icon={<SendOutlined className='text-blue-500' />} />
                            : <span />
                    }
                />
            }
        />
    )
}