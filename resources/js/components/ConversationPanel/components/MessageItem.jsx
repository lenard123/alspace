import useMessageReader from '../hooks/useMessageReader'

const bgColor = (message, own) => {
    //Light Blue when sending
    if (message.is_sending) return 'rgb(147 197 253)'
    
    //Blue for sent message
    if (own) return '#38BDF8'

    //Light for received message
    return '#E5E5E5'
}

export default function MessageItem({ message, own })
{
    useMessageReader(message, own)

    return (
        <div key={message.id} className={`flex flex-col m-3 ${own ? 'items-end' : 'items-start'}`}>
            <div
                className='rounded-lg shadow px-3 py-2 max-w-[60%]'
                style={{
                    backgroundColor: bgColor(message, own),
                    color: own ? '#fff' : '#000',
                    overflowWrap: 'break-word'
                }}>
                {message.content.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
            {message.created_at && 
                <span className='text-xs'>{moment(message.created_at).fromNow()}</span>
            }
        </div>
    )
}