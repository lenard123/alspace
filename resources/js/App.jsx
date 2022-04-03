import { RecoilRoot, useRecoilCallback } from "recoil"
import Router from "./router/Router"
import { Button } from 'antd'

function DebugButton() {
    const onClick = useRecoilCallback(({snapshot}) => async () => {
      console.debug('Atom values:');
      for (const node of snapshot.getNodes_UNSTABLE()) {
        const value = await snapshot.getPromise(node);
        console.debug(node.key, value);
      }
    }, []);
  
    return <Button className='fixed left-8 bottom-8' onClick={onClick}>Dump State</Button>
}

const App = () => (
    <RecoilRoot>
        <Router />
        <DebugButton />
    </RecoilRoot>
)

export default App