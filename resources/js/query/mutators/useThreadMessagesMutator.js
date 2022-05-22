import uuid from 'react-uuid'
import useThreadMessages from "../hooks/useThreadMessages";
import { useCurrentUser } from '../queries/useCurrentUserQuery';


export default function useThreadMessagesMutator(thread_id)
{
    const { pushMessage } = useThreadMessages(thread_id)
    const { id: user_id } = useCurrentUser() 

    const pushSendingMessage = (content) => {
        const sendingMessage = {
            id: uuid(),
            content,
            thread_id,
            is_sending: true,
            user_id
        }
        pushMessage(sendingMessage)
        return sendingMessage
    }

    return {
        pushSendingMessage
    }
}