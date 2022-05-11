import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { map } from 'lodash'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            getNextPageParam(lastPage){
                return lastPage.next_page_url ? lastPage.current_page + 1 : undefined;
            },
            retry(failureCount, error) {
                if (error?.response?.status !== 404 || failureCount >= 3) return false;
            }
        }
    }
})

export const paginationDataReducer = ({ pages }) => {
    return map(pages, 'data').flat()
}

paginationDataReducer.reverse = (data) => {
    return paginationDataReducer(data).reverse()
}

export default function ReactQueryProvider({children})
{
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools position='bottom-right' />
        </QueryClientProvider>
    )
}