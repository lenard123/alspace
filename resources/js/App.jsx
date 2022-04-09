import Router from "./router/Router"
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20
    }
  }
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Router />
    </RecoilRoot>
    <ReactQueryDevtools />
  </QueryClientProvider>
)

export default App