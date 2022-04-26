import { useCurrentUser } from "@/js/queries/useCurrentUserQuery"
import MessageItem from './MessageItem'
import useMessageMutator from '@/js/queries/useMessageMutator'

export default function MessagesList({messages}) {

    const { id:currentUserId } = useCurrentUser()

    const isOwn = (senderId) => senderId === currentUserId
    const { readMessage } = useMessageMutator()

    return (
        <div>
        {messages.map(message => 
            <MessageItem 
                key={message.id}
                message={message} 
                own={isOwn(message.user_id)}
                reader={readMessage}
            />
        )}
        </div>
    )

}