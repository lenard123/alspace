import { useQueryClient } from "react-query";
import useSocket from "../hooks/useSocket";
import queryKeyFactory from "../query/queryKeyFactory";
import { prependPagination } from "../utils/paginationReducer";
import { message as antMessage } from "antd";
import useThreadMutator from "../query/mutators/useThreadMutator";

export default function useSupportMessageReceivedListener() {

    const queryClient = useQueryClient()
    const { incrementUnreadCount } = useThreadMutator()

    useSocket({
        event: 'SUPPORT_MESSAGE_RECEIVED',
        callback({ message }) {
            const { thread_id } = message

            //Push new message
            queryClient.setQueryData(
                queryKeyFactory.threadMessages(thread_id),
                prependPagination(message)
            )

            //Notify if not on chat page
            if (window.location.pathname !== `/admin/messages/${thread_id}`) {
                antMessage.info('New message received')  
                incrementUnreadCount(thread_id)
            }

        }
    })
}