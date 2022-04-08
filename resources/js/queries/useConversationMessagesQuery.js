import { useInfiniteQuery } from "react-query"
import { fetchMessage } from "../apis/ThreadApi"
import queryKeyFactory from "./queryKeyFactory"


const useConversationMessagesQuery = (threadId, options = {}) => {
    return useInfiniteQuery({
        queryKey: queryKeyFactory.conversationMessages(threadId),
        queryFn: ({pageParam = 1}) => fetchMessage(threadId, pageParam),
        getNextPageParam: (lastPage) => {
            if (lastPage.current_page < lastPage.last_page) {
                return lastPage.current_page + 1
            }
            return undefined
        },
        select: ({ pages }) => {
            return pages.map(page => {
                return page.data
            }).flat().reverse()
        },
        ...options
    })
}

export default useConversationMessagesQuery