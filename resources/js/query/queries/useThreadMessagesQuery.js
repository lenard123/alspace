import { useInfiniteQuery } from "react-query"
import { fetchMessage } from "../../apis/ThreadApi"
import queryKeyFactory from "../queryKeyFactory"


const useThreadMessagesQuery = (threadId, options = {}) => {
    return useInfiniteQuery({
        queryKey: queryKeyFactory.threadMessages(threadId),
        queryFn: ({pageParam = 1}) => fetchMessage(threadId, pageParam),
        getNextPageParam: (lastPage) => {
            if (lastPage.next_page_url) {
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

export default useThreadMessagesQuery