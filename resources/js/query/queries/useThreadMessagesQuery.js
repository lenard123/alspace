import { useInfiniteQuery } from "react-query"
import { fetchMessage } from "../../apis/ThreadApi"
import queryKeyFactory from "../queryKeyFactory"
import { paginationDataReducer } from "../ReactQueryProvider"


const useThreadMessagesQuery = (threadId, options = {}) => {
    return useInfiniteQuery({
        queryKey: queryKeyFactory.threadMessages(threadId),
        queryFn: ({pageParam = 1}) => fetchMessage(threadId, pageParam),
        select: paginationDataReducer,
        ...options
    })
}

export default useThreadMessagesQuery