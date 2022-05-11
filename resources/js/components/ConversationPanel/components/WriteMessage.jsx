import { sendMessage } from "@/js/apis/ThreadApi";
import queryKeyFactory from "@/js/query/queryKeyFactory";
import { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import { prependPagination } from "@/js/utils/paginationReducer";
import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Input } from "antd";
import { useState} from 'react'
import { useMutation, useQueryClient } from "react-query";
import useSendMessageAction from "@/js/query/actions/useSendMessageAction";

export default function WriteMessage({ id, admin = false }) {

    const { avatarUrl } = useCurrentUser()

    const [content, setContent] = useState('')

    const queryClient = useQueryClient()

    const { isLoading, mutate } = useSendMessageAction()

    const handleSubmit = () => {
        if (isLoading || content.trim().length <= 0) return;
        mutate({ id, content })
        setContent('')
    }

    return (
        <Comment
            className='mx-4'
            avatar={<Avatar src={admin ? '/images/logo.png' : avatarUrl} />}
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