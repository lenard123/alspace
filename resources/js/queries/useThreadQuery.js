import { useQuery } from "react-query"
import { fetchThread } from "../apis/ThreadApi"
import queryKeyFactory from "./queryKeyFactory"
import { useThread } from "./useThreadsQuery"
import useThreadMutator from "./useThreadMutator"


const useThreadQuery = (threadId) => {

    const data = useThread(threadId)
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