import { message } from "antd"
import { useQueryClient } from "react-query"
import useSocket from "../hooks/useSocket"
import queryKeyFactory from "../query/queryKeyFactory"
import { prependPagination } from "../utils/paginationReducer"
import useThreadMutator from "../query/useThreadMutator"

const useMessageReceivedListener = () => {
    const { incrementUnreadCount, refetchIfNotExists } = useThreadMutator()
    const queryClient = useQueryClient()
    useSocket({
        event: 'MESSAGE_RECEIVED',
        callback: ({message: newMessage}) => {
            const { thread_id } = newMessage

            //Push new message
            queryClient.setQueryData(
                queryKeyFactory.threadMessages(thread_id), 
                prependPagination(newMessage)
            )
            
            //Notify if not on chat page
            if (window.location.pathname !== `/messages/${thread_id}`) {
                message.info('New message received')  
                incrementUnreadCount(thread_id)
            }

            refetchIfNotExists(thread_id)
        }
    })
}

export default useMessageReceivedListener