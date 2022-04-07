import { useState } from 'react'
import { Avatar, Input, Button, message } from 'antd'
import { CameraFilled } from '@ant-design/icons'
import { createPost } from '@/js/apis/PostApi'
import { useCurrentUser } from '@/js/queries/useCurrentUserQuery'
import { useMutation, useQueryClient } from 'react-query'

export default function WritePost() {

    const { avatarUrl } = useCurrentUser()
    const [content, setContent] = useState('')
    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation(createPost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
            message.success('Posted successfully')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLoading || content.trim().length === 0) return;
        mutate(content)
    }

    return (
        <div className='flex gap-2 sm:rounded-lg bg-white border border-solid p-4 border-gray-300'>
            <Avatar size='large' src={avatarUrl} />
            <form onSubmit={handleSubmit} className='flex-grow flex flex-col gap-2'>
                <Input.TextArea value={content} onChange={e=>setContent(e.target.value)} className='rounded-lg' rows={2} placeholder='Write something...'/>
                <div className='flex justify-between'>
                    <div className='space-x-2'>
                        <CameraFilled/>
                        <span>Attach a photo</span>
                    </div>
                    <Button loading={isLoading} htmlType='submit' className='btn-green'>Share</Button>
                </div>
            </form>
        </div>
    )
}