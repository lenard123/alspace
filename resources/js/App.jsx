import Router from "./router/Router"
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Router />
    </RecoilRoot>
    <ReactQueryDevtools position='bottom-right' />
  </QueryClientProvider>
)

export default App