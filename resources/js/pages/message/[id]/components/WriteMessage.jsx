import { sendMessage } from "@/js/apis/ThreadApi";
import queryKeyFactory from "@/js/queries/queryKeyFactory";
import { useCurrentUser } from "@/js/queries/useCurrentUserQuery";
import { prependPagination } from "@/js/utils/paginationReducer";
import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Input } from "antd";
import { useState} from 'react'
import { useMutation, useQueryClient } from "react-query";

export default function WriteMessage({ id }) {

    // const { execute, isLoading, status, data } = useApi(sendMessage)

    const { avatarUrl } = useCurrentUser()

    const [content, setContent] = useState('')

    const queryClient = useQueryClient()

    const { isLoading, mutate } = useMutation(
        () => sendMessage(id, content), 
        {
            onSuccess: (data) => {
                queryClient.setQueryData(queryKeyFactory.threadMessages(id), prependPagination(data))
                setContent('')
            }
        }
    )
    // useEffect(() => {
    //     if (status === 'success') {
    //         setContent('')
    //     }
    // }, [status])

    const handleSubmit = () => {
        if (isLoading || content.trim().length <= 0) return;
        mutate()
        // execute(id, content)
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