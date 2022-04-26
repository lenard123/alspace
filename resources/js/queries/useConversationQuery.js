import { useQuery, useQueryClient } from "react-query"
import { fetchConversations } from "../apis/UserApi"
import queryKeyFactory from "./queryKeyFactory"
import useCurrentUserMutator from "./useCurrentUserMutator"

const useConversationQuery = (options = {}) => {
    const queryClient = useQueryClient()
    const { updateUnreadThreadCount } = useCurrentUserMutator()
    return useQuery({
        queryKey: queryKeyFactory.conversations,
        queryFn: fetchConversations,
        onSuccess: (data) => {

            if (!data) return

            let unreadThreadCount = 0

            data.forEach(thread => {

                if (thread.unread_messages_count) unreadThreadCount++;

                if(thread.other_member?.id) {
                    const userId = thread.other_member?.id
                    queryClient.setQueryData(queryKeyFactory.threadWith(userId), thread)
                }
            })

            updateUnreadThreadCount(unreadThreadCount)
        },
        ...options
    })
}

export const useConversation = (threadId) => {
    const { data } = useConversationQuery({ enabled: false })
    return data?.find(thread => thread.id == threadId)
}

export default useConversationQuery