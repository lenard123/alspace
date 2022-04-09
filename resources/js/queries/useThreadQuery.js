import { useQuery } from "react-query"
import { fetchThread } from "../apis/ThreadApi"
import queryKeyFactory from "./queryKeyFactory"


const useThreadQuery = (threadId) => {
    return useQuery({
        queryKey: queryKeyFactory.conversation(threadId),
        queryFn: () => fetchThread(threadId)
    })
}

export default useThreadQuery