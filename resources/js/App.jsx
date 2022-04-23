import Router from "./router/Router"
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000
    }
  }
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Router />
    </RecoilRoot>
    <ReactQueryDevtools position='bottom-right' />
  </QueryClientProvider>
)

export default App