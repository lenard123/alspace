import { useQueryClient } from "react-query"
import queryKeyFactory from "./queryKeyFactory"


export default function useThreadMutator()
{
    const queryClient = useQueryClient()

    const updateThread = (newThread) => {
        queryClient.setQueryData(
            queryKeyFactory.conversations,
            (data) => {
                if (!data) return [];
                return data.map(oldThread => {
                    if(typeof newThread === 'function') return newThread(oldThread)
                    if (newThread.id === oldThread.id) return newThread
                    return oldThread
                })
            }
        )
    }

    const incrementUnreadCount = (threadId) => {
        updateThread(oldThread => {
            if (oldThread.id === threadId) return {
                ...oldThread,
                unread_messages_count: oldThread.unread_messages_count + 1
            }
            return oldThread
        })
    }

    return {
        incrementUnreadCount
    }
}