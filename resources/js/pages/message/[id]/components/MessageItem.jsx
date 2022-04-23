import useMessageMutator from '@/js/queries/useMessageMutator'
import { useEffect } from 'react'

export default function MessageItem({message, own, reader})
{
    useEffect(() => {
        if (!own && !message.has_read) {
            reader(message.id)
        }
    }, [])

    return (
        <div key={message.id} className={`flex flex-col m-3 ${own ? 'items-end' : 'items-start'}`}>
            <div
                className='rounded-lg shadow'
                style={{
                    backgroundColor: own ? '#38BDF8' : '#E5E5E5',
                    color: own ? '#fff' : '#000',
                    maxWidth: '60%',
                    padding: '8px 12px',
                }}>
                {message.content}
            </div>
            <span className='text-xs'>{moment(message.created_at).fromNow()}</span>
        </div>
    )
}