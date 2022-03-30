import { useState, useEffect } from 'react'
import { Avatar, Input, Button } from 'antd'
import { CameraFilled } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import currentUserSelector from '@/js/recoil/selectors/currentUserSelector'
import useApi from '@/js/hooks/useApi'
import { createPost } from '@/js/apis/PostApi'

export default function WritePost() {

    const { avatarUrl } = useRecoilValue(currentUserSelector)
    const [content, setContent] = useState('')
    const { isLoading, execute, status, message } = useApi(createPost)

    useEffect(() => {
        if (status === 'success') {
            message.success('Successfully posted')
            setContent('')
        }
    }, [status])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLoading || content.trim().length === 0) return;
        execute(content)
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