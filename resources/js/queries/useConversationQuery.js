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

                queryClient.setQueryData(queryKeyFactory.conversation(thread.id), thread)

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

export default useConversationQuery