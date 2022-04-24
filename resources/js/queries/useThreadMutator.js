import { useQueryClient } from "react-query"
import queryKeyFactory from "./queryKeyFactory"
import { map } from 'lodash'
import useCurrentUserMutator from "./useCurrentUserMutator"

export default function useThreadMutator()
{
    const queryClient = useQueryClient()
    const { updateUnreadThreadCount } = useCurrentUserMutator()

    const updateThread = (newThread) => {
        queryClient.setQueryData(
            queryKeyFactory.conversations,
            (data) => {
                if (!data) return data;
                return data.map(oldThread => {
                    if(typeof newThread === 'function') return newThread(oldThread)
                    if (newThread.id === oldThread.id) return newThread
                    return oldThread
                })
            }
        )
    }

    const incrementUnreadCount = (threadId) => {
        updateUnreadThreadCount(1)
        updateThread(oldThread => {
            if (oldThread.id === threadId) return {
                ...oldThread,
                unread_messages_count: oldThread.unread_messages_count + 1
            }
            return oldThread
        })
    }

    const decrementUnreadCount = (threadId) => {
        updateThread(oldThread => {
            if (oldThread.id === threadId) return {
                ...oldThread,
                unread_messages_count: Math.max(0, oldThread.unread_messages_count - 1)
            }
            return oldThread
        })
    }

    const refetchIfNotExists = (threadId) => {
        const threads = queryClient.getQueryData(queryKeyFactory.conversations)
        if (!threads) return;

        
        if (! map(threads, 'id').includes(threadId)) {
            queryClient.invalidateQueries(queryKeyFactory.conversations)
        }

    }

    return {
        incrementUnreadCount,
        decrementUnreadCount,
        updateThread,
        refetchIfNotExists,
    }
}