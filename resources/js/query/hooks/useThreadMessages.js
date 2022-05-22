import { prependPagination, updatePagination } from "@/js/utils/paginationReducer";
import { useQueryClient } from "react-query";
import queryKeyFactory from "../queryKeyFactory";


export default function useThreadMessages(thread_id)
{
    const queryClient = useQueryClient()
    const key = queryKeyFactory.threadMessages(thread_id)

    const getThreadMessages = () => queryClient.getQueryData(key)

    const setThreadMessages = (updater) => {
        if (typeof updater === 'function') {
            queryClient.setQueryData(key, updatePagination(updater))
        } else {
            queryClient.setQueryData(key, updater)
        }
    }

    const pushMessage = (message) => {
        queryClient.setQueryData(key, prependPagination(message))
    }

    const cancelThreadMessagesQuery = async() => {
        await queryClient.cancelQueries(key)
    }

    return {
        getThreadMessages,
        setThreadMessages,
        pushMessage,
        cancelThreadMessagesQuery
    }
}