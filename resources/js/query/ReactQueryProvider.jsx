import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const queryClient = new QueryClient()

export default function ReactQueryProvider({children})
{
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools position='bottom-right' />
        </QueryClientProvider>
    )
}