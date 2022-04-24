import { useQuery } from "react-query"
import { fetchThread } from "../apis/ThreadApi"
import queryKeyFactory from "./queryKeyFactory"
import useThreadMutator from "./useThreadMutator"


const useThreadQuery = (threadId) => {

    const { updateThread } = useThreadMutator()

    return useQuery({
        queryKey: queryKeyFactory.conversation(threadId),
        queryFn: () => fetchThread(threadId),
        onSuccess: (thread) => {
            // updateThread(thread)
        }
    })
}

export default useThreadQuery