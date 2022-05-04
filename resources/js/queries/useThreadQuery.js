import { useQuery } from "react-query"
import { fetchThread } from "../apis/ThreadApi"
import queryKeyFactory from "./queryKeyFactory"
import { useConversation } from "./useThreadsQuery"
import useThreadMutator from "./useThreadMutator"


const useThreadQuery = (threadId) => {

    const data = useConversation(threadId)
    const { updateThread } = useThreadMutator()

    return useQuery({
        queryKey: queryKeyFactory.conversation(threadId),
        queryFn: () => fetchThread(threadId),
        initialData: data,
        onSuccess: (thread) => {
            updateThread(thread)
        }
    })
}

export default useThreadQuery