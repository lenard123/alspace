import { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery"
import MessageItem from './MessageItem'
import useReadMessageAction from '@/js/query/actions/useReadMessageAction'

export default function MessagesList({messages}) {

    const { id:currentUserId } = useCurrentUser()

    const isOwn = (senderId) => senderId === currentUserId
    const { mutate:readMessage } = useReadMessageAction()

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