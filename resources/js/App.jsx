import { RecoilRoot, useRecoilCallback } from "recoil"
import Router from "./router/Router"
import { Button } from 'antd'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function DebugButton() {
  const onClick = useRecoilCallback(({ snapshot }) => async () => {
    console.debug('Atom values:');
    for (const node of snapshot.getNodes_UNSTABLE()) {
      const value = await snapshot.getPromise(node);
      console.debug(node.key, value);
    }
  }, []);

  return <Button className='fixed left-8 bottom-8' onClick={onClick}>Dump State</Button>
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Router />
      <DebugButton />
    </RecoilRoot>
    <ReactQueryDevtools />
  </QueryClientProvider>
)

export default App