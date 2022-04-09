import { useQuery, useQueryClient } from "react-query"
import { fetchConversations } from "../apis/UserApi"
import queryKeyFactory from "./queryKeyFactory"

const useConversationQuery = (options = {}) => {
    const queryClient = useQueryClient()
    return useQuery({
        queryKey: queryKeyFactory.conversations,
        queryFn: fetchConversations,
        onSuccess: (data) => {
            data.forEach(thread => {
                queryClient.setQueryData(queryKeyFactory.conversation(thread.id), thread)
                if(thread.other_member?.id) {
                    const userId = thread.other_member?.id
                    queryClient.setQueryData(queryKeyFactory.threadWith(userId), thread)
                }
            })
        },
        ...options
    })
}

export default useConversationQuery