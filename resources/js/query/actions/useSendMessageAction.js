import { ThreadApi } from "@/js/apis"
import { useMutation } from "react-query"
import { message } from 'antd'
import useThreadMessagesMutator from '../mutators/useThreadMessagesMutator'
import useThreadMessages from "../hooks/useThreadMessages"


export default function useSendMessageAction(thread_id)
{
    const { getThreadMessages, setThreadMessages, cancelThreadMessagesQuery } = useThreadMessages(thread_id)
    const { pushSendingMessage, } = useThreadMessagesMutator(thread_id)

    return useMutation(
        (content) => ThreadApi.sendMessage(thread_id, content), 
        {
            async onMutate(content) {
                await cancelThreadMessagesQuery()

                const previous = getThreadMessages()

                const { id: message_uuid } = pushSendingMessage(content)
                
                return { previous, message_uuid }
            },
            onError(_error, _variables, context)
            {
                message.error('Message failed to send')
                setThreadMessages(context.previous)
            },
            onSuccess(data, _varaibles, { message_uuid }) {
                setThreadMessages(old => old.id === message_uuid ? data : old)
            }
        }
    )
}