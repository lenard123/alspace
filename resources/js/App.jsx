import Router from "./router/Router"
import ReactQueryProvider from "./query/ReactQueryProvider";


const App = () => (
  <ReactQueryProvider>
    <Router />
  </ReactQueryProvider>
)

export default App