import { useQuery, useQueryClient } from "react-query"
import { fetchThreads } from "../../apis/UserApi"
import queryKeyFactory from "../queryKeyFactory"
import useCurrentUserMutator from "../mutators/useCurrentUserMutator"

const useThreadsQuery = (options = {}) => {
    const queryClient = useQueryClient()
    const { updateUnreadThreadCount } = useCurrentUserMutator()
    return useQuery({
        queryKey: queryKeyFactory.threads,
        queryFn: fetchThreads,
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

export const useThread = (threadId) => {
    const { data } = useThreadsQuery({ enabled: false })
    return data?.find(thread => thread.id == threadId)
}

export default useThreadsQuery