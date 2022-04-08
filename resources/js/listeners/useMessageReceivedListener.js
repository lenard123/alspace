import { message } from "antd"
import { useQueryClient } from "react-query"
import { useLocation } from "react-router-dom"
import useSocket from "../hooks/useSocket"
import queryKeyFactory from "../queries/queryKeyFactory"
import { prependPagination } from "../utils/paginationReducer"

const useMessageReceivedListener = () => {
    const queryClient = useQueryClient()
    useSocket({
        event: 'MESSAGE_RECEIVED',
        callback: ({message: newMessage}) => {
            queryClient.setQueryData(
                queryKeyFactory.conversationMessages(newMessage.thread_id), 
                prependPagination(newMessage)
            )
            if (window.location.pathname !== `/messages/${newMessage.thread_id}`) {
                message.info('New message received')  
            }
        }
    })
}

export default useMessageReceivedListener