import { message } from "antd"
import { useQueryClient } from "react-query"
import useSocket from "../hooks/useSocket"
import queryKeyFactory from "../queries/queryKeyFactory"
import useConversationQuery from "../queries/useConversationQuery"
import { prependPagination } from "../utils/paginationReducer"
import { map } from 'lodash'

const useMessageReceivedListener = () => {
    const { data:conversations } = useConversationQuery({ enabled: false })
    const queryClient = useQueryClient()
    useSocket({
        event: 'MESSAGE_RECEIVED',
        callback: ({message: newMessage}) => {
            const { thread_id } = newMessage

            //Push new message
            queryClient.setQueryData(
                queryKeyFactory.conversationMessages(thread_id), 
                prependPagination(newMessage)
            )
            
            //Notify if not on chat page
            if (window.location.pathname !== `/messages/${thread_id}`) {
                message.info('New message received')  
            }

            //Invalidate thread if the newMessage thread not exists
            if (! map(conversations, 'id').includes(thread_id)) {
                queryClient.invalidateQueries(queryKeyFactory.conversations)
            }
        }
    })
}

export default useMessageReceivedListener