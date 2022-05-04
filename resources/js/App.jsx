import Router from "./router/Router"
import { RecoilRoot } from "recoil";
import ReactQueryProvider from "./query/ReactQueryProvider";


const App = () => (
  <ReactQueryProvider>
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  </ReactQueryProvider>
)

export default App