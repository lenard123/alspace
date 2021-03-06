import { useState } from 'react'
import { Avatar, Input, Button, message } from 'antd'
import { createPost } from '@/js/apis/PostApi'
import { useCurrentUser } from '@/js/query/queries/useCurrentUserQuery'
import { useMutation, useQueryClient } from 'react-query'
import queryKeyFactory from '@/js/query/queryKeyFactory'
import classNames from 'classnames'
import ImageUploader from './ImageUploader'
import { successMessage } from '@/js/utils'


export default function WritePost({ className }) {
    
    const [files, setFiles] = useState([])
    const { avatarUrl, id } = useCurrentUser()
    const [content, setContent] = useState('')
    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation(createPost, {
        onSuccess(data){
            setContent('')
            setFiles([])
            queryClient.invalidateQueries(queryKeyFactory.post, queryKeyFactory.userPosts(id))
            successMessage('Posted successfully')
        },

        onError() {
            message.error('Post not submitted. An error occured')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLoading || content.trim().length === 0) return;
        mutate({content, files})
    }

    return (
        <div className={`flex gap-2 sm:rounded-lg bg-white border border-solid p-4 border-gray-300 ${className}`}>
            <Avatar className='flex-shrink-0' size='large' src={avatarUrl} />
            <form onSubmit={handleSubmit} className='flex-grow flex flex-col gap-2'>
                <Input.TextArea maxLength={600} value={content} onChange={e => setContent(e.target.value)} className='rounded-lg' rows={2} placeholder='Write something...' />
                <div className={classNames('flex justify-between', { 'flex-col': files.length > 0 })}>
                    <ImageUploader files={files} setFiles={setFiles} />
                    <Button loading={isLoading} htmlType='submit' className='btn-green self-end'>Share</Button>
                </div>
            </form>
        </div>
    )
}