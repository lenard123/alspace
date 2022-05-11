import useMessageMutator from '@/js/query/mutators/useMessageMutator'
import { useEffect } from 'react'

export default function MessageItem({message, own, reader})
{
    useEffect(() => {
        if (!own && !message.has_read) {
            reader(message)
        }
    }, [])

    const backgroundColor = message.is_sending 
        ? 'rgb(147 197 253)'
        : own ? '#38BDF8' : '#E5E5E5'

    return (
        <div key={message.id} className={`flex flex-col m-3 ${own ? 'items-end' : 'items-start'}`}>
            <div
                className='rounded-lg shadow px-3 py-2 max-w-[60%] bg-blue-300'
                style={{
                    backgroundColor,
                    color: own ? '#fff' : '#000',
                    overflowWrap: 'break-word'
                }}>
                {message.content}
            </div>
            {message.created_at && 
                <span className='text-xs'>{moment(message.created_at).fromNow()}</span>
            }
        </div>
    )
}